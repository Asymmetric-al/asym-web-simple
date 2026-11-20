"use client";

import { useState } from "react";
import { useIsClient } from "@/lib/use-is-client";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type GovernanceTone = "human" | "draft" | "approval" | "record";

const INACTIVE_CARD_CLASS = "border-rule bg-card/70";

interface GovernanceStep {
  readonly step: string;
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
      "Staff start from the real fund and supporter history already in asym rather than pulling donor lists out of separate tools.",
    guardrail:
      "Nothing starts autonomously. Every workflow begins with an explicit request from an authorized team member.",
    tone: "human",
  },
  {
    step: "02",
    actor: "AI draft · in development",
    title: "Prepare page, email & recipient scope",
    summary:
      "Drafts stay strictly inside the requesting staff member’s permissions.",
    detail:
      "We are building AI preparation to draft giving-page copy, donor correspondence, and eligible recipient lists without crossing role boundaries.",
    guardrail:
      "Permission boundary: drafts cannot access restricted funds, other teams, or donor fields outside the staff member’s own role.",
    tone: "draft",
  },
  {
    step: "03",
    actor: "Human sign-off required",
    title: "Review, edit & approve",
    summary: "Every word, fund link, and recipient list waits for a person.",
    detail:
      "Just as staff actions in the public code preview affected records before running, AI-prepared appeals will hold in draft until a person reviews and signs off.",
    guardrail:
      "Hard stop: zero emails go to donors and zero website pages change without explicit human approval.",
    tone: "approval",
  },
  {
    step: "04",
    actor: "asym · after sign-off",
    title: "Publish & tie gifts to history",
    summary: "Resulting gifts, receipts, and updates land on the same record.",
    detail:
      "Once approved and published, every contribution given through the page flows straight into donor history, tax receipts, missionary progress, and office reporting.",
    guardrail:
      "Full audit trail: who approved the campaign, what went out, and every gift tied back to the original fund.",
    tone: "record",
  },
];

const getToneClasses = (tone: GovernanceTone, isActive: boolean) => {
  if (tone === "approval") {
    return {
      badge: "border-vermilion-border bg-vermilion-soft text-vermilion",
      number: "text-vermilion font-semibold",
      card: isActive ? "border-vermilion-border bg-card" : INACTIVE_CARD_CLASS,
    };
  }
  if (tone === "draft") {
    return {
      badge: "border-draft-border bg-draft-soft text-draft border-dashed",
      number: "text-draft font-medium",
      card: isActive
        ? "border-draft-border bg-card border-dashed"
        : INACTIVE_CARD_CLASS,
    };
  }
  if (tone === "record") {
    return {
      badge: "border-pine-border bg-pine-soft text-pine",
      number: "text-pine font-semibold",
      card: isActive ? "border-pine-border bg-card" : INACTIVE_CARD_CLASS,
    };
  }
  return {
    badge: "border-rule-strong bg-record text-foreground",
    number: "text-foreground font-semibold",
    card: isActive ? "border-rule-strong bg-card" : INACTIVE_CARD_CLASS,
  };
};

// Interactive governance sequence (`In development`) explaining human-approved AI boundaries without fake campaign copy or mock drafts.
export const GovernanceSequence = (): ReactNode => {
  const isHydrated = useIsClient();
  const [activeIndex, setActiveIndex] = useState(2);

  const active = GOVERNANCE_STEPS[activeIndex] ?? GOVERNANCE_STEPS[2];
  const activeTone = getToneClasses(active.tone, true);

  return (
    <div className="grid gap-5">
      {isHydrated ? (
        <ol className="border-rule divide-rule divide-y border-y">
          {GOVERNANCE_STEPS.map((item, idx) => {
            const isActive = idx === activeIndex;
            const tone = getToneClasses(item.tone, isActive);

            return (
              <li key={item.step}>
                <button
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveIndex(idx)}
                  className={cn(
                    "focus-visible:ring-ring grid w-full cursor-pointer grid-cols-[2.25rem_1fr] items-baseline gap-3 rounded-lg px-2.5 py-3.5 text-left transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-none",
                    isActive ? "bg-card shadow-xs" : "hover:bg-record/60"
                  )}
                >
                  <span
                    className={cn(
                      "font-mono text-xs tabular-nums",
                      tone.number
                    )}
                  >
                    {item.step}
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
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
                    </div>
                    <p className="text-muted-foreground mt-1 text-sm leading-6">
                      {item.summary}
                    </p>
                  </div>
                </button>
              </li>
            );
          })}
        </ol>
      ) : (
        // Zero-button static list pre-hydration & no-JS for 0.0000 CLS and zero inert buttons.
        <ol className="border-rule divide-rule divide-y border-y">
          {GOVERNANCE_STEPS.map((item) => {
            const tone = getToneClasses(item.tone, item.step === "03");
            return (
              <li
                key={item.step}
                className="grid grid-cols-[2.25rem_1fr] items-baseline gap-3 px-2.5 py-3.5"
              >
                <span
                  className={cn("font-mono text-xs tabular-nums", tone.number)}
                >
                  {item.step}
                </span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
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
                  </div>
                  <p className="text-muted-foreground mt-1 text-sm leading-6">
                    {item.summary}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      )}

      {/* Active step governance rule note — honest conceptual detail, zero fake draft UI */}
      <div
        key={active.step}
        className={cn(
          "surface-enter rounded-xl border p-5 transition-colors duration-200",
          activeTone.card
        )}
      >
        <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
          <span className={activeTone.number}>
            Step {active.step} · {active.title}
          </span>
          <span className="text-muted-foreground">Planned workflow rule</span>
        </div>
        <p className="text-foreground mt-2.5 text-sm leading-6 text-pretty sm:text-[0.9375rem]">
          {active.detail}
        </p>
        <p className="border-rule text-muted-foreground mt-3.5 border-t pt-3 text-xs leading-5">
          {active.guardrail}
        </p>
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        {`Step ${active.step}: ${active.title}. ${active.guardrail}`}
      </p>
    </div>
  );
};
