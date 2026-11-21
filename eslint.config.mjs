import core from "ultracite/eslint/core";
import next from "ultracite/eslint/next";
import playwright from "ultracite/eslint/playwright";
import react from "ultracite/eslint/react";
import vitest from "ultracite/eslint/vitest";

const [playwrightConfig] = playwright;

// eslint-disable-next-line unicorn/no-top-level-side-effects -- Flat config scopes Vitest rules to unit test files.
const scopedVitest = vitest.map((config) => ({
  ...config,
  files: ["lib/**/*.test.{ts,tsx}", "tests/unit/**/*.test.{ts,tsx}"],
}));

export default [
  ...core,
  ...react,
  ...next,
  ...scopedVitest,
  {
    ...playwrightConfig,
    files: ["tests/**/*.{ts,tsx}"],
    rules: {
      ...playwrightConfig.rules,
      // Multi-viewport responsive loops and axe audits intentionally iterate sequentially with multiple assertions.
      "no-await-in-loop": "off",
      "func-style": "off",
      "unicorn/no-top-level-side-effects": "off",
      "playwright/max-expects": "off",
      "playwright/no-raw-locators": "off",
      "playwright/no-conditional-in-test": "off",
      "playwright/no-conditional-expect": "off",
      "playwright/no-skipped-test": "off",
      "playwright/no-wait-for-timeout": "off",
      "playwright/no-networkidle": "off",
      "playwright/no-magic-timeouts": "off",
      "playwright/no-template-literal-title": "off",
      "playwright/no-nth-methods": "off",
      "playwright/prefer-strict-equal": "off",
      "playwright/prefer-ending-with-an-expect": "off",
      "sonarjs/no-skipped-tests": "off",
      "sonarjs/no-fixed-wait-in-tests": "off",
      "sonarjs/no-networkidle-wait": "off",
      "require-unicode-regexp": "off",
    },
  },
  {
    // Server routes, Next config, and App Router pages run in Node/Next runtime, not browsers.
    files: [
      "app/**/page.tsx",
      "app/**/layout.tsx",
      "app/**/route.ts",
      "app/not-found.tsx",
      "app/error.tsx",
      "app/opengraph-image.tsx",
      "app/robots.ts",
      "app/sitemap.ts",
      "next.config.ts",
      "playwright.config.ts",
      "payload.config.ts",
    ],
    rules: {
      "compat/compat": "off",
      "func-style": "off",
      "react-doctor/only-export-components": "off",
      "unicorn/no-top-level-side-effects": "off",
    },
  },
  {
    // Unit test files allow multi-assertion contract suites and readable helper loops.
    files: ["lib/**/*.test.{ts,tsx}"],
    rules: {
      "vitest/max-expects": "off",
      "vitest/padding-around-all": "off",
      "vitest/padding-around-expect-groups": "off",
      "vitest/consistent-test-filename": "off",
      "no-await-in-loop": "off",
      "unicorn/no-top-level-side-effects": "off",
      "unicorn/no-unreadable-new-expression": "off",
    },
  },
  {
    ignores: [
      ".next/**",
      ".next-docs/**",
      ".tmp/**",
      "app/(payload)/**",
      "components/ui/**",
      "payload.config.ts",
      "playwright-report/**",
      "scripts/**",
      "test-results/**",
    ],
  },
];
