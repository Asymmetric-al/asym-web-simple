import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/site/container";
import { GitHubMark } from "@/components/site/github-mark";
import { ArrowRightIcon } from "@/components/site/icons";
import { buttonVariants } from "@/components/ui/button-variants";
import { mobileNavigationLinks, siteConfig } from "@/lib/config";
import { isEarlyAccessConfigured } from "@/lib/early-access-config";
import { cn } from "@/lib/utils";

const plateIndex = [
  { num: "01", role: "Donor", detail: "Giving & receipts" },
  { num: "02", role: "Missionary", detail: "Scoped roster" },
  { num: "03", role: "Office", detail: "Full ledger" },
] as const;

export const HomeHero = () => {
  const isConfigured = isEarlyAccessConfigured();

  return (
    <section
      aria-labelledby="hero-title"
      className="pt-22 pb-12 sm:pt-26 sm:pb-16 xl:flex xl:min-h-[min(56.25rem,100svh)] xl:items-center xl:pt-24 xl:pb-14"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,45fr)_minmax(0,55fr)] lg:items-center lg:gap-12 xl:gap-16">
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
              updates on one shared open&#8209;source platform, with
              human&#8209;approved AI appeal drafting in development.
            </p>

            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
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

            {isConfigured ? null : (
              <p className="text-muted-foreground mt-4 text-sm leading-6">
                Also in development:{" "}
                <Link
                  href="/#appeals"
                  prefetch={false}
                  className="text-foreground hover:text-pine focus-visible:ring-ring focus-visible:ring-offset-background rounded-xs font-medium underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent"
                >
                  how AI drafting stops for human sign-off
                </Link>
                .
              </p>
            )}
          </div>

          {/* Bespoke editorial printmaking plate — zero fake product screens or fictional data */}
          <figure className="relative min-w-0">
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
                <Image
                  src="/art/three-hands-plate.webp"
                  alt="Editorial pen-and-ink print showing a single continuous ink line connecting three framed panes: a blank correspondence envelope, a distant pine hillside, and an open ruled ledger book sealed with a vermilion mark."
                  width={1200}
                  height={900}
                  priority
                  unoptimized
                  className="block h-full w-full object-cover dark:hidden"
                />
                <Image
                  src="/art/three-hands-plate-dark.webp"
                  alt="Editorial pen-and-ink print showing a single continuous ink line connecting three framed panes: a blank correspondence envelope, a distant pine hillside, and an open ruled ledger book sealed with a vermilion mark."
                  width={1200}
                  height={900}
                  unoptimized
                  className="hidden h-full w-full object-cover dark:block"
                />
              </div>

              <figcaption className="mt-3 grid grid-cols-3 gap-2 px-1 pt-1 text-xs">
                {plateIndex.map((item) => (
                  <div key={item.num} className="min-w-0">
                    <p className="text-foreground font-sans leading-4 font-semibold">
                      <span className="text-pine mr-1.5 font-mono font-medium tabular-nums">
                        {item.num}
                      </span>
                      {item.role}
                    </p>
                    <p className="text-muted-foreground mt-0.5 text-[0.75rem] leading-4">
                      {item.detail}
                    </p>
                  </div>
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
