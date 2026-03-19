import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: NextRequest): Promise<NextResponse> {
  // Instantiate lazily so build succeeds without env vars
  const resend = new Resend(process.env.RESEND_API_KEY);
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { name, email, message, organization } = body as Record<string, string>;

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 422 },
    );
  }

  try {
    await resend.emails.send({
      from: "Website <noreply@asymmetric.al>",
      to: ["info@asymmetric.al"],
      replyTo: email,
      subject: `Contact form: ${name}${organization ? ` — ${organization}` : ""}`,
      text: [
        `From: ${name} <${email}>`,
        organization ? `Organization: ${organization}` : "",
        "",
        message,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact] email send failed", err);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 },
    );
  }
}
