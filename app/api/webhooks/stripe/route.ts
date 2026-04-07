import { GIVE_PAGE_METADATA_SOURCE } from "@/lib/stripe-giving";
import { getStripe } from "@/lib/stripe-server";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import type Stripe from "stripe";

export const runtime = "nodejs";

async function notifyGivingInbox(payload: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  const toAddress = process.env.CONTACT_INBOX_EMAIL ?? "info@asymmetric.al";
  const fromAddress =
    process.env.CONTACT_FROM_EMAIL ?? "Website <noreply@asymmetric.al>";

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: fromAddress,
      to: [toAddress],
      subject: "Stripe giving event (webhook)",
      text: payload,
    });
  } catch (err) {
    console.error("[webhooks/stripe] Resend notify failed (event still acknowledged)", err);
  }
}

function subscriptionIdFromInvoice(invoice: Stripe.Invoice): string | null {
  if (invoice.parent?.type !== "subscription_details") return null;
  const sub = invoice.parent.subscription_details?.subscription;
  if (!sub) return null;
  return typeof sub === "string" ? sub : sub.id;
}

function summarizeCheckoutSession(session: Stripe.Checkout.Session): string {
  const lines = [
    `Event: checkout.session.completed`,
    `Session: ${session.id}`,
    `Mode: ${session.mode}`,
    `Amount total: ${session.amount_total != null ? session.amount_total : "n/a"} ${session.currency ?? ""}`,
    `Customer email: ${session.customer_details?.email ?? session.customer_email ?? "n/a"}`,
    `Payment status: ${session.payment_status}`,
    `Metadata: ${JSON.stringify(session.metadata ?? {})}`,
  ];
  return lines.join("\n");
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 503 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("[webhooks/stripe] STRIPE_WEBHOOK_SECRET is not set");
    return NextResponse.json({ error: "Webhook not configured" }, { status: 503 });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature" }, { status: 400 });
  }

  const rawBody = await request.text();

  let event: Stripe.Event;
  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    console.error("[webhooks/stripe] signature verification failed", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const stripeClient = getStripe();

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        console.info("[webhooks/stripe] checkout.session.completed", session.id);
        if (session.metadata?.source === GIVE_PAGE_METADATA_SOURCE) {
          await notifyGivingInbox(summarizeCheckoutSession(session));
        } else {
          console.info(
            "[webhooks/stripe] checkout.session.completed skipped notify (unexpected source)",
            session.metadata?.source,
          );
        }
        break;
      }
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        console.info(`[webhooks/stripe] ${event.type}`, sub.id, sub.status);
        if (sub.metadata?.source === GIVE_PAGE_METADATA_SOURCE) {
          await notifyGivingInbox(
            [`Event: ${event.type}`, `Subscription: ${sub.id}`, `Status: ${sub.status}`].join("\n"),
          );
        }
        break;
      }
      case "invoice.paid": {
        const invoice = event.data.object as Stripe.Invoice;
        console.info("[webhooks/stripe] invoice.paid", invoice.id);
        const subId = subscriptionIdFromInvoice(invoice);
        if (!subId) break;

        const snapshotSource =
          invoice.parent?.type === "subscription_details"
            ? invoice.parent.subscription_details?.metadata?.source
            : undefined;

        let isGivePage = snapshotSource === GIVE_PAGE_METADATA_SOURCE;

        if (!isGivePage && snapshotSource === undefined) {
          try {
            const sub = await stripeClient.subscriptions.retrieve(subId);
            isGivePage = sub.metadata?.source === GIVE_PAGE_METADATA_SOURCE;
          } catch (retrieveErr) {
            console.error(
              "[webhooks/stripe] invoice.paid subscription lookup failed",
              subId,
              retrieveErr,
            );
            break;
          }
        } else if (!isGivePage) {
          break;
        }

        await notifyGivingInbox(
          [
            `Event: invoice.paid`,
            `Invoice: ${invoice.id}`,
            `Subscription: ${subId}`,
            `Customer: ${typeof invoice.customer === "string" ? invoice.customer : invoice.customer?.id ?? "n/a"}`,
            `Amount paid: ${invoice.amount_paid}`,
          ].join("\n"),
        );
        break;
      }
      default:
        console.info("[webhooks/stripe] ignored event type", event.type);
    }
  } catch (err) {
    console.error("[webhooks/stripe] handler error", event.type, err);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
