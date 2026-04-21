# Risk List

| Risk | Area | Status | Mitigation / note |
| --- | --- | --- | --- |
| Managed-support intent is not captured as a structured waitlist field | Waitlist/contact flow | Accepted | API contract was intentionally left unchanged; copy tells users to mention managed support in the note field |
| `/501c3` remains a technical URL name for the Financials page | Trust / IA | Open leadership review | Copy, metadata, and footer labeling now present it as Financials without breaking the existing route |
| `/waitlist` may or may not remain indexable long-term | SEO | Open leadership review | Currently indexable per the implementation brief and current sitemap strategy |
| Payload admin noindex depends on route-level metadata being honored in deployment | SEO / utility routes | Mitigated | Repo-owned `robots: noindex, nofollow` added in `app/(payload)/layout.tsx`; verify once deployed |
| Firefox/WebKit accessibility and visual suites are intentionally skipped by repo config | QA | Known | Chromium + mobile-chrome remain the enforced visual baseline; skipped coverage is unchanged from repo behavior |
