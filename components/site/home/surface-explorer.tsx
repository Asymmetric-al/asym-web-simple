"use client";

import {
  Tabs,
  TabsIndicator,
  TabsList,
  TabsPanel,
  TabsTab,
} from "@ui-sdk/react/tabs";
import { useEffect, useState, useSyncExternalStore } from "react";
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
const DESKTOP_MEDIA_QUERY = "(min-width: 1024px)";

const isSurfaceKey = (value: string | null): value is SurfaceKey =>
  value !== null && Object.hasOwn(SURFACE_KEYS, value);

const subscribeDesktopLayout = (onStoreChange: () => void) => {
  if (typeof window === "undefined") {
    return () => {
      // No media listener on server.
    };
  }
  const media = window.matchMedia(DESKTOP_MEDIA_QUERY);
  media.addEventListener("change", onStoreChange);
  return () => {
    media.removeEventListener("change", onStoreChange);
  };
};

const isDesktopViewport = (): boolean =>
  typeof window !== "undefined" &&
  window.matchMedia(DESKTOP_MEDIA_QUERY).matches;

const isDesktopViewportServer = (): boolean => true;

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
  readonly recordBoundary: string;
  readonly proofNote: string;
  readonly repoUrl: string;
  readonly repoLinkLabel: string;
  readonly heading: string;
  readonly whatTheyDo: string;
  readonly boundaryTitle: string;
  readonly boundaryDetail: string;
}

const SURFACES: readonly [SurfaceSpec, SurfaceSpec, SurfaceSpec] = [
  {
    key: "donor",
    index: "01",
    label: "Donor",
    shortOutcome: "Portal, receipts & statements",
    appPath: "apps/donor",
    recordBoundary: "Own account only; opt-in sharing",
    proofNote: "Settled-only annual statements and own-account receipt access",
    repoUrl: `${siteConfig.repoUrl}/blob/develop/packages/api/src/donor-portal/statements.ts`,
    repoLinkLabel: "statements.ts",
    heading: "Signed-in donors pull their own receipts and annual statements.",
    whatTheyDo:
      "In the authenticated donor portal, supporters review their own giving history, manage pledges, download individual receipts, and pull annual statements covering settled gifts.",
    boundaryTitle: "Own-account scope & opt-in sharing",
    boundaryDetail:
      "Each donor sees only their own account’s gifts and preferences. Supporters remain anonymous on a missionary’s roster unless they opt in to share their name, contact details, notes, and recurring-gift info.",
  },
  {
    key: "missionary",
    index: "02",
    label: "Missionary",
    shortOutcome: "Assigned roster, private by default",
    appPath: "apps/missionary",
    recordBoundary: "Private by default; totals withheld",
    proofNote:
      "Server API defaults to Anonymous partner and withholds total_given & last_gift_amount across rows",
    repoUrl: `${siteConfig.repoUrl}/blob/develop/packages/api/src/missionary-portal/donors.ts`,
    repoLinkLabel: "donors.ts",
    heading:
      "Field workers follow assigned support with donors private by default.",
    whatTheyDo:
      "Missionaries follow support progress for their assignment and correspond with opted-in supporters without waiting on exported office spreadsheets.",
    boundaryTitle: "Private by default; lifetime & last-gift amounts withheld",
    boundaryDetail:
      "Supporters who have not opted in appear as Anonymous partner with contact details, notes, and recurring gifts stripped. Even for opted-in supporters, lifetime totals and last-gift amounts stay withheld across every roster row.",
  },
  {
    key: "office",
    index: "03",
    label: "Office",
    shortOutcome: "CRM, ledger & batch previews",
    appPath: "apps/admin",
    recordBoundary: "One ledger; batch actions previewed",
    proofNote:
      "Supported bulk actions compute affected & skipped rows before staff confirm",
    repoUrl: `${siteConfig.repoUrl}/blob/develop/packages/api/src/admin/contribution-batches/preview.ts`,
    repoLinkLabel: "preview.ts",
    heading:
      "Staff manage donor and household records and preview bulk actions before running.",
    whatTheyDo:
      "Office staff work from the same contribution tables to manage donor and household records, designated funds, website pages, and email or PDF templates.",
    boundaryTitle: "Shared ledger with supported batch previews",
    boundaryDetail:
      "Supported bulk contribution actions compute affected and skipped records before staff confirm, while reading from one ledger reduces manual spreadsheet handoffs between desks.",
  },
];

// Single responsive tab row per role: compact 3-up horizontal ledger bar on <lg with stationary solid active fill + 3px bottom Pine rail outside the text area (zero mid-slide contrast collision); vertical hairline-ruled ledger rows on lg+.
const ROLE_TAB_BASE_CLASS =
  "group border-rule-interactive data-selected:border-foreground data-selected:bg-foreground data-selected:text-background lg:data-selected:border-rule-interactive lg:data-selected:bg-card lg:data-selected:text-foreground relative z-10 flex min-h-11 w-full min-w-0 items-center justify-center gap-1.5 border px-2.5 py-2 text-center lg:min-h-0 lg:items-start lg:justify-between lg:gap-3 lg:border-x-0 lg:border-t-0 lg:border-b lg:px-3.5 lg:py-3.5 lg:text-left lg:last:border-b-0 forced-colors:data-selected:border-[Highlight] forced-colors:data-selected:bg-[Highlight] forced-colors:data-selected:text-[HighlightText] forced-colors:data-selected:forced-color-adjust-none";

const ROLE_TAB_INTERACTIVE_CLASS =
  "focus-visible:ring-ring focus-visible:ring-offset-background cursor-pointer transition-[color,background-color,border-color,scale] duration-150 select-none active:scale-[0.98] lg:active:scale-100 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent forced-colors:focus-visible:outline-[CanvasText] lg:focus-visible:ring-inset lg:focus-visible:ring-offset-0 not-data-selected:[@media(hover:hover)_and_(pointer:fine)]:hover:bg-card/80";

const PANEL_STACK_CELL = "col-start-1 row-start-1 min-w-0";

const RoleTabBody = ({ spec }: { readonly spec: SurfaceSpec }): ReactNode => (
  <>
    <span className="flex min-w-0 items-center gap-1.5 lg:items-start lg:gap-3">
      <span
        aria-hidden="true"
        className="font-mono text-[0.6875rem] font-medium tabular-nums opacity-85 lg:border-rule-interactive lg:text-muted-foreground lg:group-data-selected:border-foreground lg:group-data-selected:bg-foreground lg:group-data-selected:text-background lg:mt-0.5 lg:inline-flex lg:size-6 lg:shrink-0 lg:items-center lg:justify-center lg:border lg:opacity-100 lg:transition-colors lg:duration-150"
      >
        {spec.index}
      </span>
      <span className="min-w-0">
        <span className="block font-sans text-xs font-semibold sm:text-sm">
          {spec.label}
        </span>
        <span className="text-muted-foreground mt-0.5 hidden text-xs leading-5 lg:block">
          {spec.shortOutcome}
        </span>
      </span>
    </span>
    <span
      translate="no"
      className="text-muted-foreground group-data-selected:text-pine mt-0.5 hidden shrink-0 font-mono text-xs transition-colors duration-150 group-data-selected:font-medium lg:inline"
    >
      {spec.appPath}
    </span>
  </>
);

const SharedRecordFoot = ({
  active,
}: {
  readonly active: SurfaceKey;
}): ReactNode => (
  <div className="border-rule-strong bg-card/65 mt-3.5 min-w-0 border-t px-3.5 py-2.5 lg:mt-3 lg:py-3">
    <div className="flex flex-wrap items-center justify-between gap-2">
      <div className="flex items-center gap-2 text-[0.8125rem]">
        <span
          aria-hidden="true"
          className="bg-pine size-1.5 shrink-0 rounded-full"
        />
        <span className="text-foreground font-sans font-semibold">
          One shared record
        </span>
      </div>
      <span className="text-pine grid text-left font-sans text-[0.8125rem] font-medium sm:text-right">
        {SURFACES.map((spec) => (
          <span
            key={spec.key}
            aria-hidden={spec.key !== active}
            className={cn(
              "col-start-1 row-start-1",
              spec.key !== active && "invisible"
            )}
          >
            {spec.recordBoundary}
          </span>
        ))}
      </span>
    </div>
    <div
      key={active}
      aria-hidden="true"
      className="ink-rule-draw bg-pine mt-2 h-[1.5px] w-full opacity-55"
    />
  </div>
);

const SurfaceLedgerSheet = ({
  spec,
  animated = false,
  id,
}: {
  readonly spec: SurfaceSpec;
  readonly animated?: boolean;
  readonly id?: string;
}): ReactNode => (
  <article
    id={id}
    className={cn(
      "bg-card border-rule-strong flex h-full min-w-0 scroll-mt-24 flex-col justify-between border p-5 sm:p-7",
      animated && "surface-enter"
    )}
  >
    <div>
      <div className="border-rule flex flex-wrap items-baseline justify-between gap-2 border-b pb-3 font-mono text-xs">
        <span className="text-pine font-medium">
          {spec.index} · {spec.label} workspace
        </span>
        <span translate="no" className="text-muted-foreground">
          {spec.appPath}
        </span>
      </div>

      <h3 className="font-heading text-foreground mt-4 text-2xl leading-snug font-medium tracking-[-0.02em] sm:text-[1.75rem]">
        {spec.heading}
      </h3>
      <p className="text-foreground/85 mt-2.5 text-sm leading-6 text-pretty sm:text-[0.96875rem] sm:leading-7">
        {spec.whatTheyDo}
      </p>

      <div className="border-rule mt-5 border-t pt-4">
        <p className="text-foreground font-sans text-xs font-semibold">
          {spec.boundaryTitle}
        </p>
        <p className="text-muted-foreground mt-1 text-xs leading-5 sm:text-sm sm:leading-6">
          {spec.boundaryDetail}
        </p>
      </div>
    </div>

    <div className="border-rule mt-5 flex flex-col gap-2 border-t pt-3.5 text-[0.8125rem] sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <p className="text-muted-foreground font-mono text-[0.8125rem] leading-5">
        {spec.proofNote}
      </p>
      <a
        href={spec.repoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-foreground focus-visible:ring-ring inline-flex min-h-11 shrink-0 items-center gap-1 rounded-xs font-mono font-medium underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent sm:min-h-8 [@media(hover:hover)_and_(pointer:fine)]:hover:text-pine"
      >
        {spec.repoLinkLabel}
        <span className="sr-only"> in Asymmetric-al/core (opens in a new tab)</span>
        <ArrowUpRightIcon className="size-3.5" />
      </a>
    </div>
  </article>
);

// Only the non-active specs act as invisible sizers so SSR HTML stays lean while preserving 0px height jump.
const InactivePanelSizers = ({
  active,
}: {
  readonly active: SurfaceKey;
}): ReactNode => (
  <>
    {SURFACES.map((spec) =>
      spec.key === active ? null : (
        <div
          key={spec.key}
          aria-hidden="true"
          inert
          className={cn(PANEL_STACK_CELL, "invisible")}
        >
          <SurfaceLedgerSheet spec={spec} />
        </div>
      )
    )}
  </>
);

/**
Hydrated scroll targets placed at the top of `<section id="product">` so
clicking `#surface-donor`, `#surface-missionary`, or `#surface-office` scrolls
the section heading cleanly below the fixed masthead on mobile and desktop.
Without JavaScript, the real per-role `<article id="surface-*">` cards own those IDs.
*/
export const SurfaceAnchors = (): ReactNode => {
  const isHydrated = useIsClient();
  if (!isHydrated) {
    return null;
  }
  return (
    <>
      {SURFACES.map((spec) => (
        <span
          key={spec.key}
          id={`surface-${spec.key}`}
          className="pointer-events-none absolute top-0 left-0 block h-0 scroll-mt-24"
        />
      ))}
    </>
  );
};

export const SurfaceExplorer = (): ReactNode => {
  const isHydrated = useIsClient();
  const isDesktop = useSyncExternalStore(
    subscribeDesktopLayout,
    isDesktopViewport,
    isDesktopViewportServer
  );
  const [activeSurface, setActiveSurface] = useState<SurfaceKey>(() =>
    typeof window === "undefined"
      ? DEFAULT_SURFACE
      : (readSurfaceFromHash() ?? DEFAULT_SURFACE)
  );
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const focusSurfaceTab = (key: SurfaceKey) => {
      window.requestAnimationFrame(() => {
        const targetTab = document.querySelector<HTMLButtonElement>(
          `[data-surface-tab="${CSS.escape(key)}"]`
        );
        targetTab?.focus({ preventScroll: true });
      });
    };
    const handleHashChange = () => {
      const next = readSurfaceFromHash();
      if (!next) {
        return;
      }
      setHasInteracted(true);
      setActiveSurface(next);
      focusSurfaceTab(next);
    };
    const handleSameHashClick = (event: MouseEvent) => {
      const target =
        event.target instanceof Element
          ? event.target.closest<HTMLAnchorElement>('a[href^="#surface-"]')
          : null;
      const href = target?.getAttribute("href");
      if (!href || href !== window.location.hash) {
        return;
      }
      const key = href.slice(SURFACE_HASH_PREFIX.length);
      if (!isSurfaceKey(key)) {
        return;
      }
      setHasInteracted(true);
      setActiveSurface(key);
      focusSurfaceTab(key);
    };
    window.addEventListener("hashchange", handleHashChange);
    document.addEventListener("click", handleSameHashClick);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      document.removeEventListener("click", handleSameHashClick);
    };
  }, []);

  const handleSurfaceChange = (nextValue: string | null) => {
    if (!isSurfaceKey(nextValue)) {
      return;
    }
    setHasInteracted(true);
    setActiveSurface(nextValue);
    if (readSurfaceFromHash() !== null) {
      window.history.replaceState(
        null,
        "",
        `${SURFACE_HASH_PREFIX}${nextValue}`
      );
    }
  };

  const gridClass =
    "mt-7 grid gap-4 lg:grid-cols-[minmax(0,39fr)_minmax(0,61fr)] lg:items-start lg:gap-8";
  const listClass =
    "relative mb-1.5 grid grid-cols-3 gap-2 lg:mb-0 lg:block lg:border-y lg:border-rule-strong lg:pl-2.5";

  return (
    <div className="relative">
      {isHydrated ? (
        <Tabs
          orientation={isDesktop ? "vertical" : "horizontal"}
          value={activeSurface}
          onValueChange={handleSurfaceChange}
          className={gridClass}
        >
          <div className="min-w-0">
            <TabsList
              aria-label="Choose a role to inspect its workspace"
              className={listClass}
            >
              <TabsIndicator className="horizontal-tabs-indicator lg:hidden" />
              <TabsIndicator className="vertical-tabs-indicator hidden lg:block" />
              {SURFACES.map((spec) => (
                <TabsTab
                  key={spec.key}
                  value={spec.key}
                  data-surface-tab={spec.key}
                  className={cn(ROLE_TAB_BASE_CLASS, ROLE_TAB_INTERACTIVE_CLASS)}
                >
                  <RoleTabBody spec={spec} />
                </TabsTab>
              ))}
            </TabsList>

            <SharedRecordFoot active={activeSurface} />
          </div>

          <div className="grid min-w-0">
            <InactivePanelSizers active={activeSurface} />
            {SURFACES.map((spec) => (
              <TabsPanel
                key={spec.key}
                value={spec.key}
                className={cn(
                  PANEL_STACK_CELL,
                  "focus-visible:ring-ring focus-visible:ring-offset-background grid focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent data-ending-style:hidden"
                )}
              >
                <SurfaceLedgerSheet spec={spec} animated={hasInteracted} />
              </TabsPanel>
            ))}
          </div>
        </Tabs>
      ) : (
        <div className={gridClass}>
          <div className="min-w-0">
            <ul className={listClass}>
              {SURFACES.map((spec) => {
                const isSelected = spec.key === DEFAULT_SURFACE;
                return (
                  <li
                    key={spec.key}
                    data-selected={isSelected ? "" : undefined}
                    className={ROLE_TAB_BASE_CLASS}
                  >
                    {isSelected ? (
                      <span
                        aria-hidden="true"
                        className="bg-foreground absolute top-0 bottom-0 -left-[0.625rem] hidden w-[3px] rounded-full lg:block"
                      />
                    ) : null}
                    <RoleTabBody spec={spec} />
                  </li>
                );
              })}
            </ul>

            <SharedRecordFoot active={DEFAULT_SURFACE} />
          </div>

          <div className="grid min-w-0">
            <div className={cn(PANEL_STACK_CELL, "grid")}>
              <SurfaceLedgerSheet spec={SURFACES[0]} id="surface-donor" />
            </div>
          </div>
        </div>
      )}

      {/* Distinct no-JS role cards with real per-role fragment anchors */}
      <noscript>
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <SurfaceLedgerSheet spec={SURFACES[1]} id="surface-missionary" />
          <SurfaceLedgerSheet spec={SURFACES[2]} id="surface-office" />
        </div>
      </noscript>
    </div>
  );
};
