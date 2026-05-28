# Code Review Issues

## Review Scope

- Current Asym logo/header/footer implementation.
- Public homepage render path at `http://localhost:3000/`.
- Payload-specific code was checked for relevance; no Payload Local API or access-control changes are part of this surface.

## Issues

### 1. Resolved: `SiteLogoMark` eagerly preloads every use

- File: `components/site/site-logo-mark.tsx`
- Finding: the shared logo component sets `priority` on both light and dark `Image` variants unconditionally. That makes footer/logo reuse behave like above-the-fold critical imagery and can emit preload links even when the mark is below the fold.
- Fix: make image priority opt-in, use it only for the header, and keep footer/logo reuse lazy by default.
- Verification: add a unit test for the default non-preload behavior, then run lint, typecheck, unit test, build, and browser verification.

### 2. Resolved: Vitest cannot import app code that uses the repo alias

- File: `vitest.config.ts`
- Finding: component-level unit tests fail before running because Vitest does not resolve the `@` alias used throughout the Next.js app.
- Fix: add a Vite/Vitest `resolve.alias` entry for `@` pointing at the repo root.
- Verification: rerun the focused unit test and full unit suite.

### 3. Resolved: smoke tests still asserted the old multi-page marketing surface

- File: `tests/e2e/smoke.spec.ts`
- Finding: the Playwright smoke suite still expected the removed mobile menu, `/platform` tab system, `/give` FAQ, and an older 404 headline. That let the tests fail for behavior that is no longer part of the one-page founder-letter site.
- Fix: replace the stale route/menu checks with current public-surface coverage: compact brand chip, no fake nav, founder-letter headings and CTAs, footer contact/GitHub/legal/theme controls, logo sizing, dark-mode artwork, no horizontal overflow, and the current not-found copy.
- Verification: rerun the smoke suite against the production build.

### 4. Resolved: Playwright route coverage still expected removed marketing pages

- Files: `tests/fixtures/routes.ts`, `tests/e2e/responsive.spec.ts`, `tests/visual/routes.spec.ts`
- Finding: the Playwright route fixtures and responsive regression suite still covered removed marketing surfaces such as `/platform`, `/give`, `/waitlist`, and old mobile navigation behavior. Visual snapshots for those pages also no longer described the current public site.
- Fix: narrow shared route fixtures to the current public surface: homepage plus legal pages. Replace stale header/footer responsive checks with current compact brand chip and footer behavior, and remove platform-tab resize coverage that no longer applies.
- Verification: rerun the e2e and visual suites against the production build.
