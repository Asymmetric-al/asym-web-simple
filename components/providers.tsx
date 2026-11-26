"use client";

import { domAnimation, LazyMotion } from "motion/react";
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
    disableTransitionOnChange
  >
    <LazyMotion features={domAnimation} strict>
      <UiReadyMarker />
      {children}
    </LazyMotion>
  </ThemeProvider>
);
