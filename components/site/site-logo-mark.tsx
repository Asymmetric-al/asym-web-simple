import {
  MARK_DATUM_PATH,
  MARK_FRAME_RECT,
  MARK_SWEEP_PATH,
  MARK_VIEWBOX,
} from "@/components/site/brand/mark-geometry";
import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

type SiteLogoMarkProps = ComponentPropsWithoutRef<"span"> & {
  readonly size?: number;
  readonly eager?: boolean;
  readonly priority?: boolean;
};

const MARK_STROKE_WIDTH = 44;

export const SiteLogoMark = ({
  className,
  size = 24,
  eager: _eager,
  priority: _priority,
  ...props
}: SiteLogoMarkProps) => (
  <span
    className={cn(
      "text-foreground relative inline-flex shrink-0 items-center justify-center",
      className
    )}
    aria-hidden="true"
    {...props}
  >
    <svg
      width={size}
      height={size}
      viewBox={MARK_VIEWBOX}
      fill="none"
      aria-hidden="true"
      focusable="false"
      className="size-full overflow-visible"
    >
      <rect
        {...MARK_FRAME_RECT}
        stroke="currentColor"
        strokeWidth={MARK_STROKE_WIDTH}
      />
      <path
        d={MARK_DATUM_PATH}
        stroke="currentColor"
        strokeWidth={MARK_STROKE_WIDTH}
      />
      <path
        d={MARK_SWEEP_PATH}
        stroke="currentColor"
        strokeWidth={MARK_STROKE_WIDTH}
      />
    </svg>
  </span>
);
