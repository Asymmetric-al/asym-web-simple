import { NextResponse } from "next/server";
import { Resend } from "resend";
import { readEarlyAccessDeliveryConfig } from "@/lib/early-access-config";
import type { NextRequest } from "next/server";

const isNonEmpty = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

// eslint-disable-next-line sonarjs/function-name -- Next.js route handlers must be named after the HTTP method.
export const POST = async (request: NextRequest): Promise<NextResponse> => {
  const config = readEarlyAccessDeliveryConfig();
  if (!config) {
    return NextResponse.json(
      {
        error: "Email delivery is not configured on this deployment.",
      },
      { status: 503 }
    );
  }

  const resend = new Resend(config.apiKey);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  const record = body as Record<string, unknown>;
  const kind = record.kind === "waitlist" ? "waitlist" : "contact";

  const name = isNonEmpty(record.name) ? record.name.trim() : "";
  const email = isNonEmpty(record.email) ? record.email.trim() : "";

  if (!name || !email) {
    return NextResponse.json(
      { error: "Name and email are required." },
      { status: 422 }
    );
  }

  let subject: string;
  let text: string;

  if (kind === "contact") {
    const organization = isNonEmpty(record.organization)
      ? record.organization.trim()
      : "";
    const topic = isNonEmpty(record.topic) ? record.topic.trim() : "";
    const message = isNonEmpty(record.message) ? record.message.trim() : "";

    if (!topic || !message) {
      return NextResponse.json(
        { error: "Topic and message are required." },
        { status: 422 }
      );
    }

    subject = `Asymmetric.al contact: ${topic} - ${name}`;
    text = [
      `From: ${name} <${email}>`,
      organization ? `Organization: ${organization}` : "",
      `Topic: ${topic}`,
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n");
  } else {
    const organization = isNonEmpty(record.organization)
      ? record.organization.trim()
      : "";
    const role = isNonEmpty(record.role) ? record.role.trim() : "";
    const challenge = isNonEmpty(record.challenge)
      ? record.challenge.trim()
      : "";

    if (!organization || !role || !challenge) {
      return NextResponse.json(
        { error: "Organization, role, and challenge fields are required." },
        { status: 422 }
      );
    }

    subject = `Asymmetric.al waitlist request - ${name}`;
    text = [
      "Waitlist inquiry",
      "",
      `Name: ${name}`,
      `Organization: ${organization}`,
      `Role: ${role}`,
      `Email: ${email}`,
      "",
      "Biggest operational bottleneck:",
      challenge,
    ].join("\n");
  }

  try {
    const { error } = await resend.emails.send({
      from: config.from,
      to: [config.inbox],
      replyTo: email,
      subject,
      text,
    });

    if (error !== null) {
      return NextResponse.json(
        { error: "Failed to send message. Please try again later." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 502 }
    );
  }
};
