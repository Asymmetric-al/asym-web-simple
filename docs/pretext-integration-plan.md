# Pretext Integration Plan

## Summary

This repository is a single Next.js 16.2.0 App Router marketing site with a Payload-backed admin area, not a monorepo and not a text-heavy content product. Pretext should be introduced only where text length is a real layout constraint, not where static authored copy already behaves well with CSS.

The first rollout is intentionally narrow:

- Add a shared `lib/text-layout` wrapper so raw Pretext does not leak into app code.
- Ship one client-only enhancement for the Platform route tab triggers in [components/site/platform-tabs.tsx](C:/Users/Conrad/Documents/GitHub/asym-web/components/site/platform-tabs.tsx).
- Keep the existing `min-h-[9rem]` CSS floor as the server-safe fallback.

## Repo Audit

### Rendering model

- Framework: Next.js `16.2.0`
- Router: App Router
- Route groups:
  - [app/(app)](C:/Users/Conrad/Documents/GitHub/asym-web/app/(app))
  - [app/(payload)](C:/Users/Conrad/Documents/GitHub/asym-web/app/(payload))
- Package manager declaration: `bun@1.3.11`
- Current scripts:
  - `npm run dev`
  - `npm run lint`
  - `npm run typecheck`
  - `npm run build`
  - Playwright QA scripts under `qa:*`
- Shared packages: none
- Monorepo tooling: none
- RSC boundary shape:
  - Most pages/layouts are Server Components.
  - Client islands include [components/site/platform-tabs.tsx](C:/Users/Conrad/Documents/GitHub/asym-web/components/site/platform-tabs.tsx), forms, motion helpers, header/theme components, and a few marketing interactions.

### Design and typography findings

- Canonical design source: [DESIGN.md](C:/Users/Conrad/Documents/GitHub/asym-web/DESIGN.md)
- Font loading source: [app/layout.tsx](C:/Users/Conrad/Documents/GitHub/asym-web/app/layout.tsx)
  - Heading: Plus Jakarta Sans
  - Body: Inter
  - Mono: JetBrains Mono
- Tokens source: [app/globals.css](C:/Users/Conrad/Documents/GitHub/asym-web/app/globals.css)
- Relevant text utilities:
  - `.text-balance`
  - `.text-pretty`
  - `.text-resilient`
- Repeated surface primitives:
  - [components/ui/card.tsx](C:/Users/Conrad/Documents/GitHub/asym-web/components/ui/card.tsx)
  - [components/site/page.tsx](C:/Users/Conrad/Documents/GitHub/asym-web/components/site/page.tsx)
  - [components/site/platform-tabs.tsx](C:/Users/Conrad/Documents/GitHub/asym-web/components/site/platform-tabs.tsx)

### Pretext findings

- Upstream repo: [chenglou/pretext](https://github.com/chenglou/pretext)
- Current public package version: `0.0.4`
- Current tag: `v0.0.4`
- GitHub releases: none
- Verified public API:
  - `prepare()`
  - `layout()`
  - `prepareWithSegments()`
  - `layoutWithLines()`
  - `walkLineRanges()`
  - `layoutNextLine()`
  - `layoutNextLineRange()`
  - `measureLineStats()`
  - `measureNaturalWidth()`
- Current caveats:
  - Pretext is still young.
  - `prepare()` depends on `OffscreenCanvas` or DOM canvas.
  - README still positions server-side support as future-facing.
  - `system-ui` remains unsafe for accuracy on macOS.

## Route and Surface Inventory

| Route / Surface | Files | Notes | Decision |
|---|---|---|---|
| Home hero and home marketing cards | [app/(app)/page.tsx](C:/Users/Conrad/Documents/GitHub/asym-web/app/(app)/page.tsx), [components/site/home-page-hero.tsx](C:/Users/Conrad/Documents/GitHub/asym-web/components/site/home-page-hero.tsx) | Static authored copy, balanced headlines already used, no repeated dynamic preview feed | GO LATER |
| Platform module tab triggers | [app/(app)/platform/page.tsx](C:/Users/Conrad/Documents/GitHub/asym-web/app/(app)/platform/page.tsx), [components/site/platform-tabs.tsx](C:/Users/Conrad/Documents/GitHub/asym-web/components/site/platform-tabs.tsx) | Repeated client-side card triggers with variable title + summary height; existing `min-h-[9rem]` is a rough guard | GO |
| Platform supporting module cards | [app/(app)/platform/page.tsx](C:/Users/Conrad/Documents/GitHub/asym-web/app/(app)/platform/page.tsx) | Static grid cards; visually acceptable today | GO LATER |
| Missions audience and impact cards | [app/(app)/missions/page.tsx](C:/Users/Conrad/Documents/GitHub/asym-web/app/(app)/missions/page.tsx) | Static server-rendered cards, no current instability | GO LATER |
| Specs layer and target cards | [app/(app)/specs/page.tsx](C:/Users/Conrad/Documents/GitHub/asym-web/app/(app)/specs/page.tsx) | Repeated cards but static authored content | GO LATER |
| Join / Contact / Give info cards | [app/(app)/join/page.tsx](C:/Users/Conrad/Documents/GitHub/asym-web/app/(app)/join/page.tsx), [app/(app)/contact/page.tsx](C:/Users/Conrad/Documents/GitHub/asym-web/app/(app)/contact/page.tsx), [app/(app)/give/page.tsx](C:/Users/Conrad/Documents/GitHub/asym-web/app/(app)/give/page.tsx) | Repeated marketing/support cards; CSS is sufficient | GO LATER |
| Manifesto section cards | [app/(app)/manifesto/page.tsx](C:/Users/Conrad/Documents/GitHub/asym-web/app/(app)/manifesto/page.tsx) | Long-form authored statements, but not preview cards | GO LATER |
| Statement of faith article cards | [app/(app)/statement-of-faith/page.tsx](C:/Users/Conrad/Documents/GitHub/asym-web/app/(app)/statement-of-faith/page.tsx) | Static legal/doctrinal content cards | GO LATER |
| FAQ accordion answers | [app/(app)/give/page.tsx](C:/Users/Conrad/Documents/GitHub/asym-web/app/(app)/give/page.tsx), [components/ui/accordion.tsx](C:/Users/Conrad/Documents/GitHub/asym-web/components/ui/accordion.tsx) | Accordion height already handled by Base UI; replacing that path is risky | GO LATER |
| Shared page heroes | [components/site/page.tsx](C:/Users/Conrad/Documents/GitHub/asym-web/components/site/page.tsx) | Headline fitting is interesting, but current authored headlines are short and `text-balance` already helps | GO LATER |
| Navigation and footer | [components/header.tsx](C:/Users/Conrad/Documents/GitHub/asym-web/components/header.tsx), [components/footer.tsx](C:/Users/Conrad/Documents/GitHub/asym-web/components/footer.tsx) | Not a text-layout problem | NO GO |
| Forms and inquiry flows | [components/site/inquiry-form.tsx](C:/Users/Conrad/Documents/GitHub/asym-web/components/site/inquiry-form.tsx) | Form UX, not text-led layout | NO GO |
| Full document shells and legal content | [components/site/document-page.tsx](C:/Users/Conrad/Documents/GitHub/asym-web/components/site/document-page.tsx) | Full-body content is not the v1 target | NO GO |
| Payload admin and API routes | [app/(payload)](C:/Users/Conrad/Documents/GitHub/asym-web/app/(payload)), [app/api](C:/Users/Conrad/Documents/GitHub/asym-web/app/api) | Admin/editor and server APIs | NO GO |

## Verified GO / GO LATER / NO GO

### GO

- [components/site/platform-tabs.tsx](C:/Users/Conrad/Documents/GitHub/asym-web/components/site/platform-tabs.tsx)
  - Reason: client component already, repeated cardified list, visible height rhythm issue, existing manual `min-h` guard.

### GO LATER

- [app/(app)/page.tsx](C:/Users/Conrad/Documents/GitHub/asym-web/app/(app)/page.tsx)
- [app/(app)/platform/page.tsx](C:/Users/Conrad/Documents/GitHub/asym-web/app/(app)/platform/page.tsx)
- [app/(app)/missions/page.tsx](C:/Users/Conrad/Documents/GitHub/asym-web/app/(app)/missions/page.tsx)
- [app/(app)/specs/page.tsx](C:/Users/Conrad/Documents/GitHub/asym-web/app/(app)/specs/page.tsx)
- [app/(app)/join/page.tsx](C:/Users/Conrad/Documents/GitHub/asym-web/app/(app)/join/page.tsx)
- [app/(app)/contact/page.tsx](C:/Users/Conrad/Documents/GitHub/asym-web/app/(app)/contact/page.tsx)
- [app/(app)/give/page.tsx](C:/Users/Conrad/Documents/GitHub/asym-web/app/(app)/give/page.tsx)
- [app/(app)/manifesto/page.tsx](C:/Users/Conrad/Documents/GitHub/asym-web/app/(app)/manifesto/page.tsx)
- [app/(app)/statement-of-faith/page.tsx](C:/Users/Conrad/Documents/GitHub/asym-web/app/(app)/statement-of-faith/page.tsx)
- [components/site/page.tsx](C:/Users/Conrad/Documents/GitHub/asym-web/components/site/page.tsx)
- [components/site/home-page-hero.tsx](C:/Users/Conrad/Documents/GitHub/asym-web/components/site/home-page-hero.tsx)
- [components/ui/accordion.tsx](C:/Users/Conrad/Documents/GitHub/asym-web/components/ui/accordion.tsx)

Revisit when at least one of these becomes true:

- content is CMS-authored or user-authored
- copy becomes localized
- card height instability becomes visible in QA
- a future search/feed/sidebar surface introduces real preview-card behavior

### NO GO

- [components/header.tsx](C:/Users/Conrad/Documents/GitHub/asym-web/components/header.tsx)
- [components/footer.tsx](C:/Users/Conrad/Documents/GitHub/asym-web/components/footer.tsx)
- [components/site/inquiry-form.tsx](C:/Users/Conrad/Documents/GitHub/asym-web/components/site/inquiry-form.tsx)
- [components/site/document-page.tsx](C:/Users/Conrad/Documents/GitHub/asym-web/components/site/document-page.tsx)
- [app/(payload)](C:/Users/Conrad/Documents/GitHub/asym-web/app/(payload))
- [app/api](C:/Users/Conrad/Documents/GitHub/asym-web/app/api)

These become revisit candidates only if the product itself changes shape materially.

## Rollout Order

1. Add this integration document.
2. Add `@chenglou/pretext` pinned to `0.0.4`.
3. Create `lib/text-layout` wrapper and README.
4. Add wrapper-level tests.
5. Integrate the client-only enhancement into [components/site/platform-tabs.tsx](C:/Users/Conrad/Documents/GitHub/asym-web/components/site/platform-tabs.tsx).
6. Add or update integration coverage for `/platform`.
7. Re-run lint, typecheck, build, and targeted Playwright coverage.

## SSR / Hydration / Fallback Strategy

- Do not run Pretext during SSR.
- Do not let Pretext determine first paint correctness.
- Keep the server-rendered `min-h-[9rem]` trigger floor.
- Enhance only after:
  - browser capability checks pass
  - fonts are ready
  - trigger width is known
- If enhancement fails:
  - triggers still render
  - tab switching still works
  - CSS floor remains active

## Risks

- Pretext does not model `hyphens: auto`, while `.text-resilient` currently enables it. Measured surfaces should avoid hyphenation on the enhanced text blocks so browser wrapping and Pretext wrapping stay aligned.
- Measurement can drift if font shorthand and line-height are not read from actual DOM styles.
- Repeated `prepare()` calls inside render would defeat the point of Pretext. The wrapper needs a prepare cache.

## Future Revisit Criteria

Revisit GO LATER surfaces when:

- copy source becomes variable enough that CSS balancing no longer holds
- a feed/search/updates surface is added
- visual snapshots start showing card height instability across routes
- the app introduces preview cards backed by Payload content

Until then, the durable move is to keep Pretext narrow, explicit, and easy to remove.
