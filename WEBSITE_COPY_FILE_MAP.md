# Website Copy File Map

## Audit Summary

- Framework: Next.js 16 App Router
- Primary marketing route group: `app/(app)`
- Global copy/config sources: `lib/config.ts`, `components/header.tsx`, `components/footer.tsx`, `components/site/inquiry-form.tsx`
- Shared product-copy component: `components/site/platform-tabs.tsx`
- SEO sources: `lib/metadata.ts`, route-level `metadata` exports in `app/(app)/**/page.tsx`, `app/sitemap.ts`, `app/opengraph-image.tsx`
- Utility routes kept outside the marketing rollout: `app/(payload)/**`, `app/api/**`, `app/qa/error/page.tsx`

## Route Inventory

| Route | File path | Component | Public or utility | Copy source | Metadata source | CTA source | Edited | Priority |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/` | `app/(app)/page.tsx` | `HomePage` | Public | Inline page copy + `lib/config.ts` | Route `metadata` via `createMetadata()` + homepage JSON-LD + `app/opengraph-image.tsx` | Inline hero actions + `lib/config.ts` | Yes | High |
| `/platform` | `app/(app)/platform/page.tsx` | `PlatformPage` | Public | Inline page copy + `components/site/platform-tabs.tsx` | Route `metadata` via `createMetadata()` | Inline page actions | Yes | High |
| `/about` | `app/(app)/about/page.tsx` | `AboutPage` | Public | Inline page copy | Route `metadata` via `createMetadata()` | Inline page actions | Yes | High |
| `/faq` | `app/(app)/faq/page.tsx` | `FAQPage` | Public | Inline page copy | Route `metadata` via `createMetadata()` + FAQ JSON-LD | Inline page actions | Yes | High |
| `/waitlist` | `app/(app)/waitlist/page.tsx` | `WaitlistPage` | Public | Inline page copy + `components/site/inquiry-form.tsx` | Route `metadata` via `createMetadata()` | Inline page actions + `InquiryForm kind="waitlist"` | Yes | High |
| `/open-source-and-trust` | `app/(app)/open-source-and-trust/page.tsx` | `OpenSourceAndTrustPage` | Public | Inline page copy | Route `metadata` via `createMetadata()` | Inline page actions | Yes | High |
| `/missions` | `app/(app)/missions/page.tsx` | `MissionsPage` | Public | Inline page copy | Route `metadata` via `createMetadata()` | Inline page actions | Yes | Medium |
| `/specs` | `app/(app)/specs/page.tsx` | `SpecsPage` | Public | Inline page copy | Route `metadata` via `createMetadata()` | Inline page actions | Yes | Medium |
| `/manifesto` | `app/(app)/manifesto/page.tsx` | `ManifestoPage` | Public | Inline page copy | Route `metadata` via `createMetadata()` | Inline page actions | Yes | Medium |
| `/contact` | `app/(app)/contact/page.tsx` | `ContactPage` | Public | Inline page copy + `components/site/inquiry-form.tsx` | Route `metadata` via `createMetadata()` | Inline page actions + `InquiryForm kind="contact"` | Yes | Medium |
| `/give` | `app/(app)/give/page.tsx` | `GivePage` | Public | Inline page copy | Route `metadata` via `createMetadata()` | Inline page actions + existing giving flow | Yes | Medium |
| `/statement-of-faith` | `app/(app)/statement-of-faith/page.tsx` | `StatementOfFaithPage` | Public | Inline page copy | Route `metadata` via `createMetadata()` | Inline page actions | Yes | Medium |
| `/501c3` | `app/(app)/501c3/page.tsx` | `DisclosurePage` | Public | Inline page copy | Route `metadata` via `createMetadata()` | Inline page actions | Yes | Medium |
| `/join` | `app/(app)/join/page.tsx` | `JoinPage` | Public | Inline page copy | Route `metadata` via `createMetadata()` | Inline page actions | Yes | Low |
| `/privacy` | `app/(app)/privacy/page.tsx` | `PrivacyPage` | Public | Inline legal copy | Existing route metadata | Minimal internal links | No | Low |
| `/terms` | `app/(app)/terms/page.tsx` | `TermsPage` | Public | Inline legal copy | Existing route metadata | Minimal internal links | Yes | Low |
| `/give/success` | `app/(app)/give/success/page.tsx` | `GivePage` | Utility | Inline success copy | Route `metadata` via `createMetadata()` with `noIndex` | Existing checkout flow only | Yes | High |
| `/qa/error` | `app/qa/error/page.tsx` | `QaErrorHarnessPage` | Utility | Inline QA harness copy | Inline metadata with `noindex` | None | No | None |
| `/admin/[[...segments]]` | `app/(payload)/admin/[[...segments]]/page.tsx` | Payload admin page | Utility | Payload-managed admin shell | Payload/admin metadata | Payload/admin UI only | No | None |

## Related Route Handlers And Global Files

- `app/api/contact/route.ts`: waitlist/contact form behavior source, intentionally unchanged
- `lib/config.ts`: site description, nav links, footer links, primary and secondary public CTAs
- `components/header.tsx`: navigation labels and mobile nav heading
- `components/footer.tsx`: footer link architecture and trust surfaces
- `components/site/inquiry-form.tsx`: shared form microcopy for `/contact` and `/waitlist`
- `lib/metadata.ts`: canonical/title/description helper shared by route metadata
- `app/sitemap.ts`: indexable route coverage
- `app/opengraph-image.tsx`: shared OG image copy
