"use client";

import { useReducedMotion } from "@/lib/motion";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState, type ReactNode } from "react";

const LONG_READ_PATHS = new Set([
  "/manifesto",
  "/platform",
  "/specs",
  "/missions",
  "/join",
  "/give",
]);

export function ReadingProgress(): ReactNode {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const [ratio, setRatio] = useState(0);

  const enabled =
    pathname != null && LONG_READ_PATHS.has(pathname) && !prefersReducedMotion;

  const update = useCallback(() => {
    const el = document.documentElement;
    const max = el.scrollHeight - el.clientHeight;
    setRatio(max <= 0 ? 1 : Math.min(1, Math.max(0, el.scrollTop / max)));
  }, []);

  useEffect(() => {
    if (!enabled) {
      const resetRaf = requestAnimationFrame(() => setRatio(0));
      return () => cancelAnimationFrame(resetRaf);
    }

    const initRaf = requestAnimationFrame(() => {
      update();
    });

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      cancelAnimationFrame(initRaf);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [enabled, update]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5 bg-transparent"
    >
      <div
        className="bg-primary/50 h-full origin-left"
        style={{
          transform: `scaleX(${ratio})`,
          transition: "transform 120ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />
    </div>
  );
}
