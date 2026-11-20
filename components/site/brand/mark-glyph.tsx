import {
  MARK_DATUM_PATH,
  MARK_FRAME_RECT,
  MARK_SWEEP_PATH,
  MARK_VIEWBOX,
} from "@/components/site/brand/mark-geometry";
import { cn } from "@/lib/utils";

export type MarkPrimitive = "datum" | "sweep" | "frame";

const BASE_STROKE_WIDTH = 40;
const HIGHLIGHT_STROKE_WIDTH = 46;

/**
44x48 editorial glyph built from the official asym mark geometry. Renders two primitives as hairline Ledger Rule and inks one primitive to illustrate a single architectural principle.
*/
export const MarkGlyph = ({
  highlight,
  className,
}: {
  readonly highlight: MarkPrimitive;
  readonly className?: string;
}) => {
  const isFrameHighlighted = highlight === "frame";
  const isDatumHighlighted = highlight === "datum";
  const isSweepHighlighted = highlight === "sweep";

  const baseClass = "stroke-rule forced-colors:stroke-[GrayText]";
  const activeClass = "stroke-ink forced-colors:stroke-[CanvasText]";

  return (
    <svg
      viewBox={MARK_VIEWBOX}
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={cn("h-12 w-11 shrink-0", className)}
    >
      {isFrameHighlighted ? null : (
        <rect
          {...MARK_FRAME_RECT}
          strokeWidth={BASE_STROKE_WIDTH}
          className={baseClass}
        />
      )}
      {isDatumHighlighted ? null : (
        <path
          d={MARK_DATUM_PATH}
          strokeWidth={BASE_STROKE_WIDTH}
          className={baseClass}
        />
      )}
      {isSweepHighlighted ? null : (
        <path
          d={MARK_SWEEP_PATH}
          strokeWidth={BASE_STROKE_WIDTH}
          className={baseClass}
        />
      )}

      {isFrameHighlighted ? (
        <rect
          {...MARK_FRAME_RECT}
          strokeWidth={HIGHLIGHT_STROKE_WIDTH}
          className={activeClass}
        />
      ) : null}
      {isDatumHighlighted ? (
        <path
          d={MARK_DATUM_PATH}
          strokeWidth={HIGHLIGHT_STROKE_WIDTH}
          strokeLinecap="round"
          className={activeClass}
        />
      ) : null}
      {isSweepHighlighted ? (
        <path
          d={MARK_SWEEP_PATH}
          strokeWidth={HIGHLIGHT_STROKE_WIDTH}
          strokeLinecap="round"
          className={activeClass}
        />
      ) : null}
    </svg>
  );
};
