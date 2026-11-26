import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

type FrameVariant = "default" | "inverse" | "ghost";
type FrameSpacing = "none" | "sm" | "default" | "lg";

const FRAME_BASE =
  "relative flex flex-col gap-(--frame-gap) rounded-(--frame-radius) bg-record/55 px-(--frame-px) py-(--frame-py) [--frame-radius:1.25rem] [--frame-gap:0.375rem] [--frame-px:0.375rem] [--frame-py:0.375rem] [--frame-panel-header-gap:0.125rem] [--frame-panel-footer-gap:0.25rem] [--frame-panel-bg:var(--card)] [--frame-panel-border-color:var(--rule-strong)] [--frame-border-color:var(--rule-strong)] [--frame-panel-radius:calc(var(--frame-radius)-var(--frame-px)-1px)]";

const FRAME_VARIANT_CLASS: Record<FrameVariant, string> = {
  default: "border border-(--frame-border-color) bg-clip-padding",
  inverse:
    "border border-(--frame-border-color) bg-card bg-clip-padding [--frame-panel-bg:var(--record)]",
  ghost: "bg-record/40 [--frame-panel-radius:calc(var(--frame-radius)-var(--frame-px))]",
};

const FRAME_SPACING_CLASS: Record<FrameSpacing, string> = {
  none: "[--frame-panel-px:0px] [--frame-panel-py:0px] [--frame-panel-header-px:1.25rem] [--frame-panel-header-py:0.875rem] [--frame-panel-footer-px:1.25rem] [--frame-panel-footer-py:0.75rem]",
  sm: "[--frame-panel-px:1rem] [--frame-panel-py:1rem] [--frame-panel-header-px:1rem] [--frame-panel-header-py:0.75rem] [--frame-panel-footer-px:1rem] [--frame-panel-footer-py:0.625rem]",
  default:
    "[--frame-panel-px:1.25rem] [--frame-panel-py:1.25rem] [--frame-panel-header-px:1.25rem] [--frame-panel-header-py:0.875rem] [--frame-panel-footer-px:1.25rem] [--frame-panel-footer-py:0.75rem]",
  lg: "[--frame-panel-px:1.5rem] [--frame-panel-py:1.5rem] [--frame-panel-header-px:1.5rem] [--frame-panel-header-py:1rem] [--frame-panel-footer-px:1.5rem] [--frame-panel-footer-py:0.875rem]",
};

/**
Mathematical concentric-corner container adapted from ReUI (`@reui/frame`) to Asymmetric.al's Warm Modern Leverage tokens (`DESIGN.md`).
*/
export const Frame = ({
  className,
  variant = "default",
  spacing = "default",
  ...props
}: ComponentProps<"div"> & {
  readonly variant?: FrameVariant;
  readonly spacing?: FrameSpacing;
}) => (
  <div
    data-slot="frame"
    data-spacing={spacing}
    className={cn(
      FRAME_BASE,
      FRAME_VARIANT_CLASS[variant],
      FRAME_SPACING_CLASS[spacing],
      className
    )}
    {...props}
  />
);

export const FramePanel = ({
  className,
  ...props
}: ComponentProps<"div">) => (
  <div
    data-slot="frame-panel"
    className={cn(
      "relative overflow-hidden rounded-(--frame-panel-radius) border border-(--frame-panel-border-color) bg-(--frame-panel-bg) bg-clip-padding px-(--frame-panel-px) py-(--frame-panel-py) shadow-[var(--shadow-card)] forced-colors:border-[CanvasText]",
      className
    )}
    {...props}
  />
);

export const FrameHeader = ({
  className,
  ...props
}: ComponentProps<"div">) => (
  <div
    data-slot="frame-panel-header"
    className={cn(
      "flex flex-col gap-(--frame-panel-header-gap) px-(--frame-panel-header-px) py-(--frame-panel-header-py)",
      className
    )}
    {...props}
  />
);

export const FrameTitle = ({
  className,
  ...props
}: ComponentProps<"div">) => (
  <div
    data-slot="frame-panel-title"
    className={cn(
      "text-foreground font-sans text-sm font-semibold tracking-[-0.01em]",
      className
    )}
    {...props}
  />
);

export const FrameDescription = ({
  className,
  ...props
}: ComponentProps<"div">) => (
  <div
    data-slot="frame-panel-description"
    className={cn(
      "text-muted-foreground text-xs leading-5 sm:text-sm",
      className
    )}
    {...props}
  />
);

export const FrameFooter = ({
  className,
  ...props
}: ComponentProps<"div">) => (
  <div
    data-slot="frame-panel-footer"
    className={cn(
      "flex flex-col gap-(--frame-panel-footer-gap) px-(--frame-panel-footer-px) py-(--frame-panel-footer-py)",
      className
    )}
    {...props}
  />
);
