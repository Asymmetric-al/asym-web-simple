import { expect, test } from "@playwright/test";

test.describe("retired legacy donation routes", () => {
  for (const endpoint of [
    "/api/donations/checkout-session",
    "/api/donations/billing-portal",
    "/api/webhooks/stripe",
  ]) {
    test(`POST ${endpoint} returns 410 Gone`, async ({ request }) => {
      const res = await request.post(endpoint, { data: {} });
      expect(res.status()).toBe(410);
    });
  }
});
