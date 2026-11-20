import { expect, test } from "@playwright/test";
import { routeFixtures } from "../fixtures/routes";
import { routeSanityViewports } from "../fixtures/viewports";
import type { Page } from "@playwright/test";
import type { ViewportFixture } from "../fixtures/viewports";

const genericResourceLoadError =
  "Failed to load resource: the server responded with a status of 404 (Not Found)";
const ignoredLocal404Paths = new Set([
  "/_vercel/insights/script.js",
  "/_vercel/speed-insights/script.js",
]);

function createBrowserIssueTracker(page: Page) {
  interface BrowserIssueCheckpoint {
    consoleErrors: number;
    pageErrors: number;
    notFoundResponses: number;
  }
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
    checkpoint: (): BrowserIssueCheckpoint => ({
      consoleErrors: consoleErrors.length,
      pageErrors: pageErrors.length,
      notFoundResponses: notFoundResponses.length,
    }),
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
        { timeout: 5000 }
      )
      .toBe("true");
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
          const { body } = document;
          const bodyOverflow =
            body === null ? 0 : body.scrollWidth - root.clientWidth;
          return Math.max(root.scrollWidth - root.clientWidth, bodyOverflow);
        }),
      {
        timeout: 5000,
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
        timeout: 5000,
        message: `${context} should not leave a dialog visibly open`,
      }
    )
    .toBe(0);
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

  test("home header keeps brand, navigation, and action across viewport changes", async ({
    page,
  }) => {
    const issues = createBrowserIssueTracker(page);
    const banner = page.getByRole("banner");
    const brandLink = banner.getByRole("link", { name: /^asym home$/i });
    const mainNav = page.getByRole("navigation", { name: "Main" });

    await setViewport(page, { label: "1440x900", width: 1440, height: 900 });
    let checkpoint = issues.checkpoint();
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await waitForUi(page);

    await expect(brandLink).toBeVisible();
    await expect(mainNav).toBeVisible();
    await expect(
      banner.getByRole("link", {
        name: /^(Request early access|Early access status|Early access)$/,
      })
    ).toBeVisible();
    await expectNoHorizontalOverflow(page, "home @ 1440x900");
    issues.expectNoUnexpectedIssuesSince(checkpoint, "home @ 1440x900");

    await setViewport(page, { label: "390x844", width: 390, height: 844 });
    checkpoint = issues.checkpoint();

    await expect(brandLink).toBeVisible();
    await expect(mainNav).toBeHidden();
    await expect(
      banner.getByRole("link", { name: /^(Early access|Access status)$/ })
    ).toBeVisible();
    await expectNoVisibleDialogs(page, "home @ 390x844");
    await expectNoHorizontalOverflow(page, "home @ 390x844");
    issues.expectNoUnexpectedIssuesSince(checkpoint, "home @ 390x844");

    await setViewport(page, { label: "640x900", width: 640, height: 900 });
    const clipCheck = await page.evaluate(() => {
      const plate = document.querySelector(".wf-plate");
      const nodes = [...document.querySelectorAll(".wf-inline-chip")];
      if (!plate || nodes.length === 0) return { ok: false, overflowPx: 999 };
      const plateRight = plate.getBoundingClientRect().right;
      const maxNodeRight = Math.max(
        ...nodes.map((node) => node.getBoundingClientRect().right)
      );
      return {
        ok: maxNodeRight <= plateRight - 8,
        overflowPx: Math.round(maxNodeRight - plateRight),
      };
    });
    expect(clipCheck.ok).toBeTruthy();
  });

  test("home footer remains accessible after repeated viewport changes", async ({
    page,
  }) => {
    const issues = createBrowserIssueTracker(page);
    const footer = page.locator("footer");

    for (const viewport of [
      { label: "390x844", width: 390, height: 844 },
      { label: "1280x900", width: 1280, height: 900 },
      { label: "390x844", width: 390, height: 844 },
    ]) {
      await setViewport(page, viewport);
      const checkpoint = issues.checkpoint();
      if (page.url() === "about:blank") {
        await page.goto("/", { waitUntil: "domcontentloaded" });
        await waitForUi(page);
      }
      await footer.scrollIntoViewIfNeeded();

      await expect(
        footer.getByRole("link", { name: /^GitHub/u })
      ).toBeVisible();
      await expect(footer.getByRole("link", { name: "Privacy" })).toBeVisible();
      await expect(
        footer.getByRole("radiogroup", { name: /color theme/i })
      ).toBeVisible();
      await expectNoHorizontalOverflow(page, `home footer @ ${viewport.label}`);
      issues.expectNoUnexpectedIssuesSince(
        checkpoint,
        `home footer @ ${viewport.label}`
      );
    }
  });
});
