import Link from "next/link";
import { Container } from "@/components/site/container";
import { GitHubMark } from "@/components/site/github-mark";
import { Eyebrow, SectionTitle } from "@/components/site/home/section-heading";
import { StatusLedger } from "@/components/site/home/status-ledger";
import { ArrowRightIcon, ArrowUpRightIcon } from "@/components/site/icons";
import { repoStats, siteConfig } from "@/lib/config";
import { isEarlyAccessConfigured } from "@/lib/early-access-config";

export const OpenSourceSection = () => {
  const isConfigured = isEarlyAccessConfigured();

  return (
    <section
      id="open-source"
      aria-labelledby="open-source-title"
      className="scroll-mt-24 pb-16 sm:pb-20 lg:pb-24"
    >
      <Container>
        <div
          id="where-things-stand"
          className="border-rule scroll-mt-24 border-t pt-14 sm:pt-18"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
            <div className="max-w-[38rem]">
              <Eyebrow>Open source</Eyebrow>
              <SectionTitle id="open-source-title">
                Inspect the software before you trust it.
              </SectionTitle>
            </div>
            <p className="text-muted-foreground max-w-[32rem] text-base leading-7 text-pretty">
              Everything built so far lives publicly in{" "}
              <span
                translate="no"
                className="text-foreground font-mono text-sm whitespace-nowrap"
              >
                Asymmetric-al/core
              </span>{" "}
              under{" "}
              <span
                translate="no"
                className="text-foreground font-mono text-sm whitespace-nowrap"
              >
                {repoStats.license}
              </span>
              .
            </p>
          </div>

          <StatusLedger />

          <div className="mt-6 grid gap-5 lg:grid-cols-2 lg:gap-6">
            <div className="border-rule bg-record/70 flex flex-col justify-between rounded-2xl border p-6">
              <div>
                <p className="text-foreground font-mono text-xs font-medium">
                  {repoStats.commits} {repoStats.commitsScope} ·{" "}
                  {repoStats.mergedPullRequests}{" "}
                  {repoStats.mergedPullRequestsScope}
                </p>
                <p className="text-muted-foreground mt-2 text-sm leading-6 text-pretty">
                  Since {repoStats.since}, verified {repoStats.asOf}. Repository
                  activity shows active build work, not blanket production
                  readiness;{" "}
                  <a
                    href={`${siteConfig.repoUrl}#readme`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground focus-visible:ring-ring rounded-xs font-medium underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-2 focus-visible:outline-transparent [@media(hover:hover)_and_(pointer:fine)]:hover:text-signal"
                  >
                    Core’s README
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>{" "}
                  tracks current module maturity.
                </p>
              </div>
              <div className="mt-5">
                <a
                  href={siteConfig.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground focus-visible:ring-ring focus-visible:ring-offset-background inline-flex min-h-11 items-center gap-2 rounded-md text-sm font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent [@media(hover:hover)_and_(pointer:fine)]:hover:text-signal"
                >
                  <GitHubMark className="size-4" />
                  <span className="underline underline-offset-4">
                    Explore the code on GitHub
                  </span>
                  <span className="sr-only"> (opens in a new tab)</span>
                  <ArrowUpRightIcon />
                </a>
              </div>
            </div>

            <div className="border-rule bg-record/70 flex flex-col justify-between rounded-2xl border p-6">
              <div>
                <p className="text-foreground text-sm font-semibold">
                  How we’ll sustain it
                </p>
                <p className="text-muted-foreground mt-2 text-sm leading-6 text-pretty">
                  Hosted teams will be a paid subscription covering hosting, AI
                  workflows, updates, and guided onboarding from existing
                  records (pricing not published yet). Later, we also plan to
                  offer optional managed donor care as a separate service.
                </p>
              </div>
              <div className="mt-5">
                {isConfigured ? (
                  <Link
                    href="/#early-access"
                    prefetch={false}
                    className="text-foreground focus-visible:ring-ring focus-visible:ring-offset-background inline-flex min-h-11 items-center gap-1.5 rounded-md text-sm font-medium underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent [@media(hover:hover)_and_(pointer:fine)]:hover:text-signal"
                  >
                    Request early access
                    <ArrowRightIcon className="size-3.5" />
                  </Link>
                ) : (
                  <Link
                    href="/early-access/status?state=unavailable"
                    prefetch={false}
                    className="text-foreground focus-visible:ring-ring focus-visible:ring-offset-background inline-flex min-h-11 items-center gap-1.5 rounded-md text-sm font-medium underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent [@media(hover:hover)_and_(pointer:fine)]:hover:text-signal"
                  >
                    Read the pre-launch checklist
                    <ArrowRightIcon className="size-3.5" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
