"use client";

import { ThemeProvider } from "next-themes";
import { UiReadyMarker } from "@/components/ui-ready-marker";
import type { ReactNode } from "react";

export const Providers = ({
  children,
  nonce,
}: {
  readonly children: ReactNode;
  readonly nonce?: string | null;
}): ReactNode => (
  <ThemeProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    enableColorScheme
    disableTransitionOnChange
    {...(nonce ? { nonce } : {})}
  >
    <UiReadyMarker />
    {children}
  </ThemeProvider>
);
