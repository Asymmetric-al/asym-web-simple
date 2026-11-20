# Design System: Asymmetric.al

**Project:** asym product-marketing site (asym.app), built by Asymmetric.al  
**Stack:** Next.js 16 · Tailwind v4 (`source(none)` + explicit active `@source`, `@layer ui-sdk;`) · Vercel UI SDK (`@ui-sdk/react`, `@ui-sdk/core`) · shadcn/ui `base-maia` · React Bits Pro (`@reactbits-pro`, adapted locally under `components/react-bits/`) · Native CSS transitions & direct-DOM interactive workflow plate  
**Source of truth for tokens:** `app/globals.css` · `lib/config.ts` · `components/site/brand/mark-geometry.ts`  
**No Stitch project ID** — this document was synthesized directly from the codebase and running UI.

---

## 1. Visual Theme & Atmosphere

asym.app is a prelaunch product website for Asymmetric.al, a for-profit company serving nonprofits, starting with missions organizations. The aesthetic is **calm, product-led editorial minimalism**: a warm parchment canvas, near-black ink text, one restrained navy accent, subtle printmaking textures, and generous breathing room. Every surface choice makes the product easier to understand and feel trustworthy, never louder.

**The site is informational.** Explain the product in words and honest structure (connected steps, who does what, shared records, what is built, and what is in development). Do not draw mock app screens, fake dashboards, sample organizations, or invented metrics. Show real product visuals only when they come from the actual product and are labeled honestly.

The dominant feel is **warm-muted luminosity**: a lightly antiqued parchment canvas (`background-color: var(--background)`) paired with a strictly contained top-anchored atmosphere shell (`.page-atmosphere` at `z-index: -10` inside each route shell's `relative isolate` wrapper, `contain: strict`, `height: 48rem`) layering atmospheric watercolor radial lobes of steely blue and sage green (`--page-gradient`), a lightweight static **128 px neutral paper-grain PNG tile** (`public/brand/grain-neutral.png` at `0.055` light / `0.065` dark, no SVG `<feTurbulence>` filter, no CSS `mask-image`, no theme-toggle image swap), and a smooth vertical fade back into `--background` so the wash and grain stay visible above the canvas while culling completely offscreen during footer theme toggles.

### Signature Motif: Datum & Sweep

Measured directly from the official `asym` mark (`public/brand/asym-mark-dark.png`, `viewBox="102 65 820 897"` in `components/site/brand/mark-geometry.ts`), the brand's visual grammar comes from three architectural primitives:

| Primitive | Measured Ratio | Where Used (and Nowhere Else) |
| --- | --- | --- |
| **Datum lid** (`.datum-lid`) | Horizontal crossbar at `29%` from top with arched `16%` shoulders curving down into the outer frame | Lower record band of the `#product` workflow plate (brought cleanly above the desktop fold), flush lower `"Where things stand"` band of the `#open-source` specification plate, and the Open Graph social card (`app/opengraph-image.tsx`) |
| **Stem & sweep** | Vertical stem at `42%` from left bending along a quarter-ellipse (`0.73` ratio) into the baseline | Desktop (`xl+`) workflow stems (`border-bottom-left-radius: 30px 44px`) sweeping into the datum lid, and the full-width About cascade (`.about-sweep`, `7.5rem 8.5rem` elliptical curve aligned with even `2.5rem` steps) |
| **42 / 58 split** | Derived from the mark's stem position (`42%` left / `58%` right) | Unified structural two-column ratio across Connected, Open source, About, and Early access (`58 / 42` in Product so the headline holds the wider column) |
| **Mark glyphs** (`MarkGlyph`) | Full official mark at `44×48px` with two primitives in Ledger Rule (`--rule`) and one inked (`--ink`) | Replaces generic icon tiles in Connected (`datum` = Shared records, `sweep` = Defined actions, `frame` = People decide) |

**Placement rules:**

- Never draw the mark's geometry behind headline text or as generic full-page background decoration.
- Never combine more than one structural primitive in the same sub-component.
- Rest-state structural rules stay hairline (`1px`, `--rule`); only user interaction inks them (`1.5px`, `--ink`).

Surfaces are **layered with clear structural intent**:

- Solid hairline borders represent shipped foundation and human-owned steps.
- Dashed hairline borders (`border-dashed`) distinguish in-development AI/publishing workflow steps (`Prepare`, `Publish`), in-development capabilities in the Open source legend, and planned future services (`Managed donor care`) at a glance. Neither in-development workflow step carries a pre-selected fill at rest.
- Seamless alternating section washes (`.section-wash-sky`, `.section-wash-accent`, fading in from `transparent 0%` to peak at `7rem` and back to `transparent 96%`) create gentle vertical cadence without hard horizontal seams.
- Two-stage tactile vellum shadows (`--shadow-card`, `--shadow-strong`) pair a `1px` specular top inner highlight with crisp contact and ambient depth — zero `backdrop-filter: blur` on static below-fold containers.
- `backdrop-filter: blur` (`backdrop-blur-md`) is reserved strictly for the floating fixed Header.

The tone is direct, warm, and confident. Use concrete work (a gift, a receipt, a donor record, publishing a giving page) instead of slogans, keep paragraphs short, avoid em dashes in copy, and label status plainly ("Launching soon", "In development", "Planned", "Opening soon"). The product name is written lowercase: **asym** (never uppercased). The company is **Asymmetric.al**.

---

## 2. Color Palette & Roles

All tokens live in `app/globals.css` as CSS custom properties and map to Tailwind via `@theme inline`.

### Light & Dark Token Matrix

| Role | Light | Dark | Contrast / Usage Notes |
| --- | --- | --- | --- |
| Page background (`--background`) | `#f6f2ea` — Warm Parchment Canvas | `#0d141a` — **Near-Black Deep Ocean** | Never pure `#ffffff` or `#000000` |
| Card surface (`--card`) | `#fbfaf7` — Antiqued Near-White | `#111b23` — **Dark Ink Card** | Subtle stratification over canvas |
| Record band (`--record`) | `#f3eee4` — **Pressed Parchment** | `#0f1920` — **Sounding Deep** | Datum-lid thresholds and lower bands (`>= 5.36:1` muted, `14.1:1` ink) |
| Primary accent (`--primary`) | `#1e3a4f` — Deep Ink Navy | `#dbeaf7` — **Pale Ice Blue** | Primary CTAs, numbered discs, active pill |
| Ink line (`--ink`) | `#1e3a4f` — **Ink Line** | `#78aed3` — **Ice Steel Blue** | Active workflow stems/datum, mark glyphs (`>= 7.5:1` on `--record`) |
| Ledger rule (`--rule`) | `rgb(30 58 79 / 17%)` — **Ledger Rule** | `rgb(237 243 247 / 18%)` | Rest-state structural hairlines, table dividers, datum lid |
| Sweep hairline (`--sweep-hairline`) | `rgb(30 58 79 / 30%)` | `rgb(120 174 211 / 38%)` | About sweep cascade only |
| Secondary (`--secondary`) | `#e6f1f9` — Pale Sky Wash | `#1a2c39` — **Dark Steel Teal** | Lit record pills (`--node-lit`), subtle outline hover tint |
| Accent (`--accent`) | `#e8efe2` — Sage Green Mist | `#223127` — **Dark Forest Moss** | About section wash |
| Foreground text (`--foreground`) | `#16212b` — Deep Ink Charcoal | `#edf3f7` — **Near-White Vapor** | Headings and primary copy |
| Muted text (`--muted-foreground`) | `#54636f` — Slate Muted Gray | `#b6c3cb` — **Cool Light Gray** | Supporting prose (`>= 5.4:1` AA) |
| Control border (`--input`) | `rgb(22 33 43 / 50%)` (`3.17:1`) | `rgb(243 246 248 / 38%)` (`3.37:1`) | Inputs, textareas, outline buttons (WCAG 1.4.11) |
| Focus ring (`--ring`) | `#235d85` (`6.32:1`) | `#78aed3` — **Ice Steel Blue** (`7.77:1`) | Focus indicators; `--tw-ring-offset-color: var(--background)` |
| Destructive (`--destructive`) | `#c03d2c` — Crimson Alert | `#ff8d79` — **Coral Peach Alert** | `--destructive-foreground`: `#fdfcf9` / `#16212b` |

---

## 3. Typography Rules

### Font Stack

| Role | Family | Source | CSS Variable (`<html>` + `@theme inline`) | Utility |
| --- | --- | --- | --- | --- |
| **Headings** | Plus Jakarta Sans | `next/font/google` | `--font-plus-jakarta` -> `--font-heading` | `font-heading` |
| **Body** | Inter | `next/font/google` | `--font-inter` -> `--font-sans` | `font-sans` |
| **Kickers / Actors / Status** | JetBrains Mono | `next/font/google` | `--font-jetbrains-mono` -> `--font-mono` | `font-mono` |

Font `.variable` classes MUST sit on `<html>` in `app/layout.tsx`, and element base rules in `app/globals.css` MUST sit inside `@layer base` so Tailwind v4 utility classes win cleanly. `app/opengraph-image.tsx` loads bundled Plus Jakarta Sans TTFs (`lib/fonts/`) for server-rendered social cards.

### Optical Tracking, Word Spacing & Scale

Tight negative tracking scales optically with heading size, paired with **`word-spacing: 0.05em`** on the base heading rule (`h1–h6`) so Plus Jakarta Sans semibold preserves crisp word separation even under tight letter-spacing:

| Element | Size | Weight | Tracking | Line Height | Notes |
| --- | --- | --- | --- | --- | --- |
| **Hero H1** | `clamp(2.15rem, 5vw, 4rem)` | 600 | `-0.025em` (`sm:` `-0.035em`) | `1.03` | Two block-level sentences at all widths; second sentence `text-muted-foreground` |
| **Section H2 / Document H1** | `clamp(1.95rem, 3.6vw, 3.05rem)` / `clamp(2.8rem, 5.5vw, 4.6rem)` | 600 | `-0.04em` | `1.04` / `0.98` | `SectionTitle` / Legal pages; two-sentence H2s use block spans so lines never break mid-sentence |
| **Status Page H1** | `clamp(1.9rem, 4vw, 2.75rem)` | 600 | `-0.035em` | `1.06` | Server-rendered `/early-access/status` heading |
| **About Cascade (`<ol>`)** | `clamp(1.375rem, 2.5vw, 2.25rem)` | 600 | `-0.03em` | `1.2` | Plus Jakarta Sans sequence stepping in even `2.5rem` increments along `.about-sweep` |
| **Panel H3 / Document H2** | `text-2xl` (`24px`) / `clamp(1.5rem, 2.4vw, 2rem)` | 600 | `-0.025em` | default | Early access status, Request received, Legal section H2 |
| **Workflow / Principle H3** | `text-xl` (`20px`) / `text-lg` (`18px`) | 600 | `-0.015em` | default | Crisp word spacing ("Describe", "Prepare", "Review", "Publish") |
| **Specification Sub-label H3** | `0.9375rem` (`15px`) | 600 | `0` (`tracking-normal`) | default | Rendered in Inter (`font-sans`, e.g. "Where things stand") |
| **Body paragraph** | `text-base` / `sm:text-lg` | 400 | default | `leading-7` / `leading-8` | Max width `42rem` (≤ `72ch`); principle rows capped at `56ch` |
| **Section Kicker (`Eyebrow`)** | `0.8125rem` (`13px`) | 500 | `0.02em` | default | JetBrains Mono **sentence case** uniformly across all five homepage sections (`The first workflow`, `Why connected`, `Open source`, `About`, `Early access`) and legal numbers; `text-primary/82 dark:text-ring` |
| **Workflow Actor Label** | `text-xs` (`12px`) | 400–500 | `0.02em` | default | JetBrains Mono **sentence case / lowercase-safe** (`Your team`, `AI`, `asym` with `translate="no"`) — never uppercased |
| **StatusPill** | `text-xs` (`12px`) | 400 | `0.04em` | default | JetBrains Mono **sentence case** (`Launching soon`, `In development`, `Planned`, `Opening soon`) with `min-h-8` pill border and `bg-ring` dot; `text-muted-foreground` |
| **Brand wordmark** | `text-lg` | 600 | `-0.03em` | `none` | Plus Jakarta Sans, lowercase `asym`, `translate="no"` |

**Minimum size:** Interface text is never smaller than `12px` (`text-xs`). Normal prose keeps `hyphens: none`, `overflow-wrap: normal`, and `word-break: normal`; compound terms such as `sign‑ups` and `early‑access` use non-breaking hyphens (`U+2011`) where line wraps could otherwise strand a short syllable.

---

## 4. Component Stylings

### Buttons & Inputs

- All buttons are fully pill-shaped (`rounded-full`) via `components/ui/button-variants.ts`, with compositor-only press and icon transforms (`transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97]`) and immediate hover color feedback so root theme switches synchronize in a single frame on both desktop and constrained mobile without forced style flushes.
- Filled variants (`default`) use `bg-clip-border`, `font-semibold` (giving crisp, authoritative primary button weight in both light and dark modes with zero theme-toggle font-weight reflow), and `border border-transparent` so their optical outer height matches adjacent `outline` buttons (`44.0px`) while preserving high-contrast borders in Forced Colors Mode. Primary buttons carry an **ink-press specular edge** (`inset 0 1px 0` top highlight + `inset 0 -1px 0` base bevel).
- Outline buttons use `border-input` (`>= 3.17:1` light / `3.37:1` dark, WCAG 1.4.11) on `bg-background/85`.
- Auto-growing `Textarea` (`components/ui/textarea.tsx`) pairs `field-sizing-content` with `max-h-[min(22rem,50svh)] overflow-y-auto` so long notes scroll internally without pushing the submit button off-screen.
- Focus indicators across buttons, inline links (`rounded-[0.375rem]` or `rounded-xs`, never `rounded-sm` which resolves to a `16px` pill oval), inputs (including explicit `aria-invalid:focus-visible:ring-destructive aria-invalid:focus-visible:ring-offset-2` so focused invalid controls remain unmistakably distinct from resting invalid fields), workflow cards (`has-[button:focus-visible]:ring-2`), and the theme control track (`has-[:focus-visible]:ring-2`) use `ring-ring ring-offset-background` plus Forced-Colors-safe outlines (`outline-2 outline-transparent` or `@media (forced-colors: active) { outline: 2px solid Highlight }`).
- Touch targets meet `min-h-11` (`44px`) on mobile and `>= 24px` natively everywhere, with `touch-action: manipulation`.

### Navigation, Brand Mark & Footer

- **Floating Header (`components/header.tsx`) & Mobile Section Menu (`components/site/mobile-nav-menu.tsx`):** Fixed pill (`backdrop-blur-md bg-background/92`) with safe-area padding across portrait and landscape breakpoints and `prefetch={false}` on `/#...` hash links. Displays filled primary `"Request early access"` (`"Early access"` below `sm`) when configured, and a restrained `outline` `"Early access"` pill when unconfigured so it does not visually promise an open form. Below `md`, pairs with `MobileNavMenu` powered by `@ui-sdk/react/popover` (`Popover`, `PopoverTrigger`, `PopoverContent`, `PopoverTitle`, `finalFocus="none"` on link navigation, exact `size-11` pre-hydration spacer for `0px` CLS and `0` inert no-JS buttons) so visitors can jump to any section from anywhere on mobile.
- **`SiteLogoMark` (`components/site/site-logo-mark.tsx`):** Pure inline vector SVG rendered directly from `components/site/brand/mark-geometry.ts` using `stroke="currentColor"` (`size={28}` in header, `size={20}` in footer) — zero PNG image requests, zero `<head>` preload tags, and instant single-frame theme adaptation in light, dark, and Forced Colors modes.
- **Mobile quick-jump navigation (`components/site/home/hero.tsx`):** Hairline-separated `<nav aria-label="On this page">` (`prefetch={false}`) positioned cleanly above the `390×844` mobile fold beneath the Hero CTAs (`#product` applies `md:border-t` so mobile renders a single crisp hairline seam).
- **Homepage Colophon (`components/react-bits/wordmark-spotlight.tsx`):** Adapted from React Bits Pro (`@reactbits-pro/cta-8`). Rendered ONLY on the homepage (`/`) in a restrained `max-w-[44rem]` colophon container so the page closes cleanly without vertical bloat. Exact `Plus Jakarta Sans` SemiBold single vector `<path>` (`viewBox="0 0 1000 322"`, zero webfont flash, zero LCP hijacking, zero SVG `<mask>`), flat on `<sm` mobile and illuminated in both light and dark themes (`sm:fill-[url(#asym-wordmark-fill)] sm:dark:fill-[url(#asym-wordmark-fill)]`) under fine pointers via a direct SVG `<radialGradient>` fill updated with `gradientTransform="translate(...)"` resting at the `42%` stem ratio (zero mount-time layout read, passive scroll + `ResizeObserver` rect invalidation, live `prefers-reduced-motion` `change` listener that immediately cancels rAF and resets to rest, paused offscreen via `IntersectionObserver`, hidden in `forced-colors: active` and print).
- **Footer (`components/footer.tsx`) & Segmented Theme Control (`components/theme-toggle.tsx`):**
  - Quiet hairline-separated footer across all pages (`prefetch={false}` on hash links; omits redundant GitHub issue links when unconfigured).
  - `ThemeToggle` uses `@ui-sdk/react/segmented-control` (`SegmentedControl`, `SegmentedControlItem`) for WAI-ARIA `radiogroup`/`radio` semantics, single roving tab stop, and arrow-key switching, styling the active pill directly via `data-checked:` on a quiet tactile Pressed Parchment / Sounding Deep (`bg-record`, `p-1`) track with a raised vellum active pill (`data-checked:bg-card data-checked:border-input` light / `dark:data-checked:bg-secondary dark:data-checked:border-ring/70` dark, `>= 3:1` active-state boundary contrast, omitting `SegmentedControlIndicator` to keep Event Timing INP in the `< 200ms` Good band on constrained mobile). Keyboard focus rings sit cleanly around the outer track (`has-[:focus-visible]:ring-2`) with zero border collision. Renders an exact-height `h-[3.375rem] sm:h-[2.625rem]` placeholder until hydrated (`0px` layout shift, zero inert no-JS controls), uses inline SVGs (zero `lucide-react` imported across any active route or client chunk), and pairs `forced-colors:data-checked:border-[Highlight] forced-colors:data-checked:bg-[Highlight] forced-colors:data-checked:text-[HighlightText]`.

### Homepage Section Patterns (`components/site/home/`)

Order: Hero -> Product (`#product`) -> Why connected -> Open source (`#open-source` / `#where-things-stand`) -> About (`#about`) -> Early access (`#early-access`) -> Homepage Colophon.

1. **Hero (`HomeHero`):** Single unified hairline status capsule (`Open-source software for nonprofits` | `Launching soon`), plain-English two-line optical H1 (_"Website, giving, and donor records."_ / _"One platform built to work with AI."_), upfront built-vs-in-development lead copy for missions organizations, primary CTA (`"Request early access"` when configured, `"See how it works"` scrolling directly to `#product` when closed) + `"View the code"`, compact enough that the signature Datum & Sweep Workflow Plate enters cleanly above the desktop fold (`1280×800` and `1440×900`). Zero infinite autoplay loops and zero redundant notice bars.
2. **Datum & Sweep Workflow Plate (`#product`):** `md:border-t` `58 / 42` heading split (`lg:items-start`, intro aligned optically with the H2 top, framing the campaign workflow in development) + `WorkflowPlate` (`surface-panel overflow-hidden rounded-[2rem]`):
   - Top header bar inside the plate displays the interactive trace cue (`Select a step to trace its connected records.`, hidden without JS) alongside the explicit solid (`Your team`) vs. dashed (`AI / asym (in development)`) visual key before Step 1.
   - Four steps (`1 Describe · Your team`, `2 Prepare · AI · In development`, `3 Review · Your team`, `4 Publish · asym · In development`). Recomposes cleanly: vertical timeline on mobile, balanced `2×2` grid at `sm` through `lg` (`1024px`), and equal-height `4`-across Datum & Sweep layout (`xl:grid-rows-[1fr_auto]`) at `xl+` (`1280px+`) so all four curved stems drop from one horizontal baseline.
   - Human steps (`Describe`, `Review`) carry solid `border-rule` enclosures and Forced-Colors-bordered discs; in-development automated steps (`Prepare`, `Publish`) carry dashed `border-primary/34` enclosures, dashed discs, dashed `xl+` stems, and visible `"In development"` badges. Scoped `--wf-card-bg` keeps the `xl` actor mask and pinned disc halo seamlessly matched to the active card tint.
   - `xl+` stems curve elliptically (`30px 44px`) into the arched **Datum Lid** (`.datum-lid`) separating the **Pressed Parchment / Sounding Deep** (`bg-record`) lower band holding `Connected records` (`Campaign`, `Gift`, `Receipt`, `Donor history`) in a balanced `2×2` mobile grid (`<sm`), wrapping row (`sm`), and 4-column desktop row with `xl`-only `31px` vertical ticks (zero orphaned ticks below `1280px`). Below sits a plain-spoken year-end appeal example connecting gift, receipt, the missionary's view, and donor history.
   - Progressive-enhancement interactive highlighting (`WorkflowPlate` + `WorkflowStepTitle`): plain `<h3>` pre-hydration / no-JS; upgrades in-place to an understated dashed-underline `<button type="button" aria-pressed>` (`min-h-11` mobile touch box, card-level `has-[button:focus-visible]:ring-2`, freely selectable step descriptions, `:focus-visible`-gated `focusin` that preserves an existing pin until Enter/Space/Escape). `<xl` cards render the record prefix in JetBrains Mono and description in Inter with consistent future tense on Publish.
3. **Why connected (`.section-wash-sky`):** `42 / 58` split with `lg:sticky` left heading (`Eyebrow`: `Why connected`) and right ruled editorial list (`Shared records`, `Same permissions as staff`, `Human approval before action`) anchored by bespoke `44×48` **`MarkGlyph`** SVGs (resting strokes in `--sweep-hairline` `30%` / `38%`, one official mark primitive inked in `--ink` per principle).
4. **Open source Specification Plate (`#open-source` / `#where-things-stand`):** `42 / 58` split (`Eyebrow`: `Open source`) with block-separated H2 (_"The code is public."_ / _"The hosted platform will be a paid subscription."_ using a non-breaking space between `a` and `paid`), `Asymmetric-al/core` specification plate leading in its upper chamber with **`Where things stand`** (`Website and giving pages` first, unified JetBrains Mono group labels, clickable GitHub README maturity link) above the flush `.datum-lid` repository activity band (`Asymmetric-al/core`, mono `Public` badge, baseline-aligned `4,900+`, `590+`, `AGPL-3.0-only` stats), ordered before the dashed `"Managed donor care"` (`Planned`) callout on mobile/tablet.
5. **About + Sweep Cascade (`.section-wash-accent`):** `42 / 58` first-person founder story (`Eyebrow`: `About`; `Conrad O’Brien and Blake`, linked `Asymmetric.al` GitHub organization, `Global Fellowship` context) followed by the full-width pure-CSS **`.about-sweep`** ordered manifesto cascade stepping in even `2.5rem` increments alongside the `7.5rem 8.5rem` elliptical curve.
6. **Early access (`#early-access`):** Server-aware `surface-hero` panel (`42 / 58` split, `Eyebrow`: `Early access`) carrying a soft sky/sage editorial corner wash that bookends the Hero's warm-muted luminosity:
   - Configured (`EarlyAccessConfigured`): updates the left heading cleanly to `"Thanks for reaching out."` on submission, pairing with `<EarlyAccessForm method="post" action="/api/early-access" />` featuring a synchronous `submittingRef` double-submit lock, `readOnly={isSubmitting}` pending fields, automatic stale-alert dismissal on field edit, neutral styling for non-error `"not_configured"` notices, strict RFC-5321-safe local-part and DNS-label parity, `"Privacy policy"` new-tab link with screen-reader hint + ephemeral `sessionStorage` draft sync, width-stable submit button, capped auto-growing textarea, clamped `Retry-After` `(0, 600]`, and confirmation-cookie-verified relative `303` PRG redirect to `/early-access/status`.
   - Unconfigured (`Early access opens soon.`): non-developer-first `"While sign-ups are closed"` card with primary `"See what’s built"` (`/#where-things-stand`) and secondary `"Follow progress on GitHub"` actions.

---

## 5. Scrolling & Purposeful Motion

- **Scrolling:** Native browser scrolling with a single `scroll-padding-top: 5.5rem` on `html` and `@media (prefers-reduced-motion: no-preference) { html { scroll-behavior: smooth; } }`. Zero scroll-triggered entrance hides (`opacity: 0` reveals) and zero infinite autoplay loops anywhere on the site.
- **Workflow Plate Choreography (user-triggered, `xl+`, `cubic-bezier(0.23, 1, 0.32, 1)`):**
  - Phase 1: Active stem ink draws downward via `clip-path` (`180ms`, `0ms` delay).
  - Phase 2: Datum ink clips accurately via `clip-path: inset(0 calc(100% - var(--to)) 0 var(--from))` from the stem landing point `--land` ONLY to the farthest connected record node (`240ms`, `90ms` delay), inserting crisp `10px` schematic breaks over any unconnected interior ticks (`Gift`, `Receipt` on Steps 2 and 3) so the trace never forms false T-junctions.
  - Phase 3: Connected node ticks (`scaleY`) and pills illuminate outward from `--land` (`160ms`, `150ms + 40ms × rank`).
  - **Keyboard focus, Enter/Space toggle/unpin & step switching (`[data-instant="true"]`):** Stem and datum snap immediately (`0.01ms`) and pills settle in `100ms` with `0ms` stagger, honoring Emil Kowalski's rule never to lag keyboard actions.
  - **Reduced motion & print:** Global `prefers-reduced-motion: reduce` collapses transition durations to `0.01ms`; `@media print` hides active ink overlays so printed output stays crisp.
- **Wordmark Spotlight (`WordmarkSpotlight`):** Smoothly updates its SVG `<radialGradient>` via `gradientTransform="translate(...)"` (`lerp 0.1`) only on fine pointers while intersecting the viewport (`IntersectionObserver`), invalidates its cached rect on `ResizeObserver` and passive scroll while in view, and runs zero work when offscreen, tab-hidden, touch-only, or under `prefers-reduced-motion: reduce`.

---

## 6. Do Not

- Do not use pure white (`#ffffff`) or pure black (`#000000`) for surfaces, text, or focus ring offsets.
- Do not uppercase the product name (`asym` is always lowercase with `translate="no"`).
- Do not draw the `asym` mark geometry behind headline text or as full-page background decoration.
- Do not place global element rules outside `@layer base` where they override Tailwind v4 `@layer utilities`.
- Do not remove `relative isolate` from the route shell wrapping `.page-atmosphere` (it keeps the negative-`z-index` watercolor wash and grain painted above `body`'s opaque canvas while staying offscreen-cullable).
- Do not use `rounded-sm` (`16px`) on inline text links; use `rounded-[0.375rem]` or `rounded-xs`.
- Do not add infinite autoplay loops (> 5 s without pause/stop controls) or hide core product copy at `opacity: 0` behind scroll-triggered reveals.
- Do not apply `backdrop-filter: blur` to large static below-fold containers, use SVG `<feTurbulence>` filters over large canvases, or animate `box-shadow` on focusable controls.
- Do not draw mock product interfaces, invent metrics/customers, route private privacy requests to public issue trackers, or portray Asymmetric.al as a nonprofit ministry.
