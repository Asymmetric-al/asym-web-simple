"use client";

import { ArrowRight, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { Container } from "@/components/site/container";
import { buttonVariants } from "@/components/ui/button-variants";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

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
    <div className="relative flex min-h-dvh flex-col overflow-x-clip">
      <main
        id="main-content"
        tabIndex={-1}
        className="flex flex-1 items-center py-24 outline-none"
      >
        <Container className="max-w-3xl">
          <p className="text-primary/80 font-mono text-xs tracking-[0.24em] uppercase">
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
              <RotateCcw data-icon="inline-end" aria-hidden="true" />
            </button>
            <Link
              href="/"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "px-6"
              )}
            >
              Go to the homepage
              <ArrowRight data-icon="inline-end" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </main>
    </div>
  );
}
