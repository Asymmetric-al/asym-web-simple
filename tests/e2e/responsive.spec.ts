import { expect, test, type Page } from "@playwright/test";
import { routeFixtures } from "../fixtures/routes";
import {
  orientationPairs,
  platformStressViewports,
  routeSanityViewports,
  type ViewportFixture,
} from "../fixtures/viewports";

const genericResourceLoadError =
  "Failed to load resource: the server responded with a status of 404 (Not Found)";
const ignoredLocal404Paths = new Set([
  "/_vercel/insights/script.js",
  "/_vercel/speed-insights/script.js",
]);

type BrowserIssueCheckpoint = {
  consoleErrors: number;
  pageErrors: number;
  notFoundResponses: number;
};

function createBrowserIssueTracker(page: Page) {
  const consoleErrors: string[] = [];
  const pageErrors: string[] = [];
  const notFoundResponses: string[] = [];

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

  return {
    checkpoint(): BrowserIssueCheckpoint {
      return {
        consoleErrors: consoleErrors.length,
        pageErrors: pageErrors.length,
        notFoundResponses: notFoundResponses.length,
      };
    },
    expectNoUnexpectedIssuesSince(
      checkpoint: BrowserIssueCheckpoint,
      context: string
    ) {
      const new404s = notFoundResponses.slice(checkpoint.notFoundResponses);
      const unexpected404s = new404s.filter(
        (pathname) => !ignoredLocal404Paths.has(pathname)
      );
      const newConsoleErrors = consoleErrors.slice(checkpoint.consoleErrors);
      const unexpectedConsoleErrors = newConsoleErrors.filter(
        (message) =>
          message !== genericResourceLoadError || unexpected404s.length > 0
      );

      expect(unexpected404s, `${context} unexpected 404s`).toEqual([]);
      expect(
        unexpectedConsoleErrors,
        `${context} unexpected console errors`
      ).toEqual([]);
      expect(
        pageErrors.slice(checkpoint.pageErrors),
        `${context} page errors`
      ).toEqual([]);
    },
  };
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

async function setViewport(page: Page, viewport: ViewportFixture) {
  await page.setViewportSize({
    width: viewport.width,
    height: viewport.height,
  });
}

async function expectNoHorizontalOverflow(page: Page, context: string) {
  await expect
    .poll(
      () =>
        page.evaluate(() => {
          const root = document.documentElement;
          const body = document.body;
          const bodyOverflow =
            body === null ? 0 : body.scrollWidth - root.clientWidth;
          return Math.max(root.scrollWidth - root.clientWidth, bodyOverflow);
        }),
      {
        timeout: 5_000,
        message: `${context} should not overflow horizontally`,
      }
    )
    .toBeLessThanOrEqual(1);
}

async function expectNoVisibleDialogs(page: Page, context: string) {
  await expect
    .poll(
      () =>
        page.evaluate(
          () =>
            Array.from(
              document.querySelectorAll<HTMLElement>('[role="dialog"]')
            ).filter((element) => {
              const styles = window.getComputedStyle(element);
              const rect = element.getBoundingClientRect();

              return (
                styles.display !== "none" &&
                styles.visibility !== "hidden" &&
                rect.width > 0 &&
                rect.height > 0
              );
            }).length
        ),
      {
        timeout: 5_000,
        message: `${context} should not leave a dialog visibly open`,
      }
    )
    .toBe(0);
}

async function readPlatformTriggerHeights(page: Page): Promise<{
  renderedHeights: number[];
  variableHeights: number[];
}> {
  const triggers = page
    .getByRole("tablist", { name: /mission control modules/i })
    .getByRole("tab");

  return triggers.evaluateAll((elements) => ({
    renderedHeights: elements.map((element) =>
      Math.round(element.getBoundingClientRect().height)
    ),
    variableHeights: elements.map((element) => {
      const value = Number.parseFloat(
        window
          .getComputedStyle(element)
          .getPropertyValue("--platform-tab-trigger-min-height")
      );

      return Number.isFinite(value) ? Math.round(value) : 0;
    }),
  }));
}

async function assertPlatformTabsStable(page: Page, context: string) {
  const tabsList = page.getByRole("tablist", {
    name: /mission control modules/i,
  });
  const triggers = tabsList.getByRole("tab");

  await expect(tabsList, `${context} tablist should upgrade`).toHaveAttribute(
    "data-pretext-ready",
    "true"
  );
  await expect(
    triggers.first(),
    `${context} first trigger should upgrade`
  ).toHaveAttribute("data-pretext-ready", "true");

  await expect
    .poll(
      async () => {
        const { renderedHeights } = await readPlatformTriggerHeights(page);
        return Math.max(...renderedHeights) - Math.min(...renderedHeights);
      },
      {
        timeout: 10_000,
        message: `${context} rendered trigger heights should converge`,
      }
    )
    .toBeLessThanOrEqual(1);

  await expect
    .poll(
      async () => {
        const { variableHeights } = await readPlatformTriggerHeights(page);
        return Math.max(...variableHeights) - Math.min(...variableHeights);
      },
      {
        timeout: 10_000,
        message: `${context} measured trigger heights should converge`,
      }
    )
    .toBeLessThanOrEqual(1);

  await expect
    .poll(
      async () => {
        const { renderedHeights } = await readPlatformTriggerHeights(page);
        return Math.min(...renderedHeights);
      },
      {
        timeout: 10_000,
        message: `${context} rendered trigger height floor should remain intact`,
      }
    )
    .toBeGreaterThanOrEqual(144);
}

async function assertPlatformTabSwitching(
  page: Page,
  context: string,
  index: number
) {
  const tabAssertions = [
    {
      name: /Partners CRM/i,
      panelText: /A missions-built CRM for people, churches, and pledges/i,
    },
    {
      name: /Web Studio/i,
      panelText:
        /The power of Next\.js with a visual CMS experience so agencies control their sites without change-order lock-in\./i,
    },
    {
      name: /Mobilize/i,
      panelText:
        /Visual workflow orchestration for candidates, onboarding, and deployment using Zapier's ecosystem without spaghetti logic\./i,
    },
  ] as const;
  const target = tabAssertions[index % tabAssertions.length]!;

  await page.getByRole("tab", { name: target.name }).click();
  await expect(
    page.getByRole("tabpanel", { name: target.name }),
    `${context} tab panel should stay interactive`
  ).toContainText(target.panelText);
}

test.describe("responsive regression coverage", () => {
  test.describe.configure({ mode: "serial", timeout: 240_000 });

  test.beforeEach(async ({ page }) => {
    test.skip(
      test.info().project.name !== "chromium",
      "Responsive stress coverage is maintained in desktop Chromium only."
    );
    await page.emulateMedia({ reducedMotion: "reduce" });
  });

  for (const viewport of routeSanityViewports) {
    test(`public routes stay stable at ${viewport.label}`, async ({ page }) => {
      const issues = createBrowserIssueTracker(page);
      await setViewport(page, viewport);

      for (const route of routeFixtures) {
        const checkpoint = issues.checkpoint();
        const context = `${route.slug} @ ${viewport.label}`;

        await page.goto(route.path, { waitUntil: "domcontentloaded" });
        await waitForUi(page);
        await expect(
          page.getByRole("heading", { level: 1 }).first(),
          `${context} should render a visible h1`
        ).toBeVisible();
        await expectNoHorizontalOverflow(page, context);
        await expectNoVisibleDialogs(page, context);
        issues.expectNoUnexpectedIssuesSince(checkpoint, context);
      }
    });
  }

  test("/platform stays measured and interactive across resize stress", async ({
    page,
  }) => {
    const issues = createBrowserIssueTracker(page);
    await setViewport(page, platformStressViewports[0]!);

    await page.goto("/platform", { waitUntil: "domcontentloaded" });
    await waitForUi(page);

    let interactionIndex = 0;

    for (const viewport of platformStressViewports) {
      const checkpoint = issues.checkpoint();
      const context = `/platform @ ${viewport.label}`;

      await setViewport(page, viewport);
      await assertPlatformTabsStable(page, context);
      await assertPlatformTabSwitching(page, context, interactionIndex);
      await expectNoHorizontalOverflow(page, context);
      await expectNoVisibleDialogs(page, context);
      issues.expectNoUnexpectedIssuesSince(checkpoint, context);
      interactionIndex += 1;
    }

    for (const pair of orientationPairs) {
      const portraitCheckpoint = issues.checkpoint();
      const portraitContext = `/platform @ ${pair.portrait.label}`;
      await setViewport(page, pair.portrait);
      await assertPlatformTabsStable(page, portraitContext);
      await assertPlatformTabSwitching(page, portraitContext, interactionIndex);
      await expectNoHorizontalOverflow(page, portraitContext);
      issues.expectNoUnexpectedIssuesSince(portraitCheckpoint, portraitContext);
      interactionIndex += 1;

      const landscapeCheckpoint = issues.checkpoint();
      const landscapeContext = `/platform @ ${pair.landscape.label}`;
      await setViewport(page, pair.landscape);
      await assertPlatformTabsStable(page, landscapeContext);
      await assertPlatformTabSwitching(
        page,
        landscapeContext,
        interactionIndex
      );
      await expectNoHorizontalOverflow(page, landscapeContext);
      issues.expectNoUnexpectedIssuesSince(
        landscapeCheckpoint,
        landscapeContext
      );
      interactionIndex += 1;
    }
  });

  test("home header hands off cleanly between desktop and mobile nav", async ({
    page,
  }) => {
    const issues = createBrowserIssueTracker(page);
    const primaryNav = page.getByRole("navigation", {
      name: /primary navigation/i,
    });
    const menuTrigger = page.getByRole("button", { name: /open menu/i });

    await setViewport(page, { label: "1440x900", width: 1440, height: 900 });
    let checkpoint = issues.checkpoint();
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await waitForUi(page);
    await expect(primaryNav).toBeVisible();
    await expect(menuTrigger).toBeHidden();
    await expectNoHorizontalOverflow(page, "home @ 1440x900");
    issues.expectNoUnexpectedIssuesSince(checkpoint, "home @ 1440x900");

    await setViewport(page, { label: "390x844", width: 390, height: 844 });
    checkpoint = issues.checkpoint();
    await expect(primaryNav).toBeHidden();
    await expect(menuTrigger).toBeVisible();
    await menuTrigger.click();

    const mobileDialog = page.getByRole("dialog").last();
    await expect(mobileDialog).toBeVisible();
    await mobileDialog.getByRole("link", { name: /^Platform$/i }).click();
    await expect(page).toHaveURL(/\/platform$/);
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /One Surface\. Total Clarity\./i,
      })
    ).toBeVisible();
    issues.expectNoUnexpectedIssuesSince(
      checkpoint,
      "home -> mobile sheet -> platform"
    );

    await setViewport(page, { label: "1280x900", width: 1280, height: 900 });
    checkpoint = issues.checkpoint();
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await waitForUi(page);
    await expect(primaryNav).toBeVisible();
    await expect(menuTrigger).toBeHidden();
    await expectNoVisibleDialogs(page, "home @ 1280x900 after mobile handoff");
    await expectNoHorizontalOverflow(
      page,
      "home @ 1280x900 after mobile handoff"
    );
    issues.expectNoUnexpectedIssuesSince(
      checkpoint,
      "home @ 1280x900 after mobile handoff"
    );
  });

  test("give faq remains interactive after repeated viewport changes", async ({
    page,
  }) => {
    const issues = createBrowserIssueTracker(page);

    await setViewport(page, { label: "390x844", width: 390, height: 844 });
    let checkpoint = issues.checkpoint();
    await page.goto("/give", { waitUntil: "domcontentloaded" });
    await waitForUi(page);

    await page
      .getByRole("button", { name: /Can I give via check or DAF\?/i })
      .click();
    await expect(
      page.getByText(/donor-advised fund coordination\./i)
    ).toBeVisible();
    await expectNoHorizontalOverflow(page, "give @ 390x844");
    issues.expectNoUnexpectedIssuesSince(checkpoint, "give @ 390x844");

    await setViewport(page, { label: "1280x900", width: 1280, height: 900 });
    checkpoint = issues.checkpoint();
    await page
      .getByRole("button", { name: /Is my gift tax-deductible\?/i })
      .click();
    await expect(
      page.getByText(/fully tax-deductible in the United States\./i)
    ).toBeVisible();
    await expectNoHorizontalOverflow(page, "give @ 1280x900");
    issues.expectNoUnexpectedIssuesSince(checkpoint, "give @ 1280x900");

    await setViewport(page, { label: "390x844", width: 390, height: 844 });
    checkpoint = issues.checkpoint();
    await page
      .getByRole("button", { name: /Who controls the funds\?/i })
      .click();
    await expect(
      page.getByText(
        /Global Fellowship board, which provides financial accountability/i
      )
    ).toBeVisible();
    await expectNoHorizontalOverflow(page, "give @ 390x844 repeated");
    issues.expectNoUnexpectedIssuesSince(checkpoint, "give @ 390x844 repeated");
  });
});
