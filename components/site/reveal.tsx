"use client";

import { useReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import type { ReactNode } from "react";

const easing = [0.22, 1, 0.36, 1] as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  scale?: number;
};

export function Reveal({
  children,
  className,
  delay = 0,
  y = 20,
  scale = 0.985,
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y, scale }}
      whileInView={
        prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }
      }
      viewport={{ once: true, amount: 0.18 }}
      transition={
        prefersReducedMotion
          ? { duration: 0.01 }
          : { duration: 0.6, delay, ease: easing }
      }
    >
      {children}
    </motion.div>
  );
}

export function StaggerReveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={cn("contents", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: prefersReducedMotion
            ? { duration: 0.01 }
            : {
                delayChildren: delay,
                staggerChildren: 0.06,
              },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={{
        hidden: prefersReducedMotion
          ? { opacity: 0 }
          : { opacity: 0, y: 20, scale: 0.985 },
        visible: prefersReducedMotion
          ? { opacity: 1 }
          : { opacity: 1, y: 0, scale: 1 },
      }}
      transition={
        prefersReducedMotion
          ? { duration: 0.01 }
          : { duration: 0.54, ease: easing }
      }
    >
      {children}
    </motion.div>
  );
}
