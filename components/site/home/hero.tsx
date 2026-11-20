import Link from "next/link";
import { GhostType } from "@/components/react-bits/ghost-type";
import { Container } from "@/components/site/container";
import { GitHubMark } from "@/components/site/github-mark";
import { StatusPill } from "@/components/site/home/section-heading";
import { buttonVariants } from "@/components/ui/button-variants";
import { navigationLinks, siteConfig } from "@/lib/config";
import { isEarlyAccessConfigured } from "@/lib/early-access-config";
import { cn } from "@/lib/utils";

const HERO_COMPLETIONS = [
  " prepare an appeal with AI.",
  " review every change before it goes live.",
  " trace each gift to its donor and receipt.",
] as const;

export const HomeHero = () => {
  const isConfigured = isEarlyAccessConfigured();

  return (
    <section
      aria-labelledby="hero-title"
      className="pt-[clamp(6.75rem,9vw,8.5rem)] pb-[clamp(2.75rem,5vw,4rem)]"
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
          className="font-heading text-foreground mt-6 max-w-[18ch] text-[clamp(2.35rem,5.6vw,4.35rem)] leading-[1.02] font-semibold tracking-[-0.03em] text-balance sm:max-w-[24ch] sm:tracking-[-0.045em] lg:max-w-none"
        >
          <span className="block">Your website, fundraising, and CRM.</span>{" "}
          <span className="text-muted-foreground mt-1 block">
            Built to work together with AI.
          </span>
        </h1>

        <p className="text-muted-foreground mt-6 max-w-[44rem] text-lg leading-8 text-pretty sm:text-xl sm:leading-9">
          We’re building <span translate="no">asym</span> for missions
          organizations first. The goal: prepare an appeal with AI, let your
          team decide what goes live, and keep each gift connected to its donor
          and receipt.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <Link
            href={siteConfig.cta.primary.href}
            className={cn(buttonVariants({ size: "lg" }), "px-6")}
          >
            {isConfigured ? siteConfig.cta.primary.label : "Early access"}
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

        <div className="border-rule mt-7 flex items-baseline gap-2.5 border-t pt-4">
          <span
            aria-hidden="true"
            className="bg-ring mt-2 size-1.5 shrink-0 rounded-full"
          />
          <GhostType
            text="Built so your team can"
            completions={HERO_COMPLETIONS}
          />
        </div>

        <nav
          aria-label="On this page"
          className="border-foreground/10 mt-6 border-t pt-3 md:hidden"
        >
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm">
            {navigationLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-foreground/78 hover:text-foreground focus-visible:ring-ring focus-visible:ring-offset-background inline-flex min-h-11 items-center rounded-sm font-medium underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent"
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
