# Asymmetric.al

The production website for **Asym** — a unified mission operating system for Christian sending agencies. Built in the open because the organizations we serve deserve to see the architecture.

> *Simple faithfulness can still create outsized outcomes.* — 1 → ∞

## What this is

The public marketing site (product name and canonical URL live in `lib/config.ts` as `siteConfig.name` and `siteConfig.url`) presents the **Asym** platform: a mission operating system purpose-built for modern sending agencies. It replaces the fragmented DIY stack — Salesforce, Mailchimp, QuickBooks, spreadsheets, and site builders — with a single, coherent surface for finance, mobilization, donor support, communications, and web operations.

Operated as a project under **Global Fellowship Inc.**, a 501(c)(3) nonprofit (EIN 68-0214543) based in Meadow Vista, California. Our staff raise support like the missionaries we serve.

### What lives in this repository

This repo ships the **Next.js marketing site** plus **first-party API routes** (contact email, Stripe-based giving, draft mode and on-demand revalidation) and **Payload CMS 3** wired for **admin login and future content** (Phase 2). It is not a thin static brochure: `/give` can create real Checkout sessions when Stripe env vars are set; `/api/contact` sends mail when Resend is configured.

The broader **Asym platform** (Mission Control modules, CRM, automations, and so on) is **described** on the site and in the section below; those systems are **not implemented in this codebase** unless they appear as normal site pages or APIs here.

**Note:** The npm `package.json` name is still `template-baseline` for historical reasons; site branding and copy use `lib/config.ts`.

## Stack

- **Next.js 16** — App Router, React Server Components, Turbopack dev (`next dev`)
- **React 19**
- **TypeScript** — strict mode (`tsconfig.json`)
- **Tailwind CSS v4** — design tokens via CSS variables in `app/globals.css`
- **shadcn/ui** — `base-maia` style (`components.json`), Base UI primitives for custom components
- **Lenis** — smooth scroll
- **motion/react** — animations with reduced-motion support
- **next-themes** — dark mode
- **Lucide React** — icons
- **Fonts** (root layout) — Plus Jakarta Sans (headings), Inter (body), JetBrains Mono (mono)
- **Stripe** — Checkout and Customer Portal for `/give` (see `lib/stripe-server.ts`, `lib/stripe-giving.ts`)
- **Resend** — `/api/contact` transactional email
- **Payload CMS 3** — **Phase 1:** Postgres adapter, Lexical editor, Vercel Blob storage plugin (media collection not hooked yet), minimal **`users`** collection for `/admin`. **Marketing copy does not load from Payload**; see [docs/PAYLOAD-CMS.md](./docs/PAYLOAD-CMS.md) and `lib/content/site.ts`.

Visual design tokens and language live in **`DESIGN.md`**. Payload wiring and `/api` routing precedence are documented in **`docs/PAYLOAD-CMS.md`**.

## Pages

| Route | Description |
|---|---|
| `/` | Home — mission, philosophy, system capabilities |
| `/platform` | Platform overview — Mission Control modules |
| `/missions` | Role views for sending agency teams |
| `/specs` | Tech architecture, performance targets, release gates |
| `/manifesto` | Philosophy, design principles, organizational posture |
| `/join` | Pilot agencies, builders, and build supporters |
| `/give` | Support the build (Stripe Checkout when configured) |
| `/give/success` | Post-checkout confirmation |
| `/contact` | General inquiry |
| `/statement-of-faith` | Theological foundation |
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |
| `/501c3` | 501(c)(3) disclosure |
| `/admin` | Payload CMS admin (requires Postgres, secrets, and migrations — see Payload doc) |

Route groups `(app)` and `(payload)` do **not** appear in URLs; they separate marketing chrome from the admin layout.

## API surface (first-party)

Next.js matches **more specific** `app/api/*` routes first; remaining `/api/*` traffic is handled by Payload’s catch-all (see [docs/PAYLOAD-CMS.md](./docs/PAYLOAD-CMS.md)).

| Path | Role |
|---|---|
| `POST /api/contact` | Contact / waitlist email via Resend |
| `POST /api/donations/checkout-session` | Stripe Checkout session creation |
| `POST /api/donations/billing-portal` | Stripe Customer Portal session |
| `POST /api/webhooks/stripe` | Stripe webhooks for giving |
| `GET /api/draft`, `GET /api/disable-draft` | Next.js draft mode (preview plumbing) |
| `POST /api/revalidate` | On-demand revalidation (Bearer token) |
| `GET/POST /api/...` (other) | Payload REST (via `(payload)/api/[...slug]`) |
| GraphQL | Payload GraphQL + playground under `/api/graphql` |

## Project structure

```
├── app/
│   ├── (app)/                # Marketing routes (URLs unchanged: /, /contact, …)
│   │   ├── layout.tsx        # Header, footer, SiteChrome, background glows
│   │   ├── page.tsx          # Home
│   │   └── …/page.tsx        # Other public pages
│   ├── (payload)/            # Payload admin + REST/GraphQL (URLs: /admin, /api/*)
│   ├── api/                  # First-party routes: contact, donations, webhooks, draft, revalidate
│   ├── globals.css           # Design tokens, theme colors, surface variables
│   ├── layout.tsx            # Root: fonts, providers, analytics
│   └── qa/                   # Optional maintainer pages (e.g. error UI checks)
├── components/
│   ├── header.tsx / footer.tsx
│   ├── site/                 # Page sections, hero, forms, motion
│   ├── react-bits/
│   └── ui/                   # shadcn/ui
├── lib/
│   ├── config.ts             # Site identity, nav, footer, CTAs (Phase 1 source)
│   ├── content/              # getSiteGlobal, nav, footer — adapter; Payload in Phase 2
│   ├── env.ts                # Environment helpers (see Payload doc: validateEnv not auto-run)
│   ├── stripe-server.ts / stripe-giving.ts
│   ├── metadata.ts
│   └── …
├── tests/
│   ├── e2e/                  # Playwright: smoke, responsive, Stripe API
│   ├── a11y/
│   ├── visual/
│   └── unit/                 # Vitest (lib/**/*.test.ts)
├── docs/
│   └── PAYLOAD-CMS.md        # Payload integration guide
├── payload.config.ts         # Payload buildConfig
└── public/                   # Static assets
```

## Getting started

**Declared package manager:** [Bun](https://bun.sh) `1.3.11` (`packageManager` in `package.json`). The repo also contains **`bun.lock`** and **`package-lock.json`**; use **one** package manager locally to avoid inconsistent installs.

```bash
bun install
bun run dev
```

Equivalent with npm:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The dev server uses Turbopack by default.

### Environment variables (what actually breaks without them)

| Goal | Required env (from `.env.example`) |
|---|---|
| Browse marketing pages, run `build` / `typecheck` / `lint` | None |
| **Contact form** sends email | `RESEND_API_KEY` (otherwise API returns 503 with a clear message) |
| **`/give` Checkout / portal** | `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, price IDs, webhook secret for webhooks |
| **Payload `/admin`** + Payload CLI | `DATABASE_URI`, `PAYLOAD_SECRET`; follow Payload migrations |
| **Draft preview links** | `PAYLOAD_DRAFT_SECRET` |
| **On-demand revalidate** | `REVALIDATION_SECRET` |
| **Vercel Blob** (when Media collection is enabled) | `BLOB_READ_WRITE_TOKEN` |

Copy `.env.example` → `.env.local` for local secrets.

**Component installs:** React Bits Pro and Shadcnblocks CLI use license/API keys in `.env.local` (see `components.json` and `AGENTS.md`); they are not required to run the site.

## Scripts

| Command | Description |
|---|---|
| `postinstall` | `patch-package` |
| `dev` | Next.js dev server (port 3000) |
| `build` | Production build |
| `start` | Production server (`next start`) |
| `lint` | ESLint |
| `lint:fix` | ESLint with `--fix` |
| `format` | Prettier write |
| `format:check` | Prettier check |
| `typecheck` | `tsc --noEmit` |
| `analyze:bundle` | Bundle analyzer (`ANALYZE=true`) |
| `test:unit` | Vitest — `lib/**/*.test.ts` |
| `qa:e2e` | Full Playwright suite |
| `qa:smoke` | Playwright smoke (`tests/e2e/smoke.spec.ts`) |
| `qa:a11y` | Playwright a11y |
| `qa:visual` | Playwright visual regression |
| `qa:visual:update` | Update visual snapshots |
| `qa:stripe-api` | Playwright Stripe giving API tests |
| `payload` | Payload CLI passthrough |
| `generate:types` | Generate `payload-types.ts` (not checked in until run) |
| `generate:importmap` | Regenerate Payload admin import map |

Primary static checks before a PR: **`lint`** and **`typecheck`**. Playwright defaults to **`http://127.0.0.1:3001`** with `webServer` running `npm run build && npx next start` (see `playwright.config.ts`).

## Configuration

**`lib/config.ts`** is the source of truth for **site identity**, **navigation**, **footer groups**, **support links**, and **global CTAs**. Page-level copy and layout live in **`app/(app)/**`** modules. **`lib/content/site.ts`** reads `lib/config` today so components can switch to Payload later without changing import sites (Phase 2).

**`app/globals.css`** holds design tokens: brand colors, surfaces, typography scale, light/dark values.

## The platform (product vision — not this repo’s codebase)

The following describes **what Asym aims to be** for agencies. It is **marketing and product narrative**, not a checklist of features implemented in this repository.

Asym replaces the fragmented agency stack with Mission Control: one login, one shared database, one operating surface.

**Core modules (vision):**

- **Partners CRM** — Missions-built on Twenty CRM. Tracks churches, households, designations, and relationship history.
- **Contributions Hub** — Live transaction visibility, Stripe-native processing, reconciliation automation.
- **Web Studio** — Headless Next.js + Payload CMS so agencies control their sites without change-order lock-in.
- **Email Studio** — Branded receipts, [REDACTED] resets, and campaign emails with full ownership.
- **Statements Studio** — Year-end tax documents and receipt packs generated automatically.
- **Mobilize** — Visual workflow orchestration from candidate interest to field deployment via Zapier.

**Supporting modules (vision):** Donor Support Hub (Chatwoot CE), Sign Studio (Documenso CE), Report Studio, Automations, Member Care, Events & Gatherings.

**Typical platform stack (vision):** TypeScript · React · Next.js · Bun · PostgreSQL · Redis · Twenty CRM · Payload CMS · Chatwoot CE · Documenso CE · Supabase Auth · Stripe · Resend · Zapier · Inngest · Vercel · OpenTelemetry

## Contributing

This project is open source as part of Asym's commitment to tenant sovereignty and transparent architecture. We welcome engineers, designers, and systems thinkers who want to use their craft for the Great Commission.

- Review open issues before starting new work
- Follow the existing `app/`, `components/`, and `lib/` placement patterns
- Keep **`lib/config.ts`** and the **`lib/content`** adapter as the configuration seam for globals and nav until Phase 2
- Run **`npm run lint`** and **`npm run typecheck`** (or `bun run …`) before submitting a PR; add Playwright / Vitest when you touch flows they cover
- Preserve server/client component boundaries — avoid broad refactors to client components without a clear reason

## Deployment

The app is a standard **Node.js** Next deployment (API routes and Payload need a Node-compatible host, not a purely static export). **Vercel** is the expected host for this project; exact branch rules and project settings live in your Vercel (or CI) configuration, not in this repo.

```bash
npm run build
```

## License and third-party

- **Repository license:** [LICENSE](./LICENSE) is the **GNU General Public License v3**.
- **React Bits Pro** (and similar registry components) are governed by **their vendor terms** and optional keys in `.env.local` for CLI installs — that is separate from the GPLv3 in `LICENSE`. See `components.json` for configured registries.

---

**Minimize Clicks. Maximize Ministry.**

Footer links and contact addresses match **`lib/config.ts`** (`siteConfig.url`, `siteConfig.email`, nonprofit disclosure path).
