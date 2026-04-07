import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { Resend } from "resend";

function isNonEmpty(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "Email is not configured on this deployment. Use the copy or mailto options, or email us directly.",
      },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);
  const toAddress = process.env.CONTACT_INBOX_EMAIL ?? "info@asymmetric.al";
  const fromAddress =
    process.env.CONTACT_FROM_EMAIL ?? "Website <noreply@asymmetric.al>";

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const record = body as Record<string, unknown>;
  const kind = record.kind === "waitlist" ? "waitlist" : "contact";

  const name = isNonEmpty(record.name) ? record.name.trim() : "";
  const email = isNonEmpty(record.email) ? record.email.trim() : "";

  if (!name || !email) {
    return NextResponse.json(
      { error: "Name and email are required." },
      { status: 422 },
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
        { status: 422 },
      );
    }

    subject = `Asymmetric.al contact: ${topic} — ${name}`;
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
    const challenge = isNonEmpty(record.challenge) ? record.challenge.trim() : "";

    if (!organization || !role || !challenge) {
      return NextResponse.json(
        { error: "Organization, role, and challenge fields are required." },
        { status: 422 },
      );
    }

    subject = `Asymmetric.al waitlist request — ${name}`;
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
    await resend.emails.send({
      from: fromAddress,
      to: [toAddress],
      replyTo: email,
      subject,
      text,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact] email send failed", err);
    return NextResponse.json(
      { error: "Failed to send message. Please try again or email us directly." },
      { status: 500 },
    );
  }
}
