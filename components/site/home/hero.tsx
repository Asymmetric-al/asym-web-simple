import Link from "next/link";
import { Container } from "@/components/site/container";
import { GitHubMark } from "@/components/site/github-mark";
import { ArrowDownIcon } from "@/components/site/icons";
import { buttonVariants } from "@/components/ui/button-variants";
import { mobileNavigationLinks, siteConfig } from "@/lib/config";
import { isEarlyAccessConfigured } from "@/lib/early-access-config";
import { cn } from "@/lib/utils";

const heroStatus = [
  {
    label: "In the public code",
    dashed: false,
    detail: "Website pages, giving, receipts, and donor records.",
  },
  {
    label: "In development",
    dashed: true,
    detail: "AI campaign drafting, approvals, and publishing.",
  },
] as const;

export const HomeHero = () => {
  const isConfigured = isEarlyAccessConfigured();

  return (
    <section
      aria-labelledby="hero-title"
      className="pt-[4.75rem] pb-6 sm:pt-[clamp(5.25rem,5.5vw,5.75rem)] sm:pb-7"
    >
      <Container>
        <p className="border-rule bg-card/85 text-foreground inline-flex max-w-full items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium shadow-[inset_0_1px_0_rgb(255_255_255/60%)] sm:text-sm dark:shadow-[inset_0_1px_0_rgb(237_243_247/6%)]">
          <span
            aria-hidden="true"
            className="bg-ring size-1.5 shrink-0 rounded-full"
          />
          Open-source software for nonprofits
        </p>

        <h1
          id="hero-title"
          className="font-heading text-foreground mt-4 max-w-[18ch] text-[clamp(1.9rem,5.1vw,4rem)] leading-[1.03] font-semibold tracking-[-0.025em] text-balance sm:mt-4 sm:max-w-[24ch] sm:tracking-[-0.035em] lg:max-w-none"
        >
          <span className="block">Website, giving, and donor records.</span>{" "}
          <span className="text-muted-foreground mt-1 block text-[1.45rem] leading-[1.12] font-medium min-[375px]:text-[1.8rem] sm:text-[1em] sm:leading-[1.03]">
            One platform built to work with AI.
          </span>
        </h1>

        <div className="mt-4 grid gap-5 lg:mt-5 lg:grid-cols-[minmax(0,58fr)_minmax(0,42fr)] lg:items-start lg:gap-12">
          <div className="min-w-0">
            <p className="text-muted-foreground max-w-[40rem] text-base leading-7 text-pretty sm:text-[1.125rem] sm:leading-8">
              We’re building <span translate="no">asym</span> for missions
              organizations so receipts, donor history, and missionary updates
              stay connected, with AI campaign drafting in development.
            </p>

            <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
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
                  See how it works
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
          </div>

          <dl className="border-rule grid gap-3 border-t pt-4 sm:grid-cols-2 lg:grid-cols-1 lg:gap-4 lg:border-t-0 lg:border-l lg:pt-0.5 lg:pl-7">
            {heroStatus.map((item) => (
              <div key={item.label} className="min-w-0">
                <dt className="text-muted-foreground flex items-center gap-2 font-mono text-xs font-medium tracking-[0.02em]">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "border-ink inline-block w-3.5 border-t-[1.5px]",
                      item.dashed && "border-dashed"
                    )}
                  />
                  {item.label}
                </dt>
                <dd
                  className={cn(
                    "mt-1 text-[0.9375rem] leading-6 text-pretty",
                    item.dashed ? "text-muted-foreground" : "text-foreground"
                  )}
                >
                  {item.detail}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <noscript>
          <nav
            aria-label="Homepage sections"
            className="border-rule mt-5 border-t pt-2 md:hidden"
          >
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm">
              {mobileNavigationLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    prefetch={false}
                    className="text-foreground/78 hover:text-foreground inline-flex min-h-11 items-center rounded-[0.375rem] font-medium underline-offset-4 hover:underline"
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
