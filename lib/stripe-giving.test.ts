import { describe, expect, it } from "vitest";
import {
  isValidCheckoutSessionId,
  normalizeOptionalDonorEmail,
} from "./stripe-giving";

describe("isValidCheckoutSessionId", () => {
  it("accepts cs_test_ and cs_live_ Stripe session ids", () => {
    expect(isValidCheckoutSessionId("cs_test_a1B2c3D4e5F6")).toBe(true);
    expect(isValidCheckoutSessionId("cs_live_x9Y8z7W6v5U4")).toBe(true);
  });

  it("trims whitespace", () => {
    expect(isValidCheckoutSessionId("  cs_test_abc123  ")).toBe(true);
  });

  it("rejects wrong prefix, empty, and malformed ids", () => {
    expect(isValidCheckoutSessionId("")).toBe(false);
    expect(isValidCheckoutSessionId("cs_")).toBe(false);
    expect(isValidCheckoutSessionId("cs_foo_bar")).toBe(false);
    expect(isValidCheckoutSessionId("pi_test_abc123")).toBe(false);
    expect(isValidCheckoutSessionId("not_a_session")).toBe(false);
  });

  it("rejects ids that are too long", () => {
    const longId = `cs_test_${"a".repeat(200)}`;
    expect(longId.length).toBeGreaterThan(128);
    expect(isValidCheckoutSessionId(longId)).toBe(false);
  });

  it("rejects ids with invalid characters", () => {
    expect(isValidCheckoutSessionId("cs_test_abc+def")).toBe(false);
    expect(isValidCheckoutSessionId("cs_test_abc def")).toBe(false);
  });
});

describe("normalizeOptionalDonorEmail", () => {
  it("returns null for non-strings, empty, and whitespace-only", () => {
    expect(normalizeOptionalDonorEmail(undefined)).toBe(null);
    expect(normalizeOptionalDonorEmail(null)).toBe(null);
    expect(normalizeOptionalDonorEmail(1)).toBe(null);
    expect(normalizeOptionalDonorEmail("")).toBe(null);
    expect(normalizeOptionalDonorEmail("   ")).toBe(null);
  });

  it("returns trimmed valid emails", () => {
    expect(normalizeOptionalDonorEmail("  donor@example.org  ")).toBe(
      "donor@example.org",
    );
  });

  it("rejects invalid format", () => {
    expect(normalizeOptionalDonorEmail("not-an-email")).toBe(null);
    expect(normalizeOptionalDonorEmail("@nodomain.com")).toBe(null);
  });

  it("rejects over 254 characters", () => {
    const local = "a".repeat(250);
    const tooLong = `${local}@x.co`;
    expect(tooLong.length).toBeGreaterThan(254);
    expect(normalizeOptionalDonorEmail(tooLong)).toBe(null);
  });
});
