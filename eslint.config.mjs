import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
// eslint-disable-next-line import-x/no-rename-default -- Multiple ESLint plugins export default as `plugin`.
import landminesTesting from "@interfere/landmines/testing";
// eslint-disable-next-line import-x/no-rename-default -- Multiple ESLint plugins export default as `plugin`.
import shadcnLint from "@shadcn/lint";
import core from "ultracite/eslint/core";
import next from "ultracite/eslint/next";
import playwright from "ultracite/eslint/playwright";
import react from "ultracite/eslint/react";
import vitest from "ultracite/eslint/vitest";

const ultraciteCorePath = fileURLToPath(
  // eslint-disable-next-line unicorn/no-top-level-side-effects -- Resolve Ultracite's vendored anti-slop JS plugin once at flat-config load.
  import.meta.resolve("ultracite/eslint/core")
);
// eslint-disable-next-line unicorn/no-top-level-side-effects -- Pure path derivation from resolved package entry.
const ultraciteDir = path.resolve(path.dirname(ultraciteCorePath), "../../..");
const { default: antiSlopPlugin } = await import(
  pathToFileURL(
    // eslint-disable-next-line unicorn/no-top-level-side-effects -- Load Ultracite's bundled anti-slop plugin for ESLint flat config.
    path.join(ultraciteDir, "config/oxlint/anti-slop/plugin.mjs")
  ).href
);

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
    // Ultracite vendored anti-slop JS plugin (dmmulroy/anti-slop) wired into the single ESLint/Ultracite pipeline.
    files: ["**/*.{ts,tsx,js,jsx,mjs}"],
    plugins: {
      "anti-slop": antiSlopPlugin,
    },
    rules: {
      "anti-slop/no-array-filter-map": "error",
      "anti-slop/no-chained-type-assertions": "error",
      "anti-slop/no-conditional-empty-object-spread": "error",
      "anti-slop/no-known-value-widening": "error",
      "anti-slop/no-module-mocking": "error",
      "anti-slop/no-object-parameters": "error",
      "anti-slop/no-reduce-accumulator-copy": "error",
      "anti-slop/no-reflect-apply": "error",
      "anti-slop/no-reflect-get": "error",
      "anti-slop/no-runtime-typeof": ["error", { allowInTypeGuards: true }],
      "anti-slop/no-shape-in-symbol-names": "error",
      "anti-slop/no-unknown-parameters": "error",
      "anti-slop/no-unknown-returns": "error",
      "anti-slop/no-unknown-type-aliases": "error",
      "anti-slop/no-unsafe-dictionary-type": "error",
      "anti-slop/no-widen-then-assert": "error",
      "anti-slop/require-safety-comment-for-type-assertion": "error",
      "@typescript-eslint/consistent-indexed-object-style": "off",
      "unicorn/no-immediate-mutation": "off",
      "unicorn/prefer-reflect-apply": "off",
    },
  },
  {
    // First-party @shadcn/lint design-system rules targeting the site's Tailwind v4 tokens and components/ui.
    files: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
    plugins: {
      shadcn: shadcnLint,
    },
    rules: {
      "shadcn/no-arbitrary-values": ["warn", { allow: ["layout"] }],
      "shadcn/no-inline-styles": "error",
      "shadcn/no-raw-colors": "error",
      "shadcn/no-restyle": ["error", { allow: ["layout"] }],
      "shadcn/no-unknown-classes": "error",
      "shadcn/require-static-classes": "error",
    },
  },
  {
    // Scoped @shadcn/lint exceptions for Satori OG renderer.
    files: ["app/opengraph-image.tsx"],
    rules: {
      "shadcn/no-inline-styles": "off",
      "shadcn/no-raw-colors": "off",
      "shadcn/no-arbitrary-values": "off",
    },
  },
  {
    files: ["app/qa/**/*.{ts,tsx}"],
    rules: {
      "shadcn/no-restyle": "warn",
    },
  },
  {
    // Existing untrusted JSON/HTTP boundary parsers validate `unknown` payloads deliberately; surface as warnings rather than pushing toward `any`.
    files: [
      "lib/early-access.ts",
      "app/api/**/*.ts",
      "components/site/home/early-access-form.tsx",
    ],
    rules: {
      "anti-slop/no-runtime-typeof": "warn",
      "anti-slop/no-unknown-parameters": "warn",
      "anti-slop/no-unknown-returns": "warn",
      "anti-slop/no-unsafe-dictionary-type": "warn",
      "anti-slop/no-known-value-widening": "warn",
      "anti-slop/require-safety-comment-for-type-assertion": "warn",
    },
  },
  {
    files: ["components/site/home/early-access-form.tsx"],
    rules: {
      "shadcn/no-restyle": "warn",
    },
  },
  {
    ...playwrightConfig,
    files: ["tests/**/*.{ts,tsx}"],
    plugins: {
      ...playwrightConfig.plugins,
      "landmines-testing": landminesTesting,
    },
    rules: {
      ...playwrightConfig.rules,
      // Scoped @interfere/landmines testing hygiene (preserves .spec.ts naming, rationale comments, and explicit types).
      "landmines-testing/no-flake-masking": "error",
      "landmines-testing/no-test-doubles": "error",
      "landmines-testing/no-unsignaled-poll": "error",
      "landmines-testing/strict-msw": "error",
      "landmines-testing/no-fixed-sleep": "warn",
      // Existing test seams surface as warnings under anti-slop until dedicated test refactors.
      "anti-slop/no-known-value-widening": "warn",
      "anti-slop/require-safety-comment-for-type-assertion": "warn",
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
    // Unit test files allow multi-assertion contract suites, readable helper loops, and scoped landmines checks.
    files: ["lib/**/*.test.{ts,tsx}", "tests/unit/**/*.test.{ts,tsx}"],
    plugins: {
      "landmines-testing": landminesTesting,
    },
    rules: {
      "landmines-testing/no-fixed-sleep": "error",
      "landmines-testing/no-flake-masking": "error",
      "landmines-testing/no-unsignaled-poll": "error",
      "landmines-testing/strict-msw": "error",
      "anti-slop/no-module-mocking": "warn",
      "anti-slop/no-chained-type-assertions": "warn",
      "anti-slop/require-safety-comment-for-type-assertion": "warn",
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
      ".agents/**",
      ".claude/**",
      ".codex/**",
      ".cursor/**",
      ".gemini/**",
      ".grok/**",
      ".next/**",
      ".next-docs/**",
      ".playwright/**",
      ".tmp/**",
      ".vercel/**",
      "app/(payload)/**",
      "components/ui/**",
      "docs/**",
      "lib/cn-tables.ts",
      "payload.config.ts",
      "payload-types.ts",
      "playwright-report/**",
      "scripts/**",
      "styles/**",
      "test-results/**",
    ],
  },
];
