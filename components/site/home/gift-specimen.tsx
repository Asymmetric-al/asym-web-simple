"use client";

import {
  Tabs,
  TabsIndicator,
  TabsList,
  TabsPanel,
  TabsTab,
} from "@ui-sdk/react/tabs";
import { useState, useSyncExternalStore } from "react";
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

type GiftAmount = 50 | 100 | 250;
type GiftCadence = "monthly" | "one-time";
type SpecimenRole = "donor" | "missionary" | "office";

const AMOUNTS: readonly GiftAmount[] = [50, 100, 250];

const ROLE_TABS: readonly {
  readonly value: SpecimenRole;
  readonly label: string;
  readonly surface: string;
}[] = [
  { value: "donor", label: "Donor", surface: "apps/donor" },
  { value: "missionary", label: "Missionary", surface: "apps/missionary" },
  { value: "office", label: "Office", surface: "apps/admin" },
];

const formatCurrency = (amount: GiftAmount): string => `$${amount}.00`;

const formatCadence = (cadence: GiftCadence): string =>
  cadence === "monthly" ? "Monthly" : "One-time";

const formatFrequencyLabel = (cadence: GiftCadence): string =>
  cadence === "monthly" ? "/mo" : "once";

const DonorDocument = ({
  amount,
  cadence,
  isAnonymousToField,
}: {
  readonly amount: GiftAmount;
  readonly cadence: GiftCadence;
  readonly isAnonymousToField: boolean;
}) => (
  <div className="receipt-perforation bg-card border-rule-strong relative rounded-t-xl border border-b-0 px-5 pt-5 pb-6 sm:px-6">
    <div className="border-rule flex flex-wrap items-baseline justify-between gap-2 border-b pb-3.5">
      <div>
        <p className="text-pine font-mono text-xs font-medium tracking-[0.02em]">
          Receipt #R-0418 · Settled
        </p>
        <h3 className="font-heading text-foreground mt-1 text-2xl font-medium tracking-[-0.02em]">
          Official Gift Receipt
        </h3>
      </div>
      <p className="font-heading text-foreground text-3xl font-medium tracking-[-0.03em] tabular-nums">
        {formatCurrency(amount)}
        <span className="text-muted-foreground ml-1 font-sans text-xs font-normal">
          {formatFrequencyLabel(cadence)}
        </span>
      </p>
    </div>

    <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
      <div>
        <dt className="text-muted-foreground text-xs">Donor</dt>
        <dd className="text-foreground mt-0.5 font-medium">Rivera Household</dd>
      </div>
      <div>
        <dt className="text-muted-foreground text-xs">Designation</dt>
        <dd className="text-foreground mt-0.5 font-medium">
          Water Project, Field Team East
        </dd>
      </div>
      <div>
        <dt className="text-muted-foreground text-xs">Cadence</dt>
        <dd className="text-foreground mt-0.5">
          {formatCadence(cadence)} · Stripe checkout
        </dd>
      </div>
      <div>
        <dt className="text-muted-foreground text-xs">Missionary visibility</dt>
        <dd className="text-foreground mt-0.5">
          {isAnonymousToField
            ? "Hidden from field worker (receipt still issued)"
            : "Shared with Field Team East"}
        </dd>
      </div>
    </dl>

    <div className="border-rule bg-record/65 mt-4 flex flex-wrap items-center justify-between gap-2 rounded-lg border px-3.5 py-2.5 text-xs">
      <span className="text-foreground font-medium">
        Donor portal synced · history, pledges &amp; annual statements
      </span>
      <span className="text-pine font-mono">apps/donor</span>
    </div>
  </div>
);

const MissionaryDocument = ({
  amount,
  cadence,
  isAnonymousToField,
}: {
  readonly amount: GiftAmount;
  readonly cadence: GiftCadence;
  readonly isAnonymousToField: boolean;
}) => (
  <div className="bg-card border-rule-strong rounded-xl border px-5 py-5 sm:px-6">
    <div className="border-rule flex flex-wrap items-baseline justify-between gap-2 border-b pb-3.5">
      <div>
        <p className="text-pine font-mono text-xs font-medium tracking-[0.02em]">
          Supporter Roster · Field Team East
        </p>
        <h3 className="font-heading text-foreground mt-1 text-2xl font-medium tracking-[-0.02em]">
          {isAnonymousToField ? "Anonymous Supporter" : "Rivera Household"}
        </h3>
      </div>
      <span className="border-pine-border bg-pine-soft text-pine rounded-full border px-2.5 py-0.5 font-mono text-xs font-medium">
        {cadence === "monthly" ? "Active pledge" : "Single gift"}
      </span>
    </div>

    <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
      <div>
        <dt className="text-muted-foreground text-xs">Latest gift</dt>
        <dd className="text-foreground mt-0.5 font-medium tabular-nums">
          {formatCurrency(amount)} ({formatCadence(cadence).toLowerCase()}) ·
          GIFT-0418
        </dd>
      </div>
      <div>
        <dt className="text-muted-foreground text-xs">Contact access</dt>
        <dd className="mt-0.5">
          {isAnonymousToField ? (
            <span className="border-draft-border bg-draft-soft text-draft inline-flex rounded border border-dashed px-2 py-0.5 text-xs">
              Name &amp; address hidden from missionary
            </span>
          ) : (
            <span className="text-foreground">
              Preferred: email · thank-you ready
            </span>
          )}
        </dd>
      </div>
      <div className="sm:col-span-2">
        <dt className="text-muted-foreground text-xs">
          Permission boundary (not shown here)
        </dt>
        <dd className="text-muted-foreground mt-0.5">
          Other field teams, organization-wide financials, and unrelated donor
          households stay hidden from this account.
        </dd>
      </div>
    </dl>

    <div className="border-rule bg-record/65 mt-4 flex flex-wrap items-center justify-between gap-2 rounded-lg border px-3.5 py-2.5 text-xs">
      <span className="text-foreground font-medium">
        {isAnonymousToField
          ? "Gift total updated in support progress without exposing donor identity"
          : "Prompted to log a thank-you note or share a ministry update"}
      </span>
      <span className="text-pine font-mono">apps/missionary</span>
    </div>
  </div>
);

const OfficeDocument = ({
  amount,
  cadence,
  isAnonymousToField,
}: {
  readonly amount: GiftAmount;
  readonly cadence: GiftCadence;
  readonly isAnonymousToField: boolean;
}) => (
  <div className="bg-card border-rule-strong rounded-xl border px-5 py-5 sm:px-6">
    <div className="border-rule flex flex-wrap items-baseline justify-between gap-2 border-b pb-3.5">
      <div>
        <p className="text-pine font-mono text-xs font-medium tracking-[0.02em]">
          Mission Control · Fund 310-EAST-WATER
        </p>
        <h3 className="font-heading text-foreground mt-1 text-2xl font-medium tracking-[-0.02em]">
          Contribution Ledger Entry
        </h3>
      </div>
      <span className="text-foreground font-mono text-sm font-medium tabular-nums">
        {formatCurrency(amount)} {formatFrequencyLabel(cadence)}
      </span>
    </div>

    <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
      <div>
        <dt className="text-muted-foreground text-xs">Legal donor record</dt>
        <dd className="text-foreground mt-0.5 font-medium">
          Rivera Household
          {isAnonymousToField ? (
            <span className="text-muted-foreground block text-xs font-normal">
              Marked anonymous to field worker
            </span>
          ) : null}
        </dd>
      </div>
      <div>
        <dt className="text-muted-foreground text-xs">Automated receipt</dt>
        <dd className="text-foreground mt-0.5">
          #R-0418 linked · tax year 2026
        </dd>
      </div>
      <div className="sm:col-span-2">
        <dt className="text-muted-foreground text-xs">
          Staff record preview (in public code)
        </dt>
        <dd className="mt-1 flex flex-wrap gap-2 font-mono text-xs">
          <span className="border-pine-border bg-pine-soft text-pine rounded border px-2 py-0.5">
            +1 gift (GIFT-0418)
          </span>
          <span className="border-pine-border bg-pine-soft text-pine rounded border px-2 py-0.5">
            +1 receipt (#R-0418)
          </span>
          <span className="border-pine-border bg-pine-soft text-pine rounded border px-2 py-0.5">
            {cadence === "monthly" ? "+1 active pledge" : "1x fund credit"}
          </span>
        </dd>
      </div>
    </dl>

    <div className="border-rule bg-record/65 mt-4 flex flex-wrap items-center justify-between gap-2 rounded-lg border px-3.5 py-2.5 text-xs">
      <span className="text-foreground font-medium">
        CRM history, fund totals, and receipt trail stay in sync
      </span>
      <span className="text-pine font-mono">apps/admin</span>
    </div>
  </div>
);

/**
Interactive Three-Hand Living Specimen (`Donor`, `Missionary`, `Office`)
showing one anchored sample gift across Asymmetric-al/core's three real apps.
*/
export const GiftSpecimen = (): ReactNode => {
  const isHydrated = useIsClient();
  const [role, setRole] = useState<SpecimenRole>("donor");
  const [amount, setAmount] = useState<GiftAmount>(100);
  const [cadence, setCadence] = useState<GiftCadence>("monthly");
  const [isAnonymousToField, setIsAnonymousToField] = useState(false);

  const handleRoleChange = (nextValue: string | null) => {
    const validRoles: readonly SpecimenRole[] = [
      "donor",
      "missionary",
      "office",
    ];
    if (nextValue !== null && validRoles.includes(nextValue as SpecimenRole)) {
      setRole(nextValue as SpecimenRole);
    }
  };

  return (
    <div role="region" aria-labelledby="specimen-heading" className="relative">
      <h2 id="specimen-heading" className="sr-only">
        Illustrative sample gift across donor, missionary, and office views
      </h2>
      {/* Subtle archival registration corners */}
      <span
        aria-hidden="true"
        className="text-rule-strong pointer-events-none absolute -top-3 -left-2 hidden font-mono text-xs select-none sm:block"
      >
        +
      </span>
      <span
        aria-hidden="true"
        className="text-rule-strong pointer-events-none absolute -top-3 -right-2 hidden font-mono text-xs select-none sm:block"
      >
        +
      </span>

      <div className="border-rule-strong bg-record/75 rounded-2xl border p-3.5 shadow-[var(--shadow-card)] sm:p-4">
        {/* Specimen honesty bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-1 pb-3">
          <p className="text-muted-foreground font-mono text-xs">
            Illustrative specimen · fictional record · no payment taken
          </p>
          <span className="border-pine-border bg-pine-soft text-pine inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-xs font-medium">
            <span
              aria-hidden="true"
              className="bg-pine size-1.5 rounded-full"
            />
            In public code
          </span>
        </div>

        {/* Fixed-position Gift ID Anchor — stays locked while role view switches */}
        <div className="border-rule-strong bg-card rounded-xl border px-4 py-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
              <span className="text-foreground font-mono text-sm font-medium tracking-[0.02em] tabular-nums">
                GIFT-0418
              </span>
              <span aria-hidden="true" className="text-rule-strong">
                ·
              </span>
              <span className="text-pine font-mono text-sm font-medium tabular-nums">
                {formatCurrency(amount)} {formatFrequencyLabel(cadence)}
              </span>
              <span
                aria-hidden="true"
                className="text-rule-strong hidden sm:inline"
              >
                ·
              </span>
              <span className="text-muted-foreground text-xs sm:text-[0.8125rem]">
                Water Project, Field Team East
              </span>
            </div>
          </div>

          {/* Sample controls (upgraded on hydration so no-JS never sees inert buttons) */}
          {isHydrated ? (
            <div className="border-rule mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 border-t pt-2.5">
              <div
                role="group"
                aria-label="Sample gift amount"
                className="inline-flex items-center gap-1"
              >
                {AMOUNTS.map((value) => (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={amount === value}
                    onClick={() => setAmount(value)}
                    className={cn(
                      "focus-visible:ring-ring min-h-11 cursor-pointer rounded-full border px-3 font-mono text-xs font-medium tabular-nums focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-2 focus-visible:outline-transparent sm:min-h-8 sm:px-2.5",
                      amount === value
                        ? "border-foreground bg-foreground text-background"
                        : "border-rule-strong bg-background text-foreground hover:bg-secondary"
                    )}
                  >
                    ${value}
                  </button>
                ))}
              </div>

              <button
                type="button"
                aria-pressed={cadence === "one-time"}
                onClick={() =>
                  setCadence((prev) =>
                    prev === "monthly" ? "one-time" : "monthly"
                  )
                }
                className="border-rule-strong bg-background text-foreground hover:bg-secondary focus-visible:ring-ring min-h-11 cursor-pointer rounded-full border px-3 text-xs font-medium focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-2 focus-visible:outline-transparent sm:min-h-8 sm:px-2.5"
              >
                {cadence === "monthly"
                  ? "Switch to one-time"
                  : "Switch to monthly"}
              </button>

              <button
                type="button"
                aria-pressed={isAnonymousToField}
                onClick={() => setIsAnonymousToField((prev) => !prev)}
                className={cn(
                  "focus-visible:ring-ring min-h-11 cursor-pointer rounded-full border px-3 text-xs font-medium focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-2 focus-visible:outline-transparent sm:min-h-8 sm:px-2.5",
                  isAnonymousToField
                    ? "border-vermilion bg-vermilion-soft text-vermilion"
                    : "border-rule-strong bg-background text-foreground hover:bg-secondary"
                )}
              >
                {isAnonymousToField
                  ? "Anonymous to field: On"
                  : "Test anonymous gift"}
              </button>
            </div>
          ) : null}
        </div>

        {/* Interactive @ui-sdk/react/tabs role switcher (Donor / Missionary / Office) */}
        {isHydrated ? (
          <Tabs value={role} onValueChange={handleRoleChange} className="mt-3">
            <TabsList
              aria-label="Inspect GIFT-0418 by role"
              className="border-rule bg-background/80 relative grid grid-cols-3 rounded-full border p-1"
            >
              <TabsIndicator className="specimen-tabs-indicator" />
              {ROLE_TABS.map((tab) => (
                <TabsTab
                  key={tab.value}
                  value={tab.value}
                  className="text-muted-foreground data-selected:text-foreground focus-visible:ring-ring relative z-10 inline-flex min-h-11 cursor-pointer items-center justify-center gap-1.5 rounded-full px-2 text-xs font-medium select-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-2 focus-visible:outline-transparent sm:min-h-9 sm:text-sm"
                >
                  <span>{tab.label}</span>
                </TabsTab>
              ))}
            </TabsList>

            <div className="mt-3">
              <TabsPanel value="donor" className="outline-none">
                <DonorDocument
                  amount={amount}
                  cadence={cadence}
                  isAnonymousToField={isAnonymousToField}
                />
              </TabsPanel>
              <TabsPanel value="missionary" className="outline-none">
                <MissionaryDocument
                  amount={amount}
                  cadence={cadence}
                  isAnonymousToField={isAnonymousToField}
                />
              </TabsPanel>
              <TabsPanel value="office" className="outline-none">
                <OfficeDocument
                  amount={amount}
                  cadence={cadence}
                  isAnonymousToField={isAnonymousToField}
                />
              </TabsPanel>
            </div>

            <p className="sr-only" role="status" aria-live="polite">
              {`Showing ${role} view for sample gift GIFT-0418, ${formatCurrency(amount)} ${formatCadence(cadence).toLowerCase()}${isAnonymousToField ? ", anonymous to missionary" : ""}.`}
            </p>
          </Tabs>
        ) : (
          // SSR default view: Donor receipt rendered immediately at 0ms for zero CLS.
          <div className="mt-3">
            <DonorDocument
              amount={100}
              cadence="monthly"
              isAnonymousToField={false}
            />
          </div>
        )}

        {/* No-JS complete three-view triptych fallback */}
        <noscript>
          <div className="mt-4 space-y-3">
            <MissionaryDocument
              amount={100}
              cadence="monthly"
              isAnonymousToField={false}
            />
            <OfficeDocument
              amount={100}
              cadence="monthly"
              isAnonymousToField={false}
            />
          </div>
        </noscript>

        {/* Quiet scholarly marginalia */}
        <p className="text-muted-foreground mt-4 px-1 text-xs leading-5">
          Same gift ID, three role-specific views. Switch between{" "}
          <span className="text-foreground font-medium">Donor</span>,{" "}
          <span className="text-foreground font-medium">Missionary</span>, and{" "}
          <span className="text-foreground font-medium">Office</span> (or toggle{" "}
          <span className="text-foreground font-medium">anonymous gift</span>)
          to see what stays connected and what stays private.
        </p>
      </div>
    </div>
  );
};
