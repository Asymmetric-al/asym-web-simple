export interface PlainTextExcerptOptions {
  maxLength?: number;
}

export interface TextStyleSnapshot {
  font: string;
  lineHeight: number;
}

export interface PlatformTabTriggerPreset {
  id: "platform-tab-trigger";
  fallbackMinHeightPx: number;
  measurementSafetyPx: number;
}

export interface PlatformTabTriggerCopy {
  title: string;
  summary: string;
}

export interface PlatformTabTriggerElements {
  trigger: HTMLElement;
  copy: HTMLElement;
  tag: HTMLElement;
  title: HTMLElement;
  summary: HTMLElement;
}

export interface PlatformTabTriggerMeasurement {
  itemHeights: number[];
  sharedMinHeightPx: number;
}
