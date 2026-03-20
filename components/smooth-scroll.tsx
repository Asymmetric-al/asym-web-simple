"use client";

import { siteFeatures } from "@/lib/config";
import Lenis from "lenis";
import { useEffect, type ReactNode } from "react";

const LENIS_OPTIONS = {
  duration: 1.2,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: "vertical" as const,
  gestureOrientation: "vertical" as const,
  smoothWheel: true,
  wheelMultiplier: 0.9,
  touchMultiplier: 1.5,
};

export function SmoothScroll({ children }: { children: ReactNode }): ReactNode {
  useEffect(() => {
    if (!siteFeatures.smoothScroll) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const lenis = new Lenis(LENIS_OPTIONS);
    let rafId = 0;

    function stopRaf(): void {
      if (!rafId) return;
      cancelAnimationFrame(rafId);
      rafId = 0;
    }

    function raf(time: number): void {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    function startRaf(): void {
      if (rafId) return;
      rafId = requestAnimationFrame(raf);
    }

    function handleVisibilityChange(): void {
      if (document.visibilityState === "hidden") {
        stopRaf();
        return;
      }

      lenis.resize();
      startRaf();
    }

    function handleResize(): void {
      lenis.resize();
    }

    startRaf();

    function handleAnchorClick(event: MouseEvent): void {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      const element = document.querySelector(href);
      if (!element) return;

      event.preventDefault();
      const focusTarget = element as HTMLElement;

      if (window.location.hash !== href) {
        window.history.pushState(null, "", href);
      }

      lenis.scrollTo(focusTarget, {
        offset: -96,
        onComplete: () => {
          focusTarget.focus({ preventScroll: true });
        },
      });
    }

    document.addEventListener("click", handleAnchorClick);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("resize", handleResize);
      stopRaf();
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
