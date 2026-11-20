import { expect, test } from "@playwright/test";
import type { Locator, Page } from "@playwright/test";

const UI_READY_TIMEOUT_MS = 5000;
const SETTLE_MS = 250;
const SUITE_TIMEOUT_MS = 60_000;
const REPO_URL = "https://github.com/Asymmetric-al/core";
const ISSUES_URL = "https://github.com/Asymmetric-al/core/issues";
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
      "asym | Open-source AI software for nonprofits"
    );
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Your website, fundraising, and CRM. Built to work together with AI.",
      })
    ).toBeVisible();
    await expect(page.getByText("Launching soon")).toBeVisible();
    await expect(
      page
        .getByRole("main")
        .getByRole("link", { name: /^(Request early access|Early access)/u })
        .first()
    ).toHaveAttribute("href", "/#early-access");
    await expect(
      page.getByRole("link", { name: "View the code", exact: true })
    ).toHaveAttribute("href", REPO_URL);
  });

  test("workflow plate shows honest status and pins connected records on click", async ({
    page,
  }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await waitForUi(page);
    const product = page.locator("#product");

    await expect(
      product.getByRole("heading", {
        level: 2,
        name: "From the appeal brief to the gift receipt.",
      })
    ).toBeVisible();
    await expect(product.getByRole("listitem")).toHaveText([
      /Describe/u,
      /Prepare/u,
      /Review/u,
      /Publish/u,
    ]);
    await expect(
      product.getByText("In development", { exact: true }).first()
    ).toBeVisible();
    await expect(page.getByText(/sample data/iu)).toHaveCount(0);

    const prepareButton = product.getByRole("button", { name: "Prepare" });
    await prepareButton.click();
    await expect(prepareButton).toHaveAttribute("aria-pressed", "true");
    await expect(product.locator(".wf-plate")).toHaveAttribute(
      "data-active",
      "2"
    );
    await expect(product.locator(".wf-plate")).toHaveAttribute(
      "data-pinned",
      "true"
    );

    await page.keyboard.press("Escape");
    await expect(prepareButton).toHaveAttribute("aria-pressed", "false");
  });

  test("open source and team sections link to the public code", async ({
    page,
  }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    await expect(
      page.getByRole("link", { name: /Explore the code on GitHub/u })
    ).toHaveAttribute("href", REPO_URL);
    await expect(page.locator("#open-source")).toContainText(
      "Managed donor care"
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
        name: "The code is public. Hosting will be a paid subscription.",
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
      banner.getByRole("link", { name: /^(Early access|Access status)$/u })
    ).toBeVisible();
    await expect(banner.getByRole("navigation")).toBeHidden();
    await expect(
      page.getByRole("navigation", { name: "On this page" })
    ).toBeVisible();

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
        "Sign\u2011ups aren’t open yet."
      );
      await expect(
        page
          .locator("#early-access")
          .getByRole("link", { name: /Browse development issues/u })
      ).toHaveAttribute("href", ISSUES_URL);
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
      "Early\u2011access sign\u2011ups aren’t open right now."
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
      "Thanks for telling us about your team."
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
      page.locator(
        'header a[aria-label="asym home"] img[src*="asym-mark-light"]'
      )
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
      footer.getByRole("link", { name: "GitHub", exact: true })
    ).toHaveAttribute("href", REPO_URL);
    await expect(
      footer.getByRole("link", { name: "Early access" })
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
