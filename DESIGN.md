# Design System: Asymmetric.al

**Project:** asym product-marketing site (asym.app), built by Asymmetric.al  
**Stack:** Next.js 16 · Tailwind v4 · shadcn/ui `base-maia` · `@base-ui/react` · Native CSS transitions & `IntersectionObserver` progressive reveal  
**Source of truth for tokens:** `app/globals.css` · `lib/config.ts`  
**No Stitch project ID** — this document was synthesized directly from the codebase and running UI.

---

## 1. Visual Theme & Atmosphere

asym.app is a prelaunch product website for Asymmetric.al, a for-profit company serving nonprofits, starting with missions organizations. The aesthetic is **calm, product-led editorial minimalism**: a warm parchment canvas, near-black ink text, one restrained navy accent, and generous breathing room. Every surface choice makes the product easier to understand and feel trustworthy, never louder.

**The site is informational.** Explain the product in words and honest structure (connected steps, who does what, shared records, what is built, and what is in development). Do not draw mock app screens, fake dashboards, sample organizations, or invented metrics. Show real product visuals only when they come from the actual product and are labeled honestly.

The dominant feel is **warm-muted luminosity**: a lightly antiqued parchment background suffused with soft radial glows of steely blue and sage green rendered via pure CSS radial gradients (no heavy blur filters) so transitions and theme switches stay fast on mobile.

Surfaces are **translucent and layered**, with deliberate contrast between editorial structure and floating panels:

- Solid hairline borders represent shipped foundation and verified structure.
- Dashed hairline borders (`border-dashed`) distinguish in-development AI workflow steps and planned future services at a glance.
- Alternating faint section washes (`.section-wash-sky`, `.section-wash-accent`) create gentle vertical rhythm without harsh divider lines.

A subtle **120 px architectural ink grid** (`--grid-stroke`) overlays the background behind content, masked radially toward the upper center. It reads as quiet architectural precision without competing with copy.

The tone is direct, warm, and confident. Use concrete work (a gift, a receipt, a donor record) instead of slogans, keep paragraphs short, avoid em dashes in copy, and label status plainly ("Launching soon", "In development", "Planned", "Opening soon"). The product name is written lowercase: **asym**. The company is **Asymmetric.al**.

**Key Characteristics:**

- Warm, slightly antiqued neutral foundation — never pure white (`#ffffff`), never pure black (`#000000`)
- Pure radial-gradient atmospheric glows (zero 40px GPU blur filters)
- Restrained frosted-glass elevation tiers (`backdrop-filter` capped at ≤ `16px`)
- Tight negative letter-tracking on all Plus Jakarta Sans headings (`-0.04em` to `-0.055em`)
- Pill-shaped interactive controls (buttons, pills, inputs, segmented theme switcher)
- Monospace JetBrains Mono eyebrow labels and actor tags at `12px` minimum (`text-xs`)
- Purposeful, compositor-only one-time CSS reveal on the connected workflow sequence; full `prefers-reduced-motion` support
- Genuine dark mode inversion across every token, surface, input boundary, and focus indicator

---

## 2. Color Palette & Roles

All tokens live in `app/globals.css` as CSS custom properties and map to Tailwind via `@theme inline`.

### Page Foundation (Light)

- **Warm Parchment Canvas** (`#f6f2ea`) — `--background`. Primary page canvas.
- **Antiqued Near-White** (`#fbfaf7`) — `--card`. Card and panel base surface.
- **Porcelain White** (`#fdfcf9`) — `--popover`. Lightest overlay base.

### Primary Brand Color (Light)

- **Deep Ink Navy** (`#1e3a4f`) — `--primary`. Primary interactive actions, numbered step discs, active controls, and eyebrows.
- **Near-White Cloud** (`#f7fbff`) — `--primary-foreground`. Text on primary surfaces.

### Secondary & Accent (Light)

- **Pale Sky Wash** (`#e6f1f9`) — `--secondary`. Icon tiles, in-development AI step inset tint, and subtle hover surfaces.
- **Sage Green Mist** (`#e8efe2`) — `--accent`. Grounding organic sage for shipped-code status checks and section washes.

### Text Hierarchy (Light)

- **Deep Ink Charcoal** (`#16212b`) — `--foreground`. Primary headings and body emphasis.
- **Slate Muted Gray** (`#54636f`) — `--muted-foreground`. Supporting prose, metadata, and captions (≥ `5.4:1` on parchment and cards).

### Surface & Accessible Control Boundaries (Light)

- **Muted Blue-Gray** (`#ecf1f3`) — `--muted`. Subtle nav hover backgrounds.
- **Ghost Ink Border** (`rgb(22 33 43 / 12%)`) — `--border`. Hairlines for containers, rails, and structural dividers.
- **Accessible Input Border** (`rgb(22 33 43 / 50%)`) — `--input`. Form field boundaries (≥ `3.1:1` non-text contrast on both `--card` and `--background`, satisfying WCAG 1.4.11).
- **Deep Steel Ring** (`#235d85`) — `--ring`. Keyboard `:focus-visible` outlines and rings (≥ `6.3:1` on parchment, ≥ `4.0:1` at 80% opacity).
- **Crimson Alert** (`#c03d2c`) — `--destructive`. Inline field errors and alert banners.

### Dark Mode Equivalents

All dark mode values live under `.dark` in `app/globals.css`:

| Role | Light | Dark |
| --- | --- | --- |
| Page background | `#f6f2ea` — Warm Parchment Canvas | `#0d141a` — **Near-Black Deep Ocean** |
| Card surface | `#fbfaf7` — Antiqued Near-White | `#111b23` — **Dark Ink Card** |
| Primary accent | `#1e3a4f` — Deep Ink Navy | `#dbeaf7` — **Pale Ice Blue** |
| Secondary | `#e6f1f9` — Pale Sky Wash | `#1a2c39` — **Dark Steel Teal** |
| Accent | `#e8efe2` — Sage Green Mist | `#223127` — **Dark Forest Moss** |
| Foreground text | `#16212b` — Deep Ink Charcoal | `#edf3f7` — **Near-White Vapor** |
| Muted text | `#54636f` — Slate Muted Gray | `#b6c3cb` — **Cool Light Gray** |
| Input border | `rgb(22 33 43 / 50%)` (`3.17:1`) | `rgb(243 246 248 / 38%)` (`3.37:1`) |
| Focus ring | `#235d85` (`6.32:1`) | `#78aed3` — **Ice Steel Blue** (`7.77:1`) |
| Destructive | `#c03d2c` — Crimson Alert | `#ff8d79` — **Coral Peach Alert** |

### Atmospheric Gradients & Section Washes

- **Architectural Grid** (`--grid-stroke`): `rgb(22 33 43 / 5.5%)` light, `rgb(237 243 247 / 6.5%)` dark, 120px grid masked radially at `opacity: 0.72`.
- **Ambient Glows:** Pure radial gradients using `--glow-primary` and `--glow-accent` (no `filter: blur(40px)`).
- **Section Washes:** `.section-wash-sky` (`--wash-sky`) on `Why connected` and `.section-wash-accent` (`--wash-accent`) on `About`.

---

## 3. Typography Rules

### Font Stack

| Role | Family | Source | CSS Variable (`<html>` + `@theme inline`) | Utility |
| --- | --- | --- | --- | --- |
| **Headings** | Plus Jakarta Sans | `next/font/google` | `--font-plus-jakarta` -> `--font-heading` | `font-heading` |
| **Body** | Inter | `next/font/google` | `--font-inter` -> `--font-sans` | `font-sans` |
| **Labels / Eyebrows / Actors** | JetBrains Mono | `next/font/google` | `--font-jetbrains-mono` -> `--font-mono` | `font-mono` |

Font `.variable` classes MUST sit on `<html>` in `app/layout.tsx` and map directly in `@theme inline` (`app/globals.css`) so custom properties resolve cleanly across all descendants. `app/opengraph-image.tsx` loads bundled Plus Jakarta Sans TTFs (`lib/fonts/`) for server-rendered social cards.

### Scale & Usage

| Element | Size | Weight | Tracking | Line Height | Notes |
| --- | --- | --- | --- | --- | --- |
| **Hero H1** | `clamp(2.35rem, 5.6vw, 4.35rem)` | 600 | `-0.045em` | `1.02` | Two block-level sentences at all widths; second sentence `text-muted-foreground` |
| **Section H2** | `clamp(1.95rem, 3.6vw, 3.05rem)` | 600 | `-0.045em` | `1.04` | `SectionTitle`; `text-balance` |
| **Document H1** | `clamp(2.8rem, 5.5vw, 4.6rem)` | 600 | `-0.055em` | `0.96` | Privacy, Terms, Statement of Faith |
| **Workflow / Panel H3** | `text-xl` / `text-2xl` | 600 | `-0.04em` | default | Step titles, status headings |
| **Principle H3** | `text-lg` | 600 | `-0.04em` | default | Hairline-divided principles strip |
| **Body paragraph** | `text-base` / `sm:text-lg` | 400 | default | `leading-7` / `leading-8` | Max width `42rem` (≤ `72ch`) |
| **Eyebrow / Actor label** | `text-xs` (`12px`) | 400–500 | `0.14em`–`0.24em` | default | JetBrains Mono uppercase; `text-primary/80` (`>= 5.9:1` light) |
| **Brand wordmark** | `text-lg` | 600 | `-0.04em` | `none` | Plus Jakarta Sans, lowercase `asym`, `translate="no"` |

**Minimum size:** Interface text is never smaller than `12px` (`text-xs`). Negative tracking on headings (`-0.04em` to `-0.055em`) is a core identity signal. Normal prose keeps `hyphens: none`, `overflow-wrap: normal`, and `word-break: normal`.

---

## 4. Component Stylings

### Buttons

All buttons are fully pill-shaped (`rounded-full`) via `components/ui/button-variants.ts`:

- **Motion:** `transition-[color,background-color,border-color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)]` with tactile `active:scale-[0.97]`. Never transition `box-shadow` so focus rings snap instantly.
- **Focus:** `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background`.
- **Touch targets:** `min-h-11` (`44px`) on mobile for default and `lg` buttons; `touch-action: manipulation` on all interactive controls.
- **Variants:** Primary (`bg-primary text-primary-foreground`), Outline (`border-foreground/22 bg-background/80`), Secondary (`bg-secondary`), Ghost, Destructive.

### Elevation & Surface Hierarchy

- **`surface-card`**: `border: 1px solid var(--border)`, `color-mix(in srgb, var(--card) 86%, transparent)`, `box-shadow: var(--shadow-card)`. No backdrop blur.
- **`surface-panel`**: Frosted panel with `backdrop-filter: blur(14px)` (used for the unified connected workflow sequence and the `Asymmetric-al/core` repository panel).
- **`surface-hero`**: Highest elevation frosted panel with `backdrop-filter: blur(16px)` and `page-shell-glow` (`blur(12px)` halo), used for the Early Access section.
- **Hover lift (`.surface-interactive`):** Gated inside `@media (hover: hover) and (pointer: fine)` so touch devices never get sticky hover states.

### Navigation (Header & Mobile Section Links)

- **Floating pill header (`components/header.tsx`):** Fixed with safe-area inset padding (`env(safe-area-inset-top/left/right)`), `max-w-[80rem]`, `rounded-full`, `bg-background/90 backdrop-blur-md`.
  - Left: `SiteLogoMark` (`priority={false}` to avoid preloading inactive dark/light artwork) + lowercase `asym` (`min-h-11` on mobile).
  - Center (`md+`): `nav[aria-label="Main"]` with Product, Open source, About (`/#product`, `/#open-source`, `/#about`).
  - Right: Primary pill button to `/#early-access` (`min-h-11` on mobile).
- **Mobile quick-jump navigation (`components/site/home/hero.tsx`):** Below `md`, a clean hairline-separated `<nav aria-label="On this page">` directly below the Hero CTAs provides 1-tap `44px`-tall jump links to Product, Open source, and About without adding a JS drawer.

### Homepage Section Patterns (`components/site/home/`)

Order: Hero -> Product (`#product`) -> Why connected -> Open source (`#open-source`) -> About (`#about`) -> Early access (`#early-access`).

1. **Hero:** Left-aligned editorial hero with two status pills ("Open-source software for nonprofits", "Launching soon"), two block-level headline lines (ink + muted), concise supporting paragraph (`max-w-[42rem]`), primary + GitHub actions, audience note ("Starting with missions organizations."), and mobile quick-jump links.
2. **Connected Workflow (`#product`):** One unified `surface-panel` containing:
   - Continuous horizontal connector rail (`lg+`) and compact vertical timeline (`< sm`) through steps 1–4 (`Describe`, `Prepare`, `Review`, `Follow through`).
   - Step 2 (`Prepare · AI`) uses a dashed border and `bg-secondary/45` inset with an outlined dashed disc so the AI / `In development` step reads distinctly at a glance.
   - Shared `"One shared record"` baseline (`Campaign -> Gift -> Receipt -> Donor history`) plus one plainly labeled plain-text illustrative example (no fake UI or sample orgs).
3. **Why connected (`.section-wash-sky`):** Two-column explanation followed by a JetBrains Mono `"How we’re building it"` label and a **hairline-divided 3-column editorial strip** (`lg:grid-cols-3`, `divide-y lg:divide-x`) — avoiding card monotony and narrow tablet columns.
4. **Open source (`#open-source`):** Two-column layout pairing AGPL explanation + dashed `"Managed donor care"` (`Planned`) callout on the left with the `surface-panel` `Asymmetric-al/core` repository card (dated, rounded-down stats + `"In the public code"` vs `"In development"` inventory) on the right.
5. **About (`.section-wash-accent`):** Two-column founder & missions context with the left-ruled `"The ordinary work comes first"` list.
6. **Early access (`#early-access`):** `surface-hero page-shell-glow` panel. Server-aware:
   - When `RESEND_API_KEY`, `CONTACT_INBOX_EMAIL`, and `CONTACT_FROM_EMAIL` are configured: renders `<EarlyAccessForm method="post" action="/api/early-access" />` (progressive enhancement with PRG `303` fallback, WCAG ≥ `3.1:1` input borders, explicit focus rings on every link, `spellCheck={false}` & `autoCapitalize="none"` on email, reconciled consent copy, distinct `422`/`429`/`502`/`503` handling, entry preservation on failure, and focus-managed `"Request received"` confirmation on `200`).
   - When delivery is not yet configured: discloses upfront (`Opening soon`) without trapping visitors in a broken form and offers verified GitHub links (`Asymmetric-al/core` and `Asymmetric-al/core/issues`).

### Footer & Theme Toggle

- **Footer (`components/footer.tsx`):** Quiet hairline-separated footer (`max-w-[82rem]`). All links meet `min-h-11` on mobile (`sm:min-h-9` desktop). Only displays `mailto:` when `NEXT_PUBLIC_CONTACT_EMAIL` is explicitly verified; otherwise links to `Asymmetric-al/core/issues`.
- **Segmented Theme Control (`components/theme-toggle.tsx`):** Zero-Floating-UI 3-button `role="group"` (`Light`, `Dark`, `System`) with `aria-pressed` state, `min-h-11 sm:min-h-8`, instant switching, and zero popup occlusion.

---

## 5. Layout, Accessibility & Motion Principles

- **Containers:** `max-w-[82rem]` (`Container`), `max-w-[80rem]` (floating Header), `max-w-[42rem]` for body paragraphs.
- **Overflow & Viewport:** `min-h-dvh` on root shell; `overflow-x: clip` (never `hidden` on `html`/`body`).
- **Focus Visibility:** Global safe default `:is(a, button, input, textarea):focus-visible { outline: 2px solid var(--ring); outline-offset: 2px; }` guarantees no interactive element can ever lose focus visibility.
- **Scrolling:** Native browser scrolling with `scroll-padding-top: 7rem` and `@media (prefers-reduced-motion: no-preference) { html { scroll-behavior: smooth; } }`. No JavaScript scroll hijacking (no Lenis).
- **Purposeful Motion:**
  - Micro-interactions: `150ms–160ms cubic-bezier(0.23, 1, 0.32, 1)` on color/border/transform only (`active:scale-[0.97]`).
  - Workflow reveal (`WorkflowReveal`): one-time `IntersectionObserver` reveal only when starting below the fold — connector rail draws via `clip-path: inset(0 100% 0 0)` -> `inset(0 0 0 0)` (`420ms`), steps rise `8px` (`260ms`, `45ms` stagger). Instant and static when `prefers-reduced-motion: reduce` is set or JS is absent.

---

## 6. Do Not

- Do not use pure white (`#ffffff`) or pure black (`#000000`) for surfaces or text.
- Do not use `outline: none` globally without a visible `:focus-visible` indicator of ≥ `3:1` contrast.
- Do not animate `box-shadow` on focusable controls or use `filter: blur()` ≥ `20px` on full-viewport fixed layers.
- Do not add JavaScript scroll hijacking or perpetual `requestAnimationFrame` loops on static pages.
- Do not draw mock product interfaces (app windows, dashboards, sample organizations or donors, invented numbers).
- Do not present planned or in-development capabilities as available, or advertise unverified/non-MX email addresses as live contact channels.
- Do not allow public legal pages, sitemaps, manifests, or legacy routes to portray Asymmetric.al as a nonprofit ministry or Global Fellowship Inc. project.
