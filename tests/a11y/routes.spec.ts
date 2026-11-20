import { AxeBuilder } from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { routeFixtures } from "../fixtures/routes";
import type { Page } from "@playwright/test";

const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

const analyzePage = async (page: Page) => {
  const builder = new AxeBuilder({ page });
  return await builder.withTags(WCAG_TAGS).analyze();
};

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

      const lightResults = await analyzePage(page);
      expect(lightResults.violations).toEqual([]);

      await page.emulateMedia({
        reducedMotion: "reduce",
        colorScheme: "dark",
      });
      await page.waitForFunction(() =>
        document.documentElement.classList.contains("dark")
      );
      await page.waitForTimeout(50);

      const darkResults = await analyzePage(page);
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
      name: /Three workspaces on one shared record/iu,
    });
    await architecture.getByRole("tab", { name: /Missionary/iu }).click();
    const missionaryResults = await analyzePage(page);
    expect(missionaryResults.violations).toEqual([]);

    const appeals = page.locator("#appeals");
    await appeals
      .getByRole("tab", { name: /Prepare page, email & recipient scope/iu })
      .click();
    const governanceResults = await analyzePage(page);
    expect(governanceResults.violations).toEqual([]);

    // Verify configured early-access form invalid state when enabled on this server
    const form = page.getByRole("form", { name: "Request early access" });
    if ((await form.count()) > 0) {
      await form
        .getByRole("button", { name: "Request early access" })
        .click();
      const formInvalidLight = await analyzePage(page);
      expect(formInvalidLight.violations).toEqual([]);
    }

    // Verify dark-mode interactive states (Missionary + Step 02 + Step 03)
    await page.emulateMedia({
      reducedMotion: "reduce",
      colorScheme: "dark",
    });
    await page.waitForFunction(() =>
      document.documentElement.classList.contains("dark")
    );
    const darkInteractiveResults = await analyzePage(page);
    expect(darkInteractiveResults.violations).toEqual([]);

    await appeals
      .getByRole("tab", { name: /Review, edit & approve/iu })
      .click();
    const darkApprovalResults = await analyzePage(page);
    expect(darkApprovalResults.violations).toEqual([]);

    await page.emulateMedia({
      reducedMotion: "reduce",
      colorScheme: "light",
    });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/does-not-exist", { waitUntil: "domcontentloaded" });
    await page.waitForFunction(
      () => document.documentElement.getAttribute("data-ui-ready") === "true"
    );
    await page.getByRole("button", { name: "Page sections" }).click();
    await expect(
      page.getByRole("navigation", { name: "Homepage sections" })
    ).toBeVisible();
    const notFoundMenuResults = await analyzePage(page);
    expect(notFoundMenuResults.violations).toEqual([]);
  });
});
