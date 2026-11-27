import { StatusLedgerSlot } from "@/components/site/home/deferred-widget-slots";
import { ArrowUpRightIcon } from "@/components/site/icons";
import { siteConfig } from "@/lib/config";
import type { ReactNode } from "react";

type InventoryStatus = "in_code" | "partial" | "planned";

interface InventoryRow {
  readonly module: string;
  readonly note?: string;
  readonly path: string;
  readonly href?: string;
  readonly status: InventoryStatus;
  readonly statusLabel: string;
}

const INVENTORY_ROWS: readonly InventoryRow[] = [
  {
    module: "Donor portal, receipts & year-end tax statements",
    note: "Supporters view their giving history, manage recurring gifts, and download receipts and completed annual statements",
    path: "donor-portal",
    href: `${siteConfig.repoUrl}/tree/develop/packages/api/src/donor-portal`,
    status: "in_code",
    statusLabel: "In Core",
  },
  {
    module: "Missionary workspace micro-CRMs & automatic donor privacy",
    note: "Personal partner care for each missionary, with Anonymous partner defaults and hidden per-row totals enforced automatically",
    path: "missionary-portal",
    href: `${siteConfig.repoUrl}/blob/develop/packages/api/src/missionary-portal/donors.ts`,
    status: "in_code",
    statusLabel: "In Core",
  },
  {
    module: "Mission Control CRM, Web Studio & batch previews",
    note: "Office workspace for households, partner churches, funds, missionary web pages, and pre-posting batch checks",
    path: "apps/admin",
    href: `${siteConfig.repoUrl}/tree/develop/apps/admin`,
    status: "in_code",
    statusLabel: "In Core",
  },
  {
    module: "Direct organization Stripe accounts & optional donor fee-cover",
    note: "Each agency connects its own Stripe account directly, with optional fee-cover at checkout and 0% gift markup",
    path: "tenant-client.ts",
    href: `${siteConfig.repoUrl}/blob/develop/packages/api/src/stripe/tenant-client.ts`,
    status: "in_code",
    statusLabel: "In Core",
  },
  {
    module: "Public ministry website & multi-fund giving checkout",
    note: "On-site checkout and public giving pages wired directly to live missionary and project directories",
    path: "apps/donor",
    href: `${siteConfig.repoUrl}/tree/develop/apps/donor`,
    status: "partial",
    statusLabel: "Building",
  },
  {
    module: "Paper check, cash & split church remittance batches",
    note: "Recording offline gifts and splitting multi-missionary church checks, backed by ADRs 0004, 0010, and 0012",
    path: "offline-dependencies.ts",
    href: `${siteConfig.repoUrl}/blob/develop/packages/api/src/admin/contributions/offline-dependencies.ts`,
    status: "partial",
    statusLabel: "Building",
  },
  {
    module: "Agency workflows (mobilization, member care, events & templates)",
    note: "Candidate pipelines, private member-care notes, ministry events, and shared email, letter, and PDF templates",
    path: "openspec/",
    href: `${siteConfig.repoUrl}/tree/develop/openspec`,
    status: "partial",
    statusLabel: "Building",
  },
  {
    module: "AI care-work drafting & donor-support assistance",
    note: "Drafting gift thank-yous, partner updates, and routine donor replies under the same built-in privacy rules",
    path: "roadmap",
    status: "planned",
    statusLabel: "Next",
  },
  {
    module: "Hosted plans, parallel-close onboarding & accounting exports",
    note: "Published flat hosting tiers, Finance-verified historical migration closes, deposit exports, and optional managed donor care",
    path: "roadmap",
    status: "planned",
    statusLabel: "Next",
  },
];

const getStatusBadgeClass = (status: InventoryStatus): string => {
  if (status === "planned") {
    return "border-draft-border bg-draft-soft text-draft border-dashed";
  }
  if (status === "partial") {
    return "border-signal-border bg-card text-signal";
  }
  return "border-signal-border bg-signal-soft text-signal";
};

export const StatusLedger = (): ReactNode => (
  <StatusLedgerSlot>
    <div className="border-rule-strong bg-card mt-5 overflow-hidden rounded-2xl border shadow-[var(--shadow-card)]">
      <div className="border-rule flex flex-col gap-3 border-b px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
          <p className="text-foreground font-sans text-sm font-medium">
            Public architecture &amp; build roadmap
          </p>
          <span className="text-muted-foreground font-mono text-xs">
            Asymmetric-al/core
          </span>
        </div>

        <span className="text-muted-foreground inline-flex min-h-13 items-center font-mono text-xs sm:min-h-10">
          Status · Code link
        </span>
      </div>

      <ul className="divide-rule divide-y">
        {INVENTORY_ROWS.map((row) => (
          <li
            key={row.module}
            className="flex flex-col items-start gap-2.5 px-5 py-4 text-sm sm:flex-row sm:items-center sm:justify-between sm:gap-5 sm:px-6"
          >
            <div className="min-w-0">
              <span
                className={
                  row.status === "planned"
                    ? "text-muted-foreground block"
                    : "text-foreground block font-medium"
                }
              >
                {row.module}
              </span>
              {row.note ? (
                <span className="text-muted-foreground mt-1 block text-[0.8125rem] leading-5">
                  {row.note}
                </span>
              ) : null}
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <span
                className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-xs font-medium whitespace-nowrap forced-colors:border-[CanvasText] ${getStatusBadgeClass(row.status)}`}
              >
                {row.statusLabel}
              </span>
              {row.href ? (
                <a
                  href={row.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-signal focus-visible:ring-ring inline-flex min-h-11 shrink-0 items-center gap-1 rounded-xs font-mono text-[0.8125rem] underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-2 focus-visible:outline-transparent sm:min-h-8 [@media(hover:hover)_and_(pointer:fine)]:hover:text-foreground"
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
    </div>
  </StatusLedgerSlot>
);
