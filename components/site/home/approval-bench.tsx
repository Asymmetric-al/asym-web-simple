"use client";

import Link from "next/link";
import { useState } from "react";
import { buttonVariants } from "@/components/ui/button-variants";
import { useIsClient } from "@/lib/use-is-client";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

const OPENING_VARIANTS = {
  ai: {
    label: "AI draft opening",
    subject: "Year-end support for Field Team East’s clean water work",
    body: "Because of monthly partners like you, Field Team East kept clean-water maintenance running through the dry season. Help close our year-end goal by December 31.",
  },
  edited: {
    label: "Staff edit applied",
    subject: "Two new wells funded: help finish the year with Field Team East",
    body: "Your monthly gifts finished two community wells this fall. Before December 31, we’re raising the remaining support for next spring’s pump parts and local training.",
  },
} as const;

const CAMPAIGN_STAGES = [
  {
    step: "01",
    actor: "Your team",
    title: "Describe the appeal",
    detail: "Set the goal, fund, and field project.",
    isDraft: false,
    isPublishStep: false,
  },
  {
    step: "02",
    actor: "AI draft",
    title: "Draft page, email & audience",
    detail: "Prepared strictly inside your staff permissions.",
    isDraft: true,
    isPublishStep: false,
  },
  {
    step: "03",
    actor: "Your team",
    title: "Edit & approve before sending",
    detail: "Nothing emails a donor or changes your site without sign-off.",
    isDraft: false,
    isPublishStep: false,
  },
  {
    step: "04",
    actor: "asym",
    title: "Publish & tie gifts to history",
    detail: "Every resulting gift and receipt lands on the same record.",
    isDraft: true,
    isPublishStep: true,
  },
] as const;

// Playable Act Two workflow (`In development`): connects the 4-step editorial sequence to an interactive AI-drafted appeal sheet with staff edit + Postmark Vermilion approval stamp.
export const ApprovalBench = (): ReactNode => {
  type OpeningKey = keyof typeof OPENING_VARIANTS;
  const isHydrated = useIsClient();
  const [openingKey, setOpeningKey] = useState<OpeningKey>("ai");
  const [approved, setApproved] = useState(false);

  const activeCopy = OPENING_VARIANTS[openingKey];
  let leadAction: ReactNode = null;

  if (approved) {
    leadAction = (
      <div
        aria-hidden="true"
        className="approval-stamp approval-stamp-animate pointer-events-none inline-block shrink-0 px-3 py-1.5 text-center"
      >
        <p className="font-mono text-xs leading-tight font-medium tracking-[0.06em] uppercase">
          Approved · Staff review
        </p>
        <p className="font-heading mt-0.5 text-xs italic">
          Signed by your team
        </p>
      </div>
    );
  } else if (isHydrated) {
    leadAction = (
      <button
        type="button"
        onClick={() =>
          setOpeningKey((prev) => (prev === "ai" ? "edited" : "ai"))
        }
        className="border-input bg-background/85 text-foreground hover:bg-secondary focus-visible:ring-ring inline-flex min-h-11 shrink-0 cursor-pointer items-center rounded-full border px-3.5 text-xs font-medium transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-none sm:min-h-8"
      >
        {openingKey === "ai" ? "Apply sample edit" : "Revert to AI draft"}
      </button>
    );
  }

  return (
    <div className="mt-7 grid gap-10 lg:grid-cols-[minmax(0,40fr)_minmax(0,60fr)] lg:items-start lg:gap-12">
      {/* Left column: 4-stage workflow with live Step 04 choreography on approval */}
      <div className="min-w-0">
        <ol className="border-rule divide-rule divide-y border-y">
          {CAMPAIGN_STAGES.map((stage) => {
            const isStepReady = stage.isPublishStep && approved;
            let stepToneClass = "text-vermilion font-medium";
            if (isStepReady) {
              stepToneClass = "text-pine font-semibold";
            } else if (stage.isDraft) {
              stepToneClass = "text-draft";
            }

            return (
              <li
                key={stage.step}
                className={cn(
                  "grid grid-cols-[2.25rem_1fr] items-baseline gap-3 rounded-lg px-2 py-3.5 transition-colors duration-200",
                  isStepReady && "bg-pine-soft/65"
                )}
              >
                <span
                  className={cn(
                    "font-mono text-xs tabular-nums",
                    stepToneClass
                  )}
                >
                  {stage.step}
                </span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-foreground font-sans text-sm font-semibold">
                      {stage.title}
                    </h3>
                    {isStepReady ? (
                      <span className="border-pine-border bg-card text-pine rounded-full border px-2 py-0.5 font-mono text-xs font-medium">
                        Ready after sign-off
                      </span>
                    ) : (
                      <span
                        translate={stage.actor === "asym" ? "no" : undefined}
                        className="text-muted-foreground font-mono text-xs"
                      >
                        {stage.actor}
                      </span>
                    )}
                  </div>
                  <p className="text-muted-foreground mt-1 text-sm leading-6">
                    {stage.detail}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>

        <p className="text-muted-foreground mt-5 text-sm leading-6">
          Check{" "}
          <Link
            href="/#where-things-stand"
            prefetch={false}
            className="text-foreground hover:text-pine focus-visible:ring-ring focus-visible:ring-offset-background rounded-xs font-medium underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent"
          >
            the public code inventory
          </Link>{" "}
          for what exists in{" "}
          <span translate="no" className="font-mono text-xs">
            Asymmetric-al/core
          </span>{" "}
          today.
        </p>
      </div>

      {/* Right column: playable AI draft sheet & Vermilion human approval stamp */}
      <div className="min-w-0">
        <div
          className={cn(
            "relative overflow-hidden rounded-2xl p-5 transition-[border-color,background-color,box-shadow] duration-200 sm:p-7",
            approved
              ? "border-rule-strong bg-card border shadow-[var(--shadow-strong)]"
              : "surface-draft"
          )}
        >
          {/* Top specification bar */}
          <div className="border-rule flex flex-wrap items-center justify-between gap-2 border-b pb-4">
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
              <span className="text-foreground font-medium">
                APPEAL-2026-EAST
              </span>
              <span aria-hidden="true" className="text-rule-strong">
                ·
              </span>
              <span className="text-muted-foreground">
                Sample draft · nothing sends
              </span>
            </div>

            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-xs font-medium transition-colors duration-200",
                approved
                  ? "border-pine-border bg-pine-soft text-pine"
                  : "border-draft-border bg-card text-draft border-dashed"
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "size-1.5 rounded-full",
                  approved ? "bg-pine" : "border-draft border"
                )}
              />
              {approved
                ? "Sample approved · nothing sent"
                : "Drafted by AI · not sent"}
            </span>
          </div>

          {/* Draft body */}
          <div className="mt-5 grid gap-5">
            <div className="grid gap-3 text-sm sm:grid-cols-2">
              <div className="border-rule bg-card/90 rounded-xl border p-3.5">
                <p className="text-muted-foreground font-mono text-xs">
                  Permission-scoped audience
                </p>
                <p className="text-foreground mt-1 font-medium">
                  48 active supporters of Field Team East
                </p>
                <p className="text-muted-foreground mt-1 text-xs leading-5">
                  Includes Rivera Household (GIFT-0418). Excludes 3 lapsed
                  addresses and all restricted funds outside your staff role.
                </p>
              </div>
              <div className="border-rule bg-card/90 rounded-xl border p-3.5">
                <p className="text-muted-foreground font-mono text-xs">
                  Linked fund &amp; target page
                </p>
                <p className="text-foreground mt-1 font-medium">
                  Fund 310-EAST-WATER · Year-end giving page
                </p>
                <p className="text-muted-foreground mt-1 text-xs leading-5">
                  {approved
                    ? "Sample approved. In development: approved pages will bind resulting gifts back to donor history and Field Team East’s roster."
                    : "Held in draft. Zero emails queued and zero public pages changed until a staff member approves."}
                </p>
              </div>
            </div>

            {/* Editable / inspectable appeal copy block */}
            <div
              className={cn(
                "rounded-xl border p-4 transition-colors duration-200 sm:p-5",
                approved
                  ? "border-rule bg-background/65"
                  : "border-draft-border bg-card border-dashed"
              )}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-muted-foreground font-mono text-xs">
                  Email &amp; giving page lead ·{" "}
                  <span className="text-foreground">{activeCopy.label}</span>
                </p>
                {leadAction}
              </div>

              <div key={openingKey} className="surface-enter">
                <p className="font-heading text-foreground mt-3 text-xl leading-snug font-medium tracking-[-0.015em]">
                  {activeCopy.subject}
                </p>
                <p className="text-muted-foreground mt-2 text-sm leading-6 text-pretty sm:text-[0.9375rem]">
                  {activeCopy.body}
                </p>
              </div>
            </div>
          </div>

          {/* Action bar — exact SSR height reservation prevents CLS and avoids inert no-JS buttons */}
          <div className="border-rule mt-5 flex min-h-[3.75rem] flex-col gap-3 border-t pt-5 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
            {isHydrated ? (
              <>
                <div className="flex shrink-0 flex-wrap items-center gap-3">
                  {approved ? (
                    <button
                      type="button"
                      onClick={() => {
                        setApproved(false);
                        setOpeningKey("ai");
                      }}
                      className={cn(
                        buttonVariants({ variant: "outline", size: "lg" }),
                        "shrink-0 cursor-pointer px-5 whitespace-nowrap"
                      )}
                    >
                      Reset sample draft
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setApproved(true)}
                      className={cn(
                        buttonVariants({ variant: "default", size: "lg" }),
                        "shrink-0 cursor-pointer px-6 whitespace-nowrap"
                      )}
                    >
                      Approve sample draft
                    </button>
                  )}
                </div>
                <p className="text-muted-foreground text-xs leading-5">
                  {approved
                    ? "Sample approved. Nothing was sent or published. In development: approved pages will tie each gift back to donor history."
                    : "Sample draft only. Nothing emails a donor or changes your site. Press Approve sample draft to preview staff sign-off."}
                </p>
              </>
            ) : (
              <p className="text-muted-foreground text-xs leading-5">
                Sample draft only (in development). Nothing sends or publishes
                without explicit staff sign-off.
              </p>
            )}
          </div>

          <p className="sr-only" role="status" aria-live="polite">
            {approved
              ? "Sample appeal draft approved by staff. Nothing was sent or published."
              : "Sample appeal draft awaiting human approval. Zero emails sent."}
          </p>

          {/* No-JS clear after-approval summary */}
          <noscript>
            <div className="border-pine-border bg-pine-soft/70 mt-4 rounded-xl border p-4 text-xs leading-5">
              <p className="text-pine font-mono font-medium">
                After staff approval (in development)
              </p>
              <p className="text-foreground mt-1">
                Once a team member reviews the draft and recipient list and
                approves it, <span translate="no">asym</span> is being built to
                publish the giving page and tie each resulting gift and receipt
                back to donor history.
              </p>
            </div>
          </noscript>
        </div>
      </div>
    </div>
  );
};
