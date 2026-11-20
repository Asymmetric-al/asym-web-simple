"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";

// eslint-disable-next-line unicorn/no-top-level-side-effects -- Next.js requires dynamic() at module scope.
const EarlyAccessConfiguredDynamic = dynamic(
  () =>
    import("@/components/site/home/early-access-form").then(
      (mod) => mod.EarlyAccessConfigured
    ),
  { ssr: true }
);

export const EarlyAccessConfiguredLoader = ({
  contactEmail,
}: {
  readonly contactEmail: string | null;
}): ReactNode => <EarlyAccessConfiguredDynamic contactEmail={contactEmail} />;
