"use client";

import { Suspense, lazy } from "react";
import { useIsClient } from "@/lib/use-is-client";
import type { ReactNode } from "react";

const LazyThemeToggleControl = lazy(() =>
  import("@/components/theme-toggle-control").then((mod) => ({
    default: mod.ThemeToggleControl,
  }))
);

const ThemeTogglePlaceholder = (): ReactNode => (
  <div className="h-[3.375rem] sm:h-[2.625rem]" aria-hidden="true" />
);

export const ThemeToggle = (): ReactNode => {
  const isMounted = useIsClient();

  if (!isMounted) {
    return <ThemeTogglePlaceholder />;
  }

  return (
    <Suspense fallback={<ThemeTogglePlaceholder />}>
      <LazyThemeToggleControl />
    </Suspense>
  );
};
