"use client";

import { AnimatePresence, motion } from "motion/react";
import {
  canUseTextLayout,
  measurePlatformTabTrigger,
  platformTabTriggerPreset,
  waitForTextLayoutFontsReady,
  type PlatformTabTriggerElements,
} from "@/lib/text-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getRevealTransition, useReducedMotion } from "@/lib/motion";
import {
  startTransition,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";

export type PlatformTabItem = {
  id: string;
  title: string;
  tag: string;
  summary: string;
  details: string[];
};

export function PlatformTabs({ items }: { items: PlatformTabItem[] }) {
  const prefersReducedMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState(items[0]?.id);
  const [sharedTriggerMinHeight, setSharedTriggerMinHeight] = useState<
    number | null
  >(null);
  const [pretextReady, setPretextReady] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);
  const triggerRefs = useRef<(HTMLElement | null)[]>([]);
  const copyRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tagRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const titleRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const summaryRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    if (!canUseTextLayout()) return;

    let cancelled = false;
    let animationFrame = 0;
    let resizeObserver: ResizeObserver | null = null;

    const copy = items.map((item) => ({
      title: item.title,
      summary: item.summary,
    }));

    const scheduleMeasurement = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(() => {
        if (cancelled) return;

        const elements: PlatformTabTriggerElements[] = [];

        items.forEach((_, index) => {
          const trigger = triggerRefs.current[index];
          const copyNode = copyRefs.current[index];
          const tag = tagRefs.current[index];
          const title = titleRefs.current[index];
          const summary = summaryRefs.current[index];

          if (
            trigger == null ||
            copyNode == null ||
            tag == null ||
            title == null ||
            summary == null
          ) {
            return;
          }

          elements.push({
            trigger,
            copy: copyNode,
            tag,
            title,
            summary,
          });
        });

        if (elements.length !== items.length) {
          return;
        }

        const measurement = measurePlatformTabTrigger({
          items: copy,
          elements,
          fallbackMinHeightPx: platformTabTriggerPreset.fallbackMinHeightPx,
        });

        startTransition(() => {
          setSharedTriggerMinHeight(
            Math.max(
              measurement.sharedMinHeightPx,
              platformTabTriggerPreset.fallbackMinHeightPx,
            ),
          );
          setPretextReady(true);
        });
      });
    };

    void waitForTextLayoutFontsReady().then(() => {
      if (cancelled) return;

      scheduleMeasurement();

      if (typeof ResizeObserver !== "undefined" && listRef.current !== null) {
        resizeObserver = new ResizeObserver(() => {
          scheduleMeasurement();
        });
        resizeObserver.observe(listRef.current);
        return;
      }

      window.addEventListener("resize", scheduleMeasurement);
    });

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(animationFrame);
      resizeObserver?.disconnect();
      window.removeEventListener("resize", scheduleMeasurement);
    };
  }, [items]);

  const triggerMeasurementStyle =
    sharedTriggerMinHeight === null
      ? undefined
      : ({
          "--platform-tab-trigger-min-height": `${sharedTriggerMinHeight + platformTabTriggerPreset.measurementSafetyPx}px`,
          minHeight: "var(--platform-tab-trigger-min-height)",
          height: "var(--platform-tab-trigger-min-height)",
        } as CSSProperties);

  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className="gap-6 lg:grid lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)]"
    >
      <TabsList
        ref={listRef}
        aria-label="Mission Control modules"
        data-pretext-ready={pretextReady ? "true" : undefined}
        className="grid h-auto min-w-0 gap-2 rounded-[1.9rem] border-none bg-transparent p-0 shadow-none"
      >
        {items.map((item, index) => (
          <TabsTrigger
            key={item.id}
            ref={(value) => {
              triggerRefs.current[index] = value;
            }}
            value={item.id}
            data-pretext-ready={pretextReady ? "true" : undefined}
            style={triggerMeasurementStyle}
            className="surface-card surface-interactive data-active:bg-secondary/88 h-auto min-h-[9rem] justify-start rounded-[1.6rem] px-4 py-4 text-left leading-6"
          >
            <div
              ref={(value) => {
                copyRefs.current[index] = value;
              }}
              data-slot="platform-tab-trigger-copy"
              className="min-w-0"
            >
              <p
                ref={(value) => {
                  tagRefs.current[index] = value;
                }}
                data-slot="platform-tab-trigger-tag"
                className="text-resilient text-primary/70 font-mono text-[0.66rem] leading-[1.35] tracking-[0.16em] uppercase sm:text-[0.68rem] sm:tracking-[0.2em]"
              >
                {item.tag}
              </p>
              <p
                ref={(value) => {
                  titleRefs.current[index] = value;
                }}
                data-slot="platform-tab-trigger-title"
                className="mt-2 [font-family:var(--font-plus-jakarta)] text-lg font-semibold tracking-[-0.03em] hyphens-none"
              >
                {item.title}
              </p>
              <p
                ref={(value) => {
                  summaryRefs.current[index] = value;
                }}
                data-slot="platform-tab-trigger-summary"
                className="text-resilient text-muted-foreground mt-2 max-w-none [font-family:var(--font-inter)] text-sm hyphens-none"
              >
                {item.summary}
              </p>
            </div>
          </TabsTrigger>
        ))}
      </TabsList>

      {items.map((item) => (
        <TabsContent key={item.id} value={item.id}>
          <AnimatePresence mode="wait">
            {activeTab === item.id ? (
              <motion.div
                key={item.id}
                initial={
                  prefersReducedMotion
                    ? { opacity: 0 }
                    : { opacity: 0, y: 10, scale: 0.992 }
                }
                animate={
                  prefersReducedMotion
                    ? { opacity: 1 }
                    : { opacity: 1, y: 0, scale: 1 }
                }
                exit={
                  prefersReducedMotion
                    ? { opacity: 0 }
                    : { opacity: 0, y: -6, scale: 0.992 }
                }
                transition={getRevealTransition(prefersReducedMotion, {
                  duration: 0.26,
                })}
              >
                <Card className="surface-panel surface-interactive rounded-[1.95rem]">
                  <CardHeader>
                    <p className="text-resilient text-primary/70 font-mono text-[0.68rem] leading-[1.35] tracking-[0.16em] uppercase sm:tracking-[0.2em]">
                      {item.tag}
                    </p>
                    <CardTitle className="font-heading text-2xl font-semibold tracking-[-0.05em]">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4">
                    <p className="text-muted-foreground text-base leading-7">
                      {item.summary}
                    </p>
                    <ul className="grid gap-3">
                      {item.details.map((detail) => (
                        <li
                          key={detail}
                          className="border-foreground/10 bg-background/72 text-foreground/85 hover:bg-background/92 rounded-[1.35rem] border px-4 py-3 text-sm leading-6 transition-colors duration-200"
                        >
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </TabsContent>
      ))}
    </Tabs>
  );
}
