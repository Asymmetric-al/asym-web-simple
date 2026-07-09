import { expect, type Page, test } from "@playwright/test";

async function expectNoHorizontalOverflow(page: Page): Promise<void> {
  const overflow = await page.evaluate(() => {
    const doc = document.documentElement;

    return {
      clientWidth: doc.clientWidth,
      scrollWidth: doc.scrollWidth,
    };
  });

  expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.clientWidth + 1);
}

test.describe("contributor briefing", () => {
  test("serves the updated standalone briefing at /contributor", async ({
    page,
  }) => {
    await page.goto("/contributor", { waitUntil: "domcontentloaded" });

    await expect(page).toHaveTitle(/Asym Contributor Briefing/);
    await expect(
      page.getByRole("heading", { level: 1, name: "Asym" })
    ).toBeVisible();
    await expect(
      page
        .locator("#cover")
        .getByText("The operating system for Christian missions.", {
          exact: false,
        })
        .first()
    ).toBeVisible();
    await expect(
      page.getByRole("heading", {
        level: 2,
        name: "Mission teams spend staff time managing the gaps between disconnected systems.",
      })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", {
        level: 2,
        name: "Openly Christian. Built in the open.",
      })
    ).toBeVisible();
    await expect(page.locator("[data-deck-slide]")).toHaveCount(15);

    await expect(
      page.getByRole("link", { name: "Open GitHub" })
    ).toHaveAttribute("href", "https://github.com/Asymmetric-al/core");
    await expect(
      page.getByRole("link", { name: "Email Blake" })
    ).toHaveAttribute("href", "mailto:blake@globalfellowship.org");
    await expectNoHorizontalOverflow(page);
  });

  test("redirects the old /deck route to /contributor", async ({ page }) => {
    await page.goto("/deck", { waitUntil: "domcontentloaded" });

    await expect(page).toHaveURL(/\/contributor\/?$/);
    await expect(
      page.getByRole("heading", { level: 1, name: "Asym" })
    ).toBeVisible();
  });
});
