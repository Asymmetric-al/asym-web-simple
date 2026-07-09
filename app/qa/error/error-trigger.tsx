"use client";

import { buttonVariants } from "@/components/ui/button-variants";
import { Container, Section } from "@/components/site/page";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import { useState } from "react";

export function QaErrorTrigger({
  shouldThrowInitially = false,
}: {
  shouldThrowInitially?: boolean;
}) {
  const [shouldThrow, setShouldThrow] = useState(shouldThrowInitially);

  if (shouldThrow) {
    throw new Error("QA error boundary exercise");
  }

  return (
    <main id="main-content" tabIndex={-1}>
      <Section density="marketing">
        <Container className="max-w-3xl">
          <Card className="surface-panel rounded-[2rem]">
            <CardHeader>
              <div className="bg-secondary text-primary flex size-11 items-center justify-center rounded-2xl shadow-sm">
                <AlertTriangle className="size-5" />
              </div>
              <CardTitle className="font-heading text-3xl font-semibold tracking-[-0.05em]">
                QA error harness
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground text-base leading-7">
                This internal route exists only to exercise the App Router error
                boundary in end-to-end tests.
              </p>
              <button
                type="button"
                onClick={() => setShouldThrow(true)}
                className={buttonVariants({ size: "lg" })}
              >
                Trigger route error
              </button>
            </CardContent>
          </Card>
        </Container>
      </Section>
    </main>
  );
}
