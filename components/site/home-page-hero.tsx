import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

type Action = {
  label: string;
  href: string;
  variant?: "default" | "outline" | "secondary" | "ghost";
};

export function HomePageHero({
  eyebrow,
  title,
  subtitle,
  description,
  actions,
  meta,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle: ReactNode;
  description: ReactNode;
  actions?: Action[];
  meta?: string[];
  children?: ReactNode;
}) {
  const [primary, secondary] = actions ?? [];

  return (
    <section
      className="relative flex min-h-[min(100dvh,56rem)] flex-col overflow-hidden text-foreground"
      aria-label="Introductory hero"
    >
      <div
        className="absolute inset-0 z-0 lg:inset-x-3 lg:top-3 lg:bottom-0 lg:rounded-b-[2.35rem]"
        aria-hidden
      >
        <Image
          src="/BG.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_40%] saturate-[1.06] brightness-[1.05] contrast-[1.03] [transform:scale(1.04)]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/[0.12] to-background/60 dark:from-background/94 dark:via-background/38 dark:to-background/90" />
        <div
          className="absolute inset-0 opacity-[0.11] mix-blend-overlay dark:opacity-[0.2] dark:mix-blend-soft-light"
          style={{
            backgroundImage: `linear-gradient(0deg, transparent 2px, transparent 4px, color-mix(in srgb, var(--foreground) 14%, transparent) 4px, color-mix(in srgb, var(--foreground) 14%, transparent) 5px), linear-gradient(90deg, transparent 2px, transparent 4px, color-mix(in srgb, var(--foreground) 14%, transparent) 4px, color-mix(in srgb, var(--foreground) 14%, transparent) 5px)`,
            backgroundSize: "5px 5px",
          }}
        />
        <div className="from-accent/30 via-transparent to-primary/20 absolute inset-0 bg-gradient-to-tr opacity-90 dark:from-accent/15 dark:to-primary/25 dark:opacity-70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-10%,color-mix(in_srgb,var(--glow-primary)_55%,transparent),transparent_55%)]" />
      </div>

      <div className="relative z-10 flex flex-1 flex-col">
        <div className="flex flex-1 flex-col items-center justify-start px-4 pt-[clamp(7.25rem,18vh,10.75rem)] pb-8 text-center max-lg:items-stretch max-lg:text-left sm:px-6 lg:px-8">
          <div className="w-full max-w-4xl max-lg:mx-0 lg:mx-auto">
            <Badge
              variant="outline"
              className="h-auto rounded-full border-foreground/12 bg-card/88 px-3.5 py-1.5 font-mono text-[0.72rem] uppercase tracking-[0.28em] text-primary/85 shadow-sm backdrop-blur-md"
            >
              {eyebrow}
            </Badge>
            <div className="mt-6 min-w-0">{title}</div>
            <div className="mt-4 min-w-0">{subtitle}</div>
            <div
              className={cn(
                "content-measure mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8",
                "max-lg:mx-0"
              )}
            >
              {description}
            </div>

            {primary ? (
              <div className="mt-8 flex flex-col items-center gap-3 max-lg:items-stretch sm:flex-row sm:flex-wrap sm:justify-center">
                <Link
                  href={primary.href}
                  className="group/cta relative inline-flex w-full max-w-md items-center overflow-visible sm:w-auto sm:max-w-none"
                >
                  <span
                    className="bg-accent absolute inset-y-0 left-0 right-[2.75rem] rounded-full shadow-sm"
                    aria-hidden
                  />
                  <span
                    className={cn(
                      buttonVariants({ size: "lg", variant: "default" }),
                      "relative z-10 min-h-11 min-w-0 flex-1 rounded-full border-transparent px-6 shadow-none"
                    )}
                  >
                    {primary.label}
                  </span>
                  <span
                    className={cn(
                      "border-accent-foreground/18 relative z-10 -ml-px flex size-11 shrink-0 items-center justify-center rounded-full border bg-primary text-primary-foreground",
                      "shadow-[0_16px_44px_-28px_rgba(30,58,79,0.72)]"
                    )}
                  >
                    <ArrowDownRight
                      className="size-4 transition-transform duration-300 group-hover/cta:-rotate-45"
                      aria-hidden
                    />
                  </span>
                </Link>
                {secondary ? (
                  <Link
                    href={secondary.href}
                    className={cn(
                      buttonVariants({
                        variant: secondary.variant ?? "outline",
                        size: "lg",
                      }),
                      "px-6"
                    )}
                  >
                    {secondary.label}
                    <ArrowUpRight data-icon="inline-end" />
                  </Link>
                ) : null}
              </div>
            ) : null}

            {meta?.length ? (
              <ul className="mt-8 flex flex-wrap justify-center gap-2.5 max-lg:justify-start">
                {meta.map((item) => (
                  <li
                    key={item}
                    className="text-resilient max-w-full rounded-full border border-foreground/10 bg-background/78 px-3 py-1.5 text-center font-mono text-[0.72rem] uppercase tracking-[0.22em] text-muted-foreground shadow-[0_14px_34px_-28px_rgba(22,33,43,0.35)] backdrop-blur-sm dark:bg-background/55"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>

        {children ? (
          <div className="relative z-10 w-full px-4 pb-12 pt-2 sm:px-6 lg:px-8">
            {children}
          </div>
        ) : null}
      </div>
    </section>
  );
}
