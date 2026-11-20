import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { routeFixtures } from "../fixtures/routes";

const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

test.describe("route accessibility", () => {
  test.describe.configure({ timeout: 90_000 });

  test.skip(
    ({ browserName }) => browserName !== "chromium",
    "Axe checks run in Chromium for deterministic audits."
  );

  for (const route of routeFixtures) {
    test(`${route.slug} passes WCAG 2.2 AA in light and dark themes`, async ({
      page,
    }) => {
      await page.emulateMedia({
        reducedMotion: "reduce",
        colorScheme: "light",
      });
      await page.goto(route.path, { waitUntil: "domcontentloaded" });

      await expect(
        page.getByRole("heading", { level: 1 }).first()
      ).toBeVisible();

      const lightResults = await new AxeBuilder({ page })
        .withTags(WCAG_TAGS)
        .analyze();
      expect(lightResults.violations).toEqual([]);

      await page.emulateMedia({
        reducedMotion: "reduce",
        colorScheme: "dark",
      });
      await page.waitForFunction(() =>
        document.documentElement.classList.contains("dark")
      );
      await page.evaluate(
        () =>
          new Promise<void>((resolve) => {
            window.requestAnimationFrame(() => {
              resolve();
            });
          })
      );

      const darkResults = await new AxeBuilder({ page })
        .withTags(WCAG_TAGS)
        .analyze();
      expect(darkResults.violations).toEqual([]);
    });
  }
});
