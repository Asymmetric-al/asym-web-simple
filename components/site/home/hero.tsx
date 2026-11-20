import Link from "next/link";
import { Container } from "@/components/site/container";
import { GitHubMark } from "@/components/site/github-mark";
import { ArrowDownIcon } from "@/components/site/icons";
import { buttonVariants } from "@/components/ui/button-variants";
import { navigationLinks, siteConfig } from "@/lib/config";
import { isEarlyAccessConfigured } from "@/lib/early-access-config";
import { cn } from "@/lib/utils";

export const HomeHero = () => {
  const isConfigured = isEarlyAccessConfigured();

  return (
    <section
      aria-labelledby="hero-title"
      className="pt-[5rem] pb-[clamp(1.5rem,2.8vw,2.25rem)] sm:pt-[clamp(5.5rem,6vw,6.25rem)]"
    >
      <Container>
        <div className="border-rule bg-card/85 inline-flex max-w-full flex-col items-start gap-1 rounded-[1rem] border px-3.5 py-2 text-sm shadow-[inset_0_1px_0_rgb(255_255_255/60%)] sm:flex-row sm:items-center sm:gap-3 sm:rounded-full sm:py-1.5 dark:shadow-[inset_0_1px_0_rgb(237_243_247/6%)]">
          <span className="text-foreground font-medium">
            Open-source software for nonprofits
          </span>
          <span
            aria-hidden="true"
            className="bg-rule hidden h-3.5 w-px sm:inline-block"
          />
          <span className="text-muted-foreground inline-flex items-center gap-1.5 font-mono text-xs tracking-[0.04em]">
            <span
              aria-hidden="true"
              className="bg-ring size-1.5 shrink-0 rounded-full"
            />
            Launching soon
          </span>
        </div>

        <h1
          id="hero-title"
          className="font-heading text-foreground mt-4 max-w-[18ch] text-[clamp(2.15rem,5vw,4rem)] leading-[1.03] font-semibold tracking-[-0.025em] text-balance sm:mt-5 sm:max-w-[24ch] sm:tracking-[-0.035em] lg:max-w-none"
        >
          <span className="block">Website, giving, and donor records.</span>{" "}
          <span className="text-muted-foreground mt-1 block">
            One platform built to work with AI.
          </span>
        </h1>

        <p className="text-muted-foreground mt-4 max-w-[44rem] text-[1.0625rem] leading-7 text-pretty sm:mt-4 sm:text-[1.1875rem] sm:leading-8">
          We’re building <span translate="no">asym</span> for missions
          organizations reconciling gifts across separate tools. Website pages,
          giving, receipts, and donor records are in the public code. AI
          campaign drafting and approvals are in development.
        </p>

        <div className="mt-5 flex flex-col gap-2.5 sm:mt-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
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
          </a>
        </div>

        <nav
          aria-label="On this page"
          className="border-rule mt-5 border-t pt-2 md:hidden"
        >
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm">
            {navigationLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  prefetch={false}
                  className="text-foreground/78 hover:text-foreground focus-visible:ring-ring focus-visible:ring-offset-background inline-flex min-h-11 items-center rounded-[0.375rem] font-medium underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </section>
  );
};
