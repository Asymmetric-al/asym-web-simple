/** Shared guards for Stripe giving flows (no Node-only imports). */

export const GIVE_PAGE_METADATA_SOURCE = "give_page" as const;

/** Stripe Checkout Session ids: cs_test_… or cs_live_… */
const CHECKOUT_SESSION_ID = /^cs_(test|live)_[A-Za-z0-9]+$/;

export function isValidCheckoutSessionId(id: string): boolean {
  const trimmed = id.trim();
  return (
    trimmed.length >= 14 &&
    trimmed.length <= 128 &&
    CHECKOUT_SESSION_ID.test(trimmed)
  );
}

const EMAIL_MAX = 254;

export function normalizeOptionalDonorEmail(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const trimmed = raw.trim();
  if (!trimmed) return null;
  if (trimmed.length > EMAIL_MAX) return null;
  // Practical check; Stripe validates again at checkout.
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return null;
  return trimmed;
}
