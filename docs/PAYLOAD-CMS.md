# Payload CMS integration (Asymmetric.al)

This document describes **what is wired today** for [Payload CMS 3](https://payloadcms.com/) on this Next.js 16 site, how it fits the App Router, and how to finish Phase 2 (content-driven pages).

## Current status: Phase 1 — “readiness”

The marketing site **does not load page copy from Payload yet**. Navigation, footer, and body content still come from `lib/config.ts` and page modules. The `lib/content/*` adapter is the intended seam: it reads from `lib/config` today and can be swapped to the Payload Local API later **without changing import sites in React** (see `lib/content/site.ts`).

What *is* integrated:

| Area | Purpose |
|------|---------|
| **`payload.config.ts`** | Payload `buildConfig`: Postgres adapter, Lexical editor, Vercel Blob storage plugin (media hookup deferred), TypeScript types output path, **`users` auth collection** for admin login. |
| **`next.config.ts`** | `withPayload(withBundleAnalyzer(nextConfig))` so Next and Payload share one config. |
| **`app/(payload)/layout.tsx`** | Payload admin UI shell (`RootLayout` from `@payloadcms/next/layouts`) and server function bridge. |
| **`app/(payload)/admin/[[...segments]]`** | Admin UI catch-all route. Public URL: **`/admin`**. |
| **`app/(payload)/api/[...slug]/route.ts`** | Payload REST API (CRUD, auth, etc.). |
| **`app/(payload)/api/graphql` & `graphql-playground`** | GraphQL endpoint and playground (as provided by Payload). |
| **`app/(app)/`** | Route group for **marketing** pages (URLs unchanged: `/`, `/contact`, …). |
| **`app/(app)/layout.tsx`** | Marketing chrome: gradients, `SiteChrome`, `Header`, `Footer`. |
| **`app/layout.tsx`** | Root: fonts, `Providers`, `SkipToContent`, `children`, Vercel Analytics & Speed Insights. Keeps admin layout independent. |
| **`app/api/draft/route.ts`** | Enables Next.js **draft mode** when `secret` query param matches `PAYLOAD_DRAFT_SECRET` (for future preview). |
| **`app/api/revalidate/route.ts`** | **On-demand revalidation**: `POST` with `Authorization: Bearer ${REVALIDATION_SECRET}` and JSON `{ "path": "/..." }` or `{ "tag": "..." }`. |
| **`app/api/disable-draft/route.ts`** | Disables draft mode (supporting route for preview flows). |
| **`lib/env.ts`** | `validateEnv()` for strict checks; `env` object for non-throwing reads (used where appropriate). |

Collections and globals in `payload.config.ts` are **stubbed with TODOs** for Phase 2 (Pages, Media, Globals for site settings / nav / SEO defaults, etc.).

## Environment variables

| Variable | Required for | Notes |
|----------|----------------|-------|
| `DATABASE_URI` | Payload, migrations, CLI | Postgres connection string (e.g. Vercel Postgres, Neon, local Postgres). |
| `PAYLOAD_SECRET` | Payload auth / sessions | Long random string; **never commit**. |
| `PAYLOAD_DRAFT_SECRET` | `/api/draft` preview links | Shared secret in preview URLs. |
| `REVALIDATION_SECRET` | `/api/revalidate` | Bearer token for ISR/webhook-style revalidation. |
| `RESEND_API_KEY` | `/api/contact` (Resend) | Validated in `validateEnv()` when you call it from server entrypoints. |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob (media plugin) | Needed when the `media` collection is enabled in the Blob plugin. |
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs | Defaults to `https://asymmetric.al` in `lib/env.ts`. |

Copy **`.env.example`** to `.env.local` and fill values (`.env.local` is gitignored).

## Local development

1. **Node 22+** and **npm 10+** (or **Bun** per `packageManager` in `package.json`).
2. Install dependencies: `npm install`.
3. Provide Postgres and secrets in `.env.local`.
4. **First-time DB**: run Payload’s migration flow as documented in Payload 3 + Postgres (push schema or migrate, depending on your workflow).
5. **Dev server**: `npm run dev` — marketing routes and `/admin` are served from the same app.

### Payload CLI scripts

| Script | Command |
|--------|---------|
| Payload CLI | `npm run payload -- …` |
| Regenerate TS types from config | `npm run generate:types` |
| Regenerate admin import map | `npm run generate:importmap` |

> **Note:** `generate:types` / `generate:importmap` load `payload.config.ts`. If the CLI fails in your environment (e.g. ESM / top-level await quirks), run the same commands in CI or from Payload’s documented Node flags, or generate types after `payload` is upgraded. The app **builds without** a checked-in `payload-types.ts` until you generate one.

## Admin authentication

`admin.user` in `payload.config.ts` must refer to an **`auth: true` collection**. The repo defines a minimal **`users`** collection (email/password, `useAsTitle: 'email'`) inline in `payload.config.ts`. Create the first admin user via Payload’s signup flow or CLI as per Payload docs once the database is connected.

## Merge resolution (PR #14) — architectural choices

- **Marketing vs admin layouts**: Payload requires a dedicated admin tree; the marketing header/footer must not wrap `/admin`. Hence **`(app)`** vs **`(payload)`** route groups and a **thin root layout**.
- **Hero / home**: The merged branch keeps the current **`HomePageHero`** + **`HeroProductPreview`** experience from `initial-site-build`, not the older `PageHero` + `MediaStage` variant from the feature branch.
- **Tooling**: Bundle analyzer and Payload wrapper are **composed** so `ANALYZE=true` still works.

## Phase 2 checklist (not implemented yet)

- [ ] Add **Media** collection; enable `vercelBlobStorage` mapping for `media`.
- [ ] Add **Globals** (site settings, navigation, footer, SEO defaults) and optionally **Pages** (slug, blocks, draft/publish).
- [ ] Replace `lib/content/site.ts` internals with `getPayload` / Local API calls (`overrideAccess: false` when acting as a user).
- [ ] Wire **preview** URLs using `/api/draft` + draft mode in preview routes.
- [ ] Call **`/api/revalidate`** from Payload hooks or webhooks on publish.

## References

- [Payload + Next.js](https://payloadcms.com/docs/getting-started/installation) (official)
- Project agent skill: `.agents/skills/payload/SKILL.md` and `reference/*`
