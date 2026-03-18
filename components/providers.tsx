"use client";

import { ReducedMotionProvider } from "@/lib/motion";
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
        <ReducedMotionProvider>{children}</ReducedMotionProvider>
      </MotionConfig>
    </ThemeProvider>
  );
}
