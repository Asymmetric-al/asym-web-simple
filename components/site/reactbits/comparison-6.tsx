import { ArrowRight, Ban, Check } from "lucide-react";
import { siteConfig } from "@/lib/config";
import type { ReactNode } from "react";

interface StackTradeoff {
  readonly stitched: string;
  readonly unified: string;
}

const TRADEOFFS: readonly StackTradeoff[] = [
  {
    stitched:
      "Separate website builder, third-party giving form, donor database, and manual missionary updates",
    unified:
      "One shared ground truth across your website, Donor portal, Missionary workspace, and Mission Control",
  },
  {
    stitched:
      "Office staff exporting and emailing monthly spreadsheets so missionaries can see who gave",
    unified:
      "Live missionary micro-CRMs with built-in donor privacy and automatic Anonymous partner defaults",
  },
  {
    stitched:
      "Recurring payment methods tied to a vendor if your agency ever switches",
    unified:
      "Gifts deposited into your organization’s own Stripe account so saved cards stay yours, with 0% markup",
  },
  {
    stitched:
      "Multi-missionary church checks split by hand across separate ledgers and spreadsheets",
    unified:
      "Online recurring gifts, paper checks, cash batches, and accounting exports reconciled in one close",
  },
  {
    stitched:
      "Missionary giving pages drifting out of date whenever funds or field details change in the CRM",
    unified:
      "Built-in Web Studio connected directly to live funds and field-safety visibility settings",
  },
  {
    stitched:
      "Per-seat software bills climbing every time you add missionaries, mobilizers, or finance reviewers",
    unified:
      "Self-host Core free under AGPL-3.0-only, or choose published flat hosted tiers with unlimited users",
  },
];

export const Comparison6 = (): ReactNode => (
  <section
    id="comparison"
    aria-labelledby="comparison-title"
    className="scroll-mt-28 pt-10 pb-16 sm:pt-12 sm:pb-20"
  >
    <div className="max-w-[44rem]">
      <p className="text-signal font-sans text-sm font-medium">
        Why one ground truth matters
      </p>
      <h2
        id="comparison-title"
        className="font-heading text-foreground mt-2 text-[clamp(1.85rem,3.4vw,2.75rem)] leading-[1.08] font-semibold tracking-[-0.03em]"
      >
        One shared record, instead of stitched tools.
      </h2>
      <p className="text-muted-foreground mt-3 max-w-[38rem] text-base leading-7 text-pretty">
        Small sending offices end up doing a lot of duplicate work when giving,
        donor care, missionary updates, and web pages live in separate systems.
        Here is how they compare, line by line.
      </p>
    </div>

    <div className="border-rule-strong bg-card mt-8 overflow-hidden rounded-2xl border shadow-[var(--shadow-card)]">
      <div className="border-rule hidden border-b md:grid md:grid-cols-2">
        <div className="border-rule bg-record/60 flex items-center gap-2.5 border-r px-6 py-4 lg:px-8">
          <span
            aria-hidden="true"
            className="border-rule-strong text-muted-foreground flex size-6 shrink-0 items-center justify-center rounded-full border"
          >
            <Ban className="size-3.5" strokeWidth={1.75} />
          </span>
          <span className="text-muted-foreground font-sans text-sm font-medium">
            Stitched tools &amp; spreadsheets
          </span>
        </div>

        <div className="bg-signal-soft/45 flex items-center gap-2.5 px-6 py-4 lg:px-8">
          <span
            aria-hidden="true"
            className="bg-signal size-2.5 shrink-0 rounded-full"
          />
          <span
            translate="no"
            className="text-foreground font-sans text-sm font-semibold"
          >
            {siteConfig.shortName}
          </span>
          <span className="border-signal-border bg-card text-signal rounded-full border px-2.5 py-0.5 font-mono text-xs font-medium forced-colors:border-[CanvasText]">
            One ground truth
          </span>
        </div>
      </div>

      <div className="divide-rule divide-y">
        {TRADEOFFS.map((item) => (
          <div key={item.unified} className="grid md:grid-cols-2">
            <div className="border-rule bg-record/40 border-b px-5 py-4 md:border-r md:border-b-0 md:px-6 md:py-5 lg:px-8">
              <span className="text-muted-foreground mb-2 block font-mono text-xs font-medium md:hidden">
                Stitched tools &amp; spreadsheets
              </span>
              <div className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="border-rule-strong text-muted-foreground mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border"
                >
                  <Ban className="size-3.5" strokeWidth={1.75} />
                </span>
                <p className="text-muted-foreground text-sm leading-6 sm:text-[0.9375rem]">
                  {item.stitched}
                </p>
              </div>
            </div>

            <div className="px-5 py-4 md:px-6 md:py-5 lg:px-8">
              <span
                translate="no"
                className="text-signal mb-2 block font-mono text-xs font-medium md:hidden"
              >
                {siteConfig.shortName} · One ground truth
              </span>
              <div className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="bg-signal text-background mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full"
                >
                  <Check className="size-3.5" strokeWidth={2.25} />
                </span>
                <p className="text-foreground text-sm leading-6 font-medium sm:text-[0.9375rem]">
                  {item.unified}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-rule bg-record/35 flex flex-col gap-3 border-t px-6 py-4 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <p className="text-muted-foreground text-xs leading-5 sm:text-sm">
          Privacy boundaries, Stripe resolution, and batch preview code are
          public in{" "}
          <span translate="no" className="text-foreground font-mono">
            Asymmetric-al/core
          </span>
          .
        </p>
        <a
          href="#migration"
          className="text-foreground focus-visible:ring-ring focus-visible:ring-offset-card inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-full font-sans text-sm font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent sm:min-h-8 [@media(hover:hover)_and_(pointer:fine)]:hover:text-signal"
        >
          See the parallel-close process
          <ArrowRight className="size-4" strokeWidth={1.75} aria-hidden="true" />
        </a>
      </div>
    </div>
  </section>
);
