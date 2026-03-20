"use client";

import { useEffect } from "react";

export function UiReadyMarker() {
  useEffect(() => {
    document.documentElement.setAttribute("data-ui-ready", "true");

    return () => {
      document.documentElement.removeAttribute("data-ui-ready");
    };
  }, []);

  return null;
}
