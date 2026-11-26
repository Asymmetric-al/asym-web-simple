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
            <p className="text-signal font-sans text-sm font-medium tracking-[-0.005em]">
              Open-source software for Christian missions organizations
            </p>

            <h1
              id="hero-title"
              className="font-heading text-foreground mt-3.5 text-[clamp(2.2rem,4.7vw,4.15rem)] leading-[1.03] font-bold tracking-[-0.035em]"
            >
              <span className="block">Run a large mission</span>{" "}
              <span className="block">from a small office.</span>
            </h1>

            <p className="text-foreground/88 mt-6 max-w-[36rem] text-base leading-7 text-pretty sm:text-lg sm:leading-8">
              Most missions offices juggle a separate website, giving form,
              donor database, and spreadsheets just to keep supporters and
              missionaries informed.{" "}
              <span translate="no" className="text-foreground font-medium">
                {siteConfig.shortName}
              </span>{" "}
              brings your website, giving, receipts, missionary micro-CRMs, and
              office workflows into one open-source system, so every team works
              from the same live records.
            </p>

            <p className="text-muted-foreground mt-3.5 inline-flex max-w-[36rem] items-start gap-2.5 font-sans text-sm leading-6">
              <span
                aria-hidden="true"
                className={cn(
                  "mt-[0.45rem] size-2 shrink-0 rounded-full",
                  isConfigured
                    ? "bg-human"
                    : "border-draft border border-dashed"
                )}
              />
              <span>
                {isConfigured
                  ? "The open-source code is public on GitHub today. Early access is open for hosted pilots."
                  : "The open-source code is public on GitHub today. Hosted early access opens soon."}
              </span>
            </p>

            <div className="mt-6 flex flex-row flex-wrap items-center gap-x-3 gap-y-2.5 sm:mt-8 sm:gap-x-3.5">
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
                  href="/#product"
                  prefetch={false}
                  className={cn(buttonVariants({ size: "lg" }), HERO_CTA_CLASS)}
                >
                  See the platform
                  <ArrowRightIcon dataIcon="inline-end" />
                </Link>
              )}
              <a
                href={siteConfig.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "px-4 text-sm whitespace-nowrap sm:px-5 sm:text-[0.9375rem]"
                )}
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
