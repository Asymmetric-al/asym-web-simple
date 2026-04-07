import { getAppBaseUrl, getStripe } from "@/lib/stripe-server";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Body = {
  sessionId?: string;
};

export async function POST(request: NextRequest): Promise<NextResponse> {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: "Giving is not configured on this deployment." },
      { status: 503 },
    );
  }

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const sessionId = typeof body.sessionId === "string" ? body.sessionId.trim() : "";
  if (!sessionId.startsWith("cs_")) {
    return NextResponse.json({ error: "A valid checkout session is required." }, { status: 422 });
  }

  const baseUrl = getAppBaseUrl();
  const returnUrl = `${baseUrl}/give`;

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["customer"],
    });

    const customer = session.customer;
    const customerId =
      typeof customer === "string" ? customer : customer?.id ?? null;

    if (!customerId) {
      return NextResponse.json(
        { error: "No customer record for this session. Use the email from your Stripe receipt to contact us." },
        { status: 422 },
      );
    }

    const portal = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl,
    });

    if (!portal.url) {
      return NextResponse.json({ error: "Could not open billing portal." }, { status: 500 });
    }

    return NextResponse.json({ url: portal.url });
  } catch (err) {
    console.error("[donations/billing-portal]", err);
    return NextResponse.json(
      { error: "Could not open donor portal. Email info@asymmetric.al for help." },
      { status: 500 },
    );
  }
}
