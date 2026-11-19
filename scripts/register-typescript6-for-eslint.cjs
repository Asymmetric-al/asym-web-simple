const { registerHooks } = require("node:module");

// typescript-eslint loads the TypeScript compiler API through require("typescript").
// TypeScript 7 does not provide that API, so ESLint resolves those imports to
// @typescript/typescript6.
registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier !== "typescript" && !specifier.startsWith("typescript/")) {
      return nextResolve(specifier, context);
    }

    const redirected =
      specifier === "typescript"
        ? "@typescript/typescript6"
        : `@typescript/typescript6/${specifier.slice("typescript/".length)}`;
    return nextResolve(redirected, context);
  },
});
