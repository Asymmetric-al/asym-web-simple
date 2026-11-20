import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  EARLY_ACCESS_CONFIRMED_COOKIE,
  EARLY_ACCESS_RATE_LIMIT_WINDOW_SECONDS,
  buildEarlyAccessNotification,
  hasErrors,
  isHoneypotFilled,
  normalizeEarlyAccessRequest,
  validateEarlyAccessRequest,
} from "@/lib/early-access";
import { readEarlyAccessDeliveryConfig } from "@/lib/early-access-config";
import type { EarlyAccessDeliveryConfig } from "@/lib/early-access-config";

/**
Generous for three short text fields; larger bodies are not form posts.
*/
const MAX_BODY_BYTES = 16_000;
const RATE_LIMIT_WINDOW_MS = EARLY_ACCESS_RATE_LIMIT_WINDOW_SECONDS * 1000;
const RATE_LIMIT_MAX_REQUESTS = 8;
const MAX_TRACKED_KEYS = 2000;
const CONFIRMED_COOKIE_MAX_AGE_SECONDS = 300;

interface RateLimitBucket {
  count: number;
  resetAt: number;
}

type FormOutcome =
  | "received"
  | "invalid"
  | "rate_limited"
  | "unavailable"
  | "failed";

let rateLimitStore: Map<string, RateLimitBucket> | null = null;

const getRateLimitStore = (): Map<string, RateLimitBucket> => {
  if (!rateLimitStore) {
    rateLimitStore = new Map();
  }
  return rateLimitStore;
};

/**
Prefer edge-injected headers over client-supplied leading X-Forwarded-For hops.
Note: in-memory Map buckets apply per serverless isolate (documented for prelaunch).
*/
const readClientIp = (request: Request): string => {
  const vercelIp = request.headers.get("x-vercel-forwarded-for")?.trim();
  if (vercelIp) {
    return vercelIp;
  }

  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) {
    return realIp;
  }

  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const parts = forwarded.split(",");
    const rightmost = parts.at(-1)?.trim();
    if (rightmost) {
      return rightmost;
    }
  }

  return "unknown";
};

const checkRateLimit = (
  clientIp: string,
  now: number
): { limited: false } | { limited: true; retryAfterSeconds: number } => {
  const store = getRateLimitStore();

  if (store.size > MAX_TRACKED_KEYS) {
    for (const [key, entry] of store) {
      if (entry.resetAt <= now) {
        store.delete(key);
      }
    }
  }

  const current = store.get(clientIp);
  if (!current || current.resetAt <= now) {
    store.set(clientIp, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return { limited: false };
  }

  current.count += 1;
  if (current.count > RATE_LIMIT_MAX_REQUESTS) {
    const retryAfterSeconds = Math.max(
      1,
      Math.ceil((current.resetAt - now) / 1000)
    );
    return { limited: true, retryAfterSeconds };
  }

  return { limited: false };
};

const detectContentKind = (
  request: Request
): "json" | "urlencoded" | "unsupported" => {
  const contentType = request.headers.get("content-type")?.toLowerCase() ?? "";
  if (contentType.includes("application/x-www-form-urlencoded")) {
    return "urlencoded";
  }
  if (
    contentType.includes("application/json") ||
    contentType.trim().length === 0
  ) {
    return "json";
  }
  return "unsupported";
};

const isSecureRequest = (request: Request): boolean => {
  const forwardedProto = request.headers
    .get("x-forwarded-proto")
    ?.split(",", 1)[0]
    ?.trim()
    .toLowerCase();
  if (forwardedProto) {
    return forwardedProto === "https";
  }
  try {
    const parsedUrl = new URL(request.url);
    return parsedUrl.protocol === "https:";
  } catch {
    return false;
  }
};

const redirectForForm = (
  request: Request,
  outcome: FormOutcome,
  retryAfterSeconds?: number
): NextResponse => {
  const params = new URLSearchParams({ state: outcome });
  if (retryAfterSeconds !== undefined) {
    params.set("retry", String(retryAfterSeconds));
  }
  const response = new NextResponse(null, {
    status: 303,
    headers: { Location: `/early-access/status?${params.toString()}` },
  });

  if (outcome === "received") {
    response.cookies.set(EARLY_ACCESS_CONFIRMED_COOKIE, "1", {
      httpOnly: true,
      sameSite: "lax",
      secure: isSecureRequest(request),
      path: "/early-access/status",
      maxAge: CONFIRMED_COOKIE_MAX_AGE_SECONDS,
    });
  }

  return response;
};

const mapStatusToOutcome = (status: number): FormOutcome => {
  if (status === 422) {
    return "invalid";
  }
  if (status === 429) {
    return "rate_limited";
  }
  if (status === 503) {
    return "unavailable";
  }
  return "failed";
};

const respondFailure = (
  request: Request,
  isUrlEncodedForm: boolean,
  status: number,
  error: string,
  extra?: { errors?: unknown; retryAfterSeconds?: number },
  headers?: HeadersInit
): NextResponse => {
  if (isUrlEncodedForm) {
    return redirectForForm(
      request,
      mapStatusToOutcome(status),
      extra?.retryAfterSeconds
    );
  }

  return NextResponse.json(
    { ok: false, error, ...extra },
    headers ? { status, headers } : { status }
  );
};

/**
Reads the raw request stream with a hard byte ceiling so chunked bodies
without `content-length` cannot exceed `MAX_BODY_BYTES`.
*/
const readStreamBounded = (
  stream: ReadableStream<Uint8Array>
): Promise<Uint8Array | "too_large"> => {
  const reader = stream.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  const nextChunk = async (): Promise<Uint8Array | "too_large"> => {
    const { done, value } = await reader.read();
    if (done) {
      const merged = new Uint8Array(totalBytes);
      let offset = 0;
      for (const chunk of chunks) {
        merged.set(chunk, offset);
        offset += chunk.byteLength;
      }
      return merged;
    }
    totalBytes += value.byteLength;
    if (totalBytes > MAX_BODY_BYTES) {
      await reader.cancel();
      return "too_large";
    }
    chunks.push(value);
    return nextChunk();
  };

  return nextChunk();
};

const decodeStreamBounded = async (
  stream: ReadableStream<Uint8Array>
): Promise<{ ok: true; text: string } | { ok: false; reason: "too_large" }> => {
  const bytes = await readStreamBounded(stream);
  if (bytes === "too_large") {
    return { ok: false, reason: "too_large" };
  }
  const decoder = new TextDecoder();
  return { ok: true, text: decoder.decode(bytes) };
};

const readBoundedText = async (
  request: Request
): Promise<
  { ok: true; text: string } | { ok: false; reason: "too_large" | "unreadable" }
> => {
  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
    return { ok: false, reason: "too_large" };
  }

  if (!request.body) {
    return { ok: true, text: "" };
  }

  try {
    return await decodeStreamBounded(request.body);
  } catch {
    return { ok: false, reason: "unreadable" };
  }
};

const parseBoundedPayload = async (
  request: Request,
  isUrlEncodedForm: boolean
): Promise<
  { ok: true; body: unknown } | { ok: false; status: number; error: string }
> => {
  const raw = await readBoundedText(request);
  if (!raw.ok) {
    return raw.reason === "too_large"
      ? { ok: false, status: 413, error: "too_large" }
      : { ok: false, status: 400, error: "invalid_body" };
  }

  if (isUrlEncodedForm) {
    const params = new URLSearchParams(raw.text);
    return { ok: true, body: Object.fromEntries(params) };
  }

  try {
    return { ok: true, body: JSON.parse(raw.text) as unknown };
  } catch {
    return { ok: false, status: 400, error: "invalid_json" };
  }
};

/**
True only when Resend accepted the message for delivery.
*/
const wasAcceptedForDelivery = async (
  config: EarlyAccessDeliveryConfig,
  message: { replyTo: string; subject: string; text: string }
): Promise<boolean> => {
  const resend = new Resend(config.apiKey);

  try {
    const { error } = await resend.emails.send({
      from: config.from,
      to: [config.inbox],
      ...message,
    });
    return error === null;
  } catch {
    return false;
  }
};

// eslint-disable-next-line sonarjs/function-name -- Next.js route handlers must be named after the HTTP method.
export const POST = async (request: Request): Promise<NextResponse> => {
  const contentKind = detectContentKind(request);
  if (contentKind === "unsupported") {
    return NextResponse.json(
      { ok: false, error: "unsupported_media_type" },
      { status: 415 }
    );
  }

  const isUrlEncodedForm = contentKind === "urlencoded";
  const rateCheck = checkRateLimit(readClientIp(request), Date.now());

  if (rateCheck.limited) {
    return respondFailure(
      request,
      isUrlEncodedForm,
      429,
      "rate_limited",
      { retryAfterSeconds: rateCheck.retryAfterSeconds },
      { "Retry-After": String(rateCheck.retryAfterSeconds) }
    );
  }

  const parsed = await parseBoundedPayload(request, isUrlEncodedForm);
  if (!parsed.ok) {
    return respondFailure(
      request,
      isUrlEncodedForm,
      parsed.status,
      parsed.error
    );
  }

  // Automated submissions get a normal-looking response and are dropped.
  if (isHoneypotFilled(parsed.body)) {
    return isUrlEncodedForm
      ? redirectForForm(request, "received")
      : NextResponse.json({ ok: true });
  }

  const submission = normalizeEarlyAccessRequest(parsed.body);
  const errors = validateEarlyAccessRequest(submission);
  if (hasErrors(errors)) {
    return respondFailure(request, isUrlEncodedForm, 422, "invalid", {
      errors,
    });
  }

  const config = readEarlyAccessDeliveryConfig();
  if (!config) {
    return respondFailure(request, isUrlEncodedForm, 503, "not_configured");
  }

  const delivered = await wasAcceptedForDelivery(config, {
    replyTo: submission.email,
    ...buildEarlyAccessNotification(submission, new Date()),
  });

  if (delivered) {
    return isUrlEncodedForm
      ? redirectForForm(request, "received")
      : NextResponse.json({ ok: true });
  }

  return respondFailure(request, isUrlEncodedForm, 502, "delivery_failed");
};
