"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

interface ScrollspyProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly offset?: number;
  readonly dataAttribute?: string;
  readonly isActiveOnRoute?: boolean;
}

const ACTIVE_ATTR = "data-active";
const ARIA_CURRENT_ATTR = "aria-current";
const LOCATION_VALUE = "location";

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
    anchor.offsetLeft - Math.max(0, (rail.clientWidth - anchor.offsetWidth) / 2);
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
    const isMatched = activeId !== null && id === activeId;
    if (isMatched) {
      anchor.setAttribute(ACTIVE_ATTR, "true");
      anchor.setAttribute(ARIA_CURRENT_ATTR, LOCATION_VALUE);
      matchedAnchor = anchor;
    } else {
      anchor.removeAttribute(ACTIVE_ATTR);
      if (anchor.getAttribute(ARIA_CURRENT_ATTR) === LOCATION_VALUE) {
        anchor.removeAttribute(ARIA_CURRENT_ATTR);
      }
    }
  }
  if (matchedAnchor) {
    keepAnchorVisibleHorizontally(matchedAnchor);
  }
};

const collectTrackedSections = (
  anchors: readonly Element[],
  attrName: string
): readonly { readonly id: string; readonly element: Element }[] => {
  const results: { readonly id: string; readonly element: Element }[] = [];
  for (const anchor of anchors) {
    const id = anchor.getAttribute(attrName);
    const element = id ? document.querySelector(`#${CSS.escape(id)}`) : null;
    if (id && element) {
      results.push({ id, element });
    }
  }
  return results;
};

/**
Observer-driven scrollspy adapted from ReUI (`@reui/scrollspy`). Uses `IntersectionObserver` with zero scroll-event polling, preserves native anchor and hash navigation, and sets `data-active="true"` plus `aria-current="location"` on matching anchors.
*/
export const Scrollspy = ({
  children,
  className,
  offset = 128,
  dataAttribute = "scrollspy",
  isActiveOnRoute = true,
}: ScrollspyProps): ReactNode => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = containerRef.current;
    const attrName = `data-${dataAttribute}-anchor`;
    const anchors = root
      ? [...root.querySelectorAll(`[${CSS.escape(attrName)}]`)]
      : [];
    const tracked = isActiveOnRoute
      ? collectTrackedSections(anchors, attrName)
      : [];

    if (!isActiveOnRoute || tracked.length === 0) {
      applyActiveAnchor(anchors, attrName, null);
    }

    const visibleIds = new Set<string>();

    const selectVisibleId = (): string | null => {
      for (const entry of tracked) {
        if (visibleIds.has(entry.id)) {
          return entry.id;
        }
      }
      const hash = window.location.hash.replace(/^#/u, "");
      return tracked.some((entry) => entry.id === hash) ? hash : null;
    };

    const observer =
      isActiveOnRoute && tracked.length > 0
        ? new IntersectionObserver(
            (entries) => {
              for (const entry of entries) {
                const sectionId = entry.target.id;
                if (entry.isIntersecting) {
                  visibleIds.add(sectionId);
                  continue;
                }
                visibleIds.delete(sectionId);
              }
              applyActiveAnchor(anchors, attrName, selectVisibleId());
            },
            {
              rootMargin: `-${offset}px 0px -58% 0px`,
              threshold: 0,
            }
          )
        : null;

    if (observer) {
      for (const entry of tracked) {
        observer.observe(entry.element);
      }
    }

    const handleHashChange = (): void => {
      if (!isActiveOnRoute) {
        return;
      }
      const hash = window.location.hash.replace(/^#/u, "");
      if (tracked.some((entry) => entry.id === hash)) {
        applyActiveAnchor(anchors, attrName, hash);
      }
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      observer?.disconnect();
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [dataAttribute, isActiveOnRoute, offset]);

  return (
    <div ref={containerRef} data-slot="scrollspy" className={className}>
      {children}
    </div>
  );
};
