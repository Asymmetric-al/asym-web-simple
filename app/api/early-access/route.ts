import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
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
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 8;
const MAX_TRACKED_KEYS = 2000;
const RETRY_AFTER_SECONDS = 60;

interface RateLimitBucket {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitBucket>();

const readClientIp = (request: Request): string => {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) {
      return first;
    }
  }
  const realIp = request.headers.get("x-real-ip")?.trim();
  return realIp && realIp.length > 0 ? realIp : "unknown";
};

const isRateLimited = (clientIp: string, now: number): boolean => {
  if (rateLimitStore.size > MAX_TRACKED_KEYS) {
    for (const [key, entry] of rateLimitStore) {
      if (entry.resetAt <= now) {
        rateLimitStore.delete(key);
      }
    }
  }

  const current = rateLimitStore.get(clientIp);
  if (!current || current.resetAt <= now) {
    rateLimitStore.set(clientIp, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return false;
  }

  current.count += 1;
  return current.count > RATE_LIMIT_MAX_REQUESTS;
};

const isFormSubmission = (request: Request): boolean => {
  const contentType = request.headers.get("content-type")?.toLowerCase() ?? "";
  return (
    contentType.includes("application/x-www-form-urlencoded") ||
    contentType.includes("multipart/form-data")
  );
};

const redirectForForm = (
  request: Request,
  outcome: "received" | "invalid" | "rate_limited" | "unavailable" | "failed"
): NextResponse => {
  const target = new URL("/", request.url);
  target.searchParams.set("early_access", outcome);
  target.hash = "early-access";
  return NextResponse.redirect(target, 303);
};

const failure = (
  request: Request,
  asForm: boolean,
  status: number,
  error: string,
  extra?: object,
  headers?: HeadersInit
): NextResponse => {
  if (asForm) {
    if (status === 422) {
      return redirectForForm(request, "invalid");
    }
    if (status === 429) {
      return redirectForForm(request, "rate_limited");
    }
    if (status === 503) {
      return redirectForForm(request, "unavailable");
    }
    return redirectForForm(request, "failed");
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
const readBoundedText = async (
  request: Request
): Promise<
  { ok: true; text: string } | { ok: false; reason: "too_large" | "unreadable" }
> => {
  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
    return { ok: false, reason: "too_large" };
  }

  const stream = request.body;
  if (!stream) {
    return { ok: true, text: "" };
  }

  const reader = stream.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      totalBytes += value.byteLength;
      if (totalBytes > MAX_BODY_BYTES) {
        await reader.cancel();
        return { ok: false, reason: "too_large" };
      }
      chunks.push(value);
    }
  } catch {
    return { ok: false, reason: "unreadable" };
  }

  const merged = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    merged.set(chunk, offset);
    offset += chunk.byteLength;
  }

  return { ok: true, text: new TextDecoder().decode(merged) };
};

const parsePayload = async (
  request: Request,
  asForm: boolean
): Promise<
  | { ok: true; body: unknown }
  | { ok: false; status: number; error: string }
> => {
  const contentType = request.headers.get("content-type")?.toLowerCase() ?? "";

  if (contentType.includes("multipart/form-data")) {
    const declaredLength = Number(request.headers.get("content-length") ?? 0);
    if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
      return { ok: false, status: 413, error: "too_large" };
    }
    try {
      const formData = await request.formData();
      const record: Record<string, string> = {};
      let charCount = 0;
      for (const [key, value] of formData.entries()) {
        if (typeof value === "string") {
          charCount += key.length + value.length;
          if (charCount > MAX_BODY_BYTES) {
            return { ok: false, status: 413, error: "too_large" };
          }
          record[key] = value;
        }
      }
      return { ok: true, body: record };
    } catch {
      return { ok: false, status: 400, error: "invalid_form" };
    }
  }

  const raw = await readBoundedText(request);
  if (!raw.ok) {
    return raw.reason === "too_large"
      ? { ok: false, status: 413, error: "too_large" }
      : { ok: false, status: 400, error: "invalid_body" };
  }

  if (asForm) {
    const params = new URLSearchParams(raw.text);
    const record: Record<string, string> = {};
    for (const [key, value] of params.entries()) {
      record[key] = value;
    }
    return { ok: true, body: record };
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
  const asForm = isFormSubmission(request);

  if (isRateLimited(readClientIp(request), Date.now())) {
    return failure(
      request,
      asForm,
      429,
      "rate_limited",
      undefined,
      { "Retry-After": String(RETRY_AFTER_SECONDS) }
    );
  }

  const parsed = await parsePayload(request, asForm);
  if (!parsed.ok) {
    return failure(request, asForm, parsed.status, parsed.error);
  }

  // Automated submissions get a normal-looking response and are dropped.
  if (isHoneypotFilled(parsed.body)) {
    return asForm
      ? redirectForForm(request, "received")
      : NextResponse.json({ ok: true });
  }

  const submission = normalizeEarlyAccessRequest(parsed.body);
  const errors = validateEarlyAccessRequest(submission);
  if (hasErrors(errors)) {
    return failure(request, asForm, 422, "invalid", { errors });
  }

  const config = readEarlyAccessDeliveryConfig();
  if (!config) {
    return failure(request, asForm, 503, "not_configured");
  }

  const delivered = await wasAcceptedForDelivery(config, {
    replyTo: submission.email,
    ...buildEarlyAccessNotification(submission, new Date()),
  });

  if (delivered) {
    return asForm
      ? redirectForForm(request, "received")
      : NextResponse.json({ ok: true });
  }

  return failure(request, asForm, 502, "delivery_failed");
};
