"use client";

import {
  Tabs,
  TabsIndicator,
  TabsList,
  TabsPanel,
  TabsTab,
} from "@ui-sdk/react/tabs";
import { useEffect, useState } from "react";
import { ArrowUpRightIcon } from "@/components/site/icons";
import { siteConfig } from "@/lib/config";
import { useIsClient } from "@/lib/use-is-client";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type SurfaceKey = "donor" | "missionary" | "office";

const SURFACE_KEYS: Record<SurfaceKey, true> = {
  donor: true,
  missionary: true,
  office: true,
};

const SURFACE_HASH_PREFIX = "#surface-";
const DEFAULT_SURFACE: SurfaceKey = "donor";

const isSurfaceKey = (value: string | null): value is SurfaceKey =>
  value !== null && Object.hasOwn(SURFACE_KEYS, value);

/**
The hero plate caption links to `#surface-donor`, `#surface-missionary`, and
`#surface-office`. Reading the hash lets each link open the role it names.
*/
const readSurfaceFromHash = (): SurfaceKey | null => {
  const { hash } = window.location;
  if (!hash.startsWith(SURFACE_HASH_PREFIX)) {
    return null;
  }
  const key = hash.slice(SURFACE_HASH_PREFIX.length);
  return isSurfaceKey(key) ? key : null;
};

interface SurfaceSpec {
  readonly key: SurfaceKey;
  readonly index: string;
  readonly label: string;
  readonly shortOutcome: string;
  readonly appPath: string;
  readonly repoUrl: string;
  readonly repoLinkLabel: string;
  readonly heading: string;
  readonly whatTheyDo: string;
  readonly boundaryTitle: string;
  readonly boundaryDetail: string;
  readonly included: readonly string[];
}

const SURFACES: readonly [SurfaceSpec, SurfaceSpec, SurfaceSpec] = [
  {
    key: "donor",
    index: "01",
    label: "Donor",
    shortOutcome: "Gives once, pulls own receipts",
    appPath: "apps/donor",
    repoUrl: `${siteConfig.repoUrl}/tree/develop/apps/donor`,
    repoLinkLabel: "Inspect apps/donor on GitHub",
    heading: "Donors give online and download their own tax receipts.",
    whatTheyDo:
      "Supporters give through your website using Stripe checkout, manage recurring pledges, and download tax receipts or yearly giving statements in their own portal without emailing the office.",
    boundaryTitle: "Personal giving scope & name visibility",
    boundaryDetail:
      "Each donor sees only their own gifts, statements, and preferences, including whether their name is shown on the missionary’s roster.",
    included: [
      "Website & giving pages",
      "Stripe checkout & designated funds",
      "Tax receipts & yearly statements",
      "Donor portal & pledge management",
    ],
  },
  {
    key: "missionary",
    index: "02",
    label: "Missionary",
    shortOutcome: "Assigned roster, server redaction",
    appPath: "apps/missionary",
    repoUrl: `${siteConfig.repoUrl}/blob/develop/packages/api/src/missionary-portal/donors.ts`,
    repoLinkLabel: "Inspect redaction code on GitHub",
    heading:
      "Field workers track assigned support while anonymous donors stay private.",
    whatTheyDo:
      "Missionaries follow support progress for their assignment, reach out to named supporters, and share ministry updates without waiting on exported office spreadsheets.",
    boundaryTitle: "Server-side roster anonymity redaction",
    boundaryDetail:
      "Unless a donor shares their name, the API substitutes Anonymous partner on the missionary roster and removes contact details, notes, and individual gift totals before data reaches the screen.",
    included: [
      "Assigned partner roster",
      "Server-enforced roster redaction",
      "Ministry updates & supporter feed",
      "Scoped away from org-wide accounts",
    ],
  },
  {
    key: "office",
    index: "03",
    label: "Office",
    shortOutcome: "Full ledger & action previews",
    appPath: "apps/admin",
    repoUrl: `${siteConfig.repoUrl}/tree/develop/apps/admin`,
    repoLinkLabel: "Inspect apps/admin on GitHub",
    heading: "Staff reconcile funds, receipts, and households from one ledger.",
    whatTheyDo:
      "Office staff manage funds, legal donor records, receipt trails, and email templates in one workspace. Key staff actions already preview which records will change before running.",
    boundaryTitle: "One shared record across every desk",
    boundaryDetail:
      "Because donor portals, missionary rosters, and office tools read from the same contribution record, staff stop reconciling disconnected CSV exports.",
    included: [
      "Legal donor & contribution CRM",
      "Fund tracking & receipt records",
      "Email templates & staff tools",
      "Pre-action record-change previews",
    ],
  },
];

const HELPER_TEXT = "Each role has its own workspace and server boundary.";

// The role rows are the tabs: one control owns selection, keyboard, and focus.
const ROLE_ROW_CLASS =
  "group border-rule bg-card/85 data-selected:border-pine data-selected:bg-pine-soft relative z-10 flex w-full min-w-0 flex-wrap items-center justify-between gap-x-3 gap-y-1.5 rounded-xl border px-3.5 py-3 text-left data-selected:shadow-xs forced-colors:data-selected:border-[Highlight]";

const ROLE_ROW_INTERACTIVE_CLASS =
  "hover:border-rule-strong hover:bg-card data-selected:hover:border-pine data-selected:hover:bg-pine-soft focus-visible:ring-ring focus-visible:ring-offset-card cursor-pointer transition-[color,background-color,border-color,scale] duration-180 ease-[var(--ease-out-expo)] select-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent active:scale-[0.99]";

const PANEL_STACK_CELL = "col-start-1 row-start-1 min-w-0";

const RoleRowBody = ({ spec }: { readonly spec: SurfaceSpec }): ReactNode => (
  <>
    <span className="min-w-0">
      <span className="flex items-center gap-2">
        <span
          aria-hidden="true"
          className="border-rule-strong group-data-selected:border-pine group-data-selected:bg-pine size-2 shrink-0 rounded-full border-[1.5px] transition-colors duration-180"
        />
        <span className="text-foreground font-sans text-sm font-semibold">
          {spec.label}
        </span>
      </span>
      <span className="text-muted-foreground mt-0.5 block pl-4 text-xs leading-5">
        {spec.shortOutcome}
      </span>
    </span>
    <span
      translate="no"
      className="border-rule bg-background text-muted-foreground group-data-selected:border-pine-border group-data-selected:bg-card group-data-selected:text-pine ml-4 shrink-0 rounded-full border px-2 py-0.5 font-mono text-xs transition-colors duration-180 group-data-selected:font-medium"
    >
      {spec.appPath}
    </span>
  </>
);

// Shared record foundation beneath the role tabs; both labels occupy one grid cell for zero height movement.
const SharedRecordFoot = ({
  active,
}: {
  readonly active: SurfaceKey;
}): ReactNode => {
  const isRosterFilter = active === "missionary";

  return (
    <div className="min-w-0 space-y-2 lg:col-start-1 lg:row-start-2 lg:pl-2.5">
      <div className="flex items-center justify-center gap-2">
        <span aria-hidden="true" className="bg-pine/55 h-4 w-px shrink-0" />
        <span
          className={cn(
            "grid rounded-full border px-2.5 py-0.5 text-center text-xs transition-colors duration-180",
            isRosterFilter
              ? "border-pine bg-pine text-background font-medium"
              : "border-rule bg-card text-muted-foreground"
          )}
        >
          <span
            aria-hidden={isRosterFilter}
            className={cn(
              "col-start-1 row-start-1",
              isRosterFilter && "invisible"
            )}
          >
            Role-scoped server permissions
          </span>
          <span
            aria-hidden={!isRosterFilter}
            className={cn(
              "col-start-1 row-start-1",
              !isRosterFilter && "invisible"
            )}
          >
            Roster redacted on the server
          </span>
        </span>
        <span aria-hidden="true" className="bg-pine/55 h-4 w-px shrink-0" />
      </div>

      <div className="border-rule-strong bg-card flex flex-wrap items-center justify-between gap-2 rounded-xl border px-3.5 py-3">
        <div className="min-w-0">
          <p className="text-foreground font-sans text-xs font-semibold">
            One shared record
          </p>
          <p className="text-muted-foreground text-xs leading-5">
            Donors, gifts, funds &amp; receipts in one schema
          </p>
        </div>
        <span
          translate="no"
          className="text-pine font-mono text-xs font-medium"
        >
          packages/api
        </span>
      </div>
    </div>
  );
};

const SurfaceDetailCard = ({
  spec,
  animated = false,
}: {
  readonly spec: SurfaceSpec;
  readonly animated?: boolean;
}): ReactNode => (
  <article
    className={cn(
      "border-rule-strong bg-card flex h-full min-w-0 flex-col justify-between rounded-xl border p-5 shadow-[var(--shadow-card)] sm:p-7",
      animated && "surface-enter"
    )}
  >
    <div>
      <div className="border-rule flex flex-wrap items-center justify-between gap-2 border-b pb-3.5 font-mono text-xs">
        <span className="text-pine font-medium">
          {spec.index} · {spec.label}
        </span>
        <span
          translate="no"
          className="border-pine-border bg-pine-soft text-pine rounded-full border px-2.5 py-0.5"
        >
          {spec.appPath}
        </span>
      </div>

      <h3 className="font-heading text-foreground mt-4 text-2xl leading-snug font-medium tracking-[-0.02em] sm:text-[1.75rem]">
        {spec.heading}
      </h3>
      <p className="text-muted-foreground mt-2.5 text-sm leading-6 text-pretty sm:text-[0.96875rem] sm:leading-7">
        {spec.whatTheyDo}
      </p>

      <div className="border-rule bg-background/75 mt-4 rounded-xl border p-4">
        <p className="text-foreground font-sans text-xs font-semibold">
          {spec.boundaryTitle}
        </p>
        <p className="text-muted-foreground mt-1 text-xs leading-5 sm:text-sm sm:leading-6">
          {spec.boundaryDetail}
        </p>
      </div>

      <ul className="mt-4 grid gap-2 text-xs sm:grid-cols-2 sm:text-sm">
        {spec.included.map((item) => (
          <li
            key={item}
            className="text-foreground flex items-center gap-2 font-medium"
          >
            <span
              aria-hidden="true"
              className="bg-pine size-1.5 shrink-0 rounded-full"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>

    <div className="border-rule mt-5 flex flex-wrap items-center justify-between gap-3 border-t pt-4 text-xs">
      <span className="text-muted-foreground">
        Source in{" "}
        <span translate="no" className="text-foreground font-mono">
          {spec.appPath}
        </span>
      </span>
      <a
        href={spec.repoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-foreground hover:text-pine focus-visible:ring-ring inline-flex items-center gap-1 rounded-xs font-medium underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent"
      >
        {spec.repoLinkLabel}
        <span className="sr-only"> (opens in a new tab)</span>
        <ArrowUpRightIcon className="size-3.5" />
      </a>
    </div>
  </article>
);

// Invisible copies of every card share the panel's grid cell so switching roles never moves the page at any width.
const PanelSizers = (): ReactNode => (
  <>
    {SURFACES.map((spec) => (
      <div
        key={spec.key}
        aria-hidden="true"
        inert
        className={cn(PANEL_STACK_CELL, "invisible")}
      >
        <SurfaceDetailCard spec={spec} />
      </div>
    ))}
  </>
);

export const SurfaceExplorer = (): ReactNode => {
  const isHydrated = useIsClient();
  const [activeSurface, setActiveSurface] = useState<SurfaceKey>(() =>
    typeof window === "undefined"
      ? DEFAULT_SURFACE
      : (readSurfaceFromHash() ?? DEFAULT_SURFACE)
  );

  useEffect(() => {
    const handleHashChange = () => {
      const next = readSurfaceFromHash();
      if (next) {
        setActiveSurface(next);
      }
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const handleSurfaceChange = (nextValue: string | null) => {
    if (!isSurfaceKey(nextValue)) {
      return;
    }
    setActiveSurface(nextValue);
    if (readSurfaceFromHash() !== null) {
      window.history.replaceState(
        null,
        "",
        `${SURFACE_HASH_PREFIX}${nextValue}`
      );
    }
  };

  const header = (
    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-xs">
      <p className="text-muted-foreground leading-5">{HELPER_TEXT}</p>
      <span className="border-pine-border bg-pine-soft text-pine inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-medium">
        <span aria-hidden="true" className="bg-pine size-1.5 rounded-full" />
        In public code
      </span>
    </div>
  );

  const gridClass =
    "mt-4 grid gap-4 lg:grid-cols-[minmax(0,42fr)_minmax(0,58fr)] lg:grid-rows-[auto_1fr] lg:gap-x-5";
  const listClass =
    "relative grid min-w-0 gap-2.5 pl-2.5 lg:col-start-1 lg:row-start-1";
  const stackClass =
    "grid min-w-0 lg:col-start-2 lg:row-span-2 lg:row-start-1";

  return (
    <div className="surface-folio relative mt-8 rounded-2xl p-4 sm:p-6">
      {/* Scroll targets for the hero plate's role links. */}
      {SURFACES.map((spec) => (
        <span
          key={spec.key}
          id={`surface-${spec.key}`}
          className="block h-0 scroll-mt-24"
        />
      ))}

      {header}

      {isHydrated ? (
        <Tabs
          orientation="vertical"
          value={activeSurface}
          onValueChange={handleSurfaceChange}
          className={gridClass}
        >
          <TabsList
            aria-label="Choose a role to see what it handles"
            className={listClass}
          >
            <TabsIndicator className="vertical-tabs-indicator" />
            {SURFACES.map((spec) => (
              <TabsTab
                key={spec.key}
                value={spec.key}
                className={cn(ROLE_ROW_CLASS, ROLE_ROW_INTERACTIVE_CLASS)}
              >
                <RoleRowBody spec={spec} />
              </TabsTab>
            ))}
          </TabsList>

          <div className={stackClass}>
            <PanelSizers />
            {SURFACES.map((spec) => (
              <TabsPanel
                key={spec.key}
                value={spec.key}
                className={cn(
                  PANEL_STACK_CELL,
                  "focus-visible:ring-ring focus-visible:ring-offset-card grid rounded-xl focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent data-ending-style:hidden"
                )}
              >
                <SurfaceDetailCard spec={spec} animated />
              </TabsPanel>
            ))}
          </div>

          <SharedRecordFoot active={activeSurface} />
        </Tabs>
      ) : (
        // Same geometry as the hydrated explorer, with no buttons, so nothing is inert without JavaScript and nothing shifts on hydration.
        <div className={gridClass}>
          <ul className={listClass}>
            {SURFACES.map((spec) => {
              const isSelected = spec.key === DEFAULT_SURFACE;
              return (
                <li
                  key={spec.key}
                  data-selected={isSelected ? "" : undefined}
                  className={ROLE_ROW_CLASS}
                >
                  {isSelected ? (
                    <span
                      aria-hidden="true"
                      className="bg-foreground absolute -top-px -bottom-px -left-[calc(0.625rem+1px)] w-[3px] rounded-full"
                    />
                  ) : null}
                  <RoleRowBody spec={spec} />
                </li>
              );
            })}
          </ul>

          <div className={stackClass}>
            <PanelSizers />
            <div className={cn(PANEL_STACK_CELL, "grid")}>
              <SurfaceDetailCard spec={SURFACES[0]} />
            </div>
          </div>

          <SharedRecordFoot active={DEFAULT_SURFACE} />
        </div>
      )}

      {/* Complete static fallback for no-JS visitors */}
      <noscript>
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <SurfaceDetailCard spec={SURFACES[1]} />
          <SurfaceDetailCard spec={SURFACES[2]} />
        </div>
      </noscript>
    </div>
  );
};
