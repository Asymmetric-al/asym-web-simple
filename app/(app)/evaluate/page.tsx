import Link from "next/link";
import { GovernanceCompliance } from "@/components/site/blocks/governance-compliance";
import { TrustPacket } from "@/components/site/blocks/trust-packet";
import { Container } from "@/components/site/container";
import { GitHubMark } from "@/components/site/github-mark";
import { ArrowLeftIcon, ArrowUpRightIcon } from "@/components/site/icons";
import { Comparison6 } from "@/components/site/reactbits/comparison-6";
import { HowItWorks10 } from "@/components/site/reactbits/how-it-works-10";
import { Pricing17 } from "@/components/site/reactbits/pricing-17";
import { Scrollspy } from "@/components/site/reui/scrollspy";
import { buttonVariants } from "@/components/ui/button-variants";
import { repoStats, siteConfig } from "@/lib/config";
import { isEarlyAccessConfigured } from "@/lib/early-access-config";
import { createMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";

const EVALUATE_SECTIONS = [
  { id: "comparison", label: "Trade-offs" },
  { id: "migration", label: "Parallel close" },
  { id: "hosting", label: "Hosting & cost" },
  { id: "governance", label: "Governance" },
  { id: "trust-packet", label: "Review docs" },
] as const;

// eslint-disable-next-line sonarjs/variable-name -- Next.js route segment config export name.
export const unstable_instant = {
  prefetch: "static",
};

export const metadata: Metadata = createMetadata({
  title: "Evaluate asym",
  description:
    "Architecture trade-offs, Finance-verified parallel-close onboarding, and self-hosted vs. managed hosting for missions agencies and nonprofits.",
  path: "/evaluate",
});

export default function EvaluatePage() {
  const isConfigured = isEarlyAccessConfigured();

  return (
    <main
      id="main-content"
      className="relative isolate outline-none"
      tabIndex={-1}
    >
      <Container>
        <div className="pt-24 pb-12 sm:pt-28 sm:pb-16">
          <Link
            href="/"
            prefetch={false}
            className="text-muted-foreground focus-visible:ring-ring focus-visible:ring-offset-background inline-flex min-h-11 items-center gap-1.5 rounded-full font-sans text-sm font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent sm:min-h-8 [@media(hover:hover)_and_(pointer:fine)]:hover:text-foreground"
          >
            <ArrowLeftIcon className="size-3.5" />
            Back to asym overview
          </Link>

          <div className="mt-6 max-w-[48rem]">
            <p className="text-signal font-sans text-sm font-medium">
              Evaluation &amp; migration brief
            </p>
            <h1 className="font-heading text-foreground mt-3 text-[clamp(2.25rem,4.6vw,3.85rem)] leading-[1.03] font-bold tracking-[-0.035em]">
              Everything your board, Finance team, and IT lead need to weigh.
            </h1>
            <p className="text-muted-foreground mt-5 max-w-[42rem] text-base leading-7 text-pretty sm:text-lg sm:leading-8">
              Moving a missions organization’s giving ledger is a serious
              stewardship decision. This brief shows how{" "}
              <span translate="no" className="text-foreground font-medium">
                {siteConfig.shortName}
              </span>{" "}
              replaces disconnected tools, how a parallel close protects your
              books before you switch, and how self-hosting compares with
              managed hosting under{" "}
              <span translate="no" className="text-foreground font-mono text-sm">
                {repoStats.license}
              </span>
              .
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href="#migration"
                className={cn(
                  buttonVariants({ variant: "default", size: "lg" }),
                  "px-5"
                )}
              >
                Read the parallel-close steps
              </a>
              <a
                href={siteConfig.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "px-5"
                )}
              >
                <GitHubMark className="size-4" />
                Inspect Core on GitHub
                <ArrowUpRightIcon dataIcon="inline-end" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </div>
        </div>

        <nav
          aria-label="Evaluation brief sections"
          className="border-rule bg-background sticky top-16 z-30 -mx-4 border-y px-4 py-2.5 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
        >
          <Scrollspy offset={156}>
            <ul className="flex items-center gap-1.5 overflow-x-auto">
              {EVALUATE_SECTIONS.map((section) => (
                <li key={section.id} className="shrink-0">
                  <a
                    href={`#${section.id}`}
                    data-scrollspy-anchor={section.id}
                    className="evaluate-jump-link border-rule bg-card text-muted-foreground focus-visible:ring-ring inline-flex min-h-10 items-center rounded-full border px-3.5 font-sans text-xs font-medium whitespace-nowrap transition-[transform,border-color,background-color,color] duration-150 ease-out select-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-2 focus-visible:outline-transparent active:scale-[0.97] sm:min-h-8 [@media(hover:hover)_and_(pointer:fine)]:hover:border-rule-interactive [@media(hover:hover)_and_(pointer:fine)]:hover:text-foreground"
                  >
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </Scrollspy>
        </nav>

        <Comparison6 />
        <HowItWorks10 />
        <Pricing17 isConfigured={isConfigured} />
        <GovernanceCompliance />
        <TrustPacket />
      </Container>
    </main>
  );
}
