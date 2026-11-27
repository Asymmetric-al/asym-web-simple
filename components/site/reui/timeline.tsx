import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

export type TimelineStepState = "completed" | "active" | "upcoming";

export const Timeline = ({ className, ...props }: ComponentProps<"ol">) => (
  <ol
    data-slot="timeline"
    data-orientation="vertical"
    className={cn("group/timeline flex flex-col", className)}
    {...props}
  />
);

export interface TimelineItemProps extends ComponentProps<"li"> {
  readonly state?: TimelineStepState;
}

export const TimelineItem = ({
  state = "upcoming",
  className,
  ...props
}: TimelineItemProps) => (
  <li
    data-slot="timeline-item"
    data-state={state}
    data-completed={state === "completed" ? "true" : undefined}
    className={cn(
      "group/timeline-item relative ms-7 flex flex-col gap-1 not-last:pb-6",
      className
    )}
    {...props}
  />
);

export const TimelineSeparator = ({
  className,
  ...props
}: ComponentProps<"span">) => (
  <span
    aria-hidden="true"
    data-slot="timeline-separator"
    className={cn(
      "bg-rule-strong absolute top-4.5 -left-5 h-[calc(100%-1.125rem)] w-px -translate-x-1/2 group-last/timeline-item:hidden group-data-[state=completed]/timeline-item:bg-signal-border/60",
      className
    )}
    {...props}
  />
);

export const TimelineIndicator = ({
  className,
  ...props
}: ComponentProps<"span">) => (
  <span
    aria-hidden="true"
    data-slot="timeline-indicator"
    className={cn(
      "border-draft-border bg-card absolute top-1 -left-5 inline-flex size-3.5 -translate-x-1/2 items-center justify-center rounded-full border-2 border-dashed",
      "group-data-[state=completed]/timeline-item:border-solid group-data-[state=completed]/timeline-item:border-signal group-data-[state=completed]/timeline-item:bg-signal",
      "group-data-[state=active]/timeline-item:border-solid group-data-[state=active]/timeline-item:border-human group-data-[state=active]/timeline-item:bg-human-soft",
      "forced-colors:border-[CanvasText]",
      className
    )}
    {...props}
  />
);

export const TimelineDate = ({
  className,
  ...props
}: ComponentProps<"span">) => (
  <span
    data-slot="timeline-date"
    className={cn(
      "text-muted-foreground font-mono text-xs font-medium tracking-[0.01em] group-data-[state=completed]/timeline-item:text-signal group-data-[state=active]/timeline-item:text-human",
      className
    )}
    {...props}
  />
);

export const TimelineTitle = ({
  className,
  children,
  ...props
}: ComponentProps<"h3">) => (
  <h3
    data-slot="timeline-title"
    className={cn(
      "font-heading text-foreground text-sm leading-6 font-semibold tracking-[-0.015em]",
      className
    )}
    {...props}
  >
    {children}
  </h3>
);

export const TimelineContent = ({
  className,
  ...props
}: ComponentProps<"div">) => (
  <div
    data-slot="timeline-content"
    className={cn(
      "text-muted-foreground text-sm leading-6 text-pretty",
      className
    )}
    {...props}
  />
);
