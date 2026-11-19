import { Database, ListChecks, UserCheck } from "lucide-react";
import { Eyebrow, SectionTitle } from "@/components/site/home/section-heading";
import { Container } from "@/components/site/page";

const principles = [
  {
    icon: Database,
    title: "Shared records",
    text: "Gifts, receipts, and donor history share one set of records, so every step works from the same facts.",
  },
  {
    icon: ListChecks,
    title: "Defined actions",
    text: "AI will work through the same actions your staff use, with the same checks, instead of guessing inside another tool.",
  },
  {
    icon: UserCheck,
    title: "People decide",
    text: "Your team chooses what needs sign-off, and every action leaves a record of who approved it.",
  },
] as const;

export const ConnectedSection = () => (
  <section
    aria-labelledby="connected-title"
    className="py-[clamp(3.5rem,6vw,5.5rem)]"
  >
    <Container>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] lg:gap-16">
        <div>
          <Eyebrow>Why connected</Eyebrow>
          <SectionTitle id="connected-title">
            The work stays connected after the donation.
          </SectionTitle>
        </div>
        <div className="text-muted-foreground space-y-5 text-base leading-7 sm:text-lg sm:leading-8">
          <p className="text-foreground">
            A gift should land on the right campaign, connect to its receipt,
            and update the donor’s history. Staff should be able to see what
            happened and who approved it.
          </p>
          <p>
            That’s hard when the website, giving, donor records, and email live
            in separate tools. AI can draft an email in any of them, but people
            still move lists around, check who gave, and match receipts by hand.
          </p>
          <p>
            We’re building these pieces into one platform, with shared records
            and defined actions that AI can use within your organization’s
            permissions.
          </p>
        </div>
      </div>

      <h3 className="text-foreground mt-12 text-sm font-medium">
        How we’re building it
      </h3>
      <ul className="mt-4 grid gap-3 sm:gap-4 md:grid-cols-3">
        {principles.map(({ icon: Icon, title, text }) => (
          <li key={title} className="surface-card rounded-[1.6rem] p-5 sm:p-6">
            <span className="bg-secondary text-primary flex size-10 items-center justify-center rounded-xl">
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <h4 className="font-heading text-foreground mt-4 text-lg font-semibold tracking-[-0.04em]">
              {title}
            </h4>
            <p className="text-muted-foreground mt-2 text-sm leading-6">
              {text}
            </p>
          </li>
        ))}
      </ul>
    </Container>
  </section>
);
