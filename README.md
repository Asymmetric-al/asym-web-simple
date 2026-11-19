# asym.app

The product website for **asym**, open-source software for nonprofits built by **Asymmetric.al**. asym connects a nonprofit's website, giving, donor records, and email so AI can prepare work and carry out the steps a team approves. Missions organizations are the first focus. asym is prelaunch; this site explains the product and collects early-access requests.

## What this is

This repository is the marketing site served at [asym.app](https://asym.app) (Vercel project `asym-web-simple`, production branch `main`). The product itself lives in [Asymmetric-al/core](https://github.com/Asymmetric-al/core) (AGPL-3.0-only). Product name, URL, contact address, navigation, and repository figures live in `lib/config.ts`.

The homepage is informational: it describes the first workflow in text and never shows mock product screens. See `DESIGN.md`.

### What lives in this repository

The **Next.js marketing site**, the **`/api/early-access`** intake route (plus SSR `/early-access/status` fallback), retired first-party endpoints (`410 Gone` on `/api/contact` and `/api/donations/*`), fail-closed draft/revalidation routes, and dormant **Payload CMS 3** wiring (guarded behind `proxy.ts` and env checks until Postgres and secrets are configured). Marketing copy does not load from Payload.

**Note:** The npm `package.json` name is still `template-baseline` for historical reasons.

## Stack

- **Next.js 16** — App Router, React Server Components, `proxy.ts`, Turbopack dev (`next dev`)
- **React 19**
- **TypeScript** — strict mode (`tsconfig.json`)
- **Tailwind CSS v4** — design tokens via CSS variables in `app/globals.css`
- **shadcn/ui** — `base-maia` style (`components.json`)
- **next-themes** — dark mode (`disableTransitionOnChange`)
- **Lucide React** — icons
- **Fonts** (root layout) — Plus Jakarta Sans (headings), Inter (body), JetBrains Mono (mono)
- **Resend** — `/api/early-access` transactional email
- **Payload CMS 3** — **Phase 1 (dormant until configured):** Postgres adapter, Lexical editor, Vercel Blob storage plugin, minimal **`users`** collection for `/admin`. **Marketing copy does not load from Payload**; see [docs/PAYLOAD-CMS.md](./docs/PAYLOAD-CMS.md).

Visual design tokens and language live in **`DESIGN.md`**. Payload wiring and `/api` routing precedence are documented in **`docs/PAYLOAD-CMS.md`**.

## Pages

| Route | Description |
| --- | --- |
| `/` | Homepage: product, first workflow, open source, team, early access |
| `/privacy` | Privacy policy (covers the early-access flow) |
| `/terms` | Terms of service |
| `/early-access/status` | Server-rendered PRG status page for no-JS early-access form submissions (`noindex`) |
| `/statement-of-faith` | Statement of faith (`noindex`, unlinked) |
| `/admin` | Payload CMS admin (returns standard site `404` via `proxy.ts` until `DATABASE_URI` and `PAYLOAD_SECRET` are set) |

Older routes (`/about`, `/platform`, `/waitlist`, `/contact`, `/give`, `/give/success`, `/contributor`, `/deck`, `/501c3`, and others) permanently redirect (`308`) to homepage sections; see `next.config.ts`.

Route groups `(app)` and `(payload)` do **not** appear in URLs; they separate marketing chrome from the admin layout.

## API surface (first-party)

Next.js matches **more specific** `app/api/*` routes first; remaining `/api/*` traffic is handled by Payload’s catch-all (returns `503` when unconfigured; see [docs/PAYLOAD-CMS.md](./docs/PAYLOAD-CMS.md)).

| Path | Role |
| --- | --- |
| `POST /api/early-access` | Early-access requests, emailed to the team inbox via Resend (relative `303` PRG redirect for native HTML form posts) |
| `POST /api/contact` | Retired (`410 Gone`) |
| `POST /api/donations/*`, `POST /api/webhooks/stripe` | Retired (`410 Gone`) |
| `GET /api/draft`, `GET /api/disable-draft` | Next.js draft mode (`503` when `PAYLOAD_DRAFT_SECRET` is unset) |
| `POST /api/revalidate` | On-demand revalidation (`503` when `REVALIDATION_SECRET` is unset) |
| `GET/POST /api/...` (other) | Payload REST (via `(payload)/api/[...slug]`, `503` when unconfigured) |
| GraphQL | Payload GraphQL + playground under `/api/graphql` (`503` when unconfigured) |

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
│   ├── early-access.ts       # Validation, copy, and retry formatting
│   ├── early-access-config.ts # 4-env-var gate for live early-access intake
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

**Declared package manager:** [Bun](https://bun.sh) `1.4.5` (`packageManager` in `package.json`). The repo also contains **`bun.lock`** and **`package-lock.json`**; use **one** package manager locally to avoid inconsistent installs.

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
| --- | --- |
| Browse marketing pages, run `build` / `typecheck` / `lint` | None |
| **Early-access form** opens and delivers requests | `RESEND_API_KEY`, `CONTACT_INBOX_EMAIL`, `CONTACT_FROM_EMAIL` (sender on a Resend-verified domain), and `NEXT_PUBLIC_CONTACT_EMAIL` (syntactically valid verified private inbox for privacy/deletion inquiries). Without all four, the homepage shows the honest "Opening soon" state and `POST /api/early-access` returns `503`. |
| **Payload `/admin`** + Payload CLI | `DATABASE_URI`, `PAYLOAD_SECRET`; follow Payload migrations |
| **Draft preview links** | `PAYLOAD_DRAFT_SECRET` |
| **On-demand revalidate** | `REVALIDATION_SECRET` |
| **Vercel Blob** (when Media collection is enabled) | `BLOB_READ_WRITE_TOKEN` |

Copy `.env.example` → `.env.local` for local secrets.

**Component installs:** React Bits Pro and Shadcnblocks CLI use license/API keys in `.env.local` (see `components.json` and `AGENTS.md`); they are not required to run the site.

## Scripts

| Command | Description |
| --- | --- |
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

**`lib/config.ts`** is the source of truth for **site identity**, **navigation**, **footer links**, **repository figures**, and the **primary CTA**. Homepage sections live in **`components/site/home/`**; other page copy lives in **`app/(app)/**`** modules. **`lib/content/site.ts`** reads `lib/config` today so components can switch to Payload later without changing import sites (Phase 2).

**`app/globals.css`** holds design tokens: brand colors, surfaces, typography scale, light/dark values.

## The product

asym's code, architecture, and status live in [Asymmetric-al/core](https://github.com/Asymmetric-al/core). Its README states which modules work end to end and which are partial or planned. Keep claims on this site consistent with that repository: anything not yet in the code is labeled "In development" or "Planned".

## Contributing

This site is open source alongside asym itself. Engineers, designers, and writers who want to help are welcome.

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

Vercel installs with Bun 1.4.5 from `bun.lock` (`installCommand` in `vercel.json`), matching `packageManager` in `package.json`. The build image ships an older Bun that cannot read this lockfile, so the version is pinned through `npx`. Plain `npm install` fails with `ERESOLVE` (typescript-eslint declares a TypeScript `<6.1` peer; lint runs on the TS 6 API through `@typescript/typescript6`), and forcing it with `legacy-peer-deps` skips required peers such as `graphql`, so use Bun.

## License and third-party

- **Repository license:** [LICENSE](./LICENSE) is the **GNU General Public License v3**.
- **React Bits Pro** (and similar registry components) are governed by **their vendor terms** and optional keys in `.env.local` for CLI installs — that is separate from the GPLv3 in `LICENSE`. See `components.json` for configured registries.

Footer links and contact addresses come from **`lib/config.ts`** (`siteConfig.url`, `siteConfig.email`, `footerLinks`).
