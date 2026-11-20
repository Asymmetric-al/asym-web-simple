"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export interface GhostTypeProps {
  readonly text: string;
  readonly completions: readonly string[];
  readonly holdDelay?: number;
  readonly streamSpeed?: number;
  readonly acceptDelay?: number;
  readonly className?: string;
}

const subscribeToMotion = (notify: () => void) => {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", notify);
  return () => media.removeEventListener("change", notify);
};

const readReducedMotion = (): boolean =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const noopCleanup = () => {
  // No animation loop needed when reduced motion is active or completions are static.
};

const WORD_TOKEN_PATTERN = /\s*\S+\s*/gu;

const splitWords = (value: string): readonly string[] =>
  value.match(WORD_TOKEN_PATTERN) ?? [value];

/**
Adapted from React Bits Pro `@reactbits-starter/ghost-type-tw`: calm editorial
AI-style ghost completion line tuned to asym's parchment/ink palette. Renders
the full initial sentence immediately on SSR, no-JS, and reduced motion (zero
CLS, zero hidden copy, zero offscreen CPU).
*/
export const GhostType = ({
  text,
  completions,
  holdDelay = 3400,
  streamSpeed = 85,
  acceptDelay = 950,
  className,
}: GhostTypeProps): ReactNode => {
  const rootRef = useRef<HTMLDivElement>(null);
  const acceptedRef = useRef<HTMLSpanElement>(null);
  const caretRef = useRef<HTMLSpanElement>(null);
  const ghostRef = useRef<HTMLSpanElement>(null);
  const isReducedMotion = useSyncExternalStore(
    subscribeToMotion,
    readReducedMotion,
    () => false
  );

  const firstCompletion = completions[0] ?? "";

  useEffect(() => {
    const root = rootRef.current;
    const acceptedEl = acceptedRef.current;
    const caretEl = caretRef.current;
    const ghostEl = ghostRef.current;

    if (!root || !acceptedEl || !caretEl || !ghostEl) {
      return noopCleanup;
    }

    if (isReducedMotion || completions.length < 2) {
      acceptedEl.textContent = firstCompletion;
      ghostEl.replaceChildren();
      caretEl.style.opacity = "0";
      return noopCleanup;
    }

    let isDisposed = false;
    let isInView = false;
    let isHovering = false;
    let timerId = 0;

    const wait = (ms: number): Promise<boolean> =>
      new Promise((resolve) => {
        let remaining = Math.max(0, ms);
        let last = performance.now();

        const tick = () => {
          timerId = 0;
          if (isDisposed) {
            resolve(false);
            return;
          }
          const now = performance.now();
          const isPaused = !isInView || document.hidden || isHovering;
          if (!isPaused) {
            remaining -= now - last;
          }
          last = now;
          if (remaining <= 0) {
            resolve(true);
            return;
          }
          timerId = window.setTimeout(tick, isPaused ? 180 : remaining);
        };

        timerId = window.setTimeout(tick, remaining);
      });

    const streamCompletion = async (completion: string): Promise<boolean> => {
      ghostEl.replaceChildren();
      caretEl.style.opacity = "1";
      const tokens = splitWords(completion);
      for (const token of tokens) {
        const span = document.createElement("span");
        span.textContent = token;
        ghostEl.append(span);
        span.animate([{ opacity: 0 }, { opacity: 1 }], {
          duration: 240,
          easing: "cubic-bezier(0.23, 1, 0.32, 1)",
        });
        const shouldContinue = await wait(streamSpeed);
        if (!shouldContinue) {
          return false;
        }
      }
      return true;
    };

    const acceptCompletion = async (completion: string): Promise<boolean> => {
      ghostEl.replaceChildren();
      acceptedEl.textContent = completion;
      acceptedEl.animate(
        [
          { color: "color-mix(in srgb, currentColor 42%, transparent)" },
          { color: "var(--ring)", offset: 0.32 },
          { color: "var(--foreground)" },
        ],
        {
          duration: 520,
          easing: "cubic-bezier(0.23, 1, 0.32, 1)",
        }
      );
      caretEl.style.opacity = "0.65";
      return wait(holdDelay);
    };

    const clearAccepted = async (): Promise<boolean> => {
      acceptedEl.style.backgroundColor =
        "color-mix(in srgb, var(--ring) 20%, transparent)";
      caretEl.style.opacity = "0";
      const shouldContinue = await wait(340);
      if (!shouldContinue) {
        return false;
      }
      acceptedEl.textContent = "";
      acceptedEl.style.backgroundColor = "";
      caretEl.style.opacity = "1";
      return wait(180);
    };

    const runCycle = async () => {
      acceptedEl.textContent = firstCompletion;
      ghostEl.replaceChildren();
      caretEl.style.opacity = "0.65";

      let index = 1;
      const initialWait = await wait(holdDelay);
      if (!initialWait) {
        return;
      }

      while (!isDisposed) {
        const cleared = await clearAccepted();
        if (!cleared) {
          return;
        }
        const completion = completions[index % completions.length] ?? "";
        const streamed = await streamCompletion(completion);
        if (!streamed) {
          return;
        }
        const pausedBeforeAccept = await wait(acceptDelay);
        if (!pausedBeforeAccept) {
          return;
        }
        const accepted = await acceptCompletion(completion);
        if (!accepted) {
          return;
        }
        index += 1;
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        isInView = entries.some((entry) => entry.isIntersecting);
      },
      { threshold: 0.2 }
    );
    observer.observe(root);

    const handlePointerEnter = (event: PointerEvent) => {
      if (event.pointerType === "mouse") {
        isHovering = true;
      }
    };

    const handlePointerLeave = () => {
      isHovering = false;
    };

    root.addEventListener("pointerenter", handlePointerEnter);
    root.addEventListener("pointerleave", handlePointerLeave);
    void runCycle();

    return () => {
      isDisposed = true;
      if (timerId !== 0) {
        window.clearTimeout(timerId);
      }
      observer.disconnect();
      root.removeEventListener("pointerenter", handlePointerEnter);
      root.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [
    acceptDelay,
    completions,
    firstCompletion,
    holdDelay,
    isReducedMotion,
    streamSpeed,
  ]);

  return (
    <div
      ref={rootRef}
      className={cn(
        "text-muted-foreground font-mono text-[0.8125rem] leading-6 tracking-[0.01em]",
        className
      )}
    >
      <span className="sr-only">{`${text}${firstCompletion}`}</span>
      <span
        aria-hidden="true"
        className="inline-grid max-w-full align-top"
      >
        {completions.map((completion) => (
          <span
            key={completion}
            className="invisible col-start-1 row-start-1 whitespace-pre-wrap"
          >
            {text}
            {completion}
          </span>
        ))}
        <span className="col-start-1 row-start-1 whitespace-pre-wrap">
          <span>{text}</span>
          <span
            ref={acceptedRef}
            className="text-foreground rounded-[0.18rem] [box-decoration-break:clone] [-webkit-box-decoration-break:clone]"
          >
            {firstCompletion}
          </span>
          <span
            ref={caretRef}
            aria-hidden="true"
            className="bg-ring mx-px inline-block h-[1em] w-[1.5px] translate-y-[0.14em] rounded-full opacity-0 transition-opacity duration-150 print:hidden"
          />
          <span
            ref={ghostRef}
            className="text-foreground/42"
          />
        </span>
      </span>
    </div>
  );
};
