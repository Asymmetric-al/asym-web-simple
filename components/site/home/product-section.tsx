import {
  Eyebrow,
  SectionTitle,
  StatusPill,
} from "@/components/site/home/section-heading";
import { Container } from "@/components/site/page";

const workflowSteps = [
  {
    title: "Describe",
    actor: "Your team",
    text: "Set the fundraising goal, the project it supports, and who you want to reach.",
  },
  {
    title: "Prepare",
    actor: "AI",
    text: "AI drafts the giving page and email, suggests a donor audience, and prepares the follow-up.",
  },
  {
    title: "Review",
    actor: "Your team",
    text: "See the content, recipients, and proposed changes together. Edit the work and approve the next steps.",
  },
  {
    title: "Follow through",
    actor: "asym",
    text: "Gifts, receipts, and donor activity stay connected to the campaign and the people behind it.",
  },
] as const;

export const ProductSection = () => (
  <section
    id="product"
    aria-labelledby="product-title"
    className="scroll-mt-24 pb-[clamp(3.5rem,6vw,5.5rem)]"
  >
    <Container>
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:items-end lg:gap-12">
        <div>
          <Eyebrow>The first workflow</Eyebrow>
          <SectionTitle id="product-title">
            From a brief to a campaign ready for review.
          </SectionTitle>
        </div>
        <div className="flex flex-col gap-4 lg:items-start">
          <p className="text-muted-foreground text-base leading-7 sm:text-lg sm:leading-8">
            We’re starting with a connected workflow for launching a fundraising
            campaign. AI prepares the work. Your team decides what happens.
          </p>
          <StatusPill>In development</StatusPill>
        </div>
      </div>

      <ol className="mt-10 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:mt-12 lg:grid-cols-4">
        {workflowSteps.map((step, index) => (
          <li
            key={step.title}
            className="surface-card flex flex-col rounded-[1.6rem] p-5 sm:p-6"
          >
            <div className="flex items-center justify-between gap-3">
              <span
                className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-full font-mono text-sm tabular-nums"
                aria-hidden="true"
              >
                {index + 1}
              </span>
              <span className="text-muted-foreground font-mono text-xs tracking-[0.14em] uppercase">
                {step.actor}
              </span>
            </div>
            <h3 className="font-heading text-foreground mt-5 text-xl font-semibold tracking-[-0.04em]">
              {step.title}
            </h3>
            <p className="text-muted-foreground mt-2 text-sm leading-6 sm:text-base sm:leading-7">
              {step.text}
            </p>
          </li>
        ))}
      </ol>

      <p className="text-muted-foreground mt-6 max-w-3xl text-sm leading-6">
        Giving pages, funds, receipts, and donor records are already in asym’s
        public code. The AI steps in this workflow are in development.
      </p>
    </Container>
  </section>
);
