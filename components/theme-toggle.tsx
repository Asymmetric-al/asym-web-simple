"use client";

import { LaptopMinimal, MoonStar, SunMedium } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

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

const themes = [
  { value: "light", label: "Light", icon: SunMedium },
  { value: "dark", label: "Dark", icon: MoonStar },
  { value: "system", label: "System", icon: LaptopMinimal },
] as const;

export const ThemeToggle = () => {
  const isMounted = useIsClient();
  const { setTheme, theme = "system" } = useTheme();

  return (
    <div
      role="group"
      aria-label="Color theme"
      className="border-foreground/14 bg-card/85 inline-flex items-center rounded-full border p-0.5"
    >
      {themes.map((option) => {
        const Icon = option.icon;
        const isActive = isMounted && theme === option.value;

        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={isActive}
            onClick={() => setTheme(option.value)}
            className={cn(
              "focus-visible:ring-ring inline-flex min-h-11 items-center gap-1.5 rounded-full px-3 text-xs font-medium select-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-none active:scale-[0.97] sm:min-h-8 sm:px-2.5",
              isActive
                ? "bg-primary text-primary-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Icon className="size-3.5 shrink-0" aria-hidden="true" />
            <span>{option.label}</span>
          </button>
        );
      })}
    </div>
  );
};
