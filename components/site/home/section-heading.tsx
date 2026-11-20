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
      "text-pine font-sans text-sm font-medium tracking-[0.005em]",
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
      "font-heading text-foreground mt-3 text-[clamp(2rem,3.8vw,3.25rem)] leading-[1.03] font-medium tracking-[-0.025em] text-balance",
      className
    )}
  >
    {children}
  </h2>
);

/**
Small status label used on standalone status routes.
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
      "border-rule-strong bg-card text-muted-foreground inline-flex min-h-8 w-fit items-center gap-2 rounded-full border px-3 py-1 font-mono text-xs tracking-[0.02em]",
      className
    )}
  >
    <span
      className="bg-draft size-1.5 shrink-0 rounded-full"
      aria-hidden="true"
    />
    {children}
  </p>
);
