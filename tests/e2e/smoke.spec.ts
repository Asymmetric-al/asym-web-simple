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

async function expectNoHorizontalOverflow(page: Page) {
  await expect
    .poll(() =>
      page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth
      )
    )
    .toBe(true);
}

test.describe("letter site smoke tests", () => {
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

  test("mobile header stays a compact brand chip without fake navigation", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await waitForUi(page);

    const brandLink = page
      .getByRole("banner")
      .getByRole("link", { name: /^Asym home$/i });

    await expect(brandLink).toBeVisible();
    await expect(page.locator("header nav")).toHaveCount(0);
    await expect(page.getByRole("button", { name: /open menu/i })).toHaveCount(0);
    await expect(
      page.getByRole("heading", { level: 1, name: /We.re building Asym\./i })
    ).toBeVisible();

    const brandBox = await brandLink.boundingBox();
    expect(brandBox?.width).toBeLessThan(180);
    expect(brandBox?.height).toBeLessThan(64);
    await expectNoHorizontalOverflow(page);
  });

  test("theme toggle applies dark mode", async ({ page }) => {
    const projectName = test.info().project.name;
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await waitForUi(page);
    await page.locator("footer").scrollIntoViewIfNeeded();

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

  test("homepage renders the founder letter and builder actions", async ({
    page,
  }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await waitForUi(page);

    await expect(
      page.getByRole("heading", { level: 1, name: /We.re building Asym\./i })
    ).toBeVisible();
    await expect(page.getByText(/We.re Conrad and Blake\./i)).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 2, name: "The vision is simple." })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", {
        level: 2,
        name: "We are looking for builders.",
      })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", {
        level: 2,
        name: "The work is ordinary before it is big.",
      })
    ).toBeVisible();
    await expect(
      page.getByText(
        /Member Care teams try to keep track of conversations, next steps, and care history/i
      )
    ).toBeVisible();
    await expect(
      page.getByText(
        /finance teams doing mission-critical work with donor money/i
      )
    ).toBeVisible();
    await expect(
      page.locator("p", { hasText: /^That bothers us\.$/ })
    ).toHaveCSS("font-weight", /^(600|700)$/);

    const emailLink = page.getByRole("link", { name: /^Send us an email\.$/i });
    await expect(emailLink).toHaveAttribute(
      "href",
      "mailto:info@asymmetric.al?subject=Building%20with%20Asym"
    );
    await expect(
      page.getByRole("link", { name: /^Contribute\.$/i })
    ).toHaveAttribute(
      "href",
      "https://github.com/Asymmetric-al/core?tab=contributing-ov-file#readme"
    );
  });

  test("brand logo sizing and theme artwork stay correct", async ({
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

    await page.goto("/", { waitUntil: "domcontentloaded" });
    await waitForUi(page);

    await expect(page.locator('header a[aria-label="Asym home"]')).toBeVisible();
    await expect(page.locator('footer a[aria-label="Asym home"]')).toBeVisible();

    const logoState = await page.evaluate(() => {
      const readMark = (selector: string) => {
        const mark = document.querySelector<HTMLElement>(selector);
        if (!mark) {
          return null;
        }

        const rect = mark.getBoundingClientRect();
        const visibleImage = Array.from(mark.querySelectorAll("img")).find(
          (image) => window.getComputedStyle(image).display !== "none"
        );

        return {
          width: Math.round(rect.width),
          height: Math.round(rect.height),
          visibleSrc: visibleImage?.getAttribute("src") ?? "",
        };
      };

      return {
        footer: readMark(
          'footer a[aria-label="Asym home"] span[aria-hidden="true"]'
        ),
        header: readMark(
          'header a[aria-label="Asym home"] span[aria-hidden="true"]'
        ),
      };
    });

    expect(logoState.header).toMatchObject({
      height: 28,
      visibleSrc: expect.stringContaining("asym-mark-dark"),
      width: 28,
    });
    expect(logoState.footer).toMatchObject({
      height: 20,
      visibleSrc: expect.stringContaining("asym-mark-dark"),
      width: 20,
    });

    await page.locator("footer").scrollIntoViewIfNeeded();
    const projectName = test.info().project.name;
    const themeToggle = page
      .getByRole("button", { name: /change color theme/i })
      .first();
    await activate(themeToggle, projectName);
    await page.getByRole("menuitem", { name: /dark/i }).click();

    const darkLogoState = await page.evaluate(() => {
      const readVisibleSrc = (selector: string) => {
        const mark = document.querySelector<HTMLElement>(selector);
        const visibleImage = Array.from(mark?.querySelectorAll("img") ?? []).find(
          (image) => window.getComputedStyle(image).display !== "none"
        );

        return visibleImage?.getAttribute("src") ?? "";
      };

      return {
        footer: readVisibleSrc(
          'footer a[aria-label="Asym home"] span[aria-hidden="true"]'
        ),
        header: readVisibleSrc(
          'header a[aria-label="Asym home"] span[aria-hidden="true"]'
        ),
      };
    });

    expect(darkLogoState.header).toContain("asym-mark-light");
    expect(darkLogoState.footer).toContain("asym-mark-light");
    await expectNoHorizontalOverflow(page);

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

  test("footer keeps contact, GitHub, legal links, and theme control", async ({
    page,
  }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await waitForUi(page);
    await page.locator("footer").scrollIntoViewIfNeeded();

    await expect(
      page.getByText(
        /Asym exists to carry the operational weight for Christian missions organizations/i
      )
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "info@asymmetric.al" })
    ).toHaveAttribute(
      "href",
      "mailto:info@asymmetric.al?subject=Building%20with%20Asym"
    );
    await expect(page.getByRole("link", { name: /^GitHub$/i })).toHaveAttribute(
      "href",
      "https://github.com/Asymmetric-al"
    );
    await expect(
      page.getByRole("button", { name: /change color theme/i })
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /^Privacy Policy$/i })
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /^Terms of Service$/i })
    ).toBeVisible();
  });

  test("missing routes land on the custom not-found page", async ({ page }) => {
    await page.goto("/does-not-exist", { waitUntil: "domcontentloaded" });

    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /The page is missing, but the letter is still here\./i,
      })
    ).toBeVisible();
    await expect(page.getByRole("link", { name: /^Letter$/i })).toBeVisible();
    await expect(
      page.getByRole("link", { name: /^Build with us$/i })
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
