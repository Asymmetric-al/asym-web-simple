import { Container } from "@/components/site/container";
import { GitHubMark } from "@/components/site/github-mark";
import { Eyebrow, SectionTitle } from "@/components/site/home/section-heading";
import { ArrowUpRightIcon } from "@/components/site/icons";
import { repoStats, siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

/**
Checked against Asymmetric-al/core on develop. "In public code" means code exists
in the repository; module maturity varies (see Core's README).
*/
const PATH_DONOR = "apps/donor";
const PATH_IN_DEVELOPMENT = "in development";

const inventoryRows = [
  {
    module: "Website & giving pages",
    path: PATH_DONOR,
    inDevelopment: false,
  },
  {
    module: "Stripe checkout, funds & tax receipts",
    path: PATH_DONOR,
    inDevelopment: false,
  },
  {
    module: "Donor records, history & donor portal",
    path: PATH_DONOR,
    inDevelopment: false,
  },
  {
    module: "Missionary supporter roster & ministry updates",
    path: "apps/missionary",
    inDevelopment: false,
  },
  {
    module: "Staff CRM, email templates & record-change previews",
    path: "apps/admin",
    inDevelopment: false,
  },
  {
    module: "AI campaign & appeal drafting",
    path: PATH_IN_DEVELOPMENT,
    inDevelopment: true,
  },
  {
    module: "Permission-scoped approval rules for AI actions",
    path: PATH_IN_DEVELOPMENT,
    inDevelopment: true,
  },
  {
    module: "Publishing approved campaign pages",
    path: PATH_IN_DEVELOPMENT,
    inDevelopment: true,
  },
] as const;

export const OpenSourceSection = () => (
  <section
    id="open-source"
    aria-labelledby="open-source-title"
    className="py-[clamp(3.5rem,6vw,5.5rem)]"
  >
    <Container>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,58fr)_minmax(0,42fr)] lg:items-start lg:gap-14">
        <div id="where-things-stand" className="min-w-0">
          <Eyebrow>Open source</Eyebrow>
          <SectionTitle id="open-source-title">
            The code is public.
          </SectionTitle>
          <p className="text-muted-foreground mt-4 max-w-[38rem] text-base leading-7 text-pretty sm:text-[1.0625rem] sm:leading-8">
            You do not have to take prelaunch claims on faith.{" "}
            <span translate="no" className="text-foreground font-mono text-sm">
              Asymmetric-al/core
            </span>{" "}
            is published under{" "}
            <span className="text-foreground font-mono text-sm whitespace-nowrap">
              {repoStats.license}
            </span>
            . Module maturity varies across the repository; read the README for
            current status.
          </p>

          {/* Archival code inventory ledger */}
          <div className="surface-folio mt-7 overflow-hidden rounded-2xl">
            <div className="border-rule bg-record/70 flex flex-wrap items-center justify-between gap-2 border-b px-5 py-3">
              <h3 className="text-foreground font-sans text-sm font-semibold">
                Where things stand
              </h3>
              <span className="text-muted-foreground font-mono text-xs">
                Asymmetric-al/core
              </span>
            </div>

            <ul className="divide-rule divide-y">
              {inventoryRows.map((row) => (
                <li
                  key={row.module}
                  className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5 px-5 py-3.5 text-sm"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span
                      aria-hidden="true"
                      className={cn(
                        "inline-block size-2 shrink-0 rounded-full",
                        row.inDevelopment
                          ? "border-draft border border-dashed"
                          : "bg-pine"
                      )}
                    />
                    <span
                      className={
                        row.inDevelopment
                          ? "text-muted-foreground"
                          : "text-foreground font-medium"
                      }
                    >
                      {row.module}
                    </span>
                  </div>
                  <span
                    className={cn(
                      "shrink-0 rounded-full border px-2.5 py-0.5 font-mono text-xs",
                      row.inDevelopment
                        ? "border-draft-border bg-draft-soft text-draft border-dashed"
                        : "border-pine-border bg-pine-soft text-pine"
                    )}
                  >
                    {row.path}
                  </span>
                </li>
              ))}
            </ul>

            <div className="border-rule bg-record/80 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t px-5 py-3.5 text-xs">
              <p className="text-muted-foreground font-mono tabular-nums">
                {repoStats.commits} commits · {repoStats.mergedPullRequests}{" "}
                merged PRs · {repoStats.license}
              </p>
              <p className="text-muted-foreground">
                Since {repoStats.since}, as of {repoStats.asOf}.{" "}
                <a
                  href={`${siteConfig.repoUrl}#readme`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-pine focus-visible:ring-ring focus-visible:ring-offset-record rounded-xs font-medium underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-2 focus-visible:outline-transparent"
                >
                  Read README
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Commercial model & transparency column */}
        <div className="border-rule min-w-0 border-t pt-8 lg:mt-[5.75rem] lg:border-t-0 lg:border-l lg:pt-1 lg:pl-10">
          <h3 className="font-heading text-foreground text-3xl font-medium tracking-[-0.02em]">
            How we’ll charge.
          </h3>
          <div className="text-muted-foreground mt-4 space-y-4 text-base leading-7 text-pretty">
            <p>
              The hosted platform will be a paid subscription covering hosting,
              AI workflows, updates, and product support, so your team never has
              to maintain servers. Pricing is not published yet.
            </p>
            <p>
              Later, we also plan to offer optional managed donor care as a
              separate service for routine requests like receipt copies and
              recurring&#8209;gift updates.
            </p>
          </div>

          <div className="border-rule mt-7 border-t pt-5">
            <a
              href={siteConfig.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-pine focus-visible:ring-ring focus-visible:ring-offset-background inline-flex min-h-11 items-center gap-2 rounded-md font-medium underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent sm:min-h-10"
            >
              <GitHubMark className="size-4 shrink-0" />
              <span>Explore the code on GitHub</span>
              <span className="sr-only"> (opens in a new tab)</span>
              <ArrowUpRightIcon className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </Container>
  </section>
);
