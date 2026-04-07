import {
  donationSessionMetadata,
  getAppBaseUrl,
  getRecurringPriceId,
  getStripe,
  ONE_TIME_AMOUNTS_CENTS,
  type RecurringTier,
} from "@/lib/stripe-server";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Body = {
  mode: "subscription" | "payment";
  /** Monthly tier in dollars: 25 | 50 | 100 */
  recurringTier?: RecurringTier;
  /** One-time amount in USD cents */
  amountCents?: number;
  customerEmail?: string;
};

export async function POST(request: NextRequest): Promise<NextResponse> {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      {
        error:
          "Giving is not configured. Add Stripe keys to .env.local — see docs/STRIPE-GIVING.md.",
      },
      { status: 503 },
    );
  }

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const baseUrl = getAppBaseUrl();
  const returnUrl = `${baseUrl}/give/success?session_id={CHECKOUT_SESSION_ID}`;

  const metadata = {
    ...donationSessionMetadata,
    gift_type: body.mode === "subscription" ? "recurring" : "one_time",
  } satisfies Record<string, string>;

  const customText = {
    submit: {
      message:
        "Thank you. Your gift supports nonprofit engineering for missions organizations.",
    },
  };

  try {
    const stripe = getStripe();

    if (body.mode === "subscription") {
      const tier = body.recurringTier;
      if (!tier || !["25", "50", "100"].includes(tier)) {
        return NextResponse.json(
          { error: "Choose a monthly support level." },
          { status: 422 },
        );
      }
      const priceId = getRecurringPriceId(tier);
      if (!priceId) {
        return NextResponse.json(
          {
            error:
              "Recurring prices are not configured. Set STRIPE_PRICE_RECURRING_* in .env.local.",
          },
          { status: 503 },
        );
      }

      const trimmedEmail =
        typeof body.customerEmail === "string" ? body.customerEmail.trim() : "";

      const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        ui_mode: "embedded_page",
        return_url: returnUrl,
        line_items: [{ price: priceId, quantity: 1 }],
        metadata,
        subscription_data: {
          metadata: { ...metadata },
        },
        custom_text: customText,
        ...(trimmedEmail ? { customer_email: trimmedEmail } : {}),
      });

      if (!session.client_secret) {
        return NextResponse.json(
          { error: "Checkout session missing client secret." },
          { status: 500 },
        );
      }

      return NextResponse.json({
        clientSecret: session.client_secret,
        sessionId: session.id,
      });
    }

    const cents = body.amountCents;
    if (
      typeof cents !== "number" ||
      !Number.isInteger(cents) ||
      !ONE_TIME_AMOUNTS_CENTS.includes(cents as (typeof ONE_TIME_AMOUNTS_CENTS)[number])
    ) {
      return NextResponse.json(
        { error: "Select a valid one-time gift amount." },
        { status: 422 },
      );
    }

    const paymentEmail =
      typeof body.customerEmail === "string" ? body.customerEmail.trim() : "";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      ui_mode: "embedded_page",
      return_url: returnUrl,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: cents,
            product_data: {
              name: "One-time gift — Asymmetric.al",
              description:
                "Tax-deductible donation to Global Fellowship Inc. (EIN 68-0214543) for the Asymmetric.al nonprofit project.",
            },
          },
        },
      ],
      metadata,
      payment_intent_data: {
        metadata: { ...metadata },
      },
      custom_text: customText,
      ...(paymentEmail ? { customer_email: paymentEmail } : {}),
    });

    if (!session.client_secret) {
      return NextResponse.json(
        { error: "Checkout session missing client secret." },
        { status: 500 },
      );
    }

    return NextResponse.json({
      clientSecret: session.client_secret,
      sessionId: session.id,
    });
  } catch (err) {
    console.error("[donations/checkout-session]", err);
    return NextResponse.json(
      { error: "Could not start checkout. Try again or email info@asymmetric.al." },
      { status: 500 },
    );
  }
}
