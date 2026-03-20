import { expect, test, type Locator, type Page } from "@playwright/test";

async function activate(locator: Locator, projectName: string) {
  if (projectName.startsWith("mobile")) {
    await locator.tap();
    return;
  }

  if (projectName === "webkit") {
    await locator.evaluate((element: HTMLElement) => element.click());
    return;
  }

  await locator.click();
}

async function waitForUi(page: Page) {
  try {
    await expect
      .poll(
        () =>
          page.evaluate(() =>
            document.documentElement.getAttribute("data-ui-ready")
          ),
        { timeout: 5_000 }
      )
      .toBe("true");
    return;
  } catch {
    await page.waitForLoadState("load");
    await page.waitForTimeout(250);
  }
}

test.describe("marketing site smoke tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
  });

  test("skip link moves focus into the main content landmark", async ({
    page,
    browserName,
  }) => {
    test.skip(
      browserName === "webkit",
      "WebKit requires OS-level full keyboard access before Tab will focus links."
    );

    await page.goto("/", { waitUntil: "domcontentloaded" });

    await page.keyboard.press("Tab");
    await expect(
      page.getByRole("link", { name: /skip to main content/i })
    ).toBeFocused();

    await page.keyboard.press("Enter");
    await expect(page.locator("#main-content")).toBeFocused();
  });

  test("mobile navigation opens and routes to platform", async ({
    page,
  }) => {
    const projectName = test.info().project.name;
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await waitForUi(page);

    const menuTrigger = page.getByRole("button", { name: /open menu/i });
    await expect(async () => {
      await expect(menuTrigger).toBeVisible();
      await activate(menuTrigger, projectName);
      await expect(
        page.getByRole("heading", {
          level: 2,
          name: /mission operating system/i,
        })
      ).toBeVisible({ timeout: 10_000 });
    }).toPass({ timeout: 12_000 });

    await page.getByRole("link", { name: /^Platform$/i }).click();
    await expect(page).toHaveURL(/\/platform$/);
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /One Surface\. Total Clarity\./i,
      })
    ).toBeVisible();
  });

  test("theme toggle applies dark mode", async ({ page }) => {
    const projectName = test.info().project.name;
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await waitForUi(page);

    const themeToggle = page
      .getByRole("button", { name: /change color theme/i })
      .first();

    await expect(async () => {
      await expect(themeToggle).toBeVisible();
      await activate(themeToggle, projectName);
      await expect(page.getByRole("menuitem", { name: /dark/i })).toBeVisible();
    }).toPass({ timeout: 6_000 });
    await expect(page.getByRole("menuitem", { name: /dark/i })).toBeVisible();
    await page.getByRole("menuitem", { name: /dark/i }).click();

    await expect(page.locator("html")).toHaveClass(/dark/);
  });

  test("platform tabs switch visible content", async ({ page }) => {
    const projectName = test.info().project.name;
    await page.goto("/platform", { waitUntil: "domcontentloaded" });
    await waitForUi(page);

    const mobilizeTab = page.getByRole("tab", { name: /Mobilize/i });
    const mobilizePanel = page.getByRole("tabpanel", { name: /Mobilize/i });
    await expect(async () => {
      await expect(mobilizeTab).toBeVisible();
      await activate(mobilizeTab, projectName);
      await expect(mobilizePanel).toContainText(
        /Visual workflow orchestration for candidates, onboarding, and deployment using Zapier's ecosystem without spaghetti logic\./i,
        { timeout: 10_000 }
      );
    }).toPass({ timeout: 12_000 });
    await expect(mobilizePanel).toContainText(
      /Visual workflow orchestration for candidates, onboarding, and deployment using Zapier's ecosystem without spaghetti logic\./i
    );
  });

  test("give FAQ expands the answer body", async ({ page }) => {
    const projectName = test.info().project.name;
    await page.goto("/give", { waitUntil: "domcontentloaded" });
    await waitForUi(page);

    const trigger = page.getByRole("button", {
      name: /Can I give via check or DAF\?/i,
    });
    await expect(async () => {
      await expect(trigger).toBeVisible();
      await activate(trigger, projectName);
      await expect(
        page.getByText(/donor-advised fund coordination\./i)
      ).toBeVisible();
    }).toPass({ timeout: 6_000 });

    await expect(page.getByText(/donor-advised fund coordination\./i)).toBeVisible();
  });

  test("missing routes land on the custom not-found page", async ({ page }) => {
    await page.goto("/does-not-exist", { waitUntil: "domcontentloaded" });

    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /The page is missing, but the path forward is clear\./i,
      })
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /Contact us/i }).first()
    ).toBeVisible();
  });

  test("layout bootstraps analytics and speed insights", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    await expect
      .poll(async () =>
        page.evaluate(() => ({
          analytics: typeof window.va,
          speedInsights: typeof window.si,
        }))
      )
      .toEqual({
        analytics: "function",
        speedInsights: "function",
      });
  });

  test("route errors render the boundary and enqueue telemetry", async ({
    page,
  }) => {
    await page.goto("/qa/error?trigger=1", { waitUntil: "domcontentloaded" });

    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /Something failed inside the current page\./i,
      })
    ).toBeVisible();

    await expect
      .poll(async () =>
        page.evaluate(() =>
          (window.vaq ?? []).some(
            ([event, payload]) =>
              event === "event" &&
              typeof payload === "object" &&
              payload !== null &&
              "name" in payload &&
              payload.name === "route_error"
          )
        )
      )
      .toBe(true);
  });
});
