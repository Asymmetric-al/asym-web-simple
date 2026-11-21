import Link from "next/link";
import { Container } from "@/components/site/container";
import { GitHubMark } from "@/components/site/github-mark";
import { Eyebrow, SectionTitle } from "@/components/site/home/section-heading";
import { ArrowRightIcon, ArrowUpRightIcon } from "@/components/site/icons";
import { ThemedPlate } from "@/components/site/themed-plate";
import { repoStats, siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

type InventoryStatus = "in_code" | "partial" | "planned";

const ARCHIVE_PLATE_ALT =
  "Copperplate pen-and-ink engraving of an open hand-stitched ruled ledger resting in a dovetailed wooden archival drawer beside a Field Pine silk bookmark ribbon, a bone folder, brass dividers, and a coiled ribbon sealed with hatched vermilion wax.";

const ARCHIVE_PLATE_SIZES = "(min-width: 1024px) 38vw, calc(100vw - 2rem)";

const inventoryRows: readonly {
  readonly module: string;
  readonly note?: string;
  readonly path: string;
  readonly href?: string;
  readonly status: InventoryStatus;
  readonly statusLabel: string;
}[] = [
  {
    module: "Public website & giving pages",
    note: "Online checkout is built; public worker directory and checkout recipient lookup still show sample profiles",
    path: "apps/donor",
    href: `${siteConfig.repoUrl}/tree/develop/apps/donor`,
    status: "partial",
    statusLabel: "Partial",
  },
  {
    module: "Authenticated donor portal, receipts & settled annual statements",
    path: "donor-portal",
    href: `${siteConfig.repoUrl}/tree/develop/packages/api/src/donor-portal`,
    status: "in_code",
    statusLabel: "In code",
  },
  {
    module: "Missionary supporter roster & private-by-default redaction",
    path: "missionary-portal",
    href: `${siteConfig.repoUrl}/blob/develop/packages/api/src/missionary-portal/donors.ts`,
    status: "in_code",
    statusLabel: "In code",
  },
  {
    module: "Donor & gift CRM, website editor & supported batch previews",
    path: "apps/admin",
    href: `${siteConfig.repoUrl}/tree/develop/apps/admin`,
    status: "in_code",
    statusLabel: "In code",
  },
  {
    module: "Offline gift entry & architecture designs",
    note: "Offline entry workflow is in code with database saving switched off until migration; design notes (ADRs 0004, 0010, and 0012) specify thank-you, offline-entry, and recurring-gift rules",
    path: "docs/adr",
    href: `${siteConfig.repoUrl}/tree/develop/docs/adr`,
    status: "partial",
    statusLabel: "Partial",
  },
  {
    module: "Hosted team subscription & onboarding",
    path: "in development",
    status: "planned",
    statusLabel: "Planned",
  },
  {
    module: "AI campaign & appeal drafting with staff sign-off",
    path: "in development",
    status: "planned",
    statusLabel: "Planned",
  },
];

const getStatusBadgeClass = (status: InventoryStatus): string => {
  if (status === "planned") {
    return "border-draft-border bg-draft-soft text-draft border-dashed";
  }
  if (status === "partial") {
    return "border-pine-border bg-card text-pine";
  }
  return "border-pine-border bg-pine-soft text-pine";
};

export const OpenSourceSection = () => (
  <section
    id="open-source"
    aria-labelledby="open-source-title"
    className="scroll-mt-24 pb-[clamp(3.25rem,5.5vw,5rem)]"
  >
    <Container>
      <div className="border-rule border-t pt-12 sm:pt-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,58fr)_minmax(0,42fr)] lg:items-start lg:gap-14">
        <div id="where-things-stand" className="min-w-0 scroll-mt-24">
          <Eyebrow>Open source</Eyebrow>
          <SectionTitle id="open-source-title">
            The code is public.
          </SectionTitle>
          <p className="text-muted-foreground mt-4 max-w-[38rem] text-base leading-7 text-pretty sm:text-[1.0625rem] sm:leading-8">
            Inspect the work directly in{" "}
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

          {/* Typeset hairline-ruled archival code inventory ledger */}
          <div className="border-rule-strong bg-card mt-7 border">
            <div className="border-rule flex flex-wrap items-center justify-between gap-3 border-b px-4 py-3 sm:px-5">
              <p className="text-foreground text-sm font-semibold">
                Where things stand
              </p>
              <span className="text-muted-foreground font-mono text-[0.8125rem]">
                Status · Code link
              </span>
            </div>

            <ul className="divide-rule divide-y">
              {inventoryRows.map((row) => (
                <li
                  key={row.module}
                  className="flex flex-col items-start gap-2 px-4 py-3 text-sm sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-5"
                >
                  <div className="min-w-0">
                    <span
                      className={cn(
                        "block",
                        row.status === "planned"
                          ? "text-muted-foreground"
                          : "text-foreground font-medium"
                      )}
                    >
                      {row.module}
                    </span>
                    {row.note ? (
                      <span className="text-muted-foreground mt-0.5 block text-[0.8125rem] leading-5">
                        {row.note}
                      </span>
                    ) : null}
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <span
                      className={cn(
                        "inline-flex items-center border px-2 py-0.5 font-mono text-xs font-medium whitespace-nowrap forced-colors:border-[CanvasText]",
                        getStatusBadgeClass(row.status)
                      )}
                    >
                      {row.statusLabel}
                    </span>
                    {row.href ? (
                      <a
                        href={row.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pine focus-visible:ring-ring inline-flex min-h-11 shrink-0 items-center gap-1 rounded-xs font-mono text-[0.8125rem] underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-2 focus-visible:outline-transparent sm:min-h-8 [@media(hover:hover)_and_(pointer:fine)]:hover:text-foreground"
                      >
                        {row.path}
                        <ArrowUpRightIcon className="size-3" />
                        <span className="sr-only">
                          {" "}
                          in Asymmetric-al/core (opens in a new tab)
                        </span>
                      </a>
                    ) : (
                      <span className="text-draft inline-flex shrink-0 items-center font-mono text-[0.8125rem]">
                        {row.path}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-rule bg-record/45 space-y-1.5 border-t px-4 py-3.5 text-xs sm:px-5">
              <p className="text-foreground font-mono">
                {repoStats.commits} {repoStats.commitsScope} ·{" "}
                {repoStats.mergedPullRequests}{" "}
                {repoStats.mergedPullRequestsScope}
              </p>
              <p className="text-muted-foreground leading-5">
                Since {repoStats.since}, verified {repoStats.asOf}. Repository
                activity shows active build work, not blanket production
                readiness;{" "}
                <a
                  href={`${siteConfig.repoUrl}#readme`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground focus-visible:ring-ring rounded-xs font-medium underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-2 focus-visible:outline-transparent [@media(hover:hover)_and_(pointer:fine)]:hover:text-pine"
                >
                  Core’s README
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>{" "}
                tracks current module maturity.
              </p>
            </div>
          </div>
        </div>

        {/* Right column: Plate II engraving + direct GitHub link */}
        <div className="min-w-0 lg:pt-20">
          <figure className="min-w-0">
            <div className="plate-impression aspect-[4/3] overflow-hidden">
              <ThemedPlate
                name="archive-ledger-plate"
                alt={ARCHIVE_PLATE_ALT}
                sizes={ARCHIVE_PLATE_SIZES}
              />
            </div>
            <figcaption className="border-rule mt-2.5 flex flex-wrap items-baseline justify-between gap-2 border-t pt-2 text-xs">
              <span className="text-foreground font-mono font-medium">
                Plate II · Open-source ledger
              </span>
              <span className="text-muted-foreground">
                Inspect schemas, API rules, and design notes in Core
              </span>
            </figcaption>
          </figure>

          <div className="mt-5">
            <a
              href={siteConfig.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground focus-visible:ring-ring focus-visible:ring-offset-background inline-flex min-h-11 items-center gap-2 rounded-md text-sm font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent [@media(hover:hover)_and_(pointer:fine)]:hover:text-pine"
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

      {/* Dedicated commercial model band with full editorial presence */}
      <div className="border-rule mt-12 grid gap-6 border-t pt-10 lg:grid-cols-[minmax(0,38fr)_minmax(0,62fr)] lg:items-start lg:gap-12">
        <div className="min-w-0">
          <Eyebrow>Sustainability</Eyebrow>
          <h3 className="font-heading text-foreground mt-2.5 text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.06] font-medium tracking-[-0.025em]">
            How we’ll charge.
          </h3>
          <p className="text-muted-foreground mt-2.5 font-mono text-xs">
            Pricing not published yet · hosted subscription planned
          </p>
          <div className="mt-4">
            <Link
              href="/early-access/status?state=unavailable"
              prefetch={false}
              className="text-foreground focus-visible:ring-ring focus-visible:ring-offset-background inline-flex min-h-11 items-center gap-1.5 rounded-md text-sm font-medium underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent [@media(hover:hover)_and_(pointer:fine)]:hover:text-pine"
            >
              Read the pre-launch checklist
              <ArrowRightIcon className="size-3.5" />
            </Link>
          </div>
        </div>
        <div className="text-muted-foreground grid gap-4 text-base leading-7 text-pretty sm:grid-cols-2 sm:gap-8">
          <p>
            The hosted platform will be a paid subscription covering hosting, AI
            workflows, updates, and product support, so your team never
            maintains servers.
          </p>
          <p>
            When hosted onboarding opens, we’ll help your office move existing
            donor records and configure giving pages before switching over.
            Later, we also plan to offer optional managed donor care as a
            separate service for routine requests like receipt copies and
            recurring-gift updates.
          </p>
        </div>
      </div>
      </div>
    </Container>
  </section>
);
