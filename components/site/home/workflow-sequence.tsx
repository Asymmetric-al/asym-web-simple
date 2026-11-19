"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

/**
Progressive one-time reveal for the connected workflow sequence. Elements stay visible by default for SSR and no-JS visitors, only arming when the container starts below the viewport fold on motion-enabled devices.
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
      return undefined;
    }

    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      node.dataset.workflowReveal = "visible";
      return undefined;
    }

    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) {
      node.dataset.workflowReveal = "visible";
      return undefined;
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
      { threshold: 0.16, rootMargin: "0px 0px -6% 0px" }
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
