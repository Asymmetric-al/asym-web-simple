"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogShortcut,
  DialogTitle,
  DialogTrigger,
} from "@ui-sdk/react/dialog";
import {
  ArrowUpRight,
  Compass,
  FileCode2,
  Scale,
  Search,
  SunMoon,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Kbd, KbdGroup } from "@/components/site/kbd";
import {
  QUICK_JUMP_GROUPS,
  buildQuickJumpItems,
  filterQuickJumpItems,
} from "@/lib/quick-jump";
import { useIsClient } from "@/lib/use-is-client";
import { cn } from "@/lib/utils";
import type { QuickJumpGroupId, QuickJumpItem } from "@/lib/quick-jump";
import type { KeyboardEvent, ReactNode } from "react";

const GROUP_ICONS: Record<QuickJumpGroupId, typeof Compass> = {
  sections: Compass,
  evaluation: Scale,
  code: FileCode2,
  appearance: SunMoon,
};

interface IndexedJumpItem {
  readonly item: QuickJumpItem;
  readonly flatIndex: number;
}

const groupIndexedItems = (
  items: readonly QuickJumpItem[]
): readonly {
  readonly id: QuickJumpGroupId;
  readonly label: string;
  readonly entries: readonly IndexedJumpItem[];
}[] => {
  const buckets = new Map<QuickJumpGroupId, IndexedJumpItem[]>();
  for (const [flatIndex, item] of items.entries()) {
    const existing = buckets.get(item.group);
    if (existing) {
      existing.push({ item, flatIndex });
    } else {
      buckets.set(item.group, [{ item, flatIndex }]);
    }
  }

  const grouped: {
    readonly id: QuickJumpGroupId;
    readonly label: string;
    readonly entries: readonly IndexedJumpItem[];
  }[] = [];
  for (const group of QUICK_JUMP_GROUPS) {
    const entries = buckets.get(group.id);
    if (entries && entries.length > 0) {
      grouped.push({ id: group.id, label: group.label, entries });
    }
  }
  return grouped;
};

const PaletteResults = ({
  filteredItems,
  highlightedIndex,
  query,
  itemRefs,
  onClearQuery,
  onHighlight,
  onSelect,
}: {
  readonly filteredItems: readonly QuickJumpItem[];
  readonly highlightedIndex: number;
  readonly query: string;
  readonly itemRefs: React.RefObject<(HTMLButtonElement | null)[]>;
  readonly onClearQuery: () => void;
  readonly onHighlight: (index: number) => void;
  readonly onSelect: (item: QuickJumpItem) => void;
}): ReactNode => {
  if (filteredItems.length === 0) {
    return (
      <div className="flex flex-col items-center px-5 py-10 text-center">
        <p className="text-foreground font-sans text-sm font-medium">
          No matching pages or files
        </p>
        <p className="text-muted-foreground mt-1 text-xs leading-5">
          Try searching for{" "}
          <span className="text-foreground font-mono">privacy</span>,{" "}
          <span className="text-foreground font-mono">parallel</span>,{" "}
          <span className="text-foreground font-mono">stripe</span>, or{" "}
          <span className="text-foreground font-mono">dark</span>.
        </p>
        {query.length > 0 ? (
          <button
            type="button"
            onClick={onClearQuery}
            className="border-rule-strong bg-record text-foreground focus-visible:ring-ring mt-4 inline-flex min-h-9 cursor-pointer items-center rounded-full border px-3.5 font-sans text-xs font-medium transition-transform duration-150 ease-out focus-visible:ring-2 focus-visible:outline-2 focus-visible:outline-transparent active:scale-[0.97] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-card"
          >
            Clear search
          </button>
        ) : null}
      </div>
    );
  }

  const grouped = groupIndexedItems(filteredItems);

  return (
    <div className="flex max-h-[22rem] flex-col gap-3 overflow-y-auto px-2 py-2.5">
      {grouped.map((group) => {
        const GroupIcon = GROUP_ICONS[group.id];
        const headingId = `quick-jump-group-${group.id}`;

        return (
          <section key={group.id} aria-labelledby={headingId}>
            <h3
              id={headingId}
              className="text-muted-foreground px-3 py-1 font-mono text-xs font-medium tracking-[0.03em] uppercase"
            >
              {group.label}
            </h3>
            <div className="mt-0.5 flex flex-col gap-0.5">
              {group.entries.map(({ item, flatIndex }) => {
                const isHighlighted = flatIndex === highlightedIndex;
                const isExternal = item.action.type === "external";

                return (
                  <button
                    key={item.id}
                    ref={(node) => {
                      itemRefs.current[flatIndex] = node;
                    }}
                    type="button"
                    data-highlighted={isHighlighted ? "true" : undefined}
                    onMouseEnter={() => {
                      onHighlight(flatIndex);
                    }}
                    onClick={() => {
                      onSelect(item);
                    }}
                    className={cn(
                      "focus-visible:ring-ring flex w-full cursor-pointer items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left transition-transform duration-150 ease-out active:scale-[0.99] focus-visible:ring-2 focus-visible:outline-2 focus-visible:outline-transparent",
                      isHighlighted
                        ? "bg-record text-foreground"
                        : "text-foreground/90 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-record/70"
                    )}
                  >
                    <span className="flex min-w-0 items-center gap-3">
                      <span
                        aria-hidden="true"
                        className={cn(
                          "border-rule-strong inline-flex size-8 shrink-0 items-center justify-center rounded-lg border",
                          isHighlighted
                            ? "bg-card text-signal"
                            : "bg-record/75 text-muted-foreground"
                        )}
                      >
                        <GroupIcon className="size-4" strokeWidth={1.75} />
                      </span>
                      <span className="min-w-0">
                        <span className="text-foreground block truncate font-sans text-sm font-medium leading-5">
                          {item.title}
                        </span>
                        <span className="text-muted-foreground block truncate text-xs leading-4.5">
                          {item.subtitle}
                        </span>
                      </span>
                    </span>
                    <span className="text-muted-foreground inline-flex shrink-0 items-center gap-1 font-mono text-xs">
                      <span>{item.badge}</span>
                      {isExternal ? (
                        <ArrowUpRight
                          className="size-3 shrink-0"
                          aria-hidden="true"
                        />
                      ) : null}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
};

/**
Quick-jump command palette owned by `@ui-sdk/react/dialog` (`shortcut="mod+k"`), combining Shadcn Studio's grouped command layout (`@ss-components/command-06`) with Shadcn Space keycaps (`@shadcn-space/kbd-02`). Renders an exact-width non-interactive spacer pre-hydration for `0px` CLS and `0` inert no-JS buttons, and opens/closes instantaneously without animation lag.
*/
export const QuickJumpPalette = ({
  isConfigured,
}: {
  readonly isConfigured: boolean;
}): ReactNode => {
  const isMounted = useIsClient();
  const router = useRouter();
  const { setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const highlightSourceRef = useRef<"keyboard" | "pointer">("pointer");

  const allItems = useMemo(
    () => buildQuickJumpItems(isConfigured),
    [isConfigured]
  );
  const filteredItems = useMemo(
    () => filterQuickJumpItems(allItems, query),
    [allItems, query]
  );

  const safeIndex =
    filteredItems.length === 0
      ? -1
      : Math.min(highlightedIndex, filteredItems.length - 1);

  useEffect(() => {
    if (!isOpen || safeIndex < 0 || highlightSourceRef.current !== "keyboard") {
      return;
    }
    itemRefs.current[safeIndex]?.scrollIntoView({ block: "nearest" });
  }, [isOpen, safeIndex]);

  // Close transient dialog synchronously when React <Activity> hides a preserved route.
  useLayoutEffect(
    () => () => {
      setIsOpen(false);
      setQuery("");
      setHighlightedIndex(0);
    },
    []
  );

  if (!isMounted) {
    return (
      <span
        aria-hidden="true"
        className="hidden h-9 w-[10.5rem] shrink-0 lg:inline-block"
      />
    );
  }

  const handleOpenChange = (isNextOpen: boolean): void => {
    setIsOpen(isNextOpen);
    if (isNextOpen) {
      return;
    }
    setQuery("");
    setHighlightedIndex(0);
  };

  const handleClearQuery = (): void => {
    setQuery("");
    setHighlightedIndex(0);
    inputRef.current?.focus();
  };

  const handlePointerHighlight = (index: number): void => {
    highlightSourceRef.current = "pointer";
    setHighlightedIndex(index);
  };

  const handleSelectItem = (item: QuickJumpItem): void => {
    setIsOpen(false);
    setQuery("");
    setHighlightedIndex(0);

    if (item.action.type === "theme") {
      setTheme(item.action.theme);
      return;
    }
    if (item.action.type === "external") {
      window.open(item.action.href, "_blank", "noopener,noreferrer");
      return;
    }
    router.push(item.action.href);
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.nativeEvent.isComposing || filteredItems.length === 0) {
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      highlightSourceRef.current = "keyboard";
      setHighlightedIndex((prev) => (prev + 1) % filteredItems.length);
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      highlightSourceRef.current = "keyboard";
      setHighlightedIndex(
        (prev) => (prev - 1 + filteredItems.length) % filteredItems.length
      );
      return;
    }
    if (event.key === "Home") {
      event.preventDefault();
      highlightSourceRef.current = "keyboard";
      setHighlightedIndex(0);
      return;
    }
    if (event.key === "End") {
      event.preventDefault();
      highlightSourceRef.current = "keyboard";
      setHighlightedIndex(filteredItems.length - 1);
      return;
    }
    if (event.key !== "Enter" || safeIndex < 0) {
      return;
    }
    const target = filteredItems[safeIndex];
    if (!target) {
      return;
    }
    event.preventDefault();
    handleSelectItem(target);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger
        shortcut="mod+k"
        className="border-rule-strong bg-record/75 text-muted-foreground focus-visible:ring-ring focus-visible:ring-offset-background hidden h-9 w-[10.5rem] shrink-0 cursor-pointer items-center justify-between gap-2 rounded-full border px-3 font-sans text-xs font-medium transition-transform duration-150 ease-out select-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent active:scale-[0.97] lg:inline-flex [@media(hover:hover)_and_(pointer:fine)]:hover:border-rule-interactive [@media(hover:hover)_and_(pointer:fine)]:hover:bg-record [@media(hover:hover)_and_(pointer:fine)]:hover:text-foreground forced-colors:border-[ButtonBorder]"
      >
        <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
          <Search className="size-3.5 shrink-0" aria-hidden="true" />
          <span>Quick jump</span>
        </span>
        <DialogShortcut className="border-rule-strong bg-card text-muted-foreground inline-flex h-5 min-w-5 shrink-0 items-center justify-center rounded-md border px-1.5 font-mono text-xs leading-none font-medium tracking-normal select-none forced-colors:border-[CanvasText]" />
      </DialogTrigger>

      <DialogBackdrop className="quick-jump-backdrop fixed inset-0 z-50" />

      <DialogContent
        initialFocus={() => inputRef.current}
        className="border-rule-strong bg-popover text-popover-foreground fixed top-[12vh] left-1/2 z-50 m-0 flex max-h-[min(34rem,calc(100dvh-18vh))] w-[min(36rem,calc(100vw-2rem))] -translate-x-1/2 flex-col overflow-hidden rounded-2xl border p-0 shadow-[var(--shadow-strong)] forced-colors:border-[CanvasText]"
      >
        <DialogTitle className="sr-only">Quick jump navigation</DialogTitle>
        <DialogDescription className="sr-only">
          Search homepage sections, evaluation brief topics, public source
          files, or switch appearance theme.
        </DialogDescription>

        <div className="border-rule flex items-center gap-2.5 border-b px-4 py-3">
          <Search
            className="text-muted-foreground size-4 shrink-0"
            aria-hidden="true"
          />
          <input
            ref={inputRef}
            id="quick-jump-input"
            type="search"
            value={query}
            onChange={(event) => {
              highlightSourceRef.current = "pointer";
              setQuery(event.currentTarget.value);
              setHighlightedIndex(0);
            }}
            onKeyDown={handleInputKeyDown}
            placeholder="Jump to a section, brief, source file, or theme…"
            aria-label="Jump to a section, brief, source file, or theme"
            className="text-foreground placeholder:text-muted-foreground min-w-0 flex-1 bg-transparent font-sans text-base focus-visible:outline-none sm:text-sm"
          />
          {query.length > 0 ? (
            <button
              type="button"
              onClick={handleClearQuery}
              className="border-rule bg-record text-muted-foreground focus-visible:ring-ring inline-flex h-7 shrink-0 cursor-pointer items-center rounded-full border px-2.5 font-sans text-xs font-medium transition-transform duration-150 ease-out focus-visible:ring-2 focus-visible:outline-2 focus-visible:outline-transparent active:scale-[0.97] [@media(hover:hover)_and_(pointer:fine)]:hover:text-foreground"
            >
              Clear
            </button>
          ) : null}
          <DialogClose
            aria-label="Close quick jump"
            className="border-rule bg-record text-muted-foreground focus-visible:ring-ring inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full border transition-transform duration-150 ease-out focus-visible:ring-2 focus-visible:outline-2 focus-visible:outline-transparent active:scale-[0.97] [@media(hover:hover)_and_(pointer:fine)]:hover:text-foreground forced-colors:border-[ButtonBorder]"
          >
            <X className="size-3.5" aria-hidden="true" />
          </DialogClose>
        </div>

        <PaletteResults
          filteredItems={filteredItems}
          highlightedIndex={safeIndex}
          query={query}
          itemRefs={itemRefs}
          onClearQuery={handleClearQuery}
          onHighlight={handlePointerHighlight}
          onSelect={handleSelectItem}
        />

        <div className="border-rule bg-record/55 text-muted-foreground flex flex-wrap items-center justify-between gap-2 border-t px-4 py-2.5 text-xs">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5">
              <KbdGroup>
                <Kbd>↑</Kbd>
                <Kbd>↓</Kbd>
              </KbdGroup>
              <span>Navigate</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Kbd>↵</Kbd>
              <span>Open</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Kbd>Esc</Kbd>
              <span>Close</span>
            </span>
          </div>
          <span className="font-mono text-xs tabular-nums" aria-live="polite">
            {filteredItems.length} result{filteredItems.length === 1 ? "" : "s"}
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
};
