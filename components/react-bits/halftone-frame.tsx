"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

const FIELD_SIZE = 320;
const MAX_DIST = 265;
const LATTICE_STEP = 22;
const COS_45 = Math.SQRT1_2;

/**
Builds one crisp 45-degree rotated printmaking halftone dot lattice with smooth
radial dot-radius taper (zero jitter, zero random omission) compiled once at
module load and reused across both corners via `<defs>` + `<use>`.
*/
const buildHalftonePath = (): string => {
  const segments: string[] = [];
  const range = Math.ceil((FIELD_SIZE * 1.5) / LATTICE_STEP);

  for (let row = -range; row <= range; row += 1) {
    for (let col = -range; col <= range; col += 1) {
      const u = col * LATTICE_STEP;
      const v = row * LATTICE_STEP;
      const cx = (u - v) * COS_45;
      const cy = (u + v) * COS_45;

      if (cx < 0 || cy < 0 || cx > FIELD_SIZE || cy > FIELD_SIZE) {
        continue;
      }

      const dist = Math.hypot(cx, cy);
      const t = 1 - dist / MAX_DIST;
      if (t <= 0.04) {
        continue;
      }

      const r = Math.round((0.6 + t ** 1.45 * 2.4) * 100) / 100;
      const d = Math.round(r * 2 * 100) / 100;
      const xStart = (cx - r).toFixed(1);
      const yFixed = cy.toFixed(1);
      segments.push(`M${xStart},${yFixed}a${r},${r} 0 1,0 ${d},0a${r},${r} 0 1,0 -${d},0`);
    }
  }

  return segments.join("");
};

const HALFTONE_CORNER_PATH = buildHalftonePath();
const HALFTONE_DEF_ID = "asym-halftone-corner";

/**
Adapted from React Bits Pro `@reactbits-pro/cta-13`: regular 45-degree print
halftone corner field tuned to asym's warm parchment and deep ink palette.
*/
export const HalftoneFrame = ({
  className,
}: {
  readonly className?: string;
}): ReactNode => (
  <div
    aria-hidden="true"
    className={cn(
      "pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit] select-none [contain:layout_style_paint] forced-colors:hidden print:hidden",
      className
    )}
  >
    <svg
      width="0"
      height="0"
      aria-hidden="true"
      focusable="false"
      className="pointer-events-none absolute size-0 overflow-hidden"
    >
      <defs>
        <path id={HALFTONE_DEF_ID} d={HALFTONE_CORNER_PATH} />
      </defs>
    </svg>

    <div className="text-primary/17 dark:text-ring/14 absolute -top-8 -left-8 w-40 sm:w-64">
      <svg
        viewBox={`0 0 ${FIELD_SIZE} ${FIELD_SIZE}`}
        aria-hidden="true"
        focusable="false"
        className="h-auto w-full"
      >
        <use href={`#${HALFTONE_DEF_ID}`} fill="currentColor" />
      </svg>
    </div>

    <div className="text-primary/15 dark:text-ring/13 absolute -right-8 -bottom-8 w-44 sm:w-72">
      <svg
        viewBox={`0 0 ${FIELD_SIZE} ${FIELD_SIZE}`}
        aria-hidden="true"
        focusable="false"
        className="h-auto w-full rotate-180"
      >
        <use href={`#${HALFTONE_DEF_ID}`} fill="currentColor" />
      </svg>
    </div>
  </div>
);
