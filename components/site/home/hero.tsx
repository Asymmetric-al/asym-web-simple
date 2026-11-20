import Link from "next/link";
import { Container } from "@/components/site/container";
import { GitHubMark } from "@/components/site/github-mark";
import { GiftSpecimen } from "@/components/site/home/gift-specimen";
import { ArrowDownIcon } from "@/components/site/icons";
import { buttonVariants } from "@/components/ui/button-variants";
import { mobileNavigationLinks, siteConfig } from "@/lib/config";
import { isEarlyAccessConfigured } from "@/lib/early-access-config";
import { cn } from "@/lib/utils";

const legendItems = [
  {
    label: "Public code",
    detail: "Giving, receipts, donor & missionary views",
    dotClass: "bg-pine",
  },
  {
    label: "In development",
    detail: "AI appeal drafting & approval rules",
    dotClass: "border border-dashed border-draft bg-transparent",
  },
  {
    label: "Human decision",
    detail: "Approval stamps & live actions",
    dotClass: "bg-vermilion",
  },
] as const;

export const HomeHero = () => {
  const isConfigured = isEarlyAccessConfigured();

  return (
    <section
      aria-labelledby="hero-title"
      className="pt-24 pb-14 sm:pt-28 sm:pb-20 lg:flex lg:min-h-[min(56.25rem,100svh)] lg:items-center lg:pt-24 lg:pb-16"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,44fr)_minmax(0,56fr)] lg:items-start lg:gap-12">
          <div className="min-w-0 lg:pt-2">
            <p className="text-pine font-sans text-sm font-medium">
              Open-source software for missions organizations
            </p>

            <h1
              id="hero-title"
              className="font-heading text-foreground mt-4 text-[clamp(2.85rem,5.6vw,4.75rem)] leading-[0.98] font-medium tracking-[-0.03em]"
            >
              <span className="block">One gift.</span>
              <span className="block italic">Three hands.</span>
            </h1>

            <p className="text-muted-foreground mt-5 max-w-[36rem] text-base leading-7 text-pretty sm:text-[1.09375rem] sm:leading-8">
              A donor gives. A receipt goes out. A missionary sees the gift.
              Your office has the full picture.{" "}
              <span translate="no" className="text-foreground font-medium">
                asym
              </span>{" "}
              keeps giving pages, receipts, donor records, and missionary
              updates on one open&#8209;source record, with human&#8209;approved
              AI appeal drafting in development.
            </p>

            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
              {isConfigured ? (
                <Link
                  href={siteConfig.cta.primary.href}
                  prefetch={false}
                  className={cn(buttonVariants({ size: "lg" }), "px-6")}
                >
                  {siteConfig.cta.primary.label}
                </Link>
              ) : (
                <Link
                  href="/#product"
                  prefetch={false}
                  className={cn(buttonVariants({ size: "lg" }), "px-6")}
                >
                  See AI appeal approval
                  <ArrowDownIcon />
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

            {/* Unified three-ink key — states visual grammar once for the entire page */}
            <dl className="border-rule mt-8 grid gap-3 border-t pt-5 sm:grid-cols-3 lg:grid-cols-1 lg:gap-2.5">
              {legendItems.map((item) => (
                <div
                  key={item.label}
                  className="flex items-baseline gap-2.5 text-xs leading-5"
                >
                  <dt className="text-foreground inline-flex shrink-0 items-center gap-2 font-mono font-medium">
                    <span
                      aria-hidden="true"
                      className={cn(
                        "inline-block size-2 rounded-full",
                        item.dotClass
                      )}
                    />
                    {item.label}
                  </dt>
                  <dd className="text-muted-foreground">{item.detail}</dd>
                </div>
              ))}
            </dl>
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
