"use client";

import { useReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import Image from "next/image";
import type { ReactNode } from "react";

export function MediaStage({
  sceneSrc = "/BG.jpg",
  sceneAlt,
  screenshotSrc = "/dashboardmock.png",
  screenshotAlt,
  badge,
  caption,
  className,
  priority = false,
}: {
  sceneSrc?: string;
  sceneAlt: string;
  screenshotSrc?: string;
  screenshotAlt: string;
  badge: string;
  caption: ReactNode;
  className?: string;
  priority?: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();
  const floatingProps = prefersReducedMotion
    ? {}
    : {
        animate: {
          y: [0, -10, 0],
        },
        transition: {
          duration: 9,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "mirror" as const,
          ease: "easeInOut" as const,
        },
      };

  return (
    <div className={cn("relative", className)}>
      <motion.div
        initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 26, scale: 0.98 }}
        animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
        transition={
          prefersReducedMotion
            ? { duration: 0.01 }
            : { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
        }
        className="relative overflow-hidden rounded-[2.2rem] border border-foreground/10 bg-secondary/40 shadow-[0_35px_90px_-55px_rgba(22,33,43,0.85)]"
      >
        <Image
          src={sceneSrc}
          alt={sceneAlt}
          width={1440}
          height={960}
          priority={priority}
          className="h-[24rem] w-full object-cover object-center sm:h-[30rem]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(22,33,43,0.14))]" />
        <div className="absolute left-5 top-5 rounded-full border border-white/35 bg-white/70 px-3 py-1 font-mono text-[0.68rem] uppercase tracking-[0.26em] text-primary shadow-sm backdrop-blur-sm">
          {badge}
        </div>
      </motion.div>

      <motion.div
        {...floatingProps}
        className="relative -mt-18 ml-auto w-[88%] rounded-[2rem] border border-foreground/10 bg-card/94 p-4 shadow-[0_42px_95px_-58px_rgba(22,33,43,0.9)] backdrop-blur-md sm:-mt-24 sm:w-[82%] sm:p-5"
      >
        <Image
          src={screenshotSrc}
          alt={screenshotAlt}
          width={1440}
          height={960}
          className="rounded-[1.35rem] border border-foreground/10 object-cover shadow-[0_18px_45px_-28px_rgba(22,33,43,0.55)]"
        />
        <div className="mt-4 rounded-[1.4rem] bg-secondary/55 px-4 py-3 text-sm leading-6 text-foreground/86">
          {caption}
        </div>
      </motion.div>
    </div>
  );
}
