"use client";

import {
  SegmentedControl,
  SegmentedControlIndicator,
  SegmentedControlItem,
} from "@ui-sdk/react/segmented-control";
import { useTheme } from "next-themes";
import { useRef } from "react";
import { useIsClient } from "@/lib/use-is-client";
import { cn } from "@/lib/utils";
import type { PointerEvent, ReactNode } from "react";

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

// Warm only the hidden hero plate on hover or focus so toggling themes stays smooth on desktop without extra mobile downloads.
const prewarmHeroOppositePlate = (resolvedTheme: string | undefined) => {
  if (typeof document === "undefined") {
    return;
  }
  const selector =
    resolvedTheme === "dark"
      ? 'img[data-theme-plate="light"][data-priority="true"]'
      : 'img[data-theme-plate="dark"][data-priority="true"]';
  const plate = document.querySelector<HTMLImageElement>(selector);
  if (!plate) {
    return;
  }
  const preloader = new window.Image();
  preloader.decoding = "async";
  if (plate.sizes) {
    preloader.sizes = plate.sizes;
  }
  if (plate.srcset) {
    preloader.srcset = plate.srcset;
  } else if (plate.src) {
    preloader.src = plate.src;
  }
};

export const ThemeToggle = () => {
  const isMounted = useIsClient();
  const { resolvedTheme, setTheme, theme = "system" } = useTheme();
  const prewarmedRef = useRef<string | null>(null);

  if (!isMounted) {
    return <div className="h-[3.375rem] sm:h-[2.625rem]" aria-hidden="true" />;
  }

  const currentTheme: ThemeValue = isThemeValue(theme) ? theme : "system";

  const handlePointerEnter = (event: PointerEvent<HTMLDivElement>) => {
    if (
      !resolvedTheme ||
      event.pointerType !== "mouse" ||
      prewarmedRef.current === resolvedTheme
    ) {
      return;
    }
    prewarmedRef.current = resolvedTheme;
    prewarmHeroOppositePlate(resolvedTheme);
  };

  const handleValueChange = (nextValue: string | null) => {
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
      onPointerEnter={handlePointerEnter}
      className="border-rule bg-record has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-offset-background relative isolate inline-flex w-fit items-center self-start rounded-full border p-1 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-offset-2 sm:self-auto forced-colors:border-[ButtonBorder]"
    >
      <SegmentedControlIndicator className="theme-toggle-indicator" />
      {themes.map((option) => (
        <SegmentedControlItem
          key={option.value}
          value={option.value}
          className={cn(
            "text-muted-foreground relative z-10 inline-flex min-h-11 cursor-pointer items-center gap-1.5 rounded-full border border-transparent px-3 text-xs font-medium transition-[color,scale] duration-150 select-none focus-visible:outline-2 focus-visible:outline-transparent active:scale-[0.97] sm:min-h-8 sm:px-2.5 [@media(hover:hover)_and_(pointer:fine)]:hover:text-foreground",
            "data-checked:text-foreground data-checked:font-semibold",
            "forced-colors:data-checked:border-[Highlight] forced-colors:data-checked:bg-[Highlight] forced-colors:data-checked:text-[HighlightText] forced-colors:data-checked:forced-color-adjust-none"
          )}
        >
          {option.renderIcon()}
          <span>{option.label}</span>
        </SegmentedControlItem>
      ))}
    </SegmentedControl>
  );
};
