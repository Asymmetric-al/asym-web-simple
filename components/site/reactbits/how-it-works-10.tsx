"use client";

import { Check } from "lucide-react";
import { m, useReducedMotion } from "motion/react";
import { useState } from "react";
import type { ReactNode } from "react";

interface MigrationStep {
  readonly phase: string;
  readonly timing: string;
  readonly title: string;
  readonly body: string;
  readonly artifactTitle: string;
  readonly artifactStatus: string;
  readonly items: readonly {
    readonly label: string;
    readonly value: string;
  }[];
  readonly footnote: string;
}

const EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];

const MIGRATION_STEPS: readonly MigrationStep[] = [
  {
    phase: "Stage 1",
    timing: "Past closed month",
    title: "Export one already-closed month",
    body: "Start with a month Finance has already balanced in your current system, so there is zero guesswork and zero disruption to live giving.",
    artifactTitle: "Historical month test",
    artifactStatus: "Read-only import",
    items: [
      { label: "Gift types", value: "Online, checks, DAF" },
      { label: "Designations", value: "Missionaries & funds" },
      { label: "Live giving", value: "Untouched" },
    ],
    footnote: "No donor emails or payment changes happen during review.",
  },
  {
    phase: "Stage 2",
    timing: "Funds & privacy setup",
    title: "Map funds, households, and privacy rules",
    body: "Connect your own Stripe account, map missionary and project funds, and check permissions across Donor portal, Missionary workspace, and Mission Control.",
    artifactTitle: "Workspace privacy checks",
    artifactStatus: "Automatic rules",
    items: [
      { label: "Donor portal", value: "Own account only" },
      { label: "Missionary CRM", value: "Anonymous default" },
      { label: "Mission Control", value: "Role-scoped staff" },
    ],
    footnote:
      "Anonymous identities and hidden per-row totals are enforced automatically in server code.",
  },
  {
    phase: "Stage 3",
    timing: "Finance sign-off",
    title: "Match every total to the penny",
    body: "Finance compares batch totals, bank deposits, receipts, and accounting exports directly against your closed month until every cent matches.",
    artifactTitle: "Parallel close check",
    artifactStatus: "Finance verified",
    items: [
      { label: "Batch totals", value: "Matched to deposit" },
      { label: "Tax statements", value: "Completed gifts only" },
      { label: "Variance", value: "$0.00 target" },
    ],
    footnote:
      "Nothing goes live until your Finance lead approves the balanced close.",
  },
  {
    phase: "Stage 4",
    timing: "Feb through Sep only",
    title: "Switch outside year-end giving season",
    body: "Move your giving pages and recurring gifts between February and September, well away from year-end giving, with optional managed donor care planned for small offices.",
    artifactTitle: "Switching window",
    artifactStatus: "Nov-Jan freeze",
    items: [
      { label: "Allowed window", value: "Feb through Sep" },
      { label: "Protected freeze", value: "Nov through Jan" },
      { label: "Saved cards", value: "Your own Stripe" },
    ],
    footnote:
      "Supporters’ saved payment methods stay in your agency’s own Stripe account.",
  },
];

export const HowItWorks10 = (): ReactNode => {
  const isReducedMotion = Boolean(useReducedMotion());
  const [reached, setReached] = useState(0);

  const reachStep = (index: number): void => {
    setReached((current) => Math.max(current, index));
  };

  return (
    <section
      id="migration"
      aria-labelledby="migration-title"
      className="border-rule scroll-mt-24 border-t pt-14 pb-16 sm:pt-18 sm:pb-20"
    >
      <div className="max-w-[44rem]">
        <p className="text-signal font-sans text-sm font-medium">
          Parallel-close onboarding
        </p>
        <h2
          id="migration-title"
          className="font-heading text-foreground mt-2 text-[clamp(1.85rem,3.4vw,2.75rem)] leading-[1.08] font-semibold tracking-[-0.03em]"
        >
          Reconcile one period before you switch.
        </h2>
        <p className="text-muted-foreground mt-3 max-w-[38rem] text-base leading-7 text-pretty">
          No ministry should risk its year-end close on an untested switch.
          Every guided transition proves the numbers on a past month first.
        </p>
      </div>

      <ol className="mt-10 flex flex-col gap-12 sm:mt-12 lg:gap-16">
        {MIGRATION_STEPS.map((step, index) => {
          const isLast = index === MIGRATION_STEPS.length - 1;
          const isLit = isReducedMotion || reached >= index;
          const isLineLit = isReducedMotion || reached > index;

          return (
            <li
              key={step.title}
              className="lg:grid lg:grid-cols-12 lg:gap-8"
            >
              <div className="hidden lg:col-span-2 lg:block">
                <p className="font-heading text-foreground text-lg font-semibold tracking-[-0.02em]">
                  {step.phase}
                </p>
                <p className="text-muted-foreground mt-1 font-mono text-xs">
                  {step.timing}
                </p>
              </div>

              <m.div
                onViewportEnter={() => {
                  reachStep(index);
                }}
                viewport={{ once: true, margin: "0px 0px -25% 0px" }}
                className="relative pl-9 lg:col-span-10 lg:grid lg:grid-cols-10 lg:gap-8 lg:pl-11"
              >
                {isLast ? null : (
                  <span
                    aria-hidden="true"
                    className="bg-rule-strong absolute top-5 left-[5px] h-[calc(100%+3rem)] w-px overflow-hidden lg:h-[calc(100%+4rem)]"
                  >
                    <m.span
                      initial={false}
                      animate={{ scaleY: isLineLit ? 1 : 0 }}
                      transition={{
                        duration: isReducedMotion ? 0 : 0.6,
                        ease: EASE,
                      }}
                      className="bg-signal absolute inset-0 origin-top"
                    />
                  </span>
                )}

                <span
                  aria-hidden="true"
                  className="border-rule-strong bg-background absolute top-2 left-0 flex size-[11px] items-center justify-center rounded-full border"
                >
                  <m.span
                    initial={false}
                    animate={{
                      opacity: isLit ? 1 : 0,
                      scale: isLit ? 1 : 0.85,
                    }}
                    transition={{
                      duration: isReducedMotion ? 0 : 0.24,
                      ease: EASE,
                    }}
                    className="bg-signal absolute -inset-px rounded-full"
                  />
                </span>

                <div className="min-w-0 lg:col-span-4">
                  <p className="text-signal font-mono text-xs font-medium lg:hidden">
                    {step.phase} · {step.timing}
                  </p>
                  <h3 className="font-heading text-foreground mt-1 text-xl font-semibold tracking-[-0.02em] lg:mt-0 sm:text-2xl">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground mt-2.5 text-sm leading-6 text-pretty sm:text-[0.9375rem] sm:leading-7">
                    {step.body}
                  </p>
                </div>

                <div className="border-rule-strong bg-card mt-5 rounded-2xl border p-5 shadow-[var(--shadow-card)] sm:p-6 lg:col-span-6 lg:mt-0">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-foreground font-sans text-sm font-semibold">
                      {step.artifactTitle}
                    </p>
                    <span className="border-signal-border bg-signal-soft text-signal inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-xs font-medium forced-colors:border-[CanvasText]">
                      <Check
                        className="size-3.5"
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                      {step.artifactStatus}
                    </span>
                  </div>

                  <dl className="border-rule mt-4 grid gap-3 border-t pt-4 sm:grid-cols-3">
                    {step.items.map((item) => (
                      <div
                        key={item.label}
                        className="border-rule bg-record/45 rounded-xl border px-3.5 py-2.5"
                      >
                        <dt className="text-muted-foreground font-mono text-xs">
                          {item.label}
                        </dt>
                        <dd className="text-foreground mt-1 font-sans text-sm font-semibold">
                          {item.value}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <p className="text-muted-foreground mt-3.5 text-xs leading-5">
                    {step.footnote}
                  </p>
                </div>
              </m.div>
            </li>
          );
        })}
      </ol>
    </section>
  );
};

export default HowItWorks10;
