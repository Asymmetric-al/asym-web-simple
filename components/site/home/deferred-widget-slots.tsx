"use client";

import { Suspense, lazy, startTransition, useEffect, useState } from "react";
import type { GroundTruthWorkflow } from "@/components/site/reactbits/features-22-interactive";
import type { PipelineProps } from "@/components/site/reactbits/pipeline-interactive";
import type { ReactNode } from "react";

const LazyPrivacyMatrix = lazy(() =>
  import("@/components/site/home/privacy-matrix-interactive").then((mod) => ({
    default: mod.PrivacyMatrixInteractive,
  }))
);

const LazyStatusLedger = lazy(() =>
  import("@/components/site/home/status-ledger-interactive").then((mod) => ({
    default: mod.StatusLedgerInteractive,
  }))
);

const LazyCta17 = lazy(() =>
  import("@/components/site/reactbits/cta-17-interactive").then((mod) => ({
    default: mod.Cta17Interactive,
  }))
);

const LazyFeatures22 = lazy(() =>
  import("@/components/site/reactbits/features-22-interactive").then((mod) => ({
    default: mod.Features22Interactive,
  }))
);

const LazyScreensGallery = lazy(() =>
  import("@/components/site/reactbits/screens-gallery-interactive").then(
    (mod) => ({
      default: mod.ScreensGalleryInteractive,
    })
  )
);

const LazyPipeline = lazy(() =>
  import("@/components/site/reactbits/pipeline-interactive").then((mod) => ({
    default: mod.PipelineInteractive,
  }))
);

const LazyFaq11 = lazy(() =>
  import("@/components/site/reactbits/faq-11-interactive").then((mod) => ({
    default: mod.Faq11Interactive,
  }))
);

const useIsFrameReady = (framesToWait: number): boolean => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let remaining = framesToWait;
    let frameId = 0;

    const step = (): void => {
      if (remaining <= 1) {
        startTransition(() => {
          setIsReady(true);
        });
        return;
      }
      remaining -= 1;
      frameId = window.requestAnimationFrame(step);
    };

    frameId = window.requestAnimationFrame(step);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [framesToWait]);

  return isReady;
};

export const PrivacyMatrixSlot = ({
  children,
}: {
  readonly children: ReactNode;
}): ReactNode => {
  const isReady = useIsFrameReady(2);

  if (!isReady) {
    return children;
  }

  return (
    <Suspense fallback={children}>
      <LazyPrivacyMatrix />
    </Suspense>
  );
};

export const Features22Slot = ({
  workflows,
  children,
}: {
  readonly workflows: readonly GroundTruthWorkflow[];
  readonly children: ReactNode;
}): ReactNode => {
  const isReady = useIsFrameReady(4);

  if (!isReady) {
    return children;
  }

  return (
    <Suspense fallback={children}>
      <LazyFeatures22 workflows={workflows} />
    </Suspense>
  );
};

export const ScreensGallerySlot = ({
  children,
}: {
  readonly children: ReactNode;
}): ReactNode => {
  const isReady = useIsFrameReady(6);

  if (!isReady) {
    return children;
  }

  return (
    <Suspense fallback={children}>
      <LazyScreensGallery />
    </Suspense>
  );
};

export const Cta17Slot = ({
  children,
}: {
  readonly children: ReactNode;
}): ReactNode => {
  const isReady = useIsFrameReady(8);

  if (!isReady) {
    return children;
  }

  return (
    <Suspense fallback={children}>
      <LazyCta17 />
    </Suspense>
  );
};

export const StatusLedgerSlot = ({
  children,
}: {
  readonly children: ReactNode;
}): ReactNode => {
  const isReady = useIsFrameReady(10);

  if (!isReady) {
    return children;
  }

  return (
    <Suspense fallback={children}>
      <LazyStatusLedger />
    </Suspense>
  );
};

export const PipelineSlot = ({
  children,
  ...props
}: PipelineProps & {
  readonly children: ReactNode;
}): ReactNode => {
  const isReady = useIsFrameReady(12);

  if (!isReady) {
    return children;
  }

  return (
    <Suspense fallback={children}>
      <LazyPipeline {...props} />
    </Suspense>
  );
};

export const Faq11Slot = ({
  children,
}: {
  readonly children: ReactNode;
}): ReactNode => {
  const isReady = useIsFrameReady(14);

  if (!isReady) {
    return children;
  }

  return (
    <Suspense fallback={children}>
      <LazyFaq11 />
    </Suspense>
  );
};
