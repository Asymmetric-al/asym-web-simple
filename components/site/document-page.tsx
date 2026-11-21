import { Container } from "@/components/site/container";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export const DocumentPage = ({
  eyebrow,
  title,
  description,
  children,
  footer,
}: {
  readonly eyebrow: string;
  readonly title: ReactNode;
  readonly description: ReactNode;
  readonly children: ReactNode;
  readonly footer?: ReactNode;
}) => (
  <main
    id="main-content"
    className="relative isolate outline-none"
    tabIndex={-1}
  >
    <Container>
      <article className="max-w-[48rem] pt-[clamp(7rem,8.5vw,9rem)] pb-14 sm:pb-18">
        <p className="text-signal font-mono text-xs font-medium tracking-[0.02em]">
          {eyebrow}
        </p>
        {title}
        <div className="text-muted-foreground mt-6 max-w-[44rem] text-base leading-7 sm:text-lg sm:leading-8">
          {description}
        </div>
        <div className="mt-12 space-y-10 sm:space-y-12">{children}</div>
        {footer ? (
          <div className="border-foreground/10 text-muted-foreground mt-12 border-t pt-6 text-base leading-7">
            {footer}
          </div>
        ) : null}
      </article>
    </Container>
  </main>
);

export const DocumentSection = ({
  number,
  title,
  children,
  className,
}: {
  readonly number?: string;
  readonly title: ReactNode;
  readonly children: ReactNode;
  readonly className?: string;
}) => (
  <section className={cn("grid gap-3", className)}>
    {number ? (
      <p className="text-signal font-mono text-xs font-medium tracking-[0.02em]">
        {number}
      </p>
    ) : null}
    <h2 className="font-heading text-foreground text-[clamp(1.6rem,2.5vw,2.1rem)] leading-tight font-semibold tracking-[-0.025em]">
      {title}
    </h2>
    <div className="text-muted-foreground grid gap-4 text-base leading-7 sm:text-[1.04rem] sm:leading-8">
      {children}
    </div>
  </section>
);
