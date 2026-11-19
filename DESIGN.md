# Design System: Asymmetric.al

**Project:** asym product-marketing site (asym.app), built by Asymmetric.al  
**Stack:** Next.js 16 · Tailwind v4 · shadcn/ui `base-maia` · Native CSS transitions & `IntersectionObserver` progressive rail reveal  
**Source of truth for tokens:** `app/globals.css` · `lib/config.ts`  
**No Stitch project ID** — this document was synthesized directly from the codebase and running UI.

---

## 1. Visual Theme & Atmosphere

asym.app is a prelaunch product website for Asymmetric.al, a for-profit company serving nonprofits, starting with missions organizations. The aesthetic is **calm, product-led editorial minimalism**: a warm parchment canvas, near-black ink text, one restrained navy accent, and generous breathing room. Every surface choice makes the product easier to understand and feel trustworthy, never louder.

**The site is informational.** Explain the product in words and honest structure (connected steps, who does what, shared records, what is built, and what is in development). Do not draw mock app screens, fake dashboards, sample organizations, or invented metrics. Show real product visuals only when they come from the actual product and are labeled honestly.

The dominant feel is **warm-muted luminosity**: a lightly antiqued parchment canvas (`background-color: var(--background)`) paired with top-anchored atmospheric radial glows of steely blue and sage green (`body::after`, fading seamlessly into `--background`) and a top-anchored 120 px architectural grid (`body::before`, no fixed full-viewport background repaints) so scrolling and theme switching stay well inside the mobile frame budget.

Surfaces are **layered with clear structural intent**:

- Solid hairline borders represent shipped foundation and verified structure.
- Dashed hairline borders (`border-dashed`) distinguish in-development AI workflow steps (`bg-secondary/50`) and planned future services (`bg-card/70`) at a glance.
- Seamless alternating section washes (`.section-wash-sky`, `.section-wash-accent`, fading in from `transparent 0%` to peak at `7rem` and back to `transparent 96%`) create gentle vertical cadence without hard horizontal seams.
- `backdrop-filter: blur` (`backdrop-blur-md`) is reserved strictly for the floating fixed Header; static below-fold panels (`.surface-panel`, `.surface-hero`) use high-opacity tinted fills to eliminate expensive mobile repaint cost on theme toggle.

A subtle **120 px architectural ink grid** (`--grid-stroke`) overlays the background behind content, masked radially toward the upper center.

The tone is direct, warm, and confident. Use concrete work (a gift, a receipt, a donor record) instead of slogans, keep paragraphs short, avoid em dashes in copy, and label status plainly ("Launching soon", "In development", "Planned", "Opening soon"). The product name is written lowercase: **asym**. The company is **Asymmetric.al**.

---

## 2. Color Palette & Roles

All tokens live in `app/globals.css` as CSS custom properties and map to Tailwind via `@theme inline`.

### Light & Dark Token Matrix

| Role | Light | Dark | Contrast / Usage Notes |
| --- | --- | --- | --- |
| Page background (`--background`) | `#f6f2ea` — Warm Parchment Canvas | `#0d141a` — **Near-Black Deep Ocean** | Never pure `#ffffff` or `#000000` |
| Card surface (`--card`) | `#fbfaf7` — Antiqued Near-White | `#111b23` — **Dark Ink Card** | Subtle stratification over canvas |
| Primary accent (`--primary`) | `#1e3a4f` — Deep Ink Navy | `#dbeaf7` — **Pale Ice Blue** | Primary CTAs, numbered discs, active pill |
| Secondary (`--secondary`) | `#e6f1f9` — Pale Sky Wash | `#1a2c39` — **Dark Steel Teal** | Icon tiles, AI workflow inset (`bg-secondary/50`) |
| Accent (`--accent`) | `#e8efe2` — Sage Green Mist | `#223127` — **Dark Forest Moss** | Shipped-code check icons, About wash |
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
| **Labels / Eyebrows / Actors** | JetBrains Mono | `next/font/google` | `--font-jetbrains-mono` -> `--font-mono` | `font-mono` |

Font `.variable` classes MUST sit on `<html>` in `app/layout.tsx`, and element base rules in `app/globals.css` MUST sit inside `@layer base` so Tailwind v4 utility classes (`tracking-[...]`, `focus-visible:*`) win cleanly. `app/opengraph-image.tsx` loads bundled Plus Jakarta Sans TTFs (`lib/fonts/`) for server-rendered social cards.

### Optical Tracking, Word Spacing & Scale

Tight negative tracking scales optically with heading size, paired with **`word-spacing: 0.05em`** on the base heading rule (`h1–h6`) so Plus Jakarta Sans semibold preserves crisp word separation even under tight letter-spacing:

| Element | Size | Weight | Tracking | Line Height | Notes |
| --- | --- | --- | --- | --- | --- |
| **Hero H1** | `clamp(2.35rem, 5.6vw, 4.35rem)` | 600 | `-0.03em` (`sm:` `-0.045em`) | `1.02` | Two block-level sentences at all widths; second sentence `text-muted-foreground` |
| **Section H2 / Document H1** | `clamp(1.95rem, 3.6vw, 3.05rem)` / `clamp(2.8rem, 5.5vw, 4.6rem)` | 600 | `-0.04em` | `1.04` / `0.98` | `SectionTitle` / Legal pages; `text-balance` |
| **Panel H3 / Document H2** | `text-2xl` (`24px`) / `clamp(1.5rem, 2.4vw, 2rem)` | 600 | `-0.025em` | default | Early access status, Request received, Legal section H2 |
| **Workflow / Principle H3** | `text-xl` (`20px`) / `text-lg` (`18px`) | 600 | `-0.015em` | default | Crisp word spacing ("Follow through", "Shared records") |
| **Card Sub-label H3** | `text-sm` (`14px`) | 500 | `0` (`tracking-normal`) | default | Rendered in Inter (`font-sans`, e.g. "Where things stand") |
| **Body paragraph** | `text-base` / `sm:text-lg` | 400 | default | `leading-7` / `leading-8` | Max width `42rem` (≤ `72ch`); principles capped at `60ch` |
| **Eyebrow / Actor label / StatusPill** | `text-xs` (`12px`) | 400–500 | `0.14em`–`0.24em` | default | JetBrains Mono uppercase (`StatusPill` unified across Hero, Workflow, Open source, Early access); `text-primary/80` (`>= 5.9:1` light) |
| **Brand wordmark** | `text-lg` | 600 | `-0.03em` | `none` | Plus Jakarta Sans, lowercase `asym`, `translate="no"` |

**Minimum size:** Interface text is never smaller than `12px` (`text-xs`). Normal prose keeps `hyphens: none`, `overflow-wrap: normal`, and `word-break: normal`.

---

## 4. Component Stylings

### Buttons & Inputs

- All buttons are fully pill-shaped (`rounded-full`) via `components/ui/button-variants.ts`, with `transition-[color,background-color,border-color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)]` and `active:scale-[0.97]`.
- Outline buttons use `border-input` (`>= 3.17:1` light / `3.37:1` dark, WCAG 1.4.11) on `bg-background/85`.
- Focus indicators across buttons, links, inputs, and theme controls use `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-background focus-visible:outline-2 focus-visible:outline-transparent` so rings stay high-contrast in dark mode (no `#fff` halo) AND remain visible in Windows Forced Colors Mode (`forced-colors: active`).
- Touch targets meet `min-h-11` (`44px`) on mobile and `>= 24px` natively everywhere, with `touch-action: manipulation`.

### Navigation, Brand Mark & Footer

- **Floating Header (`components/header.tsx`):** Fixed pill (`backdrop-blur-md bg-background/92`) with safe-area padding preserved across both portrait and landscape breakpoints (`pl-[max(0.75rem,env(safe-area-inset-left))] sm:pl-[max(1rem,env(safe-area-inset-left))]`, and matching right/top insets).
- **`SiteLogoMark` (`components/site/site-logo-mark.tsx`):** Explicit intrinsic `width`/`height` (`size={28}` in header, `size={20}` in footer; `priority={false}` and default `loading` so Next.js never hoists dual `<head>` preloads for inactive theme artwork).
- **Mobile quick-jump navigation (`components/site/home/hero.tsx`):** Hairline-separated `<nav aria-label="On this page">` directly beneath Hero CTAs below `md`.
- **Footer (`components/footer.tsx`) & Segmented Theme Control (`components/theme-toggle.tsx`):** Quiet hairline-separated footer; `ThemeToggle` is a compact `w-fit self-start` 3-button `role="group"` (`Light`, `Dark`, `System`) with `aria-pressed`, paired with `ThemeProvider disableTransitionOnChange` for crisp, simultaneous theme switching without staggered link/button fades.

### Homepage Section Patterns (`components/site/home/`)

Order: Hero -> Product (`#product`) -> Why connected -> Open source (`#open-source`) -> About (`#about`) -> Early access (`#early-access`). All containers import the pure server-only `Container` from `components/site/container.tsx` (zero `motion/react` shipped on marketing routes), and legal `DocumentPage` routes share the exact same `Container` left margin.

1. **Connected Workflow (`#product`):** Unified `surface-panel` with horizontal desktop rail (`lg+`), continuous per-step mobile vertical rail segments terminating cleanly on step 4 (`< sm`), flush-aligned `sm:-mx-5` 2×2 tablet grid, dashed sky inset (`bg-secondary/50`) on step 2 (`Prepare · AI`), `"One shared record"` chain (`Campaign -> Gift -> Receipt -> Donor history`, leading arrows grouped with each following pill), and one plainly labeled plain-text example.
2. **Why connected (`.section-wash-sky`):** Two-column narrative + JetBrains Mono `"How we’re building it"` eyebrow + hairline-divided 3-column strip (`lg:grid-cols-3`, uniform `py-6 lg:py-7`, `max-w-[60ch]` descriptions).
3. **Open source (`#open-source`):** AGPL explanation + dashed `"Managed donor care"` (`Planned`) callout + `Asymmetric-al/core` `surface-panel` (`4,900+ commits`, `590+ merged pull requests`, unbroken `AGPL-3.0-only`, `"In the public code"` vs `"In development"`).
4. **About (`.section-wash-accent`):** Two-column founder & missions context + left-ruled `"The ordinary work comes first"` list.
5. **Early access (`#early-access`):** Server-aware `surface-hero page-shell-glow` panel (requires outbound Resend credentials **and** verified private `NEXT_PUBLIC_CONTACT_EMAIL` before opening):
   - Configured: progressive-enhancement `<EarlyAccessForm method="post" action="/api/early-access" />` (native HTML5 validation pre-hydration, inline accessible validation post-hydration, width-stable submit button, `resize-none` auto-growing textarea, subtle `.surface-enter` confirmation card, streamed 16 KB cap on JSON & URL-encoded posts, per-IP rate limit with dynamic `Retry-After` guidance, and same-origin relative `303` PRG redirect to server-rendered `/early-access/status` for no-JS submissions).
   - Unconfigured: honest `"Opening soon"` panel with verified GitHub links (`Follow on GitHub` and `Public product questions`). Private/privacy inquiries are never routed to public GitHub Issues.

---

## 5. Scrolling & Purposeful Motion

- **Scrolling:** Native browser scrolling with a single `scroll-padding-top: 5.5rem` on `html` (no stacked `scroll-mt-*` on sections) and `@media (prefers-reduced-motion: no-preference) { html { scroll-behavior: smooth; } }`. No JavaScript scroll hijacking.
- **Workflow reveal (`WorkflowReveal`):** One-time `IntersectionObserver` (`{ threshold: 0.01, rootMargin: "0px" }`) animates the horizontal desktop rail (`clip-path`) and a subtle 5px step settle with uneven choreographed delays (`0 / 40 / 70 / 95ms`), while mobile vertical rails stay crisp and static. **Step text always stays `opacity: 1`** so full-page captures, print/PDF (`@media print`), and non-JS loads never lose content. All animations, transforms, and clip-paths disable under `prefers-reduced-motion: reduce`.

---

## 6. Do Not

- Do not use pure white (`#ffffff`) or pure black (`#000000`) for surfaces, text, or focus ring offsets.
- Do not place global element rules outside `@layer base` where they override Tailwind v4 `@layer utilities`.
- Do not use `outline-none` on focusable controls without a Forced-Colors-safe transparent outline (`outline-2 outline-transparent`).
- Do not hide core product copy at `opacity: 0` behind scroll-triggered reveals without print/capture safety.
- Do not apply `backdrop-filter: blur` to large static below-fold containers or animate `box-shadow` on focusable controls.
- Do not draw mock product interfaces, invent metrics/customers, route private privacy requests to public issue trackers, or portray Asymmetric.al as a nonprofit ministry.
