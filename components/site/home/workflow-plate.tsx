"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import type { ReactNode } from "react";

const noop = () => {
  // Static subscription for client hydration flag.
};

const emptySubscribe = () => noop;

const useIsClient = (): boolean =>
  useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

const STEP_ANNOUNCEMENTS: Record<string, string> = {
  "1": "Describe (Your team) selected. Records: Campaign.",
  "2": "Prepare (AI, in development) selected. Records: Campaign, Donor history.",
  "3": "Review (Your team) selected. Records: Campaign, Donor history.",
  "4": "Publish (asym, in development) selected. Records: Campaign, Gift, Receipt, Donor history.",
};

const NODE_STAGGER_MS = 40;
const NODE_BASE_DELAY_MS = 150;
const GAP_HALF_PX = 5;

const clampPct = (value: number): number => Math.max(0, Math.min(100, value));

const buildDatumInkBackground = (
  unconnectedCentersPx: readonly number[],
  datumLeft: number,
  datumWidth: number
): string => {
  if (unconnectedCentersPx.length === 0 || datumWidth <= 0) {
    return "var(--ink)";
  }
  const stops: string[] = [];
  let cursor = "0px";
  const sorted = [...unconnectedCentersPx].toSorted((a, b) => a - b);
  for (const centerPx of sorted) {
    const relPx = centerPx - datumLeft;
    if (relPx <= GAP_HALF_PX || relPx >= datumWidth - GAP_HALF_PX) {
      continue;
    }
    const gapStart = `${(relPx - GAP_HALF_PX).toFixed(1)}px`;
    const gapEnd = `${(relPx + GAP_HALF_PX).toFixed(1)}px`;
    stops.push(`var(--ink) ${cursor}`, `var(--ink) ${gapStart}`);
    stops.push(`transparent ${gapStart}`, `transparent ${gapEnd}`);
    cursor = gapEnd;
  }
  if (stops.length === 0) {
    return "var(--ink)";
  }
  stops.push(`var(--ink) ${cursor}`, "var(--ink) 100%");
  return `linear-gradient(90deg, ${stops.join(", ")})`;
};

/**
Interactive progressive-enhancement wrapper for the Datum & Sweep workflow plate. Writes state attributes and CSS custom properties directly to the DOM so hover, focus, and click-to-pin never trigger React re-renders or layout thrash.
*/
export const WorkflowPlate = ({
  children,
  className,
}: {
  readonly children: ReactNode;
  readonly className?: string;
}): ReactNode => {
  const plateRef = useRef<HTMLDivElement>(null);
  const liveRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const plate = plateRef.current;
    if (!plate) {
      return noop;
    }

    plate.dataset.interactive = "true";

    let pinnedStep: string | null = null;
    let activeStep: string | null = null;

    const syncButtons = (pinned: string | null) => {
      const buttons = plate.querySelectorAll<HTMLButtonElement>(
        "button[data-wf-trigger]"
      );
      for (const btn of buttons) {
        btn.setAttribute(
          "aria-pressed",
          btn.dataset.wfTrigger === pinned ? "true" : "false"
        );
      }
    };

    const updateTiming = (stepNum: string, isInstant: boolean) => {
      const escapedStep = CSS.escape(stepNum);
      const datumInk = plate.querySelector<HTMLElement>(".wf-datum-ink");
      const stem = plate.querySelector<HTMLElement>(
        `.wf-step[data-step="${escapedStep}"] .wf-stem`
      );
      const allNodes = [...plate.querySelectorAll<HTMLElement>(".wf-node")];
      const nodes: HTMLElement[] = [];
      const unconnectedNodes: HTMLElement[] = [];

      for (const node of allNodes) {
        const steps = (node.dataset.steps ?? "").split(" ");
        if (steps.includes(stepNum)) {
          nodes.push(node);
        } else {
          unconnectedNodes.push(node);
        }
      }

      const nodeCenters = nodes.map((node) => {
        const rect = node.getBoundingClientRect();
        return { node, center: rect.left + rect.width / 2 };
      });

      let landPx = 0;
      if (datumInk && stem) {
        const datumRect = datumInk.getBoundingClientRect();
        const stemRect = stem.getBoundingClientRect();
        if (datumRect.width > 0) {
          landPx = stemRect.right - 1;
          const landPct = clampPct(
            ((landPx - datumRect.left) / datumRect.width) * 100
          );
          const xs = [landPx, ...nodeCenters.map((entry) => entry.center)];
          const minX = Math.min(...xs);
          const maxX = Math.max(...xs);
          const fromPct = clampPct(
            ((minX - datumRect.left) / datumRect.width) * 100
          );
          const toPct = clampPct(
            ((maxX - datumRect.left) / datumRect.width) * 100
          );
          const interiorUnconnected = unconnectedNodes
            .map((node) => {
              const rect = node.getBoundingClientRect();
              return rect.left + rect.width / 2;
            })
            .filter((center) => center > minX + 4 && center < maxX - 4);

          datumInk.style.setProperty("--land", `${landPct.toFixed(2)}%`);
          datumInk.style.setProperty("--from", `${fromPct.toFixed(2)}%`);
          datumInk.style.setProperty("--to", `${toPct.toFixed(2)}%`);
          datumInk.style.setProperty(
            "--wf-ink-bg",
            buildDatumInkBackground(
              interiorUnconnected,
              datumRect.left,
              datumRect.width
            )
          );
        }
      }

      if (isInstant) {
        for (const node of nodes) {
          node.style.setProperty("--d", "0ms");
        }
        return;
      }

      const ranked = nodeCenters
        .map((entry) => ({
          node: entry.node,
          dist: Math.abs(entry.center - landPx),
        }))
        .toSorted((a, b) => a.dist - b.dist);

      for (const [rank, entry] of ranked.entries()) {
        entry.node.style.setProperty(
          "--d",
          `${NODE_BASE_DELAY_MS + rank * NODE_STAGGER_MS}ms`
        );
      }
    };

    const applyState = (
      nextStep: string | null,
      options: { readonly isInstant: boolean; readonly isPinned: boolean }
    ) => {
      if (nextStep === null) {
        if (options.isInstant) {
          plate.dataset.instant = "true";
        } else {
          delete plate.dataset.instant;
        }
        delete plate.dataset.active;
        delete plate.dataset.pinned;
        activeStep = null;
        return;
      }

      const shouldSnap = options.isInstant || activeStep !== null;

      if (shouldSnap) {
        plate.dataset.instant = "true";
      } else {
        delete plate.dataset.instant;
      }

      if (options.isPinned) {
        plate.dataset.pinned = "true";
      } else {
        delete plate.dataset.pinned;
      }

      updateTiming(nextStep, shouldSnap);
      plate.dataset.active = nextStep;
      activeStep = nextStep;
    };

    const announce = (message: string) => {
      if (liveRef.current) {
        liveRef.current.textContent = message;
      }
    };

    const stepFromTarget = (target: EventTarget | null): string | null =>
      target instanceof Element
        ? (target.closest<HTMLElement>("[data-step]")?.dataset.step ?? null)
        : null;

    const handlePointerOver = (event: PointerEvent) => {
      if (pinnedStep !== null || event.pointerType !== "mouse") {
        return;
      }
      const step = stepFromTarget(event.target);
      if (step && step !== activeStep) {
        applyState(step, { isInstant: false, isPinned: false });
      }
    };

    const handlePointerLeave = (event: PointerEvent) => {
      if (pinnedStep !== null || event.pointerType !== "mouse") {
        return;
      }
      applyState(null, { isInstant: false, isPinned: false });
    };

    const handleFocusIn = (event: FocusEvent) => {
      if (
        pinnedStep !== null ||
        !(event.target instanceof HTMLElement) ||
        !event.target.matches(":focus-visible")
      ) {
        return;
      }
      const step = stepFromTarget(event.target);
      if (!step) {
        return;
      }
      applyState(step, { isInstant: true, isPinned: false });
    };

    const handleFocusOut = (event: FocusEvent) => {
      const nextTarget = event.relatedTarget;
      if (nextTarget instanceof Node && plate.contains(nextTarget)) {
        return;
      }
      if (pinnedStep === null) {
        applyState(null, { isInstant: true, isPinned: false });
      } else {
        applyState(pinnedStep, { isInstant: true, isPinned: true });
      }
    };

    const handleClick = (event: MouseEvent) => {
      const step = stepFromTarget(event.target);
      if (!step) {
        return;
      }

      const isKeyboard = event.detail === 0;
      const isTrigger =
        event.target instanceof Element &&
        event.target.closest("button[data-wf-trigger]") !== null;

      if (!isKeyboard && !isTrigger) {
        const selection = window.getSelection()?.toString();
        if (selection && selection.length > 0) {
          return;
        }
      }

      if (pinnedStep === step) {
        pinnedStep = null;
        syncButtons(null);
        applyState(null, { isInstant: isKeyboard, isPinned: false });
        announce("Workflow step selection cleared.");
        return;
      }
      pinnedStep = step;
      syncButtons(step);
      applyState(step, { isInstant: isKeyboard, isPinned: true });
      announce(STEP_ANNOUNCEMENTS[step] ?? "");
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") {
        return;
      }
      if (pinnedStep === null && activeStep === null) {
        return;
      }
      pinnedStep = null;
      syncButtons(null);
      applyState(null, { isInstant: true, isPinned: false });
      announce("Workflow step selection cleared.");
    };

    const resizeObserver = new ResizeObserver(() => {
      if (activeStep !== null) {
        updateTiming(activeStep, true);
      }
    });
    resizeObserver.observe(plate);

    plate.addEventListener("pointerover", handlePointerOver);
    plate.addEventListener("pointerleave", handlePointerLeave);
    plate.addEventListener("focusin", handleFocusIn);
    plate.addEventListener("focusout", handleFocusOut);
    plate.addEventListener("click", handleClick);
    plate.addEventListener("keydown", handleKeyDown);

    return () => {
      delete plate.dataset.interactive;
      resizeObserver.disconnect();
      plate.removeEventListener("pointerover", handlePointerOver);
      plate.removeEventListener("pointerleave", handlePointerLeave);
      plate.removeEventListener("focusin", handleFocusIn);
      plate.removeEventListener("focusout", handleFocusOut);
      plate.removeEventListener("click", handleClick);
      plate.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div ref={plateRef} className={className}>
      {children}
      <p ref={liveRef} className="sr-only" role="status" aria-live="polite" />
    </div>
  );
};

/**
Renders plain static heading text on SSR/no-JS so unscripted pages never ship inert buttons, and upgrades in-place to an accessible native toggle button after hydration with zero layout shift.
*/
export const WorkflowStepTitle = ({
  stepNumber,
  title,
  describedById,
}: {
  readonly stepNumber: number;
  readonly title: string;
  readonly describedById: string;
}): ReactNode => {
  const isHydrated = useIsClient();

  if (!isHydrated) {
    return title;
  }

  return (
    <button
      type="button"
      data-wf-trigger={String(stepNumber)}
      aria-pressed="false"
      aria-describedby={describedById}
      className="decoration-rule group-hover/step:decoration-ink -my-2 inline-flex min-h-11 cursor-pointer items-center py-2 text-left underline underline-offset-[5px] focus-visible:outline-2 focus-visible:outline-transparent sm:my-0 sm:min-h-0 sm:py-0"
    >
      {title}
    </button>
  );
};
