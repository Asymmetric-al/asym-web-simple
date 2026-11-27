"use client";

import {
  SegmentedControl,
  SegmentedControlItem,
} from "@ui-sdk/react/segmented-control";
import { useTheme } from "next-themes";
import { DeferredSegmentedIndicator } from "@/components/site/deferred-segmented-indicator";
import type { ReactNode } from "react";

const SunIcon = (): ReactNode => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-3.5 shrink-0"
    aria-hidden="true"
  >
    <circle cx="8" cy="8" r="2.75" />
    <path d="M8 1.75v1.25M8 13v1.25M1.75 8H3M13 8h1.25M3.6 3.6l.9.9M11.5 11.5l.9.9M12.4 3.6l-.9.9M4.5 11.5l-.9.9" />
  </svg>
);

const MoonIcon = (): ReactNode => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-3.5 shrink-0"
    aria-hidden="true"
  >
    <path d="M13.25 9.8A5.5 5.5 0 0 1 6.2 2.75a5.5 5.5 0 1 0 7.05 7.05Z" />
  </svg>
);

const SystemIcon = (): ReactNode => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-3.5 shrink-0"
    aria-hidden="true"
  >
    <rect x="2.25" y="3" width="11.5" height="8" rx="1.5" />
    <path d="M1.5 13h13" />
  </svg>
);

const themes = [
  { value: "light", label: "Light", renderIcon: SunIcon },
  { value: "dark", label: "Dark", renderIcon: MoonIcon },
  { value: "system", label: "System", renderIcon: SystemIcon },
] as const;

type ThemeValue = (typeof themes)[number]["value"];

const isThemeValue = (value: string | null): value is ThemeValue =>
  value !== null && themes.some((option) => option.value === value);

const ITEM_CLASS =
  "text-muted-foreground relative z-10 inline-flex min-h-11 cursor-pointer items-center gap-1.5 rounded-full border border-transparent px-3 text-xs font-medium transition-transform duration-150 ease-out select-none focus-visible:outline-2 focus-visible:outline-transparent active:scale-[0.97] data-checked:text-foreground sm:min-h-8 sm:px-2.5 [@media(hover:hover)_and_(pointer:fine)]:hover:text-foreground forced-colors:data-checked:border-[Highlight] forced-colors:data-checked:bg-[Highlight] forced-colors:data-checked:text-[HighlightText] forced-colors:data-checked:forced-color-adjust-none";

export const ThemeToggleControl = (): ReactNode => {
  const { setTheme, theme = "system" } = useTheme();
  const currentTheme: ThemeValue = isThemeValue(theme) ? theme : "system";

  const handleValueChange = (nextValue: string | null): void => {
    if (!isThemeValue(nextValue)) {
      return;
    }
    setTheme(nextValue);
  };

  return (
    <SegmentedControl
      aria-label="Color theme"
      value={currentTheme}
      onValueChange={handleValueChange}
      className="border-rule bg-record has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-offset-background relative isolate inline-flex w-fit items-center self-start rounded-full border p-1 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-offset-2 sm:self-auto forced-colors:border-[ButtonBorder]"
    >
      <DeferredSegmentedIndicator className="segmented-indicator" />
      {themes.map((option) => (
        <SegmentedControlItem
          key={option.value}
          value={option.value}
          className={ITEM_CLASS}
        >
          {option.renderIcon()}
          <span>{option.label}</span>
        </SegmentedControlItem>
      ))}
    </SegmentedControl>
  );
};
