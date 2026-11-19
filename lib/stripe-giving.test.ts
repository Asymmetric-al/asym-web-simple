import { describe, expect, it } from "vitest";
import {
  isValidCheckoutSessionId,
  normalizeOptionalDonorEmail,
} from "./stripe-giving";

describe("isValidCheckoutSessionId", () => {
  it("accepts cs_test_ and cs_live_ Stripe session ids", () => {
    expect(isValidCheckoutSessionId("cs_test_a1B2c3D4e5F6")).toBeTruthy();
    expect(isValidCheckoutSessionId("cs_live_x9Y8z7W6v5U4")).toBeTruthy();
  });

  it("trims whitespace", () => {
    expect(isValidCheckoutSessionId("  cs_test_abc123  ")).toBeTruthy();
  });

  it("rejects wrong prefix, empty, and malformed ids", () => {
    expect(isValidCheckoutSessionId("")).toBeFalsy();
    expect(isValidCheckoutSessionId("cs_")).toBeFalsy();
    expect(isValidCheckoutSessionId("cs_foo_bar")).toBeFalsy();
    expect(isValidCheckoutSessionId("pi_test_abc123")).toBeFalsy();
    expect(isValidCheckoutSessionId("not_a_session")).toBeFalsy();
  });

  it("rejects ids that are too long", () => {
    const longId = `cs_test_${"a".repeat(200)}`;

    expect(longId.length).toBeGreaterThan(128);
    expect(isValidCheckoutSessionId(longId)).toBeFalsy();
  });

  it("rejects ids with invalid characters", () => {
    expect(isValidCheckoutSessionId("cs_test_abc+def")).toBeFalsy();
    expect(isValidCheckoutSessionId("cs_test_abc def")).toBeFalsy();
  });
});

describe("normalizeOptionalDonorEmail", () => {
  it("returns null for non-strings, empty, and whitespace-only", () => {
    expect(normalizeOptionalDonorEmail(undefined)).toBeNull();
    expect(normalizeOptionalDonorEmail(null)).toBeNull();
    expect(normalizeOptionalDonorEmail(1)).toBeNull();
    expect(normalizeOptionalDonorEmail("")).toBeNull();
    expect(normalizeOptionalDonorEmail(" ".repeat(3))).toBeNull();
  });

  it("returns trimmed valid emails", () => {
    expect(normalizeOptionalDonorEmail("  donor@example.org  ")).toBe(
      "donor@example.org"
    );
  });

  it("rejects invalid format", () => {
    expect(normalizeOptionalDonorEmail("not-an-email")).toBeNull();
    expect(normalizeOptionalDonorEmail("@nodomain.com")).toBeNull();
  });

  it("rejects over 254 characters", () => {
    const local = "a".repeat(250);
    const tooLong = `${local}@x.co`;

    expect(tooLong.length).toBeGreaterThan(254);
    expect(normalizeOptionalDonorEmail(tooLong)).toBeNull();
  });
});
