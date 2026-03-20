"use client";

import { Reveal } from "@/components/site/reveal";
import type { ReactNode } from "react";

/** Mount-only fade+rise for page titles (≈8px travel per motion guidelines). */
export function HeroReveal({ children }: { children: ReactNode }): ReactNode {
  return (
    <Reveal trigger="mount" y={8} blur={0}>
      {children}
    </Reveal>
  );
}
