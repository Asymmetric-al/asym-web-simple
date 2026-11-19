import { expect, test } from "@playwright/test";

test.describe("legacy contributor routes", () => {
  test("redirects /contributor to the open source section", async ({ page }) => {
    await page.goto("/contributor", { waitUntil: "domcontentloaded" });

    await expect(page).toHaveURL(/\/#open-source$/u);
  });

  test("redirects /deck to the open source section", async ({ page }) => {
    await page.goto("/deck", { waitUntil: "domcontentloaded" });

    await expect(page).toHaveURL(/\/#open-source$/u);
  });
});
