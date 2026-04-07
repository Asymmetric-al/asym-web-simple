"use client";

import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button-variants";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { navigationLinks, siteConfig, supportLinks } from "@/lib/config";
import { useReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { Menu, MoveRight, X } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { SiteLogoMark } from "@/components/site/site-logo-mark";

const pageLinks = [...navigationLinks, ...supportLinks];

function BrandLockup({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      href="/"
      className="group focus-visible:ring-ring focus-visible:ring-offset-background flex min-w-0 items-center gap-3 rounded-full focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
      aria-label={`${siteConfig.name} home`}
    >
      <div className="border-foreground/10 flex size-11 items-center justify-center rounded-full border bg-[linear-gradient(135deg,rgba(221,242,255,0.95),rgba(231,238,225,0.95))] shadow-[0_14px_30px_-20px_rgba(30,58,79,0.45)] transition-transform duration-300 group-hover:-translate-y-0.5">
        <SiteLogoMark className="text-primary size-[1.35rem]" />
      </div>
      <span className="text-resilient font-heading text-foreground min-w-0 text-[1.02rem] leading-none font-semibold tracking-[-0.04em]">
        {compact ? siteConfig.shortName : siteConfig.name}
      </span>
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuTriggerRef = useRef<HTMLButtonElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 18);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 pt-4 sm:pt-5">
      <motion.div
        initial={
          prefersReducedMotion ? false : { opacity: 0, y: -12 }
        }
        animate={{ opacity: 1, y: 0 }}
        transition={
          prefersReducedMotion
            ? { duration: 0.01 }
            : { duration: 0.36, ease: [0.22, 1, 0.36, 1] }
        }
        className="mx-auto max-w-[80rem] px-4 sm:px-6 lg:px-8"
      >
        <div
          className={cn(
            "page-shell-glow surface-hero surface-interactive pointer-events-auto flex items-center justify-between gap-3 rounded-[1.85rem] px-4 py-3 transition-[padding,background-color,box-shadow] duration-300 sm:px-5 lg:gap-5",
            scrolled &&
              "bg-background/82 supports-[backdrop-filter]:bg-background/68 shadow-[0_30px_78px_-50px_rgba(22,33,43,0.48)]"
          )}
        >
          <div className="flex min-w-0 shrink-0 items-center gap-4">
            <BrandLockup />
          </div>

          <nav
            className="bg-background/52 hidden min-w-0 flex-1 items-center justify-center gap-1 rounded-full p-1.5 backdrop-blur-sm xl:flex"
            aria-label="Primary navigation"
          >
            {navigationLinks.map((link) => {
              const active =
                pathname === link.href || pathname.startsWith(`${link.href}/`);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "text-muted-foreground max-w-[9.5rem] min-w-0 rounded-full px-3.5 py-2 text-center text-sm leading-[1.2] font-medium text-pretty transition-[background-color,color,transform] duration-200",
                    active
                      ? "bg-secondary text-secondary-foreground shadow-sm"
                      : "hover:bg-background/88 hover:text-foreground hover:-translate-y-0.5"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden min-w-0 shrink items-center justify-end gap-2 xl:flex">
            <ThemeToggle />
            <Link
              href={siteConfig.cta.secondary.href}
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "text-muted-foreground hidden max-w-[10rem] px-3.5 2xl:inline-flex"
              )}
            >
              {siteConfig.cta.secondary.label}
            </Link>
            <Link
              href={siteConfig.cta.primary.href}
              className={cn(
                buttonVariants({ size: "lg" }),
                "max-w-[11rem] px-5"
              )}
            >
              {siteConfig.cta.primary.label}
              <MoveRight data-icon="inline-end" />
            </Link>
          </div>

          <Sheet
            open={open}
            onOpenChange={(next) => {
              setOpen(next);
              if (!next) {
                requestAnimationFrame(() => {
                  menuTriggerRef.current?.focus();
                });
              }
            }}
          >
            <div className="flex items-center gap-2 xl:hidden">
              <ThemeToggle />
              <SheetTrigger
                ref={menuTriggerRef}
                className={cn(
                  buttonVariants({ variant: "outline", size: "icon-lg" })
                )}
                aria-label="Open menu"
              >
                <Menu />
              </SheetTrigger>
            </div>
            <SheetContent
              side="right"
              showCloseButton={false}
              className="border-foreground/10 bg-card/96 w-[88vw] max-w-sm border-l px-0"
            >
              <SheetHeader className="border-foreground/8 border-b pb-5">
                <div className="flex items-start justify-between gap-3">
                  <BrandLockup compact />
                  <div className="flex shrink-0 items-center gap-2">
                    <ThemeToggle />
                    <SheetClose
                      render={
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="shrink-0"
                          aria-label="Close menu"
                        />
                      }
                    >
                      <X className="size-4" />
                      <span className="sr-only">Close</span>
                    </SheetClose>
                  </div>
                </div>
                <SheetTitle className="font-heading text-xl tracking-[-0.04em]">
                  Mission operating system
                </SheetTitle>
                <SheetDescription className="max-w-[28ch] text-sm leading-6">
                  Navigate the platform, learn the philosophy, or start a
                  conversation.
                </SheetDescription>
              </SheetHeader>

              <div className="flex flex-1 flex-col px-6 py-6">
                <nav
                  className="flex flex-col gap-1"
                  aria-label="Mobile navigation"
                >
                  {pageLinks.map((link) => {
                    const active =
                      pathname === link.href ||
                      pathname.startsWith(`${link.href}/`);

                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "text-foreground hover:bg-secondary/80 flex min-w-0 items-center justify-between gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-colors",
                          active && "bg-secondary text-secondary-foreground"
                        )}
                      >
                        <span className="text-resilient min-w-0 flex-1 text-left leading-snug">
                          {link.label}
                        </span>
                        <MoveRight className="text-muted-foreground size-4 shrink-0" />
                      </Link>
                    );
                  })}
                </nav>

                <div className="surface-card surface-interactive mt-8 rounded-[1.75rem] p-5">
                  <p className="text-primary/70 font-mono text-[0.72rem] tracking-[0.28em] uppercase">
                    Primary next step
                  </p>
                  <p className="font-heading text-foreground mt-3 text-xl font-semibold tracking-[-0.04em]">
                    Join the build community.
                  </p>
                  <p className="text-muted-foreground mt-2 text-sm leading-6">
                    Pilot agencies, senior builders, and missions-minded donors
                    can all start with the same conversation.
                  </p>
                  <SheetFooter className="mt-5 p-0">
                    <Link
                      href={siteConfig.cta.primary.href}
                      onClick={() => setOpen(false)}
                      className={cn(buttonVariants({ size: "lg" }), "w-full")}
                    >
                      {siteConfig.cta.primary.label}
                    </Link>
                    <Link
                      href={`mailto:${siteConfig.email}`}
                      onClick={() => setOpen(false)}
                      className={cn(
                        buttonVariants({ variant: "outline", size: "lg" }),
                        "w-full break-words"
                      )}
                    >
                      Email {siteConfig.email}
                    </Link>
                  </SheetFooter>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </motion.div>
    </header>
  );
}
