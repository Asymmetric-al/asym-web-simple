"use client";

import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { useEffect, useState, type MouseEvent } from "react";

type TocItem = {
  id: string;
  label: string;
};

export function TermsTableOfContents({
  items,
}: {
  items: readonly TocItem[];
}) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -35% 0px" }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [items]);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="space-y-1">
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          onClick={(event) => handleClick(event, item.id)}
          className={cn(
            "flex items-center justify-between group py-2 pr-4 border-l-[2px] transition-all duration-300",
            activeId === item.id
              ? "border-primary text-foreground pl-4 bg-secondary/50"
              : "border-transparent text-muted-foreground hover:text-foreground hover:border-border pl-4"
          )}
        >
          <span className="font-mono text-[10px] uppercase tracking-widest truncate">{item.label}</span>
          {activeId === item.id ? (
            <ChevronRight size={12} className="text-primary animate-in fade-in slide-in-from-left-2 duration-300" />
          ) : null}
        </a>
      ))}
    </nav>
  );
}
