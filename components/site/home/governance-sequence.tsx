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
import type { CSSProperties, ReactNode } from "react";

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
  readonly guardrailLabel: string;
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
    guardrailLabel: "Explicit staff trigger",
    guardrail:
      "AI appeal workflows start only when an authorized staff member opens a request against existing fund and supporter records.",
    tone: "human",
  },
  {
    step: "02",
    actor: "AI draft · planned",
    title: "Prepare page, email & recipient scope",
    summary:
      "Drafts copy and eligible recipients inside the requester’s role boundary.",
    guardrailLabel: "Role-scoped read access",
    guardrail:
      "Planned drafts are designed to stay inside the requesting staff member’s existing permissions and never read restricted funds or other teams’ records.",
    tone: "draft",
  },
  {
    step: "03",
    actor: "Staff sign-off · planned",
    title: "Review, edit & approve",
    summary: "Hold every draft word, fund link, and recipient list for review.",
    guardrailLabel: "Separate from routine receipts",
    guardrail:
      "AI-drafted appeals remain in draft until approved by staff. Routine gift receipts and entry-gated thank-yous (ADR 0004) follow separate organization rules.",
    tone: "approval",
  },
  {
    step: "04",
    actor: "After approval · planned",
    title: "Publish & tie gifts to history",
    summary:
      "Connect the approved campaign page back to the same fund ledger.",
    guardrailLabel: "Single-record continuity",
    guardrail:
      "Contributions from an approved appeal are designed to record into the same donor portal, redacted missionary roster, and office ledger.",
    tone: "record",
  },
];

const getToneClasses = (tone: GovernanceTone) => {
  if (tone === "approval") {
    return {
      actor: "text-vermilion",
      numberIdle: "border-vermilion-border bg-vermilion-soft text-vermilion",
      numberSelected:
        "border-vermilion bg-vermilion text-primary-foreground font-semibold",
      accentText: "text-vermilion font-semibold",
      panel: "border-vermilion-border bg-card",
    };
  }
  if (tone === "draft") {
    return {
      actor: "text-draft",
      numberIdle: "border-draft-border bg-draft-soft text-draft border-dashed",
      numberSelected:
        "border-foreground bg-foreground text-background font-semibold",
      accentText: "text-draft font-semibold",
      panel: "border-draft-border bg-card border-dashed",
    };
  }
  if (tone === "record") {
    return {
      actor: "text-pine",
      numberIdle: "border-pine-border bg-pine-soft text-pine",
      numberSelected: "border-pine bg-pine text-background font-semibold",
      accentText: "text-pine font-semibold",
      panel: "border-pine-border bg-card",
    };
  }
  return {
    actor: "text-muted-foreground",
    numberIdle: "border-rule-interactive bg-record text-foreground",
    numberSelected:
      "border-foreground bg-foreground text-background font-semibold",
    accentText: "text-foreground font-semibold",
    panel: "border-rule-strong bg-card",
  };
};

const STEP_INDICATOR_INK: Record<StepKey, string> = {
  "01": "var(--foreground)",
  "02": "var(--draft)",
  "03": "var(--vermilion)",
  "04": "var(--pine)",
};

// Hairline-ruled press ledger rows — crisp ink rail, filled active index, zero rounded-xl card walls.
const STEP_ROW_CLASS =
  "border-rule-interactive data-selected:bg-card relative z-10 grid w-full min-w-0 grid-cols-[2rem_1fr] items-start gap-3 border-b px-3 py-3.5 text-left last:border-b-0 forced-colors:data-selected:border-[Highlight] forced-colors:data-selected:outline-2 forced-colors:data-selected:outline-offset-[-2px] forced-colors:data-selected:outline-[Highlight]";

const STEP_ROW_INTERACTIVE_CLASS =
  "focus-visible:ring-ring cursor-pointer transition-[color,background-color] duration-150 select-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:outline-2 focus-visible:outline-transparent not-data-selected:[@media(hover:hover)_and_(pointer:fine)]:hover:bg-card/75";

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
          "mt-0.5 inline-flex size-6 items-center justify-center border font-mono text-[0.6875rem] tabular-nums transition-colors duration-150",
          tone[isSelected ? "numberSelected" : "numberIdle"]
        )}
      >
        {item.step}
      </span>
      <span className="block min-w-0">
        <span className="flex flex-wrap items-baseline justify-between gap-2">
          <span className="text-foreground font-sans text-sm font-semibold">
            {item.title}
          </span>
          <span className={cn("inline-flex items-center gap-1.5 font-mono text-xs", tone.actor)}>
            <span>{item.actor}</span>
            {isSelected ? null : (
              <span aria-hidden="true" className="text-muted-foreground/70">
                &rsaquo;
              </span>
            )}
          </span>
        </span>
        <span className="text-muted-foreground mt-0.5 block text-sm leading-6">
          {item.summary}
        </span>
      </span>
    </>
  );
};

const StepGuardrailNote = ({
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
        "h-full border p-4 sm:p-5",
        animated && "surface-enter",
        tone.panel
      )}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2 font-mono text-xs">
        <span className={tone.accentText}>
          Step {item.step} · {item.guardrailLabel}
        </span>
        <span className="text-muted-foreground">Planned rule</span>
      </div>
      <p className="text-foreground mt-2 text-sm leading-6 text-pretty">
        {item.guardrail}
      </p>
    </div>
  );
};

const InactiveDetailSizers = ({
  active,
}: {
  readonly active: StepKey;
}): ReactNode => (
  <>
    {GOVERNANCE_STEPS.map((item) =>
      item.step === active ? null : (
        <div
          key={item.step}
          aria-hidden="true"
          inert
          className={cn(DETAIL_STACK_CELL, "invisible")}
        >
          <StepGuardrailNote item={item} />
        </div>
      )
    )}
  </>
);

// Planned AI appeal steps as vertical `@ui-sdk/react/tabs`: Up/Down, Home, and End move between steps, and every rule is readable without JavaScript.
export const GovernanceSequence = (): ReactNode => {
  const isHydrated = useIsClient();
  const [activeStep, setActiveStep] = useState<StepKey>(DEFAULT_STEP);
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleStepChange = (nextValue: string | null) => {
    if (nextValue === null || !Object.hasOwn(STEP_KEYS, nextValue)) {
      return;
    }
    setHasInteracted(true);
    setActiveStep(nextValue as StepKey);
  };

  return (
    <div className="grid gap-3.5">
      <div className="flex flex-wrap items-baseline justify-between gap-2 font-mono text-xs">
        <span className="text-foreground font-medium">
          Four-step approval sequence
        </span>
        <span className="text-muted-foreground">
          Select a step to inspect its rule
        </span>
      </div>
      {isHydrated ? (
        <Tabs
          orientation="vertical"
          value={activeStep}
          onValueChange={handleStepChange}
          className="grid gap-4"
        >
          <TabsList
            aria-label="Planned AI appeal approval steps"
            className="border-rule-strong relative block border-y pl-2.5"
          >
            <TabsIndicator
              className="vertical-tabs-indicator"
              style={
                {
                  "--indicator-ink": STEP_INDICATOR_INK[activeStep],
                } as CSSProperties
              }
            />
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
            <InactiveDetailSizers active={activeStep} />
            {GOVERNANCE_STEPS.map((item) => (
              <TabsPanel
                key={item.step}
                value={item.step}
                className={cn(
                  DETAIL_STACK_CELL,
                  "focus-visible:ring-ring focus-visible:ring-offset-background grid focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent data-ending-style:hidden"
                )}
              >
                <StepGuardrailNote item={item} animated={hasInteracted} />
              </TabsPanel>
            ))}
          </div>
        </Tabs>
      ) : (
        <div className="grid gap-4">
          <ol className="border-rule-strong relative block border-y pl-2.5">
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
                      className="bg-vermilion absolute top-0 bottom-0 -left-[0.625rem] w-[3px] rounded-full"
                    />
                  ) : null}
                  <StepRowBody item={item} isSelected={isSelected} />
                </li>
              );
            })}
          </ol>

          <div className="grid min-w-0">
            <InactiveDetailSizers active={DEFAULT_STEP} />
            <div className={cn(DETAIL_STACK_CELL, "grid")}>
              <StepGuardrailNote item={GOVERNANCE_STEPS[2]} />
            </div>
          </div>
        </div>
      )}

      {/* Static fallback exposing the planned rules for steps 01, 02, and 04 when JavaScript is disabled */}
      <noscript>
        <div className="grid gap-3">
          <StepGuardrailNote item={GOVERNANCE_STEPS[0]} />
          <StepGuardrailNote item={GOVERNANCE_STEPS[1]} />
          <StepGuardrailNote item={GOVERNANCE_STEPS[3]} />
        </div>
      </noscript>
    </div>
  );
};
