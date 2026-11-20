import { EditorialGlyph } from "@/components/site/brand/editorial-glyphs";
import { Container } from "@/components/site/container";
import { Eyebrow, SectionTitle } from "@/components/site/home/section-heading";
import { siteConfig } from "@/lib/config";
import type { EditorialGlyphKind } from "@/components/site/brand/editorial-glyphs";

const principles: readonly {
  readonly glyph: EditorialGlyphKind;
  readonly title: string;
  readonly text: string;
  readonly marginNote: string;
  readonly repoPath?: string;
}[] = [
  {
    glyph: "receipt",
    title: "Donors pull their own year-end statements",
    text: "When giving pages, recurring pledges, and receipts share one ledger, households pull their own tax statements in the donor portal instead of waiting on office staff to cross-check spreadsheets.",
    marginNote: "Self-service statements",
  },
  {
    glyph: "permissions",
    title: "Privacy without hand-editing CSVs",
    text: "Missionaries track support progress for their assignment while anonymous givers are redacted on the server before roster data leaves the API, removing the weekly chore of scrubbing exported donor lists by hand.",
    marginNote: "donors.ts redaction",
    repoPath: "blob/develop/packages/api/src/missionary-portal/donors.ts",
  },
  {
    glyph: "approval",
    title: "Planned: staff sign-off on every AI-drafted appeal",
    text: "Routine receipts follow your organization’s settings, while key staff actions in the public code already preview affected records first. Planned AI appeal workflows keep every draft page, recipient list, and email behind explicit staff sign-off.",
    marginNote: "Planned AI guardrail",
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
            <Eyebrow>Why it matters on Monday</Eyebrow>
            <SectionTitle id="connected-title">
              Less spreadsheet cleanup after every gift.
            </SectionTitle>
            <p className="text-muted-foreground mt-4 max-w-[32rem] text-base leading-7 text-pretty sm:mt-5 sm:text-[1.0625rem] sm:leading-8">
              Small missions offices lose hours every month moving the same gift
              between a website form, a receipt tool, a CRM, and a missionary
              update list. Keeping them on one record removes that handoff work.
            </p>
          </div>

          <ul className="border-rule divide-rule divide-y border-y">
            {principles.map(({ glyph, title, text, marginNote, repoPath }) => (
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
                    {repoPath ? (
                      <a
                        href={`${siteConfig.repoUrl}/${repoPath}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pine hover:text-foreground focus-visible:ring-ring rounded-xs font-mono text-xs underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                      >
                        {marginNote}
                        <span className="sr-only">
                          {" "}
                          on GitHub (opens in a new tab)
                        </span>
                      </a>
                    ) : (
                      <span className="text-muted-foreground font-mono text-xs">
                        {marginNote}
                      </span>
                    )}
                  </div>
                  <p className="text-muted-foreground mt-2 max-w-[58ch] text-[0.96875rem] leading-7 text-pretty">
                    {text}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Container>
  </section>
);
