import core from "ultracite/eslint/core";
import react from "ultracite/eslint/react";
import next from "ultracite/eslint/next";
import vitest from "ultracite/eslint/vitest";
import playwright from "ultracite/eslint/playwright";

// Playwright runs only `tests/**` (see playwright.config.ts). Vitest owns
// `lib/**/*.test.ts`, so the Playwright rules must not apply there.
const [playwrightConfig] = playwright;

export default [
  ...core,
  ...react,
  ...next,
  ...vitest,
  { ...playwrightConfig, files: ["tests/**/*.{ts,tsx}"] },
  {
    ignores: [
      ".next-docs/**",
      ".tmp/**",
      "playwright-report/**",
      "test-results/**",
    ],
  },
];
