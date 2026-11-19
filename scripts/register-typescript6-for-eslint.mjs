import { registerHooks } from "node:module";

// typescript-eslint loads the TypeScript compiler API through require("typescript").
// TypeScript 7 does not provide that API, so lint resolves those imports to
// @typescript/typescript6. This process is the ESLint process only.
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
