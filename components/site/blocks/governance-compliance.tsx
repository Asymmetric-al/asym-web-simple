import { Building2, CreditCard, LockKeyhole } from "lucide-react";
import Link from "next/link";
import { ArrowUpRightIcon } from "@/components/site/icons";
import { Frame, FramePanel } from "@/components/site/reui/frame";
import { IconTile } from "@/components/site/reui/icon-tile";
import { repoStats, siteConfig } from "@/lib/config";
import type { ReactNode } from "react";

const ASSURANCE_MARKS = [
  { code: repoStats.license, detail: "Copyleft open source" },
  { code: "Postgres RLS", detail: "Tenant & role isolation" },
  { code: "Direct Stripe", detail: "Your own Stripe account" },
  { code: "Independent", detail: "Separate legal entity" },
] as const;

const GOVERNANCE_CARDS = [
  {
    icon: LockKeyhole,
    tileVariant: "soft" as const,
    title: "Automatic donor privacy",
    description:
      "Donors who have not opted in show up as Anonymous partner in every missionary micro-CRM, with lifetime and last-gift totals hidden automatically in server code and database permissions.",
    linkLabel: "Inspect donors.ts",
    href: `${siteConfig.repoUrl}/blob/develop/packages/api/src/missionary-portal/donors.ts`,
    isExternal: true,
  },
  {
    icon: CreditCard,
    tileVariant: "human" as const,
    title: "Your own Stripe account",
    description:
      "Every sending office connects its own Stripe account directly. Saved supporter payment methods stay with your organization, with optional donor fee-cover and 0% gift markup.",
    linkLabel: "Inspect tenant-client.ts",
    href: `${siteConfig.repoUrl}/blob/develop/packages/api/src/stripe/tenant-client.ts`,
    isExternal: true,
  },
  {
    icon: Building2,
    tileVariant: "frame" as const,
    title: "Clear separation & written terms",
    description:
      "Asymmetric.al is an independent, for-profit company separate from Global Fellowship. Every hosted ministry gets strict data isolation, written support-access rules, and full record exports.",
    linkLabel: "Read terms of service",
    href: "/terms",
    isExternal: false,
  },
] as const;

/**
Two-column governance narrative and stacked architectural assurance cards
adapted from Shadcnblocks (`@shadcnblocks/compliance1`) inside ReUI `Frame` and
`IconTile`, replacing generic certification seals with verifiable code and
custody guarantees.
*/
export const GovernanceCompliance = (): ReactNode => (
  <section
    id="governance"
    aria-labelledby="governance-title"
    className="border-rule scroll-mt-28 border-t py-14 sm:py-18"
  >
    <div className="grid gap-10 lg:grid-cols-[minmax(0,44fr)_minmax(0,56fr)] lg:items-start lg:gap-12">
      <div className="min-w-0">
        <span className="border-signal-border bg-signal-soft text-signal inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-xs font-medium forced-colors:border-[CanvasText]">
          <span
            aria-hidden="true"
            className="bg-signal size-1.5 rounded-full"
          />
          Code-enforced governance
        </span>
        <h2
          id="governance-title"
          className="font-heading text-foreground mt-4 text-[clamp(1.85rem,3.4vw,2.75rem)] leading-[1.08] font-semibold tracking-[-0.03em]"
        >
          Privacy, custody, and separation written into code.
        </h2>
        <p className="text-muted-foreground mt-4 text-base leading-7 text-pretty">
          Boards shouldn’t have to take a vendor’s word for it. Core’s privacy
          defaults, Stripe account ownership, and tenant isolation are
          inspectable in public TypeScript and SQL before your agency ever
          migrates a record.
        </p>

        <div className="mt-6 grid grid-cols-2 gap-3">
          {ASSURANCE_MARKS.map((mark) => (
            <div
              key={mark.code}
              className="border-rule-strong bg-record/65 rounded-xl border px-3.5 py-3"
            >
              <p
                translate="no"
                className="text-foreground font-mono text-xs font-semibold"
              >
                {mark.code}
              </p>
              <p className="text-muted-foreground mt-1 text-xs leading-4.5">
                {mark.detail}
              </p>
            </div>
          ))}
        </div>
      </div>

      <Frame variant="default" spacing="default">
        {GOVERNANCE_CARDS.map((card) => {
          const CardIcon = card.icon;
          return (
            <FramePanel
              key={card.title}
              className="flex flex-col gap-4 sm:flex-row sm:items-start"
            >
              <IconTile variant={card.tileVariant} size="lg">
                <CardIcon aria-hidden="true" />
              </IconTile>
              <div className="min-w-0 flex-1">
                <h3 className="font-heading text-foreground text-lg font-semibold tracking-[-0.02em]">
                  {card.title}
                </h3>
                <p className="text-muted-foreground mt-1.5 text-sm leading-6 text-pretty">
                  {card.description}
                </p>
                <div className="mt-3">
                  {card.isExternal ? (
                    <a
                      href={card.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground focus-visible:ring-ring inline-flex min-h-10 items-center gap-1 rounded-xs font-mono text-xs font-medium underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-2 focus-visible:outline-transparent sm:min-h-8 [@media(hover:hover)_and_(pointer:fine)]:hover:text-signal"
                    >
                      {card.linkLabel}
                      <ArrowUpRightIcon className="size-3.5" />
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  ) : (
                    <Link
                      href={card.href}
                      className="text-foreground focus-visible:ring-ring inline-flex min-h-10 items-center gap-1 rounded-xs font-mono text-xs font-medium underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-2 focus-visible:outline-transparent sm:min-h-8 [@media(hover:hover)_and_(pointer:fine)]:hover:text-signal"
                    >
                      {card.linkLabel}
                    </Link>
                  )}
                </div>
              </div>
            </FramePanel>
          );
        })}
      </Frame>
    </div>
  </section>
);
