# Design System: Asymmetric.al

**Project:** asym product website (`asym.app`), built by Asymmetric.al  
**Stack:** Next.js 16 · Tailwind v4 (`source(none)` + explicit active `@source`, `@layer ui-sdk;`) · Vercel UI SDK (`@ui-sdk/react`, `@ui-sdk/core`) · shadcn/ui `base-maia` · Native GPU-composited CSS transitions & direct-DOM interactive instruments  
**Source of truth for tokens:** `app/globals.css` · `lib/config.ts` · `components/site/brand/mark-geometry.ts` · `components/site/brand/editorial-glyphs.tsx`  
**No Stitch project ID** — synthesized directly from the codebase and running UI.

---

## 1. Visual Theme & Brand Concept: "One Gift, Three Hands — The Living Editorial Ledger"

`asym.app` is the prelaunch product website for **Asymmetric.al**, an independent, for-profit software company serving nonprofits, starting with missions organizations.

Missions organizations run on a recurring paper trail of gift receipts, donor records, field supporter rosters, and fund ledgers that normally fractures across disconnected tools. `Asymmetric-al/core` solves this with three connected surfaces (`apps/donor`, `apps/missionary`, `apps/admin`) reading from one shared record, with human-approved AI appeal drafting in development on top of those same permissions.

The website expresses that architecture directly through **editorial printmaking & documentary ledger craft**:

- **Show typeset documents, never fake SaaS dashboards:** Rather than drawing deceptive app chrome or abstract boxes, the site typesets documentary artifacts (a perforated cotton gift receipt, a missionary supporter roster row matching `Asymmetric-al/core`'s server-side anonymity redaction, a staff ledger entry, and a dashed AI appeal draft) — **every sample clearly labeled** (`Sample record · fictional · no payment` / `Sample draft · nothing sends`) so no reasonable visitor mistakes an illustration for live customer data or already-shipped AI automation.
- **Strict four-ink semantic discipline:**
  - **Field Pine (`--pine`) & solid hairlines** encode what exists in the public open-source code (`Asymmetric-al/core`: `apps/donor`, `apps/missionary`, `apps/admin`), settled receipts, confirmed correspondence, and active focus rings.
  - **Dashed Graphite (`--draft`, `border-dashed`)** encodes AI drafts, neutral closed status, and planned workflows in development.
  - **Postmark Vermilion (`--vermilion`)** is reserved **exclusively for human decisions and sign-off**: the tactile **Approve sample draft** button & rubber stamp, and live early-access intake when open. Non-decision navigation/exploration primary buttons use solid **Prussian Ink (`variant: "ink"`)**.
  - **Deep Mulberry (`--destructive`)** is fully decoupled from Postmark Vermilion for form validation errors and alerts, always paired with an explicit error icon.
- **Dramatic tonal pacing:** Warm unbleached cotton ledger paper (`#F3EEE3`) gives way mid-page to a full-bleed **Prussian Midnight** (`#0F1D29` light / elevated `#152635` with subtle emerald ambient glow in dark mode) architectural plate tracing `GIFT-0418` across three server-enforced permission boundaries above the signed founder letter, before returning to the archival code inventory and correspondence folio.
- **Tone:** Direct, warm, concrete, and candid. Zero em dashes in visible copy, zero design-system jargon in visitor copy, zero invented customers/testimonials/pricing, lowercase `asym` (`translate="no"`), company name `Asymmetric.al`.

---

## 2. Color Palette & Roles

All tokens live in `app/globals.css` as direct precomputed CSS custom properties (zero runtime nested `color-mix()` cascades) mapped into Tailwind via `@theme inline`, paired with `disableTransitionOnChange` on `ThemeProvider` for fast single-frame light/dark switching on both desktop and constrained mobile.

### Light (_Ledger Paper & Prussian Press_) & Dark (_Night Ledger_) Token Matrix

| Role | Light | Dark | Contrast / Usage Notes |
| --- | --- | --- | --- |
| Page canvas (`--background`) | `#f3eee3` — Unbleached Rag Paper | `#0b131a` — Deep Night Folio | Warm paper & deep ink canvas (never `#fff` or `#000`) |
| Specimen sheet (`--card`) | `#fcfbf7` — Clean Cotton Stock | `#121e28` — Dark Ledger Sheet | Solid documentary cards, receipts, form folios, popovers (no frosted glass) |
| Archive band (`--record`) | `#e9e2d2` — Pressed Ledger Linen | `#0e1821` — Pressed Night Linen | Specimen trays, inventory footnotes, theme track |
| Primary ink (`--foreground`) | `#12202b` — Prussian Ink | `#efe9dd` — Warm Cream Ink | Headings, primary copy (`>= 13.4:1`), selected tab indicator (`12.8:1` / `14.5:1`), non-decision primary CTAs |
| Secondary ink (`--muted-foreground`) | `#485763` — Slate Ink | `#b2bfc8` — Silver Slate | Supporting copy (`>= 5.8:1` on record, `>= 6.5:1` on canvas) |
| **Postmark Vermilion** (`--primary` / `--vermilion`) | `#b33a22` (`#fcfbf7` text `5.86:1`) | `#e56a4e` (`#0b131a` text `6.55:1`) | Strictly human decisions: Approve sample draft stamp & live early-access intake |
| **Field Pine** (`--pine` / `--ring`) | `#1b574c` (`7.22:1` on paper) | `#62bda8` (`8.2:1` on card) | Public code status, settled receipts, privacy toggle active state, focus rings |
| **Draft Graphite** (`--draft`) | `#4a5966` (`6.2:1` on paper) | `#96a6b4` (`6.8:1` on card) | Dashed outlines & labels for AI drafts, closed status, and in-development work |
| **Prussian Midnight** (`--night`) | `#0f1d29` (`#f3eee3` ink `14.8:1`) | `#152635` (`#f3eee3` ink `12.6:1`) | Full-bleed architectural boundary plate & signed founder letter band |
| **Deep Mulberry** (`--destructive`) | `#8b1d41` (`8.9:1` on sheet) | `#f288a8` (`7.8:1` on canvas) | Decoupled validation errors and alerts (never collides with Postmark Vermilion) |
| Ledger hairline (`--rule` / `--rule-strong`) | `rgb(18 32 43 / 18% · 30%)` | `rgb(239 233 221 / 16% · 28%)` | Structural dividers, specimen frames, corner ticks |
| Control border (`--input`) | `rgb(18 32 43 / 58%)` (`>= 4.1:1`) | `rgb(239 233 221 / 52%)` (`>= 4.5:1`) | Inputs, textareas, outline buttons, tab rail (WCAG 1.4.11) |

---

## 3. Typography Rules

### Font Stack (`next/font/google`, 3 families, 3 critical preloads)

| Role | Family | CSS Variable | Utility | Usage |
| --- | --- | --- | --- | --- |
| **Editorial Display** | **Newsreader** (`500` upright + true _italic_, preloaded lightweight static subsets) | `--font-newsreader` -> `--font-heading` | `font-heading` | H1, H2, documentary headings, architectural plate, founder signatures |
| **UI & Reading Body** | **Instrument Sans** (`400`, `500`, `600`, normal only, preloaded) | `--font-instrument-sans` -> `--font-sans` | `font-sans` | Navigation, buttons, body prose, lowercase `asym` wordmark, sentence-case section eyebrows |
| **Ledger & Code Metadata** | **IBM Plex Mono** (`400`, `500`, `preload: false` swap) | `--font-ibm-plex-mono` -> `--font-mono` | `font-mono` | Strictly for Gift IDs (`GIFT-0418`), tabular amounts, dates, repo paths (`apps/donor`), and commit counts |

`app/opengraph-image.tsx` bundles matching TTF files (`lib/fonts/Newsreader-*.ttf`, `InstrumentSans-*.ttf`, `IBMPlexMono-Medium.ttf`) so social preview cards share the exact same typographic identity.

### Scale & Geometry Discipline

- **Hero H1 (`Newsreader`):** `clamp(2.75rem, 5.4vw, 4.75rem)`, `leading-[0.97]`, `font-medium`, `-0.03em` tracking (`One gift.` upright / _`Three hands.`_ italic).
- **Section H2 (`Newsreader`):** `clamp(2rem, 3.8vw, 3.25rem)`, `leading-[1.03]`, `font-medium`, `-0.025em`.
- **Secondary Page H1 (`/privacy`, `/terms`, `/statement-of-faith`, `/not-found`):** `font-heading font-medium tracking-[-0.03em]`.
- **Radius hierarchy:** Pills (`rounded-full`) strictly for buttons, segmented switches, tabs, and status badges; crisp archival stationery (`rounded-xl` / `rounded-2xl`) for cards, receipts, form inputs, and textareas.
- **Minimum size floor:** Never smaller than `12px` (`text-xs`). Normal prose preserves `hyphens: none`, `overflow-wrap: normal`, and `word-break: normal`.

---

## 4. Component & Page Architecture

### Homepage Narrative Sequence (`app/(app)/page.tsx`)

1. **Architectural Masthead (`components/header.tsx`):** Fixed full-width hairline-ruled bar, pure inline SVG `SiteLogoMark` + lowercase `asym` + subtle `For missions organizations` folio note (`lg+`), clean horizontal `Main` nav, consistent `Early access` pill (`Request early access` when configured), and `@ui-sdk/react/popover` `MobileNavMenu` (`aria-label="Homepage sections"`, solid opaque Cotton Stock sheet, `0px` CLS spacer pre-hydration, full focus restoration, exact 4-link `<noscript>` parity).
2. **Hero & Living Three-Hand Specimen (`components/site/home/hero.tsx`, `gift-specimen.tsx`):** Asymmetric `43 / 57` opening spread (`xl+`, wide stately stack at `768px–1279px` and compact mobile opening). Left column leads with shipped value (`See what’s built` in Prussian Ink + `View the code` + subtle link to the in-development AI approval demo; `Request early access` in Postmark Vermilion when configured). Right column immediately displays the interactive **Three-Hand Specimen** powered by `@ui-sdk/react/tabs` (`Donor` · `Missionary` · `Office`) with fixed `GIFT-0418` anchor, segmented `$50`/`$100`/`$250` and `Monthly`/`One-time` controls, fixed-label `Anonymous to field` privacy toggle matching `Asymmetric-al/core`'s exact server-side redaction (`Anonymous partner` with individual amount & gift ID hidden on roster), high-contrast Prussian Ink GPU-composited sliding tab indicator (`12.8:1` / `14.5:1`), uniform locked panel height, exact-height zero-button SSR bar (`0.0000` CLS), and complete `<noscript>` 3-view static triptych.
3. **Act Two — Playable AI Appeal Approval Bench (`components/site/home/product-section.tsx`, `approval-bench.tsx`, `#product`):** Connects the 4-stage workflow directly to a playable **Dashed Graphite** (`In development`) draft sheet continuing `Field Team East` / `Rivera Household`. Visitors toggle **`Apply sample edit`** and press the **Postmark Vermilion `Approve sample draft` button** to land an embossed `-3.5deg` `APPROVED · STAFF REVIEW` stamp (`150ms`), smoothly transition the dashed draft to solid ink, and pulse **Step 04 (`Publish & tie gifts to history`)** to `Ready after sign-off` — with exact-height SSR reservation (`0.0000` CLS) and static `<noscript>` explanation.
4. **Why One Record (`components/site/home/connected-section.tsx`):** Sticky `40 / 60` ruled editorial list anchored by three bespoke `52×52` monoline object drawings (`components/site/brand/editorial-glyphs.tsx`) linking directly to `packages/api/src/missionary-portal/donors.ts` in `Asymmetric-al/core`.
5. **Prussian Midnight Architectural Plate & Signed Founder Letter (`components/site/home/about-section.tsx`, `#about`):** Full-bleed midnight chapter featuring a bespoke horizontal datum-rail architectural diagram tracing `GIFT-0418` across `01 · Donor`, `02 · Missionary`, and `03 · Office` permission boundaries, paired with Conrad O’Brien and Blake’s grounded first-person letter (`Asymmetric.al`, Global Fellowship context, Newsreader italic signatures).
6. **Archival Code Inventory & Commercial Model (`components/site/home/open-source-section.tsx`, `#open-source` / `#where-things-stand`):** Clickable ledger table linking real `Asymmetric-al/core` paths (`apps/donor`, `apps/missionary`, `apps/admin`) against dashed `in development` AI modules, dated activity stats (`4,900+` commits · `590+` merged PRs · `AGPL-3.0-only`, as of Nov 2026) linked to `Asymmetric-al/core#readme`, paired with `"How we’ll charge."` (paid hosted subscription + optional planned managed donor care; pricing not published yet).
7. **Early Access Correspondence Folio (`components/site/home/early-access-section.tsx`, `early-access-form.tsx`, `#early-access`):** Solid Cotton Stock folio with corner-safe inset top accent rule (Field Pine when closed, Postmark Vermilion when open). Unconfigured mode (`:3100`) offers honest closed status and ink CTA to the code inventory; configured mode (`:3101`) SSRs the progressive-enhancement form directly (`POST /api/early-access`, RFC-5321 validation, `sessionStorage` draft sync, honeypot, rate limit, config-before-validation `503` gating, verified Resend message ID check, anti-spoof `303` PRG redirect, and Field Pine `"Received"` confirmation card).
8. **Archival Colophon Footer (`components/footer.tsx`) & Segmented Theme Control (`components/theme-toggle.tsx`):** Full-contrast hairline colophon (_"Set in Newsreader, Instrument Sans, and IBM Plex Mono"_) and direct single-frame `@ui-sdk/react/segmented-control` theme selector (`Light` / `Dark` / `System`, `>= 3.7:1` active pill contrast, zero inert no-JS controls).

---

## 5. Motion, Accessibility & Technical Floor

- **Purposeful GPU-composited motion only:** Sliding `@ui-sdk/react/tabs` indicator via `transform: translate3d(...)` (`180ms cubic-bezier(0.23, 1, 0.32, 1)`), compositor-only stamp landing (`150ms cubic-bezier(0.22, 1, 0.36, 1)`), step-4 approval state highlight (`200ms`), button press micro-scale (`active:scale-[0.97]`, `150ms`), and zero scroll-hijacking, zero autoplay loops, and zero `opacity: 0` content reveals.
- **Reduced motion:** Global `@media (prefers-reduced-motion: reduce)` collapses both `transition-duration` (`0.01ms`) and `transition-delay` (`0s`) so every state snaps cleanly without delay residue.
- **Accessibility & no-JS:** WCAG 2.2 AA contrast in light and dark modes across resting, selected, focused, and invalid states (including `>= 12.8:1` selected tab indicator and `>= 4.1:1` input borders), visible focus rings on focusable tab panels, `>= 44px` mobile touch targets, fixed accessible labels on `aria-pressed` toggles, `(opens in a new tab)` SR hints on every `target="_blank"` link, unique `<nav>` landmarks, Forced Colors Mode fallbacks, and zero inert buttons without JavaScript.
- **Security & hygiene:** Hardened CSP/HSTS/`X-Frame-Options: DENY`/`nosniff`/Permissions-Policy headers, fail-closed Payload/API gating, bounded 16 KB body cap, `415` multipart rejection, config-first `503` enforcement, and anti-spoof confirmation cookie on `/early-access/status`.
