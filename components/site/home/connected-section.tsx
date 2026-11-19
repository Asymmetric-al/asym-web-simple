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
    text: "AI works through the same defined actions your staff use, with the same checks, instead of guessing across separate tools.",
  },
  {
    icon: UserCheck,
    title: "People decide",
    text: "We’re building approval rules for AI-prepared campaigns so your team reviews recipients and proposed changes before sending. Staff actions in the public code already preview their effects before running.",
  },
] as const;

export const ConnectedSection = () => (
  <section
    aria-labelledby="connected-title"
    className="section-wash-sky py-[clamp(3.25rem,6vw,5.25rem)]"
  >
    <Container>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] lg:gap-16">
        <div>
          <Eyebrow>Why connected</Eyebrow>
          <SectionTitle id="connected-title">
            The work stays connected after the donation.
          </SectionTitle>
        </div>
        <div className="text-muted-foreground max-w-[42rem] space-y-5 text-base leading-7 sm:text-lg sm:leading-8">
          <p className="text-foreground">
            When the website, giving, donor records, and email live in separate
            tools, AI can draft a message anywhere, but staff still move lists
            around, check who gave, and match receipts by hand.
          </p>
          <p>
            We’re building these pieces into one platform with shared records
            and defined actions, so staff can see what happened, what is
            proposed next, and who signed off.
          </p>
        </div>
      </div>

      <p className="text-primary/80 mt-12 font-mono text-xs tracking-[0.22em] uppercase">
        How we’re building it
      </p>
      <ul className="border-foreground/12 divide-foreground/10 mt-4 grid divide-y border-y lg:grid-cols-3 lg:divide-x lg:divide-y-0">
        {principles.map(({ icon: Icon, title, text }) => (
          <li
            key={title}
            className="flex flex-col py-6 first:pt-6 last:pb-6 lg:px-7 lg:py-7 lg:first:pl-0 lg:last:pr-0"
          >
            <span className="bg-secondary text-primary flex size-10 items-center justify-center rounded-xl">
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <h3 className="font-heading text-foreground mt-4 text-lg font-semibold tracking-[-0.04em]">
              {title}
            </h3>
            <p className="text-muted-foreground mt-2 text-sm leading-6">
              {text}
            </p>
          </li>
        ))}
      </ul>
    </Container>
  </section>
);
