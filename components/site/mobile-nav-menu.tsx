"use client";

import {
  Popover,
  PopoverContent,
  PopoverTitle,
  PopoverTrigger,
} from "@ui-sdk/react/popover";
import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { CloseIcon, MenuIcon } from "@/components/site/icons";
import { navigationLinks } from "@/lib/config";
import type { ReactNode } from "react";

const noop = () => {
  // Intentionally empty unsubscribe for static client hydration store.
};

const emptySubscribe = () => noop;

const useIsClient = (): boolean =>
  useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

/**
Mobile-only section navigation popover powered by `@ui-sdk/react/popover`.
Renders an exact-width non-interactive spacer pre-hydration so no-JS pages never
ship inert buttons and mobile headers keep `0px` layout shift. Restores focus
to the trigger on Escape or dismissal while letting anchor link clicks move
directly to their target section.
*/
export const MobileNavMenu = (): ReactNode => {
  const isMounted = useIsClient();
  const [open, setOpen] = useState(false);
  const [suppressReturnFocus, setSuppressReturnFocus] = useState(false);

  if (!isMounted) {
    return <span className="size-11 shrink-0 md:hidden" aria-hidden="true" />;
  }

  const handleOpenChange = (isNextOpen: boolean) => {
    if (isNextOpen) {
      setSuppressReturnFocus(false);
    }
    setOpen(isNextOpen);
  };

  const handleNavClick = () => {
    setSuppressReturnFocus(true);
    setOpen(false);
  };

  return (
    <div className="md:hidden">
      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger
          aria-label="Page sections"
          className="border-input bg-background/85 text-foreground hover:bg-secondary/72 focus-visible:ring-ring focus-visible:ring-offset-background inline-flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full border select-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent active:scale-[0.97] forced-colors:border-[ButtonBorder]"
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
          className="border-rule bg-popover text-popover-foreground shadow-card m-0 w-56 origin-(--transform-origin) rounded-[1.35rem] border p-2 transition-[opacity,scale] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] data-ending-style:scale-96 data-ending-style:opacity-0 data-starting-style:scale-96 data-starting-style:opacity-0 motion-reduce:transition-none forced-colors:border-[CanvasText]"
        >
          <PopoverTitle className="sr-only">Page sections</PopoverTitle>
          <nav aria-label="Page sections">
            <ul className="grid gap-0.5 text-sm">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    prefetch={false}
                    onClick={handleNavClick}
                    className="text-foreground hover:bg-secondary/72 focus-visible:ring-ring focus-visible:ring-offset-popover flex min-h-11 items-center rounded-xl px-3.5 font-medium focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-2 focus-visible:outline-transparent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="border-rule mt-1 border-t pt-1">
                <Link
                  href="/#where-things-stand"
                  prefetch={false}
                  onClick={handleNavClick}
                  className="text-foreground hover:bg-secondary/72 focus-visible:ring-ring focus-visible:ring-offset-popover flex min-h-11 items-center rounded-xl px-3.5 font-medium focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-2 focus-visible:outline-transparent"
                >
                  Where things stand
                </Link>
              </li>
            </ul>
          </nav>
        </PopoverContent>
      </Popover>
    </div>
  );
};
