"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

const noop = () => {
  // Intentionally empty unsubscribe for static client hydration store.
};

const emptySubscribe = () => noop;

const useIsClient = (): boolean =>
  useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

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

export const ThemeToggle = () => {
  const isMounted = useIsClient();
  const { setTheme, theme = "system" } = useTheme();

  if (!isMounted) {
    return <div className="h-[3.125rem] sm:h-[2.375rem]" aria-hidden="true" />;
  }

  return (
    <div
      role="group"
      aria-label="Color theme"
      className="border-foreground/14 bg-card/90 inline-flex w-fit self-start items-center rounded-full border p-0.5 forced-colors:border-[ButtonBorder] sm:self-auto"
    >
      {themes.map((option) => {
        const isActive = theme === option.value;

        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={isActive}
            onClick={() => setTheme(option.value)}
            className={cn(
              "focus-visible:ring-ring focus-visible:ring-offset-background inline-flex min-h-11 items-center gap-1.5 rounded-full border border-transparent px-3 text-xs font-medium select-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-2 focus-visible:outline-transparent active:scale-[0.97] sm:min-h-8 sm:px-2.5",
              isActive
                ? "bg-primary text-primary-foreground shadow-xs forced-colors:border-[Highlight] forced-colors:bg-[Highlight] forced-colors:text-[HighlightText] forced-colors:forced-color-adjust-none"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {option.renderIcon()}
            <span>{option.label}</span>
          </button>
        );
      })}
    </div>
  );
};
