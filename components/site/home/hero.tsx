import Link from "next/link";
import { Container } from "@/components/site/container";
import { GitHubMark } from "@/components/site/github-mark";
import { buttonVariants } from "@/components/ui/button-variants";
import { navigationLinks, siteConfig } from "@/lib/config";
import { isEarlyAccessConfigured } from "@/lib/early-access-config";
import { cn } from "@/lib/utils";

export const HomeHero = () => {
  const isConfigured = isEarlyAccessConfigured();

  return (
    <section
      aria-labelledby="hero-title"
      className="pt-[5.25rem] pb-[clamp(2rem,3.5vw,2.75rem)] sm:pt-[clamp(5.75rem,6.8vw,6.75rem)]"
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
          className="font-heading text-foreground mt-4 max-w-[18ch] text-[clamp(2.25rem,5.4vw,4.25rem)] leading-[1.02] font-semibold tracking-[-0.03em] text-balance sm:mt-5 sm:max-w-[24ch] sm:tracking-[-0.045em] lg:max-w-none"
        >
          <span className="block">Your website, fundraising, and CRM.</span>{" "}
          <span className="text-muted-foreground mt-1 block">
            Built to work together with AI.
          </span>
        </h1>

        <p className="text-muted-foreground mt-4 max-w-[44rem] text-[1.0625rem] leading-7 text-pretty sm:mt-5 sm:text-xl sm:leading-8">
          Nonprofit teams shouldn’t have to move lists and match receipts across
          separate tools. We’re building <span translate="no">asym</span> for
          missions organizations first, so AI can prepare campaign work, your
          team decides what goes live, and every gift stays tied to its donor
          and receipt.
        </p>

        <div className="mt-6 flex flex-col gap-2.5 sm:mt-7 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
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
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 5v14" />
                <path d="m19 12-7 7-7-7" />
              </svg>
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
