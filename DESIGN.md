# Design System: Asymmetric.al

**Project:** asym product website (`asym.app`), built by Asymmetric.al  
**Stack:** Next.js 16 · Tailwind v4 (`source(none)` + explicit active `@source`, `@layer ui-sdk;`) · Vercel UI SDK (`@ui-sdk/react`, `@ui-sdk/core`) · shadcn/ui `base-maia` · Native CSS transitions & direct-DOM interactive instruments  
**Source of truth for tokens:** `app/globals.css` · `lib/config.ts` · `components/site/brand/mark-geometry.ts` · `components/site/brand/editorial-glyphs.tsx`  
**No Stitch project ID** — synthesized directly from the codebase and running UI.

---

## 1. Visual Theme & Brand Concept: "One Gift, Three Hands — The Living Editorial Ledger"

`asym.app` is the prelaunch product website for **Asymmetric.al**, an independent, for-profit software company serving nonprofits, starting with missions organizations.

Missions organizations run on a recurring paper trail — gift receipts, donor records, field supporter rosters, and fund ledgers — that normally fractures across disconnected tools. `Asymmetric-al/core` solves this with three real connected surfaces (`apps/donor`, `apps/missionary`, `apps/admin`) reading from one shared record, with human-approved AI appeal drafting in development on top of those same permissions.

The website expresses that architecture directly through **editorial printmaking & documentary ledger craft**:

- **Show typeset documents, never fake SaaS dashboards:** Rather than drawing deceptive app chrome or abstract boxes, the site typesets real documentary artifacts (a perforated cotton gift receipt, a missionary supporter notice, a staff ledger entry, and a dashed AI appeal draft) — **every sample clearly labeled** (`Illustrative specimen · fictional record · no payment taken` / `Sample draft · nothing sends`) so no reasonable visitor mistakes an illustration for live customer data or already-shipped AI automation.
- **Three-ink semantic system (states visual grammar once):**
  - **Field Pine (`--pine`) & solid hairlines** encode what exists in the public open-source code (`Asymmetric-al/core`: `apps/donor`, `apps/missionary`, `apps/admin`) and settled receipts.
  - **Dashed Graphite (`--draft`, `border-dashed`)** encodes AI drafts and planned workflows in development.
  - **Postmark Vermilion (`--vermilion`)** is reserved strictly for **human acts**: primary CTAs, the tactile **Approve draft** rubber stamp, and signature rules (_"If it’s vermilion, a person decided."_).
- **Dramatic tonal pacing:** Warm unbleached cotton ledger paper (`#F3EEE3`) gives way mid-page to a full-bleed **Prussian Midnight** (`#0F1D29`) manifesto & signed founder letter before returning to the archival code inventory and correspondence folio.
- **Tone:** Direct, warm, concrete, and candid. Zero em dashes in visible copy, zero invented customers/testimonials/pricing, lowercase `asym` (`translate="no"`), company name `Asymmetric.al`.

---

## 2. Color Palette & Roles

All tokens live in `app/globals.css` as direct precomputed CSS custom properties (zero runtime nested `color-mix()` cascades) mapped into Tailwind via `@theme inline`, paired with `disableTransitionOnChange` on `ThemeProvider` for single-frame light/dark switching on both desktop and constrained mobile.

### Light (_Ledger Paper & Prussian Press_) & Dark (_Night Ledger_) Token Matrix

| Role | Light | Dark | Contrast / Usage Notes |
| --- | --- | --- | --- |
| Page canvas (`--background`) | `#f3eee3` — Unbleached Rag Paper | `#0b131a` — Deep Night Folio | Warm paper & deep ink canvas (never `#fff` or `#000`) |
| Specimen sheet (`--card`) | `#fcfbf7` — Clean Cotton Stock | `#121e28` — Dark Ledger Sheet | Documentary cards, receipts, form folios |
| Archive band (`--record`) | `#e9e2d2` — Pressed Ledger Linen | `#0e1821` — Pressed Night Linen | Specimen trays, inventory footnotes, theme track |
| Primary ink (`--foreground`) | `#12202b` — Prussian Ink | `#efe9dd` — Warm Cream Ink | Headings, primary copy (`>= 13.4:1`) |
| Secondary ink (`--muted-foreground`) | `#485763` — Slate Ink | `#b2bfc8` — Silver Slate | Supporting copy (`>= 5.8:1` on record, `>= 6.5:1` on canvas) |
| **Postmark Vermilion** (`--primary` / `--vermilion`) | `#b33a22` (`#fcfbf7` text `5.86:1`) | `#e56a4e` (`#0b131a` text `6.55:1`) | Primary CTAs, Approve draft rubber stamp, human decisions |
| **Field Pine** (`--pine` / `--ring`) | `#1b574c` (`7.22:1` on paper) | `#62bda8` (`8.2:1` on card) | Public code status, settled receipts, focus rings, links |
| **Draft Graphite** (`--draft`) | `#4a5966` (`6.2:1` on paper) | `#96a6b4` (`6.8:1` on card) | Dashed outlines & labels for AI drafts / in-development work |
| **Prussian Midnight** (`--night`) | `#0f1d29` (`#f3eee3` ink `14.8:1`) | `#12212e` (`#efe9dd` ink `13.4:1`) | Full-bleed editorial manifesto & founder letter band |
| Ledger hairline (`--rule` / `--rule-strong`) | `rgb(18 32 43 / 18% · 30%)` | `rgb(239 233 221 / 16% · 28%)` | Structural dividers, specimen frames, corner ticks |
| Control border (`--input`) | `rgb(18 32 43 / 48%)` (`>= 3.2:1`) | `rgb(239 233 221 / 38%)` (`>= 3.4:1`) | Inputs, textareas, outline buttons (WCAG 1.4.11) |
| Destructive (`--destructive`) | `#b52d1d` | `#ff8a75` | Validation errors and destructive alerts |

---

## 3. Typography Rules

### Font Stack (`next/font/google`, 3 families)

| Role | Family | CSS Variable | Utility | Usage |
| --- | --- | --- | --- | --- |
| **Editorial Display** | **Newsreader** (variable `opsz 6..72`, upright + true _italic_) | `--font-newsreader` -> `--font-heading` | `font-heading` | H1, H2, documentary headings, manifesto interlude, founder signatures |
| **UI & Reading Body** | **Instrument Sans** (variable) | `--font-instrument-sans` -> `--font-sans` | `font-sans` | Navigation, buttons, body prose, lowercase `asym` wordmark, sentence-case section eyebrows |
| **Ledger & Code Metadata** | **IBM Plex Mono** (`400`, `500`) | `--font-ibm-plex-mono` -> `--font-mono` | `font-mono` | Strictly for Gift IDs (`GIFT-0418`), tabular amounts, dates, repo paths (`apps/donor`), and commit counts |

`app/opengraph-image.tsx` bundles matching TTF files (`lib/fonts/Newsreader-*.ttf`, `InstrumentSans-*.ttf`, `IBMPlexMono-Medium.ttf`) so social preview cards share the exact same typographic identity.

### Scale & Discipline

- **Hero H1 (`Newsreader`):** `clamp(2.85rem, 5.6vw, 4.75rem)`, `leading-[0.98]`, `font-medium`, `-0.03em` tracking (`One gift.` upright / _`Three hands.`_ italic).
- **Section H2 (`Newsreader`):** `clamp(2rem, 3.8vw, 3.25rem)`, `leading-[1.03]`, `font-medium`, `-0.025em`.
- **Manifesto Interlude (`Newsreader`):** `clamp(1.95rem, 4vw, 3.5rem)`, `leading-[1.1]`, alternating upright and italic cadence.
- **Section Eyebrows (`Instrument Sans`):** Sentence case (`text-pine text-sm font-medium`), never tracked-out all-caps decoration.
- **Minimum size floor:** Never smaller than `12px` (`text-xs`). Normal prose preserves `hyphens: none`, `overflow-wrap: normal`, and `word-break: normal`.

---

## 4. Component & Page Architecture

### Homepage Narrative Sequence (`app/(app)/page.tsx`)

1. **Architectural Masthead (`components/header.tsx`):** Fixed full-width hairline-ruled bar (`backdrop-blur-md bg-background/94`), pure inline SVG `SiteLogoMark` + lowercase `asym` + subtle `For missions organizations` folio note (`lg+`), clean horizontal `Main` nav, honest dual-mode CTA (`Request early access` / `Early access` when configured; `Early access status` / `Access status` when unconfigured), and `@ui-sdk/react/popover` `MobileNavMenu` (`aria-label="Homepage sections"`, `0px` CLS spacer pre-hydration, full focus restoration across Escape/trigger/mouse/touch blank-space dismissal, exact 4-link `<noscript>` parity).
2. **Hero & Living Three-Hand Specimen (`components/site/home/hero.tsx`, `gift-specimen.tsx`):** Asymmetric `44 / 56` opening spread. Left column presents the `Newsreader` headline, concrete standfirst, Vermilion primary CTA, GitHub link, and unified 3-ink visual key. Right column immediately displays the interactive **Three-Hand Specimen** powered by `@ui-sdk/react/tabs` (`Donor` · `Missionary` · `Office`) with a **fixed-position `GIFT-0418` anchor**, live amount (`$50`/`$100`/`$250`), cadence (`Monthly`/`One-time`), and `Test anonymous gift` controls (grounded in `Asymmetric-al/core`'s `is_anonymous` missionary redaction), CSS perforated receipt tear edge (`.receipt-perforation`) on the Donor view, polite `aria-live` updates, and a full static 3-view `<noscript>` triptych.
3. **Act Two — Playable AI Appeal Approval Bench (`components/site/home/product-section.tsx`, `approval-bench.tsx`, `#product`):** Asymmetric `40 / 60` split framed in **Dashed Graphite** (`In development`) continuing the exact same `Field Team East` / `Rivera Household` scenario. Visitors inspect the permission-scoped donor audience, toggle a realistic staff edit (`Make a staff edit`), and press the **Postmark Vermilion `Approve draft` button** to stamp an embossed `-3.5deg` `APPROVED · STAFF REVIEW` seal (`150ms cubic-bezier(0.22, 1, 0.36, 1)`), transitioning the dashed draft to solid ink (`Sample only · nothing sent`) with a `Reset sample draft` control and a static `<noscript>` before/after explanation.
4. **Why One Record (`components/site/home/connected-section.tsx`):** Sticky `40 / 60` ruled editorial list anchored by three bespoke `52×52` monoline object drawings (`components/site/brand/editorial-glyphs.tsx`: perforated receipt stub, redacted permission folio, vermilion approval seal).
5. **Prussian Midnight Manifesto & Signed Founder Letter (`components/site/home/about-section.tsx`, `#about`):** Full-bleed dark interlude elevating the four-line cadence (_"A donor gives. A receipt goes out. A missionary sees the gift. Staff have the full picture."_) above Conrad O’Brien and Blake’s candid first-person letter (`Asymmetric.al`, Global Fellowship context, Newsreader italic signatures with vermilion hairline).
6. **Archival Code Inventory & Commercial Model (`components/site/home/open-source-section.tsx`, `#open-source` / `#where-things-stand`):** Scannable ledger table mapping real `Asymmetric-al/core` modules (`apps/donor`, `apps/missionary`, `apps/admin`) against dashed in-development AI modules, dated activity stats (`4,900+` commits · `590+` merged PRs · `AGPL-3.0-only`, as of Nov 2026) linked to `Asymmetric-al/core#readme`, paired with `"How we’ll charge."` (paid hosted subscription + optional planned managed donor care; pricing not yet published).
7. **Early Access Correspondence Folio (`components/site/home/early-access-section.tsx`, `early-access-form.tsx`, `#early-access`):** Cotton-paper folio crowned by a `3px` Postmark Vermilion hairline. Unconfigured mode (`:3100`) offers honest closed status with direct paths to the on-site inventory and README; configured mode (`:3101`) renders the progressive-enhancement form (`POST /api/early-access`, RFC-5321 validation, `sessionStorage` draft sync, honeypot, rate limit, anti-spoof `303` PRG redirect to `/early-access/status`, and a Postmark Vermilion stamped `"Request received"` confirmation card).
8. **Archival Colophon Footer (`components/footer.tsx`) & Segmented Theme Control (`components/theme-toggle.tsx`):** Clean hairline footer with print colophon (_"Set in Newsreader, Instrument Sans, and IBM Plex Mono"_) and `@ui-sdk/react/segmented-control` theme selector (`Light` / `Dark` / `System`, `>= 3.7:1` active pill contrast, single roving tab stop, zero inert no-JS controls).

---

## 5. Motion, Accessibility & Technical Floor

- **Purposeful motion only:** Sliding `@ui-sdk/react/tabs` indicator (`180ms cubic-bezier(0.23, 1, 0.32, 1)`), compositor-only stamp landing (`150ms cubic-bezier(0.22, 1, 0.36, 1)`), button press micro-scale (`active:scale-[0.97]`, `150ms`), and zero scroll-hijacking, zero autoplay loops, and zero `opacity: 0` content reveals.
- **Reduced motion:** Global `@media (prefers-reduced-motion: reduce)` collapses both `transition-duration` (`0.01ms`) and `transition-delay` (`0s`) so every state snaps cleanly without delay residue.
- **Accessibility & no-JS:** WCAG 2.2 AA contrast in light and dark modes across resting and active states, `>= 44px` mobile touch targets, distinct focused-invalid input rings, `(opens in a new tab)` SR hints on every `target="_blank"` link, unique `<nav>` landmarks across all routes (`Main`, `Homepage sections`, `Explore the homepage`, `Footer`), Forced Colors Mode fallbacks, and zero inert buttons without JavaScript.
- **Security & hygiene:** Hardened CSP/HSTS/`X-Frame-Options: DENY`/`nosniff`/Permissions-Policy headers, fail-closed Payload/API gating, bounded 16 KB body cap, `415` multipart rejection, and anti-spoof confirmation cookie on `/early-access/status`.
