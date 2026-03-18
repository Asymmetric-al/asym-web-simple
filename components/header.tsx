"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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
        <div className="pointer-events-auto flex items-center justify-between rounded-[1.75rem] border border-foreground/10 bg-card/80 px-4 py-3 shadow-[0_30px_80px_-50px_rgba(22,33,43,0.55)] backdrop-blur-xl sm:px-5">
          <BrandLockup />

          <nav
            className="hidden items-center gap-1 rounded-full border border-foreground/8 bg-background/70 p-1.5 lg:flex"
            aria-label="Primary navigation"
          >
            {navigationLinks.map((link) => {
              const active =
                pathname === link.href || pathname.startsWith(`${link.href}/`);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-foreground/5 hover:text-foreground",
                    active && "bg-secondary text-secondary-foreground shadow-sm"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <Link
              href={siteConfig.cta.secondary.href}
              className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {siteConfig.cta.secondary.label}
            </Link>
            <Link
              href={siteConfig.cta.primary.href}
              className={cn(
                buttonVariants({ size: "lg" }),
                "rounded-full px-5 shadow-[0_20px_48px_-32px_rgba(30,58,79,0.8)]"
              )}
            >
              {siteConfig.cta.primary.label}
              <MoveRight className="size-4" />
            </Link>
          </div>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className={cn(
                buttonVariants({ variant: "outline", size: "icon-lg" }),
                "lg:hidden"
              )}
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[88vw] max-w-sm border-l border-foreground/10 bg-card/96 px-0"
            >
              <SheetHeader className="border-b border-foreground/8 pb-5">
                <BrandLockup compact />
                <SheetTitle className="font-heading text-xl tracking-[-0.04em]">
                  Clear tools for serious sending work.
                </SheetTitle>
                <SheetDescription className="max-w-[28ch] text-sm leading-6">
                  Navigate the platform, learn the philosophy, or join the
                  waitlist for early conversations.
                </SheetDescription>
              </SheetHeader>

              <div className="flex flex-1 flex-col px-6 py-6">
                <nav className="space-y-1" aria-label="Mobile navigation">
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

                <div className="mt-8 rounded-[1.6rem] border border-foreground/10 bg-[linear-gradient(145deg,rgba(232,242,250,0.95),rgba(250,246,239,0.95))] p-5 shadow-[0_24px_55px_-42px_rgba(22,33,43,0.85)]">
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
                  <div className="mt-5 flex flex-col gap-2">
                    <Link
                      href={siteConfig.cta.primary.href}
                      onClick={() => setOpen(false)}
                      className={cn(buttonVariants({ size: "lg" }), "w-full")}
                    >
                      {siteConfig.cta.primary.label}
                    </Link>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => {
                        setOpen(false);
                        window.location.href = `mailto:${siteConfig.email}`;
                      }}
                    >
                      Email {siteConfig.email}
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </motion.div>
    </header>
  );
}
