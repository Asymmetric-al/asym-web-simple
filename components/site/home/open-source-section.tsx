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

const inventoryRows: readonly {
  readonly module: string;
  readonly path: string;
  readonly href?: string;
  readonly inDevelopment: boolean;
}[] = [
  {
    module: "Website & giving pages",
    path: PATH_DONOR,
    href: `${siteConfig.repoUrl}/tree/develop/apps/donor`,
    inDevelopment: false,
  },
  {
    module: "Stripe checkout, funds & tax receipts",
    path: PATH_DONOR,
    href: `${siteConfig.repoUrl}/tree/develop/apps/donor`,
    inDevelopment: false,
  },
  {
    module: "Donor records, history & donor portal",
    path: PATH_DONOR,
    href: `${siteConfig.repoUrl}/tree/develop/apps/donor`,
    inDevelopment: false,
  },
  {
    module: "Missionary supporter roster & server-side anonymity",
    path: "apps/missionary",
    href: `${siteConfig.repoUrl}/tree/develop/apps/missionary`,
    inDevelopment: false,
  },
  {
    module: "Staff CRM, email templates & record-change previews",
    path: "apps/admin",
    href: `${siteConfig.repoUrl}/tree/develop/apps/admin`,
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
];

export const OpenSourceSection = () => (
  <section
    id="open-source"
    aria-labelledby="open-source-title"
    className="py-[clamp(3.25rem,5.5vw,5rem)]"
  >
    <Container>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,58fr)_minmax(0,42fr)] lg:items-start lg:gap-14">
        <div id="where-things-stand" className="min-w-0">
          <Eyebrow>Open source</Eyebrow>
          <SectionTitle id="open-source-title">
            The code is public.
          </SectionTitle>
          <p className="text-muted-foreground mt-4 max-w-[38rem] text-base leading-7 text-pretty sm:text-[1.0625rem] sm:leading-8">
            Inspect the work directly.{" "}
            <span translate="no" className="text-foreground font-mono text-sm">
              Asymmetric-al/core
            </span>{" "}
            is published under{" "}
            <span
              translate="no"
              className="text-foreground font-mono text-sm whitespace-nowrap"
            >
              AGPL-3.0-only
            </span>
            . Code presence is not blanket production readiness; read the README
            for module maturity.
          </p>

          {/* Archival code inventory ledger */}
          <div className="surface-folio mt-7 overflow-hidden rounded-2xl">
            <div className="border-rule bg-record/65 flex flex-wrap items-center justify-between gap-2 border-b px-4 py-3 sm:px-5">
              <p className="text-foreground text-sm font-semibold">
                Where things stand
              </p>
              <p className="text-muted-foreground font-mono text-xs">
                Asymmetric-al/core
              </p>
            </div>

            <ul className="divide-rule divide-y">
              {inventoryRows.map((row) => (
                <li
                  key={row.module}
                  className="flex flex-col items-start gap-1.5 px-4 py-3 text-sm sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:px-5"
                >
                  <div className="flex min-w-0 items-center gap-2.5">
                    <span
                      aria-hidden="true"
                      className={cn(
                        "size-2 shrink-0 rounded-full",
                        row.inDevelopment
                          ? "border-draft border border-dashed"
                          : "bg-pine"
                      )}
                    />
                    <span
                      className={cn(
                        row.inDevelopment
                          ? "text-muted-foreground"
                          : "text-foreground font-medium"
                      )}
                    >
                      {row.module}
                    </span>
                  </div>
                  {row.href ? (
                    <a
                      href={row.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border-pine-border bg-pine-soft text-pine hover:bg-pine hover:text-background focus-visible:ring-ring ml-4.5 inline-flex shrink-0 items-center gap-1 rounded-full border px-2.5 py-0.5 font-mono text-xs transition-[color,background-color,border-color,scale] duration-150 focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-2 focus-visible:outline-transparent active:scale-[0.98] sm:ml-0"
                    >
                      {row.path}
                      <span className="sr-only">
                        {" "}
                        in Asymmetric-al/core (opens in a new tab)
                      </span>
                    </a>
                  ) : (
                    <span className="border-draft-border bg-draft-soft text-draft ml-4.5 inline-flex shrink-0 items-center rounded-full border border-dashed px-2.5 py-0.5 font-mono text-xs sm:ml-0">
                      {row.path}
                    </span>
                  )}
                </li>
              ))}
            </ul>

            <div className="border-rule bg-record/50 flex flex-wrap items-center justify-between gap-2 border-t px-4 py-3 text-xs sm:px-5">
              <p className="text-foreground font-mono">
                {repoStats.commits} commits · {repoStats.mergedPullRequests}{" "}
                merged PRs · {repoStats.license}
              </p>
              <p className="text-muted-foreground">
                Since {repoStats.since}, as of {repoStats.asOf}.{" "}
                <a
                  href={`${siteConfig.repoUrl}#readme`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-pine focus-visible:ring-ring rounded-xs font-medium underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-2 focus-visible:outline-transparent"
                >
                  Read README
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Right column: commercial model + repository link */}
        <div className="border-rule min-w-0 border-t pt-8 lg:mt-16 lg:border-t-0 lg:border-l lg:pt-2 lg:pl-10">
          <h3 className="font-heading text-foreground text-2xl font-medium tracking-[-0.02em] sm:text-[1.75rem]">
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

          <div className="border-rule mt-7 border-t pt-6">
            <a
              href={siteConfig.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-pine focus-visible:ring-ring focus-visible:ring-offset-background inline-flex min-h-11 items-center gap-2 rounded-md text-sm font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent"
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
      </div>
    </Container>
  </section>
);
