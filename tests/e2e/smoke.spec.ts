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
  await expect(form).toHaveAttribute("novalidate", "");
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
    const response = await page.goto("/", { waitUntil: "domcontentloaded" });
    const csp = response?.headers()["content-security-policy"] ?? "";
    const scriptSrc =
      csp
        .split(";")
        .map((part) => part.trim())
        .find((part) => part.startsWith("script-src ")) ?? "";
    expect(scriptSrc).toContain("'self'");
    expect(scriptSrc).not.toContain("'unsafe-eval'");
    expect(csp).toContain("default-src 'self'");
    expect(csp).toContain("object-src 'none'");
    expect(csp).toContain("frame-ancestors 'none'");
    expect(csp).toContain("base-uri 'self'");
    expect(csp).toContain("form-action 'self'");

    await expect(page).toHaveTitle(
      "asym | Open-source software for Christian missions organizations"
    );
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Run a large mission from a small office.",
      })
    ).toBeVisible();
    await expect(
      page.getByText(
        "Open-source software for Christian missions organizations",
        {
          exact: true,
        }
      )
    ).toBeVisible();
    await expect(
      page
        .getByRole("main")
        .getByRole("link", {
          name: /^(?:Request early access|See the platform)$/u,
        })
        .first()
    ).toHaveAttribute("href", /^\/#(?:early-access|product)$/u);
    await expect(
      page.getByRole("link", { name: /^View the code/u }).first()
    ).toHaveAttribute("href", REPO_URL);
  });

  test("platform ground-truth matrix, workflow tabs, real capture, roadmap ledger, and vision section work with keyboard", async ({
    page,
  }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await waitForUi(page);

    const outcomes = page.locator("#product");
    await expect(
      outcomes.getByRole("heading", {
        level: 2,
        name: "One ground truth. Every record and workflow.",
      })
    ).toBeVisible();
    await expect(outcomes).toContainText("apps/donor");
    await expect(outcomes).toContainText("apps/missionary");
    await expect(outcomes).toContainText("apps/admin");
    await expect(outcomes).toContainText("Anonymous partner");
    await expect(outcomes).toContainText("micro-CRM");
    await expect(outcomes).toContainText("Mission Control");
    await expect(outcomes).toContainText("Give Hope demo tenant");

    const roleLens = outcomes.getByRole("radiogroup", {
      name: "Inspect workspace view",
    });
    const missionaryLens = roleLens.getByRole("radio", { name: "Missionary" });
    await missionaryLens.click();
    await expect(missionaryLens).toHaveAttribute("aria-checked", "true");
    await expect(outcomes).toContainText(
      "apps/missionary · Per-worker micro-CRM"
    );
    await missionaryLens.focus();
    await page.keyboard.press("ArrowRight");
    await expect(
      roleLens.getByRole("radio", { name: "Office" })
    ).toHaveAttribute("aria-checked", "true");
    await roleLens.getByRole("radio", { name: "Compare all" }).click();

    const workflowTabs = outcomes.getByRole("tablist", {
      name: "Agency workflows on one ground truth",
    });
    const givingTab = workflowTabs.getByRole("tab", {
      name: "Giving & Finance",
    });
    await givingTab.focus();
    await page.keyboard.press("ArrowRight");
    const microCrmTab = workflowTabs.getByRole("tab", {
      name: "Missionary micro-CRMs",
    });
    await expect(microCrmTab).toHaveAttribute("aria-selected", "true");
    await expect(
      outcomes.getByRole("heading", {
        level: 4,
        name: "A built-in micro-CRM for every missionary’s support team.",
      })
    ).toBeVisible();

    const webStudioImage = outcomes.locator('img[alt*="Web Studio"]');
    await webStudioImage.scrollIntoViewIfNeeded();
    await expect(webStudioImage).toBeVisible();
    await expect
      .poll(() =>
        webStudioImage.evaluate((img: HTMLImageElement) => img.naturalWidth)
      )
      .toBeGreaterThan(0);
    await expect(
      outcomes.getByRole("button", { name: /Magnify/u })
    ).toHaveCount(0);

    const screenTabs = outcomes.getByRole("tablist", {
      name: "Core application screens",
    });
    await expect(screenTabs.getByRole("tab")).toHaveCount(4);

    const donorPortalTab = screenTabs.getByRole("tab", {
      name: "Donor portal",
    });
    await donorPortalTab.click();
    await expect(donorPortalTab).toHaveAttribute("aria-selected", "true");
    await expect(outcomes).toContainText("givehope.org/donor");
    const donorPortalImage = outcomes.locator('img[alt*="Donor portal"]');
    await expect(donorPortalImage).toBeVisible();
    await expect
      .poll(() =>
        donorPortalImage.evaluate((img: HTMLImageElement) => img.naturalWidth)
      )
      .toBeGreaterThan(0);

    await outcomes.getByRole("button", { name: "Next screen" }).click();
    await expect(
      screenTabs.getByRole("tab", { name: "Public website" })
    ).toHaveAttribute("aria-selected", "true");
    const publicSiteImage = outcomes.locator(
      'img[alt*="Public ministry website"]'
    );
    await expect(publicSiteImage).toBeVisible();
    await expect
      .poll(() =>
        publicSiteImage.evaluate((img: HTMLImageElement) => img.naturalWidth)
      )
      .toBeGreaterThan(0);

    await screenTabs.getByRole("tab", { name: "Public website" }).focus();
    await page.keyboard.press("End");
    await expect(
      screenTabs.getByRole("tab", { name: "Field updates" })
    ).toHaveAttribute("aria-selected", "true");
    await expect(outcomes).toContainText("missionaries.asym.app/updates");
    const missionaryImage = outcomes.locator(
      'img[alt*="Missionary workspace updates"]'
    );
    await expect(missionaryImage).toBeVisible();
    await expect
      .poll(() =>
        missionaryImage.evaluate((img: HTMLImageElement) => img.naturalWidth)
      )
      .toBeGreaterThan(0);

    const openSource = page.locator("#open-source");
    const filterGroup = openSource.getByRole("radiogroup", {
      name: "Filter build status",
    });
    const inProgressFilter = filterGroup.getByRole("radio", {
      name: /^Building/u,
    });
    await inProgressFilter.click();
    await expect(inProgressFilter).toHaveAttribute("aria-checked", "true");
    await expect(openSource.locator("li")).toHaveCount(3);

    await inProgressFilter.focus();
    await page.keyboard.press("ArrowRight");
    await expect(
      filterGroup.getByRole("radio", { name: /^Next/u })
    ).toHaveAttribute("aria-checked", "true");
    await expect(openSource.locator("li")).toHaveCount(2);
    await expect(openSource).toContainText("AI care-work drafting");
    await expect(openSource).toContainText("5,200+");
    await expect(openSource).toContainText("600+");
    await expect(openSource).toContainText("Core software license");
    await expect(openSource).toContainText("Gift processing markup");

    const vision = page.locator("#vision");
    await expect(
      vision.getByRole("heading", {
        level: 2,
        name: "AI that works from your ground truth.",
      })
    ).toBeVisible();
    await expect(vision).toContainText("Grounded AI");
    await expect(vision).toContainText("AI drafts; people send.");
    await expect(
      vision.getByRole("img", { name: /Grounded AI workflow/u })
    ).toBeVisible();

    const faq = page.locator("#questions");
    await expect(
      faq.getByRole("heading", {
        level: 2,
        name: "Straight answers from the people building it.",
      })
    ).toBeVisible();
    const faqTabs = faq.getByRole("tablist", {
      name: "Common leadership questions",
    });
    await expect(faqTabs.getByRole("tab")).toHaveCount(8);
    await expect(faq).not.toContainText("Global Fellowship");
    await expect(page.getByRole("main")).not.toContainText("O’Brien");
    await expect(page.getByRole("main")).not.toContainText("O'Brien");

    const stripeQuestion = faqTabs.getByRole("tab", {
      name: /monthly donors’ cards/u,
    });
    await stripeQuestion.click();
    await expect(stripeQuestion).toHaveAttribute("aria-selected", "true");
    await expect(faq.getByRole("tabpanel")).toBeVisible();
    await expect(faq.getByRole("tabpanel")).toContainText(
      "They stay with your ministry."
    );
    await expect(
      faq.getByRole("tabpanel").getByRole("link", { name: /^Conrad/u })
    ).toHaveAttribute("href", "https://github.com/cobmojo");

    const missionaryQuestion = faqTabs.getByRole("tab", {
      name: /missionaries see/u,
    });
    await missionaryQuestion.click();
    await expect(missionaryQuestion).toHaveAttribute("aria-selected", "true");
    await expect(faq.getByRole("tabpanel")).toBeVisible();
    await expect(faq.getByRole("tabpanel")).toContainText(
      "Every missionary gets a personal workspace"
    );

    const hostingQuestion = faqTabs.getByRole("tab", {
      name: /run our own servers/u,
    });
    await hostingQuestion.click();
    await expect(hostingQuestion).toHaveAttribute("aria-selected", "true");
    await expect(faq.getByRole("tabpanel")).toBeVisible();
    await expect(faq.getByRole("tabpanel")).toContainText(
      "You will not have to manage servers"
    );
    await expect(
      faq.getByRole("tabpanel").getByRole("link", { name: /^Blake/u })
    ).toHaveAttribute("href", "https://github.com/II-ricky-bobby-II");
  });

  test("evaluation brief renders comparison, parallel close, and hosting paths with zero inert no-JS controls", async ({
    page,
    browser,
    baseURL,
  }) => {
    await page.goto("/evaluate", { waitUntil: "domcontentloaded" });
    await waitForUi(page);

    await expect(page).toHaveTitle("Evaluate asym | asym");
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /board, Finance team, and IT lead/u,
      })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", {
        level: 2,
        name: "One shared record, instead of stitched tools.",
      })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", {
        level: 2,
        name: "Reconcile one period before you switch.",
      })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", {
        level: 2,
        name: "Self-host it, or let us host it.",
      })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", {
        level: 2,
        name: "Privacy, custody, and separation written into code.",
      })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", {
        level: 2,
        name: "Primary documents for technical and legal review.",
      })
    ).toBeVisible();
    await expect(
      page.getByRole("navigation", { name: "Evaluation brief sections" })
    ).toBeVisible();

    const noJsContext = await browser.newContext({
      ...(baseURL && { baseURL }),
      javaScriptEnabled: false,
      viewport: { width: 390, height: 844 },
    });
    const noJsPage = await noJsContext.newPage();
    await noJsPage.goto("/evaluate", { waitUntil: "domcontentloaded" });
    await expect(noJsPage.locator('button:not([type="submit"])')).toHaveCount(
      0
    );
    await noJsPage.goto("/privacy", { waitUntil: "domcontentloaded" });
    await expect(noJsPage.locator('button:not([type="submit"])')).toHaveCount(
      0
    );
    await noJsContext.close();
  });

  test("desktop quick-jump palette filters, restores focus on Escape, and navigates via Enter", async ({
    page,
  }) => {
    test.skip(
      test.info().project.name.startsWith("mobile"),
      "The quick-jump trigger is desktop-only (lg+)."
    );

    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await waitForUi(page);

    const trigger = page.getByRole("button", { name: /^Quick jump/u });
    await expect(trigger).toBeVisible();
    await trigger.click();

    const dialog = page.getByRole("dialog", { name: "Quick jump navigation" });
    await expect(dialog).toBeVisible();

    const input = dialog.getByRole("searchbox");
    await expect(input).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();

    await trigger.click();
    await expect(dialog).toBeVisible();
    await input.fill("zzz-no-match");
    await expect(dialog).toContainText("No matching pages or files");
    await dialog.getByRole("button", { name: "Clear search" }).click();
    await expect(input).toBeFocused();
    await expect(input).toHaveValue("");
    await page.keyboard.press("End");
    await expect(
      dialog.locator('button[data-highlighted="true"]')
    ).toBeInViewport();
    await input.fill("parallel close");
    await expect(dialog).toContainText("Parallel-close migration steps");
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/evaluate#migration$/u);
  });

  test("no-JS homepage exposes zero inert buttons, distinct outcome anchors, and full build status list", async ({
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
    await expect(page.locator("#open-source ul > li")).toHaveCount(9);
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

  test("open source, sustainability, and company sections link to public code and match intake state", async ({
    page,
  }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    const openSource = page.locator("#open-source");
    await expect(
      openSource.getByRole("link", { name: /Explore the code on GitHub/u })
    ).toHaveAttribute("href", REPO_URL);
    await expect(openSource).toContainText(
      "Keep your cards, records, and code."
    );
    await expect(openSource).toContainText(
      "Run Mission Control on your laptop"
    );
    await expect(openSource).toContainText("managed donor care");
    await expect(
      page.locator('a[href*="Asymmetric-al/core/issues"]')
    ).toHaveCount(0);

    const isConfigured = (await earlyAccessForm(page).count()) > 0;
    if (isConfigured) {
      await expect(
        openSource.getByRole("link", { name: /Request early access/u })
      ).toHaveAttribute("href", "/#early-access");
      await expect(page.getByRole("main")).toContainText(
        "Early access is open for hosted pilots"
      );
    } else {
      await expect(
        openSource.getByRole("link", {
          name: /Read the launch roadmap/u,
        })
      ).toHaveAttribute("href", "/early-access/status?state=unavailable");
      await expect(page.getByRole("main")).toContainText(
        "Hosted early access opens soon"
      );
    }

    const about = page.locator("#about");
    await expect(
      about.getByRole("heading", {
        level: 2,
        name: "Built from inside the work.",
      })
    ).toBeVisible();
    await expect(about).toContainText("Global Fellowship");
    await expect(about.getByRole("link", { name: /^Conrad/u })).toHaveAttribute(
      "href",
      "https://github.com/cobmojo"
    );
    await expect(about.getByRole("link", { name: /^Blake/u })).toHaveAttribute(
      "href",
      "https://github.com/II-ricky-bobby-II"
    );
  });

  test("main navigation reaches each homepage section", async ({ page }) => {
    test.skip(
      test.info().project.name.startsWith("mobile"),
      "The section links are hidden in the compact mobile header."
    );

    await page.goto("/", { waitUntil: "domcontentloaded" });
    await waitForUi(page);
    const nav = page.getByRole("navigation", { name: "Main" });

    const openSourceLink = nav.getByRole("link", { name: "Open source" });
    await openSourceLink.click();

    await expect(page).toHaveURL(/#open-source$/u);
    await expect(
      page.getByRole("heading", {
        level: 2,
        name: "Inspect the software before you trust it.",
      })
    ).toBeInViewport();
    await expect(openSourceLink).toHaveAttribute("data-active", "true");
    await expect(nav.locator('[data-active="true"]')).toHaveCount(1);

    const visionLink = nav.getByRole("link", { name: "Vision" });
    await visionLink.click();
    await expect(page).toHaveURL(/#vision$/u);
    await expect(
      page.getByRole("heading", {
        level: 2,
        name: "AI that works from your ground truth.",
      })
    ).toBeInViewport();
    await expect(visionLink).toHaveAttribute("data-active", "true");
    await expect(nav.locator('[data-active="true"]')).toHaveCount(1);

    // Re-clicking the current hash after scrolling away still returns and highlights it.
    await page.evaluate(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
    });
    await expect(nav.locator('[data-active="true"]')).toHaveCount(0);
    await visionLink.click();
    await expect(
      page.getByRole("heading", {
        level: 2,
        name: "AI that works from your ground truth.",
      })
    ).toBeInViewport();
    await expect(visionLink).toHaveAttribute("data-active", "true");
    await expect(nav.locator('[data-active="true"]')).toHaveCount(1);

    const evaluateLink = nav.getByRole("link", { name: "Evaluate" });
    await evaluateLink.click();
    await expect(page).toHaveURL(/\/evaluate$/u);
    await expect(evaluateLink).toHaveAttribute("data-active", "true");
    await expect(visionLink).not.toHaveAttribute("data-active", "true");
    await expect(nav.locator('[data-active="true"]')).toHaveCount(1);

    const jumpNav = page.getByRole("navigation", {
      name: "Evaluation brief sections",
    });
    const reviewDocsLink = jumpNav.getByRole("link", { name: "Review docs" });
    await reviewDocsLink.click();
    await expect(reviewDocsLink).toHaveAttribute("data-active", "true");
    await expect(jumpNav.locator('[data-active="true"]')).toHaveCount(1);

    await nav.getByRole("link", { name: "Company" }).click();
    await expect(page).toHaveURL(/\/#about$/u);
    await expect(nav.getByRole("link", { name: "Company" })).toHaveAttribute(
      "data-active",
      "true"
    );
    await expect(evaluateLink).not.toHaveAttribute("data-active", "true");
    await expect(nav.locator('[data-active="true"]')).toHaveCount(1);

    await page
      .getByRole("banner")
      .getByRole("link", { name: /^asym home$/iu })
      .click();
    await expect(page).toHaveURL(/\/$/u);
    await expect(nav.locator('[data-active="true"]')).toHaveCount(0);
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
      banner.getByRole("link", { name: /^(?:Early access|See the platform)/u })
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
      await expect(page.locator("#early-access")).toContainText(
        "What we’re finishing first"
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
    await expect(form).toHaveAttribute("novalidate", "");
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
