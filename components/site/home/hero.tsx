import Link from "next/link";
import { Container } from "@/components/site/container";
import { GitHubMark } from "@/components/site/github-mark";
import { ArrowRightIcon } from "@/components/site/icons";
import { ThemedPlate } from "@/components/site/themed-plate";
import { buttonVariants } from "@/components/ui/button-variants";
import { siteConfig } from "@/lib/config";
import { isEarlyAccessConfigured } from "@/lib/early-access-config";
import { cn } from "@/lib/utils";

const plateIndex = [
  {
    num: "01",
    role: "Donor",
    detail: "Portal & receipts",
    href: "#surface-donor",
  },
  {
    num: "02",
    role: "Missionary",
    detail: "Redacted roster",
    href: "#surface-missionary",
  },
  {
    num: "03",
    role: "Office",
    detail: "Ledger & CRM",
    href: "#surface-office",
  },
] as const;

const HERO_PLATE_ALT =
  "Copperplate pen-and-ink triptych showing three hands joined by a single continuous ink line: a donor hand sealing a blank envelope, a missionary hand holding a blank folded letter before pine mountains, and an office hand guiding a fountain pen on an open ledger marked with a hatched vermilion wax seal.";

const HERO_PLATE_SIZES =
  "(min-width: 1024px) 54vw, (min-width: 640px) 36rem, calc(100vw - 2rem)";
const HERO_CTA_PADDING = "px-5 xl:px-6";

export const HomeHero = () => {
  const isConfigured = isEarlyAccessConfigured();

  return (
    <section
      aria-labelledby="hero-title"
      className="pt-20 pb-8 sm:pt-24 sm:pb-12 lg:pt-28 lg:pb-14"
    >
      <Container>
        <div className="grid gap-7 lg:grid-cols-[minmax(0,46fr)_minmax(0,54fr)] lg:items-center lg:gap-10 xl:grid-cols-[minmax(0,44fr)_minmax(0,56fr)] xl:gap-16">
          <div className="min-w-0">
            <p className="text-pine font-sans text-sm font-medium">
              Open-source giving and donor records for missions organizations
            </p>

            <h1
              id="hero-title"
              className="font-heading text-foreground mt-2.5 text-[clamp(3rem,6.8vw,5.25rem)] leading-[0.95] font-medium tracking-[-0.03em]"
            >
              <span className="block">One gift.</span>
              <span className="block italic">Three hands.</span>
            </h1>

            <p className="text-foreground/88 mt-4 max-w-[33rem] text-base leading-7 text-pretty sm:mt-5 sm:text-[1.09375rem] sm:leading-7">
              Supporters pull their own receipts. Missionaries track assigned
              support while donors stay private by default. Office staff keep
              one ledger.
            </p>
            <p className="text-muted-foreground mt-2 max-w-[33rem] text-sm leading-6 text-pretty sm:mt-2.5">
              Open source today; hosted access isn’t open yet.
            </p>

            <div className="mt-5 flex flex-row flex-wrap items-center gap-x-4 gap-y-2.5 sm:mt-7">
              {isConfigured ? (
                <Link
                  href={siteConfig.cta.primary.href}
                  prefetch={false}
                  className={cn(buttonVariants({ size: "lg" }), HERO_CTA_PADDING)}
                >
                  {siteConfig.cta.primary.label}
                  <ArrowRightIcon dataIcon="inline-end" />
                </Link>
              ) : (
                <Link
                  href="/#product"
                  prefetch={false}
                  className={cn(
                    buttonVariants({ variant: "ink", size: "lg" }),
                    HERO_CTA_PADDING
                  )}
                >
                  Explore the three roles
                  <ArrowRightIcon dataIcon="inline-end" />
                </Link>
              )}
              <a
                href={siteConfig.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground focus-visible:ring-ring focus-visible:ring-offset-background inline-flex min-h-11 items-center gap-2 rounded-md px-1 text-sm font-medium underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent [@media(hover:hover)_and_(pointer:fine)]:hover:text-pine"
              >
                <GitHubMark className="size-4 shrink-0" />
                View the code
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </div>

          {/* Plate I: single embossed copperplate impression directly on rag paper */}
          <figure className="relative mx-auto w-full min-w-0 lg:mx-0">
            <div className="plate-impression relative aspect-[4/3] overflow-hidden">
              <ThemedPlate
                name="three-hands-plate"
                alt={HERO_PLATE_ALT}
                sizes={HERO_PLATE_SIZES}
                priority
              />
            </div>

            {/* Subtle continuous ink thread divider echoing the triptych motif */}
            <svg
              viewBox="0 0 320 10"
              fill="none"
              aria-hidden="true"
              className="mt-2.5 block h-2.5 w-full"
              preserveAspectRatio="none"
            >
              <path
                d="M0 5 C 72 1, 128 9, 184 5 C 236 1.5, 276 8, 320 5"
                stroke="var(--pine)"
                strokeOpacity="0.45"
                strokeWidth="1.25"
                className="ink-thread-reveal"
              />
            </svg>

            <figcaption className="mt-1">
              <div className="flex flex-wrap items-baseline justify-between gap-2 pb-1.5 text-[0.8125rem]">
                <span className="text-foreground font-mono font-medium">
                  Plate I · Three hands, one record
                </span>
                <span className="text-muted-foreground font-mono">
                  Jump to a role
                </span>
              </div>
              <div className="border-rule divide-rule grid grid-cols-1 divide-y border-t pt-1 text-xs min-[400px]:grid-cols-3 min-[400px]:gap-2 min-[400px]:divide-y-0">
                {plateIndex.map((item) => (
                  <a
                    key={item.num}
                    href={item.href}
                    className="group focus-visible:ring-ring focus-visible:ring-offset-background flex min-h-11 min-w-0 flex-col justify-center rounded-sm py-1 focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-2 focus-visible:outline-transparent"
                  >
                    <span className="text-foreground inline-flex items-center gap-1 font-sans leading-4 font-semibold underline-offset-4 [@media(hover:hover)_and_(pointer:fine)]:group-hover:text-pine [@media(hover:hover)_and_(pointer:fine)]:group-hover:underline">
                      <span className="text-pine mr-0.5 font-mono font-medium tabular-nums">
                        {item.num}
                      </span>{" "}
                      <span>{item.role}</span>
                      <span
                        aria-hidden="true"
                        className="text-pine opacity-60 transition-[opacity,transform] duration-150 group-focus-visible:opacity-100 [@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-y-0.5 [@media(hover:hover)_and_(pointer:fine)]:group-hover:opacity-100"
                      >
                        &darr;
                      </span>
                    </span>
                    <span className="text-muted-foreground mt-0.5 block text-[0.8125rem] leading-4">
                      {item.detail}
                    </span>
                  </a>
                ))}
              </div>
            </figcaption>
          </figure>
        </div>
      </Container>
    </section>
  );
};
