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

  test("interactive status filter, configured form, and 404 menu states pass WCAG 2.2 AA", async ({
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

    const product = page.locator("#product");
    await product.getByRole("radio", { name: "Missionary" }).click();
    const roleLensLightResults = await analyzePage(page);
    expect(roleLensLightResults.violations).toEqual([]);

    await product
      .getByRole("tab", { name: "Missionary micro-CRMs" })
      .click();
    const microCrmLightResults = await analyzePage(page);
    expect(microCrmLightResults.violations).toEqual([]);

    const openSource = page.locator("#open-source");
    await openSource.getByRole("radio", { name: /^Building/u }).click();
    const partialLightResults = await analyzePage(page);
    expect(partialLightResults.violations).toEqual([]);

    await openSource.getByRole("radio", { name: /^Next/u }).click();
    const plannedLightResults = await analyzePage(page);
    expect(plannedLightResults.violations).toEqual([]);

    await openSource.getByRole("radio", { name: "Run again" }).click();
    const questions = page.locator("#questions");
    await questions.getByRole("tab").nth(1).click();
    const faqLightResults = await analyzePage(page);
    expect(faqLightResults.violations).toEqual([]);

    // Verify configured early-access form invalid state when enabled on this server
    const form = page.getByRole("form", { name: "Request early access" });
    if ((await form.count()) > 0) {
      await expect(form).toHaveAttribute("novalidate", "");
      await form.getByRole("button", { name: "Request early access" }).click();
      const formInvalidLight = await analyzePage(page);
      expect(formInvalidLight.violations).toEqual([]);
    }

    // Verify dark-mode interactive states
    await page.emulateMedia({
      reducedMotion: "reduce",
      colorScheme: "dark",
    });
    await page.waitForFunction(() =>
      document.documentElement.classList.contains("dark")
    );
    const darkInteractiveResults = await analyzePage(page);
    expect(darkInteractiveResults.violations).toEqual([]);

    await openSource.getByRole("radio", { name: /^All/u }).click();
    const darkAllResults = await analyzePage(page);
    expect(darkAllResults.violations).toEqual([]);

    // Verify open Quick-Jump Command Palette dialog passes WCAG 2.2 AA in light & dark
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.getByRole("button", { name: /^Quick jump/u }).click();
    await expect(
      page.getByRole("dialog", { name: "Quick jump navigation" })
    ).toBeVisible();
    const paletteDarkResults = await analyzePage(page);
    expect(paletteDarkResults.violations).toEqual([]);

    await page.emulateMedia({
      reducedMotion: "reduce",
      colorScheme: "light",
    });
    await page.waitForFunction(
      () => !document.documentElement.classList.contains("dark")
    );
    const paletteLightResults = await analyzePage(page);
    expect(paletteLightResults.violations).toEqual([]);
    await page.keyboard.press("Escape");

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

  test("default motion passes WCAG 2.2 AA across interactive controls", async ({
    page,
  }) => {
    await page.emulateMedia({
      reducedMotion: "no-preference",
      colorScheme: "light",
    });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.waitForFunction(
      () => document.documentElement.getAttribute("data-ui-ready") === "true"
    );

    const openSource = page.locator("#open-source");
    const inCodeRadio = openSource.getByRole("radio", { name: /^In Core/u });
    await inCodeRadio.click();

    const transitionProp = await inCodeRadio.evaluate(
      (el) => window.getComputedStyle(el).transitionProperty
    );
    expect(transitionProp).not.toContain("color");
    expect(transitionProp).not.toContain("background");

    const results = await analyzePage(page);
    expect(results.violations).toEqual([]);
  });
});
