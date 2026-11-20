import { EditorialGlyph } from "@/components/site/brand/editorial-glyphs";
import { Container } from "@/components/site/container";
import { Eyebrow, SectionTitle } from "@/components/site/home/section-heading";
import { ArrowUpRightIcon } from "@/components/site/icons";
import { siteConfig } from "@/lib/config";
import type { EditorialGlyphKind } from "@/components/site/brand/editorial-glyphs";

const giftTrace: readonly {
  readonly step: string;
  readonly glyph: EditorialGlyphKind;
  readonly desk: string;
  readonly title: string;
  readonly text: string;
  readonly linkLabel: string;
  readonly repoPath: string;
}[] = [
  {
    step: "01",
    glyph: "approval",
    desk: "Office records it",
    title: "Entered once, previewed in batches",
    text: "Online or offline gifts land in one shared ledger. Supported batch actions preview affected and skipped rows before staff confirm.",
    linkLabel: "preview.ts",
    repoPath:
      "blob/develop/packages/api/src/admin/contribution-batches/preview.ts",
  },
  {
    step: "02",
    glyph: "receipt",
    desk: "Donor pulls their own",
    title: "January requests leave the inbox",
    text: "Signed-in supporters pull their own receipts and settled annual statements instead of emailing staff for copies.",
    linkLabel: "receipts.ts",
    repoPath: "blob/develop/packages/api/src/donor-portal/receipts.ts",
  },
  {
    step: "03",
    glyph: "permissions",
    desk: "Missionary tracks support",
    title: "No weekly CSV privacy scrubbing",
    text: "Field workers see assigned support without spreadsheet exports. Donors stay Anonymous partner unless they opt in, and individual totals stay withheld.",
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

        {/* Full-width 3-column broadsheet strip breaking the 2-column rhythm */}
        <ol className="border-rule-strong bg-card divide-rule mt-7 grid divide-y border md:grid-cols-3 md:divide-x md:divide-y-0">
          {giftTrace.map(
            ({ step, glyph, desk, title, text, linkLabel, repoPath }) => (
              <li
                key={step}
                className="flex min-w-0 flex-col justify-between p-5 sm:p-6"
              >
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-pine font-mono text-xs font-medium">
                      {step} · {desk}
                    </span>
                    <EditorialGlyph kind={glyph} className="size-9 shrink-0" />
                  </div>
                  <h3 className="font-heading text-foreground mt-4 text-[1.375rem] leading-snug font-medium tracking-[-0.02em]">
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
                    className="text-pine focus-visible:ring-ring inline-flex min-h-11 items-center gap-1 rounded-xs font-mono text-xs underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent sm:min-h-7 [@media(hover:hover)_and_(pointer:fine)]:hover:text-foreground"
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
            )
          )}
        </ol>
      </div>
    </Container>
  </section>
);
