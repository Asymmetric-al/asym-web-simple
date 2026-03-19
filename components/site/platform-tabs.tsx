"use client";

import { AnimatePresence, motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getRevealTransition, useReducedMotion } from "@/lib/motion";
import { useState } from "react";

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

  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className="gap-6 lg:grid lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)]"
    >
      <TabsList
        aria-label="Mission Control modules"
        className="grid h-auto min-w-0 gap-2 rounded-[1.9rem] border-none bg-transparent p-0 shadow-none"
      >
        {items.map((item) => (
          <TabsTrigger
            key={item.id}
            value={item.id}
            className="surface-card surface-interactive data-active:bg-secondary/88 h-auto min-h-[9rem] justify-start rounded-[1.6rem] px-4 py-4 text-left leading-6"
          >
            <div className="min-w-0">
              <p className="text-resilient text-primary/70 font-mono text-[0.66rem] leading-[1.35] tracking-[0.16em] uppercase sm:text-[0.68rem] sm:tracking-[0.2em]">
                {item.tag}
              </p>
              <p className="font-heading mt-2 text-lg font-semibold tracking-[-0.03em]">
                {item.title}
              </p>
              <p className="text-resilient text-muted-foreground mt-2 max-w-none text-sm">
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
                    : { opacity: 0, y: 20, scale: 0.99 }
                }
                animate={
                  prefersReducedMotion
                    ? { opacity: 1 }
                    : { opacity: 1, y: 0, scale: 1 }
                }
                exit={
                  prefersReducedMotion
                    ? { opacity: 0 }
                    : { opacity: 0, y: -12, scale: 0.99 }
                }
                transition={getRevealTransition(prefersReducedMotion, {
                  duration: 0.42,
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
