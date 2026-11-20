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
  "1": "Describe (Your team) selected. Connected record: Campaign.",
  "2": "Prepare (AI, in development) selected. Connected records: Campaign and Donor history.",
  "3": "Review (Your team) selected. Connected records: Campaign and Donor history.",
  "4": "Publish (asym, in development) selected. Connected records: Campaign, Gift, Receipt, and Donor history.",
};

const NODE_STAGGER_MS = 40;
const NODE_BASE_DELAY_MS = 150;

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
      const nodes = [
        ...plate.querySelectorAll<HTMLElement>(
          `.wf-node[data-steps~="${escapedStep}"]`
        ),
      ];

      let landPx = 0;
      if (datumInk && stem) {
        const datumRect = datumInk.getBoundingClientRect();
        const stemRect = stem.getBoundingClientRect();
        if (datumRect.width > 0) {
          landPx = stemRect.right;
          const pct = Math.max(
            0,
            Math.min(100, ((landPx - datumRect.left) / datumRect.width) * 100)
          );
          datumInk.style.setProperty("--land", `${pct.toFixed(2)}%`);
        }
      }

      if (isInstant) {
        for (const node of nodes) {
          node.style.setProperty("--d", "0ms");
        }
        return;
      }

      const ranked = nodes
        .map((node) => {
          const rect = node.getBoundingClientRect();
          const center = rect.left + rect.width / 2;
          return { node, dist: Math.abs(center - landPx) };
        })
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
        delete plate.dataset.active;
        delete plate.dataset.pinned;
        delete plate.dataset.instant;
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
      const step = stepFromTarget(event.target);
      if (!step) {
        return;
      }
      applyState(step, { isInstant: true, isPinned: pinnedStep === step });
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
      if (pinnedStep === step) {
        pinnedStep = null;
        syncButtons(null);
        applyState(null, { isInstant: false, isPinned: false });
        announce("Workflow step selection cleared.");
        return;
      }
      pinnedStep = step;
      syncButtons(step);
      applyState(step, { isInstant: false, isPinned: true });
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

    plate.addEventListener("pointerover", handlePointerOver);
    plate.addEventListener("pointerleave", handlePointerLeave);
    plate.addEventListener("focusin", handleFocusIn);
    plate.addEventListener("focusout", handleFocusOut);
    plate.addEventListener("click", handleClick);
    plate.addEventListener("keydown", handleKeyDown);

    return () => {
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
      className="focus-visible:ring-ring focus-visible:ring-offset-background cursor-pointer rounded-sm text-left after:absolute after:inset-0 after:rounded-[inherit] after:content-[''] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent"
    >
      {title}
    </button>
  );
};
