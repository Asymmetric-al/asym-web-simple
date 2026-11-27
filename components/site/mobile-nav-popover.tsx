"use client";

import { Popover, PopoverContent } from "@ui-sdk/react/popover";
import Link from "next/link";
import { useRef, useState } from "react";
import { navigationLinks } from "@/lib/config";
import type { ComponentProps, ReactNode } from "react";

const INTERACTIVE_OUTSIDE_SELECTOR =
  'a[href], button, input, textarea, select, summary, [role="button"], [role="radio"], [role="link"], [tabindex="0"]';

const isInteractiveTarget = (target: EventTarget | null | undefined): boolean =>
  target instanceof Element &&
  target.closest(INTERACTIVE_OUTSIDE_SELECTOR) !== null;

export interface MobileNavPopoverProps {
  readonly isConfigured: boolean;
  readonly isOpen: boolean;
  readonly onOpenChange: (isNextOpen: boolean) => void;
  readonly anchorElement: HTMLButtonElement | null;
}

export const MobileNavPopover = ({
  isConfigured,
  isOpen,
  onOpenChange,
  anchorElement,
}: MobileNavPopoverProps): ReactNode => {
  const [suppressReturnFocus, setSuppressReturnFocus] = useState(false);
  const restoreOnBlankDismissRef = useRef(false);

  const menuLinks = [
    ...navigationLinks,
    isConfigured
      ? { label: "Where things stand", href: "/#where-things-stand" }
      : {
          label: "Pre-launch checklist",
          href: "/early-access/status?state=unavailable",
        },
  ] as const;

  const restoreTriggerIfNonInteractive = (): void => {
    const active = document.activeElement;
    if (!active || active === document.body || active.tagName === "MAIN") {
      anchorElement?.focus();
    }
  };

  const handleOpenChange: NonNullable<
    ComponentProps<typeof Popover>["onOpenChange"]
  > = (isNextOpen, details) => {
    if (isNextOpen) {
      setSuppressReturnFocus(false);
      restoreOnBlankDismissRef.current = false;
      onOpenChange(true);
      return;
    }

    // Let the external trigger button toggle itself without double-firing.
    const eventTarget = details.event?.target;
    if (
      details.reason === "outside-press" &&
      eventTarget instanceof Node &&
      anchorElement?.contains(eventTarget)
    ) {
      details.cancel();
      return;
    }

    onOpenChange(false);
    const isOutsideDismiss =
      details.reason === "outside-press" || details.reason === "focus-out";
    if (!isOutsideDismiss || isInteractiveTarget(eventTarget)) {
      return;
    }
    restoreOnBlankDismissRef.current = true;
    window.requestAnimationFrame(restoreTriggerIfNonInteractive);
  };

  const handleOpenChangeComplete = (isNowOpen: boolean): void => {
    if (isNowOpen || !restoreOnBlankDismissRef.current) {
      return;
    }
    restoreOnBlankDismissRef.current = false;
    restoreTriggerIfNonInteractive();
  };

  const handleNavClick = (): void => {
    restoreOnBlankDismissRef.current = false;
    setSuppressReturnFocus(true);
    onOpenChange(false);
  };

  return (
    <Popover
      open={isOpen}
      onOpenChange={handleOpenChange}
      onOpenChangeComplete={handleOpenChangeComplete}
    >
      <PopoverContent
        anchor={anchorElement}
        side="bottom"
        align="end"
        sideOffset={10}
        collisionPadding={16}
        finalFocus={suppressReturnFocus ? "none" : () => anchorElement}
        className="border-rule-strong bg-popover text-popover-foreground m-0 w-56 origin-(--transform-origin) rounded-2xl border p-2 shadow-[var(--shadow-strong)] transition-[opacity,scale] duration-180 ease-out data-ending-style:scale-[0.97] data-ending-style:opacity-0 data-ending-style:duration-110 data-starting-style:scale-[0.96] data-starting-style:opacity-0 motion-reduce:transition-none forced-colors:border-[CanvasText]"
      >
        <nav aria-label="Homepage sections">
          <ul className="grid gap-0.5 text-sm">
            {menuLinks.map((link, index) => (
              <li
                key={link.href}
                className={
                  index === menuLinks.length - 1
                    ? "border-rule mt-1 border-t pt-1"
                    : undefined
                }
              >
                <Link
                  href={link.href}
                  prefetch={false}
                  onClick={handleNavClick}
                  className="text-foreground focus-visible:ring-ring focus-visible:ring-offset-popover [@media(hover:hover)_and_(pointer:fine)]:hover:bg-secondary/72 flex min-h-11 items-center rounded-xl px-3.5 font-medium transition-transform duration-150 ease-out focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-2 focus-visible:outline-transparent active:scale-[0.99]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </PopoverContent>
    </Popover>
  );
};
