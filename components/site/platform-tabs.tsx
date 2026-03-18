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
        className="grid h-auto gap-2 rounded-[1.75rem] bg-transparent p-0"
      >
        {items.map((item) => (
          <TabsTrigger
            key={item.id}
            value={item.id}
            className="h-auto justify-start rounded-[1.5rem] border border-foreground/10 bg-card/75 px-4 py-4 text-left leading-6 data-active:bg-secondary data-active:shadow-sm"
          >
            <div>
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-primary/70">
                {item.tag}
              </p>
              <p className="mt-2 font-heading text-lg font-semibold tracking-[-0.03em]">
                {item.title}
              </p>
              <p className="mt-2 max-w-[32ch] text-sm text-muted-foreground">
                {item.summary}
              </p>
            </div>
          </TabsTrigger>
        ))}
      </TabsList>

      {items.map((item) => (
        <TabsContent key={item.id} value={item.id}>
          <Card className="rounded-[1.85rem] border border-foreground/10 bg-card/88 shadow-[0_24px_60px_-44px_rgba(22,33,43,0.85)]">
            <CardHeader>
              <p className="font-mono text-[0.72rem] uppercase tracking-[0.28em] text-primary/70">
                {item.tag}
              </p>
              <CardTitle className="font-heading text-2xl font-semibold tracking-[-0.05em]">
                {item.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-base leading-7 text-muted-foreground">
                {item.summary}
              </p>
              <ul className="grid gap-3">
                {item.details.map((detail) => (
                  <li
                    key={detail}
                    className="rounded-[1.35rem] border border-foreground/10 bg-background/70 px-4 py-3 text-sm leading-6 text-foreground/85"
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
