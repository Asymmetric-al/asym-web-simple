"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

const LCG_MODULUS = 2_147_483_647;
const LCG_MULTIPLIER = 48_271;

const createSeededRandom = (seed: number) => {
  let state = seed % LCG_MODULUS;
  return (): number => {
    state = (state * LCG_MULTIPLIER) % LCG_MODULUS;
    return (state - 1) / (LCG_MODULUS - 1);
  };
};

/**
Builds one single SVG path containing ~80 seeded organic halftone dot circles so
the entire corner texture renders as 1 DOM element instead of hundreds of nodes.
*/
const buildHalftonePath = (): string => {
  const rand = createSeededRandom(17);
  const size = 340;
  const step = 18;
  const segments: string[] = [];

  for (let y = step / 2; y < size; y += step) {
    for (let x = step / 2; x < size; x += step) {
      const density = Math.max(0, 1 - Math.hypot(x, y) / size);
      if (rand() > density * 1.08) {
        continue;
      }
      const cx = Math.round((x + (rand() - 0.5) * 6) * 10) / 10;
      const cy = Math.round((y + (rand() - 0.5) * 6) * 10) / 10;
      const r = Math.round((0.8 + density * 2.1 + rand() * 0.35) * 100) / 100;
      const d = Math.round(r * 2 * 100) / 100;
      segments.push(
        `M${(cx - r).toFixed(1)},${cy.toFixed(1)}a${r},${r} 0 1,0 ${d},0a${r},${r} 0 1,0 -${d},0`
      );
    }
  }

  return segments.join("");
};

const HalftoneCorner = ({
  pathData,
  className,
}: {
  readonly pathData: string;
  readonly className?: string;
}) => (
  <svg
    viewBox="0 0 340 340"
    aria-hidden="true"
    focusable="false"
    className={className}
  >
    <path d={pathData} fill="currentColor" />
  </svg>
);

/**
Adapted from React Bits Pro `@reactbits-pro/cta-13`: deterministic SVG print halftone corner texture tuned to asym's warm parchment and deep ink palette.
*/
export const HalftoneFrame = ({
  className,
}: {
  readonly className?: string;
}): ReactNode => {
  const pathData = useMemo(buildHalftonePath, []);

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit] select-none [contain:layout_style_paint] forced-colors:hidden print:hidden",
        className
      )}
    >
      <div className="text-primary/11 dark:text-ring/14 absolute -top-10 -left-10 w-40 sm:w-64">
        <HalftoneCorner pathData={pathData} className="h-auto w-full" />
      </div>
      <div className="text-primary/10 dark:text-ring/13 absolute -right-10 -bottom-10 w-44 sm:w-72">
        <HalftoneCorner
          pathData={pathData}
          className="h-auto w-full rotate-180"
        />
      </div>
    </div>
  );
};
