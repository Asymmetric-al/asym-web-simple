import { defineConfig, devices } from "@playwright/test";

const port = 3001;
const localURL = `http://127.0.0.1:${port}`;

// Set PLAYWRIGHT_BASE_URL to test a deployed URL (such as a Vercel preview)
// instead of building and serving the site locally.
const remoteURL = process.env.PLAYWRIGHT_BASE_URL;
const baseURL = remoteURL ?? localURL;

// Vercel previews sit behind Deployment Protection. With a bypass secret, the
// global setup trades it for a bypass cookie saved here, so the secret itself is
// never sent along with requests to third-party origins the pages load.
const vercelBypassState =
  remoteURL && process.env.VERCEL_AUTOMATION_BYPASS_SECRET
    ? "playwright/.auth/vercel-bypass.json"
    : undefined;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: [
    ["list"],
    ["html", { open: "never", outputFolder: "playwright-report" }],
  ],
  ...(vercelBypassState && { globalSetup: "./tests/vercel-bypass.setup.ts" }),
  use: {
    baseURL,
    ...(vercelBypassState && { storageState: vercelBypassState }),
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
    {
      name: "mobile-chrome",
      use: { ...devices["Pixel 7"] },
    },
    {
      name: "mobile-safari",
      use: { ...devices["iPhone 14"] },
    },
  ],
  ...(!remoteURL && {
    webServer: {
      command: `npm run build && npx next start -H 127.0.0.1 -p ${port}`,
      url: localURL,
      reuseExistingServer: !process.env.CI,
      timeout: 180_000,
    },
  }),
});
