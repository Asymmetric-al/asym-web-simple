# Copy Rollout Report

## Scope

- Repository used: `Asymmetric-al/asym-web` only
- External written inputs used:
  - `C:\Users\Conrad\Downloads\asym_messaging_system_v3.md`
  - `C:\Users\Conrad\Downloads\asym_website_plan_asymweb_only_v5.md`
- No other repo, app, or prior implementation was used as a source of truth.

## Files Changed

### Source Files

- `lib/config.ts`
- `lib/metadata.ts`
- `components/header.tsx`
- `components/footer.tsx`
- `components/site/inquiry-form.tsx`
- `components/site/platform-tabs.tsx`
- `components/theme-toggle.tsx`
- `app/opengraph-image.tsx`
- `app/sitemap.ts`
- `app/(app)/page.tsx`
- `app/(app)/platform/page.tsx`
- `app/(app)/missions/page.tsx`
- `app/(app)/specs/page.tsx`
- `app/(app)/manifesto/page.tsx`
- `app/(app)/join/page.tsx`
- `app/(app)/contact/page.tsx`
- `app/(app)/give/page.tsx`
- `app/(app)/give/success/page.tsx`
- `app/(app)/statement-of-faith/page.tsx`
- `app/(app)/501c3/page.tsx`
- `app/(app)/terms/page.tsx`
- `app/(app)/about/page.tsx`
- `app/(app)/faq/page.tsx`
- `app/(app)/waitlist/page.tsx`
- `app/(app)/open-source-and-trust/page.tsx`
- `tests/fixtures/routes.ts`

### Rollout Artifacts

- `WEBSITE_COPY_FILE_MAP.md`
- `SEO_CHANGELOG.md`
- `COPY_ROLLOUT_REPORT.md`
- `STRING_MAP.md`
- `COPY_SOURCE_MAP.md`
- `SEO_SOURCE_MAP.md`
- `RISK_LIST.md`
- `docs/screenshots/copy-rollout-v5/before/*.png`
- `docs/screenshots/copy-rollout-v5/after/*.png`

### Visual Baselines Updated

- `tests/visual/routes.spec.ts-snapshots/{about,faq,open-source-and-trust,waitlist}-{light,dark}-{chromium,mobile-chrome}-win32.png`
- `tests/visual/routes.spec.ts-snapshots/{home,platform,missions,specs,manifesto,join,contact,give,statement-of-faith,501c3,terms,privacy}-{light,dark}-{chromium,mobile-chrome}-win32.png`

## Routes Affected

- `/`
- `/platform`
- `/about`
- `/faq`
- `/waitlist`
- `/open-source-and-trust`
- `/missions`
- `/specs`
- `/manifesto`
- `/join`
- `/contact`
- `/give`
- `/give/success`
- `/statement-of-faith`
- `/501c3`
- `/terms`

## Summary Of Copy Changes

- Reset the main public story to Asym as:
  - `The operating system for Christian missions`
  - `One mission-built system for donor care, missionary support, and operations.`
- Reworked the homepage into the full V5 narrative order:
  - hero with visible CTA hierarchy
  - explicit problem section
  - guide and trust section
  - product section
  - how-to-get-started section
  - success / stakes section
  - lower managed-support section
  - final CTA section
- Kept the public site waitlist-first:
  - primary CTA: `Join the Waitlist`
  - secondary CTA: `Get the Mission Tech Stack Audit`
  - trust CTA: `See the Donor and Missionary Portal Walkthrough`
- Rewrote `/platform` around the current product framing:
  - Mission Control
  - donor self-service
  - missionary dashboard
  - statements and reporting
  - ownership and trust
  - optional managed support
- Added the managed offer as a lower-priority layer:
  - `Managed Donor Care + Ops`
- Added dedicated public pages for:
  - About
  - FAQ
  - Waitlist
  - Open Source and Trust
- Kept Christian faith visible across:
  - About
  - Statement of Faith
  - footer trust surfaces
  - trust-oriented supporting copy
- Added calm open-source trust language without making contribution sound technical or mandatory.
- Rewrote `Statement of Faith` into a plainer V5-style public trust page while keeping the doctrine intact.
- Reframed `/contact` around audit/general inquiry while preserving the current form/API flow.
- Reframed `/501c3` as a clearer financials/nonprofit trust surface while keeping the existing route.
- Normalized remaining off-tone mission-facing copy on `/missions` and the footer.

## Phrases Removed Or Replaced

- Removed `Less admin. More ministry.` from config, homepage, and OG surfaces.
- Removed leftover `See the platform` CTA copy.
- Removed the old disconnected-stack phrasing called out in the brief where it existed in the public pages touched by this rollout.
- Removed `Close the gap between Silicon Valley innovation and the Great Commission.` from `/missions`.
- Removed `We use technology to serve the servants.` from `/missions`.
- Removed `Soli Deo Gloria.` from the public footer copy.
- Did not reintroduce the banned framing around `one person who knows`, `operational spine`, or `servant-first system`.

## New Pages Or Sections Added

- New route: `/about`
- New route: `/faq`
- New route: `/waitlist`
- New route: `/open-source-and-trust`
- New lower-page managed-offer section on `/`
- New `#portal-walkthrough` trust section on `/platform`
- New explicit audit handoff artifacts:
  - `STRING_MAP.md`
  - `COPY_SOURCE_MAP.md`
  - `SEO_SOURCE_MAP.md`
  - `RISK_LIST.md`

## SEO Changes Made

- Refreshed unique titles and descriptions across the changed marketing pages.
- Preserved canonical handling through `createMetadata()`.
- Updated `app/sitemap.ts` to cover the new indexable routes.
- Added explicit `noIndex` handling to `/give/success`.
- Added repo-owned `noindex, nofollow` metadata to the Payload admin subtree in `app/(payload)/layout.tsx`.
- Refreshed `app/opengraph-image.tsx`.
- Added homepage JSON-LD for `NGO` and `WebSite`.
- Added FAQ JSON-LD on `/faq`.
- Expanded trust-oriented internal linking between About, FAQ, Platform, Waitlist, Statement of Faith, Open Source and Trust, and Financials.

## QA Results

- `npm run lint`: pass
- `npm run typecheck`: pass
- `npm run build`: pass
- `npm run qa:smoke`: pass
- `npm run qa:a11y`: pass
- `npm run qa:visual:update`: pass
- `npm run qa:visual`: pass
- `npx playwright test tests/e2e/responsive.spec.ts --project=chromium`: pass
- Final phrase sweep for retired phrases: clean

## Copy Shortened Or Adjusted For Layout Fit

- Homepage hero display sizing was reduced to avoid an orphaned line in the main headline.
- FAQ secondary CTA was routed to `/platform#portal-walkthrough` with the requested trust framing instead of using the shorter but outdated platform label.
- Platform hero and tab-trigger copy were tuned to keep trigger heights stable through the responsive stress suite.

## Ambiguities And Lowest-Risk Choices

- `/501c3` was kept as the public route instead of renaming it to `/financials`; copy and metadata now make the purpose clearer without breaking links.
- The waitlist form did not receive a managed-support checkbox because `app/api/contact/route.ts` does not currently accept extra waitlist fields; the managed offer stayed in copy only.
- The recruiting route `/join` stayed live and intact, but it was removed from the primary public CTA path.
- Payload admin remained on the existing route structure; index exclusion was handled through metadata rather than a routing change.

## Leadership Review Items

- Confirm whether `/501c3` should eventually receive a public alias or redirect such as `/financials`; this rollout intentionally preserved the current route.
- Confirm whether the managed-offer name should remain exactly `Managed Donor Care + Ops` across future collateral.
- Confirm whether `/manifesto` should remain a standalone public philosophy page long-term or eventually fold into About; it remains live and linked.
- Confirm whether the waitlist page should remain indexable long-term; it is currently treated as an indexable marketing page per the implementation brief.

## Screenshots Before / After

- Home:
  - `docs/screenshots/copy-rollout-v5/before/home.png`
  - `docs/screenshots/copy-rollout-v5/after/home.png`
- Platform:
  - `docs/screenshots/copy-rollout-v5/before/platform.png`
  - `docs/screenshots/copy-rollout-v5/after/platform.png`
- Missions:
  - `docs/screenshots/copy-rollout-v5/before/missions.png`
  - `docs/screenshots/copy-rollout-v5/after/missions.png`
- Specs:
  - `docs/screenshots/copy-rollout-v5/before/specs.png`
  - `docs/screenshots/copy-rollout-v5/after/specs.png`
- Manifesto:
  - `docs/screenshots/copy-rollout-v5/before/manifesto.png`
  - `docs/screenshots/copy-rollout-v5/after/manifesto.png`
- Join:
  - `docs/screenshots/copy-rollout-v5/before/join.png`
  - `docs/screenshots/copy-rollout-v5/after/join.png`
- Contact:
  - `docs/screenshots/copy-rollout-v5/before/contact.png`
  - `docs/screenshots/copy-rollout-v5/after/contact.png`
- Give:
  - `docs/screenshots/copy-rollout-v5/before/give.png`
  - `docs/screenshots/copy-rollout-v5/after/give.png`
- Statement of Faith:
  - `docs/screenshots/copy-rollout-v5/before/statement-of-faith.png`
  - `docs/screenshots/copy-rollout-v5/after/statement-of-faith.png`
- Financials:
  - `docs/screenshots/copy-rollout-v5/before/financials.png`
  - `docs/screenshots/copy-rollout-v5/after/financials.png`
- About:
  - `docs/screenshots/copy-rollout-v5/before/about.png`
  - `docs/screenshots/copy-rollout-v5/after/about.png`
- FAQ:
  - `docs/screenshots/copy-rollout-v5/before/faq.png`
  - `docs/screenshots/copy-rollout-v5/after/faq.png`
- Waitlist:
  - `docs/screenshots/copy-rollout-v5/before/waitlist.png`
  - `docs/screenshots/copy-rollout-v5/after/waitlist.png`
- Open Source and Trust:
  - `docs/screenshots/copy-rollout-v5/before/open-source-and-trust.png`
  - `docs/screenshots/copy-rollout-v5/after/open-source-and-trust.png`

## Breaking-Change Check

- No routes were removed.
- No existing API behavior was changed.
- No form submission logic was changed.
- No checkout logic was changed.
- No digital-signature logic was changed.
- No redesign or interaction-model change was introduced.
