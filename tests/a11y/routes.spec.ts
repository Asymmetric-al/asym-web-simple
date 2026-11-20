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

  test("interactive surface explorer, governance steps, and 404 menu states pass WCAG 2.2 AA", async ({
    page,
  }) => {
    await page.emulateMedia({
      reducedMotion: "reduce",
      colorScheme: "light",
    });
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.waitForFunction(
      () => document.documentElement.getAttribute("data-ui-ready") === "true"
    );

    const architecture = page.getByRole("region", {
      name: /Three surfaces, one shared record/iu,
    });
    await architecture.getByRole("tab", { name: "Missionary" }).click();
    const missionaryResults = await new AxeBuilder({ page })
      .withTags(WCAG_TAGS)
      .analyze();
    expect(missionaryResults.violations).toEqual([]);

    const appeals = page.locator("#appeals");
    await appeals
      .getByRole("button", { name: /Prepare page, email & recipient scope/iu })
      .click();
    const governanceResults = await new AxeBuilder({ page })
      .withTags(WCAG_TAGS)
      .analyze();
    expect(governanceResults.violations).toEqual([]);

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/does-not-exist", { waitUntil: "domcontentloaded" });
    await page.waitForFunction(
      () => document.documentElement.getAttribute("data-ui-ready") === "true"
    );
    await page.getByRole("button", { name: "Page sections" }).click();
    await expect(
      page.getByRole("navigation", { name: "Homepage sections" })
    ).toBeVisible();
    const notFoundMenuResults = await new AxeBuilder({ page })
      .withTags(WCAG_TAGS)
      .analyze();
    expect(notFoundMenuResults.violations).toEqual([]);
  });
});
