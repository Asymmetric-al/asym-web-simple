# SEO Source Map

## Shared SEO Sources

| Concern | File | Notes |
| --- | --- | --- |
| Base metadata defaults | `lib/metadata.ts` | Canonical generation, OG/Twitter defaults, keyword set |
| Sitewide robots file | `app/robots.ts` | Allows public pages, disallows `/api/` and `/admin` |
| Sitemap coverage | `app/sitemap.ts` | Includes indexable marketing routes only |
| Shared OG image | `app/opengraph-image.tsx` | Brand/category copy for social cards |
| Admin noindex | `app/(payload)/layout.tsx` | Repo-owned `robots: noindex, nofollow` for payload subtree |

## Route-Level SEO Sources

| Route | Metadata source | Structured data | Indexing note |
| --- | --- | --- | --- |
| `/` | `app/(app)/page.tsx` via `createMetadata()` | `NGO`, `WebSite` | Indexable |
| `/platform` | `app/(app)/platform/page.tsx` via `createMetadata()` | None | Indexable |
| `/about` | `app/(app)/about/page.tsx` via `createMetadata()` | None | Indexable |
| `/faq` | `app/(app)/faq/page.tsx` via `createMetadata()` | `FAQPage` | Indexable |
| `/waitlist` | `app/(app)/waitlist/page.tsx` via `createMetadata()` | None | Indexable |
| `/open-source-and-trust` | `app/(app)/open-source-and-trust/page.tsx` via `createMetadata()` | None | Indexable |
| `/missions` | `app/(app)/missions/page.tsx` via `createMetadata()` | None | Indexable |
| `/specs` | `app/(app)/specs/page.tsx` via `createMetadata()` | None | Indexable |
| `/manifesto` | `app/(app)/manifesto/page.tsx` via `createMetadata()` | None | Indexable |
| `/contact` | `app/(app)/contact/page.tsx` via `createMetadata()` | None | Indexable |
| `/give` | `app/(app)/give/page.tsx` via `createMetadata()` | None | Indexable |
| `/statement-of-faith` | `app/(app)/statement-of-faith/page.tsx` via `createMetadata()` | None | Indexable |
| `/501c3` | `app/(app)/501c3/page.tsx` via `createMetadata()` | None | Indexable |
| `/give/success` | `app/(app)/give/success/page.tsx` via `createMetadata({ noIndex: true })` | None | Explicit `noindex` |

## Remaining SEO Review Surface

| Area | Current status |
| --- | --- |
| `/waitlist` indexability | Intentionally left indexable pending leadership preference |
| Payload admin verification | Repo-owned noindex added; should still be spot-checked in deployed HTML |
