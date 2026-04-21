# Copy Source Map

## Global Sources

| Area | File | Source type | Notes |
| --- | --- | --- | --- |
| Site identity, category line, CTAs | `lib/config.ts` | Global config | Primary source for site-wide labels and CTA destinations |
| Header navigation | `components/header.tsx` | Shared component copy | Pulls from `lib/config.ts` for links and CTA labels |
| Footer trust and sitemap copy | `components/footer.tsx` | Shared component copy | Footer-specific copy lives inline here |
| Shared form microcopy | `components/site/inquiry-form.tsx` | Shared component copy | Reused by `/contact` and `/waitlist` |
| Shared platform tab copy | `components/site/platform-tabs.tsx` | Shared component copy | Structural behavior here; tab content seeded from route-local arrays |

## Route-Local Sources

| Route | File | Source type | Notes |
| --- | --- | --- | --- |
| `/` | `app/(app)/page.tsx` | Inline route copy | Homepage narrative, trust bar, managed offer, final CTA |
| `/platform` | `app/(app)/platform/page.tsx` | Inline route copy | Product framing, false-choice section, trust and managed support |
| `/about` | `app/(app)/about/page.tsx` | Inline route copy | About narrative, faith posture, trust links |
| `/faq` | `app/(app)/faq/page.tsx` | Inline route copy | Public objections, operational questions, FAQ JSON-LD text |
| `/waitlist` | `app/(app)/waitlist/page.tsx` | Inline route copy | Waitlist framing around existing form |
| `/open-source-and-trust` | `app/(app)/open-source-and-trust/page.tsx` | Inline route copy | Open-source posture, supported-product framing, trust links |
| `/missions` | `app/(app)/missions/page.tsx` | Inline route copy | Missions-specific framing and origin story |
| `/specs` | `app/(app)/specs/page.tsx` | Inline route copy | Technical trust narrative and architecture copy |
| `/statement-of-faith` | `app/(app)/statement-of-faith/page.tsx` | Inline route copy | Public doctrinal summary and trust framing |
| `/501c3` | `app/(app)/501c3/page.tsx` | Inline route copy | Financials and nonprofit-covering disclosures |

## Utility And Excluded Sources

| Area | File | Source type | Notes |
| --- | --- | --- | --- |
| Contact API | `app/api/contact/route.ts` | Utility behavior | Submission contract intentionally unchanged |
| Payload admin | `app/(payload)/**` | Utility/admin | Not part of public marketing copy |
