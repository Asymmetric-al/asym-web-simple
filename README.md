# Asymmetric.al

The production website for **Asym** — a unified mission operating system for Christian sending agencies. Built in the open because the organizations we serve deserve to see the architecture.

> *Simple faithfulness can still create outsized outcomes.* — 1 → ∞

## What this is

[Asymmetric.al](https://asymmetric.al) is the public-facing site for the Asym platform: a mission operating system purpose-built for modern sending agencies. It replaces the fragmented DIY stack — Salesforce, Mailchimp, QuickBooks, spreadsheets, and site builders — with a single, coherent surface for finance, mobilization, donor support, communications, and web operations.

Operated as a project under **Global Fellowship Inc.**, a 501(c)(3) nonprofit (EIN 68-0214543) based in Meadow Vista, California. Our staff raise support like the missionaries we serve.

This repository is the production website. The platform it describes is also being built in the open on the same principle.

## Stack

- **Next.js 16** — App Router, React Server Components, Turbopack dev
- **React 19**
- **TypeScript** — strict mode throughout
- **Tailwind CSS v4** — custom design tokens via CSS variables
- **shadcn/ui** — `base-maia` style, Base UI primitives for custom components
- **Lenis** — smooth scroll
- **motion/react** — animations with reduced-motion support
- **next-themes** — dark mode
- **Lucide React** — icons

## Pages

| Route | Description |
|---|---|
| `/` | Home — mission, philosophy, system capabilities |
| `/platform` | Platform overview — Mission Control modules |
| `/missions` | Role views for sending agency teams |
| `/specs` | Tech architecture, performance targets, release gates |
| `/manifesto` | Philosophy, design principles, organizational posture |
| `/join` | Pilot agencies, builders, and build supporters |
| `/give` | Support the build |
| `/contact` | General inquiry |
| `/statement-of-faith` | Theological foundation |
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |
| `/501c3` | 501(c)(3) disclosure |

## Project Structure

```
├── app/
│   ├── globals.css           # Design tokens, theme colors, surface variables
│   ├── layout.tsx            # Root layout with providers and metadata
│   ├── page.tsx              # Home page
│   ├── platform/page.tsx     # Platform and module overview
│   ├── missions/page.tsx     # Role views by team function
│   ├── specs/page.tsx        # Technical architecture
│   ├── manifesto/page.tsx    # Philosophy and organizational posture
│   └── ...                   # All other routes
├── components/
│   ├── header.tsx            # Site header with navigation
│   ├── footer.tsx            # Footer with link groups
│   ├── site/
│   │   ├── page.tsx          # PageHero, Section, SectionHeader
│   │   ├── media-stage.tsx   # Hero media display
│   │   ├── platform-tabs.tsx # Platform module tab interface
│   │   ├── inquiry-form.tsx  # Contact and waitlist forms
│   │   └── reveal.tsx        # Scroll-driven reveal animations
│   ├── react-bits/           # Motion and animation components
│   └── ui/                   # shadcn/ui component library
├── lib/
│   ├── config.ts             # ⭐ Site-wide config — edit here first
│   ├── metadata.ts           # SEO and Open Graph utilities
│   ├── motion.tsx            # Shared motion primitives
│   └── utils.ts              # Utility functions
└── public/
    ├── BG.jpg                # Hero background
    ├── dashboardmock.png     # Platform screenshot
    └── mock-logos/           # Placeholder organization logos
```

## Getting Started

**Requirements:** Node.js 22+, npm 10+

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

No `.env` file is required to run the site locally.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server (Turbopack, port 3000) |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript checks |
| `npm run format` | Format with Prettier |

`npm run lint` and `npm run typecheck` are the primary correctness checks — there is no dedicated test suite.

## Configuration

**`lib/config.ts`** is the single source of truth for site-wide content: name, URL, email, CTAs, navigation links, and footer groups.

**`app/globals.css`** holds all design tokens: brand colors, surface variables, typography scale, and dark/light mode values.

## The Platform (what this site describes)

Asym replaces the fragmented agency stack with Mission Control: one login, one shared database, one operating surface.

**Core modules:**
- **Partners CRM** — Missions-built on Twenty CRM. Tracks churches, households, designations, and relationship history.
- **Contributions Hub** — Live transaction visibility, Stripe-native processing, reconciliation automation.
- **Web Studio** — Headless Next.js + Directus CMS so agencies control their sites without change-order lock-in.
- **Email Studio** — Branded receipts, password resets, and campaign emails with full ownership.
- **Statements Studio** — Year-end tax documents and receipt packs generated automatically.
- **Mobilize** — Visual workflow orchestration from candidate interest to field deployment via Zapier.

**Supporting modules:** Donor Support Hub (Chatwoot CE), Sign Studio (Documenso CE), Report Studio, Automations, Member Care, Events & Gatherings.

**Full stack:** TypeScript · Next.js · NestJS · PostgreSQL · Redis · Twenty CRM · Directus · Chatwoot CE · Documenso CE · Supabase Auth · Stripe · SendGrid · Zapier · Inngest · Vercel · OpenTelemetry

## Contributing

This project is open source as part of Asym's commitment to tenant sovereignty and transparent architecture. We welcome engineers, designers, and systems thinkers who want to use their craft for the Great Commission.

- Review open issues before starting new work
- Follow the existing `app/`, `components/`, and `lib/` placement patterns
- Keep `lib/config.ts` as the content configuration source of truth
- Run `npm run lint` and `npm run typecheck` before submitting a PR
- Preserve server/client component boundaries — avoid broad refactors to client components without a clear reason

## Deployment

Deployed to Vercel. Production deploys trigger from `main`.

```bash
npm run build
```

Compatible with Vercel, Netlify, Cloudflare Pages, and any Node.js-compatible host.

## License

See [LICENSE](./LICENSE). This repository includes React Bits Pro components under a commercial license — see that file for permitted use terms.

---

**Minimize Clicks. Maximize Ministry.**

[asymmetric.al](https://asymmetric.al) · [info@asymmetric.al](mailto:info@asymmetric.al) · [Global Fellowship Inc.](https://asymmetric.al/501c3)
