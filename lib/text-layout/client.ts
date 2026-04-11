import { layout } from "@chenglou/pretext";
import { getPreparedText } from "./cache";
import { extractPlainTextExcerpt } from "./extractors";
import {
  platformTabMeasurementFonts,
  readPlatformTabTriggerChrome,
  readTextStyleSnapshot,
} from "./fonts";
import { platformTabTriggerPreset } from "./presets";
import type {
  PlatformTabTriggerCopy,
  PlatformTabTriggerElements,
  PlatformTabTriggerMeasurement,
} from "./types";

export function resolvePlatformTabTriggerHeight(input: {
  measuredHeight: number;
  fallbackMinHeightPx: number;
  measurementSafetyPx: number;
}): number {
  return Math.max(
    input.fallbackMinHeightPx,
    Math.ceil(input.measuredHeight + input.measurementSafetyPx)
  );
}

export function measurePlatformTabTrigger(input: {
  items: PlatformTabTriggerCopy[];
  elements: PlatformTabTriggerElements[];
  fallbackMinHeightPx?: number;
}): PlatformTabTriggerMeasurement {
  const fallbackMinHeightPx =
    input.fallbackMinHeightPx ?? platformTabTriggerPreset.fallbackMinHeightPx;
  const measurementSafetyPx = platformTabTriggerPreset.measurementSafetyPx;

  if (input.items.length === 0 || input.elements.length === 0) {
    return {
      itemHeights: [],
      sharedMinHeightPx: fallbackMinHeightPx,
    };
  }

  const itemHeights = input.items.map((item, index) => {
    const elements = input.elements[index];

    if (elements === undefined) {
      return fallbackMinHeightPx;
    }

    const chrome = readPlatformTabTriggerChrome(elements);
    const titleStyle = readTextStyleSnapshot(elements.title, {
      measurementFont: platformTabMeasurementFonts.title,
    });
    const summaryStyle = readTextStyleSnapshot(elements.summary, {
      measurementFont: platformTabMeasurementFonts.summary,
    });

    const titleLayout = layout(
      getPreparedText(extractPlainTextExcerpt(item.title), titleStyle.font),
      chrome.copyWidth,
      titleStyle.lineHeight
    );
    const summaryLayout = layout(
      getPreparedText(extractPlainTextExcerpt(item.summary), summaryStyle.font),
      chrome.copyWidth,
      summaryStyle.lineHeight
    );

    const measuredHeight =
      chrome.borderTop +
      chrome.borderBottom +
      chrome.paddingTop +
      chrome.paddingBottom +
      chrome.tagHeight +
      chrome.titleMarginTop +
      chrome.summaryMarginTop +
      titleLayout.height +
      summaryLayout.height;
    const renderedCopyHeight =
      chrome.borderTop +
      chrome.borderBottom +
      chrome.paddingTop +
      chrome.paddingBottom +
      Math.ceil(chrome.copyHeight);

    return Math.max(
      renderedCopyHeight,
      resolvePlatformTabTriggerHeight({
        measuredHeight,
        fallbackMinHeightPx,
        measurementSafetyPx,
      })
    );
  });

  return {
    itemHeights,
    sharedMinHeightPx: Math.max(fallbackMinHeightPx, ...itemHeights),
  };
}
