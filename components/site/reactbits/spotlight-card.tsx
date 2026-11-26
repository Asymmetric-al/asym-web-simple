"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type SpotlightTone = "signal" | "human";

export interface SpotlightCardProps {
  readonly id?: string;
  readonly as?: "div" | "article";
  readonly tone?: SpotlightTone;
  readonly intensity?: number;
  readonly spotlightSize?: number;
  readonly softness?: number;
  readonly borderGlow?: number;
  readonly proximity?: number;
  readonly smoothing?: number;
  readonly className?: string;
  readonly children: ReactNode;
}

interface SpotlightSettings {
  readonly fill: string;
  readonly edge: string;
  readonly size: number;
  readonly intensity: number;
  readonly borderGlow: number;
  readonly proximity: number;
  readonly smoothing: number;
}

const FALLOFF_STEPS = 14;
const MIN_SIZE = 20;

const clampUnit = (value: number): number => Math.min(1, Math.max(0, value));

const buildFalloff = (colorVar: string, softness: number): string => {
  const soft = clampUnit(softness);
  const core = (1 - soft) ** 1.5 * 0.85;
  const stop = (alpha: number, at: number): string =>
    `color-mix(in srgb, ${colorVar} ${(alpha * 100).toFixed(2)}%, transparent) ${(at * 100).toFixed(2)}%`;
  const stops = [stop(1, 0)];
  for (let index = 0; index <= FALLOFF_STEPS; index += 1) {
    const t = core + ((1 - core) * index) / FALLOFF_STEPS;
    const g = (t - core) / (1 - core);
    const smooth = 1 - g * g * (3 - 2 * g);
    const glow = Math.exp(-4.6 * g * g) * (1 - g ** 6);
    stops.push(stop(smooth + (glow - smooth) * soft, t));
  }
  return stops.join(", ");
};

const TONE_COLOR: Record<SpotlightTone, string> = {
  signal: "var(--signal)",
  human: "var(--human)",
};

const radialGradient = (
  size: number,
  x: number,
  y: number,
  stops: string
): string =>
  `radial-gradient(circle ${size.toFixed(1)}px at ${x.toFixed(1)}px ${y.toFixed(1)}px, ${stops})`;

const attachSpotlight = (
  root: HTMLDivElement,
  light: HTMLSpanElement,
  edge: HTMLSpanElement,
  settingsRef: { readonly current: SpotlightSettings },
  wakeRef: { current: (() => void) | null }
): (() => void) => {
  const state = {
    x: 0,
    y: 0,
    presence: 0,
    isVisible: true,
  };
  const pointer = { x: 0, y: 0, isActive: false };
  const drawn = { light: "", edge: "" };
  let focusNode: Element | null = null;
  let raf = 0;
  let last = 0;
  let isAlive = true;

  const paint = (current: SpotlightSettings): void => {
    const fill = radialGradient(current.size, state.x, state.y, current.fill);
    const rim = radialGradient(
      current.size * 0.62,
      state.x,
      state.y,
      current.edge
    );
    if (fill !== drawn.light) {
      drawn.light = fill;
      light.style.background = fill;
    }
    if (rim !== drawn.edge) {
      drawn.edge = rim;
      edge.style.background = rim;
    }
    light.style.opacity = String(
      Math.min(1, state.presence * current.intensity)
    );
    edge.style.opacity = String(
      Math.min(1, state.presence * current.borderGlow)
    );
  };

  const tick = (now: number): void => {
    raf = 0;
    if (!isAlive) {
      return;
    }
    const { current } = settingsRef;
    const dt = Math.min(0.05, Math.max(0.001, (now - last) / 1000));
    last = now;
    const rect = root.getBoundingClientRect();
    let tx = state.x;
    let ty = state.y;
    let target = 0;

    if (focusNode && root.contains(focusNode)) {
      const box = focusNode.getBoundingClientRect();
      tx = box.left + box.width / 2 - rect.left;
      ty = box.top + box.height / 2 - rect.top;
      target = 1;
    } else if (pointer.isActive) {
      tx = pointer.x - rect.left;
      ty = pointer.y - rect.top;
      const gap = Math.hypot(
        Math.max(0, -tx, tx - rect.width),
        Math.max(0, -ty, ty - rect.height)
      );
      if (gap === 0) {
        target = 1;
      } else if (current.proximity > 0) {
        target = Math.max(0, 1 - gap / current.proximity) ** 2;
      }
    }

    if (state.presence < 0.02 && target > 0) {
      state.x = tx;
      state.y = ty;
    }

    const follow =
      current.smoothing === 0
        ? 1
        : 1 - Math.exp(-dt / (0.015 + current.smoothing * 0.22));
    state.x += (tx - state.x) * follow;
    state.y += (ty - state.y) * follow;

    const fade = 1 - Math.exp(-dt / (target > state.presence ? 0.1 : 0.28));
    state.presence += (target - state.presence) * fade;
    if (Math.abs(target - state.presence) < 0.002) {
      state.presence = target;
    }

    paint(current);

    const isMoving =
      Math.abs(tx - state.x) > 0.1 || Math.abs(ty - state.y) > 0.1;
    if (isMoving || state.presence !== target) {
      raf = requestAnimationFrame(tick);
    }
  };

  const wake = (): void => {
    if (raf || !isAlive || !state.isVisible) {
      return;
    }
    last = performance.now();
    raf = requestAnimationFrame(tick);
  };

  wakeRef.current = wake;

  const onMove = (event: PointerEvent): void => {
    if (event.pointerType === "touch") {
      return;
    }
    pointer.x = event.clientX;
    pointer.y = event.clientY;
    pointer.isActive = true;
    const targetNode = event.target instanceof Node ? event.target : null;
    if (
      state.presence > 0 ||
      settingsRef.current.proximity > 0 ||
      (targetNode !== null && root.contains(targetNode))
    ) {
      wake();
    }
  };

  const onOut = (event: PointerEvent): void => {
    if (event.relatedTarget) {
      return;
    }
    pointer.isActive = false;
    wake();
  };

  const onFocusIn = (event: FocusEvent): void => {
    if (
      !(event.target instanceof Element) ||
      !event.target.matches(":focus-visible")
    ) {
      return;
    }
    focusNode = event.target;
    wake();
  };

  const onFocusOut = (event: FocusEvent): void => {
    const nextTarget =
      event.relatedTarget instanceof Node ? event.relatedTarget : null;
    if (nextTarget !== null && root.contains(nextTarget)) {
      return;
    }
    focusNode = null;
    wake();
  };

  const observer = new IntersectionObserver((entries) => {
    state.isVisible = entries.some((entry) => entry.isIntersecting);
    const hasFocus = focusNode !== null;
    const isEngaged = hasFocus || pointer.isActive;
    if (isEngaged && state.isVisible) {
      wake();
    }
  });
  observer.observe(root);

  window.addEventListener("pointermove", onMove);
  document.addEventListener("pointerout", onOut);
  root.addEventListener("focusin", onFocusIn);
  root.addEventListener("focusout", onFocusOut);

  return () => {
    isAlive = false;
    cancelAnimationFrame(raf);
    observer.disconnect();
    window.removeEventListener("pointermove", onMove);
    document.removeEventListener("pointerout", onOut);
    root.removeEventListener("focusin", onFocusIn);
    root.removeEventListener("focusout", onFocusOut);
    wakeRef.current = null;
  };
};

const maybeAttachSpotlight = (
  root: HTMLDivElement | null,
  light: HTMLSpanElement | null,
  edge: HTMLSpanElement | null,
  settingsRef: { readonly current: SpotlightSettings },
  wakeRef: { current: (() => void) | null }
): (() => void) | null => {
  if (!root || !light || !edge) {
    return null;
  }
  const isReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  const hasFinePointer = window.matchMedia(
    "(hover: hover) and (pointer: fine)"
  ).matches;
  const canAnimate = !isReduced && hasFinePointer;
  return canAnimate
    ? attachSpotlight(root, light, edge, settingsRef, wakeRef)
    : null;
};

export const SpotlightCard = ({
  id,
  as = "div",
  tone = "signal",
  intensity = 0.075,
  spotlightSize = 280,
  softness = 0.78,
  borderGlow = 0.34,
  proximity = 72,
  smoothing = 0.28,
  className,
  children,
}: SpotlightCardProps): ReactNode => {
  const rootRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLSpanElement>(null);
  const edgeRef = useRef<HTMLSpanElement>(null);
  const wakeRef = useRef<(() => void) | null>(null);

  const colorVar = TONE_COLOR[tone];
  const settings: SpotlightSettings = {
    fill: buildFalloff(colorVar, softness),
    edge: buildFalloff(colorVar, 1),
    size: Math.max(MIN_SIZE, spotlightSize),
    intensity: clampUnit(intensity),
    borderGlow: clampUnit(borderGlow),
    proximity: Math.max(0, proximity),
    smoothing: clampUnit(smoothing),
  };

  const settingsRef = useRef(settings);

  useEffect(() => {
    settingsRef.current = settings;
    wakeRef.current?.();
  });

  useEffect(() => {
    const cleanup = maybeAttachSpotlight(
      rootRef.current,
      lightRef.current,
      edgeRef.current,
      settingsRef,
      wakeRef
    );
    return () => {
      cleanup?.();
    };
  }, []);

  const content = (
    <>
      <span ref={lightRef} className="rb-spotlight-light" aria-hidden="true" />
      <span ref={edgeRef} className="rb-spotlight-edge" aria-hidden="true" />
      {children}
    </>
  );

  if (as === "article") {
    return (
      <article
        id={id}
        ref={rootRef}
        className={cn("rb-spotlight-card", className)}
      >
        {content}
      </article>
    );
  }

  return (
    <div id={id} ref={rootRef} className={cn("rb-spotlight-card", className)}>
      {content}
    </div>
  );
};

export default SpotlightCard;
