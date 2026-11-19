import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export const Eyebrow = ({
  children,
  className,
}: {
  readonly children: ReactNode;
  readonly className?: string;
}) => (
  <p
    className={cn(
      "text-primary/80 font-mono text-xs tracking-[0.24em] uppercase",
      className
    )}
  >
    {children}
  </p>
);

export const SectionTitle = ({
  id,
  children,
  className,
}: {
  readonly id: string;
  readonly children: ReactNode;
  readonly className?: string;
}) => (
  <h2
    id={id}
    className={cn(
      "font-heading text-foreground mt-4 text-[clamp(1.95rem,3.6vw,3.05rem)] leading-[1.04] font-semibold tracking-[-0.045em] text-balance",
      className
    )}
  >
    {children}
  </h2>
);

/**
Small status label, used wherever planned or in-development work appears.
*/
export const StatusPill = ({
  children,
  className,
}: {
  readonly children: ReactNode;
  readonly className?: string;
}) => (
  <p
    className={cn(
      "border-foreground/14 bg-card/85 text-muted-foreground inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-xs tracking-[0.08em]",
      className
    )}
  >
    <span
      className="bg-ring size-1.5 shrink-0 rounded-full"
      aria-hidden="true"
    />
    {children}
  </p>
);
