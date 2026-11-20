import Link from "next/link";
import { Container } from "@/components/site/container";
import { GitHubMark } from "@/components/site/github-mark";
import { ArrowRightIcon } from "@/components/site/icons";
import { ThemedPlate } from "@/components/site/themed-plate";
import { buttonVariants } from "@/components/ui/button-variants";
import { mobileNavigationLinks, siteConfig } from "@/lib/config";
import { isEarlyAccessConfigured } from "@/lib/early-access-config";
import { cn } from "@/lib/utils";

const plateIndex = [
  {
    num: "01",
    role: "Donor",
    detail: "Giving & receipts",
    href: "#surface-donor",
  },
  {
    num: "02",
    role: "Missionary",
    detail: "Scoped roster",
    href: "#surface-missionary",
  },
  {
    num: "03",
    role: "Office",
    detail: "Full ledger",
    href: "#surface-office",
  },
] as const;

const HERO_PLATE_ALT =
  "Copperplate pen-and-ink triptych showing three hands joined by a single continuous ink line: a donor hand sealing a blank envelope, a missionary hand holding a blank folded letter before pine mountains, and an office hand guiding a fountain pen on an open ledger marked with a hatched vermilion wax seal.";

const HERO_PLATE_SIZES =
  "(min-width: 1024px) 52vw, (min-width: 640px) 33.75rem, calc(100vw - 3.75rem)";

export const HomeHero = () => {
  const isConfigured = isEarlyAccessConfigured();

  return (
    <section
      aria-labelledby="hero-title"
      className="pt-22 pb-12 sm:pt-26 sm:pb-16 xl:flex xl:min-h-[min(56.25rem,100svh)] xl:items-center xl:pt-24 xl:pb-14"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,44fr)_minmax(0,56fr)] lg:items-center lg:gap-12 xl:gap-16">
          <div className="min-w-0">
            <p className="text-pine font-sans text-sm font-medium">
              Open-source software for missions organizations
            </p>

            <h1
              id="hero-title"
              className="font-heading text-foreground mt-3.5 text-[clamp(2.85rem,5.6vw,4.9rem)] leading-[0.96] font-medium tracking-[-0.03em]"
            >
              <span className="block">One gift.</span>
              <span className="block italic">Three hands.</span>
            </h1>

            <p className="text-muted-foreground mt-5 max-w-[33rem] text-base leading-7 text-pretty sm:text-[1.09375rem] sm:leading-8">
              <span translate="no" className="text-foreground font-medium">
                asym
              </span>{" "}
              connects giving pages, receipts, donor records, and missionary
              updates on one shared platform with public open&#8209;source code.
              A hosted version for your team and human&#8209;approved AI appeal
              drafting are in development.
            </p>

            <div className="mt-7 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
              {isConfigured ? (
                <Link
                  href={siteConfig.cta.primary.href}
                  prefetch={false}
                  className={cn(buttonVariants({ size: "lg" }), "px-6")}
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
                    "px-6"
                  )}
                >
                  See what’s built
                  <ArrowRightIcon dataIcon="inline-end" />
                </Link>
              )}
              <a
                href={siteConfig.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "px-6"
                )}
              >
                <GitHubMark className="size-4" />
                View the code
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </div>

          {/* Bespoke copperplate triptych ("One gift. Three hands.") — zero fake product UI */}
          <figure className="relative mx-auto w-full max-w-[36rem] min-w-0 lg:mx-0 lg:max-w-none">
            <span
              aria-hidden="true"
              className="text-rule-strong pointer-events-none absolute -top-3 -left-2 hidden font-mono text-xs select-none sm:block"
            >
              +
            </span>
            <span
              aria-hidden="true"
              className="text-rule-strong pointer-events-none absolute -top-3 -right-2 hidden font-mono text-xs select-none sm:block"
            >
              +
            </span>

            <div className="surface-hero overflow-hidden rounded-2xl p-3 sm:p-4">
              <div className="border-rule aspect-[4/3] overflow-hidden rounded-xl border bg-[#f3eee3] dark:bg-[#111e28]">
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

              <figcaption className="mt-0.5 grid grid-cols-3 gap-2 px-1 text-xs">
                {plateIndex.map((item) => (
                  <a
                    key={item.num}
                    href={item.href}
                    className="group focus-visible:ring-ring focus-visible:ring-offset-card flex min-h-11 min-w-0 flex-col justify-center rounded-md py-1.5 focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-2 focus-visible:outline-transparent"
                  >
                    <span className="text-foreground group-hover:text-pine block font-sans leading-4 font-semibold underline-offset-4 group-hover:underline">
                      <span className="text-pine mr-1.5 font-mono font-medium tabular-nums">
                        {item.num}
                      </span>{" "}
                      {item.role}
                    </span>
                    <span className="text-muted-foreground mt-0.5 block text-[0.75rem] leading-4">
                      {item.detail}
                    </span>
                  </a>
                ))}
              </figcaption>
            </div>
          </figure>
        </div>

        <noscript>
          <nav
            aria-label="Homepage sections"
            className="border-rule mt-8 border-t pt-2 md:hidden"
          >
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm">
              {mobileNavigationLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    prefetch={false}
                    className="text-foreground/82 hover:text-foreground inline-flex min-h-11 items-center rounded-md font-medium underline-offset-4 hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </noscript>
      </Container>
    </section>
  );
};
