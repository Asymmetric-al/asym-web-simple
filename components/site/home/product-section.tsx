import Link from "next/link";
import { Container } from "@/components/site/container";
import { Eyebrow, SectionTitle } from "@/components/site/home/section-heading";
import {
  WorkflowPlate,
  WorkflowStepTitle,
} from "@/components/site/home/workflow-plate";
import { cn } from "@/lib/utils";

const DONOR_HISTORY_LABEL = "Donor\u{00A0}history";

const workflowSteps = [
  {
    number: 1,
    title: "Describe",
    actor: "Your team",
    isAiStep: false,
    inDevelopment: false,
    records: ["Campaign"],
    text: "Set the fundraising goal, the project it supports, and who you want to reach.",
  },
  {
    number: 2,
    title: "Prepare",
    actor: "AI",
    isAiStep: true,
    inDevelopment: true,
    records: ["Campaign", DONOR_HISTORY_LABEL],
    text: "AI will draft the giving page and email, suggest a donor audience, and prepare the follow\u{2011}up.",
  },
  {
    number: 3,
    title: "Review",
    actor: "Your team",
    isAiStep: false,
    inDevelopment: false,
    records: ["Campaign", DONOR_HISTORY_LABEL],
    text: "Edit the draft page and email, verify the recipient list, and decide what goes live.",
  },
  {
    number: 4,
    title: "Publish",
    actor: "asym",
    isAiStep: false,
    inDevelopment: true,
    records: ["Campaign", "Gift", "Receipt", DONOR_HISTORY_LABEL],
    text: "Once your team approves, asym will publish the giving page on your website and tie each gift and receipt to donor history.",
  },
] as const;

const recordNodes = [
  { label: "Campaign", steps: "1 2 3 4" },
  { label: "Gift", steps: "4" },
  { label: "Receipt", steps: "4" },
  { label: DONOR_HISTORY_LABEL, steps: "2 3 4" },
] as const;

export const ProductSection = () => (
  <section
    id="product"
    aria-labelledby="product-title"
    className="pb-[clamp(3.25rem,6vw,5.25rem)]"
  >
    <Container>
      <div className="border-rule border-t pt-6 sm:pt-7">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,58fr)_minmax(0,42fr)] lg:items-start lg:gap-12">
          <div>
            <Eyebrow>The first workflow</Eyebrow>
            <SectionTitle id="product-title">
              From the appeal brief to the gift receipt.
            </SectionTitle>
          </div>
          <p className="text-muted-foreground max-w-[42rem] text-base leading-7 text-pretty sm:text-lg sm:leading-8 lg:pt-7">
            This campaign workflow is in development on top of our public code.
            It brings the giving page, donor email, audience, and
            follow&#8209;up into one reviewable flow.
          </p>
        </div>

        <WorkflowPlate className="wf-plate surface-panel mt-6 overflow-hidden rounded-[2rem] lg:mt-7">
          <div className="border-rule/80 bg-record/45 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b px-5 py-3 sm:px-8">
            <p className="text-muted-foreground text-[0.8125rem] leading-5">
              <span className="hidden [.wf-plate[data-interactive='true']_&]:inline xl:[.wf-plate[data-interactive='true']_&]:hidden">
                Select a step to highlight its records.
              </span>
              <span className="hidden xl:[.wf-plate[data-interactive='true']_&]:inline">
                Select a step to trace records.
              </span>
              <span className="[.wf-plate[data-interactive='true']_&]:hidden">
                Campaign workflow in development
              </span>
            </p>
            <div className="text-muted-foreground flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs tracking-[0.02em]">
              <span className="inline-flex items-center gap-1.5">
                <span
                  aria-hidden="true"
                  className="border-ink inline-block w-3.5 border-t-[1.5px]"
                />
                Your team
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span
                  aria-hidden="true"
                  className="border-ink inline-block w-3.5 border-t-[1.5px] border-dashed"
                />
                AI / <span translate="no">asym</span> (in development)
              </span>
            </div>
          </div>

          <div className="relative px-5 pt-6 sm:px-8 sm:pt-8">
            <div
              aria-hidden="true"
              className="bg-rule pointer-events-none absolute top-[3.125rem] right-16 left-16 hidden h-px xl:block"
            />

            <ol className="relative grid gap-5 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4 xl:gap-4">
              {workflowSteps.map((step, index) => {
                const isLast = index === workflowSteps.length - 1;
                const describedById = `wf-records-${step.number}`;
                const cardClass = step.inDevelopment
                  ? "wf-step-card group/step border-primary/34 relative rounded-[1.35rem] border border-dashed p-4 sm:flex sm:flex-col has-[button:focus-visible]:ring-2 has-[button:focus-visible]:ring-ring has-[button:focus-visible]:ring-offset-2 has-[button:focus-visible]:ring-offset-card"
                  : "wf-step-card group/step border-rule relative rounded-[1.35rem] border p-4 sm:flex sm:flex-col has-[button:focus-visible]:ring-2 has-[button:focus-visible]:ring-ring has-[button:focus-visible]:ring-offset-2 has-[button:focus-visible]:ring-offset-card";

                return (
                  <li
                    key={step.title}
                    data-step={String(step.number)}
                    className={cn(
                      "wf-step relative flex gap-3.5 sm:flex-col sm:gap-0 xl:grid xl:grid-rows-[1fr_auto]",
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
                            : "bg-primary text-primary-foreground border border-transparent forced-colors:border-[CanvasText]"
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

                    <div className={cn("min-w-0 flex-1", cardClass)}>
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span
                          className={cn(
                            "wf-disc relative z-10 hidden size-8 shrink-0 items-center justify-center rounded-full font-mono text-sm tabular-nums sm:flex",
                            step.inDevelopment
                              ? "border-primary/65 bg-background text-primary dark:text-ring border border-dashed"
                              : "bg-primary text-primary-foreground border border-transparent forced-colors:border-[CanvasText]"
                          )}
                          aria-hidden="true"
                        >
                          {step.number}
                        </span>
                        <div className="wf-actor-mask relative z-10 flex flex-wrap items-center gap-1.5 rounded-full xl:px-1.5 xl:py-0.5">
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
                        {`Records: ${step.records.join(", ")}`}
                      </p>
                      <p className="text-muted-foreground mt-2 text-sm leading-6 text-pretty sm:text-[0.96875rem] sm:leading-[1.68]">
                        {step.text}
                      </p>
                      <div
                        aria-hidden="true"
                        className="wf-step-records mt-3 grid grid-cols-[auto_1fr] items-baseline gap-x-2 text-xs sm:mt-auto sm:pt-3.5 xl:hidden"
                      >
                        <span className="text-muted-foreground font-mono tracking-[0.02em]">
                          Records:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {step.records.map((record) => (
                            <span
                              key={record}
                              className="wf-inline-chip border-rule bg-card/85 text-foreground/85 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium"
                            >
                              {record}
                            </span>
                          ))}
                        </div>
                      </div>
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
            <div className="hidden gap-6 xl:grid xl:grid-cols-[13.5rem_1fr] xl:items-center">
              <p className="text-primary/82 dark:text-ring font-mono text-[0.8125rem] font-medium tracking-[0.02em]">
                Connected records
              </p>
              <div className="grid grid-cols-[repeat(4,max-content)] justify-between gap-3 pr-2">
                {recordNodes.map((node) => (
                  <span
                    key={node.label}
                    data-steps={node.steps}
                    className="wf-node border-rule bg-card text-foreground inline-flex items-center justify-center rounded-full border px-3.5 py-1.5 text-[0.8125rem] font-medium"
                  >
                    {node.label}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-muted-foreground max-w-[54rem] text-sm leading-6 text-pretty xl:mt-5">
              <span className="text-foreground font-medium">
                Planned workflow:
              </span>{" "}
              For a year&#8209;end appeal, your team edits and approves the
              draft before <span translate="no">asym</span> publishes the giving
              page and links each gift to the donor’s record.
            </p>
          </div>
        </WorkflowPlate>

        <p className="text-muted-foreground mt-5 max-w-3xl text-sm leading-6">
          See{" "}
          <Link
            href="/#where-things-stand"
            prefetch={false}
            className="text-foreground hover:text-primary focus-visible:ring-ring focus-visible:ring-offset-background rounded-[0.375rem] font-medium underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent"
          >
            where things stand
          </Link>{" "}
          for what is already in the public code versus in development.
        </p>
      </div>
    </Container>
  </section>
);
