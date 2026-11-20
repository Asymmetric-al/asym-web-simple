"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";

// eslint-disable-next-line sonarjs/function-name -- React component names use PascalCase.
export const UiReadyMarker = (): ReactNode => {
  useEffect(() => {
    document.documentElement.setAttribute("data-ui-ready", "true");

    return () => {
      document.documentElement.removeAttribute("data-ui-ready");
    };
  }, []);

  return null;
};
