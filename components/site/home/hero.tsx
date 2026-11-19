import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { GitHubMark } from "@/components/site/github-mark";
import { Container } from "@/components/site/page";
import { buttonVariants } from "@/components/ui/button-variants";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

export const HomeHero = () => (
  <section
    aria-labelledby="hero-title"
    className="pt-[clamp(7rem,9vw,8.5rem)] pb-[clamp(3rem,5vw,4rem)]"
  >
    <Container>
      <ul className="flex flex-wrap gap-2 text-sm" aria-label="Status">
        <li className="border-foreground/12 bg-card/70 text-foreground rounded-full border px-3.5 py-1.5 font-medium">
          Open-source software for nonprofits
        </li>
        <li className="border-foreground/12 bg-card/70 text-muted-foreground inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5">
          <span className="bg-ring size-1.5 rounded-full" aria-hidden="true" />
          Launching soon
        </li>
      </ul>

      <h1
        id="hero-title"
        className="font-heading text-foreground mt-6 max-w-[19ch] text-[clamp(2.6rem,6vw,4.4rem)] leading-[0.98] font-semibold tracking-[-0.06em] text-balance lg:max-w-none"
      >
        <span className="lg:block">Your website, fundraising, and CRM.</span>{" "}
        <span className="text-muted-foreground lg:block">
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
            {siteConfig.cta.primary.label}
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
    </Container>
  </section>
);
