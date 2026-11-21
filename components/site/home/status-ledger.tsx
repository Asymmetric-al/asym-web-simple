"use client";

import {
  SegmentedControl,
  SegmentedControlIndicator,
  SegmentedControlItem,
} from "@ui-sdk/react/segmented-control";
import { useState } from "react";
import { ArrowUpRightIcon } from "@/components/site/icons";
import { siteConfig } from "@/lib/config";
import { useIsClient } from "@/lib/use-is-client";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type InventoryStatus = "in_code" | "partial" | "planned";
type FilterKey = "all" | InventoryStatus;

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
    module: "Public website & giving pages",
    note: "Online checkout is built; public worker directory and checkout recipient lookup still show sample profiles",
    path: "apps/donor",
    href: `${siteConfig.repoUrl}/tree/develop/apps/donor`,
    status: "partial",
    statusLabel: "Partial",
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
    module: "AI campaign drafting & donor-care assistance",
    path: "in development",
    status: "planned",
    statusLabel: "Planned",
  },
  {
    module: "Hosted team subscription, onboarding & optional managed donor care",
    path: "in development",
    status: "planned",
    statusLabel: "Planned",
  },
];

const FILTERS: readonly {
  readonly value: FilterKey;
  readonly label: string;
}[] = [
  { value: "all", label: "All (7)" },
  { value: "in_code", label: "In code (3)" },
  { value: "partial", label: "Partial (2)" },
  { value: "planned", label: "Planned (2)" },
];

const isFilterKey = (value: string | null): value is FilterKey =>
  value !== null && FILTERS.some((option) => option.value === value);

const getStatusBadgeClass = (status: InventoryStatus): string => {
  if (status === "planned") {
    return "border-draft-border bg-draft-soft text-draft border-dashed";
  }
  if (status === "partial") {
    return "border-signal-border bg-card text-signal";
  }
  return "border-signal-border bg-signal-soft text-signal";
};

export const StatusLedger = (): ReactNode => {
  const isHydrated = useIsClient();
  const [filter, setFilter] = useState<FilterKey>("all");

  const visibleRows =
    filter === "all"
      ? INVENTORY_ROWS
      : INVENTORY_ROWS.filter((row) => row.status === filter);

  const handleFilterChange = (nextValue: string | null) => {
    if (!isFilterKey(nextValue)) {
      return;
    }
    setFilter(nextValue);
  };

  return (
    <div className="border-rule-strong bg-card mt-8 overflow-hidden rounded-2xl border shadow-[var(--shadow-card)]">
      <div className="border-rule flex flex-col gap-3 border-b px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="text-foreground text-sm font-semibold">
          Where things stand
        </p>

        {isHydrated ? (
          <SegmentedControl
            aria-label="Filter build status"
            value={filter}
            onValueChange={handleFilterChange}
            className="border-rule bg-record has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-offset-card relative isolate inline-flex w-fit max-w-full flex-wrap items-center rounded-full border p-1 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-offset-2 forced-colors:border-[ButtonBorder]"
          >
            <SegmentedControlIndicator className="segmented-indicator" />
            {FILTERS.map((option) => (
              <SegmentedControlItem
                key={option.value}
                value={option.value}
                className={cn(
                  "text-muted-foreground relative z-10 inline-flex min-h-11 cursor-pointer items-center rounded-full border border-transparent px-3 text-xs font-medium whitespace-nowrap transition-transform duration-150 select-none focus-visible:outline-2 focus-visible:outline-transparent active:scale-[0.97] sm:min-h-8 sm:px-2.5 [@media(hover:hover)_and_(pointer:fine)]:hover:text-foreground",
                  "data-checked:text-foreground data-checked:font-semibold",
                  "forced-colors:data-checked:border-[Highlight] forced-colors:data-checked:bg-[Highlight] forced-colors:data-checked:text-[HighlightText] forced-colors:data-checked:forced-color-adjust-none"
                )}
              >
                <span>{option.label}</span>
              </SegmentedControlItem>
            ))}
          </SegmentedControl>
        ) : (
          <span className="text-muted-foreground font-mono text-xs">
            Status · Code link
          </span>
        )}
      </div>

      <ul className="divide-rule divide-y">
        {visibleRows.map((row) => (
          <li
            key={row.module}
            className="flex flex-col items-start gap-2.5 px-5 py-4 text-sm sm:flex-row sm:items-center sm:justify-between sm:gap-5 sm:px-6"
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
                <span className="text-muted-foreground mt-1 block text-[0.8125rem] leading-5">
                  {row.note}
                </span>
              ) : null}
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <span
                className={cn(
                  "inline-flex items-center rounded-md border px-2 py-0.5 font-mono text-xs font-medium whitespace-nowrap forced-colors:border-[CanvasText]",
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
  );
};
