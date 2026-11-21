"use client";

import { useSyncExternalStore } from "react";

const noop = () => {
  // Static subscription for SSR-safe client hydration detection.
};

const emptySubscribe = () => noop;

export const useIsClient = (): boolean =>
  useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
