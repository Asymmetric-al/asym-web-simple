"use client";

import { startTransition, useEffect, useState } from "react";

export const useIsClient = (): boolean => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      startTransition(() => {
        setIsClient(true);
      });
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return isClient;
};
