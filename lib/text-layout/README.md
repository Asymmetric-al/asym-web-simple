# Text Layout

This module is the only place in the app that talks directly to `@chenglou/pretext`.

## Scope

- Client-only enhancement layer
- Product-shaped APIs for measured teaser and card surfaces
- Safe fallback-first integration for the current marketing site

## Current exports

- `canUseTextLayout()`
- `waitForTextLayoutFontsReady()`
- `extractPlainTextExcerpt()`
- `measurePlatformTabTrigger()`
- `platformTabTriggerPreset`

## Guardrails

- Do not import `@chenglou/pretext` outside this folder.
- Do not use Pretext during SSR.
- Keep server-rendered CSS fallbacks in place for every enhanced surface.
- Read live size, weight, style, and line-height from the actual DOM, but resolve the family portion from the `next/font` variables before passing it to Pretext.
- Clamp shared card heights against the rendered copy stack if browser/font variance still exceeds the Pretext prediction at a given width.
