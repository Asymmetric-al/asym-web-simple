"use client";

import { ThemeProvider } from "next-themes";
import { UiReadyMarker } from "@/components/ui-ready-marker";
import type { ReactNode } from "react";

export const Providers = ({
  children,
}: {
  readonly children: ReactNode;
}): ReactNode => (
  <ThemeProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    enableColorScheme
  >
    <UiReadyMarker />
    {children}
  </ThemeProvider>
);
