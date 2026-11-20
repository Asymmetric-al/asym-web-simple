import { EditorialGlyph } from "@/components/site/brand/editorial-glyphs";
import { Container } from "@/components/site/container";
import { Eyebrow, SectionTitle } from "@/components/site/home/section-heading";
import { ArrowUpRightIcon } from "@/components/site/icons";
import { siteConfig } from "@/lib/config";
import type { EditorialGlyphKind } from "@/components/site/brand/editorial-glyphs";

const verifiedWorkflow: readonly {
  readonly glyph: EditorialGlyphKind;
  readonly title: string;
  readonly text: string;
  readonly linkLabel: string;
  readonly repoPath: string;
}[] = [
  {
    glyph: "receipt",
    title: "Self-service receipts and year-end statements",
    text: "Signed-in donors download individual donation receipts and settled annual giving statements directly from their account instead of emailing office staff to cross-check spreadsheets.",
    linkLabel: "receipts.ts",
    repoPath: "blob/develop/packages/api/src/donor-portal/receipts.ts",
  },
  {
    glyph: "permissions",
    title: "Privacy enforced before data leaves the server",
    text: "Every supporter on a missionary’s roster defaults to Anonymous partner with individual gift totals withheld until the donor opts in, removing the weekly chore of hand-scrubbing CSV exports.",
    linkLabel: "redaction.ts",
    repoPath: "blob/develop/packages/api/src/missionary-portal/redaction.ts",
  },
  {
    glyph: "approval",
    title: "Previewed office batches instead of blind bulk edits",
    text: "Staff preview exactly which contribution records a bulk operation will affect before processing it, keeping legal donor history, funds, and office email templates aligned.",
    linkLabel: "preview.ts",
    repoPath:
      "blob/develop/packages/api/src/admin/contribution-batches/preview.ts",
  },
];

const coreBreadth: readonly {
  readonly label: string;
  readonly detail: string;
  readonly repoPath: string;
}[] = [
  {
    label: "Mission Control CRM",
    detail: "apps/admin",
    repoPath: "tree/develop/apps/admin",
  },
  {
    label: "Web Studio (Payload CMS)",
    detail: "apps/admin/src/cms",
    repoPath: "tree/develop/apps/admin/src/cms",
  },
  {
    label: "Offline gift front door",
    detail: "ADR 0010",
    repoPath:
      "blob/develop/docs/adr/0010-one-front-door-for-offline-money.md",
  },
  {
    label: "Recurring commitments",
    detail: "ADR 0012",
    repoPath:
      "blob/develop/docs/adr/0012-separate-recurring-commitments-from-fixed-total-pledges.md",
  },
  {
    label: "Entry-gated acknowledgments",
    detail: "ADR 0004",
    repoPath:
      "blob/develop/docs/adr/0004-entry-gated-auto-send-acknowledgments.md",
  },
];

export const ConnectedSection = () => (
  <section
    aria-labelledby="connected-title"
    className="pb-[clamp(3rem,5.5vw,5rem)]"
  >
    <Container>
      <div className="border-rule border-t pt-12 sm:pt-16">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,40fr)_minmax(0,60fr)] lg:gap-14">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Eyebrow>What happens to a recorded gift</Eyebrow>
            <SectionTitle id="connected-title">
              Less spreadsheet cleanup on Monday morning.
            </SectionTitle>
            <p className="text-muted-foreground mt-4 max-w-[32rem] text-base leading-7 text-pretty sm:mt-5 sm:text-[1.0625rem] sm:leading-8">
              Small missions offices lose hours every month copying the same
              contribution between a receipt tool, a CRM, and a missionary
              update list. Keeping them on one record removes that handoff work.
            </p>
          </div>

          <div className="min-w-0">
            <ul className="border-rule divide-rule divide-y border-y">
              {verifiedWorkflow.map(
                ({ glyph, title, text, linkLabel, repoPath }) => (
                  <li
                    key={title}
                    className="grid gap-3.5 py-6 sm:grid-cols-[3.5rem_1fr] sm:items-start sm:gap-6 sm:py-7"
                  >
                    <EditorialGlyph
                      kind={glyph}
                      className="size-12 shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="font-heading text-foreground text-2xl leading-snug font-medium tracking-[-0.02em]">
                          {title}
                        </h3>
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
                      <p className="text-muted-foreground mt-2 max-w-[58ch] text-[0.96875rem] leading-7 text-pretty">
                        {text}
                      </p>
                    </div>
                  </li>
                )
              )}
            </ul>

            {/* Plain-language breadth ledger of real Core architecture & ADRs */}
            <div className="mt-6">
              <p className="text-muted-foreground font-mono text-xs">
                Also in Core today
              </p>
              <ul className="border-rule divide-rule mt-2.5 divide-y border-y text-sm">
                {coreBreadth.map((item) => (
                  <li
                    key={item.label}
                    className="flex items-center justify-between gap-3 py-2"
                  >
                    <span className="text-foreground font-medium">
                      {item.label}
                    </span>
                    <a
                      href={`${siteConfig.repoUrl}/${item.repoPath}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pine focus-visible:ring-ring inline-flex min-h-11 shrink-0 items-center gap-1 rounded-xs font-mono text-xs underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent sm:min-h-7 [@media(hover:hover)_and_(pointer:fine)]:hover:text-foreground"
                    >
                      {item.detail}
                      <ArrowUpRightIcon className="size-3" />
                      <span className="sr-only">
                        {" "}
                        in Asymmetric-al/core (opens in a new tab)
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Container>
  </section>
);
