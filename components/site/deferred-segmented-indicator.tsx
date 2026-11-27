"use client";

import { SegmentedControlIndicator } from "@ui-sdk/react/segmented-control";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";

// eslint-disable-next-line sonarjs/function-name -- React component names use PascalCase.
export const DeferredSegmentedIndicator = ({
  className,
}: {
  readonly className: string;
}): ReactNode => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setIsReady(true);
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return isReady ? <SegmentedControlIndicator className={className} /> : null;
};
