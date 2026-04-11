import type { PlatformTabTriggerElements, TextStyleSnapshot } from "./types";

export type MeasurementFontInput = {
  font: string;
  fontStyle: string;
  fontVariant: string;
  fontWeight: string;
  fontStretch: string;
  fontSize: string;
  lineHeight: string;
  fontFamily: string;
};

type MeasurementFontConfig = {
  variableName: string;
  fallbackFamily: string;
};

export const platformTabMeasurementFonts = {
  title: {
    variableName: "--font-plus-jakarta",
    fallbackFamily: '"Plus Jakarta Sans"',
  },
  summary: {
    variableName: "--font-inter",
    fallbackFamily: "Inter",
  },
} as const;

const genericFontFamilies = new Set([
  "serif",
  "sans-serif",
  "monospace",
  "cursive",
  "fantasy",
  "system-ui",
  "ui-serif",
  "ui-sans-serif",
  "ui-monospace",
  "ui-rounded",
  "math",
  "fangsong",
  "emoji",
  "fangsong",
]);

export function parsePixelValue(value: string): number {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function normalizeFontWhitespace(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function stripGenericFontFamilies(fontFamily: string): string {
  return fontFamily
    .split(",")
    .map((token) => token.trim())
    .filter((token) => {
      const normalizedToken = token.replace(/["']/g, "").trim().toLowerCase();
      return (
        normalizedToken.length > 0 && !genericFontFamilies.has(normalizedToken)
      );
    })
    .join(", ");
}

export function resolveMeasurementFamily(input: {
  cssVariableValue?: string;
  fontFamily: string;
  fallbackFamily: string;
}): string {
  const cssVariableFamily = stripGenericFontFamilies(
    input.cssVariableValue?.trim() ?? ""
  );

  if (cssVariableFamily.length > 0) {
    return cssVariableFamily;
  }

  const fontFamily = stripGenericFontFamilies(input.fontFamily);
  return fontFamily.length > 0 ? fontFamily : input.fallbackFamily;
}

export function buildMeasurementFont(
  input: MeasurementFontInput,
  measurementFamily?: string
): string {
  if (measurementFamily === undefined && input.font.length > 0) {
    return normalizeFontWhitespace(input.font);
  }

  const stretchPart =
    input.fontStretch.length > 0 && input.fontStretch !== "normal"
      ? ` ${input.fontStretch}`
      : "";
  const lineHeightPart =
    input.lineHeight.length > 0 && input.lineHeight !== "normal"
      ? ` / ${input.lineHeight}`
      : "";
  const fontFamily = measurementFamily ?? input.fontFamily;

  return normalizeFontWhitespace(
    `${input.fontStyle} ${input.fontVariant} ${input.fontWeight}${stretchPart} ${input.fontSize}${lineHeightPart} ${fontFamily}`
  );
}

export function readTextStyleSnapshot(
  element: HTMLElement,
  options: {
    measurementFont?: MeasurementFontConfig;
  } = {}
): TextStyleSnapshot {
  const styles = window.getComputedStyle(element);
  const measurementFamily =
    options.measurementFont === undefined
      ? undefined
      : resolveMeasurementFamily({
          cssVariableValue: styles.getPropertyValue(
            options.measurementFont.variableName
          ),
          fontFamily: styles.fontFamily,
          fallbackFamily: options.measurementFont.fallbackFamily,
        });
  const font = buildMeasurementFont(
    {
      font: styles.font,
      fontStyle: styles.fontStyle,
      fontVariant: styles.fontVariant,
      fontWeight: styles.fontWeight,
      fontStretch: styles.fontStretch,
      fontSize: styles.fontSize,
      lineHeight: styles.lineHeight,
      fontFamily: styles.fontFamily,
    },
    measurementFamily
  );
  const lineHeight =
    parsePixelValue(styles.lineHeight) ||
    Math.ceil(parsePixelValue(styles.fontSize) * 1.2);

  return { font, lineHeight };
}

export function readPlatformTabTriggerChrome(
  elements: PlatformTabTriggerElements
): {
  copyWidth: number;
  copyHeight: number;
  borderTop: number;
  borderBottom: number;
  paddingTop: number;
  paddingBottom: number;
  tagHeight: number;
  titleMarginTop: number;
  summaryMarginTop: number;
} {
  const triggerStyles = window.getComputedStyle(elements.trigger);
  const titleStyles = window.getComputedStyle(elements.title);
  const summaryStyles = window.getComputedStyle(elements.summary);

  return {
    copyWidth: Math.max(1, Math.floor(elements.copy.clientWidth)),
    copyHeight: elements.copy.getBoundingClientRect().height,
    borderTop: parsePixelValue(triggerStyles.borderTopWidth),
    borderBottom: parsePixelValue(triggerStyles.borderBottomWidth),
    paddingTop: parsePixelValue(triggerStyles.paddingTop),
    paddingBottom: parsePixelValue(triggerStyles.paddingBottom),
    tagHeight: Math.ceil(elements.tag.getBoundingClientRect().height),
    titleMarginTop: parsePixelValue(titleStyles.marginTop),
    summaryMarginTop: parsePixelValue(summaryStyles.marginTop),
  };
}
