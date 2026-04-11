import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { routeFixtures } from "../fixtures/routes";

test.describe("route accessibility", () => {
  test.describe.configure({ timeout: 60_000 });

  test.skip(
    ({ browserName }) => browserName !== "chromium",
    "Axe checks run in Chromium for deterministic audits."
  );

  for (const route of routeFixtures) {
    test(`${route.slug} has no critical accessibility violations`, async ({
      page,
    }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(route.path, { waitUntil: "domcontentloaded" });
      await expect(page.getByRole("heading", { level: 1 }).first()).toBeVisible();

      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa"])
        .analyze();

      expect(accessibilityScanResults.violations).toEqual([]);
    });
  }
});
