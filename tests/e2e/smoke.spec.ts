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
  test.describe.configure({ timeout: 60_000 });

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
    const mobileMenu = page.getByRole("dialog").last();
    await expect(async () => {
      await expect(menuTrigger).toBeVisible();
      await activate(menuTrigger, projectName);
      await expect(mobileMenu).toBeVisible({ timeout: 10_000 });
      await expect(
        mobileMenu.getByRole("heading", {
          level: 2,
          name: /mission operating system/i,
        })
      ).toBeVisible({ timeout: 10_000 });
    }).toPass({ timeout: 12_000 });

    await mobileMenu.getByRole("link", { name: /^Platform$/i }).click();
    await expect(page).toHaveURL(/\/platform$/);
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /One mission-built system instead of a pile of tools\./i,
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

  test("platform tabs upgrade to measured trigger heights without client errors", async ({
    page,
  }) => {
    const consoleErrors: string[] = [];
    const pageErrors: string[] = [];
    const notFoundResponses: string[] = [];
    const genericResourceLoadError =
      "Failed to load resource: the server responded with a status of 404 (Not Found)";
    const ignoredLocal404Paths = new Set([
      "/_vercel/insights/script.js",
      "/_vercel/speed-insights/script.js",
    ]);

    page.on("console", (message) => {
      if (message.type() === "error") {
        consoleErrors.push(message.text());
      }
    });
    page.on("pageerror", (error) => {
      pageErrors.push(error.message);
    });
    page.on("response", (response) => {
      if (response.status() === 404) {
        notFoundResponses.push(new URL(response.url()).pathname);
      }
    });

    await page.goto("/platform", { waitUntil: "domcontentloaded" });
    await waitForUi(page);

    const tabsList = page.getByRole("tablist", {
      name: /mission control modules/i,
    });
    await expect(tabsList).toHaveAttribute("data-pretext-ready", "true");

    const triggers = tabsList.locator('[role="tab"]');
    expect(await triggers.count()).toBeGreaterThan(1);
    await expect(triggers.first()).toHaveAttribute("data-pretext-ready", "true");

    const triggerMeasurements = await triggers.evaluateAll((elements) =>
      elements.map((element) => {
        const styles = window.getComputedStyle(element);
        const minHeight = Number.parseFloat(styles.minHeight);
        const variableHeight = Number.parseFloat(
          styles.getPropertyValue("--platform-tab-trigger-min-height")
        );

        return {
          renderedHeight: Math.round(element.getBoundingClientRect().height),
          minHeight: Number.isFinite(minHeight) ? Math.round(minHeight) : null,
          variableHeight: Number.isFinite(variableHeight)
            ? Math.round(variableHeight)
            : null,
        };
      })
    );

    expect(new Set(triggerMeasurements.map((item) => item.renderedHeight)).size).toBe(
      1
    );
    expect(new Set(triggerMeasurements.map((item) => item.variableHeight)).size).toBe(
      1
    );
    expect(triggerMeasurements[0]?.minHeight).toBeGreaterThanOrEqual(144);
    expect(triggerMeasurements[0]?.variableHeight).toBeGreaterThanOrEqual(144);
    expect(triggerMeasurements[0]?.renderedHeight).toBeGreaterThanOrEqual(144);

    const unexpected404s = notFoundResponses.filter(
      (pathname) => !ignoredLocal404Paths.has(pathname)
    );
    const unexpectedConsoleErrors = consoleErrors.filter(
      (message) => message !== genericResourceLoadError || unexpected404s.length > 0
    );

    expect(unexpected404s).toEqual([]);
    expect(unexpectedConsoleErrors).toEqual([]);
    expect(pageErrors).toEqual([]);
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
