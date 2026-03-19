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
        className="surface-hero relative overflow-hidden rounded-[2.35rem] p-3 sm:p-4"
      >
        <div className="relative overflow-hidden rounded-[1.9rem] border border-foreground/10">
          <Image
            src={sceneSrc}
            alt={sceneAlt}
            width={1440}
            height={960}
            priority={priority}
            sizes="(min-width: 1024px) 42vw, 100vw"
            className="h-[23rem] w-full object-cover object-center sm:h-[29rem]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(22,33,43,0.18))]" />
          <div className="absolute left-5 top-5 rounded-full border border-white/35 bg-white/74 px-3 py-1 font-mono text-[0.68rem] uppercase tracking-[0.26em] text-primary shadow-sm backdrop-blur-sm">
            {badge}
          </div>
          <div className="absolute bottom-5 left-5 flex flex-wrap gap-2">
            {["Missions-first", "Observable", "Sovereign by design"].map(
              (item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/20 bg-foreground/28 px-3 py-1 font-mono text-[0.66rem] uppercase tracking-[0.22em] text-white/88 backdrop-blur-sm"
                >
                  {item}
                </span>
              )
            )}
          </div>
        </div>
      </motion.div>

      <motion.div
        {...floatingProps}
        className="surface-panel relative -mt-18 ml-auto w-[88%] rounded-[2rem] p-4 sm:-mt-24 sm:w-[82%] sm:p-5"
      >
        <Image
          src={screenshotSrc}
          alt={screenshotAlt}
          width={1440}
          height={960}
          priority={priority}
          sizes="(min-width: 1024px) 34vw, (min-width: 640px) 82vw, 88vw"
          className="rounded-[1.45rem] border border-foreground/10 object-cover shadow-[0_18px_45px_-28px_rgba(22,33,43,0.55)]"
        />
        <div className="mt-4 flex flex-col gap-3 rounded-[1.5rem] bg-secondary/56 px-4 py-3 text-sm leading-6 text-foreground/86">
          <div className="min-w-0">{caption}</div>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-foreground/10 bg-background/76 px-3 py-1 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-muted-foreground">
              Shared source of truth
            </span>
            <span className="rounded-full border border-foreground/10 bg-background/76 px-3 py-1 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-muted-foreground">
              Clear operator surfaces
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
