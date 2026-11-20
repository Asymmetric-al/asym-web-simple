import { EditorialGlyph } from "@/components/site/brand/editorial-glyphs";
import { Container } from "@/components/site/container";
import { Eyebrow, SectionTitle } from "@/components/site/home/section-heading";
import type { EditorialGlyphKind } from "@/components/site/brand/editorial-glyphs";

const principles: readonly {
  readonly glyph: EditorialGlyphKind;
  readonly title: string;
  readonly text: string;
  readonly marginNote: string;
}[] = [
  {
    glyph: "receipt",
    title: "One record, three views",
    text: "Giving pages, receipts, donor history, and missionary rosters read from the same underlying contribution. Donors can check their own history and annual statements in the donor portal without emailing the office.",
    marginNote: "apps/donor · apps/missionary · apps/admin",
  },
  {
    glyph: "permissions",
    title: "Same permissions as staff",
    text: "Role boundaries stay intact across every desk. A missionary sees only their assigned supporters and never sees an anonymous donor’s name; AI campaign tools in development will inherit the exact scope of the staff member running them.",
    marginNote: "Verified role scoping",
  },
  {
    glyph: "approval",
    title: "A person approves every send",
    text: "Several staff actions in the public code already preview which records will change before running. Approval rules in development extend that human sign-off to AI-drafted pages, recipient lists, and donor emails.",
    marginNote: "Human review gate",
  },
];

export const ConnectedSection = () => (
  <section
    aria-labelledby="connected-title"
    className="pb-[clamp(3.5rem,6vw,5.5rem)]"
  >
    <Container>
      <div className="border-rule border-t pt-12 sm:pt-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,40fr)_minmax(0,60fr)] lg:gap-14">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Eyebrow>Why one record</Eyebrow>
            <SectionTitle id="connected-title">
              The work stays connected after the gift.
            </SectionTitle>
            <p className="text-muted-foreground mt-5 max-w-[32rem] text-base leading-7 text-pretty sm:text-[1.0625rem] sm:leading-8">
              The donor needs a receipt. The missionary needs to know who is
              supporting the work. The office needs the gift tied to the right
              fund and household. When those live in separate tools, every
              appeal starts with spreadsheet cleanup.
            </p>
          </div>

          <ul className="border-rule divide-rule divide-y border-y">
            {principles.map(({ glyph, title, text, marginNote }) => (
              <li
                key={title}
                className="grid gap-4 py-7 sm:grid-cols-[3.5rem_1fr] sm:items-start sm:gap-6"
              >
                <EditorialGlyph kind={glyph} className="size-12 shrink-0" />
                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-heading text-foreground text-2xl leading-snug font-medium tracking-[-0.02em]">
                      {title}
                    </h3>
                    <span className="text-muted-foreground font-mono text-xs">
                      {marginNote}
                    </span>
                  </div>
                  <p className="text-muted-foreground mt-2.5 max-w-[58ch] text-[0.96875rem] leading-7 text-pretty">
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
