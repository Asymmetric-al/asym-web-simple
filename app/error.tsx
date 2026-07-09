"use client";

import { buttonVariants } from "@/components/ui/button-variants";
import { Container, PageHero, Section } from "@/components/site/page";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RotateCcw, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
  }, [error]);

  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero
        eyebrow="Unexpected error"
        density="legal"
        title={
          <h1 className="font-heading text-foreground text-[clamp(2.9rem,5vw,4.8rem)] leading-[0.95] font-semibold tracking-[-0.07em] text-balance">
            Something failed inside the current page.
          </h1>
        }
        description="The site shell is still intact, but this route hit an unexpected error. You can retry the page or step back to a stable route."
        meta={["Graceful recovery", "Route-level boundary", "Reduced panic UX"]}
      />

      <Section density="legal" className="pt-0">
        <Container className="grid gap-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
          <Card className="page-shell-glow surface-panel surface-interactive rounded-[2rem]">
            <CardHeader>
              <div className="bg-secondary text-primary flex size-11 items-center justify-center rounded-2xl shadow-sm">
                <ShieldAlert className="size-5" />
              </div>
              <CardTitle className="font-heading text-3xl font-semibold tracking-[-0.05em]">
                Retry first, then route around it.
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => reset()}
                className={buttonVariants({ size: "lg" })}
              >
                Retry this page
                <RotateCcw data-icon="inline-end" />
              </button>
              <Link
                href="/"
                className={buttonVariants({ size: "lg", variant: "outline" })}
              >
                Return home
              </Link>
            </CardContent>
          </Card>

          <Card className="surface-card surface-interactive rounded-[2rem]">
            <CardHeader>
              <CardTitle className="font-heading text-2xl font-semibold tracking-[-0.05em]">
                What we preserve during failure
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4 text-base leading-7">
              <p>The header, footer, and navigation remain available.</p>
              <p>Keyboard users still have a clear exit path.</p>
              <p>
                If the problem persists, use the contact route and include what
                page you were on when this happened.
              </p>
            </CardContent>
          </Card>
        </Container>
      </Section>
    </main>
  );
}
