import Link from "next/link";
import { Container } from "@/components/site/container";
import { GitHubMark } from "@/components/site/github-mark";
import { StatusPill } from "@/components/site/home/section-heading";
import { buttonVariants } from "@/components/ui/button-variants";
import { navigationLinks, siteConfig } from "@/lib/config";
import { isEarlyAccessConfigured } from "@/lib/early-access-config";
import { cn } from "@/lib/utils";

export const HomeHero = () => {
  const isConfigured = isEarlyAccessConfigured();

  return (
    <section
      aria-labelledby="hero-title"
      className="pt-[5.5rem] pb-[clamp(2.25rem,4vw,3.25rem)] sm:pt-[clamp(6.25rem,8vw,7.75rem)]"
    >
      <Container>
        <ul
          className="flex flex-wrap items-center gap-2 text-sm"
          aria-label="Status"
        >
          <li className="border-foreground/14 bg-card/80 text-foreground inline-flex min-h-8 items-center rounded-full border px-3.5 py-1 font-medium">
            Open-source software for nonprofits
          </li>
          <li>
            <StatusPill>Launching soon</StatusPill>
          </li>
        </ul>

        <h1
          id="hero-title"
          className="font-heading text-foreground mt-4 max-w-[18ch] text-[clamp(2.25rem,5.6vw,4.35rem)] leading-[1.02] font-semibold tracking-[-0.03em] text-balance sm:mt-6 sm:max-w-[24ch] sm:tracking-[-0.045em] lg:max-w-none"
        >
          <span className="block">Your website, fundraising, and CRM.</span>{" "}
          <span className="text-muted-foreground mt-1 block">
            Built to work together with AI.
          </span>
        </h1>

        <p className="text-muted-foreground mt-4 max-w-[44rem] text-[1.0625rem] leading-7 text-pretty sm:mt-6 sm:text-xl sm:leading-9">
          We’re building <span translate="no">asym</span> for missions
          organizations first. The goal: prepare an appeal with AI, let your
          team decide what goes live, and keep each gift connected to its donor
          and receipt.
        </p>

        <div className="mt-6 flex flex-col gap-2.5 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
          <Link
            href={siteConfig.cta.primary.href}
            className={cn(buttonVariants({ size: "lg" }), "px-6")}
          >
            {isConfigured ? siteConfig.cta.primary.label : "Early access status"}
          </Link>
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

        <div className="datum-lid bg-record/70 mt-6 rounded-t-[1.875rem] px-4 pt-4 pb-3.5 sm:mt-10 sm:px-7 sm:pt-6 sm:pb-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <p className="text-muted-foreground flex items-baseline gap-3 text-sm leading-6 sm:text-[0.9375rem]">
              <span
                aria-hidden="true"
                className="border-ink inline-block w-4 shrink-0 -translate-y-0.5 border-t-[1.5px] border-dashed"
              />
              <span>
                <span className="text-foreground font-medium">
                  First workflow in development:
                </span>{" "}
                a fundraising appeal your team reviews.
              </span>
            </p>
            <Link
              href="/#product"
              className="text-primary hover:text-foreground focus-visible:ring-ring focus-visible:ring-offset-background hidden shrink-0 items-center gap-1.5 rounded-[0.375rem] font-mono text-xs font-medium tracking-[0.02em] underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent md:inline-flex"
            >
              See how it works
              <svg
                width="14"
                height="14"
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
          </div>
        </div>

        <nav
          aria-label="On this page"
          className="border-foreground/10 mt-4 border-t pt-2 md:hidden"
        >
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm">
            {navigationLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
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
