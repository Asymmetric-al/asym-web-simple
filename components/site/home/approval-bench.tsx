"use client";

import { useState, useSyncExternalStore } from "react";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

const noop = () => {
  // Static subscription for client hydration flag.
};

const emptySubscribe = () => noop;

const useIsClient = (): boolean =>
  useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

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

/**
Act Two playable demonstration (`In development`): lets visitors inspect an
AI-drafted campaign tied to the same fictional scenario, make a staff edit,
and press the Postmark Vermilion approval stamp themselves.
*/
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
        className="text-pine hover:text-foreground focus-visible:ring-ring inline-flex min-h-11 shrink-0 cursor-pointer items-center rounded-md px-2 text-xs font-medium underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-2 focus-visible:outline-transparent sm:min-h-8 sm:px-1.5"
      >
        {openingKey === "ai" ? "Make a staff edit" : "Revert to AI draft"}
      </button>
    );
  }

  return (
    <div className="relative">
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl p-5 sm:p-7",
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
              "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-xs font-medium",
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
              ? "Approved by staff · sample only"
              : "Drafted by AI · not sent"}
          </span>
        </div>

        {/* Draft body */}
        <div className="mt-5 grid gap-5">
          <div className="grid gap-3 text-sm sm:grid-cols-2">
            <div className="border-rule bg-card/85 rounded-xl border p-3.5">
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
            <div className="border-rule bg-card/85 rounded-xl border p-3.5">
              <p className="text-muted-foreground font-mono text-xs">
                Linked fund &amp; target page
              </p>
              <p className="text-foreground mt-1 font-medium">
                Fund 310-EAST-WATER · Year-end giving page
              </p>
              <p className="text-muted-foreground mt-1 text-xs leading-5">
                {approved
                  ? "Page ready to publish; incoming gifts will bind directly to donor history and Field Team East’s roster."
                  : "Held in draft. Zero emails queued and zero public pages changed until a staff member approves."}
              </p>
            </div>
          </div>

          {/* Editable / inspectable appeal copy block */}
          <div
            className={cn(
              "rounded-xl border p-4 sm:p-5",
              approved
                ? "border-rule bg-background/65"
                : "border-draft-border bg-card border-dashed"
            )}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <p className="text-muted-foreground pt-1 font-mono text-xs">
                Email &amp; giving page lead ·{" "}
                <span className="text-foreground">{activeCopy.label}</span>
              </p>
              {leadAction}
            </div>

            <p className="font-heading text-foreground mt-3 text-xl leading-snug font-medium tracking-[-0.015em]">
              {activeCopy.subject}
            </p>
            <p className="text-muted-foreground mt-2 text-sm leading-6 text-pretty sm:text-[0.9375rem]">
              {activeCopy.body}
            </p>
          </div>
        </div>

        {/* Action bar — Postmark Vermilion stamp trigger */}
        {isHydrated ? (
          <div className="border-rule mt-5 flex flex-col gap-3 border-t pt-5 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
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
                  Approve draft
                </button>
              )}
            </div>
            <p className="text-muted-foreground text-xs leading-5">
              {approved
                ? "Approved in this sample only. In development: asym will publish the page and tie each gift back to donor history."
                : "If it’s vermilion, a person decided. Press Approve draft to test the human review gate."}
            </p>
          </div>
        ) : null}

        <p className="sr-only" role="status" aria-live="polite">
          {approved
            ? "Sample appeal draft approved by staff. Ready to publish in this illustration; nothing was sent."
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
              approves it, <span translate="no">asym</span> will publish the
              giving page and link each resulting gift and receipt back to donor
              history.
            </p>
          </div>
        </noscript>
      </div>
    </div>
  );
};
