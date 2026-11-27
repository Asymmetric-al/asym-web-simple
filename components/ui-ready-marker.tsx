"use client";

import { useEffect } from "react";
import { useIsClient } from "@/lib/use-is-client";
import type { ReactNode } from "react";

// eslint-disable-next-line sonarjs/function-name -- React component names use PascalCase.
export const UiReadyMarker = (): ReactNode => {
  const isHydrated = useIsClient();

  useEffect(() => {
    if (isHydrated) {
      document.documentElement.setAttribute("data-ui-ready", "true");
    }

    return () => {
      document.documentElement.removeAttribute("data-ui-ready");
    };
  }, [isHydrated]);

  return null;
};
