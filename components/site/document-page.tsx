import { Container } from "@/components/site/page";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function DocumentPage({
  eyebrow,
  title,
  description,
  children,
  footer,
}: {
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <main id="main-content" className="relative isolate" tabIndex={-1}>
      <Container className="max-w-[76rem]">
        <article className="max-w-[48rem] pt-[clamp(7.4rem,9vw,9.5rem)] pb-14 sm:pb-18">
          <p className="text-primary/72 font-mono text-[0.72rem] tracking-[0.28em] uppercase">
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
}

export function DocumentSection({
  number,
  title,
  children,
  className,
}: {
  number?: string;
  title: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("grid gap-3", className)}>
      {number ? (
        <p className="text-primary/62 font-mono text-[0.72rem] tracking-[0.24em] uppercase">
          {number}
        </p>
      ) : null}
      <h2 className="font-heading text-foreground text-[clamp(1.5rem,2.4vw,2rem)] leading-tight font-semibold tracking-[-0.045em]">
        {title}
      </h2>
      <div className="text-muted-foreground grid gap-4 text-base leading-7 sm:text-[1.04rem] sm:leading-8">
        {children}
      </div>
    </section>
  );
}
