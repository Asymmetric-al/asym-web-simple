"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

const VIEWBOX_WIDTH = 1000;
const VIEWBOX_HEIGHT = 322;
const REST_X = 420;
const REST_Y = 148;
const LERP_FACTOR = 0.1;
const SETTLE_THRESHOLD = 0.35;

/**
Exact Plus Jakarta Sans SemiBold (600) vector outlines for lowercase `asym`
extracted from `lib/fonts/PlusJakartaSans-SemiBold.ttf` (`-0.045em` tracking).
Using one pure vector `<path>` prevents decorative footer text from hijacking
LCP or shifting before webfont load, and eliminates SVG `<mask>` rasterization.
*/
const ASYM_WORDMARK_PATH =
  "M122.9,228.7Q91.8,228.7 72.4,212.7Q53,196.8 53,169.8Q53,145.1 69.9,127.8Q86.8,110.5 122.5,104.4L187.9,93.8L187.9,85.8Q187.9,71 176.5,61.1Q165.1,51.2 146.9,51.2Q129.8,51.2 116.8,60.2Q103.9,69.1 98.2,83.2L62.5,65.3Q68.2,50.5 80.9,38.9Q93.7,27.3 111.1,20.7Q128.6,14 148,14Q172.3,14 190.9,23.1Q209.6,32.2 220.2,48.4Q230.8,64.5 230.8,85.8L230.8,224.1L189.8,224.1L189.8,200.2Q178.4,213.9 161.3,221.3Q144.2,228.7 122.9,228.7ZM97.8,168.3Q97.8,180.1 106.8,187.5Q115.7,194.9 129.8,194.9Q146.9,194.9 160,187.5Q173.1,180.1 180.5,167.1Q187.9,154.2 187.9,138.6L187.9,127.6L130.9,137.5Q113.8,140.5 105.8,148.5Q97.8,156.5 97.8,168.3ZM341,228.7Q309.1,228.7 285.5,213.1Q262,197.5 252.5,171.3L285.5,155.7Q293.9,173.6 308.5,183.7Q323.1,193.7 341,193.7Q356.2,193.7 365.7,186.9Q375.2,180.1 375.2,168.3Q375.2,157.3 366.5,151.8Q357.7,146.2 347.8,143.6L315.5,134.5Q288.9,126.9 275.8,111.7Q262.7,96.5 262.7,75.6Q262.7,57.3 272.2,43.5Q281.7,29.6 298.2,21.8Q314.8,14 336.1,14Q364.2,14 386.2,27.9Q408.3,41.7 417.4,66.4L384.3,82Q377.9,67.2 364.7,58.5Q351.6,49.7 335.7,49.7Q321.2,49.7 313.1,56.4Q304.9,63 304.9,73.7Q304.9,84.7 313.1,89.8Q321.2,94.9 331.1,98L364.6,107.9Q389.6,115.1 403.5,130.5Q417.4,145.9 417.4,167.1Q417.4,185.4 407.7,199.3Q398,213.1 380.9,220.9Q363.8,228.7 341,228.7ZM461.8,307.7Q454.2,307.7 446.8,306.4Q439.4,305.1 433.3,302.4L433.3,265.6Q437.9,266.7 444.3,267.7Q450.8,268.6 456.9,268.6Q474.7,268.6 483.3,260.8Q491.8,253 498.7,237.1L504.4,224.1L422.7,18.6L468.6,18.6L526.4,169.8L584.2,18.6L630.5,18.6L539.7,246.6Q528.7,273.9 509.9,290.8Q491.1,307.7 461.8,307.7ZM643.8,224.1L643.8,18.6L684.8,18.6L684.8,44Q693.2,29.2 708.2,21.6Q723.2,14 741.8,14Q762.7,14 779.8,23.5Q796.9,33 806,49Q816.7,31.5 833.4,22.7Q850.1,14 870.6,14Q891.9,14 909.2,23.9Q926.5,33.8 936.8,51.2Q947,68.7 947,91.1L947,224.1L904.1,224.1L904.1,102.9Q904.1,80.1 892.1,67Q880.1,53.9 860.8,53.9Q841.4,53.9 829,67Q816.7,80.1 816.7,102.9L816.7,224.1L774.1,224.1L774.1,102.9Q774.1,80.1 762,67Q749.8,53.9 730.4,53.9Q711,53.9 698.9,67Q686.7,80.1 686.7,102.9L686.7,224.1L643.8,224.1Z";

const noopCleanup = () => {
  // No listeners registered when motion is reduced or pointer is coarse.
};

/**
Adapted from React Bits Pro `@reactbits-pro/cta-8`: full-width monumental
lowercase `asym` colophon illuminated softly under fine pointers via a single
direct SVG `<radialGradient>` fill updated with `gradientTransform` (zero
`<mask>`, zero mount-time layout read, passive scroll invalidation while in
view, and zero rAF work when offscreen, settled, or under
`prefers-reduced-motion: reduce`).
*/
export const WordmarkSpotlight = ({
  className,
}: {
  readonly className?: string;
}): ReactNode => {
  const containerRef = useRef<HTMLDivElement>(null);
  const gradRef = useRef<SVGRadialGradientElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const grad = gradRef.current;
    if (!container || !grad) {
      return noopCleanup;
    }

    const isReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isFinePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;

    if (isReducedMotion || !isFinePointer) {
      return noopCleanup;
    }

    let rafId = 0;
    let isInView = false;
    let cachedRect: DOMRect | null = null;
    let currentDx = 0;
    let currentDy = 0;
    let targetDx = 0;
    let targetDy = 0;

    const refreshRect = () => {
      cachedRect = container.getBoundingClientRect();
    };

    const applyTransform = (dx: number, dy: number) => {
      grad.setAttribute(
        "gradientTransform",
        `translate(${dx.toFixed(1)} ${dy.toFixed(1)})`
      );
    };

    const tick = () => {
      rafId = 0;
      if (!isInView || document.hidden) {
        return;
      }

      const deltaX = targetDx - currentDx;
      const deltaY = targetDy - currentDy;
      if (Math.hypot(deltaX, deltaY) <= SETTLE_THRESHOLD) {
        currentDx = targetDx;
        currentDy = targetDy;
        applyTransform(currentDx, currentDy);
        return;
      }

      currentDx += deltaX * LERP_FACTOR;
      currentDy += deltaY * LERP_FACTOR;
      applyTransform(currentDx, currentDy);
      rafId = window.requestAnimationFrame(tick);
    };

    const wake = () => {
      if (rafId === 0 && isInView && !document.hidden) {
        rafId = window.requestAnimationFrame(tick);
      }
    };

    const handlePointerEnter = () => {
      refreshRect();
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") {
        return;
      }
      if (!cachedRect || cachedRect.width === 0 || cachedRect.height === 0) {
        refreshRect();
      }
      if (!cachedRect || cachedRect.width === 0 || cachedRect.height === 0) {
        return;
      }
      const viewX =
        ((event.clientX - cachedRect.left) / cachedRect.width) * VIEWBOX_WIDTH;
      const viewY =
        ((event.clientY - cachedRect.top) / cachedRect.height) * VIEWBOX_HEIGHT;
      targetDx = viewX - REST_X;
      targetDy = viewY - REST_Y;
      wake();
    };

    const handlePointerLeave = () => {
      targetDx = 0;
      targetDy = 0;
      wake();
    };

    const handleScroll = () => {
      if (isInView) {
        cachedRect = null;
      }
    };

    const intersectionObserver = new IntersectionObserver((entries) => {
      isInView = entries.some((entry) => entry.isIntersecting);
      cachedRect = null;
      if (isInView || rafId === 0) {
        return;
      }
      window.cancelAnimationFrame(rafId);
      rafId = 0;
    });
    intersectionObserver.observe(container);

    const resizeObserver = new ResizeObserver(() => {
      cachedRect = null;
    });
    resizeObserver.observe(container);

    container.addEventListener("pointerenter", handlePointerEnter);
    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
      if (rafId !== 0) {
        window.cancelAnimationFrame(rafId);
      }
      container.removeEventListener("pointerenter", handlePointerEnter);
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={cn(
        "relative overflow-hidden [contain:layout_style_paint] select-none print:hidden forced-colors:hidden",
        className
      )}
    >
      <svg
        viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        focusable="false"
        className="block h-auto w-full"
      >
        <defs>
          <radialGradient
            ref={gradRef}
            id="asym-wordmark-fill"
            gradientUnits="userSpaceOnUse"
            cx={REST_X}
            cy={REST_Y}
            r={340}
          >
            <stop offset="0%" stopColor="var(--ink)" stopOpacity="0.28" />
            <stop offset="46%" stopColor="var(--ink)" stopOpacity="0.14" />
            <stop
              offset="100%"
              stopColor="var(--foreground)"
              stopOpacity="0.065"
            />
          </radialGradient>
        </defs>

        <path
          d={ASYM_WORDMARK_PATH}
          className="fill-foreground/[0.065] dark:fill-foreground/[0.085] sm:fill-[url(#asym-wordmark-fill)] sm:dark:fill-[url(#asym-wordmark-fill)]"
        />
      </svg>
    </div>
  );
};
