"use client";

import { SmoothScroll } from "@/components/smooth-scroll";
import { UiReadyMarker } from "@/components/ui-ready-marker";
import { ReducedMotionProvider } from "@/lib/motion";
import { TooltipProvider } from "@/components/ui/tooltip";
import { MotionConfig } from "motion/react";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }): ReactNode {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      enableColorScheme
      disableTransitionOnChange
    >
      <MotionConfig reducedMotion="user">
        <TooltipProvider delay={120}>
          <ReducedMotionProvider>
            <UiReadyMarker />
            <SmoothScroll>{children}</SmoothScroll>
          </ReducedMotionProvider>
        </TooltipProvider>
      </MotionConfig>
    </ThemeProvider>
  );
}
