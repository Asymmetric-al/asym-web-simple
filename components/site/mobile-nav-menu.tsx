"use client";

import { Popover, PopoverContent, PopoverTrigger } from "@ui-sdk/react/popover";
import Link from "next/link";
import { useRef, useState } from "react";
import { CloseIcon, MenuIcon } from "@/components/site/icons";
import { navigationLinks } from "@/lib/config";
import { useIsClient } from "@/lib/use-is-client";
import type { ComponentProps, ReactNode } from "react";

const INTERACTIVE_OUTSIDE_SELECTOR =
  'a[href], button, input, textarea, select, summary, [role="button"], [role="radio"], [role="link"], [tabindex="0"]';

const isInteractiveTarget = (target: EventTarget | null | undefined): boolean =>
  target instanceof Element &&
  target.closest(INTERACTIVE_OUTSIDE_SELECTOR) !== null;

/**
Mobile-only section navigation popover powered by `@ui-sdk/react/popover`.
Renders an exact-width non-interactive spacer pre-hydration so no-JS pages never
ship inert buttons and mobile headers keep `0px` layout shift. Restores focus
to the trigger on Escape, trigger close, and non-interactive blank-space
dismissal, while letting anchor links and interactive outside controls retain
natural navigation and focus.
*/
export const MobileNavMenu = ({
  isConfigured = false,
}: {
  readonly isConfigured?: boolean;
}): ReactNode => {
  const isMounted = useIsClient();
  const [open, setOpen] = useState(false);
  const [suppressReturnFocus, setSuppressReturnFocus] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const restoreOnBlankDismissRef = useRef(false);

  if (!isMounted) {
    return <span className="size-11 shrink-0 md:hidden" aria-hidden="true" />;
  }

  const menuLinks = [
    ...navigationLinks,
    isConfigured
      ? { label: "Where things stand", href: "/#where-things-stand" }
      : {
          label: "Pre-launch checklist",
          href: "/early-access/status?state=unavailable",
        },
  ] as const;

  const restoreTriggerIfNonInteractive = () => {
    const active = document.activeElement;
    if (!active || active === document.body || active.tagName === "MAIN") {
      triggerRef.current?.focus();
    }
  };

  const handleOpenChange: NonNullable<
    ComponentProps<typeof Popover>["onOpenChange"]
  > = (isNextOpen, details) => {
    if (isNextOpen) {
      setSuppressReturnFocus(false);
      restoreOnBlankDismissRef.current = false;
      setOpen(true);
      return;
    }

    setOpen(false);
    // `<main tabIndex={-1}>` is programmatically focusable for the skip link, so a click or touch tap on blank page space can move focus to `<main>` instead of returning it to the trigger. Restore trigger focus both on the next frame (mouse) and when exit completes (after touch synthetic focus) unless a real interactive control was targeted.
    const isOutsideDismiss =
      details.reason === "outside-press" || details.reason === "focus-out";
    if (!isOutsideDismiss || isInteractiveTarget(details.event?.target)) {
      return;
    }
    restoreOnBlankDismissRef.current = true;
    window.requestAnimationFrame(restoreTriggerIfNonInteractive);
  };

  const handleOpenChangeComplete = (isNowOpen: boolean) => {
    if (isNowOpen || !restoreOnBlankDismissRef.current) {
      return;
    }
    restoreOnBlankDismissRef.current = false;
    restoreTriggerIfNonInteractive();
  };

  const handleNavClick = () => {
    restoreOnBlankDismissRef.current = false;
    setSuppressReturnFocus(true);
    setOpen(false);
  };

  return (
    <div className="md:hidden">
      {open ? (
        <div
          aria-hidden="true"
          className="bg-foreground/20 pointer-events-none fixed inset-0 top-16 z-40 dark:bg-black/50"
        />
      ) : null}
      <Popover
        open={open}
        onOpenChange={handleOpenChange}
        onOpenChangeComplete={handleOpenChangeComplete}
      >
        <PopoverTrigger
          ref={triggerRef}
          aria-label="Page sections"
          className="border-input bg-background text-foreground focus-visible:ring-ring focus-visible:ring-offset-background inline-flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full border transition-transform duration-150 select-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent active:scale-[0.97] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-secondary/72 forced-colors:border-[ButtonBorder]"
        >
          {open ? (
            <CloseIcon className="size-4" />
          ) : (
            <MenuIcon className="size-4" />
          )}
        </PopoverTrigger>
        <PopoverContent
          side="bottom"
          align="end"
          sideOffset={10}
          collisionPadding={16}
          finalFocus={suppressReturnFocus ? "none" : "trigger"}
          className="border-rule-strong bg-popover text-popover-foreground m-0 w-56 origin-(--transform-origin) rounded-xl border p-2 shadow-[var(--shadow-strong)] transition-[opacity,scale] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] data-ending-style:scale-96 data-ending-style:opacity-0 data-starting-style:scale-96 data-starting-style:opacity-0 motion-reduce:transition-none forced-colors:border-[CanvasText]"
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
                    className="text-foreground focus-visible:ring-ring focus-visible:ring-offset-popover flex min-h-11 items-center rounded-sm px-3.5 font-medium focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-2 focus-visible:outline-transparent [@media(hover:hover)_and_(pointer:fine)]:hover:bg-secondary/72"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </PopoverContent>
      </Popover>
    </div>
  );
};
