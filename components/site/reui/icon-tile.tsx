import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

type IconTileVariant = "outline" | "soft" | "human" | "frame";
type IconTileSize = "sm" | "default" | "lg";
type IconTileRadius = "default" | "full";

const ICON_TILE_BASE =
  "relative inline-flex shrink-0 items-center justify-center align-middle size-(--icon-tile-size) rounded-[var(--icon-tile-radius,min(var(--radius-xl),calc(var(--icon-tile-size)/3)))] [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-(--icon-tile-icon-size)";

const INSET_CARD_PSEUDO =
  "isolate p-(--icon-tile-inset) after:absolute after:inset-(--icon-tile-inset) after:-z-10 after:rounded-[calc(var(--icon-tile-radius,min(var(--radius-xl),calc(var(--icon-tile-size)/3)))-var(--icon-tile-inset))] after:border forced-colors:border forced-colors:border-[CanvasText]";

const ICON_TILE_VARIANT_CLASS: Record<IconTileVariant, string> = {
  outline:
    "border border-rule-strong bg-card text-foreground forced-colors:border-[CanvasText]",
  soft: `${INSET_CARD_PSEUDO} bg-signal-soft text-signal after:border-signal-border/35 after:bg-card/80`,
  human: `${INSET_CARD_PSEUDO} bg-human-soft text-human after:border-human-border/35 after:bg-card/80`,
  frame: `${INSET_CARD_PSEUDO} border border-rule-strong bg-record/70 text-foreground after:border-rule after:bg-card`,
};

const ICON_TILE_SIZE_CLASS: Record<IconTileSize, string> = {
  sm: "[--icon-tile-inset:2px] [--icon-tile-icon-size:1rem] [--icon-tile-size:2rem]",
  default:
    "[--icon-tile-inset:3px] [--icon-tile-icon-size:1.125rem] [--icon-tile-size:2.5rem]",
  lg: "[--icon-tile-inset:3px] [--icon-tile-icon-size:1.25rem] [--icon-tile-size:3rem]",
};

const ICON_TILE_RADIUS_CLASS: Record<IconTileRadius, string> = {
  default:
    "[--icon-tile-radius:min(var(--radius-xl),calc(var(--icon-tile-size)/3))]",
  full: "[--icon-tile-radius:999px]",
};

export interface IconTileProps extends ComponentProps<"span"> {
  readonly variant?: IconTileVariant;
  readonly size?: IconTileSize;
  readonly radius?: IconTileRadius;
}

/**
Double-container icon surface adapted from ReUI (`@reui/icon-tile`). Paints its inset card via `::after` so concentric framing needs zero extra wrapper nodes.
*/
export const IconTile = ({
  className,
  variant = "frame",
  size = "default",
  radius = "default",
  ...props
}: IconTileProps) => (
  <span
    data-slot="icon-tile"
    data-variant={variant}
    data-size={size}
    className={cn(
      ICON_TILE_BASE,
      ICON_TILE_VARIANT_CLASS[variant],
      ICON_TILE_SIZE_CLASS[size],
      ICON_TILE_RADIUS_CLASS[radius],
      className
    )}
    {...props}
  />
);
