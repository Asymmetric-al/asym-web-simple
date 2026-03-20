"use client";

import { siteRevealScale, useReducedMotion } from "@/lib/motion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const easeWord = "cubic-bezier(0.22, 1, 0.36, 1)";

function subscribeNarrow(callback: () => void): () => void {
  const mq = window.matchMedia("(max-width: 767px)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function narrowSnapshot(): boolean {
  return window.matchMedia("(max-width: 767px)").matches;
}

function narrowServerSnapshot(): boolean {
  return false;
}

export function ScrollThesis({
  eyebrow,
  text,
  className,
}: {
  eyebrow: string;
  text: string;
  className?: string | undefined;
}) {
  const prefersReducedMotion = useReducedMotion();
  const narrowLayout = useSyncExternalStore(
    subscribeNarrow,
    narrowSnapshot,
    narrowServerSnapshot
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const words = text.split(" ");

  const liteWordMotion =
    narrowLayout && !prefersReducedMotion ? true : false;

  useEffect(() => {
    if (prefersReducedMotion) return;

    const container = containerRef.current;
    if (!container) return;

    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const rect = container.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const startOffset = windowHeight * 0.86;
        const endOffset = windowHeight * 0.26;
        const progress = Math.min(
          1,
          Math.max(0, (startOffset - rect.top) / (startOffset - endOffset))
        );

        setScrollProgress(progress);
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prefersReducedMotion]);

  const activeProgress = prefersReducedMotion ? 1 : scrollProgress;

  return (
    <section className={cn("section-divider-accent py-4 sm:py-6", className)}>
      <div className="mx-auto w-full max-w-[82rem] px-4 sm:px-6 lg:px-8">
        <div
          ref={containerRef}
          className="page-shell-glow surface-panel rounded-[2.35rem] px-6 py-10 sm:px-10 sm:py-14"
        >
          <Badge
            variant="outline"
            className="border-foreground/10 bg-card/76 text-primary/80 h-auto rounded-full px-3 py-1 font-mono text-[0.72rem] tracking-[0.28em] uppercase"
          >
            {eyebrow}
          </Badge>
          <p className="font-heading text-foreground mt-6 max-w-[22ch] text-[clamp(2.2rem,4.5vw,4.35rem)] leading-[1.02] font-semibold tracking-[-0.06em] text-balance">
            {words.map((word, index) => {
              const wordStart = index / words.length;
              const wordEnd = wordStart + 1 / words.length;
              const wordProgress = Math.min(
                1,
                Math.max(
                  0,
                  (activeProgress - wordStart) / (wordEnd - wordStart)
                )
              );
              const opacity = prefersReducedMotion
                ? 1
                : 0.18 + wordProgress * 0.82;
              const blur =
                prefersReducedMotion || liteWordMotion
                  ? 0
                  : (1 - wordProgress) * 7;
              const scale =
                prefersReducedMotion || liteWordMotion
                  ? 1
                  : siteRevealScale + wordProgress * (1 - siteRevealScale);

              const transitionStyle =
                prefersReducedMotion
                  ? undefined
                  : liteWordMotion
                    ? `opacity 90ms ${easeWord}`
                    : `opacity 90ms ${easeWord}, filter 90ms ${easeWord}, transform 90ms ${easeWord}`;

              return (
                <span
                  key={`${word}-${index}`}
                  className="mr-2 inline-block sm:mr-3"
                  style={{
                    opacity,
                    filter: blur > 0 ? `blur(${blur}px)` : "none",
                    transform: scale !== 1 ? `scale(${scale})` : "none",
                    transition: transitionStyle,
                  }}
                >
                  {word}
                </span>
              );
            })}
          </p>
          <p className="content-measure text-muted-foreground mt-6 text-sm leading-7 sm:text-base">
            A calm operator surface should make the most important work feel
            closer, clearer, and less encumbered by admin drag.
          </p>
        </div>
      </div>
    </section>
  );
}
