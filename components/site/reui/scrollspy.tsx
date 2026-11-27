"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

interface ScrollspyProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly offset?: number;
  readonly dataAttribute?: string;
  readonly isActiveOnRoute?: boolean;
  readonly minWidthMedia?: string;
}

interface TrackedSection {
  readonly id: string;
  readonly element: Element;
}

const ACTIVE_ATTR = "data-active";
const ARIA_CURRENT_ATTR = "aria-current";
const LOCATION_VALUE = "location";
const BOTTOM_TOLERANCE_PX = 4;
const LANDING_TOLERANCE_PX = 16;
const CLICK_LOCK_IDLE_MS = 420;
const CLICK_LOCK_MAX_MS = 2000;
const MANUAL_SCROLL_KEYS = {
  ArrowDown: true,
  ArrowUp: true,
  End: true,
  Home: true,
  PageDown: true,
  PageUp: true,
  " ": true,
} as const;

const parseCssPixels = (value: string): number => {
  const numeric = value.endsWith("px") ? value.slice(0, -2) : value;
  const parsed = Number(numeric);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
};

const isAtDocumentBottom = (): boolean =>
  window.scrollY + window.innerHeight >=
  document.documentElement.scrollHeight - BOTTOM_TOLERANCE_PX;

const keepAnchorVisibleHorizontally = (anchor: Element): void => {
  if (!(anchor instanceof HTMLElement)) {
    return;
  }
  const rail = anchor.closest<HTMLElement>("ul, ol");
  if (!rail || rail.scrollWidth <= rail.clientWidth + 1) {
    return;
  }
  const railRect = rail.getBoundingClientRect();
  const anchorRect = anchor.getBoundingClientRect();
  if (anchorRect.left >= railRect.left && anchorRect.right <= railRect.right) {
    return;
  }
  const targetLeft =
    anchor.offsetLeft -
    Math.max(0, (rail.clientWidth - anchor.offsetWidth) / 2);
  const isReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  rail.scrollTo({
    left: Math.max(0, targetLeft),
    behavior: isReducedMotion ? "auto" : "smooth",
  });
};

const applyActiveAnchor = (
  anchors: readonly Element[],
  attrName: string,
  activeId: string | null
): void => {
  let matchedAnchor: Element | null = null;
  for (const anchor of anchors) {
    const id = anchor.getAttribute(attrName);
    if (activeId !== null && id === activeId) {
      anchor.setAttribute(ACTIVE_ATTR, "true");
      anchor.setAttribute(ARIA_CURRENT_ATTR, LOCATION_VALUE);
      matchedAnchor = anchor;
      continue;
    }
    anchor.removeAttribute(ACTIVE_ATTR);
    if (anchor.getAttribute(ARIA_CURRENT_ATTR) === LOCATION_VALUE) {
      anchor.removeAttribute(ARIA_CURRENT_ATTR);
    }
  }
  if (matchedAnchor) {
    keepAnchorVisibleHorizontally(matchedAnchor);
  }
};

const collectAnchors = (
  root: HTMLDivElement | null,
  attrName: string
): readonly Element[] =>
  root ? [...root.querySelectorAll(`[${CSS.escape(attrName)}]`)] : [];

const collectTrackedSections = (
  anchors: readonly Element[],
  attrName: string
): readonly TrackedSection[] => {
  const results: TrackedSection[] = [];
  for (const anchor of anchors) {
    const id = anchor.getAttribute(attrName);
    const element = id ? document.querySelector(`#${CSS.escape(id)}`) : null;
    if (id && element) {
      results.push({ id, element });
    }
  }
  return results;
};

const measureActivationOffsets = (
  tracked: readonly TrackedSection[],
  baseOffset: number
): readonly number[] => {
  const scrollPaddingTop = parseCssPixels(
    window.getComputedStyle(document.documentElement).scrollPaddingTop
  );
  return tracked.map((entry) => {
    const scrollMarginTop = parseCssPixels(
      window.getComputedStyle(entry.element).scrollMarginTop
    );
    return Math.max(
      baseOffset,
      scrollPaddingTop + scrollMarginTop + LANDING_TOLERANCE_PX
    );
  });
};

const computeActiveSectionId = (
  tracked: readonly TrackedSection[],
  activationOffsets: readonly number[]
): string | null => {
  if (tracked.length === 0) {
    return null;
  }

  const rects = tracked.map((entry) => entry.element.getBoundingClientRect());
  const [firstRect] = rects;
  const [firstThreshold = 0] = activationOffsets;
  if (!firstRect || firstRect.top > firstThreshold) {
    return null;
  }

  const lastEntry = tracked.at(-1);
  const lastRect = rects.at(-1);
  const lastThreshold = activationOffsets.at(-1) ?? 0;
  if (lastEntry && lastRect && isAtDocumentBottom()) {
    const isLastVisible =
      lastRect.top < window.innerHeight && lastRect.bottom > lastThreshold;
    if (isLastVisible) {
      return lastEntry.id;
    }
  }

  let activeIndex = -1;
  for (const [index, rect] of rects.entries()) {
    const threshold = activationOffsets[index] ?? 0;
    if (rect.top <= threshold) {
      activeIndex = index;
    }
  }

  if (activeIndex < 0) {
    return null;
  }

  const activeEntry = tracked[activeIndex];
  const activeRect = rects[activeIndex];
  if (!activeEntry || !activeRect) {
    return null;
  }

  const activeThreshold = activationOffsets[activeIndex] ?? 0;

  // Once the final tracked section scrolls above the activation line (e.g.
  // into non-nav sections like FAQ/Early Access on `/`), clear the indicator.
  return activeIndex === tracked.length - 1 &&
    activeRect.bottom <= activeThreshold
    ? null
    : activeEntry.id;
};

const isSectionVisibleInViewport = (
  tracked: readonly TrackedSection[],
  sectionId: string
): boolean => {
  const entry = tracked.find((item) => item.id === sectionId);
  if (!entry) {
    return false;
  }
  const rect = entry.element.getBoundingClientRect();
  return rect.top >= 0 && rect.top < window.innerHeight;
};

const getTrackedHashId = (
  tracked: readonly TrackedSection[]
): string | null => {
  const hash = window.location.hash.replace(/^#/u, "");
  return tracked.some((entry) => entry.id === hash) ? hash : null;
};

const scrollElementIntoView = (element: Element): void => {
  const isReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  element.scrollIntoView({
    behavior: isReducedMotion ? "auto" : "smooth",
    block: "start",
  });
};

const isSameHashNavigation = (anchor: Element | null, id: string): boolean => {
  if (!(anchor instanceof HTMLAnchorElement)) {
    return false;
  }
  const expectedHash = `#${id}`;
  const isSamePage = anchor.pathname === window.location.pathname;
  return (
    isSamePage &&
    anchor.hash === expectedHash &&
    window.location.hash === expectedHash
  );
};

const isPlainPrimaryClick = (event: MouseEvent): boolean => {
  const hasCommandModifier = event.metaKey || event.ctrlKey;
  const hasSecondaryModifier = event.shiftKey || event.altKey;
  return event.button === 0 && !hasCommandModifier && !hasSecondaryModifier;
};

const attachScrollspy = (
  root: HTMLDivElement | null,
  attrName: string,
  isActiveOnRoute: boolean,
  offset: number
): (() => void) => {
  const anchors = collectAnchors(root, attrName);
  const tracked = isActiveOnRoute
    ? collectTrackedSections(anchors, attrName)
    : [];

  if (!isActiveOnRoute || tracked.length === 0) {
    applyActiveAnchor(anchors, attrName, null);
    return () => {
      applyActiveAnchor(anchors, attrName, null);
    };
  }

  let frameId = 0;
  let idleTimer = 0;
  let maxTimer = 0;
  let lockedId: string | null = null;
  let pinnedClickId: string | null = null;
  let pinnedScrollY = 0;
  let currentActiveId: string | null | undefined;
  let cachedOffsets: readonly number[] | null = null;
  let isFirstResizeObservation = true;

  const getActivationOffsets = (): readonly number[] => {
    cachedOffsets ??= measureActivationOffsets(tracked, offset);
    return cachedOffsets;
  };

  const commitActive = (nextId: string | null): void => {
    if (nextId === currentActiveId) {
      return;
    }
    currentActiveId = nextId;
    applyActiveAnchor(anchors, attrName, nextId);
  };

  const clearLockTimers = (): void => {
    window.clearTimeout(idleTimer);
    window.clearTimeout(maxTimer);
    idleTimer = 0;
    maxTimer = 0;
  };

  const syncFromScroll = (): void => {
    frameId = 0;
    if (lockedId !== null) {
      return;
    }
    if (pinnedClickId !== null) {
      if (Math.abs(window.scrollY - pinnedScrollY) <= BOTTOM_TOLERANCE_PX) {
        return;
      }
      pinnedClickId = null;
    }
    commitActive(computeActiveSectionId(tracked, getActivationOffsets()));
  };

  const scheduleSync = (): void => {
    if (frameId !== 0) {
      return;
    }
    frameId = window.requestAnimationFrame(syncFromScroll);
  };

  const settleLock = (): void => {
    const finishedId = lockedId;
    if (finishedId === null) {
      return;
    }
    lockedId = null;
    clearLockTimers();

    const naturalId = computeActiveSectionId(tracked, getActivationOffsets());
    if (
      naturalId !== finishedId &&
      isAtDocumentBottom() &&
      isSectionVisibleInViewport(tracked, finishedId)
    ) {
      pinnedClickId = finishedId;
      pinnedScrollY = window.scrollY;
      commitActive(finishedId);
      return;
    }

    pinnedClickId = null;
    commitActive(naturalId);
  };

  const cancelLock = (): void => {
    if (lockedId !== null) {
      lockedId = null;
      clearLockTimers();
    }
    pinnedClickId = null;
  };

  const lockToSection = (sectionId: string): void => {
    pinnedClickId = null;
    lockedId = sectionId;
    commitActive(sectionId);
    clearLockTimers();
    idleTimer = window.setTimeout(settleLock, CLICK_LOCK_IDLE_MS);
    maxTimer = window.setTimeout(settleLock, CLICK_LOCK_MAX_MS);
  };

  const handleScroll = (): void => {
    if (lockedId !== null) {
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(settleLock, CLICK_LOCK_IDLE_MS);
      return;
    }
    scheduleSync();
  };

  const handleResize = (): void => {
    if (isFirstResizeObservation) {
      isFirstResizeObservation = false;
      return;
    }
    cachedOffsets = null;
    pinnedClickId = null;
    scheduleSync();
  };

  const handleKeyDown = (event: KeyboardEvent): void => {
    if (Object.hasOwn(MANUAL_SCROLL_KEYS, event.key)) {
      cancelLock();
    }
  };

  const handleClick = (event: MouseEvent): void => {
    if (!isPlainPrimaryClick(event) || !(event.target instanceof Element)) {
      return;
    }
    const anchor = event.target.closest(`[${CSS.escape(attrName)}]`);
    const id = anchor?.getAttribute(attrName) ?? null;
    if (!id) {
      return;
    }
    const target = tracked.find((entry) => entry.id === id);
    if (!target) {
      return;
    }
    lockToSection(id);
    if (!isSameHashNavigation(anchor, id)) {
      return;
    }
    event.preventDefault();
    scrollElementIntoView(target.element);
  };

  const handleDocumentClick = (event: MouseEvent): void => {
    if (!isPlainPrimaryClick(event) || !(event.target instanceof Element)) {
      return;
    }
    const isOutsideLink =
      !root?.contains(event.target) && event.target.closest("a[href]") !== null;
    if (!isOutsideLink) {
      return;
    }
    cancelLock();
    scheduleSync();
  };

  const handleHashChange = (): void => {
    const hashId = getTrackedHashId(tracked);
    if (hashId) {
      lockToSection(hashId);
      return;
    }
    cancelLock();
    scheduleSync();
  };

  const initialHashId = getTrackedHashId(tracked);
  if (initialHashId) {
    lockToSection(initialHashId);
  } else {
    scheduleSync();
  }

  const resizeObserver = new ResizeObserver(handleResize);
  resizeObserver.observe(document.documentElement);

  root?.addEventListener("click", handleClick);
  document.addEventListener("click", handleDocumentClick);
  // eslint-disable-next-line github/prefer-observers -- Scrollspy tracks continuous scroll position against per-section scroll-margin offsets and document-bottom reachability.
  window.addEventListener("scroll", handleScroll);
  window.addEventListener("scrollend", settleLock);
  window.addEventListener("wheel", cancelLock, { passive: true });
  window.addEventListener("touchstart", cancelLock, { passive: true });
  window.addEventListener("keydown", handleKeyDown);
  window.addEventListener("hashchange", handleHashChange);

  return () => {
    window.cancelAnimationFrame(frameId);
    clearLockTimers();
    resizeObserver.disconnect();
    root?.removeEventListener("click", handleClick);
    document.removeEventListener("click", handleDocumentClick);
    window.removeEventListener("scroll", handleScroll);
    window.removeEventListener("scrollend", settleLock);
    window.removeEventListener("wheel", cancelLock);
    window.removeEventListener("touchstart", cancelLock);
    window.removeEventListener("keydown", handleKeyDown);
    window.removeEventListener("hashchange", handleHashChange);
    applyActiveAnchor(anchors, attrName, null);
  };
};

export const Scrollspy = ({
  children,
  className,
  offset = 128,
  dataAttribute = "scrollspy",
  isActiveOnRoute = true,
  minWidthMedia,
}: ScrollspyProps): ReactNode => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = containerRef.current;
    const attrName = `data-${dataAttribute}-anchor`;
    const mediaQuery = minWidthMedia ? window.matchMedia(minWidthMedia) : null;
    let teardown: (() => void) | null = null;

    const sync = (): void => {
      teardown?.();
      if (mediaQuery && !mediaQuery.matches) {
        applyActiveAnchor(collectAnchors(root, attrName), attrName, null);
        teardown = null;
        return;
      }
      teardown = attachScrollspy(root, attrName, isActiveOnRoute, offset);
    };

    sync();
    mediaQuery?.addEventListener("change", sync);

    return () => {
      mediaQuery?.removeEventListener("change", sync);
      teardown?.();
    };
  }, [dataAttribute, isActiveOnRoute, minWidthMedia, offset]);

  return (
    <div ref={containerRef} data-slot="scrollspy" className={className}>
      {children}
    </div>
  );
};
