import { Container } from "@/components/site/container";
import { Eyebrow, SectionTitle } from "@/components/site/home/section-heading";
import { ArrowUpRightIcon } from "@/components/site/icons";
import { siteConfig } from "@/lib/config";

const giftTrace: readonly {
  readonly step: string;
  readonly desk: string;
  readonly title: string;
  readonly text: string;
  readonly linkLabel: string;
  readonly repoPath: string;
}[] = [
  {
    step: "01",
    desk: "Office enters it",
    title: "Recorded once, previewed before batch runs",
    text: "Online or offline gifts land in one contribution ledger. Supported bulk actions preview affected and skipped rows before staff confirm.",
    linkLabel: "preview.ts",
    repoPath:
      "blob/develop/packages/api/src/admin/contribution-batches/preview.ts",
  },
  {
    step: "02",
    desk: "Donor downloads theirs",
    title: "January receipt requests leave the inbox",
    text: "Signed-in supporters download individual receipts and settled-only annual statements directly instead of emailing the office.",
    linkLabel: "receipts.ts",
    repoPath: "blob/develop/packages/api/src/donor-portal/receipts.ts",
  },
  {
    step: "03",
    desk: "Missionary tracks support",
    title: "No weekly spreadsheet redaction",
    text: "Field workers follow assigned support without manual exports. Donors stay Anonymous partner until they opt in; lifetime and last-gift amounts stay withheld.",
    linkLabel: "redaction.ts",
    repoPath: "blob/develop/packages/api/src/missionary-portal/redaction.ts",
  },
];

export const ConnectedSection = () => (
  <section
    aria-labelledby="connected-title"
    className="pb-[clamp(3rem,5vw,4.5rem)]"
  >
    <Container>
      <div className="border-rule border-t pt-12 sm:pt-14">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div className="max-w-[34rem]">
            <Eyebrow>How one gift moves</Eyebrow>
            <SectionTitle id="connected-title">
              Less spreadsheet cleanup on Monday morning.
            </SectionTitle>
          </div>
          <p className="text-muted-foreground max-w-[32rem] text-sm leading-6 text-pretty sm:text-base sm:leading-7">
            Small missions offices often re-enter or export the same gift across
            a receipt tool, a CRM, and a missionary roster. One shared ledger
            cuts out those manual handoffs.
          </p>
        </div>

        {/* Full-width 3-column broadsheet strip on desktop; wide stacked rows on mobile/tablet */}
        <ol className="border-rule-strong bg-card divide-rule mt-7 grid divide-y border lg:grid-cols-3 lg:divide-x lg:divide-y-0">
          {giftTrace.map(({ step, desk, title, text, linkLabel, repoPath }) => (
            <li
              key={step}
              className="flex min-w-0 flex-col justify-between p-5 sm:p-6"
            >
              <div>
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-pine font-mono text-[0.8125rem] font-medium">
                    {desk}
                  </span>
                  <span
                    aria-hidden="true"
                    className="font-heading text-pine/80 text-2xl leading-none italic tabular-nums"
                  >
                    {step}
                  </span>
                </div>
                <h3 className="font-heading text-foreground mt-3.5 text-[1.375rem] leading-snug font-medium tracking-[-0.02em]">
                  {title}
                </h3>
                <p className="text-muted-foreground mt-2 text-sm leading-6 text-pretty">
                  {text}
                </p>
              </div>

              <div className="border-rule mt-5 border-t pt-3">
                <a
                  href={`${siteConfig.repoUrl}/${repoPath}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pine focus-visible:ring-ring inline-flex min-h-11 items-center gap-1 rounded-xs font-mono text-[0.8125rem] underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent sm:min-h-7 [@media(hover:hover)_and_(pointer:fine)]:hover:text-foreground"
                >
                  {linkLabel}
                  <ArrowUpRightIcon className="size-3" />
                  <span className="sr-only">
                    {" "}
                    in Asymmetric-al/core (opens in a new tab)
                  </span>
                </a>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Container>
  </section>
);
