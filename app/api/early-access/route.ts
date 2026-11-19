import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  buildEarlyAccessNotification,
  hasErrors,
  isHoneypotFilled,
  normalizeEarlyAccessRequest,
  validateEarlyAccessRequest,
} from "@/lib/early-access";

/**
Generous for three short text fields; larger bodies are not form posts.
*/
const MAX_BODY_BYTES = 16_000;

interface DeliveryConfig {
  apiKey: string;
  inbox: string;
  from: string;
}

/**
All three values are required. There is deliberately no default inbox, so a request is only acknowledged once someone has chosen where it goes.
*/
const readDeliveryConfig = (): DeliveryConfig | null => {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const inbox = process.env.CONTACT_INBOX_EMAIL?.trim();
  const from = process.env.CONTACT_FROM_EMAIL?.trim();

  return apiKey && inbox && from ? { apiKey, inbox, from } : null;
};

const failure = (status: number, error: string, extra?: object) =>
  NextResponse.json({ ok: false, error, ...extra }, { status });

const readJson = async (request: Request): Promise<unknown> => {
  try {
    return (await request.json()) as unknown;
  } catch {
    return undefined;
  }
};

/**
True only when Resend accepted the message for delivery.
*/
const wasAcceptedForDelivery = async (
  config: DeliveryConfig,
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
  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > MAX_BODY_BYTES) {
    return failure(413, "too_large");
  }

  const body = await readJson(request);
  if (body === undefined) {
    return failure(400, "invalid_json");
  }

  // Automated submissions get a normal-looking response and are dropped.
  if (isHoneypotFilled(body)) {
    return NextResponse.json({ ok: true });
  }

  const submission = normalizeEarlyAccessRequest(body);
  const errors = validateEarlyAccessRequest(submission);
  if (hasErrors(errors)) {
    return failure(422, "invalid", { errors });
  }

  const config = readDeliveryConfig();
  if (!config) {
    return failure(503, "not_configured");
  }

  const delivered = await wasAcceptedForDelivery(config, {
    replyTo: submission.email,
    ...buildEarlyAccessNotification(submission, new Date()),
  });

  return delivered
    ? NextResponse.json({ ok: true })
    : failure(502, "delivery_failed");
};
