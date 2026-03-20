"use client";

import {
  getRevealStates,
  getRevealTransition,
  siteFloatTransition,
  useReducedMotion,
} from "@/lib/motion";
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
        transition: siteFloatTransition,
      };
  const heroStates = getRevealStates(prefersReducedMotion, {
    y: 12,
    scale: 0.99,
  });

  return (
    <div className={cn("relative", className)}>
      <motion.div
        initial={heroStates.hidden}
        animate={heroStates.visible}
        {...(!prefersReducedMotion
          ? {
              whileHover: {
                y: -4,
                scale: 1.004,
              },
            }
          : {})}
        transition={getRevealTransition(prefersReducedMotion, {
          duration: 0.34,
        })}
        className="surface-hero surface-interactive relative overflow-hidden rounded-[2.35rem] p-3 sm:p-4"
      >
        <div className="border-foreground/10 relative overflow-hidden rounded-[1.9rem] border">
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
          <div className="text-primary absolute top-5 left-5 rounded-full border border-white/45 bg-white/82 px-3 py-1 font-mono text-[0.68rem] tracking-[0.26em] uppercase shadow-sm backdrop-blur-sm">
            {badge}
          </div>
          <div className="bg-foreground/38 absolute top-5 right-5 rounded-full border border-white/32 px-3 py-1 font-mono text-[0.64rem] tracking-[0.22em] text-white/95 uppercase backdrop-blur-sm">
            Calm operator UX
          </div>
          <div className="absolute bottom-5 left-5 flex flex-wrap gap-2">
            {["Missions-first", "Observable", "Sovereign by design"].map(
              (item) => (
                <span
                  key={item}
                  className="bg-foreground/40 rounded-full border border-white/30 px-3 py-1 font-mono text-[0.66rem] tracking-[0.22em] text-white/95 uppercase backdrop-blur-sm"
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
        className="surface-panel surface-interactive relative -mt-18 ml-auto w-[88%] rounded-[2rem] p-4 sm:-mt-24 sm:w-[82%] sm:p-5"
      >
        <Image
          src={screenshotSrc}
          alt={screenshotAlt}
          width={1440}
          height={960}
          sizes="(min-width: 1024px) 34vw, (min-width: 640px) 82vw, 88vw"
          className="border-foreground/10 rounded-[1.45rem] border object-cover shadow-[0_18px_45px_-28px_rgba(22,33,43,0.55)]"
        />
        <div className="bg-secondary/56 text-foreground/86 mt-4 flex flex-col gap-3 rounded-[1.5rem] px-4 py-3 text-sm leading-6">
          <div className="min-w-0">{caption}</div>
          <div className="flex flex-wrap gap-2">
            <span className="border-foreground/10 bg-background/76 text-muted-foreground rounded-full border px-3 py-1 font-mono text-[0.68rem] tracking-[0.2em] uppercase">
              Shared source of truth
            </span>
            <span className="border-foreground/10 bg-background/76 text-muted-foreground rounded-full border px-3 py-1 font-mono text-[0.68rem] tracking-[0.2em] uppercase">
              Clear operator surfaces
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
