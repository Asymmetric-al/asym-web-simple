import { ArrowRight } from "lucide-react";
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
      className="pt-[clamp(6.75rem,9vw,8.5rem)] pb-[clamp(2.75rem,5vw,4rem)]"
    >
      <Container>
        <ul className="flex flex-wrap gap-2 text-sm" aria-label="Status">
          <li className="border-foreground/14 bg-card/80 text-foreground rounded-full border px-3.5 py-1.5 font-medium">
            Open-source software for nonprofits
          </li>
          <li className="border-foreground/14 bg-card/80 text-muted-foreground inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5">
            <span
              className="bg-ring size-1.5 rounded-full"
              aria-hidden="true"
            />
            Launching soon
          </li>
        </ul>

        <h1
          id="hero-title"
          className="font-heading text-foreground mt-6 max-w-[18ch] text-[clamp(2.35rem,5.6vw,4.35rem)] leading-[1.02] font-semibold tracking-[-0.045em] text-balance sm:max-w-[24ch] lg:max-w-none"
        >
          <span className="block">Your website, fundraising, and CRM.</span>{" "}
          <span className="text-muted-foreground mt-1 block">
            Built to work together with AI.
          </span>
        </h1>

        <p className="text-muted-foreground mt-6 max-w-[42rem] text-lg leading-8 text-pretty sm:text-xl sm:leading-9">
          We’re building one system for your website, giving, donor records, and
          email, so AI can prepare campaigns and carry out the steps your team
          approves.
        </p>

        <div className="mt-8 flex flex-col gap-x-6 gap-y-4 sm:flex-row sm:flex-wrap sm:items-center">
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href={siteConfig.cta.primary.href}
              className={cn(buttonVariants({ size: "lg" }), "px-6")}
            >
              {isConfigured ? siteConfig.cta.primary.label : "Early access"}
              <ArrowRight data-icon="inline-end" aria-hidden="true" />
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
          <p className="text-muted-foreground text-sm">
            Starting with missions organizations.
          </p>
        </div>

        <nav
          aria-label="On this page"
          className="border-foreground/10 mt-8 border-t pt-3 md:hidden"
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
