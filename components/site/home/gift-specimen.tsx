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

type SpecimenRole = "donor" | "missionary" | "office";
type GiftAmount = 50 | 100 | 250;
type GiftCadence = "monthly" | "once";

const AMOUNTS: readonly GiftAmount[] = [50, 100, 250];
const ROLE_RECORD: Record<SpecimenRole, true> = {
  donor: true,
  missionary: true,
  office: true,
};

const formatCurrency = (amount: GiftAmount): string => `$${amount}.00`;
const formatCadence = (cadence: GiftCadence): string =>
  cadence === "monthly" ? "Monthly" : "One-time";
const formatCadenceSuffix = (cadence: GiftCadence): string =>
  cadence === "monthly" ? "/mo" : "once";

interface DocumentProps {
  readonly amount: GiftAmount;
  readonly cadence: GiftCadence;
  readonly isAnonymousToField: boolean;
}

const DonorDocument = ({
  amount,
  cadence,
  isAnonymousToField,
}: DocumentProps): ReactNode => (
  <article
    aria-label="Donor view: Official Gift Receipt"
    className="receipt-perforation border-rule-strong bg-card surface-enter relative flex min-h-[16.5rem] flex-col justify-between rounded-t-xl border border-b-0 px-5 pt-5 pb-6 shadow-[var(--shadow-card)] sm:px-6"
  >
    <div>
      <div className="border-rule flex flex-wrap items-start justify-between gap-3 border-b pb-4">
        <div>
          <p className="text-pine font-mono text-xs tracking-[0.04em] uppercase">
            Receipt #R-0418 · Settled
          </p>
          <h3 className="font-heading text-foreground mt-1 text-2xl leading-tight font-medium tracking-[-0.02em]">
            Official Gift Receipt
          </h3>
        </div>
        <div className="text-right">
          <p className="font-heading text-foreground text-3xl leading-none font-medium tabular-nums">
            {formatCurrency(amount)}
            <span className="text-muted-foreground ml-1 font-mono text-xs font-normal">
              {formatCadenceSuffix(cadence)}
            </span>
          </p>
        </div>
      </div>

      <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-muted-foreground font-mono text-xs">Donor</dt>
          <dd className="text-foreground mt-0.5 font-medium">
            Rivera Household
          </dd>
        </div>
        <div>
          <dt className="text-muted-foreground font-mono text-xs">
            Designation
          </dt>
          <dd className="text-foreground mt-0.5 font-medium">
            Water Project, Field Team East
          </dd>
        </div>
        <div>
          <dt className="text-muted-foreground font-mono text-xs">Cadence</dt>
          <dd className="text-foreground mt-0.5">
            {formatCadence(cadence)} · Stripe checkout
          </dd>
        </div>
        <div>
          <dt className="text-muted-foreground font-mono text-xs">
            Missionary visibility
          </dt>
          <dd className="text-foreground mt-0.5">
            {isAnonymousToField
              ? "Anonymous partner to missionary (receipt still issued)"
              : "Named on Field Team East roster"}
          </dd>
        </div>
      </dl>
    </div>

    <div className="border-rule bg-record/65 mt-5 flex flex-wrap items-center justify-between gap-2 rounded-lg border px-3 py-2 text-xs">
      <span className="text-foreground font-medium">
        Donor portal: history, pledges &amp; yearly statements
      </span>
      <span className="text-pine font-mono">apps/donor</span>
    </div>
  </article>
);

const MissionaryDocument = ({
  cadence,
  isAnonymousToField,
}: Omit<DocumentProps, "amount">): ReactNode => (
  <article
    aria-label="Missionary view: Supporter Roster"
    className="border-rule-strong bg-card surface-enter flex min-h-[16.5rem] flex-col justify-between rounded-xl border px-5 py-5 shadow-[var(--shadow-card)] sm:px-6"
  >
    <div>
      <div className="border-rule flex flex-wrap items-start justify-between gap-3 border-b pb-4">
        <div>
          <p className="text-pine font-mono text-xs tracking-[0.04em] uppercase">
            Supporter Roster · Field Team East
          </p>
          <h3 className="font-heading text-foreground mt-1 text-2xl leading-tight font-medium tracking-[-0.02em]">
            {isAnonymousToField ? "Anonymous partner" : "Rivera Household"}
          </h3>
        </div>
        <span className="border-pine-border bg-pine-soft text-pine inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-xs font-medium">
          {cadence === "monthly" ? "Active pledge" : "Recorded support"}
        </span>
      </div>

      <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-muted-foreground font-mono text-xs">
            Partner status
          </dt>
          <dd className="text-foreground mt-0.5 font-medium">
            {formatCadence(cadence)} partner · Oct 18, 2026
          </dd>
          {isAnonymousToField ? (
            <dd className="text-muted-foreground mt-0.5 text-xs">
              Individual gift amount &amp; ID hidden on roster
            </dd>
          ) : null}
        </div>
        <div>
          <dt className="text-muted-foreground font-mono text-xs">
            Contact &amp; updates
          </dt>
          <dd className="mt-0.5">
            {isAnonymousToField ? (
              <span className="border-draft-border bg-draft-soft text-draft inline-flex items-center rounded-md border border-dashed px-2 py-0.5 font-mono text-xs">
                Name, email, phone &amp; notes redacted
              </span>
            ) : (
              <span className="text-foreground font-medium">
                Email &amp; ministry updates enabled
              </span>
            )}
          </dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-muted-foreground font-mono text-xs">
            Server-enforced scope
          </dt>
          <dd className="text-muted-foreground mt-0.5 text-xs leading-5">
            Other field teams, org-wide financials, and unrelated donor
            households stay outside this account.
          </dd>
        </div>
      </dl>
    </div>

    <div className="border-rule bg-record/65 mt-5 flex flex-wrap items-center justify-between gap-2 rounded-lg border px-3 py-2 text-xs">
      <span className="text-foreground font-medium">
        {isAnonymousToField
          ? "Support progress updates; donor identity stays private"
          : "Partner roster stays current without office spreadsheets"}
      </span>
      <span className="text-pine font-mono">apps/missionary</span>
    </div>
  </article>
);

const OfficeDocument = ({
  amount,
  cadence,
  isAnonymousToField,
}: DocumentProps): ReactNode => (
  <article
    aria-label="Office view: Staff Contribution Ledger"
    className="border-rule-strong bg-card surface-enter flex min-h-[16.5rem] flex-col justify-between rounded-xl border px-5 py-5 shadow-[var(--shadow-card)] sm:px-6"
  >
    <div>
      <div className="border-rule flex flex-wrap items-start justify-between gap-3 border-b pb-4">
        <div>
          <p className="text-pine font-mono text-xs tracking-[0.04em] uppercase">
            Staff Workspace · Fund 310-EAST-WATER
          </p>
          <h3 className="font-heading text-foreground mt-1 text-2xl leading-tight font-medium tracking-[-0.02em]">
            Contribution Ledger Entry
          </h3>
        </div>
        <p className="font-heading text-foreground text-2xl leading-none font-medium tabular-nums">
          {formatCurrency(amount)}
          <span className="text-muted-foreground ml-1 font-mono text-xs font-normal">
            {formatCadenceSuffix(cadence)}
          </span>
        </p>
      </div>

      <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-muted-foreground font-mono text-xs">
            Legal donor record
          </dt>
          <dd className="text-foreground mt-0.5 font-medium">
            Rivera Household
            {isAnonymousToField ? (
              <span className="text-muted-foreground block text-xs font-normal">
                Marked anonymous to missionary
              </span>
            ) : null}
          </dd>
        </div>
        <div>
          <dt className="text-muted-foreground font-mono text-xs">
            Receipt record
          </dt>
          <dd className="text-foreground mt-0.5 font-medium">
            #R-0418 linked · tax year 2026
          </dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-muted-foreground font-mono text-xs">
            Staff record preview (in public code)
          </dt>
          <dd className="mt-1 flex flex-wrap gap-1.5 font-mono text-xs">
            <span className="border-pine-border bg-pine-soft text-pine rounded-md border px-2 py-0.5">
              +1 gift (GIFT-0418)
            </span>
            <span className="border-pine-border bg-pine-soft text-pine rounded-md border px-2 py-0.5">
              +1 receipt (#R-0418)
            </span>
            <span className="border-pine-border bg-pine-soft text-pine rounded-md border px-2 py-0.5">
              {cadence === "monthly" ? "+1 active pledge" : "One-time gift"}
            </span>
          </dd>
        </div>
      </dl>
    </div>

    <div className="border-rule bg-record/65 mt-5 flex flex-wrap items-center justify-between gap-2 rounded-lg border px-3 py-2 text-xs">
      <span className="text-foreground font-medium">
        CRM history, fund totals, and receipt records stay aligned
      </span>
      <span className="text-pine font-mono">apps/admin</span>
    </div>
  </article>
);

// Interactive Three-Hand Living Specimen (`Donor`, `Missionary`, `Office`) anchored to one sample gift across Asymmetric-al/core's three surfaces.
export const GiftSpecimen = (): ReactNode => {
  const isHydrated = useIsClient();
  const [role, setRole] = useState<SpecimenRole>("donor");
  const [amount, setAmount] = useState<GiftAmount>(100);
  const [cadence, setCadence] = useState<GiftCadence>("monthly");
  const [isAnonymousToField, setIsAnonymousToField] = useState(false);

  const handleRoleChange = (nextValue: string | null) => {
    if (nextValue !== null && Object.hasOwn(ROLE_RECORD, nextValue)) {
      setRole(nextValue as SpecimenRole);
    }
  };

  return (
    <div role="region" aria-labelledby="specimen-heading" className="relative">
      <h2 id="specimen-heading" className="sr-only">
        Illustrative sample gift across donor, missionary, and office views
      </h2>

      {/* Subtle archival registration marks */}
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

      <div className="surface-hero rounded-2xl p-4 sm:p-5">
        {/* Top disclosure & single-row status badge */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3">
          <p className="text-muted-foreground font-mono text-xs">
            Sample record · fictional · no payment
          </p>
          <span className="border-pine-border bg-pine-soft text-pine inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-xs font-medium">
            <span
              aria-hidden="true"
              className="bg-pine size-1.5 rounded-full"
            />
            In public code
          </span>
        </div>

        {/* Anchored gift control strip — exact SSR height reservation prevents desktop hydration CLS */}
        <div className="border-rule bg-card rounded-xl border px-3.5 py-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
              <span className="text-foreground font-medium">GIFT-0418</span>
              <span aria-hidden="true" className="text-rule-strong">
                ·
              </span>
              <span className="text-pine font-medium tabular-nums">
                {formatCurrency(amount)} {formatCadenceSuffix(cadence)}
              </span>
              <span aria-hidden="true" className="text-rule-strong">
                ·
              </span>
              <span className="text-muted-foreground">
                Water Project, Field Team East
              </span>
            </div>
          </div>

          {isHydrated ? (
            <div className="border-rule mt-3 flex flex-wrap items-center gap-2 border-t pt-3">
              {/* Amount segmented controls */}
              <div
                role="group"
                aria-label="Sample gift amount"
                className="border-rule bg-record/70 inline-flex items-center rounded-full border p-0.5"
              >
                {AMOUNTS.map((value) => {
                  const isActive = amount === value;
                  return (
                    <button
                      key={value}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => setAmount(value)}
                      className={cn(
                        "focus-visible:ring-ring inline-flex min-h-9 cursor-pointer items-center rounded-full px-2.5 font-mono text-xs font-medium tabular-nums transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-none sm:min-h-7",
                        isActive
                          ? "bg-foreground text-background"
                          : "text-foreground/82 hover:text-foreground"
                      )}
                    >
                      ${value}
                    </button>
                  );
                })}
              </div>

              {/* Cadence segmented controls (fixed labels + aria-pressed) */}
              <div
                role="group"
                aria-label="Sample gift cadence"
                className="border-rule bg-record/70 inline-flex items-center rounded-full border p-0.5"
              >
                {(
                  [
                    { key: "monthly", label: "Monthly" },
                    { key: "once", label: "One-time" },
                  ] as const
                ).map((option) => {
                  const isActive = cadence === option.key;
                  return (
                    <button
                      key={option.key}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => setCadence(option.key)}
                      className={cn(
                        "focus-visible:ring-ring inline-flex min-h-9 cursor-pointer items-center rounded-full px-2.5 text-xs font-medium transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-none sm:min-h-7",
                        isActive
                          ? "bg-foreground text-background"
                          : "text-foreground/82 hover:text-foreground"
                      )}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>

              {/* Privacy toggle: fixed accessible label with pine/ink state (never vermilion) */}
              <button
                type="button"
                aria-pressed={isAnonymousToField}
                onClick={() => setIsAnonymousToField((prev) => !prev)}
                className={cn(
                  "focus-visible:ring-ring inline-flex min-h-10 cursor-pointer items-center gap-1.5 rounded-full border px-3 text-xs font-medium transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-none sm:min-h-8",
                  isAnonymousToField
                    ? "border-pine-border bg-pine-soft text-pine"
                    : "border-input bg-background/80 text-foreground hover:bg-secondary"
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "size-1.5 rounded-full",
                    isAnonymousToField
                      ? "bg-pine"
                      : "border-muted-foreground border"
                  )}
                />
                <span>Anonymous to field</span>
              </button>
            </div>
          ) : (
            // Static zero-button SSR bar matching hydrated height for 0.0000 CLS and 0 inert no-JS controls.
            <div className="border-rule mt-3 flex flex-wrap items-center gap-2 border-t pt-3">
              <span className="border-rule bg-record/70 text-foreground inline-flex min-h-10 items-center rounded-full border px-3 font-mono text-xs sm:min-h-8">
                $100 · Monthly · Named partner
              </span>
            </div>
          )}
        </div>

        {/* Three-hand role switcher powered by @ui-sdk/react/tabs */}
        {isHydrated ? (
          <Tabs
            value={role}
            onValueChange={handleRoleChange}
            className="mt-3.5"
          >
            <TabsList
              aria-label="Inspect gift by role"
              className="border-input bg-record relative grid grid-cols-3 rounded-full border p-1"
            >
              <TabsIndicator className="specimen-tabs-indicator" />
              <TabsTab
                value="donor"
                className="text-foreground/80 hover:text-foreground data-selected:text-background data-selected:hover:text-background focus-visible:ring-ring focus-visible:ring-offset-record relative z-10 inline-flex min-h-11 cursor-pointer items-center justify-center rounded-full px-3 text-sm font-medium transition-colors duration-150 select-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none data-selected:font-semibold sm:min-h-9"
              >
                Donor
              </TabsTab>
              <TabsTab
                value="missionary"
                className="text-foreground/80 hover:text-foreground data-selected:text-background data-selected:hover:text-background focus-visible:ring-ring focus-visible:ring-offset-record relative z-10 inline-flex min-h-11 cursor-pointer items-center justify-center rounded-full px-3 text-sm font-medium transition-colors duration-150 select-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none data-selected:font-semibold sm:min-h-9"
              >
                Missionary
              </TabsTab>
              <TabsTab
                value="office"
                className="text-foreground/80 hover:text-foreground data-selected:text-background data-selected:hover:text-background focus-visible:ring-ring focus-visible:ring-offset-record relative z-10 inline-flex min-h-11 cursor-pointer items-center justify-center rounded-full px-3 text-sm font-medium transition-colors duration-150 select-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none data-selected:font-semibold sm:min-h-9"
              >
                Office
              </TabsTab>
            </TabsList>

            <div className="mt-3">
              <TabsPanel
                value="donor"
                className="focus-visible:ring-ring focus-visible:ring-offset-record rounded-xl focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                <DonorDocument
                  amount={amount}
                  cadence={cadence}
                  isAnonymousToField={isAnonymousToField}
                />
              </TabsPanel>
              <TabsPanel
                value="missionary"
                className="focus-visible:ring-ring focus-visible:ring-offset-record rounded-xl focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                <MissionaryDocument
                  cadence={cadence}
                  isAnonymousToField={isAnonymousToField}
                />
              </TabsPanel>
              <TabsPanel
                value="office"
                className="focus-visible:ring-ring focus-visible:ring-offset-record rounded-xl focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
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
          // Zero-button static role header matching hydrated TabsList height for 0.0000 CLS.
          <div className="mt-3.5">
            <div
              aria-hidden="true"
              className="border-input bg-record grid grid-cols-3 rounded-full border p-1"
            >
              <span className="bg-foreground text-background inline-flex min-h-11 items-center justify-center rounded-full px-3 text-sm font-semibold sm:min-h-9">
                Donor
              </span>
              <span className="text-foreground/80 inline-flex min-h-11 items-center justify-center rounded-full px-3 text-sm font-medium sm:min-h-9">
                Missionary
              </span>
              <span className="text-foreground/80 inline-flex min-h-11 items-center justify-center rounded-full px-3 text-sm font-medium sm:min-h-9">
                Office
              </span>
            </div>
            <div className="mt-3">
              <DonorDocument
                amount={100}
                cadence="monthly"
                isAnonymousToField={false}
              />
            </div>
          </div>
        )}

        {/* Complete no-JS static triptych fallback */}
        <noscript>
          <div className="mt-4 space-y-3">
            <MissionaryDocument
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

        {isHydrated ? (
          <p className="text-muted-foreground mt-3.5 px-0.5 text-xs leading-5">
            Switch between{" "}
            <strong className="text-foreground font-medium">Donor</strong>,{" "}
            <strong className="text-foreground font-medium">Missionary</strong>,
            and <strong className="text-foreground font-medium">Office</strong>{" "}
            to inspect what stays linked and what stays private.
          </p>
        ) : (
          <p className="text-muted-foreground mt-3.5 px-0.5 text-xs leading-5">
            One sample gift shown across donor, missionary, and office records.
          </p>
        )}
      </div>
    </div>
  );
};
