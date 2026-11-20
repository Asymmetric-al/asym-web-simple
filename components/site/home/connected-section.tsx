import { EditorialGlyph } from "@/components/site/brand/editorial-glyphs";
import { Container } from "@/components/site/container";
import { Eyebrow, SectionTitle } from "@/components/site/home/section-heading";
import { ArrowUpRightIcon } from "@/components/site/icons";
import { siteConfig } from "@/lib/config";
import type { EditorialGlyphKind } from "@/components/site/brand/editorial-glyphs";

const handoffsRemoved: readonly {
  readonly glyph: EditorialGlyphKind;
  readonly title: string;
  readonly text: string;
  readonly linkLabel: string;
  readonly repoPath: string;
}[] = [
  {
    glyph: "receipt",
    title: "Fewer year-end receipt requests in the inbox",
    text: "Instead of staff looking up individual gifts in January, signed-in donors download receipts and settled annual statements directly from their own account.",
    linkLabel: "receipts.ts",
    repoPath: "blob/develop/packages/api/src/donor-portal/receipts.ts",
  },
  {
    glyph: "permissions",
    title: "No weekly CSV scrubbing for donor privacy",
    text: "The missionary roster API defaults non-opted-in supporters to Anonymous partner and withholds individual gift totals across rows, so field teams see support without manual spreadsheet filtering.",
    linkLabel: "redaction.ts",
    repoPath: "blob/develop/packages/api/src/missionary-portal/redaction.ts",
  },
  {
    glyph: "approval",
    title: "No blind bulk edits to contribution records",
    text: "Supported office batch actions compute a preview of affected and skipped records before running, keeping legal donor history, funds, and templates aligned.",
    linkLabel: "preview.ts",
    repoPath:
      "blob/develop/packages/api/src/admin/contribution-batches/preview.ts",
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
            <Eyebrow>What work disappears</Eyebrow>
            <SectionTitle id="connected-title">
              Less spreadsheet cleanup on Monday morning.
            </SectionTitle>
            <p className="text-muted-foreground mt-4 max-w-[32rem] text-base leading-7 text-pretty sm:mt-5 sm:text-[1.0625rem] sm:leading-8">
              Small missions offices often re-enter or export the same
              contribution between a receipt tool, a CRM, and a missionary
              roster. Reading from one shared ledger removes those manual
              handoffs.
            </p>
          </div>

          <ul className="border-rule divide-rule divide-y border-y">
            {handoffsRemoved.map(
              ({ glyph, title, text, linkLabel, repoPath }) => (
                <li
                  key={title}
                  className="grid gap-3.5 py-6 sm:grid-cols-[3.5rem_1fr] sm:items-start sm:gap-6 sm:py-7"
                >
                  <EditorialGlyph kind={glyph} className="size-12 shrink-0" />
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
        </div>
      </div>
    </Container>
  </section>
);
