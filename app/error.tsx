"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Container } from "@/components/site/container";
import { buttonVariants } from "@/components/ui/button-variants";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

const ReloadIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    data-icon="inline-end"
    aria-hidden="true"
  >
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    data-icon="inline-end"
    aria-hidden="true"
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

export default function ErrorPage({
  error,
  reset,
}: {
  readonly error: Error & { digest?: string };
  readonly reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
  }, [error]);

  return (
    <div className="relative isolate flex min-h-dvh flex-col overflow-x-clip">
      <div aria-hidden="true" className="page-atmosphere" />
      <main
        id="main-content"
        tabIndex={-1}
        className="flex flex-1 items-center py-24 outline-none"
      >
        <Container className="max-w-3xl">
          <p className="text-primary/82 dark:text-ring font-mono text-[0.8125rem] font-medium tracking-[0.02em]">
            Something went wrong
          </p>
          <h1 className="font-heading text-foreground mt-4 text-[clamp(2.4rem,5vw,3.8rem)] leading-[1.02] font-semibold tracking-[-0.04em] text-balance">
            This page couldn’t finish loading.
          </h1>
          <p className="text-muted-foreground mt-5 max-w-[38rem] text-lg leading-8">
            Try loading the page again, or return to the{" "}
            <span translate="no">{siteConfig.shortName}</span> homepage.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => reset()}
              className={cn(buttonVariants({ size: "lg" }), "px-6")}
            >
              Try again
              <ReloadIcon />
            </button>
            <Link
              href="/"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "px-6"
              )}
            >
              Go to the homepage
              <ArrowRightIcon />
            </Link>
          </div>
        </Container>
      </main>
    </div>
  );
}
