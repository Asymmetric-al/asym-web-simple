import type { PlatformTabTriggerPreset } from "./types";

export const platformTabTriggerPreset = {
  id: "platform-tab-trigger",
  fallbackMinHeightPx: 144,
  measurementSafetyPx: 2,
} as const satisfies PlatformTabTriggerPreset;
