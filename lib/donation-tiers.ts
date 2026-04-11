/** Shared donation tier constants (safe for client + server). */

/** Allowed one-time gift amounts in USD cents (preset tiers only). */
export const ONE_TIME_AMOUNTS_CENTS = [
  2_500, 5_000, 10_000, 25_000, 50_000,
] as const;

export type RecurringTier = "25" | "50" | "100";
