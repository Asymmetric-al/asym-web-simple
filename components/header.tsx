"use client";

import { buttonVariants } from "@/components/ui/button-variants";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { navigationLinks, siteConfig, supportLinks } from "@/lib/config";
import { cn } from "@/lib/utils";
import { Menu, MoveRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const pageLinks = [...navigationLinks, ...supportLinks];

function BrandLockup({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      href="/"
      className="group flex items-center gap-3 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      aria-label={`${siteConfig.name} home`}
    >
      <div className="flex size-11 items-center justify-center rounded-full border border-foreground/10 bg-[linear-gradient(135deg,rgba(221,242,255,0.95),rgba(231,238,225,0.95))] shadow-[0_14px_30px_-20px_rgba(30,58,79,0.45)] transition-transform duration-300 group-hover:-translate-y-0.5">
        <span className="font-mono text-[0.72rem] font-semibold tracking-[0.24em] text-primary">
          1→∞
        </span>
      </div>
      <div className="flex flex-col">
        <span className="font-heading text-[1.02rem] font-semibold tracking-[-0.04em] text-foreground">
          {siteConfig.name}
        </span>
        {!compact ? (
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.28em] text-muted-foreground">
            {siteConfig.mission}
          </span>
        ) : null}
      </div>
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 pt-4 sm:pt-5">
      <motion.div
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-[80rem] px-4 sm:px-6 lg:px-8"
      >
        <div className="pointer-events-auto page-shell-glow surface-panel flex items-center justify-between rounded-[1.85rem] px-4 py-3 sm:px-5">
          <div className="flex items-center gap-6">
            <BrandLockup />
            <p className="hidden max-w-[20ch] text-sm leading-6 text-muted-foreground xl:block">
              Calm, high-trust software for the operational weight of sending.
            </p>
          </div>

          <nav className="hidden items-center gap-1 rounded-full bg-background/50 p-1 lg:flex" aria-label="Primary navigation">
            {navigationLinks.map((link) => {
              const active =
                pathname === link.href || pathname.startsWith(`${link.href}/`);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium text-muted-foreground",
                    active
                      ? "bg-secondary text-secondary-foreground shadow-sm"
                      : "hover:bg-background/88 hover:text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <ThemeToggle />
            <Link
              href={siteConfig.cta.secondary.href}
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "px-3.5 text-muted-foreground"
              )}
            >
              {siteConfig.cta.secondary.label}
            </Link>
            <Link
              href={siteConfig.cta.primary.href}
              className={cn(buttonVariants({ size: "lg" }), "px-5")}
            >
              {siteConfig.cta.primary.label}
              <MoveRight data-icon="inline-end" />
            </Link>
          </div>

          <Sheet open={open} onOpenChange={setOpen}>
            <div className="flex items-center gap-2 lg:hidden">
              <ThemeToggle />
              <SheetTrigger
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
              className="w-[88vw] max-w-sm border-l border-foreground/10 bg-card/96 px-0"
            >
              <SheetHeader className="border-b border-foreground/8 pb-5">
                <div className="flex items-start justify-between gap-4">
                  <BrandLockup compact />
                  <ThemeToggle />
                </div>
                <SheetTitle className="font-heading text-xl tracking-[-0.04em]">
                  Clear tools for serious sending work.
                </SheetTitle>
                <SheetDescription className="max-w-[28ch] text-sm leading-6">
                  Navigate the platform, learn the philosophy, or join the
                  waitlist for early conversations.
                </SheetDescription>
              </SheetHeader>

              <div className="flex flex-1 flex-col px-6 py-6">
                <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
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
                          "flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary/80",
                          active && "bg-secondary text-secondary-foreground"
                        )}
                      >
                        <span>{link.label}</span>
                        <MoveRight className="size-4 text-muted-foreground" />
                      </Link>
                    );
                  })}
                </nav>

                <div className="surface-card mt-8 rounded-[1.75rem] p-5">
                  <p className="font-mono text-[0.72rem] uppercase tracking-[0.28em] text-primary/70">
                    Primary next step
                  </p>
                  <p className="mt-3 font-heading text-xl font-semibold tracking-[-0.04em] text-foreground">
                    Join the build community.
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
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
                        "w-full"
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
