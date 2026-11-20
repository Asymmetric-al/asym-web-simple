import { Container } from "@/components/site/container";
import { GitHubMark } from "@/components/site/github-mark";
import { Eyebrow, SectionTitle } from "@/components/site/home/section-heading";
import { ArrowUpRightIcon } from "@/components/site/icons";
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
}[] = [
  {
    module: "Public website & giving pages",
    note: "Stripe plumbing in code; public worker pages still use @asym/mock-data demo profiles",
    path: "apps/donor",
    href: `${siteConfig.repoUrl}/tree/develop/apps/donor`,
    status: "partial",
  },
  {
    module: "Authenticated donor portal, receipts & statements",
    path: "donor-portal",
    href: `${siteConfig.repoUrl}/tree/develop/packages/api/src/donor-portal`,
    status: "in_code",
  },
  {
    module: "Missionary supporter roster & fail-closed redaction",
    path: "missionary-portal",
    href: `${siteConfig.repoUrl}/blob/develop/packages/api/src/missionary-portal/donors.ts`,
    status: "in_code",
  },
  {
    module: "Staff CRM, Web Studio (Payload) & batch previews",
    path: "apps/admin",
    href: `${siteConfig.repoUrl}/tree/develop/apps/admin`,
    status: "in_code",
  },
  {
    module: "Hosted team subscription & onboarding",
    path: "in development",
    status: "planned",
  },
  {
    module: "AI campaign & appeal drafting with staff sign-off",
    path: "in development",
    status: "planned",
  },
];

const getStatusDotClass = (status: InventoryStatus): string => {
  if (status === "planned") {
    return "border-draft border border-dashed";
  }
  if (status === "partial") {
    return "border-pine border bg-[linear-gradient(90deg,var(--pine)_50%,transparent_50%)]";
  }
  return "bg-pine";
};

export const OpenSourceSection = () => (
  <section
    id="open-source"
    aria-labelledby="open-source-title"
    className="py-[clamp(3.25rem,5.5vw,5rem)]"
  >
    <Container>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,58fr)_minmax(0,42fr)] lg:items-start lg:gap-14">
        <div id="where-things-stand" className="min-w-0 scroll-mt-24">
          <Eyebrow>Open source</Eyebrow>
          <SectionTitle id="open-source-title">
            The code is public.
          </SectionTitle>
          <p className="text-muted-foreground mt-4 max-w-[38rem] text-base leading-7 text-pretty sm:text-[1.0625rem] sm:leading-8">
            Inspect the work directly in{" "}
            <span translate="no" className="text-foreground font-mono text-sm">
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
              <div className="text-muted-foreground flex flex-wrap items-center gap-x-3.5 gap-y-1 font-mono text-[0.75rem]">
                <span className="inline-flex items-center gap-1.5">
                  <span
                    aria-hidden="true"
                    className="bg-pine size-2 rounded-full"
                  />
                  In code
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span
                    aria-hidden="true"
                    className="border-pine size-2 rounded-full border bg-[linear-gradient(90deg,var(--pine)_50%,transparent_50%)]"
                  />
                  Partial
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span
                    aria-hidden="true"
                    className="border-draft size-2 rounded-full border border-dashed"
                  />
                  Planned
                </span>
              </div>
            </div>

            <ul className="divide-rule divide-y">
              {inventoryRows.map((row) => (
                <li
                  key={row.module}
                  className="flex flex-col items-start gap-1.5 px-4 py-3 text-sm sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-5"
                >
                  <div className="flex min-w-0 items-start gap-2.5">
                    <span
                      aria-hidden="true"
                      className={cn(
                        "mt-1.5 size-2 shrink-0 rounded-full",
                        getStatusDotClass(row.status)
                      )}
                    />
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
                        <span className="text-muted-foreground mt-0.5 block text-xs leading-5">
                          {row.note}
                        </span>
                      ) : null}
                    </div>
                  </div>
                  {row.href ? (
                    <a
                      href={row.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pine focus-visible:ring-ring ml-4.5 inline-flex min-h-11 shrink-0 items-center gap-1 rounded-xs font-mono text-xs underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-2 focus-visible:outline-transparent sm:ml-0 sm:min-h-8 [@media(hover:hover)_and_(pointer:fine)]:hover:text-foreground"
                    >
                      {row.path}
                      <ArrowUpRightIcon className="size-3" />
                      <span className="sr-only">
                        {" "}
                        in Asymmetric-al/core (opens in a new tab)
                      </span>
                    </a>
                  ) : (
                    <span className="text-draft ml-4.5 inline-flex shrink-0 items-center font-mono text-xs sm:ml-0">
                      {row.path}
                    </span>
                  )}
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

        {/* Right column: Plate III engraving + commercial model */}
        <div className="min-w-0 space-y-8">
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
                Plate III · Public archival ledger
              </span>
              <span className="text-muted-foreground">
                Inspectable source under AGPL-3.0-only
              </span>
            </figcaption>
          </figure>

          <div className="border-rule border-t pt-7">
            <h3 className="font-heading text-foreground text-2xl font-medium tracking-[-0.02em] sm:text-[1.75rem]">
              How we’ll charge.
            </h3>
            <div className="text-muted-foreground mt-3.5 space-y-3.5 text-base leading-7 text-pretty">
              <p>
                The hosted platform will be a paid subscription covering
                hosting, AI workflows, updates, and product support, so your
                team never maintains servers. Pricing is not published yet.
              </p>
              <p>
                Later, we also plan to offer optional managed donor care as a
                separate service for routine requests like receipt copies and
                recurring&#8209;gift updates.
              </p>
            </div>

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
      </div>
    </Container>
  </section>
);
