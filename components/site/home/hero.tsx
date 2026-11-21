import Link from "next/link";
import { Container } from "@/components/site/container";
import { GitHubMark } from "@/components/site/github-mark";
import { AsymmetricFieldHero } from "@/components/site/home/asymmetric-field";
import { ArrowRightIcon } from "@/components/site/icons";
import { buttonVariants } from "@/components/ui/button-variants";
import { siteConfig } from "@/lib/config";
import { isEarlyAccessConfigured } from "@/lib/early-access-config";
import { cn } from "@/lib/utils";

const HERO_CTA_CLASS = "px-4 text-sm sm:px-5 sm:text-[0.9375rem] xl:px-6";

export const HomeHero = () => {
  const isConfigured = isEarlyAccessConfigured();

  return (
    <section
      aria-labelledby="hero-title"
      className="pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,52fr)_minmax(0,48fr)] lg:items-center lg:gap-12 xl:gap-16">
          <div className="min-w-0">
            <p className="text-signal font-sans text-sm font-medium">
              Open-source software for nonprofits
            </p>

            <h1
              id="hero-title"
              className="font-heading text-foreground mt-3 text-[clamp(2.85rem,6.2vw,4.85rem)] leading-[1.01] font-bold tracking-[-0.035em]"
            >
              <span className="block">Less overhead.</span>
              <span className="block">Outsized impact.</span>
            </h1>

            <p className="text-foreground/88 mt-5 max-w-[36rem] text-base leading-7 text-pretty sm:text-[1.125rem] sm:leading-8">
              <span translate="no" className="text-foreground font-medium">
                {siteConfig.shortName}
              </span>{" "}
              brings giving, donor care, and operations onto one open-source
              foundation for nonprofits of any size, with practical AI in
              development to take campaign prep and routine admin off your
              plate. Named for asymmetric leverage: outsized impact from the
              care and effort your people put in.
            </p>

            <p className="text-muted-foreground mt-3.5 inline-flex max-w-[36rem] items-center gap-2 font-sans text-sm leading-6">
              <span
                aria-hidden="true"
                className={cn(
                  "size-2 shrink-0 rounded-full",
                  isConfigured
                    ? "bg-human"
                    : "border-draft border border-dashed"
                )}
              />
              <span>
                {isConfigured
                  ? "Public open-source code today. Early-access requests are open for hosted pilots; AI tools are in development."
                  : "Public open-source code today. Hosted access and AI tools aren’t open yet."}
              </span>
            </p>

            <div className="mt-6 flex flex-row flex-wrap items-center gap-x-3 gap-y-2.5 sm:mt-8 sm:gap-x-4">
              {isConfigured ? (
                <Link
                  href={siteConfig.cta.primary.href}
                  prefetch={false}
                  className={cn(buttonVariants({ size: "lg" }), HERO_CTA_CLASS)}
                >
                  {siteConfig.cta.primary.label}
                  <ArrowRightIcon dataIcon="inline-end" />
                </Link>
              ) : (
                <Link
                  href="/#where-things-stand"
                  prefetch={false}
                  className={cn(
                    buttonVariants({ variant: "ink", size: "lg" }),
                    HERO_CTA_CLASS
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
                className="text-foreground focus-visible:ring-ring focus-visible:ring-offset-background inline-flex min-h-11 items-center gap-1.5 rounded-md px-1.5 text-sm font-medium whitespace-nowrap underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent sm:gap-2 [@media(hover:hover)_and_(pointer:fine)]:hover:text-signal"
              >
                <GitHubMark className="size-4 shrink-0" />
                View the code
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </div>

          <div className="min-w-0">
            <AsymmetricFieldHero />
          </div>
        </div>
      </Container>
    </section>
  );
};
