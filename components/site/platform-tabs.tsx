"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type PlatformTabItem = {
  id: string;
  title: string;
  tag: string;
  summary: string;
  details: string[];
};

export function PlatformTabs({ items }: { items: PlatformTabItem[] }) {
  return (
    <Tabs
      defaultValue={items[0]?.id}
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
            className="surface-card h-auto min-h-[9rem] justify-start rounded-[1.6rem] px-4 py-4 text-left leading-6 data-active:bg-secondary/88"
          >
            <div className="min-w-0">
              <p className="text-resilient font-mono text-[0.66rem] leading-[1.35] uppercase tracking-[0.16em] text-primary/70 sm:text-[0.68rem] sm:tracking-[0.2em]">
                {item.tag}
              </p>
              <p className="mt-2 font-heading text-lg font-semibold tracking-[-0.03em]">
                {item.title}
              </p>
              <p className="text-resilient mt-2 max-w-none text-sm text-muted-foreground">
                {item.summary}
              </p>
            </div>
          </TabsTrigger>
        ))}
      </TabsList>

      {items.map((item) => (
        <TabsContent key={item.id} value={item.id}>
          <Card className="surface-panel rounded-[1.95rem]">
            <CardHeader>
              <p className="text-resilient font-mono text-[0.68rem] leading-[1.35] uppercase tracking-[0.16em] text-primary/70 sm:tracking-[0.2em]">
                {item.tag}
              </p>
              <CardTitle className="font-heading text-2xl font-semibold tracking-[-0.05em]">
                {item.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <p className="text-base leading-7 text-muted-foreground">
                {item.summary}
              </p>
              <ul className="grid gap-3">
                {item.details.map((detail) => (
                  <li
                    key={detail}
                    className="rounded-[1.35rem] border border-foreground/10 bg-background/72 px-4 py-3 text-sm leading-6 text-foreground/85"
                  >
                    {detail}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  );
}
