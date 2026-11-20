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
    title: "One record, three views",
    text: "Giving pages, receipts, donor history, and missionary rosters read from the same underlying contribution. Donors check their own history and yearly statements in the donor portal instead of emailing the office.",
    marginNote: "apps/donor · apps/missionary · apps/admin",
  },
  {
    glyph: "permissions",
    title: "Same permissions as staff",
    text: "Role boundaries are enforced on the server before data reaches a screen. A missionary sees only assigned supporters and never sees an anonymous donor’s identity; AI campaign tools in development are being built to follow the exact scope of the staff member running them.",
    marginNote: "Role scoping in public code",
    repoPath: "tree/develop/packages/api/src/missionary-portal/donors.ts",
  },
  {
    glyph: "approval",
    title: "A person approves every send",
    text: "Several staff actions in the public code already preview which records will change before running. Approval rules in development extend that sign-off step to AI-drafted pages, recipient lists, and donor emails.",
    marginNote: "Preview & sign-off",
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
            <Eyebrow>Why one record</Eyebrow>
            <SectionTitle id="connected-title">
              The work stays connected after the gift.
            </SectionTitle>
            <p className="text-muted-foreground mt-4 max-w-[32rem] text-base leading-7 text-pretty sm:mt-5 sm:text-[1.0625rem] sm:leading-8">
              The donor needs a receipt. The missionary needs current partner
              progress. The office needs every gift tied to the right fund and
              household. When those live in separate tools, every appeal starts
              with spreadsheet cleanup.
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
