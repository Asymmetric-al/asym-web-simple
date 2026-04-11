export type PlainTextExcerptOptions = {
  maxLength?: number;
};

export type TextStyleSnapshot = {
  font: string;
  lineHeight: number;
};

export type PlatformTabTriggerPreset = {
  id: "platform-tab-trigger";
  fallbackMinHeightPx: number;
  measurementSafetyPx: number;
};

export type PlatformTabTriggerCopy = {
  title: string;
  summary: string;
};

export type PlatformTabTriggerElements = {
  trigger: HTMLElement;
  copy: HTMLElement;
  tag: HTMLElement;
  title: HTMLElement;
  summary: HTMLElement;
};

export type PlatformTabTriggerMeasurement = {
  itemHeights: number[];
  sharedMinHeightPx: number;
};
