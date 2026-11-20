"use client";

import {
  Tabs,
  TabsIndicator,
  TabsList,
  TabsPanel,
  TabsTab,
} from "@ui-sdk/react/tabs";
import { useState } from "react";
import { ArrowUpRightIcon } from "@/components/site/icons";
import { siteConfig } from "@/lib/config";
import { useIsClient } from "@/lib/use-is-client";
import type { ReactNode } from "react";

const VAR_PINE = "var(--pine)";
const VAR_PINE_SOFT = "var(--pine-soft)";
const VAR_BACKGROUND = "var(--background)";
const VAR_RULE = "var(--rule)";
const VAR_RULE_STRONG = "var(--rule-strong)";

type SurfaceKey = "donor" | "missionary" | "office";

const SURFACE_KEYS: Record<SurfaceKey, true> = {
  donor: true,
  missionary: true,
  office: true,
};

interface SurfaceSpec {
  readonly key: SurfaceKey;
  readonly index: string;
  readonly label: string;
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
    appPath: "apps/donor",
    repoUrl: `${siteConfig.repoUrl}/tree/develop/apps/donor`,
    repoLinkLabel: "Inspect apps/donor on GitHub",
    heading: "Giving pages, receipts, and self-service history.",
    whatTheyDo:
      "Donors give through your website using Stripe checkout, manage recurring pledges, and download tax receipts or yearly statements in the donor portal without emailing the office.",
    boundaryTitle: "Personal scope & anonymity choice",
    boundaryDetail:
      "Each donor sees only their own gifts, receipts, and giving preferences, including whether their identity stays private from the field worker.",
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
    appPath: "apps/missionary",
    repoUrl: `${siteConfig.repoUrl}/tree/develop/packages/api/src/missionary-portal/donors.ts`,
    repoLinkLabel: "Inspect redaction code on GitHub",
    heading: "Assigned supporter progress, with server-enforced privacy.",
    whatTheyDo:
      "Field workers stay current on support progress for their assignment, reach out to named partners, and post ministry updates without waiting on exported office spreadsheets.",
    boundaryTitle: "Server-side anonymity redaction",
    boundaryDetail:
      "When a donor chooses anonymity, the server redacts their name to Anonymous partner and strips contact details, notes, and individual gift amounts before data reaches the screen.",
    included: [
      "Assigned partner roster",
      "Server-enforced donor redaction",
      "Ministry updates & supporter feed",
      "Scoped away from org-wide accounts",
    ],
  },
  {
    key: "office",
    index: "03",
    label: "Office",
    appPath: "apps/admin",
    repoUrl: `${siteConfig.repoUrl}/tree/develop/apps/admin`,
    repoLinkLabel: "Inspect apps/admin on GitHub",
    heading: "Full stewardship record, templates, and action previews.",
    whatTheyDo:
      "Staff manage funds, legal donor records, receipt trails, and email templates in one place. Key staff actions already preview which records will change before running.",
    boundaryTitle: "One shared schema across every desk",
    boundaryDetail:
      "Because giving pages, donor portals, and missionary rosters read from the same underlying record, staff stop reconciling disconnected CSV exports.",
    included: [
      "Legal donor & contribution CRM",
      "Fund tracking & receipt records",
      "Email templates & staff tools",
      "Pre-action record-change previews",
    ],
  },
];

// Abstract geometric diagram derived strictly from the asym mark's three-pane architecture (zero fake product UI or fictional records).
const AsymmetricArchitectureDiagram = ({
  active,
}: {
  readonly active: SurfaceKey;
}): ReactNode => (
  <div className="border-rule bg-record/55 flex flex-col justify-between rounded-xl border p-5 sm:p-6">
    <div className="flex items-center justify-between gap-2 font-mono text-xs">
      <span className="text-foreground font-medium">Asymmetric-al/core</span>
      <span className="border-pine-border bg-pine-soft text-pine inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-medium">
        <span aria-hidden="true" className="bg-pine size-1.5 rounded-full" />
        In public code
      </span>
    </div>

    <div className="my-5">
      <svg
        viewBox="0 0 360 220"
        fill="none"
        aria-hidden="true"
        className="h-auto w-full"
      >
        {/* Outer asym datum frame */}
        <rect
          x="10"
          y="10"
          width="340"
          height="200"
          rx="26"
          stroke="var(--rule-strong)"
          strokeWidth="1.5"
          fill="var(--card)"
        />

        {/* Subtle print registration crosshairs */}
        <path
          d="M24 24h8M28 20v8M328 24h8M332 20v8M24 196h8M28 192v8M328 196h8M332 192v8"
          stroke="var(--rule-strong)"
          strokeWidth="1"
          strokeLinecap="round"
        />

        {/* Top-left pane: Donor */}
        <rect
          x="26"
          y="26"
          width="118"
          height="168"
          rx="14"
          fill={active === "donor" ? VAR_PINE_SOFT : VAR_BACKGROUND}
          stroke={active === "donor" ? VAR_PINE : VAR_RULE}
          strokeWidth={active === "donor" ? "1.75" : "1"}
        />
        <circle
          cx="44"
          cy="46"
          r="4"
          fill={active === "donor" ? VAR_PINE : VAR_RULE_STRONG}
        />
        <text
          x="56"
          y="50"
          fill="var(--foreground)"
          fontSize="12"
          fontWeight="600"
          fontFamily="var(--font-sans)"
        >
          Donor
        </text>
        <text
          x="40"
          y="72"
          fill="var(--muted-foreground)"
          fontSize="10"
          fontFamily="var(--font-mono)"
        >
          apps/donor
        </text>
        {/* Abstract ruled ledger lines (non-UI print texture) */}
        <path
          d="M40 102h88M40 120h72M40 138h80M40 156h56"
          stroke={active === "donor" ? VAR_PINE : VAR_RULE_STRONG}
          strokeOpacity={active === "donor" ? "0.55" : "0.6"}
          strokeWidth="1.25"
          strokeLinecap="round"
        />

        {/* Top-right pane: Missionary */}
        <rect
          x="156"
          y="26"
          width="178"
          height="78"
          rx="14"
          fill={active === "missionary" ? VAR_PINE_SOFT : VAR_BACKGROUND}
          stroke={active === "missionary" ? VAR_PINE : VAR_RULE}
          strokeWidth={active === "missionary" ? "1.75" : "1"}
        />
        <circle
          cx="174"
          cy="46"
          r="4"
          fill={active === "missionary" ? VAR_PINE : VAR_RULE_STRONG}
        />
        <text
          x="186"
          y="50"
          fill="var(--foreground)"
          fontSize="12"
          fontWeight="600"
          fontFamily="var(--font-sans)"
        >
          Missionary
        </text>
        <text
          x="170"
          y="72"
          fill="var(--muted-foreground)"
          fontSize="10"
          fontFamily="var(--font-mono)"
        >
          apps/missionary
        </text>
        <path
          d="M276 46h42M276 60h32"
          stroke={active === "missionary" ? VAR_PINE : VAR_RULE_STRONG}
          strokeOpacity="0.6"
          strokeWidth="1.25"
          strokeDasharray="3 3"
          strokeLinecap="round"
        />

        {/* Bottom-right pane: Office */}
        <rect
          x="156"
          y="116"
          width="178"
          height="78"
          rx="14"
          fill={active === "office" ? VAR_PINE_SOFT : VAR_BACKGROUND}
          stroke={active === "office" ? VAR_PINE : VAR_RULE}
          strokeWidth={active === "office" ? "1.75" : "1"}
        />
        <circle
          cx="174"
          cy="136"
          r="4"
          fill={active === "office" ? VAR_PINE : VAR_RULE_STRONG}
        />
        <text
          x="186"
          y="140"
          fill="var(--foreground)"
          fontSize="12"
          fontWeight="600"
          fontFamily="var(--font-sans)"
        >
          Office
        </text>
        <text
          x="170"
          y="162"
          fill="var(--muted-foreground)"
          fontSize="10"
          fontFamily="var(--font-mono)"
        >
          apps/admin
        </text>
        <path
          d="M266 136h52M266 150h40"
          stroke={active === "office" ? VAR_PINE : VAR_RULE_STRONG}
          strokeOpacity="0.65"
          strokeWidth="1.25"
          strokeLinecap="round"
        />

        {/* Connecting asymmetric datum line uniting all three panes */}
        <path
          d="M144 110H156"
          stroke={VAR_PINE}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="150" cy="110" r="3.5" fill={VAR_PINE} />
      </svg>
    </div>

    <p className="text-muted-foreground text-xs leading-5">
      Three separate apps in one monorepo, reading from one shared schema with
      role-scoped permissions on the server.
    </p>
  </div>
);

const SurfaceDetailCard = ({
  spec,
}: {
  readonly spec: SurfaceSpec;
}): ReactNode => (
  <article
    aria-label={`${spec.label} surface specification`}
    className="border-rule-strong bg-card surface-enter flex min-h-[21rem] flex-col justify-between rounded-xl border p-5 shadow-[var(--shadow-card)] sm:p-7"
  >
    <div>
      <div className="border-rule flex flex-wrap items-center justify-between gap-2 border-b pb-4 font-mono text-xs">
        <span className="text-pine font-medium">
          {spec.index} · {spec.label} surface
        </span>
        <span className="border-pine-border bg-pine-soft text-pine rounded-full border px-2.5 py-0.5">
          {spec.appPath}
        </span>
      </div>

      <h3 className="font-heading text-foreground mt-4 text-2xl leading-snug font-medium tracking-[-0.02em] sm:text-[1.75rem]">
        {spec.heading}
      </h3>
      <p className="text-muted-foreground mt-2.5 text-sm leading-6 text-pretty sm:text-[0.96875rem] sm:leading-7">
        {spec.whatTheyDo}
      </p>

      <div className="border-rule bg-background/70 mt-4 rounded-xl border p-4">
        <p className="text-foreground font-mono text-xs font-medium">
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
        Module maturity varies; read Core’s README for current status.
      </span>
      <a
        href={spec.repoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-foreground hover:text-pine focus-visible:ring-ring inline-flex items-center gap-1 rounded-xs font-medium underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        {spec.repoLinkLabel}
        <span className="sr-only"> (opens in a new tab)</span>
        <ArrowUpRightIcon className="size-3.5" />
      </a>
    </div>
  </article>
);

export const SurfaceExplorer = (): ReactNode => {
  const isHydrated = useIsClient();
  const [activeSurface, setActiveSurface] = useState<SurfaceKey>("donor");

  const handleSurfaceChange = (nextValue: string | null) => {
    if (nextValue !== null && Object.hasOwn(SURFACE_KEYS, nextValue)) {
      setActiveSurface(nextValue as SurfaceKey);
    }
  };

  return (
    <div className="surface-folio mt-8 rounded-2xl p-4 sm:p-6">
      {isHydrated ? (
        <Tabs
          value={activeSurface}
          onValueChange={handleSurfaceChange}
          className="grid gap-5"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <TabsList
              aria-label="Inspect platform surfaces in public code"
              className="border-input bg-record relative grid w-full grid-cols-3 rounded-full border p-1 sm:max-w-md"
            >
              <TabsIndicator className="specimen-tabs-indicator" />
              {SURFACES.map((spec) => (
                <TabsTab
                  key={spec.key}
                  value={spec.key}
                  className="text-foreground/80 hover:text-foreground data-selected:text-background data-selected:hover:text-background focus-visible:ring-ring focus-visible:ring-offset-record relative z-10 inline-flex min-h-11 cursor-pointer items-center justify-center rounded-full px-3 text-sm font-medium transition-colors duration-150 select-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none data-selected:font-semibold sm:min-h-9"
                >
                  {spec.label}
                </TabsTab>
              ))}
            </TabsList>
            <p className="text-muted-foreground font-mono text-xs">
              Select a role to inspect its real code boundary
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-[minmax(0,40fr)_minmax(0,60fr)] lg:items-stretch">
            <AsymmetricArchitectureDiagram active={activeSurface} />
            <div>
              {SURFACES.map((spec) => (
                <TabsPanel
                  key={spec.key}
                  value={spec.key}
                  className="focus-visible:ring-ring focus-visible:ring-offset-card rounded-xl focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                >
                  <SurfaceDetailCard spec={spec} />
                </TabsPanel>
              ))}
            </div>
          </div>

          <p className="sr-only" role="status" aria-live="polite">
            {`Showing ${activeSurface} surface architecture in Asymmetric-al/core.`}
          </p>
        </Tabs>
      ) : (
        // Exact-height zero-button SSR shell for 0.0000 CLS and zero inert buttons without JS.
        <div className="grid gap-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div
              aria-hidden="true"
              className="border-input bg-record grid w-full grid-cols-3 rounded-full border p-1 sm:max-w-md"
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
            <p className="text-muted-foreground font-mono text-xs">
              Three connected surfaces in Asymmetric-al/core
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-[minmax(0,40fr)_minmax(0,60fr)] lg:items-stretch">
            <AsymmetricArchitectureDiagram active="donor" />
            <SurfaceDetailCard spec={SURFACES[0]} />
          </div>
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
