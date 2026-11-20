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
    text: "Campaigns, gifts, and donor profiles stay linked from the start, and donors can check their own giving history in the donor portal.",
  },
  {
    highlight: "sweep",
    title: "Same permissions as staff",
    text: "Campaign drafts will follow the same permission checks as your staff rather than working around separate tools, so AI only touches the records a team member is allowed to see.",
  },
  {
    highlight: "frame",
    title: "Human approval before action",
    text: "Approval rules in development will let your team review recipients, draft pages, and record updates before anything publishes or sends.",
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
          <div className="text-muted-foreground max-w-[42rem] space-y-5 text-base leading-7 text-pretty sm:text-lg sm:leading-8">
            <p className="text-foreground">
              AI can draft text in any tool, but without shared records and real
              permissions it cannot tell who gave, which project they support,
              or who is allowed to act.
            </p>
            <p>
              Keeping website pages, giving, email, and donor history on the
              same shared records keeps every team working from the same facts.
              Several staff actions in the public code already preview which
              records will change; we’re building review and approval history
              into campaign publishing.
            </p>
          </div>

          <ul className="border-rule mt-10 border-t">
            {principles.map(({ highlight, title, text }) => (
              <li
                key={title}
                className="border-rule grid gap-3 border-b py-6 sm:grid-cols-[3.5rem_11.5rem_1fr] sm:items-start sm:gap-5"
              >
                <div className="flex items-center gap-3.5 sm:contents">
                  <MarkGlyph highlight={highlight} />
                  <h3 className="font-heading text-foreground text-lg leading-snug font-semibold tracking-[-0.015em] text-balance sm:pt-2">
                    {title}
                  </h3>
                </div>
                <p className="text-muted-foreground max-w-[56ch] text-[0.9375rem] leading-[1.65] text-pretty sm:pt-2">
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
