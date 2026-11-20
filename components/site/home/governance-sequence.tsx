"use client";

import {
  Tabs,
  TabsIndicator,
  TabsList,
  TabsPanel,
  TabsTab,
} from "@ui-sdk/react/tabs";
import { useState } from "react";
import { useIsClient } from "@/lib/use-is-client";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type GovernanceTone = "human" | "draft" | "approval" | "record";
type StepKey = "01" | "02" | "03" | "04";

const STEP_KEYS: Record<StepKey, true> = {
  "01": true,
  "02": true,
  "03": true,
  "04": true,
};

const DEFAULT_STEP: StepKey = "03";

interface GovernanceStep {
  readonly step: StepKey;
  readonly actor: string;
  readonly title: string;
  readonly summary: string;
  readonly detail: string;
  readonly guardrail: string;
  readonly tone: GovernanceTone;
}

const GOVERNANCE_STEPS: readonly [
  GovernanceStep,
  GovernanceStep,
  GovernanceStep,
  GovernanceStep,
] = [
  {
    step: "01",
    actor: "Your team",
    title: "Describe the appeal",
    summary: "Set the goal, designated fund, and audience in plain language.",
    detail:
      "Staff start from the real fund and supporter records already in asym instead of pulling donor lists out of separate tools.",
    guardrail:
      "Planned trigger rule: AI appeal workflows begin only from an explicit request by an authorized staff member.",
    tone: "human",
  },
  {
    step: "02",
    actor: "AI draft · planned",
    title: "Prepare page, email & recipient scope",
    summary:
      "Drafts stay strictly inside the requesting staff member’s permissions.",
    detail:
      "We are building AI preparation to draft giving-page copy, donor correspondence, and eligible recipient lists without crossing role boundaries.",
    guardrail:
      "Permission boundary: planned drafts cannot read restricted funds, other teams, or donor fields outside the staff member’s own role.",
    tone: "draft",
  },
  {
    step: "03",
    actor: "Staff sign-off · planned",
    title: "Review, edit & approve",
    summary:
      "Every AI-drafted word, fund link, and recipient list will wait for staff review.",
    detail:
      "Just as key staff actions in the public code preview affected records before running, AI-prepared appeals are designed to hold in draft until a staff member reviews and approves them.",
    guardrail:
      "Planned AI guardrail: AI-prepared appeal emails and campaign pages stay in draft until approved by staff. Routine gift receipts and acknowledgments follow separate organization settings.",
    tone: "approval",
  },
  {
    step: "04",
    actor: "After approval · planned",
    title: "Publish & tie gifts to history",
    summary: "Gifts from the approved page land back on the same fund record.",
    detail:
      "Once approved and published, contributions given through the campaign page are designed to record into the same donor history, receipts, missionary progress, and office ledger.",
    guardrail:
      "Planned continuity: keep the approved appeal, published page, and resulting fund gifts connected on one record.",
    tone: "record",
  },
];

const getToneClasses = (tone: GovernanceTone) => {
  if (tone === "approval") {
    return {
      badge: "border-vermilion-border bg-vermilion-soft text-vermilion",
      numberIdle: "border-vermilion-border bg-vermilion-soft text-vermilion",
      numberSelected:
        "border-vermilion bg-vermilion text-primary-foreground font-semibold",
      accentText: "text-vermilion font-semibold",
      panel: "border-vermilion-border bg-card",
    };
  }
  if (tone === "draft") {
    return {
      badge: "border-draft-border bg-draft-soft text-draft border-dashed",
      numberIdle: "border-draft-border bg-draft-soft text-draft border-dashed",
      numberSelected:
        "border-foreground bg-foreground text-background font-semibold",
      accentText: "text-draft font-semibold",
      panel: "border-draft-border bg-card border-dashed",
    };
  }
  if (tone === "record") {
    return {
      badge: "border-pine-border bg-pine-soft text-pine",
      numberIdle: "border-pine-border bg-pine-soft text-pine",
      numberSelected: "border-pine bg-pine text-background font-semibold",
      accentText: "text-pine font-semibold",
      panel: "border-pine-border bg-card",
    };
  }
  return {
    badge: "border-rule-strong bg-record text-foreground",
    numberIdle: "border-rule-strong bg-record text-foreground",
    numberSelected:
      "border-foreground bg-foreground text-background font-semibold",
    accentText: "text-foreground font-semibold",
    panel: "border-rule-strong bg-card",
  };
};

// Selection is shown by the ink rail, the filled step number, and a stronger border; none of them change the row's size.
const STEP_ROW_CLASS =
  "border-rule bg-background/40 data-selected:border-foreground/65 data-selected:bg-card relative z-10 grid w-full min-w-0 grid-cols-[2.25rem_1fr] items-start gap-3 rounded-xl border px-3 py-3 text-left data-selected:shadow-xs forced-colors:data-selected:border-[Highlight]";

const STEP_ROW_INTERACTIVE_CLASS =
  "hover:border-rule-strong hover:bg-card/75 data-selected:hover:border-foreground/65 data-selected:hover:bg-card focus-visible:ring-ring focus-visible:ring-offset-background cursor-pointer transition-[color,background-color,border-color,scale] duration-150 select-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent active:scale-[0.99]";

const DETAIL_STACK_CELL = "col-start-1 row-start-1 min-w-0";

const StepRowBody = ({
  item,
  isSelected,
}: {
  readonly item: GovernanceStep;
  readonly isSelected: boolean;
}): ReactNode => {
  const tone = getToneClasses(item.tone);

  return (
    <>
      <span
        aria-hidden="true"
        className={cn(
          "mt-0.5 inline-flex size-7 items-center justify-center rounded-full border font-mono text-xs tabular-nums transition-colors duration-150",
          tone[isSelected ? "numberSelected" : "numberIdle"]
        )}
      >
        {item.step}
      </span>
      <span className="block min-w-0">
        <span className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-foreground font-sans text-sm font-semibold">
            {item.title}
          </span>
          <span
            className={cn(
              "rounded-full border px-2 py-0.5 font-mono text-xs",
              tone.badge
            )}
          >
            {item.actor}
          </span>
        </span>
        <span className="text-muted-foreground mt-1 block text-sm leading-6">
          {item.summary}
        </span>
      </span>
    </>
  );
};

const StepRuleDetail = ({
  item,
  animated = false,
}: {
  readonly item: GovernanceStep;
  readonly animated?: boolean;
}): ReactNode => {
  const tone = getToneClasses(item.tone);

  return (
    <div
      className={cn(
        "h-full rounded-xl border p-5 shadow-[var(--shadow-card)]",
        animated && "surface-enter",
        tone.panel
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
        <span className={tone.accentText}>
          Step {item.step} · {item.title}
        </span>
        <span className="text-muted-foreground">Planned workflow rule</span>
      </div>
      <p className="text-foreground mt-2.5 text-sm leading-6 text-pretty sm:text-[0.9375rem]">
        {item.detail}
      </p>
      <p className="border-rule text-muted-foreground mt-3.5 border-t pt-3 text-xs leading-5">
        {item.guardrail}
      </p>
    </div>
  );
};

// Invisible copies of every rule share the panel's grid cell so changing steps never moves the page at any width.
const DetailSizers = (): ReactNode => (
  <>
    {GOVERNANCE_STEPS.map((item) => (
      <div
        key={item.step}
        aria-hidden="true"
        inert
        className={cn(DETAIL_STACK_CELL, "invisible")}
      >
        <StepRuleDetail item={item} />
      </div>
    ))}
  </>
);

// Planned AI appeal steps as vertical `@ui-sdk/react/tabs`: Up/Down, Home, and End move between steps, and every rule is readable without JavaScript.
export const GovernanceSequence = (): ReactNode => {
  const isHydrated = useIsClient();
  const [activeStep, setActiveStep] = useState<StepKey>(DEFAULT_STEP);

  const handleStepChange = (nextValue: string | null) => {
    if (nextValue !== null && Object.hasOwn(STEP_KEYS, nextValue)) {
      setActiveStep(nextValue as StepKey);
    }
  };

  return (
    <div className="grid gap-4">
      {isHydrated ? (
        <Tabs
          orientation="vertical"
          value={activeStep}
          onValueChange={handleStepChange}
          className="grid gap-4"
        >
          <TabsList
            aria-label="Planned AI appeal approval steps"
            className="relative grid gap-2 pl-2.5"
          >
            <TabsIndicator className="vertical-tabs-indicator" />
            {GOVERNANCE_STEPS.map((item) => (
              <TabsTab
                key={item.step}
                value={item.step}
                className={cn(STEP_ROW_CLASS, STEP_ROW_INTERACTIVE_CLASS)}
              >
                <StepRowBody
                  item={item}
                  isSelected={activeStep === item.step}
                />
              </TabsTab>
            ))}
          </TabsList>

          <div className="grid min-w-0">
            <DetailSizers />
            {GOVERNANCE_STEPS.map((item) => (
              <TabsPanel
                key={item.step}
                value={item.step}
                className={cn(
                  DETAIL_STACK_CELL,
                  "focus-visible:ring-ring focus-visible:ring-offset-background grid rounded-xl focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent data-ending-style:hidden"
                )}
              >
                <StepRuleDetail item={item} animated />
              </TabsPanel>
            ))}
          </div>
        </Tabs>
      ) : (
        // Same geometry as the hydrated sequence, with no buttons, so nothing is inert without JavaScript and nothing shifts on hydration.
        <div className="grid gap-4">
          <ol className="relative grid gap-2 pl-2.5">
            {GOVERNANCE_STEPS.map((item) => {
              const isSelected = item.step === DEFAULT_STEP;
              return (
                <li
                  key={item.step}
                  data-selected={isSelected ? "" : undefined}
                  className={STEP_ROW_CLASS}
                >
                  {isSelected ? (
                    <span
                      aria-hidden="true"
                      className="bg-foreground absolute -top-px -bottom-px -left-[calc(0.625rem+1px)] w-[3px] rounded-full"
                    />
                  ) : null}
                  <StepRowBody item={item} isSelected={isSelected} />
                </li>
              );
            })}
          </ol>

          <div className="grid min-w-0">
            <DetailSizers />
            <div className={cn(DETAIL_STACK_CELL, "grid")}>
              <StepRuleDetail item={GOVERNANCE_STEPS[2]} />
            </div>
          </div>
        </div>
      )}

      {/* Static fallback exposing the rules for steps 01, 02, and 04 when JavaScript is disabled */}
      <noscript>
        <div className="grid gap-3">
          <StepRuleDetail item={GOVERNANCE_STEPS[0]} />
          <StepRuleDetail item={GOVERNANCE_STEPS[1]} />
          <StepRuleDetail item={GOVERNANCE_STEPS[3]} />
        </div>
      </noscript>
    </div>
  );
};
