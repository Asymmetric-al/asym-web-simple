"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRightIcon, ArrowUpRightIcon } from "@/components/site/icons";
import { buttonVariants } from "@/components/ui/button-variants";
import { repoStats, siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface HostingPlan {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly headlinePrice: string;
  readonly priceNote: string;
  readonly limitLabel: string;
  readonly limitValue: string;
  readonly rows: readonly string[];
  readonly ctaLabel: string;
  readonly ctaHref: string;
  readonly ctaNote: string;
  readonly external: boolean;
  readonly primary: boolean;
}

const ROW_LABELS: readonly string[] = [
  "Source code & exit",
  "Gift processing markup",
  "Saved donor cards",
  "Hosting & onboarding",
];

const SELF_HOST_PLAN: HostingPlan = {
  id: "self-host",
  name: "Self-hosted Core",
  description:
    "Run Core on your own infrastructure with full auditability and zero software license fees.",
  headlinePrice: "$0",
  priceNote: `Software license (${repoStats.license})`,
  limitLabel: "Staff, missionaries & donors",
  limitValue: "Unlimited",
  rows: [
    "Full public GitHub repo",
    "0% from Asymmetric.al",
    "Your own Stripe account",
    "Managed by your team",
  ],
  ctaLabel: "Inspect Core on GitHub",
  ctaHref: `${siteConfig.repoUrl}#readme`,
  ctaNote: "Includes openspec/ and docs/adr/",
  external: true,
  primary: false,
};

const MANAGED_PLAN_BASE = {
  id: "managed",
  name: "Managed hosting",
  description:
    "Hosted and maintained by Asymmetric.al with guided parallel-close onboarding for lean teams.",
  headlinePrice: "Flat tiers",
  priceNote: "Published before launch",
  limitLabel: "Staff, missionaries & donors",
  limitValue: "Unlimited",
  rows: [
    "Same open-source Core",
    "0% from Asymmetric.al",
    "Your own Stripe account",
    "Backups, upgrades & parallel close",
  ],
  ctaNote: "No per-seat fees or percentage cuts on gifts",
  external: false,
  primary: true,
} as const;

const CONFIGURED_PLANS: readonly HostingPlan[] = [
  SELF_HOST_PLAN,
  {
    ...MANAGED_PLAN_BASE,
    ctaLabel: "Request early access",
    ctaHref: "/#early-access",
  },
];

const PREVIEW_PLANS: readonly HostingPlan[] = [
  SELF_HOST_PLAN,
  {
    ...MANAGED_PLAN_BASE,
    ctaLabel: "Pre-launch checklist",
    ctaHref: "/early-access/status?state=unavailable",
  },
];

export const Pricing17 = ({
  isConfigured,
}: {
  readonly isConfigured: boolean;
}): ReactNode => {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const plans = isConfigured ? CONFIGURED_PLANS : PREVIEW_PLANS;

  return (
    <section
      id="hosting"
      aria-labelledby="hosting-title"
      className="border-rule scroll-mt-24 border-t pt-14 pb-16 sm:pt-18 sm:pb-20"
    >
      <div className="max-w-[44rem]">
        <p className="text-signal font-sans text-sm font-medium">
          Stewardship &amp; hosting
        </p>
        <h2
          id="hosting-title"
          className="font-heading text-foreground mt-2 text-[clamp(1.85rem,3.4vw,2.75rem)] leading-[1.08] font-semibold tracking-[-0.03em]"
        >
          Self-host it, or let us host it.
        </h2>
        <p className="text-muted-foreground mt-3 max-w-[38rem] text-base leading-7 text-pretty">
          Both options run the exact same open-source software with unlimited
          staff, missionary, and donor accounts and your own Stripe connection.
          Pay for managed hosting only if you want Asymmetric.al running servers
          and onboarding with you.
        </p>
      </div>

      <div
        onPointerLeave={() => {
          setHoveredRow(null);
        }}
        className="border-rule-strong bg-card relative mt-8 grid overflow-hidden rounded-2xl border shadow-[var(--shadow-card)] lg:grid-cols-2"
      >
        <div
          aria-hidden="true"
          className="bg-rule absolute inset-y-0 left-1/2 hidden w-px lg:block"
        />

        {plans.map((plan, planIndex) => (
          <div
            key={plan.id}
            className={
              planIndex > 0
                ? "border-rule flex flex-col border-t p-6 sm:p-8 lg:border-t-0 lg:p-10"
                : "flex flex-col p-6 sm:p-8 lg:p-10"
            }
          >
            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-heading text-foreground text-xl font-semibold tracking-[-0.02em] sm:text-2xl">
                  {plan.name}
                </h3>
                <p className="font-heading text-foreground text-xl font-semibold tracking-[-0.02em] tabular-nums sm:text-2xl">
                  {plan.headlinePrice}
                </p>
              </div>
              <p className="text-muted-foreground mt-1 font-mono text-xs">
                {plan.priceNote}
              </p>
              <p className="text-muted-foreground mt-3 max-w-md text-sm leading-6 text-pretty">
                {plan.description}
              </p>
            </div>

            <dl className="mt-7">
              <div
                onPointerEnter={(event) => {
                  if (event.pointerType === "mouse") {
                    setHoveredRow(0);
                  }
                }}
                className={
                  hoveredRow === 0
                    ? "bg-record/55 -mx-6 px-6 pb-5 transition-colors duration-150 ease-out sm:-mx-8 sm:px-8 lg:-mx-10 lg:px-10"
                    : "-mx-6 px-6 pb-5 transition-colors duration-150 ease-out sm:-mx-8 sm:px-8 lg:-mx-10 lg:px-10"
                }
              >
                <dt className="text-muted-foreground pt-3 font-sans text-xs font-medium">
                  {plan.limitLabel}
                </dt>
                <dd className="font-heading text-foreground mt-1 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
                  {plan.limitValue}
                </dd>
              </div>

              {ROW_LABELS.map((label, rowIndex) => (
                <div
                  key={label}
                  onPointerEnter={(event) => {
                    if (event.pointerType === "mouse") {
                      setHoveredRow(rowIndex + 1);
                    }
                  }}
                  className={
                    hoveredRow === rowIndex + 1
                      ? "border-rule bg-record/55 -mx-6 flex min-h-13 items-center justify-between gap-4 border-t px-6 py-3 transition-colors duration-150 ease-out sm:-mx-8 sm:px-8 lg:-mx-10 lg:px-10"
                      : "border-rule -mx-6 flex min-h-13 items-center justify-between gap-4 border-t px-6 py-3 transition-colors duration-150 ease-out sm:-mx-8 sm:px-8 lg:-mx-10 lg:px-10"
                  }
                >
                  <dt className="text-muted-foreground text-sm">{label}</dt>
                  <dd className="text-foreground text-right text-sm font-medium">
                    {plan.rows[rowIndex]}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="border-rule -mx-6 mt-auto border-t px-6 pt-6 sm:-mx-8 sm:px-8 lg:-mx-10 lg:px-10">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
                {plan.external ? (
                  <a
                    href={plan.ctaHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      buttonVariants({ variant: "outline", size: "lg" }),
                      "px-5"
                    )}
                  >
                    {plan.ctaLabel}
                    <ArrowUpRightIcon dataIcon="inline-end" />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : (
                  <Link
                    href={plan.ctaHref}
                    prefetch={false}
                    className={cn(
                      buttonVariants({ variant: "default", size: "lg" }),
                      "px-5"
                    )}
                  >
                    {plan.ctaLabel}
                    <ArrowRightIcon dataIcon="inline-end" />
                  </Link>
                )}
                <p className="text-muted-foreground text-xs leading-5">
                  {plan.ctaNote}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-rule-strong bg-record/55 mt-4 flex flex-col gap-3 rounded-2xl border px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="text-muted-foreground text-sm leading-6">
          <span className="text-foreground font-semibold">
            Optional managed donor care:
          </span>{" "}
          extra hands for lean sending offices that want responsive help with
          routine receipts, card updates, and everyday supporter questions.
        </p>
        <Link
          href={
            isConfigured
              ? "/#early-access"
              : "/early-access/status?state=unavailable"
          }
          prefetch={false}
          className="text-foreground focus-visible:ring-ring focus-visible:ring-offset-background inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-full font-sans text-sm font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent sm:min-h-8 [@media(hover:hover)_and_(pointer:fine)]:hover:text-signal"
        >
          {isConfigured ? "Talk with our team" : "See pre-launch checklist"}
          <ArrowRightIcon className="size-4" strokeWidth={1.75} />
        </Link>
      </div>
    </section>
  );
};
