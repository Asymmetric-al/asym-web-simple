"use client";

import dynamic from "next/dynamic";
import { useLayoutEffect, useState } from "react";
import { CloseIcon, MenuIcon } from "@/components/site/icons";
import { useIsClient } from "@/lib/use-is-client";
import type { ReactNode } from "react";

const loadMobileNavPopover = () =>
  import("@/components/site/mobile-nav-popover").then(
    (mod) => mod.MobileNavPopover
  );

const warmPopoverChunk = (): void => {
  void loadMobileNavPopover();
};

// eslint-disable-next-line unicorn/no-top-level-side-effects -- Next.js dynamic import registers lazy popover chunk at module scope.
const MobileNavPopover = dynamic(loadMobileNavPopover, { ssr: false });

export const MobileNavMenu = ({
  isConfigured = false,
}: {
  readonly isConfigured?: boolean;
}): ReactNode => {
  const isMounted = useIsClient();
  const [open, setOpen] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [anchorElement, setAnchorElement] = useState<HTMLButtonElement | null>(
    null
  );

  // Close transient menu synchronously when React <Activity> hides a preserved route.
  useLayoutEffect(
    () => () => {
      setOpen(false);
    },
    []
  );

  if (!isMounted) {
    return <span className="size-11 shrink-0 md:hidden" aria-hidden="true" />;
  }

  const handleToggle = (): void => {
    setHasLoaded(true);
    setOpen((prev) => !prev);
  };

  return (
    <div className="md:hidden">
      {open ? (
        <div
          aria-hidden="true"
          className="bg-[var(--scrim)] pointer-events-none fixed inset-0 top-16 z-40"
        />
      ) : null}
      <button
        ref={setAnchorElement}
        type="button"
        aria-label="Page sections"
        aria-expanded={open}
        aria-haspopup="dialog"
        onPointerEnter={warmPopoverChunk}
        onFocus={warmPopoverChunk}
        onTouchStart={warmPopoverChunk}
        onClick={handleToggle}
        className="border-input bg-background text-foreground focus-visible:ring-ring focus-visible:ring-offset-background inline-flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full border transition-transform duration-150 ease-out select-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent active:scale-[0.97] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-secondary/72 forced-colors:border-[ButtonBorder]"
      >
        {open ? (
          <CloseIcon className="size-4" />
        ) : (
          <MenuIcon className="size-4" />
        )}
      </button>
      {hasLoaded ? (
        <MobileNavPopover
          isConfigured={isConfigured}
          isOpen={open}
          onOpenChange={setOpen}
          anchorElement={anchorElement}
        />
      ) : null}
    </div>
  );
};
