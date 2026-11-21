# Design System: Asymmetric.al

**Project:** asym product website (`asym.app`), built by Asymmetric.al  
**Stack:** Next.js 16 · Tailwind v4 (`source(none)` + explicit active `@source`, `@layer ui-sdk;`) · Vercel UI SDK (`@ui-sdk/react`, `@ui-sdk/core`) · shadcn/ui `base-maia` · Native GPU-composited CSS transitions & bespoke copperplate editorial plates  
**Source of truth for tokens:** `app/globals.css` · `lib/config.ts` · `components/site/brand/mark-geometry.ts` · `components/site/brand/editorial-glyphs.tsx`  
**No Stitch project ID** — synthesized directly from the codebase and running UI.

---

## 1. Visual Theme & Brand Concept: "One Gift, Three Hands — The Asymmetric Editorial Press"

`asym.app` is the prelaunch product website for **Asymmetric.al**, an independent, for-profit software company serving nonprofits, starting with missions organizations.

`asym` runs on **Core** (`Asymmetric-al/core`, `AGPL-3.0-only`), connecting donor portals, self-service receipts and annual statements, redacted missionary rosters, and office CRM/batch previews across three apps (`apps/donor`, `apps/missionary`, `apps/admin`) reading from one shared schema. Public giving pages in `apps/donor` still use `@asym/mock-data` demo profiles; hosted teams and human-approved AI appeals are in development.

The website expresses that architecture through **pure editorial printmaking, typeset hairline-ruled ledgers, bespoke ink illustration, and architectural clarity — with zero mock product screens and zero fictional donor records**:

- **Three original editorial printmaking plates, never fake product UI:**
  - **Plate I (`public/art/three-hands-plate*.webp`):** Copperplate pen-and-ink triptych showing three hands joined by a continuous ink line (donor envelope, missionary folded letter before pine mountains, office fountain pen on open ledger with hatched vermilion wax seal).
  - **Plate II (`public/art/archive-ledger-plate*.webp`):** Dovetailed wooden archival drawer holding an open hand-stitched ruled ledger, Field Pine silk bookmark ribbon, bone folder, brass dividers, and hatched vermilion wax seal anchoring the Open Source chapter.
  - **Plate III (`public/art/human-seal-plate*.webp`):** Human hand with turned-wood stamp poised above a dashed draft letter and vermilion seal for the planned AI appeal review chapter.
  - Every plate ships in `480w`, `800w`, and `1200w` AVIF with `480w`/`640w`/`800w`/`1200w` WebP fallbacks in both light and dedicated Night Ledger chalk-on-slate dark editions (`*-dark.*`), presented with a **single embossed plate mark directly on rag paper (`.plate-impression` / `.plate-impression-draft`)** — no nested outer cards or double trays. Only Plate I loads eagerly (`fetchPriority="high"` with color-scheme-matched `<link rel="preload" as="image" type="image/avif">`); Plates II and III and hidden dark editions load lazily so mobile Slow 4G bandwidth focuses on Plate I.
- **Strict four-ink semantic discipline:**
  - **Field Pine (`--pine`) & solid hairlines** encode verified public open-source code (`apps/donor`, `apps/missionary`, `apps/admin`, `packages/api`), confirmed correspondence, and active focus rings. A half-filled Field Pine dot encodes partial modules (public giving pages backed by demo profiles, and offline entry orchestration whose persistence is gated at `501` alongside ADRs 0004/0010/0012). Light `--pine-border` (`74%`) and `--vermilion-border` (`74%`) maintain `>= 3.0:1` even against their soft tinted pills.
  - **Dashed Graphite (`--draft`, `border-dashed`)** encodes AI drafts and planned workflows in development.
  - **Postmark Vermilion (`--vermilion`)** is reserved **exclusively for human decisions and sign-off**: Step 03 staff approval in the planned AI governance sequence and live early-access intake when open. Non-decision navigation/code primary buttons use solid **Prussian Ink (`variant: "ink"`)**.
  - **Deep Mulberry (`--destructive` / `--destructive-border`)** is fully decoupled from Postmark Vermilion for form validation errors and alerts, always paired with an explicit error icon and `>= 3.0:1` border contrast.
- **Dramatic tonal pacing:** Warm unbleached cotton rag paper (`#F3EEE3`) gives way after the product & open-source proof to a full-bleed grain-dithered **Prussian Midnight** (`#0F1D29` light / `#152635` dark with pine-tinted border separation) editorial cadence (_"A gift is recorded. / The donor holds their receipt. / The missionary sees assigned support, with donor privacy intact. / Office staff keep one ledger."_) paired with press registration ticks (`01`–`04`) above Conrad O'Brien & Blake's signed builder note.
- **Solid paper surfaces, zero frosted glass:** Every header (`bg-background`), ledger sheet (`bg-card`), and popover is solid stock — no translucent blur over scrolled text.

---

## 2. Color Palette & Roles

All tokens live in `app/globals.css` as direct precomputed CSS custom properties mapped into Tailwind via `@theme inline` and verified by `lib/theme-contrast.test.ts` (text `>= 4.5:1`, interactive/status borders `>= 3.0:1`).

| Role | Light | Dark | Contrast / Usage Notes |
| --- | --- | --- | --- |
| Page canvas (`--background`) | `#f3eee3` — Unbleached Rag Paper | `#0b131a` — Deep Night Folio | Warm paper & deep ink canvas; solid header bar (no frosted glass) |
| Specimen sheet (`--card`) | `#fcfbf7` — Clean Cotton Stock | `#121e28` — Dark Ledger Sheet | Solid typeset ledger sheets, form folios, popovers |
| Archive band (`--record`) | `#e9e2d2` — Pressed Ledger Linen | `#0e1821` — Pressed Night Linen | Theme track, inventory footer |
| Primary ink (`--foreground`) | `#12202b` — Prussian Ink | `#efe9dd` — Warm Cream Ink | Headings, primary copy (`>= 13.4:1`), selected tab rail & filled index (`>= 12.8:1`), non-decision CTAs |
| Secondary ink (`--muted-foreground`) | `#485763` — Slate Ink | `#b2bfc8` — Silver Slate | Supporting copy (`>= 5.8:1` on record, `>= 6.5:1` on canvas) |
| **Postmark Vermilion** (`--primary` / `--vermilion`) | `#b33a22` (`#fcfbf7` text `5.86:1`) | `#e56a4e` (`#0b131a` text `6.55:1`) | Strictly human decisions: Step 03 approval stop & live early-access intake |
| **Field Pine** (`--pine` / `--ring`) | `#1b574c` (`7.22:1` on paper) | `#6fb5a2` (`>= 7.5:1` on card) | Public code status, confirmed states, focus rings, code links |
| **Draft Graphite** (`--draft`) | `#4a5966` (`6.2:1` on paper) | `#96a6b4` (`6.8:1` on card) | Dashed outlines (`>= 3.25:1`) & labels for planned/in-development work |
| **Prussian Midnight** (`--night`) | `#0f1d29` (`#f3eee3` ink `14.8:1`) | `#152635` (`#f3eee3` ink `12.6:1`) | Full-bleed editorial interlude & signed founder letter band |
| **Deep Mulberry** (`--destructive`) | `#8b1d41` (`8.9:1` on sheet) | `#f288a8` (`7.8:1` on canvas) | Decoupled validation errors, `app/error.tsx` eyebrow, and alerts |
| Hairline rules (`--rule` / `--rule-strong` / `--rule-interactive`) | `18% / 34% / 52%` Prussian Ink | `16% / 32% / 46%` Cream Ink | Section rules, single plate marks, interactive ledger rows (`>= 3.3:1`) |
| Control border (`--input`) | `rgb(18 32 43 / 58%)` (`>= 4.1:1`) | `rgb(239 233 221 / 52%)` (`>= 4.5:1`) | Inputs, textareas, outline buttons, theme indicator |

---

## 3. Typography Rules

- **Editorial Display (`font-heading`):** **Newsreader** (`500` upright + true _italic_, preloaded). Hero H1: `clamp(3rem, 6.8vw, 5.25rem)`, `leading-[0.95]`, `-0.03em`.
- **UI & Reading Body (`font-sans`):** **Instrument Sans** (`400`, `500`, `600`, preloaded).
- **Ledger & Code Metadata (`font-mono`):** **IBM Plex Mono** (`400`, `500`, `preload: false` swap) reserved strictly for real repo paths, step numbers, plate numbers, visible status badges, and commit counts.
- **No-hyphen prose:** Normal prose preserves `hyphens: none`, `overflow-wrap: normal`, `word-break: normal`, minimum `12px` (`text-xs`).

---

## 4. Homepage Narrative Sequence (`app/(app)/page.tsx`)

All frames (`Header`, `Container`, `Footer`) share one exact `max-w-[82rem]` outer rail so logo, headings, plates, and footer lock cleanly along the same vertical grid.

1. **Solid Masthead (`components/header.tsx`):** Solid `bg-background` hairline bar (zero frosted glass), inline `SiteLogoMark` + lowercase `asym`, `Main` nav, honest state-matched CTA (`Request early access` when configured; solid Prussian Ink `See what’s built` jumping to `/#where-things-stand` when closed), `@ui-sdk/react/popover` `MobileNavMenu` with backdrop scrim, strong elevation, and non-duplicating `Pre-launch checklist` link when unconfigured, plus a shared `<noscript>` mobile nav bar across all routes.
2. **Hero & Plate I (`components/site/home/hero.tsx`):** Balanced spread (`46/54` at `1024px`, `44/56` at `1280px+`) with monumental `Newsreader` H1, crisp short-sentence lede stating private-by-default missionary support, concise `"Open source today; hosted access isn’t open yet."` readiness line, `Explore the three roles` + `View the code` CTAs wrapped side-by-side (`flex-row flex-wrap`) so Plate I + its caption land cleanly above the fold on `390px`, `850ms` compositor `clip-path` continuous ink thread, `Plate I` folio line, and `#surface-*` links (`Jump to a role`, stacking cleanly on `< 400px`) with subtle `↓` downward nudge cues.
3. **How One Gift Moves (`connected-section.tsx`):** Full-width 3-column broadsheet strip on `lg+` (clean stacked rows on mobile/tablet) breaking the 2-column rhythm right below the Hero, explaining the Monday handoff across Office (`preview.ts`), Donor (`receipts.ts`), and Missionary (`donors.ts`) desks without repeating technical panel details, using oversized italic Newsreader numerals and zero generic UI icons.
4. **Three Workspaces on One Shared Record (`architecture-section.tsx`, `surface-explorer.tsx`, `#product`):** Balanced 2-column desktop header (`lg:flex-row`, `whitespace-nowrap` on `Asymmetric-al/core`) with top-aligned `<SurfaceAnchors />` (eliminating mobile `#surface-*` heading clipping) over a responsive single-owner `@ui-sdk/react/tabs` ledger (compact 3-up horizontal strip with stationary solid active backing + 3px bottom Field Pine `.horizontal-tabs-indicator` outside text on `< 1024px` — zero mid-slide contrast collision; hairline-ruled vertical ledger with `.vertical-tabs-indicator` and inset focus ring on `>= 1024px`), hydrated-only invisible sizers (zero tab height jump), role-specific `SharedRecordFoot` across all three roles, clean breathing 3-part folios (no redundant bullet repetition), and distinct per-role `<noscript>` fragment anchors.
5. **Open Source, Plate II & Commercial Model (`open-source-section.tsx`, `#open-source` / `#where-things-stand`):** Placed ahead of planned AI appeals so all real, inspectable capability lands before future work — hairline-ruled inventory with visible, Forced-Colors-safe `In code` / `Partial` / `Planned` status badges on every row (accurately marking offline gift entry persistence `501` and ADRs 0004/0010/0012 as `Partial`), single maturity caveat alongside separately scoped counts (`5,200+` commits on `develop` · `600+` repository-wide merged PRs · `AGPL-3.0-only`, verified November 2026), paired with **Plate II (`archive-ledger-plate*.avif/.webp`)** and a dedicated full-width hairline-ruled `"How we’ll charge."` band beneath.
6. **Before an Appeal Goes Out (`product-section.tsx`, `governance-sequence.tsx`, `#appeals`):** Planned AI appeal chapter pairing **Plate III (`human-seal-plate*.avif/.webp`)** (`.plate-impression-draft`) with a vertical `@ui-sdk/react/tabs` four-step governance ledger (`01`–`04`, hydrated prompt hidden in no-JS, subtle `›` hover nudge), color-coded `.vertical-tabs-indicator` landing on Postmark Vermilion at Step 03, and accurate planned ADR 0004 design wording.
7. **Prussian Midnight Cadence & Signed Founder Letter (`about-section.tsx`, `#about`):** Full-bleed grain-dithered midnight band with calm chalky Night Pine accents (`#6fb5a2`, enhanced dark-mode border separation), accurate 4-line positive cadence (`01`–`04`), and Conrad O’Brien & Blake’s signed builder note.
8. **Early Access Close (`early-access-section.tsx`, `app/(app)/early-access/status/page.tsx`) & Colophon Footer (`footer.tsx`):** Solid Cotton Stock close leading unconfigured visitors with `Pre-launch checklist` (`/early-access/status?state=unavailable`, square archival `StatusPill`), `Follow progress on GitHub`, and a non-developer `development feed (Atom)` link (or isolating `EarlyAccessConfigured` behind `next/dynamic` `EarlyAccessConfiguredLoader` only when configured, with plain unified JS/no-JS confirmation copy), plus colophon footer and `ThemeToggle` with fine-pointer hover/focus pre-warming of the hidden hero plate (leaving constrained touch networks uncontended).

---

## 5. Motion, Accessibility & Technical Floor

- **Compositor-only motion:** `.vertical-tabs-indicator` (color-coded per step in `GovernanceSequence`, landing on Postmark Vermilion at Step 03), `.horizontal-tabs-indicator` (3px Field Pine rail outside `< 1024px` `SurfaceExplorer` tab text — zero contrast collision), and `.theme-toggle-indicator` animate `transform` only (`180ms cubic-bezier(0.23, 1, 0.32, 1)`); `.ink-rule-draw` (`scaleX`), `.ink-thread-reveal` (`850ms` compositor `clip-path`), `.surface-enter` (`160ms`, user-interaction-only — skipped on hydration mount), fine-pointer guarded `:hover` across buttons and tabs (`[@media(hover:hover)_and_(pointer:fine)]:`), and full `@media (prefers-reduced-motion: reduce)` collapse.
- **Unified architectural corner grammar:** Square hairline architectural folios (`border border-rule-strong bg-card`) across homepage explorers, governance notes, open-source inventory, configured form tray, mobile navigation popover, `StatusPill`, and `/early-access/status`; `rounded-md` form inputs/textareas; pills (`rounded-full`) strictly for buttons and the segmented theme control.
- **Accessibility, Security & CI checks:** Automated axe-core audits across light, dark, interactive, mobile menu, and configured form states (`0` violations), token-checked contrast (`lib/theme-contrast.test.ts` verifying text including `--muted-foreground` on `--record` and `text-foreground/78` `>= 4.5:1`, and all interactive/tinted-pill/destructive borders `>= 3.0:1`), direct Vitest route-handler tests (`lib/early-access-route.test.ts` covering `415`, `403`, `503`, `400`, `413`, `422`, honeypot, `429` + `Retry-After`, and mocked Resend `200` + `HttpOnly; SameSite=Lax; Secure` cookie / `502`), `canonical: null` on all `noIndex` routes, responsive `< 1024px` horizontal vs `>= 1024px` vertical tab orientation, Forced Colors distinct focus vs selection outlines and visible text status badges, `>= 44px` mobile targets, `0` inert non-submit buttons without JS, hardened CSP/HSTS/full-origin CSRF/rate-limiter/anti-spoof cookie, revalidate-friendly `/art/*` & `/brand/*` caching (`max-age=86400, stale-while-revalidate=604800`), and CI enforcing full `bun run lint` (`0` errors), Stylelint, TypeScript, Vitest, and dual-mode (`:3100` + `:3101`) Playwright `chromium` + `mobile-chrome` smoke/no-JS/responsive/axe suites. Manual screen-reader and live-inbox delivery checks remain separate release gates before opening production intake.
