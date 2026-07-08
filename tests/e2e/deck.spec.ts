import { expect, test } from "@playwright/test";

test.describe("contributor deck", () => {
  test("serves the standalone briefing at /deck", async ({ page }) => {
    await page.goto("/deck", { waitUntil: "domcontentloaded" });

    await expect(page).toHaveTitle(/Asym Missions Platform/);
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Asym Missions Platform",
      })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", {
        level: 2,
        name: "The database is a targeting list.",
      })
    ).toBeVisible();
    await expect(page.locator("[data-deck-slide]")).toHaveCount(14);
    await expect(
      page.getByRole("link", { name: "Open GitHub" })
    ).toHaveAttribute("href", "https://github.com/Asymmetric-al/core");
    await expect(
      page.getByRole("link", { name: "Email Blake" })
    ).toHaveAttribute("href", "mailto:blake@globalfellowship.org");

    await expect
      .poll(() =>
        page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth
        )
      )
      .toBe(true);
  });
});
