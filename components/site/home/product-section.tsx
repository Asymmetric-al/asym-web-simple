import { Container } from "@/components/site/container";
import { Eyebrow, SectionTitle } from "@/components/site/home/section-heading";
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
    recordsSummary: "Record: Campaign.",
    text: "Set the fundraising goal, the project it supports, and who you want to reach.",
  },
  {
    number: 2,
    title: "Prepare",
    actor: "AI",
    isAiStep: true,
    inDevelopment: true,
    recordsSummary: "Records: Campaign and Donor history.",
    text: "AI drafts the giving page and email, suggests a donor audience, and prepares the follow-up.",
  },
  {
    number: 3,
    title: "Review",
    actor: "Your team",
    isAiStep: false,
    inDevelopment: false,
    recordsSummary: "Records: Campaign and Donor history.",
    text: "Edit the giving page and donor email, check the recipient list, and approve what goes live.",
  },
  {
    number: 4,
    title: "Publish",
    actor: "asym",
    isAiStep: false,
    inDevelopment: true,
    recordsSummary:
      "Publishes the campaign page. Gifts made through it link to receipts and donor history.",
    text: "Once your team approves, asym would publish the giving page on your website and tie every gift and receipt to donor history.",
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
      <div className="border-rule border-t pt-[clamp(2rem,3.5vw,2.75rem)]">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,58fr)_minmax(0,42fr)] lg:items-start lg:gap-12">
          <div>
            <Eyebrow>The first workflow</Eyebrow>
            <SectionTitle id="product-title">
              From the appeal brief to the gift receipt.
            </SectionTitle>
          </div>
          <p className="text-muted-foreground max-w-[42rem] text-base leading-7 sm:text-lg sm:leading-8 lg:pt-7">
            We’re starting with a connected workflow for launching a fundraising
            campaign. AI prepares the work. Your team decides what goes live.
          </p>
        </div>

        <WorkflowPlate className="wf-plate surface-panel mt-8 overflow-hidden rounded-[2rem] lg:mt-10">
          <div className="relative px-5 pt-6 sm:px-8 sm:pt-9">
            <div
              aria-hidden="true"
              className="bg-rule pointer-events-none absolute top-[3.25rem] right-16 left-16 hidden h-px xl:block"
            />

            <ol className="relative grid gap-5 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4 xl:gap-4">
              {workflowSteps.map((step, index) => {
                const isLast = index === workflowSteps.length - 1;
                const describedById = `wf-records-${step.number}`;
                const cardClass = step.inDevelopment
                  ? "wf-step-card group/step border-primary/34 bg-card/65 relative rounded-[1.35rem] border border-dashed p-4 xl:-mt-5 xl:pt-5 has-[button:focus-visible]:ring-2 has-[button:focus-visible]:ring-ring has-[button:focus-visible]:ring-offset-2 has-[button:focus-visible]:ring-offset-card"
                  : "wf-step-card group/step border-rule bg-card/45 relative rounded-[1.35rem] border p-4 xl:-mt-5 xl:pt-5 has-[button:focus-visible]:ring-2 has-[button:focus-visible]:ring-ring has-[button:focus-visible]:ring-offset-2 has-[button:focus-visible]:ring-offset-card";

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

                    <div
                      className={cn(
                        "min-w-0 flex-1 xl:flex-initial",
                        cardClass
                      )}
                    >
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
                        <div className="xl:bg-card relative z-10 flex flex-wrap items-center gap-1.5 rounded-full xl:px-1.5 xl:py-0.5">
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
                      <p
                        aria-hidden="true"
                        className="wf-step-records text-muted-foreground mt-2.5 font-mono text-xs leading-5 tracking-[0.02em] xl:hidden"
                      >
                        {step.recordsSummary}
                      </p>
                    </div>

                    {/* Desktop Datum & Sweep curved stem connecting step into the record band */}
                    <div className="wf-stem hidden xl:block" aria-hidden="true">
                      <span className="wf-stem-ink" />
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="datum-lid bg-record mt-6 px-5 pt-7 pb-6 sm:mt-8 sm:px-8 md:pt-[1.875rem] md:pb-7 xl:mt-0">
            <span className="wf-datum-ink hidden xl:block" aria-hidden="true" />
            <div className="grid gap-3.5 md:grid-cols-[11rem_1fr] md:items-start md:gap-5 xl:grid-cols-[13.5rem_1fr] xl:gap-6">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 md:block">
                <p className="text-primary/82 dark:text-ring font-mono text-[0.8125rem] font-medium tracking-[0.02em] md:pt-1.5">
                  One shared record
                </p>
                <p className="text-muted-foreground hidden text-xs leading-5 md:mt-1 [.wf-plate[data-interactive='true']_&]:block">
                  <span className="md:hidden">Select a step to trace.</span>
                  <span className="hidden md:inline">
                    Select a step to trace its records.
                  </span>
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2 md:grid md:grid-cols-[repeat(4,max-content)] md:justify-between md:gap-3 md:pr-2">
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
              <span className="text-foreground font-medium">Example:</span> For
              a year-end appeal, <span translate="no">asym</span> would publish
              the page your team approved; if a donor gave through it, staff
              could find the gift and its receipt in that donor’s history.
            </p>
          </div>
        </WorkflowPlate>

        <p className="text-muted-foreground mt-5 max-w-3xl text-sm leading-6">
          Giving pages, funds, receipts, and donor records are already in{" "}
          <span translate="no">asym</span>’s public code. AI preparation,
          approval rules, and publishing are in development.
        </p>
      </div>
    </Container>
  </section>
);
