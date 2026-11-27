"use client";

import { useSyncExternalStore } from "react";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

const subscribeToReducedMotion = (notify: () => void): (() => void) => {
  const media = window.matchMedia(REDUCED_MOTION_QUERY);
  media.addEventListener("change", notify);
  return () => {
    media.removeEventListener("change", notify);
  };
};

const isClientReducedMotion = (): boolean =>
  window.matchMedia(REDUCED_MOTION_QUERY).matches;

const isServerReducedMotion = (): boolean => true;

export const useIsReducedMotion = (): boolean =>
  useSyncExternalStore(
    subscribeToReducedMotion,
    isClientReducedMotion,
    isServerReducedMotion
  );
