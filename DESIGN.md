# Design System: Asymmetric.al

**Project:** asym product website (`asym.app`), built by Asymmetric.al  
**Stack:** Next.js 16 · Tailwind v4 (`source(none)` + explicit active `@source`, `@layer ui-sdk;`) · Vercel UI SDK (`@ui-sdk/react`, `@ui-sdk/core`) · shadcn/ui `base-maia` · Native GPU-composited CSS transitions & bespoke editorial printmaking plates  
**Source of truth for tokens:** `app/globals.css` · `lib/config.ts` · `components/site/brand/mark-geometry.ts` · `components/site/brand/editorial-glyphs.tsx`  
**No Stitch project ID** — synthesized directly from the codebase and running UI.

---

## 1. Visual Theme & Brand Concept: "One Gift, Three Hands — The Asymmetric Editorial Press"

`asym.app` is the prelaunch product website for **Asymmetric.al**, an independent, for-profit software company serving nonprofits, starting with missions organizations.

`Asymmetric-al/core` connects giving pages, receipts, donor records, and missionary updates across three dedicated apps (`apps/donor`, `apps/missionary`, `apps/admin`) reading from one shared schema, with human-approved AI campaign drafting in development on top of those same permissions.

The website expresses that architecture through **pure editorial printmaking, bespoke ink illustration, and architectural clarity — with zero mock product screens and zero fictional donor records**:

- **Original editorial printmaking plates, never fake product UI:** Two bespoke pen-and-ink & letterpress editorial illustrations (`public/art/three-hands-plate.webp` and `public/art/human-seal-plate.webp`, each paired with a Night Ledger chalk-and-slate dark-mode engraving variant `*-dark.webp`, zero text or mock interfaces) anchor the Hero and AI Governance chapters, paired with real `Asymmetric-al/core` architecture explorers and direct links to source paths.
- **Strict four-ink semantic discipline:**
  - **Field Pine (`--pine`) & solid hairlines** encode what exists in the public open-source code (`Asymmetric-al/core`: `apps/donor`, `apps/missionary`, `apps/admin`), confirmed correspondence, and active focus rings.
  - **Dashed Graphite (`--draft`, `border-dashed`)** encodes AI drafts, neutral closed status, and planned workflows in development.
  - **Postmark Vermilion (`--vermilion`)** is reserved **exclusively for human decisions and sign-off**: the human approval gate in the governance sequence and live early-access intake when open. Non-decision navigation/exploration primary buttons use solid **Prussian Ink (`variant: "ink"`)**.
  - **Deep Mulberry (`--destructive`)** is fully decoupled from Postmark Vermilion for form validation errors and alerts, always paired with an explicit error icon.
- **Dramatic tonal pacing:** Warm unbleached cotton rag paper (`#F3EEE3`) gives way mid-page to a full-bleed **Prussian Midnight** (`#0F1D29` light / elevated `#152635` with subtle emerald ambient glow in dark mode) editorial cadence (_"A donor gives. / A receipt goes out. / A missionary sees the gift. / Staff have the full picture."_) above the signed founder letter, before returning to the archival code inventory and correspondence folio.
- **Tone:** Direct, warm, concrete, and candid. Zero em dashes in visible copy, zero fake customer or fictional gift data, lowercase `asym` (`translate="no"`), company name `Asymmetric.al`.

---

## 2. Color Palette & Roles

All tokens live in `app/globals.css` as direct precomputed CSS custom properties (zero runtime nested `color-mix()` cascades) mapped into Tailwind via `@theme inline`, paired with `disableTransitionOnChange` on `ThemeProvider` for fast light/dark switching.

### Light (_Ledger Paper & Prussian Press_) & Dark (_Night Ledger_) Token Matrix

| Role | Light | Dark | Contrast / Usage Notes |
| --- | --- | --- | --- |
| Page canvas (`--background`) | `#f3eee3` — Unbleached Rag Paper | `#0b131a` — Deep Night Folio | Warm paper & deep ink canvas (never `#fff` or `#000`) |
| Specimen sheet (`--card`) | `#fcfbf7` — Clean Cotton Stock | `#121e28` — Dark Ledger Sheet | Solid documentary cards, architectural specs, form folios, popovers (no frosted glass) |
| Archive band (`--record`) | `#e9e2d2` — Pressed Ledger Linen | `#0e1821` — Pressed Night Linen | Tab tracks, architectural frame trays, inventory footnotes |
| Primary ink (`--foreground`) | `#12202b` — Prussian Ink | `#efe9dd` — Warm Cream Ink | Headings, primary copy (`>= 13.4:1`), selected tab indicator (`12.8:1` / `14.5:1`), non-decision primary CTAs |
| Secondary ink (`--muted-foreground`) | `#485763` — Slate Ink | `#b2bfc8` — Silver Slate | Supporting copy (`>= 5.8:1` on record, `>= 6.5:1` on canvas) |
| **Postmark Vermilion** (`--primary` / `--vermilion`) | `#b33a22` (`#fcfbf7` text `5.86:1`) | `#e56a4e` (`#0b131a` text `6.55:1`) | Strictly human decisions: Step 03 approval stop & live early-access intake |
| **Field Pine** (`--pine` / `--ring`) | `#1b574c` (`7.22:1` on paper) | `#62bda8` (`8.2:1` on card) | Public code status, confirmed states, focus rings, links |
| **Draft Graphite** (`--draft`) | `#4a5966` (`6.2:1` on paper) | `#96a6b4` (`6.8:1` on card) | Dashed outlines & labels for AI drafts, closed status, and in-development work |
| **Prussian Midnight** (`--night`) | `#0f1d29` (`#f3eee3` ink `14.8:1`) | `#152635` (`#f3eee3` ink `12.6:1`) | Full-bleed editorial interlude & signed founder letter band |
| **Deep Mulberry** (`--destructive`) | `#8b1d41` (`8.9:1` on sheet) | `#f288a8` (`7.8:1` on canvas) | Decoupled validation errors and alerts (never collides with Postmark Vermilion) |
| Ledger hairline (`--rule` / `--rule-strong`) | `rgb(18 32 43 / 18% · 30%)` | `rgb(239 233 221 / 16% · 28%)` | Structural dividers, plate frames, corner ticks |
| Control border (`--input`) | `rgb(18 32 43 / 58%)` (`>= 4.1:1`) | `rgb(239 233 221 / 52%)` (`>= 4.5:1`) | Inputs, textareas, outline buttons, tab rail (WCAG 1.4.11) |

---

## 3. Typography Rules

### Font Stack (`next/font/google`, 3 families, 3 critical preloads)

| Role | Family | CSS Variable | Utility | Usage |
| --- | --- | --- | --- | --- |
| **Editorial Display** | **Newsreader** (`500` upright + true _italic_, preloaded lightweight static subsets) | `--font-newsreader` -> `--font-heading` | `font-heading` | H1, H2, editorial interlude, surface headings, founder signatures |
| **UI & Reading Body** | **Instrument Sans** (`400`, `500`, `600`, normal only, preloaded) | `--font-instrument-sans` -> `--font-sans` | `font-sans` | Navigation, buttons, body prose, lowercase `asym` wordmark, sentence-case section eyebrows |
| **Ledger & Code Metadata** | **IBM Plex Mono** (`400`, `500`, `preload: false` swap) | `--font-ibm-plex-mono` -> `--font-mono` | `font-mono` | Strictly for real repo paths (`apps/donor`, `apps/missionary`, `apps/admin`), step numbers, commit counts, and license |

`app/opengraph-image.tsx` bundles matching TTF files (`lib/fonts/Newsreader-*.ttf`, `InstrumentSans-*.ttf`, `IBMPlexMono-Medium.ttf`) so social preview cards share the exact same typographic identity.

### Scale & Geometry Discipline

- **Hero H1 (`Newsreader`):** `clamp(2.85rem, 5.6vw, 4.9rem)`, `leading-[0.96]`, `font-medium`, `-0.03em` tracking (`One gift.` upright / _`Three hands.`_ italic).
- **Section H2 (`Newsreader`):** `clamp(2rem, 3.8vw, 3.25rem)`, `leading-[1.03]`, `font-medium`, `-0.025em`.
- **Secondary Page H1 (`/privacy`, `/terms`, `/statement-of-faith`, `/not-found`):** `font-heading font-medium tracking-[-0.03em]`.
- **Radius hierarchy:** Pills (`rounded-full`) strictly for buttons, segmented switches, tabs, and status badges; crisp archival stationery (`rounded-xl` / `rounded-2xl`) for plates, cards, form inputs, and textareas.
- **Minimum size floor:** Never smaller than `12px` (`text-xs`). Normal prose preserves `hyphens: none`, `overflow-wrap: normal`, and `word-break: normal`.

---

## 4. Component & Page Architecture

### Homepage Narrative Sequence (`app/(app)/page.tsx`)

1. **Architectural Masthead (`components/header.tsx`):** Fixed full-width hairline-ruled bar, inline SVG `SiteLogoMark` + lowercase `asym` + `For missions organizations` folio note (`lg+`), horizontal `Main` nav (`Product`, `Open source`, `About`), consistent `Early access` pill (`Request early access` when configured), and `@ui-sdk/react/popover` `MobileNavMenu` (solid Cotton Stock sheet, `0px` CLS spacer, full focus restoration, 4-link `<noscript>` parity).
2. **Hero & Editorial Plate I (`components/site/home/hero.tsx`):** Asymmetric `45 / 55` opening spread pairing monumental `Newsreader` display typography (`One gift. / Three hands.`) and shipped-value-first CTAs (`See what’s built` in Prussian Ink + `View the code`) with **Editorial Plate I** (`public/art/three-hands-plate.webp`, fine pen-and-ink printmaking illustration mounted in a framed archival folio with corner `+` ticks and `01 Donor · 02 Missionary · 03 Office` caption).
3. **Three Surfaces, One Shared Record (`components/site/home/architecture-section.tsx`, `surface-explorer.tsx`, `#product`):** Real-architecture explorer powered by `@ui-sdk/react/tabs` (`Donor` · `Missionary` · `Office`) with high-contrast Prussian Ink GPU-composited sliding tab indicator (`12.8:1` / `14.5:1`), abstract three-pane `asym` geometric diagram, direct links to `apps/donor`, `packages/api/src/missionary-portal/donors.ts`, and `apps/admin`, exact-height zero-button SSR shell (`0.0000` CLS), and complete static `<noscript>` fallback.
4. **Before an Appeal Goes Out (`components/site/home/product-section.tsx`, `governance-sequence.tsx`, `#appeals`):** In-development AI governance chapter pairing **Editorial Plate II** (`public/art/human-seal-plate.webp`, human hand with turned-wood stamp poised above a blank folded letter) with an interactive 4-step governance sequence (`01 Describe` → `02 Draft` → `03 Review & approve` → `04 Publish`) explaining exact permission boundaries and the mandatory human stop — with zero fake campaign drafts or mock UI.
5. **Why One Record (`components/site/home/connected-section.tsx`):** Sticky `40 / 60` ruled editorial list anchored by three bespoke `52×52` monoline object drawings (`components/site/brand/editorial-glyphs.tsx`).
6. **Prussian Midnight Interlude & Signed Founder Letter (`components/site/home/about-section.tsx`, `#about`):** Full-bleed midnight chapter elevating the four-line cadence (_"A donor gives. / A receipt goes out. / A missionary sees the gift. / Staff have the full picture."_ — appearing here for the first and only time) above Conrad O’Brien and Blake’s grounded first-person letter (`Asymmetric.al`, Global Fellowship context, Newsreader italic signatures).
7. **Archival Code Inventory & Commercial Model (`components/site/home/open-source-section.tsx`, `#open-source` / `#where-things-stand`):** Clickable ledger table linking real `Asymmetric-al/core` directories (`apps/donor`, `apps/missionary`, `apps/admin`) against dashed `in development` AI capabilities, dated stats (`4,900+` commits · `590+` merged PRs · `AGPL-3.0-only`, as of Nov 2026), and `"How we’ll charge."`.
8. **Early Access Correspondence Folio (`components/site/home/early-access-section.tsx`, `early-access-form.tsx`, `#early-access`) & Colophon Footer (`components/footer.tsx`):** Solid Cotton Stock folio with corner-safe inset accent rule, honest unconfigured state (`:3100`) or SSR progressive-enhancement form (`:3101`), decoupled Deep Mulberry validation errors, Field Pine `RECEIVED` confirmation, full-contrast print colophon footer, and `@ui-sdk/react/segmented-control` theme toggle.

---

## 5. Motion, Accessibility & Technical Floor

- **Purposeful GPU-composited motion only:** Sliding `@ui-sdk/react/tabs` indicator via `transform: translate3d(...)` (`180ms cubic-bezier(0.23, 1, 0.32, 1)`), subtle panel entrance (`160ms`), button press micro-scale (`active:scale-[0.97]`, `150ms`), and zero scroll-hijacking, zero autoplay loops, and zero `opacity: 0` content reveals.
- **Reduced motion:** Global `@media (prefers-reduced-motion: reduce)` collapses both `transition-duration` (`0.01ms`) and `transition-delay` (`0s`).
- **Accessibility & no-JS:** WCAG 2.2 AA contrast in light and dark modes across resting, selected, focused, and invalid states, visible focus rings on focusable tab panels, `>= 44px` mobile touch targets, descriptive alt text on editorial plates, `(opens in a new tab)` SR hints, unique `<nav>` landmarks, Forced Colors Mode fallbacks, and zero inert buttons without JavaScript.
- **Security & hygiene:** Hardened CSP/HSTS/`X-Frame-Options: DENY`/`nosniff`/Permissions-Policy headers, fail-closed Payload/API gating, bounded 16 KB body cap, `415` multipart rejection, config-first `503` enforcement, and anti-spoof confirmation cookie on `/early-access/status`.
