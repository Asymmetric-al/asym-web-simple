/**
 * Runtime environment variable validation.
 * Call `validateEnv()` in server-only entry points (e.g. payload.config.ts,
 * API routes) to catch missing config early at startup — not at build time.
 *
 * See .env.example for the full list of required variables.
 */

function require(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(
      `[env] Missing required environment variable: ${key}\n` +
        `Check .env.example for all required variables.`,
    );
  }
  return value;
}

/**
 * Validate all required env vars. Call once on server startup.
 * Safe to call in API routes, payload.config.ts, and server actions.
 * Do NOT call at module-level — use in route handlers or server functions.
 */
export function validateEnv(): void {
  require("DATABASE_URI");
  require("PAYLOAD_SECRET");
  require("RESEND_API_KEY");
  require("PAYLOAD_DRAFT_SECRET");
  require("REVALIDATION_SECRET");
}

/** Typed, safe access to env vars — no throwing, use in server components. */
export const env = {
  NEXT_PUBLIC_SITE_URL:
    process.env["NEXT_PUBLIC_SITE_URL"] ?? "https://asymmetric.al",
  DATABASE_URI: process.env["DATABASE_URI"] ?? "",
  PAYLOAD_SECRET: process.env["PAYLOAD_SECRET"] ?? "",
  RESEND_API_KEY: process.env["RESEND_API_KEY"] ?? "",
  PAYLOAD_DRAFT_SECRET: process.env["PAYLOAD_DRAFT_SECRET"] ?? "",
  REVALIDATION_SECRET: process.env["REVALIDATION_SECRET"] ?? "",
  BLOB_READ_WRITE_TOKEN: process.env["BLOB_READ_WRITE_TOKEN"] ?? "",
} as const;
