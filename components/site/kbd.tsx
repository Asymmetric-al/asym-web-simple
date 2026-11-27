import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

export const Kbd = ({ className, ...props }: ComponentProps<"kbd">) => (
  <kbd
    data-slot="kbd"
    className={cn(
      "border-rule-strong bg-record text-muted-foreground inline-flex h-5 min-w-5 shrink-0 items-center justify-center rounded-md border px-1.5 font-mono text-xs leading-none font-medium tracking-normal select-none forced-colors:border-[CanvasText]",
      className
    )}
    {...props}
  />
);

export const KbdGroup = ({ className, ...props }: ComponentProps<"span">) => (
  <span
    data-slot="kbd-group"
    className={cn("inline-flex items-center gap-1", className)}
    {...props}
  />
);
