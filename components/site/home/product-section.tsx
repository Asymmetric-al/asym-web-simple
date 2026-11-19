import { ArrowRight } from "lucide-react";
import { Container } from "@/components/site/container";
import {
  Eyebrow,
  SectionTitle,
  StatusPill,
} from "@/components/site/home/section-heading";
import { WorkflowReveal } from "@/components/site/home/workflow-sequence";
import { cn } from "@/lib/utils";
import type { CSSProperties } from "react";

const workflowSteps = [
  {
    title: "Describe",
    actor: "Your team",
    isAiStep: false,
    delayMs: 0,
    text: "Set the fundraising goal, the project it supports, and who you want to reach.",
  },
  {
    title: "Prepare",
    actor: "AI",
    isAiStep: true,
    delayMs: 40,
    text: "AI drafts the giving page and email, suggests a donor audience, and prepares the follow-up.",
  },
  {
    title: "Review",
    actor: "Your team",
    isAiStep: false,
    delayMs: 70,
    text: "See the content, recipients, and proposed changes together. Edit the work and approve the next steps.",
  },
  {
    title: "Follow through",
    actor: "asym",
    isAiStep: false,
    delayMs: 95,
    text: "Gifts, receipts, and donor activity stay connected to the campaign and the people behind it.",
  },
] as const;

const recordChain = ["Campaign", "Gift", "Receipt", "Donor history"] as const;

export const ProductSection = () => (
  <section
    id="product"
    aria-labelledby="product-title"
    className="pb-[clamp(3.25rem,6vw,5.25rem)]"
  >
    <Container>
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-end lg:gap-12">
        <div>
          <Eyebrow>The first workflow</Eyebrow>
          <SectionTitle id="product-title">
            From a brief to a campaign ready for review.
          </SectionTitle>
        </div>
        <div className="flex max-w-[42rem] flex-col gap-4 lg:items-start">
          <p className="text-muted-foreground text-base leading-7 sm:text-lg sm:leading-8">
            We’re starting with a connected workflow for launching a fundraising
            campaign. AI prepares the work. Your team decides what happens.
          </p>
          <StatusPill>In development</StatusPill>
        </div>
      </div>

      <WorkflowReveal className="surface-panel mt-10 rounded-[2rem] p-5 sm:p-7 lg:mt-12 lg:px-8 lg:py-9">
        <div className="relative">
          <div
            aria-hidden="true"
            className="workflow-rail bg-foreground/15 pointer-events-none absolute top-4 right-10 left-10 hidden h-px lg:block"
          />

          <ol className="relative grid gap-6 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6">
            {workflowSteps.map((step, index) => {
              const isLast = index === workflowSteps.length - 1;
              return (
                <li
                  key={step.title}
                  style={{ "--step-delay": `${step.delayMs}ms` } as CSSProperties}
                  className={cn(
                    "workflow-step relative flex flex-col",
                    step.isAiStep
                      ? "border-primary/35 bg-secondary/50 -mx-2 rounded-[1.35rem] border border-dashed py-4 pr-4 pl-14 sm:mx-0 sm:p-5 lg:-my-5 lg:p-5"
                      : "pl-12 sm:p-5 lg:p-0"
                  )}
                >
                  {isLast ? null : (
                    <span
                      aria-hidden="true"
                      className={cn(
                        "workflow-rail-vertical bg-foreground/15 pointer-events-none absolute w-px sm:hidden",
                        step.isAiStep
                          ? "top-12 -bottom-6 left-6"
                          : "top-8 -bottom-6 left-4"
                      )}
                    />
                  )}
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className={cn(
                        "absolute top-0 left-0 z-10 flex size-8 shrink-0 items-center justify-center rounded-full font-mono text-sm tabular-nums sm:static",
                        step.isAiStep
                          ? "border-primary/65 bg-background text-primary top-4 left-2 border border-dashed sm:top-auto sm:left-auto"
                          : "bg-primary text-primary-foreground"
                      )}
                      aria-hidden="true"
                    >
                      {index + 1}
                    </span>
                    <span
                      translate={step.actor === "asym" ? "no" : undefined}
                      className={cn(
                        "relative z-10 rounded-full font-mono text-xs tracking-[0.14em] uppercase lg:px-2",
                        step.isAiStep
                          ? "text-primary bg-secondary/90 font-medium"
                          : "text-muted-foreground lg:bg-card"
                      )}
                    >
                      {step.actor}
                    </span>
                  </div>
                  <h3 className="font-heading text-foreground mt-3 text-xl font-semibold tracking-[-0.015em] sm:mt-4">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground mt-2 text-sm leading-6 sm:text-base sm:leading-7">
                    {step.text}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="border-foreground/12 mt-7 border-t pt-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
            <p className="text-primary/80 font-mono text-xs tracking-[0.2em] uppercase">
              One shared record
            </p>
            <p className="text-foreground flex flex-wrap items-center gap-x-2 gap-y-1.5 text-sm font-medium">
              {recordChain.map((item, idx) => (
                <span key={item} className="inline-flex items-center gap-2">
                  <span className="border-foreground/12 bg-background/85 rounded-full border px-3 py-1 text-xs font-medium">
                    {item}
                  </span>
                  {idx < recordChain.length - 1 ? (
                    <ArrowRight
                      className="text-muted-foreground size-3.5 shrink-0"
                      aria-hidden="true"
                    />
                  ) : null}
                </span>
              ))}
            </p>
          </div>
          <p className="text-muted-foreground mt-4 max-w-[54rem] text-sm leading-6">
            <span className="text-foreground font-medium">Example:</span> a
            year-end appeal brief becomes a draft giving page and donor email
            for your team to edit and approve; once sent, every gift stays tied
            to its receipt and donor record.
          </p>
        </div>
      </WorkflowReveal>

      <p className="text-muted-foreground mt-5 max-w-3xl text-sm leading-6">
        Giving pages, funds, receipts, and donor records are already in{" "}
        <span translate="no">asym</span>’s public code. The AI steps in this
        workflow are in development.
      </p>
    </Container>
  </section>
);
