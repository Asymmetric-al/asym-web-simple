"use client";

import { Tabs, TabsList, TabsPanel, TabsTab } from "@ui-sdk/react/tabs";
import {
  Globe,
  HeartHandshake,
  Landmark,
  ShieldCheck,
  Users,
} from "lucide-react";
import { animate, useMotionValue, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useIsClient } from "@/lib/use-is-client";
import { cn } from "@/lib/utils";
import type { ReactNode, RefObject } from "react";

type WorkflowIconKey =
  | "giving"
  | "micro-crm"
  | "donor-care"
  | "web-studio"
  | "mobilization";

export interface GroundTruthWorkflow {
  readonly value: string;
  readonly label: string;
  readonly shortLine: string;
  readonly category: string;
  readonly headline: string;
  readonly summary: string;
  readonly details: readonly string[];
  readonly foundation: string;
  readonly schemaScope: string;
  readonly surfaces: readonly string[];
  readonly icon: WorkflowIconKey;
}

const WORKFLOW_ICONS: Record<
  WorkflowIconKey,
  typeof Landmark
> = {
  giving: Landmark,
  "micro-crm": Users,
  "donor-care": HeartHandshake,
  "web-studio": Globe,
  mobilization: ShieldCheck,
};

const measureScrollOffset = (
  viewport: HTMLDivElement | null,
  content: HTMLDivElement | null,
  region: HTMLDivElement | null | undefined
): number | null => {
  if (!viewport || !content || !region) {
    return null;
  }
  const max = Math.max(0, content.offsetHeight - viewport.clientHeight);
  const centered =
    region.offsetTop + region.offsetHeight / 2 - viewport.clientHeight / 2;
  return -Math.min(max, Math.max(0, centered));
};

const useSpecSpringScroll = (
  activeIndex: number,
  isReducedMotion: boolean,
  viewportRef: RefObject<HTMLDivElement | null>,
  contentRef: RefObject<HTMLDivElement | null>,
  regionRefs: RefObject<(HTMLDivElement | null)[]>
): void => {
  const offset = useMotionValue(0);
  const activeRef = useRef(activeIndex);

  useEffect(() => {
    const unsubscribe = offset.on("change", (latest) => {
      const content = contentRef.current;
      if (content) {
        content.style.transform = `translate3d(0, ${latest.toFixed(2)}px, 0)`;
      }
    });
    return () => {
      unsubscribe();
    };
  }, [offset, contentRef]);

  useEffect(() => {
    activeRef.current = activeIndex;
    const target = measureScrollOffset(
      viewportRef.current,
      contentRef.current,
      regionRefs.current[activeIndex]
    );
    let controls: ReturnType<typeof animate> | null = null;
    if (target !== null) {
      if (isReducedMotion) {
        offset.set(target);
      } else {
        controls = animate(offset, target, {
          type: "spring",
          bounce: 0,
          visualDuration: 0.48,
        });
      }
    }
    return () => {
      controls?.stop();
    };
  }, [activeIndex, isReducedMotion, offset, viewportRef, contentRef, regionRefs]);

  useEffect(() => {
    const viewport = viewportRef.current;
    const content = contentRef.current;
    const view = viewport?.ownerDocument.defaultView;
    let observer: ResizeObserver | null = null;
    if (viewport && content && view) {
      observer = new view.ResizeObserver(() => {
        const target = measureScrollOffset(
          viewport,
          content,
          regionRefs.current[activeRef.current]
        );
        if (target === null) {
          return;
        }
        offset.stop();
        offset.set(target);
      });
      observer.observe(viewport);
      observer.observe(content);
    }
    return () => {
      observer?.disconnect();
    };
  }, [offset, viewportRef, contentRef, regionRefs]);
};

const WorkflowDetailsCard = ({
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

const SchemaSliceRow = ({
  item,
  isActive,
  bindRef,
}: {
  readonly item: GroundTruthWorkflow;
  readonly isActive: boolean;
  readonly bindRef?: (node: HTMLDivElement | null) => void;
}): ReactNode => (
  <div
    ref={bindRef}
    className={cn(
      "relative rounded-lg border px-3.5 py-2.5 transition-[border-color,background-color] duration-150 ease-out",
      isActive
        ? "border-signal/45 bg-signal-soft/70"
        : "border-rule bg-record/75"
    )}
  >
    {isActive ? <span className="rb-spec-region-ring" /> : null}
    <div className="flex flex-wrap items-center justify-between gap-2">
      <span
        className={cn(
          "font-sans text-xs font-semibold",
          isActive ? "text-foreground" : "text-muted-foreground"
        )}
      >
        {item.label}
      </span>
      <span
        className={cn(
          "font-mono text-xs font-medium",
          isActive ? "text-signal" : "text-muted-foreground"
        )}
      >
        {item.schemaScope}
      </span>
    </div>
    <div className="mt-1.5 flex flex-wrap gap-1.5">
      {item.surfaces.map((surface) => (
        <span
          key={surface}
          className={cn(
            "bg-card inline-flex items-center rounded-full border px-2 py-0.5 font-mono text-xs",
            isActive
              ? "border-signal-border text-foreground"
              : "border-rule text-muted-foreground"
          )}
        >
          {surface}
        </span>
      ))}
    </div>
  </div>
);

export const Features22 = ({
  workflows,
}: {
  readonly workflows: readonly GroundTruthWorkflow[];
}): ReactNode => {
  const isHydrated = useIsClient();
  const isReducedMotion = Boolean(useReducedMotion());
  const [defaultWorkflow] = workflows;
  const [selected, setSelected] = useState<string>(
    defaultWorkflow?.value ?? "giving-finance"
  );
  const [hasSwitched, setHasSwitched] = useState(false);

  const viewportRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const regionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const activeIndex = Math.max(
    0,
    workflows.findIndex((item) => item.value === selected)
  );

  useSpecSpringScroll(
    activeIndex,
    isReducedMotion,
    viewportRef,
    contentRef,
    regionRefs
  );

  if (!defaultWorkflow) {
    return null;
  }

  return (
    <div className="border-rule-strong bg-card mt-6 overflow-hidden rounded-2xl border shadow-[var(--shadow-card)]">
      {isHydrated ? (
        <Tabs
          value={selected}
          onValueChange={(nextValue) => {
            if (nextValue === null) {
              return;
            }
            setHasSwitched(true);
            setSelected(nextValue);
          }}
        >
          <div className="border-rule bg-record/55 flex flex-wrap items-baseline justify-between gap-2 border-b px-5 py-4 sm:px-7">
            <h3 className="font-heading text-foreground text-base font-semibold tracking-[-0.015em]">
              How everyday agency work fits together
            </h3>
            <span className="text-muted-foreground font-mono text-xs">
              5 core workflows · 1 shared record
            </span>
          </div>

          <div className="grid lg:grid-cols-[minmax(0,44fr)_minmax(0,56fr)]">
            <div className="border-rule border-b p-4 sm:p-6 lg:border-r lg:border-b-0">
              <TabsList
                aria-label="Agency workflows on one ground truth"
                className="flex flex-wrap gap-2 lg:flex-col lg:gap-1.5"
              >
                {workflows.map((item) => {
                  const Icon = WORKFLOW_ICONS[item.icon];
                  return (
                    <TabsTab
                      key={item.value}
                      value={item.value}
                      className={cn(
                        "border-rule bg-record/55 text-muted-foreground group inline-flex min-h-11 cursor-pointer items-center gap-2.5 rounded-full border px-3.5 text-left text-xs font-medium transition-transform duration-150 ease-out select-none focus-visible:ring-ring focus-visible:ring-offset-card focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent active:scale-[0.99] lg:w-full lg:items-start lg:rounded-xl lg:px-4 lg:py-3 [@media(hover:hover)_and_(pointer:fine)]:hover:text-foreground",
                        "data-selected:border-signal-border data-selected:bg-card data-selected:text-foreground data-selected:shadow-xs",
                        "forced-colors:data-selected:border-[Highlight] forced-colors:data-selected:bg-[Highlight] forced-colors:data-selected:text-[HighlightText] forced-colors:data-selected:forced-color-adjust-none"
                      )}
                    >
                      <Icon
                        aria-hidden="true"
                        className="text-signal mt-0.5 hidden size-4 shrink-0 lg:block"
                        strokeWidth={1.75}
                      />
                      <span className="min-w-0">
                        <span className="block font-sans text-xs font-semibold lg:text-sm">
                          {item.label}
                        </span>
                        <span className="text-muted-foreground mt-0.5 hidden text-xs leading-5 lg:block">
                          {item.shortLine}
                        </span>
                      </span>
                    </TabsTab>
                  );
                })}
              </TabsList>
            </div>

            <div className="flex min-w-0 flex-col">
              <div className="p-5 sm:p-7">
                {workflows.map((item) => (
                  <TabsPanel
                    key={item.value}
                    value={item.value}
                    className="focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-2 focus-visible:outline-transparent"
                  >
                    <div
                      className={cn(
                        hasSwitched && selected === item.value && "surface-enter"
                      )}
                    >
                      <WorkflowDetailsCard item={item} />
                    </div>
                  </TabsPanel>
                ))}
              </div>

              {/* React Bits Pro Features 22 pattern: one shared live ground-truth spec that glides to illuminate the active workflow's exact slice */}
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

                <div
                  ref={viewportRef}
                  className="rb-spec-viewport border-rule bg-card relative h-44 overflow-hidden rounded-xl border"
                >
                  <div ref={contentRef} className="flex flex-col gap-2 p-3">
                    {workflows.map((item, index) => (
                      <SchemaSliceRow
                        key={item.value}
                        item={item}
                        isActive={index === activeIndex}
                        bindRef={(node) => {
                          regionRefs.current[index] = node;
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Tabs>
      ) : (
        <>
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
                    className={cn(
                      "border-rule bg-record/55 text-muted-foreground inline-flex min-h-11 items-center rounded-full border px-3.5 text-xs font-medium lg:w-full lg:flex-col lg:items-start lg:rounded-xl lg:px-4 lg:py-3",
                      idx === 0 &&
                        "border-signal-border bg-card text-foreground font-semibold"
                    )}
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
                <WorkflowDetailsCard item={defaultWorkflow} />
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
                    {workflows.map((item, idx) => (
                      <SchemaSliceRow
                        key={item.value}
                        item={item}
                        isActive={idx === 0}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <noscript>
            <div className="divide-rule border-rule divide-y border-t">
              {workflows.slice(1).map((item) => (
                <div key={item.value} className="p-5 sm:p-7">
                  <WorkflowDetailsCard item={item} />
                </div>
              ))}
            </div>
          </noscript>
        </>
      )}
    </div>
  );
};

export default Features22;
