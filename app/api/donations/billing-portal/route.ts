import {
  GIVE_PAGE_METADATA_SOURCE,
  isValidCheckoutSessionId,
} from "@/lib/stripe-giving";
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
  if (!isValidCheckoutSessionId(sessionId)) {
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

    const source = session.metadata?.source;
    if (source !== GIVE_PAGE_METADATA_SOURCE) {
      return NextResponse.json(
        { error: "This session is not eligible for the donor portal from here." },
        { status: 403 },
      );
    }

    if (session.status !== "complete") {
      return NextResponse.json(
        { error: "Checkout is not complete yet. Finish payment first, then return to this page." },
        { status: 409 },
      );
    }

    if (session.mode !== "subscription") {
      return NextResponse.json(
        {
          error:
            "The donor portal applies to monthly gifts. For one-time gifts, use your Stripe receipt or email info@asymmetric.al.",
        },
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
