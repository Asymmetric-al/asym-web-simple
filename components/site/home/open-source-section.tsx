import Link from "next/link";
import { Container } from "@/components/site/container";
import { Eyebrow, SectionTitle } from "@/components/site/home/section-heading";
import { StatusLedger } from "@/components/site/home/status-ledger";
import { ArrowRightIcon, ArrowUpRightIcon } from "@/components/site/icons";
import { Cta17 } from "@/components/site/reactbits/cta-17";
import { SpotlightCard } from "@/components/site/reactbits/spotlight-card";
import { Stats19 } from "@/components/site/reactbits/stats-19";
import { repoStats, siteConfig } from "@/lib/config";
import { isEarlyAccessConfigured } from "@/lib/early-access-config";

const LINK_MONO_CLASS =
  "text-foreground focus-visible:ring-ring inline-flex min-h-11 items-center gap-1 rounded-xs font-mono text-xs font-medium underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-2 focus-visible:outline-transparent sm:min-h-8 [@media(hover:hover)_and_(pointer:fine)]:hover:text-signal";

const OpenBookDecisionGrid = ({
  isConfigured,
}: {
  readonly isConfigured: boolean;
}) => (
  <div className="border-rule-strong bg-card mt-8 overflow-hidden rounded-2xl border shadow-[var(--shadow-card)]">
    <div className="border-rule bg-record/55 flex flex-wrap items-center justify-between gap-2 border-b px-6 py-3.5 sm:px-7">
      <p className="text-foreground font-sans text-sm font-medium">
        Built for long-term stewardship
      </p>
      <p className="text-muted-foreground flex flex-wrap items-center gap-x-2 gap-y-0.5 font-mono text-xs">
        <span className="whitespace-nowrap">Open code</span>
        <span aria-hidden="true">·</span>
        <span className="whitespace-nowrap">Open rules</span>
        <span aria-hidden="true">·</span>
        <span className="whitespace-nowrap">Open prices</span>
        <span aria-hidden="true">·</span>
        <span className="whitespace-nowrap">No lock-in</span>
      </p>
    </div>

    <div className="divide-rule grid divide-y md:grid-cols-2 md:divide-y-0">
      <SpotlightCard
        intensity={0.055}
        borderGlow={0.22}
        className="md:border-rule flex min-w-0 flex-col justify-between p-6 sm:p-7 md:border-r md:border-b"
      >
        <div className="relative z-10">
          <p className="text-signal font-sans text-xs font-medium">Ownership</p>
          <h3 className="font-heading text-foreground mt-2 text-lg font-semibold tracking-[-0.02em]">
            Self-host it, or let us host it.
          </h3>
          <p className="text-muted-foreground mt-2 text-sm leading-6 text-pretty">
            Run Core on your own servers with no software license fee under{" "}
            <span
              translate="no"
              className="text-foreground font-mono text-xs whitespace-nowrap"
            >
              {repoStats.license}
            </span>
            . Using{" "}
            <span translate="no" className="text-foreground font-medium">
              {siteConfig.shortName}
            </span>{" "}
            never puts any license claim on your ministry’s content or donor
            data. Managed hosting by{" "}
            <span translate="no">{siteConfig.name}</span> uses published flat
            tiers with unlimited staff, missionary, and donor accounts.
          </p>
        </div>
        <div className="border-rule relative z-10 mt-5 flex flex-wrap items-center justify-between gap-2 border-t pt-4">
          <span className="text-muted-foreground font-mono text-xs">
            AGPL-3.0-only · flat tiers · unlimited users
          </span>
          <a
            href={`${siteConfig.repoUrl}#readme`}
            target="_blank"
            rel="noopener noreferrer"
            className={LINK_MONO_CLASS}
          >
            Core README
            <ArrowUpRightIcon className="size-3.5" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </SpotlightCard>

      <SpotlightCard
        intensity={0.055}
        borderGlow={0.22}
        className="md:border-rule flex min-w-0 flex-col justify-between p-6 sm:p-7 md:border-b"
      >
        <div className="relative z-10">
          <p className="text-signal font-sans text-xs font-medium">Payments</p>
          <h3 className="font-heading text-foreground mt-2 text-lg font-semibold tracking-[-0.02em]">
            Gifts go straight to your own Stripe account.
          </h3>
          <p className="text-muted-foreground mt-2 text-sm leading-6 text-pretty">
            Every organization connects its own Stripe account directly, with
            optional donor fee-cover at checkout and 0% markup from{" "}
            <span translate="no">{siteConfig.name}</span> on charitable gifts,
            with no platform cut coming out of your ministry’s budget.
          </p>
        </div>
        <div className="border-rule relative z-10 mt-5 flex flex-wrap items-center justify-between gap-2 border-t pt-4">
          <span className="text-muted-foreground font-mono text-xs">
            Direct Stripe · 0% gift markup
          </span>
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
            <a
              href={`${siteConfig.repoUrl}/blob/develop/packages/api/src/stripe/tenant-client.ts`}
              target="_blank"
              rel="noopener noreferrer"
              className={LINK_MONO_CLASS}
            >
              tenant-client.ts
              <ArrowUpRightIcon className="size-3.5" />
              <span className="sr-only">
                {" "}
                in Asymmetric-al/core (opens in a new tab)
              </span>
            </a>
            <a
              href={`${siteConfig.repoUrl}/blob/develop/packages/api/src/donate/fee-policy.ts`}
              target="_blank"
              rel="noopener noreferrer"
              className={LINK_MONO_CLASS}
            >
              fee-policy.ts
              <ArrowUpRightIcon className="size-3.5" />
              <span className="sr-only">
                {" "}
                in Asymmetric-al/core (opens in a new tab)
              </span>
            </a>
          </div>
        </div>
      </SpotlightCard>

      <SpotlightCard
        intensity={0.055}
        borderGlow={0.22}
        className="md:border-rule flex min-w-0 flex-col justify-between p-6 sm:p-7 md:border-r"
      >
        <div className="relative z-10">
          <p className="text-signal font-sans text-xs font-medium">Leaving</p>
          <h3 className="font-heading text-foreground mt-2 text-lg font-semibold tracking-[-0.02em]">
            Keep your cards, records, and code.
          </h3>
          <p className="text-muted-foreground mt-2 text-sm leading-6 text-pretty">
            Donors’ saved payment methods stay in your own Stripe account
            instead of being locked to a vendor. With portable record exports
            and open-source code, your ministry is never trapped if you decide
            to move on.
          </p>
        </div>
        <div className="border-rule relative z-10 mt-5 flex flex-wrap items-center justify-between gap-2 border-t pt-4">
          <span className="text-muted-foreground font-mono text-xs">
            Your Stripe cards · portable records · open code
          </span>
          <a
            href={`${siteConfig.repoUrl}/blob/develop/LICENSE`}
            target="_blank"
            rel="noopener noreferrer"
            className={LINK_MONO_CLASS}
          >
            LICENSE
            <ArrowUpRightIcon className="size-3.5" />
            <span className="sr-only">
              {" "}
              in Asymmetric-al/core (opens in a new tab)
            </span>
          </a>
        </div>
      </SpotlightCard>

      <SpotlightCard
        tone="human"
        intensity={0.055}
        borderGlow={0.22}
        className="flex min-w-0 flex-col justify-between p-6 sm:p-7"
      >
        <div className="relative z-10">
          <p className="text-signal font-sans text-xs font-medium">
            Getting started
          </p>
          <h3 className="font-heading text-foreground mt-2 text-lg font-semibold tracking-[-0.02em]">
            Prove the numbers before you switch.
          </h3>
          <p className="text-muted-foreground mt-2 text-sm leading-6 text-pretty">
            Guided onboarding starts by testing one past month your finance team
            has already balanced, verifying every total to the cent before you
            switch, and never during November through January. Optional managed
            donor care is also planned for small offices that want extra hands.
          </p>
        </div>
        <div className="border-rule relative z-10 mt-5 flex flex-wrap items-center justify-between gap-2 border-t pt-4">
          <Link
            href="/evaluate#migration"
            className="text-muted-foreground focus-visible:ring-ring focus-visible:ring-offset-card inline-flex min-h-11 items-center font-mono text-xs underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent sm:min-h-8 [@media(hover:hover)_and_(pointer:fine)]:hover:text-signal"
          >
            Parallel-close brief
          </Link>
          {isConfigured ? (
            <Link
              href="/#early-access"
              prefetch={false}
              className="text-foreground focus-visible:ring-ring focus-visible:ring-offset-card inline-flex min-h-11 items-center gap-1.5 rounded-full text-xs font-medium underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent sm:min-h-8 [@media(hover:hover)_and_(pointer:fine)]:hover:text-signal"
            >
              Request early access
              <ArrowRightIcon className="size-3.5" />
            </Link>
          ) : (
            <Link
              href="/early-access/status?state=unavailable"
              className="text-foreground focus-visible:ring-ring focus-visible:ring-offset-card inline-flex min-h-11 items-center gap-1.5 rounded-full text-xs font-medium underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent sm:min-h-8 [@media(hover:hover)_and_(pointer:fine)]:hover:text-signal"
            >
              Read the launch roadmap
              <ArrowRightIcon className="size-3.5" />
            </Link>
          )}
        </div>
      </SpotlightCard>
    </div>
  </div>
);

export const OpenSourceSection = () => {
  const isConfigured = isEarlyAccessConfigured();

  return (
    <section
      id="open-source"
      aria-labelledby="open-source-title"
      className="scroll-mt-24 pb-16 sm:pb-20 lg:pb-24"
    >
      <Container>
        <div
          id="where-things-stand"
          className="border-rule scroll-mt-24 border-t pt-14 sm:pt-18"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
            <div className="max-w-[38rem]">
              <Eyebrow>Open books · Open source</Eyebrow>
              <SectionTitle id="open-source-title">
                Inspect the software before you trust it.
              </SectionTitle>
            </div>
            <p className="text-muted-foreground max-w-[32rem] text-base leading-7 text-pretty">
              Christian ministries already expect open books and careful
              stewardship. Every line of{" "}
              <span
                translate="no"
                className="text-foreground font-mono text-sm whitespace-nowrap"
              >
                Asymmetric-al/core
              </span>{" "}
              is public under{" "}
              <span
                translate="no"
                className="text-foreground font-mono text-sm whitespace-nowrap"
              >
                {repoStats.license}
              </span>
              , along with our written product specs in{" "}
              <span
                translate="no"
                className="text-foreground font-mono text-sm whitespace-nowrap"
              >
                openspec/
              </span>{" "}
              and design decisions in{" "}
              <span
                translate="no"
                className="text-foreground font-mono text-sm whitespace-nowrap"
              >
                docs/adr/
              </span>
              .
            </p>
          </div>

          <OpenBookDecisionGrid isConfigured={isConfigured} />
          <Stats19 />
          <Cta17 />
          <StatusLedger />
        </div>
      </Container>
    </section>
  );
};
