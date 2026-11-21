import { expect, test } from "@playwright/test";
import type { Locator, Page } from "@playwright/test";

const UI_READY_TIMEOUT_MS = 5000;
const SETTLE_MS = 250;
const SUITE_TIMEOUT_MS = 60_000;
const REPO_URL = "https://github.com/Asymmetric-al/core";
const EARLY_ACCESS_API = "**/api/early-access";

const activate = async (locator: Locator, projectName: string) => {
  if (projectName.startsWith("mobile")) {
    await locator.tap();
    return;
  }
  if (projectName === "webkit") {
    await locator.evaluate((element: HTMLElement) => element.click());
    return;
  }
  await locator.click();
};

const waitForUi = async (page: Page) => {
  try {
    await expect
      .poll(
        () =>
          page.evaluate(() =>
            document.documentElement.getAttribute("data-ui-ready")
          ),
        { timeout: UI_READY_TIMEOUT_MS }
      )
      .toBe("true");
  } catch {
    await page.waitForLoadState("load");
    await page.waitForTimeout(SETTLE_MS);
  }
};

const expectNoHorizontalOverflow = async (page: Page) => {
  await expect
    .poll(() =>
      page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth
      )
    )
    .toBeTruthy();
};

const earlyAccessForm = (page: Page) =>
  page.getByRole("form", { name: "Request early access" });

const fillEarlyAccess = async (page: Page) => {
  const form = earlyAccessForm(page);
  await form.getByLabel("Email").fill("director@example.org");
  await form.getByLabel("Organization").fill("Example Missions");
  await form
    .getByLabel(/What would you like asym to help with/u)
    .fill("Year-end appeals");
  return form;
};

test.describe("homepage smoke tests", () => {
  test.describe.configure({ timeout: SUITE_TIMEOUT_MS });

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
      page.getByRole("link", { name: /skip to main content/iu })
    ).toBeFocused();

    await page.keyboard.press("Enter");

    await expect(page.locator("#main-content")).toBeFocused();
  });

  test("hero states the product, stage, and primary action", async ({
    page,
  }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    await expect(page).toHaveTitle(
      "asym | Open-source giving and donor records for missions organizations"
    );
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "One gift. Three hands.",
      })
    ).toBeVisible();
    await expect(
      page.getByText(
        "Open-source giving and donor records for missions organizations",
        {
          exact: true,
        }
      )
    ).toBeVisible();
    await expect(
      page
        .getByRole("main")
        .getByRole("link", {
          name: /^(?:Request early access|Explore the three roles)$/u,
        })
        .first()
    ).toHaveAttribute("href", /^\/#(?:early-access|product)$/u);
    await expect(
      page.getByRole("link", { name: /^View the code/u }).first()
    ).toHaveAttribute("href", REPO_URL);
  });

  test("surface explorer switches real core surfaces with keyboard and governance sequence explains human approval", async ({
    page,
  }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await waitForUi(page);

    const architecture = page.getByRole("region", {
      name: /Three workspaces on one shared record/iu,
    });
    await expect(architecture).toContainText("apps/donor");
    await expect(
      architecture.getByRole("heading", {
        level: 3,
        name: /Signed-in donors pull their own receipts and annual statements/iu,
      })
    ).toBeVisible();

    const donorHeight = await architecture.evaluate(
      (el) => el.getBoundingClientRect().height
    );

    const missionaryTab = architecture.getByRole("tab", {
      name: /Missionary/iu,
    });
    await missionaryTab.click();
    await expect(
      architecture.getByRole("heading", {
        level: 3,
        name: /Field workers follow assigned support with donors private by default/iu,
      })
    ).toBeVisible();
    await expect(architecture).toContainText("Anonymous partner");

    const missionaryHeight = await architecture.evaluate(
      (el) => el.getBoundingClientRect().height
    );
    expect(Math.abs(missionaryHeight - donorHeight)).toBeLessThanOrEqual(2);

    const isDesktop = (page.viewportSize()?.width ?? 1280) >= 1024;
    await expect(architecture.getByRole("tablist")).toHaveAttribute(
      "data-orientation",
      isDesktop ? "vertical" : "horizontal"
    );
    await missionaryTab.focus();
    await page.keyboard.press(isDesktop ? "ArrowDown" : "ArrowRight");
    await expect(
      architecture.getByRole("tab", { name: /Office/iu })
    ).toHaveAttribute("aria-selected", "true");
    await expect(
      architecture.getByRole("heading", {
        level: 3,
        name: /Staff manage donor and household records and preview bulk actions before running/iu,
      })
    ).toBeVisible();

    const officeHeight = await architecture.evaluate(
      (el) => el.getBoundingClientRect().height
    );
    expect(Math.abs(officeHeight - donorHeight)).toBeLessThanOrEqual(2);

    // Clicking the hero plate's Donor caption link selects Donor via #surface-donor
    await page.getByRole("link", { name: /01 Donor/iu }).click();
    await expect(
      architecture.getByRole("tab", { name: /Donor/iu })
    ).toHaveAttribute("aria-selected", "true");

    const appeals = page.locator("#appeals");
    await expect(
      appeals.getByRole("heading", {
        level: 2,
        name: "Before an appeal goes out.",
      })
    ).toBeVisible();
    const step2Tab = appeals.getByRole("tab", {
      name: /Prepare page, email & recipient scope/iu,
    });
    await step2Tab.click();
    await expect(appeals).toContainText("Role-scoped read access");
    await step2Tab.focus();
    await page.keyboard.press("ArrowDown");
    await expect(
      appeals.getByRole("tab", { name: /Review, edit & approve/iu })
    ).toHaveAttribute("aria-selected", "true");
    await expect(appeals).toContainText("Separate from routine receipts");
  });

  test("no-JS homepage exposes zero inert buttons, distinct role anchors, and full governance rules", async ({
    browser,
    baseURL,
  }) => {
    const context = await browser.newContext({
      ...(baseURL && { baseURL }),
      javaScriptEnabled: false,
      viewport: { width: 390, height: 844 },
    });
    const page = await context.newPage();
    await page.goto("/", { waitUntil: "domcontentloaded" });

    await expect(page.locator('button:not([type="submit"])')).toHaveCount(0);
    await expect(page.locator("#surface-donor")).toBeVisible();
    await expect(page.locator("#surface-missionary")).toBeVisible();
    await expect(page.locator("#surface-office")).toBeVisible();
    await expect(
      page.locator('noscript nav[aria-label="Homepage sections"]')
    ).toBeVisible();
    const noJsAppeals = page.locator("#appeals noscript");
    await expect(noJsAppeals).toBeVisible();
    const noJsAppealsText = (await noJsAppeals.textContent()) ?? "";
    expect(noJsAppealsText).toContain("Explicit staff trigger");
    expect(noJsAppealsText).toContain("Role-scoped read access");
    expect(noJsAppealsText).toContain("Single-record continuity");
    await context.close();
  });

  test("homepage maintains near-zero CLS across hydration and enforces API origin and config gates", async ({
    page,
    request,
  }) => {
    await page.addInitScript(() => {
      let cls = 0;
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const shift = entry as PerformanceEntry & {
            value: number;
            hadRecentInput: boolean;
          };
          if (!shift.hadRecentInput) {
            cls += shift.value;
          }
        }
        document.documentElement.dataset.asymCls = String(cls);
      });
      observer.observe({ type: "layout-shift", buffered: true });
    });

    await page.goto("/", { waitUntil: "networkidle" });
    await waitForUi(page);

    const measuredCls = await page.evaluate(() =>
      Number(document.documentElement.dataset.asymCls ?? "0")
    );
    expect(measuredCls).toBeLessThanOrEqual(0.01);

    const crossSiteRes = await request.post("/api/early-access", {
      headers: {
        "content-type": "application/json",
        origin: "https://evil.example",
        "sec-fetch-site": "cross-site",
      },
      data: {
        email: "director@example.org",
        organization: "Example Missions",
      },
    });
    expect(crossSiteRes.status()).toBe(403);

    if ((await earlyAccessForm(page).count()) > 0) {
      return;
    }
    const apiRes = await request.post("/api/early-access", {
      headers: { "content-type": "application/json" },
      data: { email: "director@example.org" },
    });
    expect(apiRes.status()).toBe(503);
  });

  test("open source and team sections link to the public code", async ({
    page,
  }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    await expect(
      page.getByRole("link", { name: /Explore the code on GitHub/u })
    ).toHaveAttribute("href", REPO_URL);
    await expect(page.locator("#open-source")).toContainText(
      "managed donor care"
    );
    await expect(page.locator("#about")).toContainText("Global Fellowship");
  });

  test("main navigation reaches each homepage section", async ({ page }) => {
    test.skip(
      test.info().project.name.startsWith("mobile"),
      "The section links are hidden in the compact mobile header."
    );

    await page.goto("/", { waitUntil: "domcontentloaded" });
    await waitForUi(page);
    const nav = page.getByRole("navigation", { name: "Main" });

    await nav.getByRole("link", { name: "Open source" }).click();

    await expect(page).toHaveURL(/#open-source$/u);
    await expect(
      page.getByRole("heading", {
        level: 2,
        name: "The code is public.",
      })
    ).toBeInViewport();
  });

  test("mobile header keeps the brand and early access action and offers section links", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await waitForUi(page);
    const banner = page.getByRole("banner");

    await expect(
      banner.getByRole("link", { name: /^asym home$/iu })
    ).toBeVisible();
    await expect(
      banner.getByRole("link", { name: /^(?:Early access|See what’s built)/u })
    ).toBeVisible();
    await expect(banner.getByRole("navigation")).toBeHidden();
    const menuTrigger = banner.getByRole("button", { name: "Page sections" });
    await expect(menuTrigger).toBeVisible();
    await menuTrigger.focus();
    await page.keyboard.press("Enter");
    await expect(
      page.getByRole("navigation", { name: "Homepage sections" })
    ).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(menuTrigger).toBeFocused();

    await expectNoHorizontalOverflow(page);
  });

  test("early access discloses unconfigured preview state or validates live form", async ({
    page,
  }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await waitForUi(page);
    const formCount = await earlyAccessForm(page).count();

    if (formCount === 0) {
      await expect(page.locator("#early-access")).toContainText(
        "Early access isn’t open yet."
      );
      await expect(
        page
          .locator("#early-access")
          .getByRole("link", { name: /Follow progress on GitHub/u })
      ).toHaveAttribute("href", `${REPO_URL}#readme`);
      await expect(
        page
          .locator("#early-access")
          .getByRole("link", { name: /Pre-launch checklist/u })
      ).toHaveAttribute("href", "/early-access/status?state=unavailable");
      return;
    }

    const form = earlyAccessForm(page);
    await expect(form).toHaveAttribute("method", "post");
    await expect(form).toHaveAttribute("action", "/api/early-access");

    const emailInput = form.getByLabel("Email");
    for (const malformedEmail of [
      "sam..lee@example.org",
      "sam.@example.org",
      ".sam@example.org",
      `${"a".repeat(65)}@example.org`,
      "hello@-invalid.org",
    ]) {
      await emailInput.fill(malformedEmail);
      expect(
        await emailInput.evaluate((node: HTMLInputElement) =>
          node.checkValidity()
        )
      ).toBeFalsy();
    }
    await emailInput.fill("");

    await form.getByRole("button", { name: "Request early access" }).click();

    await expect(form.getByText("Enter a valid email address.")).toBeVisible();
    await expect(
      form.getByText("Enter your organization’s name.")
    ).toBeVisible();
    await expect(form.getByLabel("Email")).toBeFocused();
    await expect(form.getByLabel("Email")).toHaveAttribute(
      "aria-invalid",
      "true"
    );

    const { origin } = new URL(page.url());
    const invalidFormPost = await page.request.post("/api/early-access", {
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        origin,
      },
      data: "email=invalid-email&organization=",
      maxRedirects: 0,
    });
    expect(invalidFormPost.status()).toBe(303);
    expect(invalidFormPost.headers().location).toContain(
      "/early-access/status?state=invalid"
    );
  });

  test("early access keeps entries when the request is not accepted (configured mode)", async ({
    page,
  }) => {
    await page.route(EARLY_ACCESS_API, (route) =>
      route.fulfill({
        status: 503,
        json: { ok: false, error: "not_configured" },
      })
    );
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await waitForUi(page);
    if ((await earlyAccessForm(page).count()) === 0) {
      test.skip(true, "Deployment has no email delivery configured.");
    }

    const form = await fillEarlyAccess(page);

    await form.getByRole("button", { name: "Request early access" }).click();

    await expect(form.getByRole("alert")).toContainText(
      "Early access sign\u{2011}ups aren’t open right now."
    );
    await expect(form.getByLabel("Email")).toHaveValue("director@example.org");
    await expect(form.getByLabel("Organization")).toHaveValue(
      "Example Missions"
    );
  });

  test("early access confirms only after the request is accepted (configured mode)", async ({
    page,
  }) => {
    let submitted: unknown = null;
    await page.route(EARLY_ACCESS_API, async (route) => {
      submitted = route.request().postDataJSON();
      await route.fulfill({ status: 200, json: { ok: true } });
    });
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await waitForUi(page);
    if ((await earlyAccessForm(page).count()) === 0) {
      test.skip(true, "Deployment has no email delivery configured.");
    }

    const form = await fillEarlyAccess(page);

    await form.getByRole("button", { name: "Request early access" }).click();

    await expect(
      page.getByRole("heading", { name: "Request received" })
    ).toBeFocused();
    await expect(page.locator("#early-access")).toContainText(
      "We’ve received your request and passed it to the Asymmetric.al team."
    );
    expect(submitted).toMatchObject({
      email: "director@example.org",
      organization: "Example Missions",
      message: "Year-end appeals",
      website: "",
    });
  });

  test("standalone early-access status does not spoof received without confirmation", async ({
    page,
  }) => {
    await page.goto("/early-access/status?state=received", {
      waitUntil: "domcontentloaded",
    });

    await expect(
      page.getByRole("heading", { level: 1, name: "Early access status" })
    ).toBeVisible();
  });

  test("theme toggle applies dark mode, supports arrow keys, and swaps the logo artwork", async ({
    page,
  }) => {
    const projectName = test.info().project.name;
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await waitForUi(page);
    await page.locator("footer").scrollIntoViewIfNeeded();

    const themeGroup = page.getByRole("radiogroup", { name: /color theme/iu });
    const darkOption = themeGroup.getByRole("radio", { name: /^Dark$/u });
    const lightOption = themeGroup.getByRole("radio", { name: /^Light$/u });

    await activate(darkOption, projectName);

    await expect(darkOption).toHaveAttribute("aria-checked", "true");
    await expect(page.locator("html")).toHaveClass(/dark/u);
    await expect(
      page.locator('header a[aria-label="asym home"] svg')
    ).toBeVisible();

    await darkOption.focus();
    await page.keyboard.press("ArrowLeft");
    await expect(lightOption).toHaveAttribute("aria-checked", "true");
    await expect(page.locator("html")).not.toHaveClass(/dark/u);
  });

  test("footer links to code, early access, and legal pages", async ({
    page,
  }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const footer = page.locator("footer");

    await expect(
      footer.getByRole("link", { name: /^GitHub/u })
    ).toHaveAttribute("href", REPO_URL);
    await expect(
      footer.getByRole("link", { name: /^Early access/u })
    ).toHaveAttribute("href", "/#early-access");
    await expect(footer.getByRole("link", { name: "Privacy" })).toHaveAttribute(
      "href",
      "/privacy"
    );
    await expect(footer.getByRole("link", { name: "Terms" })).toHaveAttribute(
      "href",
      "/terms"
    );
    await expect(footer).toContainText("Asymmetric.al");
    await expect(footer).not.toContainText("EIN");
  });

  test("missing and production qa routes land on custom 404 with site chrome", async ({
    page,
  }) => {
    for (const path of ["/does-not-exist", "/qa/error"]) {
      const response = await page.goto(path, { waitUntil: "domcontentloaded" });
      expect(response?.status()).toBe(404);
      await expect(page).toHaveTitle("Page not found | asym");
      await expect(page.locator("html")).toHaveAttribute("lang", "en");
      await expect(page.getByRole("banner")).toBeVisible();
      await expect(page.getByRole("contentinfo")).toBeVisible();
      await expect(
        page.getByRole("heading", {
          level: 1,
          name: "This page doesn’t exist.",
        })
      ).toBeVisible();
    }
  });

  test("legacy routes redirect permanently to homepage sections", async ({
    page,
  }) => {
    await page.goto("/waitlist", { waitUntil: "domcontentloaded" });

    await expect(page).toHaveURL(/\/#early-access$/u);
  });

  test("layout omits outbound Vercel analytics collectors", async ({
    page,
  }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    expect(
      await page.evaluate(() => ({
        analytics: "va" in window,
        analyticsQueue: "vaq" in window,
        speedInsights: "si" in window,
      }))
    ).toStrictEqual({
      analytics: false,
      analyticsQueue: false,
      speedInsights: false,
    });
  });
});
