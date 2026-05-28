# Design System: Asymmetric.al

**Project:** Asymmetric.al — Mission Operating System marketing site  
**Stack:** Next.js 16 · Tailwind v4 · shadcn/ui `base-maia` · `@base-ui/react` · `motion/react` · `experimental.viewTransition` enabled in `next.config.ts` for cross-route transitions where supported  
**Source of truth for tokens:** `app/globals.css` · `lib/config.ts`  
**No Stitch project ID** — this document was synthesized directly from the codebase and running UI.

---

## 1. Visual Theme & Atmosphere

Asymmetric.al carries the visual gravity of a quiet, mission-focused institution — not a startup, not a consumer product. The aesthetic is **serene editorial minimalism** with deliberate spiritual weight. Every surface choice reinforces calm, trust, and conviction.

The dominant feel is **warm-muted luminosity**: a lightly antiqued parchment background suffused with soft radial glows of steely blue and sage green that emanate from fixed ambient light sources behind the page shell. The body gradient transitions from near-white at the top to a cooled bone tone at the bottom, making the page feel like it is lit from above.

Surfaces are **translucent and layered**: cards, panels, and the navigation bar use semi-transparent frosted glass treatments (`backdrop-filter: blur`) that hint at depth without the visual noise of hard shadows. Depth is achieved through stacked translucency, not through heavy drop shadows.

A faint **120 px architectural grid** overlays the entire background at 20% opacity, masked to a radial fade toward the edges. This is a subtle structural signal — the site is built with precision.

The interface is **typographically restrained but not minimal to the point of emptiness**. Generous section spacing, tight negative tracking on headings, and a purposeful hierarchy between display, body, and mono-label type creates a strong editorial voice.

The tone is aspirational, nonprofit-serious, and theologically grounded — language like "Soli Deo Gloria", "Great Commission", and "stewardship" coexist with engineering language like "observability", "tenant sovereignty", and "audit-grade trust". The design system must hold both registers simultaneously.

**Key Characteristics:**
- Warm, slightly antiqued neutral foundation — never pure white, never cold gray
- Atmospheric ambient glow from two fixed radial light sources (steel blue at top, sage at left)
- Frosted-glass surface hierarchy with three tiers: `surface-card`, `surface-panel`, `surface-hero`
- Deep negative letter-tracking on all headings creates compressed, confident typographic presence
- Pill-shaped interactive elements (buttons, badges, nav items, inputs) throughout
- Purposeful use of monospace type as an "eyebrow" label system for section framing
- Scroll-triggered reveal animations with natural cubic easing; reduced-motion respected throughout
- Dark mode is a genuine inversion, not an afterthought — all surfaces and glows have dark counterparts

---

## 2. Color Palette & Roles

All tokens are defined in `app/globals.css` as CSS custom properties and mapped to Tailwind via `@theme inline`.

### Page Foundation

- **Warm Parchment Canvas** (`#f6f2ea`) — `--background` (light). Primary page background. Warm antique off-white with a slight cream-yellow cast. Feels organic, not clinical.
- **Antiqued Near-White** (`#fbfaf7`) — `--card` (light). Card/surface base. Slightly cooler than the canvas, creating subtle visual stratification.
- **Porcelain White** (`#fdfcf9`) — `--popover` (light). Popover/tooltip base; the lightest surface.

### Primary Brand Color

- **Deep Ink Navy** (`#1e3a4f`) — `--primary` (light). The primary accent for interactive elements, CTAs, section tones, and the "ink" section variant. A deep, slightly desaturated navy with a naval blue-green cast. Not pure blue — deliberately muted and institutional.
- **Near-White Cloud** (`#f7fbff`) — `--primary-foreground` (light). Text on primary surfaces.

### Secondary & Accent

- **Pale Sky Wash** (`#e6f1f9`) — `--secondary` (light). Used for hover states, active nav pill backgrounds, and muted secondary surfaces. A very light blue-gray tint.
- **Sage Green Mist** (`#e8efe2`) — `--accent` (light). Used for `section-wash-accent` backgrounds and icon containers in capabilities cards. A whisper of organic sage green — grounding and natural.

### Text Hierarchy

- **Deep Ink Charcoal** (`#16212b`) — `--foreground` (light). Primary text on page backgrounds. A very dark blue-charcoal, not pure black. Softer than #000 while retaining strong contrast.
- **Slate Muted Gray** (`#5a6975`) — `--muted-foreground` (light). Body copy, card descriptions, supporting metadata, and placeholder text. A cool mid-gray that recedes without disappearing.

### Surface & Utility

- **Muted Blue-Gray** (`#ecf1f3`) — `--muted` (light). Background for muted areas, hover states on ghost buttons.
- **Ghost Ink Border** (`rgb(22 33 43 / 0.11)`) — `--border` (light). Border on cards, panels, nav, badges, and dividers. Extremely subtle — a faint translucent trace of the ink foreground.
- **Ghost Ink Input Fill** (`rgb(22 33 43 / 0.08)`) — `--input` (light). Background for text inputs in their default state.
- **Steel Ring Blue** (`#76abcf`) — `--ring` (light). Focus ring color — a medium desaturated blue. Used for keyboard focus outlines (`ring-ring/45`) and text selections.
- **Frame Canvas** (`#fbfaf7`) — `--frame` (light). The very outermost frame/shell background, matching the card base.

### Semantic / Functional States

- **Crimson Alert** (`#c94837`) — `--destructive` (light). Error states, destructive action buttons. A brick-red with orange warmth, not a harsh pure red.

### Dark Mode Equivalents

All dark mode values are defined under `.dark` in `globals.css`:

| Role | Light | Dark |
|---|---|---|
| Page background | `#f6f2ea` | `#0d141a` — **Near-Black Deep Ocean** |
| Card surface | `#fbfaf7` | `#111b23` — **Dark Ink Card** |
| Primary accent | `#1e3a4f` | `#dbeaf7` — **Pale Ice Blue** (inverted to light on dark) |
| Secondary | `#e6f1f9` | `#1a2c39` — **Dark Steel Teal** |
| Accent | `#e8efe2` | `#223127` — **Dark Forest Moss** |
| Foreground text | `#16212b` | `#edf3f7` — **Near-White Vapor** |
| Muted text | `#5a6975` | `#b6c3cb` — **Cool Light Gray** |
| Destructive | `#c94837` | `#ff8d79` — **Coral Peach Alert** |
| Ring/focus | `#76abcf` | `#78aed3` — **Ice Steel Blue** |

### Ambient Glow Colors (Atmospheric, not interactive)

- **Steel Glow Primary** (`rgb(118 171 207 / 0.18)`) — `--glow-primary`. The top-of-page ambient radial glow (steel blue-sky). Also used in the left-edge accent blur in the layout shell.
- **Sage Glow Accent** (`rgb(180 198 166 / 0.18)`) — `--glow-accent`. The bottom-right ambient glow (sage green-earth). Appears behind page content at low opacity.

### Section Wash Gradients

- **Sky Wash** — `--wash-sky`. A top-anchored gradient from `rgb(230 241 249 / 0.74)` (pale blue) fading to transparent. Applied to sections via `.section-wash-sky`.
- **Accent Wash** — `--wash-accent`. A top-anchored gradient from `rgb(232 239 226 / 0.72)` (pale sage) fading to transparent. Applied to sections via `.section-wash-accent`.

---

## 3. Typography Rules

### Font Stack

| Role | Family | CSS Variable | Tailwind Utility |
|---|---|---|---|
| **Headings** | Plus Jakarta Sans | `--font-heading` | `font-heading` |
| **Body** | Inter | `--font-sans` | `font-sans` (default) |
| **Labels / Eyebrows / Mono accents** | JetBrains Mono | `--font-mono` | `font-mono` |

All three are loaded via `next/font/google` with `display: "swap"`. Google Fonts — no self-hosted assets.

### Typographic Character

**Headings (Plus Jakarta Sans):** Geometric sans-serif with humanist warmth. Used with extreme negative tracking (`-0.04em` to `-0.08em`) for a compressed, architectural feel. All `h1`–`h6` receive `tracking-[-0.04em]` globally, then individual overrides tighten further.

**Body (Inter):** Clean, neutral, highly legible sans-serif. Used at base `line-height: 1.5` on the body and `leading-7` (1.75) for paragraph text — generous leading that supports comfortable reading of mission/platform content.

**Mono (JetBrains Mono):** Used exclusively for labeling, not for code. The `.eyebrow` class sets `0.72rem`, `letter-spacing: 0.28em`, `text-transform: uppercase`. This creates a distinctive "signal from the build" stamp aesthetic for section headers.

### Scale & Usage

| Element | Size | Weight | Tracking | Line Height | Notes |
|---|---|---|---|---|---|
| **Hero H1** | `clamp(3.2rem, 7vw, 6rem)` | 600 (semibold) | `-0.07em` | `0.92` | Plus Jakarta Sans; very tight, display-grade |
| **Hero subtitle** | `clamp(1.15rem, 2.2vw, 1.6rem)` | 500 (medium) | `-0.04em` | default | Supporting deck below H1 |
| **Section H2** | `clamp(2.1rem, 4vw, 3.35rem)` | 600 | `-0.06em` | `1.02` | `SectionHeader` component; `text-balance` |
| **Footer CTA H2** | `clamp(2.35rem, 5vw, 4.6rem)` | 600 | `-0.06em` | `0.95` | Large, tight; marketing impact |
| **Card H2 (Forms)** | `text-3xl` / `text-4xl` | 600 | `-0.05em` | default | Inside `surface-panel` |
| **Card H3 / CardTitle** | `text-2xl` | 600 | `-0.05em` | default | Foundation cards, platform tabs |
| **Capabilities CardTitle** | `text-xl` | 600 | `-0.04em` | default | Smaller cap grid cards |
| **Body paragraph** | `text-base` / `sm:text-lg` | 400 | default | `leading-7` | `.content-measure` max-width `72ch`, with normal word wrapping and no auto-hyphenation |
| **Small body / card body** | `text-sm` | 400 | default | `leading-7` | Inside cards, descriptions |
| **Eyebrow label** | `0.72rem` | 400–500 | `0.28em` | default | `.eyebrow` / `font-mono`; always uppercase |
| **Meta pill text** | `0.72rem` | 400 | `0.22em` | default | Pill badges in hero meta row |
| **Brand wordmark** | `1.02rem` | 600 | `-0.04em` | `none` | Plus Jakarta Sans in nav |
| **Legal body** | `text-sm` | 400 | default | `leading-7` | Legal pages; `.surface-panel` density |

### Key Typographic Rules

- **Negative tracking on all headings is non-negotiable.** The compressed feel is a core identity signal. Even `h3` and `h4` receive at minimum `-0.04em`.
- **`text-balance`** is applied globally to all headings via CSS, and explicitly to `h2`-level section headers via the `SectionHeader` component.
- **Eyebrow labels always use JetBrains Mono**, all-caps, wide tracking (≥ `0.22em`), and are positioned above section H2s as contextual framing. They use `text-primary/70` (70% opacity of the primary color) for subtle hierarchy.
- **Body text never exceeds `72ch` in measure** via `.content-measure` — a content width constraint applied to description paragraphs. Normal prose uses `overflow-wrap: normal`, `word-break: normal`, and `hyphens: none`; aggressive breaking is reserved for explicit long-token utilities.
- **`text-wrap: pretty`** is available as a utility class for multi-line text that needs softer line breaks.

---

## 4. Component Stylings

### Buttons

All buttons use `rounded-full` (fully pill-shaped). This is a defining trait of the interface — no rectangular or subtly-rounded buttons exist.

**Base styles (all variants):**
- Pill shape: `rounded-full`
- Transitions: `color, background-color, border-color, box-shadow, transform` at `200ms ease-out`
- Focus: `focus-visible:ring-[3px] focus-visible:ring-ring/45` with `focus-visible:border-ring`
- Active: `active:scale-[0.985]` — a micro-press tactile confirmation
- Disabled: `disabled:opacity-50 disabled:pointer-events-none`
- Icon placement: `data-icon="inline-end"` or `data-icon="inline-start"` adjusts padding for icon-containing buttons

**Primary (default):** Deep Ink Navy (`#1e3a4f`) fill, Near-White Cloud text. Deep underside shadow `0 18px 44px -28px rgba(30,58,79,0.78)`. Hover: `bg-primary/88` (8% transparency on the fill). Used for the primary CTA "Join Waitlist".

**Outline:** Ghost background (`bg-background/72`), `border-border`, foreground text. Hover: `hover:bg-secondary/68` (Pale Sky Wash). Used for "Request a Call" CTAs alongside primary.

**Secondary:** Pale Sky Wash (`#e6f1f9`) background, Deep Ink Navy text. Hover: `bg-secondary/84`. Used inside ink/primary-background sections where a reversed hierarchy is needed.

**Ghost:** No background, no border. Hover: `hover:bg-muted`. Used for ancillary navigation-adjacent actions like "Request a Call" in the desktop nav bar.

**Destructive:** Crimson Alert (`#c94837`) fill with a red-toned shadow. Used for delete/remove actions.

**Sizes:**
- `xs`: `min-h-7 px-2.5`
- `sm`: `min-h-9 px-3.5`
- `default`: `min-h-10 px-4` (40 px tall — the baseline touch target)
- `lg`: `min-h-11 px-5 text-[0.95rem]` (44 px tall — primary CTAs)
- `icon` / `icon-sm` / `icon-lg` / `icon-xs`: square icon buttons

---

### Cards & Containers

The site has three distinct surface treatments that convey elevation:

**`surface-card`** (lowest elevation)
- `border: 1px solid var(--border)` — ghost ink hairline
- `background: color-mix(in srgb, var(--card) 82%, transparent)` — slightly translucent card base
- `box-shadow: var(--shadow-card)` — `0 24px 72px -48px rgb(22 33 43 / 0.28)` — a long, soft undercast shadow
- Used for individual feature/capability cards on pages. Not glassmorphic — no backdrop-filter.

**`surface-panel`** (mid elevation)
- `border: 1px solid var(--border)`
- `background: color-mix(in srgb, var(--surface-1) 88%, transparent)` — translucent surface-1
- `box-shadow: var(--shadow-card)`
- `backdrop-filter: blur(18px)` — gentle frosted glass. Panels float above the page gradient.
- Used for the main footer lower section, form containers, "Signals from the build" box, tab content panels.

**`surface-hero`** (highest elevation — prominent panels)
- `border: 1px solid color-mix(in srgb, var(--border) 88%, transparent)` — slightly diffused border
- `background: linear-gradient(180deg, surface-1/92%, surface-2/78%)` — two-stop translucent gradient
- `box-shadow: var(--shadow-strong)` — `0 38px 100px -62px rgb(22 33 43 / 0.42)` — deepest shadow
- `backdrop-filter: blur(22px)` — strongest blur
- Used for the floating navigation pill, the footer CTA upper panel, and the `MediaStage` hero image container.

**`page-shell-glow`** — A positioning utility that adds a pseudo-element `::before` with a diagonal gradient glow (`glow-primary` to `glow-accent`) with `filter: blur(16px)` behind the element. Used only where a larger frosted panel needs an ambient halo.

**Base Card Component (`components/ui/card.tsx`):**
- `rounded-2xl` (32px) base radius
- `ring-1 ring-foreground/10` instead of a hard border
- `bg-card` base background
- `py-6` default internal gap
- In practice, page-level cards override this with explicit `surface-card` class and larger radii like `rounded-[1.8rem]` (28.8px) or `rounded-[2.2rem]`

**Corner Radius Conventions:**
- Navigation pill: `rounded-[1.85rem]` ≈ 29.6px
- Large panels (footer, forms, media stage): `rounded-[2.35rem]` = 37.6px
- Medium cards and tab triggers: `rounded-[1.8rem]` = 28.8px
- Section containers within panels: `rounded-[1.9rem]` – `rounded-[2.2rem]`
- Small pill elements (badges, inputs, buttons): `rounded-full`
- Brand chips and compact identity marks: `rounded-full`

The radius system is consistently very generous — all cards feel gently rounded, never sharp.

---

### Badges & Eyebrow Pills

**Eyebrow badges** (used above section headers and in hero):
- `rounded-full` pill shape
- `border border-foreground/10` ghost border
- `bg-card/76` slightly translucent card background
- `font-mono text-[0.72rem] uppercase tracking-[0.28em]`
- `text-primary/80` — 80% opacity Deep Ink Navy

**Meta / signal pills** (hero meta row, "Signals from the build" grid):
- `rounded-full`
- `border border-foreground/10`
- `bg-background/78` near-transparent background
- `font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground`
- Subtle shadow: `0 14px 34px -28px rgba(22,33,43,0.35)`

**Inline image overlay pills** (on `MediaStage` hero image):
- Top-left badge: `border-white/45 bg-white/82 backdrop-blur-sm` — stronger contrast on photo
- Top-right label: `border-white/32 bg-foreground/38 backdrop-blur-sm text-white/95`
- Bottom-left tags: `border-white/30 bg-foreground/40 backdrop-blur-sm text-white/95` — dark translucent

---

### Navigation (Header)

The current one-page letter site uses a **small absolute brand chip**, not a full navigation bar. It sits top-left inside the same `max-w-[76rem] px-4 sm:px-6 lg:px-8` rail as the letter content, so the first visual emphasis stays on the H1.

**Shell:** `inline-flex rounded-full border border-foreground/10 bg-background/50 px-4 py-2 backdrop-blur-md` with only a soft compact shadow. It is sized to content and must not render an empty full-width pill.

**Brand lockup:**
- Mark: the supplied rounded split-window Asym mark, extracted as transparent PNG artwork.
- Component: `SiteLogoMark` renders explicit transparent light/dark mark assets (`public/brand/asym-mark-dark.png` and `public/brand/asym-mark-light.png`) so no square background appears during theme changes.
- Wordmark: Plus Jakarta Sans `text-sm font-semibold tracking-[-0.04em]`.

There is no visible nav, no mobile menu, and no fake right-side placeholder on the one-page letter surface.

---

### Inputs & Forms

**Text Input (`components/ui/input.tsx`):**
- Shape: `rounded-full` (pill-shaped)
- Height: `h-11` (44px — touch-target minimum)
- Border: `border border-input` (`rgb(22 33 43 / 0.08)`)
- Background: `bg-background/76` — translucent page background
- Inner highlight: `shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]` — subtle top-edge highlight
- Hover: `hover:border-foreground/14` — slightly more visible border
- Focus: `focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/45 focus-visible:bg-background` — ring focus + opaque background
- Placeholder: `placeholder:text-muted-foreground/90`
- Transitions: `border-color, box-shadow, background-color` at `200ms`

**Textarea:**
- Styled consistently with input but with `rounded-2xl` (not full pill) for multi-line content
- Same border, background, and focus behavior

**Form Layout (`InquiryForm`):**
- Container: `surface-panel rounded-[2rem] p-6 sm:p-8`
- Fields arranged in `grid gap-4 sm:grid-cols-2`
- Submit / action area: `grid rounded-[1.75rem] border border-foreground/10 bg-secondary/42 p-4` — a contained action box
- Primary submit POSTs to `/api/contact` (Resend); `role="status"` / `aria-live="polite"` announces success or errors; success line uses `tabIndex={-1}` for focus management
- Fallback: copy inbox address and “Open in email app” (`mailto:`) when users prefer their client
- Copy control: visually labeled “Copied”; screen readers get `aria-live="polite"` confirmation via a visually hidden span

---

### Hero Section (`PageHero` and home `HomePageHero`)

**Homepage (`HomePageHero`):** A **full-bleed cinematic hero** aligned with the React Bits SaaS template language — `BG.jpg` fills the viewport behind copy as an absolute layer (`Image` `fill`, `object-cover`, slight scale), with **inset rounded canvas** on large viewports (`lg:inset-x-3 lg:top-3 lg:rounded-b-[2.35rem]`). Readability uses a **layered scrim**: parchment-to-clear vertical gradient (`from-background/90` → `to-background/60`, dark-mode variants), a **fine 5px mesh overlay** (`mix-blend-overlay`) echoing the artwork’s digital grain, a **diagonal wash** (`from-accent/30` → `to-primary/20`), and a **soft radial glow** from `--glow-primary`. Headline block is **centered** at `lg` (`max-w-4xl`, `text-center`; left-aligned on narrow viewports). The **primary CTA** uses a **split control**: Sage Green Mist accent bar behind the label (`absolute` `bg-accent` with `right-[2.75rem]`) plus a **pill primary** label and attached **icon disc** with `ArrowDownRight` (hover rotates −45°). Below, **`HeroProductPreview`** shows `dashboardmock.png` inside `surface-panel` with a **bottom fade mask** (`linear-gradient` mask to transparent ~54%) like the template’s dashboard reveal. **Site chrome:** fixed **quarter-round SVG corners** (`SiteChrome`, z-index 38) mirror the template’s corner brackets without replacing the floating nav pill.

**Inner pages (`PageHero`):** A **two-column grid** at `lg` breakpoint: `grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]` — slightly left-weighted.

**Left column (text):**
- Eyebrow badge (see badge spec above)
- `mt-6` gap to H1
- H1 uses `StaggeredText` for word-by-word reveal on mount (gentle cubic easing, ~38ms stagger, compact vertical travel — not linear)
- Other pages: `PageHero` wraps `title` in `HeroReveal` (mount-only fade+rise) unless `revealTitle={false}` (e.g. home hero with `StaggeredText`)
- Subtitle: `font-heading font-medium tracking-[-0.04em] text-primary/78`
- Description paragraph: `content-measure mt-6 text-base leading-7 text-muted-foreground`
- CTA buttons: `mt-8 flex flex-col gap-3 sm:flex-row`
- Meta pills row: `mt-8 flex flex-wrap gap-2.5`

**Right column:**
- Contains `MediaStage` on inner marketing pages that use a side-by-side hero
- `lg:pl-4` padding offset

**Hero spacing:**
- Top padding: `clamp(7rem, 9.2vw, 9rem)` (marketing density)
- Bottom padding: `clamp(2.5rem, 3.2vw, 3rem)` (marketing density)
- Legal pages use smaller values: top `clamp(6.4rem, 8vw, 7.8rem)`, bottom `clamp(2rem, 2.8vw, 2.6rem)`

---

### Media Stage (Hero Image Component)

The `MediaStage` consists of two overlapping elements:

**Background scene image:**
- Wrapped in `surface-hero rounded-[2.35rem] p-3 sm:p-4`
- Image itself in `rounded-[1.9rem] border border-foreground/10 overflow-hidden`
- Height: `h-[23rem] sm:h-[29rem]`, `w-full object-cover`
- Subtle linear gradient overlay: `rgba(255,255,255,0.1)` to `rgba(22,33,43,0.18)`
- Corner badges overlay the image (see badge spec)

**Floating screenshot card:**
- Positioned with negative top margin `-mt-18 sm:-mt-24`
- Right-aligned within container: `ml-auto w-[88%] sm:w-[82%]`
- `surface-panel rounded-[2rem] p-4 sm:p-5`
- Screenshot image: `rounded-[1.45rem] border border-foreground/10 shadow-[0_18px_45px_-28px_rgba(22,33,43,0.55)]`
- Caption area: `rounded-[1.5rem] bg-secondary/56 px-4 py-3 text-sm`
- **Floating animation:** Gently bobs `y: [0, -10, 0]` over a 9-second cycle (`ease: "easeInOut"`, `repeat: Infinity`, `repeatType: "mirror"`)

---

### Icon Containers

Icons in cards and feature grids use a consistent container pattern:

- `size-11 flex items-center justify-center rounded-2xl`
- Fill: either `bg-secondary` (Pale Sky Wash) with `text-primary` for primary capability cards, or `bg-accent` (Sage Green Mist) with `text-accent-foreground` for secondary capability cards
- `shadow-sm` — a tiny elevation lift
- Icon size: `size-5` (20px Lucide icon)

---

### Section Containers (`Section` component)

The `Section` component wraps all page sections with `Container` (max-width `82rem`) and handles both spacing and tone.

**Marketing density:** `py-[var(--space-section-marketing)]` = `clamp(3.5rem, 4.8vw, 5rem)` vertical padding.

**Legal density:** `py-[var(--space-section-legal)]` = `clamp(2.7rem, 3.8vw, 4rem)` vertical padding.

**Section tones:**
- `default` — no additional background treatment
- `sky` — `.section-wash-sky` (pale blue top gradient)
- `accent` — `.section-wash-accent` (pale sage top gradient)
- `ink` — `bg-primary text-primary-foreground` — full Deep Ink Navy background, inverted text

---

### Tabs (`PlatformTabs`)

The platform tabs use a **side-by-side layout** at `lg`: `grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)]` — left is the trigger column (narrower), right is content.

**Tab triggers (left column):**
- `surface-card rounded-[1.6rem]` cards with min-height `9rem`
- Left-aligned text: eyebrow mono tag + heading + summary
- Active state: `data-active:bg-secondary/88`

**Tab content (right column):**
- `surface-panel rounded-[1.95rem]`
- Detail list items: `rounded-[1.35rem] border border-foreground/10 bg-background/72 px-4 py-3 text-sm`

---

### Footer

The footer has **two stacked panels**:

**Upper panel (CTA):**
- `page-shell-glow surface-hero overflow-hidden rounded-[2.35rem] p-7 sm:p-10`
- Two-column `lg`: left-heavy (1.15fr / 0.85fr)
- Left: large heading, body, bullet list in `rounded-[1.5rem] border border-foreground/10 bg-background/62 p-4 text-sm`
- Right: primary + outline CTA buttons, both `rounded-full`

**Lower panel (sitemap):**
- `surface-panel rounded-[2.35rem] p-7 sm:p-10`
- Four-column `lg`: brand statement (1.25fr) + 3 link groups (0.75fr each)
- Link groups: mono eyebrow labels, `text-sm text-foreground/84 hover:text-foreground` links
- Footer bar: `border-t border-foreground/10 pt-6` with legal notice left, email + copyright right

---

### Links

Inline links (footer, forms, legal):
- Default: `text-foreground/84`
- Hover: `hover:text-foreground`
- No underline by default; semantic links in body text use `underline underline-offset-4` when emphasis is needed
- Email links in footer use `.link-resilient` for long address wrapping. This utility allows emergency token breaking without enabling auto-hyphenation in normal prose.
- The `buttonVariants` `link` variant provides an underline-on-hover styled inline link

---

### Accordion (Give page, FAQ)

Uses shadcn/ui `Accordion` with `surface-card` background styling. Not yet documented with full class detail — **provisional** based on surrounding patterns; should match the general surface-card + rounded-2xl + border-foreground/10 conventions.

---

## 5. Layout Principles

### Container & Max Width

- **Primary max-width:** `max-w-[82rem]` (1312px) — applied by the `Container` component
- **Nav / footer max-width:** `max-w-[80rem]` (1280px) — slightly narrower to give the floating panels visual breathing room from the viewport edges
- **Content measure:** `max-w-3xl` for section headers and hero text; `max-w-2xl` for form titles; `72ch` via `.content-measure` for body paragraphs
- **Side padding:** `px-4 sm:px-6 lg:px-8` (16 → 24 → 32px) — responsive edge padding on all containers

### Grid System

The layout uses **asymmetric two-column grids** throughout. These are not equal-half splits; they favor a dominant content zone:

| Section | Grid | Ratio |
|---|---|---|
| `PageHero` | `lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]` | ~52/48 text-dominant |
| "Why the name?" | `lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]` | ~46/54 card-dominant |
| Home CTA | `lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]` | ~52/48 ink-card-dominant |
| Footer CTA | `lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]` | ~58/42 |
| Footer sitemap | `lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)_minmax(0,0.75fr)_minmax(0,0.75fr)]` | Brand + 3 equal cols |
| Platform tabs | `lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)]` | 42/58 trigger/content |

Multi-column grids for cards:
- Capabilities (8 cards): `grid gap-4 md:grid-cols-2 xl:grid-cols-4`
- Foundation cards (3): stacked column grid with `gap-4`

### Spacing Scale

**Base unit:** 4px (`1` in Tailwind default spacing scale).

**Section vertical rhythm:**
- Section padding: `clamp(3.5rem, 4.8vw, 5rem)` (marketing) = ~56–80px responsive
- Hero top padding: `clamp(7rem, 9.2vw, 9rem)` = ~112–144px
- Between related blocks within a section: `gap-4` (16px) to `gap-8` (32px)
- Between major headings and their content: `mt-6` (24px) or `mt-8` (32px)

**Component internal spacing:**
- Card body padding: `px-6 py-6` (24px)
- Surface panel padding: `p-7 sm:p-10` (28px → 40px)
- Card header gap: `gap-4` (16px) between icon and title
- Form field gap: `gap-4` (16px)

**Typography rhythm:**
- Eyebrow to H2: `mt-4` (16px)
- H2 to description: `mt-4` (16px)
- Hero eyebrow to H1: `mt-6` (24px)
- H1 to subtitle: `mt-4` (16px)
- Description to CTAs: `mt-8` (32px)

### Alignment

- **Left-aligned** for all body text and navigation (optimal reading flow for LTR content)
- **Centered** for `SectionHeader` when `align="center"` is specified (hero-like centered sections)
- **Bottom-aligned** on footer columns (`lg:items-end` in footer CTA grid)
- **Text is balanced** (`text-balance`) on all headings globally

### Responsive Behavior & Breakpoints

Using Tailwind v4 defaults:

| Breakpoint | Value | Behavior change |
|---|---|---|
| base (mobile) | 0px | Single column, full-width cards, stacked CTAs |
| `sm` | 640px | Larger padding, larger hero image, side-by-side CTA buttons, larger footer padding |
| `lg` | 1024px | Two-column layouts activate, desktop nav replaces mobile sheet, multi-column grids |
| `xl` | 1280px | 4-column capability grid activates |

- **Navigation:** Hidden inline nav on mobile, full floating pill nav on `lg+`. Mobile uses Sheet drawer triggered by hamburger.
- **Hero:** Single column on mobile/tablet, side-by-side at `lg`.
- **Typography:** Fluid `clamp()` type scaling for display and section headings — no hard breakpoint jumps.
- **Touch targets:** All interactive elements meet minimum `44px` tall (`min-h-11` for lg buttons, `h-11` for inputs, `size-11` for icon containers).

### Whitespace Philosophy

The design reads as **deliberately airy**. This is not accidental padding — it encodes institutional seriousness and trust. Crowded UIs feel untrustworthy; space equals confidence.

- Never collapse vertical rhythm to chase content density
- Sections breathe with `5rem` between them — this is enforced via CSS custom property
- Large headings need room above and below to land with authority
- Surface containers (panels, cards) carry their own `p-7 sm:p-10` internal padding — do not override these downward
- The 120px architectural grid in the background provides implicit visual structure that reduces the need for explicit dividers

### Scroll Behavior

- Smooth scroll via Lenis (`duration: 0.88`, exponential-style `easing` in `smooth-scroll.tsx`)
- `scroll-padding-top: 7rem` on `html` to account for the fixed floating nav
- `SmoothScroll` respects `prefers-reduced-motion` — if reduced motion is preferred, Lenis is not initialized
- Long-form marketing routes (`/manifesto`, `/platform`, `/specs`, `/missions`, `/join`, `/give`): thin fixed `ReadingProgress` bar (`bg-primary/50`, transform `scaleX`) — hidden when reduced motion is preferred
- **Scroll thesis** block: on narrow viewports (`max-width: 767px`), word emphasis uses **opacity only** (no blur/scale) to limit scroll-linked cost

---

## 6. Notes for UI Generation

Use these descriptions when prompting or generating new UI for this site:

### Atmosphere Language
> "Calm institutional minimalism with warm parchment surfaces, atmospheric ambient glow, and frosted-glass layered depth. The site is mission-serious and architecturally precise."

### Color References (always use descriptive name + hex)
- Background canvas: "Warm Parchment Canvas (#f6f2ea)"
- Primary action: "Deep Ink Navy (#1e3a4f)"
- Secondary / active state: "Pale Sky Wash (#e6f1f9)"
- Accent / sage: "Sage Green Mist (#e8efe2)"
- Body text: "Deep Ink Charcoal (#16212b)"
- Supporting text: "Slate Muted Gray (#5a6975)"
- Destructive: "Crimson Alert (#c94837)"

### Shape Language
- Buttons: "Fully pill-shaped" (not "rounded-md" or "rounded-lg")
- Cards: "Generously rounded corners, ~1.8–2.35rem radius" (not "rounded-2xl" alone)
- Navigation: "Floating frosted-glass pill"
- Inputs: "Pill-shaped input fields" (not "rounded inputs")

### Elevation Language
- Lowest: "surface-card — semi-transparent, hairline ghost border, soft undercast shadow"
- Mid: "surface-panel — frosted glass with 18px blur, card shadow"
- Highest: "surface-hero — heavy frosted glass with 22px blur, deep shadow"
- Atmospheric: "page-shell-glow — diagonal ambient glow halo as pseudo-element"

### Motion Language
- Scroll reveals: "Fade up with gentle scale (~0.985→1), cubic easing [0.22,1,0.36,1], ~320ms default"
- Stagger: "~0.042–0.048s between related children; keep groups small"
- `surface-interactive`: "150ms ease-off when hover ends; 0ms on hover-in (instant lift)"
- Hero float: "9-second gentle vertical bob (y: 0→-10→0, mirror repeat)"
- Nav entrance: "~360ms slide-down from -12px on mount"
- All motion: "Always gracefully disabled when `prefers-reduced-motion: reduce` is set"

### Reusable Prompt Fragments
- "Create a section with a `surface-panel` container, an eyebrow badge in JetBrains Mono uppercase, a section H2 in Plus Jakarta Sans with tight negative tracking, and body text in Slate Muted Gray."
- "Add a two-column asymmetric grid at lg breakpoint (52/48 ratio), left column for text hierarchy, right column for a generously-rounded surface-hero card."
- "Use a fully pill-shaped primary button in Deep Ink Navy (#1e3a4f) with a subtle directional arrow icon (MoveRight or ArrowRight) on the right."
- "Frame the section with `.section-wash-sky` for a pale blue top gradient wash, fading to transparent."
- "Use the `.eyebrow` class for all section sub-labels: JetBrains Mono, 0.72rem, 0.28em tracking, uppercase, `text-primary/70`."

### Do Not
- Do not use pure white (#ffffff) or pure black (#000000) for any surface or text
- Do not use rectangular or lightly-rounded buttons — all buttons are fully pill-shaped
- Do not add hard divider lines between sections — use spacing, washes, or surface elevation instead
- Do not use colorful or highly saturated accent colors — the palette is deliberately muted
- Do not write heavy drop shadows — use the long, soft, low-opacity shadow tokens
- Do not deviate from the three-font system (Plus Jakarta Sans / Inter / JetBrains Mono)
- Do not override heading tracking to positive values — negative tracking is a core identity signal
- Do not add motion that lacks a reduced-motion fallback
