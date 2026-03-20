"use client";

import { motion, type MotionProps, type Variants } from "motion/react";
import {
  createContext,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react";

function subscribeToReducedMotion(callback: () => void): () => void {
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getReducedMotionSnapshot(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot(): boolean {
  return false;
}

const ReducedMotionContext = createContext<boolean>(false);

export const siteEase = [0.23, 1, 0.32, 1] as const;
export const siteEaseGentle = [0.22, 1, 0.36, 1] as const;
export const siteRevealDuration = 0.32;
export const siteRevealDistance = 10;
export const siteRevealScale = 0.985;
export const siteViewportMargin = "-8% 0px -10% 0px";
export const siteFloatTransition = {
  duration: 9,
  repeat: Number.POSITIVE_INFINITY,
  repeatType: "mirror" as const,
  ease: "easeInOut" as const,
};
export const siteHoverTransition = {
  duration: 0.24,
  ease: siteEaseGentle,
};

export function useReducedMotion(): boolean {
  return useContext(ReducedMotionContext);
}

export function ReducedMotionProvider({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  const prefersReducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  return (
    <ReducedMotionContext.Provider value={prefersReducedMotion}>
      {children}
    </ReducedMotionContext.Provider>
  );
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.048,
    },
  },
};

export const reducedMotionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const defaultTransition = {
  duration: 0.28,
  ease: siteEaseGentle,
};

export const springTransition = {
  type: "spring" as const,
  stiffness: 300,
  damping: 30,
};

export function getReducedMotionTransition(
  delay = 0
): NonNullable<MotionProps["transition"]> {
  return {
    duration: 0.01,
    delay,
  };
}

export function getRevealStates(
  prefersReducedMotion: boolean,
  {
    y = siteRevealDistance,
    scale = siteRevealScale,
    blur = 0,
  }: {
    y?: number;
    scale?: number;
    blur?: number;
  } = {}
): {
  hidden: Record<string, number | string>;
  visible: Record<string, number | string>;
} {
  if (prefersReducedMotion) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    };
  }

  return {
    hidden: {
      opacity: 0,
      y,
      scale,
      ...(blur > 0 ? { filter: `blur(${blur}px)` } : {}),
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      ...(blur > 0 ? { filter: "blur(0px)" } : {}),
    },
  };
}

export function getRevealTransition(
  prefersReducedMotion: boolean,
  {
    delay = 0,
    duration = siteRevealDuration,
  }: {
    delay?: number;
    duration?: number;
  } = {}
): NonNullable<MotionProps["transition"]> {
  if (prefersReducedMotion) {
    return getReducedMotionTransition(delay);
  }

  return {
    duration,
    delay,
    ease: siteEaseGentle,
  };
}

type MotionDivProps = {
  variants?: Variants;
  children?: ReactNode;
  className?: string;
} & MotionProps;

export function MotionDiv({
  variants = fadeInUp,
  children,
  className,
  ...props
}: MotionDivProps): ReactNode {
  const prefersReducedMotion = useReducedMotion();

  const activeVariants = prefersReducedMotion
    ? reducedMotionVariants
    : variants;
  const activeTransition = prefersReducedMotion
    ? { duration: 0.01 }
    : defaultTransition;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={activeVariants}
      transition={activeTransition}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function MotionSection({
  variants = fadeInUp,
  children,
  className,
  ...props
}: MotionDivProps): ReactNode {
  const prefersReducedMotion = useReducedMotion();

  const activeVariants = prefersReducedMotion
    ? reducedMotionVariants
    : variants;
  const activeTransition = prefersReducedMotion
    ? { duration: 0.01 }
    : defaultTransition;

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={activeVariants}
      transition={activeTransition}
      className={className}
      {...props}
    >
      {children}
    </motion.section>
  );
}

export function StaggerContainer({
  children,
  className,
  ...props
}: {
  children: ReactNode;
  className?: string;
} & MotionProps): ReactNode {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={prefersReducedMotion ? reducedMotionVariants : staggerContainer}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  ...props
}: {
  children: ReactNode;
  className?: string;
} & MotionProps): ReactNode {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      variants={prefersReducedMotion ? reducedMotionVariants : fadeInUp}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
