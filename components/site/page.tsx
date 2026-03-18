import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Action = {
  label: string;
  href: string;
  variant?: "default" | "outline" | "secondary" | "ghost";
};

export function Container({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[82rem] px-4 sm:px-6 lg:px-8",
        className
      )}
      {...props}
    />
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  actions,
  meta,
  children,
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
  actions?: Action[];
  meta?: string[];
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden pb-14 pt-32 md:pb-20 md:pt-40",
        className
      )}
    >
      <Container className="grid gap-10 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:items-center">
        <div className="min-w-0 max-w-3xl">
          <Badge
            variant="outline"
            className="h-auto rounded-full border-foreground/10 bg-card/76 px-3 py-1 font-mono text-[0.72rem] uppercase tracking-[0.28em] text-primary/80"
          >
            {eyebrow}
          </Badge>
          <div className="min-w-0 mt-6">{title}</div>
          <div className="content-measure mt-6 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            {description}
          </div>
          {actions?.length ? (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {actions.map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className={cn(
                    buttonVariants({
                      variant: action.variant ?? "default",
                      size: "lg",
                    }),
                    "px-5"
                  )}
                >
                  {action.label}
                  <ArrowUpRight data-icon="inline-end" />
                </Link>
              ))}
            </div>
          ) : null}
          {meta?.length ? (
            <ul className="mt-8 flex flex-wrap gap-2.5">
              {meta.map((item) => (
                <li
                  key={item}
                  className="text-resilient max-w-full rounded-full border border-foreground/10 bg-background/76 px-3 py-1.5 text-center font-mono text-[0.72rem] uppercase tracking-[0.22em] text-muted-foreground shadow-[0_14px_34px_-28px_rgba(22,33,43,0.35)]"
                >
                  {item}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        {children ? <div className="min-w-0 lg:pl-4">{children}</div> : null}
      </Container>
    </section>
  );
}

export function Section({
  children,
  className,
  containerClassName,
  tone = "default",
  ...props
}: ComponentProps<"section"> & {
  containerClassName?: string;
  tone?: "default" | "sky" | "accent" | "ink";
}) {
  const toneClassName =
    tone === "sky"
      ? "section-wash-sky"
      : tone === "accent"
        ? "section-wash-accent"
        : tone === "ink"
          ? "bg-primary text-primary-foreground"
          : "";

  return (
    <section
      className={cn("py-18 sm:py-22 lg:py-28", toneClassName, className)}
      {...props}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow ? (
        <Badge
          variant="outline"
          className="h-auto rounded-full border-foreground/10 bg-card/76 px-3 py-1 font-mono text-[0.72rem] uppercase tracking-[0.28em] text-primary/80"
        >
          {eyebrow}
        </Badge>
      ) : null}
      <h2 className="mt-4 text-balance font-heading text-[clamp(2.1rem,4vw,3.35rem)] font-semibold leading-[1.02] tracking-[-0.06em]">
        {title}
      </h2>
      {description ? (
        <div className="content-measure mt-4 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
          {description}
        </div>
      ) : null}
    </div>
  );
}
