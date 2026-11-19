import core from "ultracite/eslint/core";
import react from "ultracite/eslint/react";
import next from "ultracite/eslint/next";
import vitest from "ultracite/eslint/vitest";
import playwright from "ultracite/eslint/playwright";

export default [
  ...core,
  ...react,
  ...next,
  ...vitest,
  ...playwright,
  {
    ignores: [
      ".next-docs/**",
      ".tmp/**",
      "playwright-report/**",
      "test-results/**",
    ],
  },
];
