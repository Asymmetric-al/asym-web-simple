import Link from "next/link";
import { Container } from "@/components/site/container";
import { GitHubMark } from "@/components/site/github-mark";
import { GiftSpecimen } from "@/components/site/home/gift-specimen";
import { ArrowRightIcon } from "@/components/site/icons";
import { buttonVariants } from "@/components/ui/button-variants";
import { mobileNavigationLinks, siteConfig } from "@/lib/config";
import { isEarlyAccessConfigured } from "@/lib/early-access-config";
import { cn } from "@/lib/utils";

export const HomeHero = () => {
  const isConfigured = isEarlyAccessConfigured();

  return (
    <section
      aria-labelledby="hero-title"
      className="pt-22 pb-12 sm:pt-26 sm:pb-16 xl:flex xl:min-h-[min(56.25rem,100svh)] xl:items-center xl:pt-24 xl:pb-14"
    >
      <Container>
        <div className="grid gap-8 sm:gap-10 xl:grid-cols-[minmax(0,43fr)_minmax(0,57fr)] xl:items-center xl:gap-12">
          <div className="min-w-0">
            <p className="text-pine font-sans text-sm font-medium">
              Open-source software for missions organizations
            </p>

            <h1
              id="hero-title"
              className="font-heading text-foreground mt-3.5 text-[clamp(2.75rem,5.4vw,4.75rem)] leading-[0.97] font-medium tracking-[-0.03em]"
            >
              <span className="block">One gift.</span>
              <span className="block italic">Three hands.</span>
            </h1>

            <p className="text-muted-foreground mt-4 max-w-[34rem] text-base leading-7 text-pretty sm:mt-5 sm:text-[1.09375rem] sm:leading-8">
              <span translate="no" className="text-foreground font-medium">
                asym
              </span>{" "}
              keeps giving pages, receipts, donor records, and missionary
              updates on one shared record. Donors get receipts, missionaries
              see supporter progress, and your office keeps the full picture,
              with human&#8209;approved AI appeal drafting in development.
            </p>

            <div className="mt-5 flex flex-col gap-2.5 sm:mt-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
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
                  href="/#open-source"
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
                  href="/#product"
                  prefetch={false}
                  className="text-foreground hover:text-pine focus-visible:ring-ring focus-visible:ring-offset-background rounded-xs font-medium underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent"
                >
                  try the sample AI appeal approval
                </Link>
                .
              </p>
            )}
          </div>

          <div className="min-w-0">
            <GiftSpecimen />
          </div>
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
