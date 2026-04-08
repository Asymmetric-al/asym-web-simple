import { expect, test } from "@playwright/test";

test.describe("Stripe giving API contracts", () => {
  test("POST /api/donations/checkout-session rejects invalid JSON with 400", async ({
    request,
  }) => {
    const res = await request.post("/api/donations/checkout-session", {
      headers: { "Content-Type": "application/json" },
      data: Buffer.from("not-json", "utf8"),
    });
    expect(res.status()).toBe(400);
    const body = (await res.json()) as { error?: string };
    expect(body.error).toMatch(/invalid json/i);
  });

  test("POST /api/donations/checkout-session returns 503 when giving is not configured", async ({
    request,
  }) => {
    test.skip(
      Boolean(process.env.STRIPE_SECRET_KEY),
      "STRIPE_SECRET_KEY is set; server creates sessions instead of 503",
    );

    const res = await request.post("/api/donations/checkout-session", {
      data: {
        mode: "payment",
        amountCents: 10_000,
      },
    });
    expect(res.status()).toBe(503);
    const body = (await res.json()) as { error?: string };
    expect(body.error).toMatch(/not configured|Giving is not configured/i);
  });

  test("POST /api/webhooks/stripe returns 400 without stripe-signature header", async ({
    request,
  }) => {
    const res = await request.post("/api/webhooks/stripe", {
      data: "{}",
      headers: { "Content-Type": "application/json" },
    });
    expect(res.status()).toBe(400);
    const body = (await res.json()) as { error?: string };
    expect(body.error).toMatch(/stripe-signature|signature/i);
  });
});

test.describe("Stripe giving API validation (requires STRIPE_SECRET_KEY on webServer)", () => {
  test("POST checkout-session rejects invalid mode with 422", async ({
    request,
  }) => {
    test.skip(
      !process.env.STRIPE_SECRET_KEY,
      "Set STRIPE_SECRET_KEY for the Playwright webServer to run validation tests.",
    );
    const res = await request.post("/api/donations/checkout-session", {
      data: { mode: "invalid" },
    });
    expect(res.status()).toBe(422);
  });

  test("POST checkout-session rejects invalid one-time amount with 422", async ({
    request,
  }) => {
    test.skip(
      !process.env.STRIPE_SECRET_KEY,
      "Set STRIPE_SECRET_KEY for the Playwright webServer to run validation tests.",
    );
    const res = await request.post("/api/donations/checkout-session", {
      data: { mode: "payment", amountCents: 1 },
    });
    expect(res.status()).toBe(422);
  });

  test("POST billing-portal rejects malformed session id with 422", async ({
    request,
  }) => {
    test.skip(
      !process.env.STRIPE_SECRET_KEY,
      "Set STRIPE_SECRET_KEY for the Playwright webServer to run validation tests.",
    );
    const res = await request.post("/api/donations/billing-portal", {
      data: { sessionId: "not-a-real-session" },
    });
    expect(res.status()).toBe(422);
  });
});
