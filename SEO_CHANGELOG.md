# SEO Changelog

## Architecture Kept

- Reused the existing SEO system instead of introducing a new one:
  - `lib/metadata.ts`
  - route-level `metadata` exports in `app/(app)/**/page.tsx`
  - `app/sitemap.ts`
  - `app/opengraph-image.tsx`
- Canonical generation still flows through `createMetadata()`.

## New Or Refreshed Indexable Pages

| Route | SEO intent | Change |
| --- | --- | --- |
| `/` | Brand + category page | New category line, refreshed title/description, updated OG image copy, `NGO` + `WebSite` JSON-LD |
| `/platform` | Product detail / mission software | Unique metadata aligned to donor care, missionary support, and operations |
| `/about` | Brand story / trust / faith | New indexable route with unique metadata |
| `/faq` | Trust / objections / waitlist questions | New indexable route with unique metadata + `FAQPage` JSON-LD |
| `/waitlist` | Conversion / branded waitlist | New indexable route with unique metadata |
| `/open-source-and-trust` | Trust / stewardship / transparency | New indexable route with unique metadata |
| `/missions` | Audience page | Refreshed metadata to align with current message |
| `/specs` | Product trust / technical clarity | Refreshed metadata to align with current message |
| `/manifesto` | Philosophy / mission posture | Refreshed metadata to align with current message |
| `/contact` | Mission tech stack audit / general inquiry | Refreshed metadata without changing form behavior |
| `/give` | Ways to Give | Refreshed metadata while preserving checkout flow |
| `/statement-of-faith` | Faith / doctrine / trust | Refreshed metadata while preserving doctrine |
| `/501c3` | Financials / nonprofit covering | Refreshed metadata while preserving route |
| `/join` | Recruiting | Refreshed metadata while keeping it separate from the public CTA flow |

## Noindex And Utility Handling

- `/give/success` now explicitly uses page-level `noIndex` metadata.
- Payload admin routes now inherit `noindex, nofollow` from `app/(payload)/layout.tsx`.
- `/qa/error` remains non-indexable.
- Utility/admin/API routes were kept out of sitemap coverage.
- Robots handling stayed simple; exclusion is enforced at the page metadata level where needed.

## Sitemap Changes

- Added the new marketing routes to `app/sitemap.ts`:
  - `/about`
  - `/faq`
  - `/waitlist`
  - `/open-source-and-trust`
- Preserved existing public routes already intended for discovery.
- Excluded utility/admin/API surfaces.

## Open Graph And Social Metadata

- Refreshed `app/opengraph-image.tsx` to remove the retired `Less admin. More ministry.` line.
- Brought the OG copy in line with:
  - `The operating system for Christian missions`
  - `One mission-built system for donor care, missionary support, and operations.`

## Internal Linking Improvements

- Homepage now points users into the updated product, waitlist, and trust paths without changing layout behavior.
- FAQ now links directly to `/platform#portal-walkthrough`.
- About now links to:
  - `/statement-of-faith`
  - `/open-source-and-trust`
  - `/manifesto`
- Footer now surfaces:
  - About
  - FAQ
  - Open Source and Trust
  - Statement of Faith
  - Financials
  - Waitlist

## Phrase Cleanup With SEO Impact

- Removed the retired `Less admin. More ministry.` line from live brand surfaces.
- Removed the leftover `See the platform` CTA language.
- Removed the older disconnected-stack phrasing called out in the implementation brief where it appeared in current public copy.
