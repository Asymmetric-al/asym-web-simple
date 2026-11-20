import { MarkGlyph } from "@/components/site/brand/mark-glyph";
import { Container } from "@/components/site/container";
import { Eyebrow, SectionTitle } from "@/components/site/home/section-heading";
import type { MarkPrimitive } from "@/components/site/brand/mark-glyph";

const principles: readonly {
  readonly highlight: MarkPrimitive;
  readonly title: string;
  readonly text: string;
}[] = [
  {
    highlight: "datum",
    title: "Shared records",
    text: "Gifts, receipts, and donor history share one set of records. When a donor asks for a receipt, staff shouldn’t have to match an email address to a gift in another system.",
  },
  {
    highlight: "sweep",
    title: "Defined actions",
    text: "Instead of guessing across separate tools, campaign AI will use the same permission checks as staff. Some staff actions in the public code already preview which records will change.",
  },
  {
    highlight: "frame",
    title: "People decide",
    text: "Approval rules for AI-prepared campaigns will let your team review recipients and proposed changes before anything goes live or sends.",
  },
];

export const ConnectedSection = () => (
  <section
    aria-labelledby="connected-title"
    className="section-wash-sky py-[clamp(3.25rem,6vw,5.25rem)]"
  >
    <Container>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,42fr)_minmax(0,58fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Eyebrow>Why connected</Eyebrow>
          <SectionTitle id="connected-title">
            The work stays connected after the donation.
          </SectionTitle>
        </div>

        <div>
          <div className="text-muted-foreground max-w-[42rem] space-y-5 text-base leading-7 sm:text-lg sm:leading-8">
            <p className="text-foreground">
              When the website, giving, donor records, and email live in
              separate tools, AI can draft a message anywhere, but staff still
              move lists around, check who gave, and match receipts by hand.
            </p>
            <p>
              We’re bringing these pieces into one platform with shared records
              and defined actions, so staff can see what happened, what is
              proposed next, and who signed off.
            </p>
          </div>

          <ul className="border-rule mt-10 border-t">
            {principles.map(({ highlight, title, text }) => (
              <li
                key={title}
                className="border-rule grid gap-3 border-b py-6 sm:grid-cols-[3.5rem_10.5rem_1fr] sm:items-start sm:gap-5"
              >
                <div className="flex items-center gap-3.5 sm:contents">
                  <MarkGlyph highlight={highlight} />
                  <h3 className="font-heading text-foreground text-lg font-semibold tracking-[-0.015em] sm:pt-2.5">
                    {title}
                  </h3>
                </div>
                <p className="text-muted-foreground max-w-[56ch] text-[0.9375rem] leading-[1.65] sm:pt-2.5">
                  {text}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Container>
  </section>
);
