import { expect, test } from "@playwright/test";
import { routeFixtures } from "../fixtures/routes";

const themes = [
  { colorScheme: "light" as const, name: "light" },
  { colorScheme: "dark" as const, name: "dark" },
];

test.describe("route visuals", () => {
  test.describe.configure({ timeout: 60_000 });

  test.skip(
    ({ browserName }) => browserName !== "chromium",
    "Visual baselines are maintained in Chromium to reduce snapshot churn."
  );

  for (const theme of themes) {
    test.describe(theme.name, () => {
      for (const route of routeFixtures) {
        test(`${route.slug} matches the ${theme.name} baseline`, async ({
          page,
        }) => {
          await page.emulateMedia({
            colorScheme: theme.colorScheme,
            reducedMotion: "reduce",
          });

          await page.goto(route.path, { waitUntil: "networkidle" });

          await expect(
            page.getByRole("heading", { level: 1 }).first()
          ).toBeVisible();

          await page.waitForFunction(
            () =>
              document.documentElement.getAttribute("data-ui-ready") === "true"
          );

          if (theme.colorScheme === "dark") {
            await page.waitForFunction(() =>
              document.documentElement.classList.contains("dark")
            );
          }

          await page.evaluate(async () => {
            if (document.fonts?.ready) {
              await document.fonts.ready;
            }
          });

          await expect(page).toHaveScreenshot(
            `${route.slug}-${theme.name}.png`,
            {
              fullPage: true,
              timeout: 60_000,
            }
          );
        });
      }
    });
  }
});
