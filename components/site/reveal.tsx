"use client";

import { useReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import {
  Children,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";

const easing = [0.22, 1, 0.36, 1] as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  scale?: number;
  trigger?: "inView" | "mount";
  amount?: number;
};

export function Reveal({
  children,
  className,
  delay = 0,
  y = 20,
  scale = 0.985,
  trigger = "inView",
  amount = 0.06,
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const initial = prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y, scale };
  const animate = prefersReducedMotion
    ? { opacity: 1 }
    : { opacity: 1, y: 0, scale: 1 };
  const transition = prefersReducedMotion
    ? { duration: 0.01 }
    : { duration: 0.6, delay, ease: easing };

  return (
    <motion.div
      className={className}
      initial={initial}
      {...(trigger === "mount"
        ? {
            animate,
          }
        : {
            whileInView: animate,
            viewport: { once: true, amount },
          })}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}

export function StaggerReveal({
  children,
  className,
  delay = 0,
  amount = 0.18,
  step = 0.06,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  amount?: number;
  step?: number;
}) {
  const items = Children.map(children, (child, index) => {
    if (!isValidElement(child)) {
      return child;
    }

    return cloneElement(child as ReactElement<StaggerItemProps>, {
      staggerIndex: index,
      staggerStep: step,
      staggerDelay: delay,
      viewportAmount: amount,
    });
  });

  return (
    <div className={cn("contents", className)}>
      {items}
    </div>
  );
}

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  staggerIndex?: number;
  staggerStep?: number;
  staggerDelay?: number;
  viewportAmount?: number;
};

export function StaggerItem({
  children,
  className,
  delay = 0,
  staggerIndex = 0,
  staggerStep = 0.06,
  staggerDelay = 0,
  viewportAmount = 0.18,
}: StaggerItemProps) {
  const prefersReducedMotion = useReducedMotion();
  const hidden = prefersReducedMotion
    ? { opacity: 0 }
    : { opacity: 0, y: 20, scale: 0.985 };
  const visible = prefersReducedMotion
    ? { opacity: 1 }
    : { opacity: 1, y: 0, scale: 1 };

  return (
    <motion.div
      className={className}
      initial={hidden}
      whileInView={visible}
      viewport={{ once: true, amount: viewportAmount }}
      transition={
        prefersReducedMotion
          ? { duration: 0.01 }
          : {
              duration: 0.54,
              delay: delay + staggerDelay + staggerIndex * staggerStep,
              ease: easing,
            }
      }
    >
      {children}
    </motion.div>
  );
}
