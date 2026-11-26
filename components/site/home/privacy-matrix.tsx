"use client";

import {
  SegmentedControl,
  SegmentedControlIndicator,
  SegmentedControlItem,
} from "@ui-sdk/react/segmented-control";
import { ShieldCheck } from "lucide-react";
import { useState } from "react";
import {
  Frame,
  FrameFooter,
  FrameHeader,
  FramePanel,
} from "@/components/site/reui/frame";
import { siteConfig } from "@/lib/config";
import { useIsClient } from "@/lib/use-is-client";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type RoleLens = "compare" | "donor" | "missionary" | "office";

const ROLE_LENS_MAP: Record<RoleLens, true> = {
  compare: true,
  donor: true,
  missionary: true,
  office: true,
};

const HEADER_CELL_CLASS =
  "border-rule border-l px-5 py-3 transition-colors duration-150 ease-out";
const HEADER_TITLE_BASE_CLASS = "block font-sans text-xs font-semibold";
const MONO_PATH_CLASS = "text-muted-foreground font-mono text-xs";
const BODY_CELL_CLASS =
  "rounded-xl px-3.5 py-2.5 transition-colors duration-150 ease-out md:border-rule md:rounded-none md:border-l md:px-5 md:py-4";
const MOBILE_ROLE_LABEL_CLASS =
  "text-muted-foreground mb-1 block font-mono text-xs font-medium md:sr-only";
const TEXT_FOREGROUND_CLASS = "text-foreground";
const TEXT_SIGNAL_CLASS = "text-signal";
const CELL_BODY_TEXT_CLASS = "text-sm leading-6";

interface VisibilityRule {
  readonly detail: string;
  readonly donor: string;
  readonly missionary: string;
  readonly office: string;
}

const VISIBILITY_RULES: readonly VisibilityRule[] = [
  {
    detail: "Who gave",
    donor: "Only your own household or church account",
    missionary: "Anonymous partner by default; named only if the donor opts in",
    office: "Full legal household, church, or organization record",
  },
  {
    detail: "Gift amount & history",
    donor: "Your individual receipts and completed gift totals",
    missionary:
      "Monthly support progress visible; lifetime and last-gift totals hidden per row",
    office: "Complete gift, fund designation, fee, and deposit record",
  },
  {
    detail: "Contact, notes & care",
    donor: "Your own contact details and communication choices",
    missionary:
      "Built-in micro-CRM for opted-in supporters; anonymous donors stay private",
    office: "Full household history with role-separated staff access",
  },
  {
    detail: "Year-end tax statement",
    donor: "Download completed gifts for the year anytime",
    missionary: "Never shown in the missionary workspace",
    office: "Generated straight from the same completed giving records",
  },
];

const ROLE_OPTIONS: readonly {
  readonly value: RoleLens;
  readonly label: string;
  readonly scopeSummary: string;
}[] = [
  {
    value: "compare",
    label: "Compare all",
    scopeSummary:
      "Every role works from the same live giving record, while built-in permission rules control what each person sees.",
  },
  {
    value: "donor",
    label: "Donor",
    scopeSummary:
      "apps/donor · Supporters see only their own gifts, recurring schedules, saved cards, and completed year-end statements.",
  },
  {
    value: "missionary",
    label: "Missionary",
    scopeSummary:
      "apps/missionary · Per-worker micro-CRM where non-opted-in donors show as Anonymous partner and per-row totals stay hidden.",
  },
  {
    value: "office",
    label: "Office",
    scopeSummary:
      "apps/admin · Authorized office and finance staff see full household records, gift batch checks, and role-separated permissions.",
  },
];

const isRoleLens = (value: string | null): value is RoleLens =>
  value !== null && Object.hasOwn(ROLE_LENS_MAP, value);

const getColumnSurface = (
  column: Exclude<RoleLens, "compare">,
  activeLens: RoleLens
): string => {
  if (activeLens === column) {
    return column === "missionary" ? "bg-human-soft/65" : "bg-signal-soft/65";
  }
  if (activeLens === "compare" && column === "missionary") {
    return "bg-signal-soft/45";
  }
  return "";
};

const getColumnTextClass = (
  column: Exclude<RoleLens, "compare">,
  activeLens: RoleLens
): string => {
  if (activeLens === column) {
    return "text-foreground font-medium";
  }
  if (activeLens === "compare") {
    return column === "missionary"
      ? "text-foreground font-medium"
      : "text-foreground/85";
  }
  return "text-muted-foreground";
};

/**
Interactive server-enforced privacy matrix framed in ReUI `Frame`, blending Shadcn Studio's column/row highlight interaction (`@ss-components/table-08`) with `@ui-sdk/react/segmented-control` role-lens inspection. Hydrated-only control keeps `0` inert buttons in no-JS and `0px` CLS.
*/
export const PrivacyMatrix = (): ReactNode => {
  const isHydrated = useIsClient();
  const [roleLens, setRoleLens] = useState<RoleLens>("compare");

  const activeOption =
    ROLE_OPTIONS.find((option) => option.value === roleLens) ?? ROLE_OPTIONS[0];

  const handleRoleChange = (nextValue: string | null): void => {
    if (!isRoleLens(nextValue)) {
      return;
    }
    setRoleLens(nextValue);
  };

  return (
    <figure className="mt-8">
      <Frame variant="default" spacing="none">
        <FrameHeader className="flex-col gap-3 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex flex-wrap items-center gap-2.5">
            <p className="text-foreground font-sans text-sm font-semibold">
              One record, three tailored views
            </p>
            <span className="border-signal-border bg-signal-soft text-signal inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 font-mono text-xs font-medium forced-colors:border-[CanvasText]">
              <ShieldCheck className="size-3.5" aria-hidden="true" />
              Automatic privacy rules
            </span>
          </div>

          {isHydrated ? (
            <SegmentedControl
              aria-label="Inspect workspace view"
              value={roleLens}
              onValueChange={handleRoleChange}
              className="border-rule-strong bg-card has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-offset-record relative isolate inline-flex w-fit max-w-full items-center overflow-x-auto rounded-full border p-1 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-offset-2 forced-colors:border-[ButtonBorder]"
            >
              <SegmentedControlIndicator className="segmented-indicator" />
              {ROLE_OPTIONS.map((option) => (
                <SegmentedControlItem
                  key={option.value}
                  value={option.value}
                  className={cn(
                    "text-muted-foreground relative z-10 inline-flex min-h-9 cursor-pointer items-center rounded-full border border-transparent px-3 font-sans text-xs font-medium whitespace-nowrap transition-transform duration-150 ease-out select-none focus-visible:outline-2 focus-visible:outline-transparent active:scale-[0.97] sm:min-h-8 [@media(hover:hover)_and_(pointer:fine)]:hover:text-foreground",
                    "data-checked:text-foreground",
                    "forced-colors:data-checked:border-[Highlight] forced-colors:data-checked:bg-[Highlight] forced-colors:data-checked:text-[HighlightText] forced-colors:data-checked:forced-color-adjust-none"
                  )}
                >
                  <span>{option.label}</span>
                </SegmentedControlItem>
              ))}
            </SegmentedControl>
          ) : (
            <span
              aria-hidden="true"
              className="text-muted-foreground inline-flex min-h-11 items-center font-mono text-xs sm:min-h-10"
            >
              apps/donor · apps/missionary · apps/admin
            </span>
          )}
        </FrameHeader>

        <FramePanel>
          {roleLens !== "compare" && activeOption ? (
            <div
              key={roleLens}
              role="status"
              aria-live="polite"
              className={cn(
                "surface-enter border-rule border-b px-5 py-2.5 font-mono text-xs leading-5 sm:px-6",
                roleLens === "missionary"
                  ? "bg-human-soft/55 text-foreground"
                  : "bg-signal-soft/55 text-foreground"
              )}
            >
              {activeOption.scopeSummary}
            </div>
          ) : null}

          <div
            aria-hidden="true"
            className="border-rule bg-record/35 hidden border-b md:grid md:grid-cols-[minmax(0,22fr)_minmax(0,26fr)_minmax(0,26fr)_minmax(0,26fr)]"
          >
            <div className="text-muted-foreground px-6 py-3 font-sans text-xs font-semibold">
              Record detail
            </div>
            <div
              className={cn(
                HEADER_CELL_CLASS,
                getColumnSurface("donor", roleLens)
              )}
            >
              <span
                className={cn(
                  HEADER_TITLE_BASE_CLASS,
                  roleLens === "donor"
                    ? TEXT_SIGNAL_CLASS
                    : TEXT_FOREGROUND_CLASS
                )}
              >
                Donor portal
              </span>
              <span translate="no" className={MONO_PATH_CLASS}>
                apps/donor
              </span>
            </div>
            <div
              className={cn(
                HEADER_CELL_CLASS,
                getColumnSurface("missionary", roleLens)
              )}
            >
              <span
                className={cn(
                  HEADER_TITLE_BASE_CLASS,
                  roleLens === "missionary" ? "text-human" : TEXT_SIGNAL_CLASS
                )}
              >
                Missionary workspace
              </span>
              <span translate="no" className={MONO_PATH_CLASS}>
                apps/missionary
              </span>
            </div>
            <div
              className={cn(
                HEADER_CELL_CLASS,
                getColumnSurface("office", roleLens)
              )}
            >
              <span
                className={cn(
                  HEADER_TITLE_BASE_CLASS,
                  roleLens === "office"
                    ? TEXT_SIGNAL_CLASS
                    : TEXT_FOREGROUND_CLASS
                )}
              >
                Mission Control
              </span>
              <span translate="no" className={MONO_PATH_CLASS}>
                apps/admin
              </span>
            </div>
          </div>

          <div className="divide-rule divide-y">
            {VISIBILITY_RULES.map((rule) => (
              <div
                key={rule.detail}
                className="grid gap-3 px-5 py-4 md:grid-cols-[minmax(0,22fr)_minmax(0,26fr)_minmax(0,26fr)_minmax(0,26fr)] md:gap-0 md:p-0 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-record/30"
              >
                <div className="text-foreground font-heading text-sm font-semibold tracking-[-0.015em] md:px-6 md:py-4">
                  {rule.detail}
                </div>
                <div
                  className={cn(
                    BODY_CELL_CLASS,
                    getColumnSurface("donor", roleLens)
                  )}
                >
                  <span className={MOBILE_ROLE_LABEL_CLASS}>
                    Donor portal<span className="sr-only">: </span>
                  </span>
                  <p
                    className={cn(
                      CELL_BODY_TEXT_CLASS,
                      getColumnTextClass("donor", roleLens)
                    )}
                  >
                    {rule.donor}
                  </p>
                </div>
                <div
                  className={cn(
                    BODY_CELL_CLASS,
                    getColumnSurface("missionary", roleLens)
                  )}
                >
                  <span
                    className={cn(
                      "mb-1 block font-mono text-xs font-medium md:sr-only",
                      roleLens === "missionary"
                        ? "text-human"
                        : TEXT_SIGNAL_CLASS
                    )}
                  >
                    Missionary workspace<span className="sr-only">: </span>
                  </span>
                  <p
                    className={cn(
                      CELL_BODY_TEXT_CLASS,
                      getColumnTextClass("missionary", roleLens)
                    )}
                  >
                    {rule.missionary}
                  </p>
                </div>
                <div
                  className={cn(
                    BODY_CELL_CLASS,
                    getColumnSurface("office", roleLens)
                  )}
                >
                  <span className={MOBILE_ROLE_LABEL_CLASS}>
                    Mission Control<span className="sr-only">: </span>
                  </span>
                  <p
                    className={cn(
                      CELL_BODY_TEXT_CLASS,
                      getColumnTextClass("office", roleLens)
                    )}
                  >
                    {rule.office}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </FramePanel>

        <FrameFooter className="px-4 py-3 sm:px-6">
          <figcaption className="text-muted-foreground text-xs leading-5">
            Privacy rules are enforced automatically in server code (
            <a
              href={`${siteConfig.repoUrl}/blob/develop/packages/api/src/missionary-portal/donors.ts`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground focus-visible:ring-ring rounded-xs font-mono font-medium underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-2 focus-visible:outline-transparent [@media(hover:hover)_and_(pointer:fine)]:hover:text-signal"
            >
              donors.ts
              <span className="sr-only">
                {" "}
                in Asymmetric-al/core (opens in a new tab)
              </span>
            </a>{" "}
            and{" "}
            <a
              href={`${siteConfig.repoUrl}/blob/develop/packages/api/src/donor-portal/statements.ts`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground focus-visible:ring-ring rounded-xs font-mono font-medium underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-2 focus-visible:outline-transparent [@media(hover:hover)_and_(pointer:fine)]:hover:text-signal"
            >
              statements.ts
              <span className="sr-only">
                {" "}
                in Asymmetric-al/core (opens in a new tab)
              </span>
            </a>
            ) and database permissions, never left to manual spreadsheet
            cleanup.
          </figcaption>
        </FrameFooter>
      </Frame>
    </figure>
  );
};
