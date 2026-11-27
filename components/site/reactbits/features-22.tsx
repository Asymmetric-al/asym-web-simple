import { Features22Slot } from "@/components/site/home/deferred-widget-slots";
import type { GroundTruthWorkflow } from "@/components/site/reactbits/features-22-interactive";
import type { ReactNode } from "react";

export type { GroundTruthWorkflow } from "@/components/site/reactbits/features-22-interactive";

const StaticWorkflowDetailsCard = ({
  item,
}: {
  readonly item: GroundTruthWorkflow;
}): ReactNode => (
  <div className="flex flex-col gap-4">
    <div>
      <p className="text-signal font-sans text-xs font-medium">
        {item.category}
      </p>
      <h4 className="font-heading text-foreground mt-1.5 text-xl leading-snug font-semibold tracking-[-0.02em] sm:text-2xl">
        {item.headline}
      </h4>
      <p className="text-muted-foreground mt-2.5 text-sm leading-6 text-pretty sm:text-[0.9375rem] sm:leading-7">
        {item.summary}
      </p>
    </div>

    <ul className="border-rule bg-record/45 flex flex-col gap-2.5 rounded-xl border p-4 sm:p-5">
      {item.details.map((detail) => (
        <li
          key={detail}
          className="text-foreground/90 flex items-start gap-2.5 text-sm leading-6"
        >
          <span
            aria-hidden="true"
            className="bg-signal mt-2 size-1.5 shrink-0 rounded-full"
          />
          <span>{detail}</span>
        </li>
      ))}
    </ul>

    <div className="border-rule flex flex-wrap items-center justify-between gap-2 border-t pt-3.5 font-mono text-xs">
      <span className="text-muted-foreground">{item.foundation}</span>
      <span className="border-signal-border bg-signal-soft text-signal inline-flex items-center rounded-full border px-2.5 py-0.5 font-medium forced-colors:border-[CanvasText]">
        {item.schemaScope}
      </span>
    </div>
  </div>
);

export const Features22 = ({
  workflows,
}: {
  readonly workflows: readonly GroundTruthWorkflow[];
}): ReactNode => {
  const [defaultWorkflow] = workflows;
  if (!defaultWorkflow) {
    return null;
  }

  return (
    <Features22Slot workflows={workflows}>
      <div className="border-rule-strong bg-card mt-6 overflow-hidden rounded-2xl border shadow-[var(--shadow-card)]">
        <div className="border-rule bg-record/55 flex flex-wrap items-baseline justify-between gap-2 border-b px-5 py-4 sm:px-7">
          <h3 className="font-heading text-foreground text-base font-semibold tracking-[-0.015em]">
            How everyday agency work fits together
          </h3>
          <span className="text-muted-foreground font-mono text-xs">
            5 core workflows · 1 shared record
          </span>
        </div>

        <div className="grid lg:grid-cols-[minmax(0,44fr)_minmax(0,56fr)]">
          <div
            aria-hidden="true"
            className="border-rule border-b p-4 sm:p-6 lg:border-r lg:border-b-0"
          >
            <div className="flex flex-wrap gap-2 lg:flex-col lg:gap-1.5">
              {workflows.map((item, idx) => (
                <span
                  key={item.value}
                  className={
                    idx === 0
                      ? "border-signal-border bg-card text-foreground inline-flex min-h-11 items-center rounded-full border px-3.5 text-xs font-semibold lg:w-full lg:flex-col lg:items-start lg:rounded-xl lg:px-4 lg:py-3"
                      : "border-rule bg-record/55 text-muted-foreground inline-flex min-h-11 items-center rounded-full border px-3.5 text-xs font-medium lg:w-full lg:flex-col lg:items-start lg:rounded-xl lg:px-4 lg:py-3"
                  }
                >
                  <span className="font-sans text-xs font-semibold lg:text-sm">
                    {item.label}
                  </span>
                  <span className="text-muted-foreground mt-0.5 hidden text-xs leading-5 font-normal lg:block">
                    {item.shortLine}
                  </span>
                </span>
              ))}
            </div>
          </div>

          <div className="flex min-w-0 flex-col">
            <div className="p-5 sm:p-7">
              <StaticWorkflowDetailsCard item={defaultWorkflow} />
            </div>

            <div
              aria-hidden="true"
              className="border-rule bg-record/40 border-t px-5 py-4 sm:px-7"
            >
              <div className="mb-2.5 flex items-center justify-between gap-3 font-mono text-xs">
                <span className="text-foreground font-medium">
                  Connected agency records · Asymmetric-al/core
                </span>
                <span className="text-muted-foreground">Active workflow</span>
              </div>

              <div className="rb-spec-viewport border-rule bg-card relative h-44 overflow-hidden rounded-xl border">
                <div className="flex flex-col gap-2 p-3">
                  {workflows.map((item, idx) => {
                    const isActive = idx === 0;
                    return (
                      <div
                        key={item.value}
                        className={
                          isActive
                            ? "border-signal/45 bg-signal-soft/70 relative rounded-lg border px-3.5 py-2.5"
                            : "border-rule bg-record/75 relative rounded-lg border px-3.5 py-2.5"
                        }
                      >
                        {isActive ? (
                          <span className="rb-spec-region-ring" />
                        ) : null}
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span
                            className={
                              isActive
                                ? "text-foreground font-sans text-xs font-semibold"
                                : "text-muted-foreground font-sans text-xs font-semibold"
                            }
                          >
                            {item.label}
                          </span>
                          <span
                            className={
                              isActive
                                ? "text-signal font-mono text-xs font-medium"
                                : "text-muted-foreground font-mono text-xs font-medium"
                            }
                          >
                            {item.schemaScope}
                          </span>
                        </div>
                        <div className="mt-1.5 flex flex-wrap gap-1.5">
                          {item.surfaces.map((surface) => (
                            <span
                              key={surface}
                              className={
                                isActive
                                  ? "border-signal-border bg-card text-foreground inline-flex items-center rounded-full border px-2 py-0.5 font-mono text-xs"
                                  : "border-rule bg-card text-muted-foreground inline-flex items-center rounded-full border px-2 py-0.5 font-mono text-xs"
                              }
                            >
                              {surface}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <noscript>
          <div className="divide-rule border-rule divide-y border-t">
            {workflows.slice(1).map((item) => (
              <div key={item.value} className="p-5 sm:p-7">
                <StaticWorkflowDetailsCard item={item} />
              </div>
            ))}
          </div>
        </noscript>
      </div>
    </Features22Slot>
  );
};
