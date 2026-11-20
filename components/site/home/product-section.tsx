import { Container } from "@/components/site/container";
import {
  Eyebrow,
  SectionTitle,
  StatusPill,
} from "@/components/site/home/section-heading";
import {
  WorkflowPlate,
  WorkflowStepTitle,
} from "@/components/site/home/workflow-plate";
import { cn } from "@/lib/utils";

const workflowSteps = [
  {
    number: 1,
    title: "Describe",
    actor: "Your team",
    isAiStep: false,
    inDevelopment: false,
    recordsSummary: "Touches record: Campaign.",
    text: "Set the fundraising goal, the project it supports, and who you want to reach.",
  },
  {
    number: 2,
    title: "Prepare",
    actor: "AI",
    isAiStep: true,
    inDevelopment: true,
    recordsSummary: "Touches records: Campaign and Donor history.",
    text: "AI drafts the giving page and email, suggests a donor audience, and prepares the follow-up.",
  },
  {
    number: 3,
    title: "Review",
    actor: "Your team",
    isAiStep: false,
    inDevelopment: false,
    recordsSummary: "Touches records: Campaign and Donor history.",
    text: "Edit the giving page and donor email, check the recipient list, and decide whether to publish the page.",
  },
  {
    number: 4,
    title: "Publish",
    actor: "asym",
    isAiStep: false,
    inDevelopment: true,
    recordsSummary:
      "Touches records: Campaign, Gift, Receipt, and Donor history.",
    text: "With your approval and permission, asym would publish the giving page on your website, keeping each gift and receipt tied to donor history.",
  },
] as const;

const recordNodes = [
  { label: "Campaign", steps: "1 2 3 4" },
  { label: "Gift", steps: "4" },
  { label: "Receipt", steps: "4" },
  { label: "Donor history", steps: "2 3 4" },
] as const;

export const ProductSection = () => (
  <section
    id="product"
    aria-labelledby="product-title"
    className="pb-[clamp(3.25rem,6vw,5.25rem)]"
  >
    <Container>
      <div className="grid gap-5 lg:grid-cols-[minmax(0,58fr)_minmax(0,42fr)] lg:items-end lg:gap-12">
        <div>
          <Eyebrow>The first workflow</Eyebrow>
          <SectionTitle id="product-title">
            From the appeal brief to the gift receipt.
          </SectionTitle>
        </div>
        <div className="flex max-w-[42rem] flex-col gap-4 lg:items-start">
          <p className="text-muted-foreground text-base leading-7 sm:text-lg sm:leading-8">
            We’re starting with a connected workflow for launching a fundraising
            campaign. AI prepares the work. Your team decides what goes live.
          </p>
          <StatusPill>In development</StatusPill>
        </div>
      </div>

      <WorkflowPlate className="wf-plate surface-panel mt-10 overflow-hidden rounded-[2rem] lg:mt-12">
        <div className="relative px-5 pt-6 sm:px-8 sm:pt-9">
          <div
            aria-hidden="true"
            className="bg-rule pointer-events-none absolute top-[3.25rem] right-16 left-16 hidden h-px lg:block"
          />

          <ol className="relative grid gap-6 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-6 lg:grid-cols-4 lg:gap-6">
            {workflowSteps.map((step, index) => {
              const isLast = index === workflowSteps.length - 1;
              const describedById = `wf-records-${step.number}`;
              let cardClass = "relative sm:py-4 lg:p-0";
              if (step.isAiStep) {
                cardClass =
                  "border-primary/38 bg-secondary/55 relative rounded-[1.35rem] border border-dashed p-4 sm:-mx-4 sm:px-4 sm:py-4 lg:-mx-3 lg:-mt-5 lg:px-3 lg:pt-5 lg:pb-4";
              } else if (step.inDevelopment) {
                cardClass =
                  "border-foreground/22 bg-card/85 relative rounded-[1.35rem] border border-dashed p-4 sm:-mx-4 sm:px-4 sm:py-4 lg:-mx-3 lg:-mt-5 lg:px-3 lg:pt-5 lg:pb-4";
              }

              return (
                <li
                  key={step.title}
                  data-step={String(step.number)}
                  className={cn(
                    "wf-step relative flex gap-3.5 sm:flex-col sm:gap-0",
                    step.inDevelopment && "wf-step-dev"
                  )}
                >
                  {/* Mobile vertical rail column (aligned cleanly across all 4 steps) */}
                  <div className="relative flex w-8 shrink-0 justify-center sm:hidden">
                    <span
                      className={cn(
                        "wf-disc relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full font-mono text-sm tabular-nums",
                        step.inDevelopment
                          ? "border-primary/65 bg-background text-primary dark:text-ring border border-dashed"
                          : "bg-primary text-primary-foreground"
                      )}
                      aria-hidden="true"
                    >
                      {step.number}
                    </span>
                    {isLast ? null : (
                      <span
                        aria-hidden="true"
                        className="bg-rule pointer-events-none absolute top-8 -bottom-6 left-1/2 w-px -translate-x-1/2"
                      />
                    )}
                  </div>

                  <div className={cn("min-w-0 flex-1 sm:flex-initial", cardClass)}>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span
                        className={cn(
                          "wf-disc relative z-10 hidden size-8 shrink-0 items-center justify-center rounded-full font-mono text-sm tabular-nums sm:flex",
                          step.inDevelopment
                            ? "border-primary/65 bg-background text-primary dark:text-ring border border-dashed"
                            : "bg-primary text-primary-foreground"
                        )}
                        aria-hidden="true"
                      >
                        {step.number}
                      </span>
                      <div
                        className={cn(
                          "relative z-10 flex flex-wrap items-center gap-1.5 rounded-full lg:px-1.5 lg:py-0.5",
                          step.isAiStep ? "lg:bg-secondary/95" : "lg:bg-card"
                        )}
                      >
                        <span
                          translate={step.actor === "asym" ? "no" : undefined}
                          className={cn(
                            "font-mono text-xs tracking-[0.02em]",
                            step.isAiStep
                              ? "text-primary dark:text-ring font-medium"
                              : "text-muted-foreground"
                          )}
                        >
                          {step.actor}
                        </span>
                        {step.inDevelopment ? (
                          <span className="border-primary/30 bg-background/85 text-muted-foreground rounded-full border border-dashed px-2 py-0.5 font-mono text-xs tracking-[0.02em]">
                            In development
                          </span>
                        ) : null}
                      </div>
                    </div>

                    <h3 className="wf-step-title font-heading text-foreground mt-2.5 text-xl font-semibold tracking-[-0.015em] sm:mt-4">
                      <WorkflowStepTitle
                        stepNumber={step.number}
                        title={step.title}
                        describedById={describedById}
                      />
                    </h3>
                    <p id={describedById} className="sr-only">
                      {step.recordsSummary}
                    </p>
                    <p className="text-muted-foreground mt-2 text-sm leading-6 sm:text-[0.96875rem] sm:leading-[1.68]">
                      {step.text}
                    </p>
                  </div>

                  {/* Desktop Datum & Sweep curved stem connecting step into the record band */}
                  <div className="wf-stem hidden lg:block" aria-hidden="true">
                    <span className="wf-stem-ink" />
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="datum-lid bg-record mt-6 px-5 pt-7 pb-6 sm:mt-8 sm:px-8 sm:pt-[1.875rem] sm:pb-7 lg:mt-0">
          <span className="wf-datum-ink hidden lg:block" aria-hidden="true" />
          <div className="grid gap-3.5 sm:grid-cols-[10rem_1fr] sm:items-start sm:gap-5 lg:grid-cols-[12.5rem_1fr] lg:gap-6">
            <p className="text-primary/82 dark:text-ring font-mono text-[0.8125rem] font-medium tracking-[0.02em] sm:pt-1.5">
              One shared record
            </p>
            <div className="flex flex-wrap items-center gap-2 sm:grid sm:grid-cols-[repeat(4,max-content)] sm:justify-between sm:gap-3 sm:pr-2">
              {recordNodes.map((node) => (
                <span
                  key={node.label}
                  data-steps={node.steps}
                  className="wf-node border-rule bg-card text-foreground inline-flex items-center rounded-full border px-3.5 py-1.5 text-[0.8125rem] font-medium"
                >
                  {node.label}
                </span>
              ))}
            </div>
          </div>

          <p className="text-muted-foreground mt-5 max-w-[54rem] text-sm leading-6">
            <span className="text-foreground font-medium">Example:</span> For a
            year-end appeal, <span translate="no">asym</span> would publish the
            page your team approved; if a donor gave through it, staff could
            find the gift and its receipt in that donor’s history.
          </p>
        </div>
      </WorkflowPlate>

      <p className="text-muted-foreground mt-5 max-w-3xl text-sm leading-6">
        Giving pages, funds, receipts, and donor records are already in{" "}
        <span translate="no">asym</span>’s public code. AI preparation, approval
        rules, and publishing are in development.
      </p>
    </Container>
  </section>
);
