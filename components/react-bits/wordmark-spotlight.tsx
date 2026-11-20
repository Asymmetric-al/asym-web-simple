"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

const maskAt = (x: number, y: number): string =>
  `radial-gradient(circle 280px at ${x}px ${y}px, rgb(0 0 0 / 85%) 0%, rgb(0 0 0 / 38%) 46%, rgb(0 0 0 / 8%) 78%, transparent 100%)`;

const STEM_REST_RATIO = 0.42;
const LERP_FACTOR = 0.1;
const SETTLE_THRESHOLD_PX = 0.4;

const noopCleanup = () => {
  // No listeners registered when motion is reduced or pointer is coarse.
};

/**
Adapted from React Bits Pro `@reactbits-pro/cta-8`: monumental brand wordmark illuminated softly under fine pointers. Runs zero rAF work when offscreen, settled, or under `prefers-reduced-motion: reduce`.
*/
export const WordmarkSpotlight = ({
  text,
  className,
}: {
  readonly text: string;
  readonly className?: string;
}): ReactNode => {
  const containerRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const fill = fillRef.current;
    if (!container || !fill) {
      return noopCleanup;
    }

    const isReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isFinePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;

    const restCoords = (): { x: number; y: number } => {
      const rect = fill.getBoundingClientRect();
      return {
        x: rect.width * STEM_REST_RATIO,
        y: rect.height * 0.48,
      };
    };

    const applyMask = (x: number, y: number) => {
      const value = maskAt(Math.round(x), Math.round(y));
      fill.style.maskImage = value;
      fill.style.webkitMaskImage = value;
    };

    const rest = restCoords();
    applyMask(rest.x, rest.y);

    if (isReducedMotion || !isFinePointer) {
      return noopCleanup;
    }

    let rafId = 0;
    let isInView = false;
    let currentX = rest.x;
    let currentY = rest.y;
    let targetX = rest.x;
    let targetY = rest.y;

    const tick = () => {
      rafId = 0;
      if (!isInView || document.hidden) {
        return;
      }

      const dx = targetX - currentX;
      const dy = targetY - currentY;
      if (Math.hypot(dx, dy) <= SETTLE_THRESHOLD_PX) {
        currentX = targetX;
        currentY = targetY;
        applyMask(currentX, currentY);
        return;
      }

      currentX += dx * LERP_FACTOR;
      currentY += dy * LERP_FACTOR;
      applyMask(currentX, currentY);
      rafId = window.requestAnimationFrame(tick);
    };

    const wake = () => {
      if (rafId === 0 && isInView && !document.hidden) {
        rafId = window.requestAnimationFrame(tick);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") {
        return;
      }
      const rect = fill.getBoundingClientRect();
      targetX = event.clientX - rect.left;
      targetY = event.clientY - rect.top;
      wake();
    };

    const handlePointerLeave = () => {
      const fallback = restCoords();
      targetX = fallback.x;
      targetY = fallback.y;
      wake();
    };

    const observer = new IntersectionObserver((entries) => {
      isInView = entries.some((entry) => entry.isIntersecting);
      if (isInView || rafId === 0) {
        return;
      }
      window.cancelAnimationFrame(rafId);
      rafId = 0;
    });
    observer.observe(container);

    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      observer.disconnect();
      if (rafId !== 0) {
        window.cancelAnimationFrame(rafId);
      }
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  const wordmarkClasses =
    "font-heading block select-none text-[clamp(4.5rem,14vw,10.5rem)] leading-[1.08] font-semibold tracking-[-0.045em]";

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={cn(
        "relative mt-8 overflow-hidden pt-1 pb-2 select-none [contain:layout_style_paint] forced-colors:hidden print:hidden sm:mt-10",
        className
      )}
    >
      <span
        translate="no"
        className={cn(
          wordmarkClasses,
          "text-foreground/[0.065] dark:text-foreground/[0.08]"
        )}
      >
        {text}
      </span>
      <span
        ref={fillRef}
        translate="no"
        className={cn(
          wordmarkClasses,
          "text-ink/26 dark:text-ink/32 pointer-events-none absolute inset-x-0 top-1 hidden sm:block"
        )}
        style={{
          WebkitMaskImage:
            "radial-gradient(circle 280px at 42% 48%, rgb(0 0 0 / 85%) 0%, rgb(0 0 0 / 38%) 46%, rgb(0 0 0 / 8%) 78%, transparent 100%)",
          maskImage:
            "radial-gradient(circle 280px at 42% 48%, rgb(0 0 0 / 85%) 0%, rgb(0 0 0 / 38%) 46%, rgb(0 0 0 / 8%) 78%, transparent 100%)",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
        }}
      >
        {text}
      </span>
    </div>
  );
};
