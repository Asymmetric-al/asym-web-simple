"use client";

import dynamic from "next/dynamic";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { SearchIcon } from "@/components/site/icons";
import { useIsClient } from "@/lib/use-is-client";
import type { ReactNode } from "react";

const loadQuickJumpDialog = () =>
  import("@/components/site/quick-jump-dialog").then(
    (mod) => mod.QuickJumpDialog
  );

const warmDialogChunk = (): void => {
  void loadQuickJumpDialog();
};

// eslint-disable-next-line unicorn/no-top-level-side-effects -- Next.js dynamic import registers lazy dialog chunk at module scope.
const QuickJumpDialog = dynamic(loadQuickJumpDialog, { ssr: false });

const APPLE_PLATFORM_PATTERN = /Mac|iPhone|iPad|iPod/iu;

const getShortcutLabel = (): string => {
  if (typeof navigator === "undefined") {
    return "⌘K";
  }
  return APPLE_PLATFORM_PATTERN.test(navigator.userAgent) ? "⌘K" : "Ctrl+K";
};

export const QuickJumpPalette = ({
  isConfigured,
}: {
  readonly isConfigured: boolean;
}): ReactNode => {
  const isMounted = useIsClient();
  const [isOpen, setIsOpen] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Close transient dialog synchronously when React <Activity> hides a preserved route.
  useLayoutEffect(
    () => () => {
      setIsOpen(false);
    },
    []
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      const isModifier = event.metaKey || event.ctrlKey;
      if (
        !isModifier ||
        event.altKey ||
        event.shiftKey ||
        event.key.toLowerCase() !== "k"
      ) {
        return;
      }
      event.preventDefault();
      setHasLoaded(true);
      setIsOpen((prev) => !prev);
    };

    if (isMounted) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMounted]);

  if (!isMounted) {
    return (
      <span
        aria-hidden="true"
        className="hidden h-9 w-[10.5rem] shrink-0 lg:inline-block"
      />
    );
  }

  const handleOpenClick = (): void => {
    setHasLoaded(true);
    setIsOpen(true);
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-keyshortcuts="Control+K Meta+K"
        onPointerEnter={warmDialogChunk}
        onFocus={warmDialogChunk}
        onClick={handleOpenClick}
        className="border-rule-strong bg-record/75 text-muted-foreground focus-visible:ring-ring focus-visible:ring-offset-background hidden h-9 w-[10.5rem] shrink-0 cursor-pointer items-center justify-between gap-2 rounded-full border px-3 font-sans text-xs font-medium transition-transform duration-150 ease-out select-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent active:scale-[0.97] lg:inline-flex [@media(hover:hover)_and_(pointer:fine)]:hover:border-rule-interactive [@media(hover:hover)_and_(pointer:fine)]:hover:bg-record [@media(hover:hover)_and_(pointer:fine)]:hover:text-foreground forced-colors:border-[ButtonBorder]"
      >
        <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
          <SearchIcon className="size-3.5 shrink-0" />
          <span>Quick jump</span>
        </span>
        <kbd className="border-rule-strong bg-card text-muted-foreground inline-flex h-5 min-w-5 shrink-0 items-center justify-center rounded-md border px-1.5 font-mono text-xs leading-none font-medium tracking-normal select-none forced-colors:border-[CanvasText]">
          {getShortcutLabel()}
        </kbd>
      </button>

      {hasLoaded ? (
        <QuickJumpDialog
          isConfigured={isConfigured}
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          triggerRef={triggerRef}
        />
      ) : null}
    </>
  );
};
