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
      className={cn("mx-auto w-full max-w-[80rem] px-4 sm:px-6 lg:px-8", className)}
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
    <section className={cn("relative overflow-hidden pb-12 pt-32 md:pb-16 md:pt-40", className)}>
      <Container className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center">
        <div className="max-w-3xl">
          <Badge
            variant="outline"
            className="h-auto rounded-full border-foreground/10 bg-card/70 px-3 py-1 font-mono text-[0.72rem] uppercase tracking-[0.28em] text-primary/80"
          >
            {eyebrow}
          </Badge>
          <div className="mt-6">{title}</div>
          <div className="mt-6 max-w-[62ch] text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            {description}
          </div>
          {actions?.length ? (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {actions.map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className={cn(
                    buttonVariants({ variant: action.variant ?? "default", size: "lg" }),
                    "rounded-full px-5"
                  )}
                >
                  {action.label}
                  <ArrowUpRight className="size-4" />
                </Link>
              ))}
            </div>
          ) : null}
          {meta?.length ? (
            <ul className="mt-8 flex flex-wrap gap-2">
              {meta.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-foreground/10 bg-background/85 px-3 py-1.5 font-mono text-[0.72rem] uppercase tracking-[0.22em] text-muted-foreground"
                >
                  {item}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        {children ? <div className="lg:pl-4">{children}</div> : null}
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
      ? "bg-[linear-gradient(180deg,rgba(232,242,250,0.62),rgba(250,246,239,0))]"
      : tone === "accent"
        ? "bg-[linear-gradient(180deg,rgba(231,238,225,0.66),rgba(250,246,239,0))]"
        : tone === "ink"
          ? "bg-primary text-primary-foreground"
          : "";

  return (
    <section className={cn("py-18 sm:py-22 lg:py-28", toneClassName, className)} {...props}>
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
          className="h-auto rounded-full border-foreground/10 bg-card/70 px-3 py-1 font-mono text-[0.72rem] uppercase tracking-[0.28em] text-primary/80"
        >
          {eyebrow}
        </Badge>
      ) : null}
      <h2 className="mt-4 text-balance font-heading text-[clamp(2.1rem,4vw,3.35rem)] font-semibold leading-[1.02] tracking-[-0.06em]">
        {title}
      </h2>
      {description ? (
        <div className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
          {description}
        </div>
      ) : null}
    </div>
  );
}
