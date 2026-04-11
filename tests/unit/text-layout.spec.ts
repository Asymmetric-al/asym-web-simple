import { expect, test } from "@playwright/test";
import { resolvePlatformTabTriggerHeight } from "../../lib/text-layout/client";
import {
  buildMeasurementFont,
  platformTabMeasurementFonts,
  resolveMeasurementFamily,
} from "../../lib/text-layout/fonts";
import {
  canUseTextLayout,
  extractPlainTextExcerpt,
  platformTabTriggerPreset,
  waitForTextLayoutFontsReady,
} from "../../lib/text-layout";

test.describe("text layout wrapper", () => {
  test("extractPlainTextExcerpt collapses whitespace and trims the edges", () => {
    expect(
      extractPlainTextExcerpt(
        "  One\n\nsurface\tfor   finance,   mobilization.  "
      )
    ).toBe("One surface for finance, mobilization.");
  });

  test("extractPlainTextExcerpt preserves urls, emoji, and multilingual copy", () => {
    expect(
      extractPlainTextExcerpt(
        "AGI 春天到了.  بدأت الرحلة 🚀   https://example.com/reports?q=missions"
      )
    ).toBe(
      "AGI 春天到了. بدأت الرحلة 🚀 https://example.com/reports?q=missions"
    );
  });

  test("canUseTextLayout returns false without browser measurement APIs", () => {
    expect(canUseTextLayout()).toBe(false);
  });

  test("waitForTextLayoutFontsReady resolves immediately when document fonts are unavailable", async () => {
    await waitForTextLayoutFontsReady();
  });

  test("platformTabTriggerPreset keeps the existing 9rem css fallback floor", () => {
    expect(platformTabTriggerPreset.fallbackMinHeightPx).toBe(144);
  });

  test("platformTabTriggerPreset applies a 2px measurement safety buffer", () => {
    expect(platformTabTriggerPreset.measurementSafetyPx).toBe(2);
    expect(
      resolvePlatformTabTriggerHeight({
        measuredHeight: 145.1,
        fallbackMinHeightPx: platformTabTriggerPreset.fallbackMinHeightPx,
        measurementSafetyPx: platformTabTriggerPreset.measurementSafetyPx,
      })
    ).toBe(148);
  });

  test("buildMeasurementFont swaps generic ui stacks for named platform-tab fonts", () => {
    const measurementFamily = resolveMeasurementFamily({
      cssVariableValue: '"Plus Jakarta Sans", "Plus Jakarta Sans Fallback"',
      fontFamily: "ui-sans-serif, system-ui, sans-serif",
      fallbackFamily: platformTabMeasurementFonts.title.fallbackFamily,
    });
    const font = buildMeasurementFont(
      {
        font: "normal normal 600 18px / 28px var(--font-plus-jakarta), system-ui, sans-serif",
        fontStyle: "normal",
        fontVariant: "normal",
        fontWeight: "600",
        fontStretch: "normal",
        fontSize: "18px",
        lineHeight: "28px",
        fontFamily: "var(--font-plus-jakarta), system-ui, sans-serif",
      },
      measurementFamily
    );

    expect(font).toContain('"Plus Jakarta Sans"');
    expect(font).toContain('"Plus Jakarta Sans Fallback"');
    expect(font).toContain("18px / 28px");
    expect(font).not.toContain("system-ui");
  });

  test("platform tab trigger measurement never drops below the css fallback floor", () => {
    expect(
      resolvePlatformTabTriggerHeight({
        measuredHeight: 120,
        fallbackMinHeightPx: platformTabTriggerPreset.fallbackMinHeightPx,
        measurementSafetyPx: platformTabTriggerPreset.measurementSafetyPx,
      })
    ).toBe(platformTabTriggerPreset.fallbackMinHeightPx);
  });
});
