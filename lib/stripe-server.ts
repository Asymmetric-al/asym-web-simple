import type { RecurringTier } from "@/lib/donation-tiers";
import Stripe from "stripe";

export { ONE_TIME_AMOUNTS_CENTS, type RecurringTier } from "@/lib/donation-tiers";

let stripeSingleton: Stripe | null = null;

export function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is not configured");
  }
  if (!stripeSingleton) {
    stripeSingleton = new Stripe(key);
  }
  return stripeSingleton;
}

export function getAppBaseUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return raw.replace(/\/$/, "");
}

export function getRecurringPriceId(tier: RecurringTier): string | undefined {
  switch (tier) {
    case "25":
      return process.env.STRIPE_PRICE_RECURRING_25;
    case "50":
      return process.env.STRIPE_PRICE_RECURRING_50;
    case "100":
      return process.env.STRIPE_PRICE_RECURRING_100;
    default:
      return undefined;
  }
}

export const donationSessionMetadata = {
  source: "give_page",
  tax_org: "Global Fellowship Inc.",
  ein: "68-0214543",
} as const;
