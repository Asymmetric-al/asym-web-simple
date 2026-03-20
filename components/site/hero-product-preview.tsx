"use client";

import {
  siteFloatTransition,
  useReducedMotion,
} from "@/lib/motion";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import Image from "next/image";
import type { ReactNode } from "react";

export function HeroProductPreview({
  screenshotSrc = "/dashboardmock.png",
  screenshotAlt,
  caption,
  className,
}: {
  screenshotSrc?: string;
  screenshotAlt: string;
  caption: ReactNode;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();
  const floatingProps = prefersReducedMotion
    ? {}
    : {
        animate: { y: [0, -10, 0] },
        transition: siteFloatTransition,
      };

  return (
    <div className={cn("relative mx-auto w-full max-w-5xl", className)}>
      <motion.div
        {...floatingProps}
        className="surface-panel surface-interactive relative overflow-hidden rounded-[1.85rem] border border-foreground/10 p-3 shadow-[0_28px_80px_-50px_rgba(22,33,43,0.52)] sm:rounded-[2rem] sm:p-4 dark:shadow-[0_28px_80px_-50px_rgba(0,0,0,0.65)]"
      >
        <div
          className="relative overflow-hidden rounded-[1.35rem] border border-foreground/10 sm:rounded-[1.5rem]"
          style={{
            maskImage:
              "linear-gradient(to bottom, black 54%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 54%, transparent 100%)",
          }}
        >
          <Image
            src={screenshotSrc}
            alt={screenshotAlt}
            width={1920}
            height={1080}
            sizes="(min-width: 1024px) 58rem, 100vw"
            className="h-auto w-full object-cover contrast-[1.08] dark:contrast-100"
          />
        </div>
        <div className="text-foreground/88 border-foreground/10 bg-secondary/52 -mt-1 mx-0.5 mb-0.5 rounded-[1.25rem] border px-4 py-3 text-sm leading-6 sm:rounded-[1.35rem]">
          {caption}
        </div>
      </motion.div>
    </div>
  );
}
