# Design System: Asymmetric.al

**Project:** asym product website (`asym.app`), built by Asymmetric.al  
**Stack:** Next.js 16 · Tailwind v4 (`source(none)` + explicit active `@source`, `@layer ui-sdk;`) · Vercel UI SDK (`@ui-sdk/react`, `@ui-sdk/core`) · shadcn/ui `base-maia` · Native GPU-composited CSS transitions & warm sculptural inline SVG geometry  
**Source of truth for tokens:** `app/globals.css` · `lib/config.ts` · `components/site/brand/mark-geometry.ts` · `components/site/home/asymmetric-field.tsx`  
**No Stitch project ID** — synthesized directly from the codebase and running UI.

---

## 1. Visual Theme & Brand Concept: "Warm Modern Leverage"

`asym.app` is the prelaunch product website for **Asymmetric.al**, an independent, for-profit software company building open-source giving and donor-care software for nonprofits of any size.

Named for **asymmetric leverage** (multiplying what an organization can accomplish without multiplying administrative drag), `asym` runs on **Core** (`Asymmetric-al/core`, `AGPL-3.0-only`), uniting donor portals, field/missionary supporter rosters, and office CRM/batch previews across three apps (`apps/donor`, `apps/missionary`, `apps/admin`) reading from shared giving tables. Next, we are building practical AI into the same platform to take campaign prep and routine admin off teams' plates. Public giving pages in `apps/donor` still use `@asym/mock-data` sample profiles; hosted teams and AI tools are in development.

The website is **warm, human, modern, clean, and clear** — avoiding both 19th-century printshop nostalgia AND cold techno wireframes/cyberpunk glows, with **zero fake product UI and zero fictional donor records**:

- **Warm sculptural visual language (`components/site/home/asymmetric-field.tsx`):**
  - **Hero Sculpture (`AsymmetricFieldHero`):** Matte overlapping sage, warm sand, terracotta, and deep botanical curved planes derived directly from `asym`'s official mark geometry (`mark-geometry.ts`) — tactile and sunlit rather than wireframe or CAD. Zero raster image requests; adapts instantaneously to Light, Dark, and Forced Colors via CSS custom properties.
  - **Vision Horizon (`AsymmetricAiField`):** Serene concentric matte botanical-sage and warm-clay arcs expanding calmly on Deep Botanical Charcoal (`#152421`) — expressing clarity and multiplied reach without defensive red walls or neon oscilloscopes.
  - **Perspective Facets (`PerspectiveFacet`):** Compact warm-mist `rounded-xl` pills with minimal organic `asym` facets anchoring the three human-outcome cards.
- **Calm, human four-ink semantic system:**
  - **Botanical Forest (`--signal`, `--ring`)** encodes verified public open-source code (`In code` / `Partial`), active focus rings, and quiet section eyebrows.
  - **Warm Terracotta (`--human`, `--primary`)** encodes warm human highlights and live early-access intake when open. Non-intake navigation/code buttons use solid **Warm Charcoal (`variant: "ink"`)**.
  - **Warm Slate (`--draft`, `border-dashed`)** encodes AI capabilities and hosted/roadmap plans currently in development.
  - **Deep Rose (`--destructive` / `--destructive-border`)** is decoupled for form validation errors and alerts, always paired with an explicit error icon.
- **Solid warm architectural surfaces (zero frosted glass):** Every header (`bg-background`), card (`bg-card`), recessed block (`bg-record`), and popover is solid stock with a clean `base-maia` radius hierarchy (`rounded-3xl` sculptural frames, `rounded-2xl` outcome cards & status containers, `rounded-xl` forms & popovers, `rounded-lg`/`rounded-md` inputs & status pills, `rounded-full` buttons & segmented controls).

---

## 2. Color Palette & Roles

All tokens live in `app/globals.css` as direct CSS custom properties mapped into Tailwind via `@theme inline` and verified by `lib/theme-contrast.test.ts` (text `>= 4.5:1`, interactive/status borders `>= 3.0:1`).

| Role | Light (`:root` — Warm Modern Daylight) | Dark (`.dark` — Warm Charcoal Night) | Contrast / Usage Notes |
| --- | --- | --- | --- |
| Page canvas (`--background`) | `#faf9f6` — Warm Alabaster | `#0f1214` — Warm Charcoal | Bright, clean daylight & calm charcoal dark; solid header bar |
| Primary surface (`--card`) | `#fff` — Pure Surface | `#161b1e` — Soft Charcoal | Solid outcome cards, status ledger, early-access tray |
| Recessed surface (`--record`) | `#f1efe9` — Warm Mist | `#1c2226` — Elevated Charcoal | Segmented control tracks, repo stats & sustainability blocks |
| Primary ink (`--foreground`) | `#14171a` — Warm Charcoal | `#f1f0ec` — Warm Chalk | Headings, primary copy (`>= 16.4:1`), non-intake CTAs |
| Secondary ink (`--muted-foreground`) | `#525860` — Warm Slate | `#a1a8b0` — Soft Silver | Supporting copy (`>= 6.2:1` on record, `>= 6.8:1` on canvas) |
| **Botanical Forest** (`--signal` / `--ring`) | `#156651` (`>= 6.0:1` on soft) | `#66cca9` (`>= 7.7:1` on soft) | Public code status, focus rings, code links, eyebrows |
| **Warm Terracotta** (`--human` / `--primary`) | `#bf3e24` (`#fff` text `5.34:1`) | `#f08265` (`#0f1214` text `7.24:1`) | Warm human bridge accents & live early-access intake |
| **Draft Slate** (`--draft`) | `#525860` (`6.19:1` on soft) | `#a1a8b0` (`6.85:1` on soft) | Dashed borders & badges for AI / planned capabilities |
| **Deep Botanical Charcoal** (`--night`) | `#152421` (`#f7f6f2` ink `14.8:1`) | `#14221f` (`#f7f6f2` ink `15.1:1`) | Full-bleed `#vision` AI band with `#72cfb3` sage & `#f08265` clay accents |
| **Deep Rose** (`--destructive`) | `#a12645` (`>= 6.9:1`) | `#ff9cb3` (`>= 8.8:1`) | Decoupled validation errors, `app/error.tsx` eyebrow, and alerts |
| Structural & control rules | `10% / 18% / 50%` Ink (`--input` `56%`) | `10% / 20% / 50%` Chalk (`--input` `56%`) | Hairlines, card frames, interactive borders (`>= 3.3:1`) |

---

## 3. Typography Rules

- **Display (`font-heading`):** **Plus Jakarta Sans** (`500`, `600`, `700`, preloaded) — warm, open, human modern geometric sans. Hero H1: `clamp(2.85rem, 6.2vw, 4.85rem)`, `leading-[1.01]`, `-0.035em`. Section H2: `clamp(2rem, 3.8vw, 3.15rem)`, `leading-[1.06]`, `-0.03em`.
- **UI & Body (`font-sans`):** **Instrument Sans** (`400`, `500`, `600`, preloaded). Sentence-case `text-sm font-medium` eyebrows (no ALL-CAPS techno labels).
- **Code & Status Metadata (`font-mono`):** **Geist Mono** (`400`, `500`, `preload: false` swap) reserved strictly for real repository paths, status pills, and commit/PR counts.
- **No-hyphen prose:** Normal prose preserves `hyphens: none`, `overflow-wrap: normal`, `word-break: normal`, minimum `12px` (`text-xs`).

---

## 4. Homepage Narrative Sequence (`app/(app)/page.tsx`)

All frames (`Header`, `Container`, `Footer`) share one exact `max-w-[82rem]` outer rail across six clear, human chapters:

1. **Solid Masthead (`components/header.tsx`):** Solid `bg-background` bar, inline `SiteLogoMark` + lowercase `asym`, 4-link `Main` nav (`Vision`, `Product`, `Open source`, `Company`), state-matched CTA (`See what’s built` -> `/#where-things-stand` when closed; Terracotta `Request early access` -> `/#early-access` when configured), `@ui-sdk/react/popover` `MobileNavMenu`, plus `<noscript>` mobile nav.
2. **Hero (`components/site/home/hero.tsx`, `asymmetric-field.tsx`):** Balanced 52/48 split with sentence-case `Open-source software for nonprofits` eyebrow, **`Less overhead. Outsized impact.`** H1, warm vision-first subhead explaining the `asym` name (asymmetric leverage for nonprofits of any size), shared open-source foundation today + practical AI next, dual-mode stage line, single-row `390px+` actions, and the warm sculptural **AsymmetricFieldHero**.
3. **Vision & AI (`components/site/home/vision-section.tsx`, `#vision`):** Full-bleed **Deep Botanical Charcoal** band — dashed `Vision · AI in development` pill, **`Practical AI, built for real work.`**, warm expanding **AsymmetricAiField** sculpture, three value-focused pillars (`Campaigns grounded in real context`, `Less routine donor-care overhead`, `Built on one open foundation`), and an honest link to `#where-things-stand`.
4. **What `asym` Is For (`components/site/home/outcomes-section.tsx`, `#product`):** **`One foundation. Clear for everyone involved.`** — three open `rounded-2xl` human-outcome cards (`Donors` / `Field staff & missionaries` / `Office teams`, anchored with `#surface-donor`, `#surface-missionary`, `#surface-office`), each paired with a warm `PerspectiveFacet`, `In code` badge, quiet scope truth line, and distinct GitHub code link (`statements.ts`, `donors.ts`, `preview.ts`).
5. **Open Source & Where Things Stand (`components/site/home/open-source-section.tsx`, `status-ledger.tsx`, `#open-source` / `#where-things-stand`):** **`Inspect the software before you trust it.`** — interactive `@ui-sdk/react/segmented-control` filter (`All (7)`, `In code (3)`, `Partial (2)`, `Planned (2)`, all 7 rows visible pre-hydration & no-JS) over the exact verified module inventory, paired with dated repository stats (`5,200+` commits on `develop`, `600+` repository-wide merged PRs, `AGPL-3.0-only`, verified November 2026) and **How we’ll sustain it** (paid hosted subscription planned, pricing unpublished, optional future managed donor care, state-aware checklist/early-access link).
6. **Company (`components/site/home/about-section.tsx`, `#about`):** **`Built from inside the work.`** — concise founder note explaining **Asymmetric.al** (independent, for-profit software company serving nonprofits of any size; why the name means asymmetric return without administrative drag) and Conrad O’Brien (co-leading Global Fellowship) & Blake starting with missions organizations because they know that work firsthand.
7. **Early Access Close (`early-access-section.tsx`, `/early-access/status`) & Footer (`footer.tsx`):** Solid `rounded-2xl` close preserving full dual-mode behavior (`:3100` unconfigured checklist + GitHub + honest public GitHub Issues note with no-donor-data reminder + Atom feed; `:3101` configured intake form with explicit team-conversation / no-donor-data notice) + clean modern footer and instant CSS-variable `ThemeToggle`.

---

## 5. Motion, Accessibility & Technical Floor

- **Compositor-only motion:** `.segmented-indicator` (`ThemeToggle` & `StatusLedger` filter) animates `transform` only (`180ms cubic-bezier(0.22, 1, 0.36, 1)`, suppressed on first paint via `[data-activation-direction="none"]`); `.sculpt-reveal` (`620ms` gentle rise), `.surface-enter` (`160ms`), fine-pointer guarded `:hover`, and full `@media (prefers-reduced-motion: reduce)` collapse.
- **Accessibility, Security & CI checks:** Automated axe-core audits across light, dark, interactive, default-motion, mobile menu, and configured form states (`0` violations), token-checked contrast (`lib/theme-contrast.test.ts`), direct Vitest route-handler tests (`lib/early-access-route.test.ts`), `canonical: null` on all `noIndex` routes, Forced Colors high-contrast selection & focus rules, `>= 44px` mobile targets, `0` inert non-submit buttons without JS, per-request 128-bit cryptographic nonce CSP (`script-src 'self' 'nonce-...' 'strict-dynamic'`, `object-src 'none'`, zero `'unsafe-inline'` scripts) via `proxy.ts` + `headers()`, HSTS preload, COOP `same-origin`, full-origin CSRF, rate-limiter, anti-spoof cookie, and CI enforcing full `bun run lint` (`0` errors), Stylelint, TypeScript, Vitest, and dual-mode (`:3100` + `:3101`) Playwright suites.
