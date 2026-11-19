"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

/**
Progressive one-time rail reveal for the connected workflow sequence. Copy always stays at opacity 1 for SSR, print, and full-page captures; only the connecting rail and a subtle step settle trigger when scrolled into view on motion-enabled devices.
*/
export const WorkflowReveal = ({
  children,
  className,
}: {
  readonly children: ReactNode;
  readonly className?: string;
}): ReactNode => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) {
      return;
    }

    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      node.dataset.workflowReveal = "visible";
      return;
    }

    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.96) {
      node.dataset.workflowReveal = "visible";
      return;
    }

    node.dataset.workflowReveal = "armed";

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            node.dataset.workflowReveal = "visible";
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.01, rootMargin: "0px" }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};
