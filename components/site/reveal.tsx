"use client";

import {
  getRevealStates,
  getRevealTransition,
  siteRevealDuration,
  siteRevealDistance,
  siteRevealScale,
  siteViewportMargin,
  useReducedMotion,
} from "@/lib/motion";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import {
  Children,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";

type RevealProps = {
  children: ReactNode;
  className?: string | undefined;
  delay?: number;
  y?: number;
  scale?: number;
  blur?: number;
  trigger?: "inView" | "mount";
  amount?: number;
  margin?: string | undefined;
};

export function Reveal({
  children,
  className,
  delay = 0,
  y = siteRevealDistance,
  scale = siteRevealScale,
  blur = 0,
  trigger = "inView",
  amount = 0.16,
  margin = siteViewportMargin,
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const { hidden, visible } = getRevealStates(prefersReducedMotion, {
    y,
    scale,
    blur,
  });
  const transition = getRevealTransition(prefersReducedMotion, { delay });

  return (
    <motion.div
      className={className}
      initial={hidden}
      {...(trigger === "mount"
        ? {
            animate: visible,
          }
        : {
            whileInView: visible,
            viewport: { once: true, amount, margin },
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
  amount = 0.16,
  margin = siteViewportMargin,
  step = 0.045,
}: {
  children: ReactNode;
  className?: string | undefined;
  delay?: number;
  amount?: number;
  margin?: string | undefined;
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
      viewportMargin: margin,
    });
  });

  return <div className={cn("contents", className)}>{items}</div>;
}

type StaggerItemProps = {
  children: ReactNode;
  className?: string | undefined;
  delay?: number;
  staggerIndex?: number;
  staggerStep?: number;
  staggerDelay?: number;
  viewportAmount?: number;
  viewportMargin?: string | undefined;
};

export function StaggerItem({
  children,
  className,
  delay = 0,
  staggerIndex = 0,
  staggerStep = 0.045,
  staggerDelay = 0,
  viewportAmount = 0.16,
  viewportMargin = siteViewportMargin,
}: StaggerItemProps) {
  const prefersReducedMotion = useReducedMotion();
  const { hidden, visible } = getRevealStates(prefersReducedMotion);

  return (
    <motion.div
      className={className}
      initial={hidden}
      whileInView={visible}
      viewport={{ once: true, amount: viewportAmount, margin: viewportMargin }}
      transition={getRevealTransition(prefersReducedMotion, {
        delay: delay + staggerDelay + staggerIndex * staggerStep,
        duration: siteRevealDuration,
      })}
    >
      {children}
    </motion.div>
  );
}
