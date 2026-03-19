import { PageHero, Section } from "@/components/site/page";
import { Reveal } from "@/components/site/reveal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function DocumentPage({
  eyebrow,
  title,
  description,
  heading,
  children,
  footer,
  heroMeta,
}: {
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
  heading: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  heroMeta?: string[];
}) {
  return (
    <main id="main-content">
      <PageHero
        eyebrow={eyebrow}
        density="legal"
        title={title}
        description={description}
        {...(heroMeta ? { meta: heroMeta } : {})}
      />

      <Section density="legal" className="pt-0">
        <Reveal trigger="mount">
          <Card className="surface-panel document-shell rounded-[2.15rem]">
            <CardHeader className="border-foreground/8 relative z-10 border-b pb-6">
              <CardTitle className="font-heading text-[clamp(2rem,3vw,3rem)] font-semibold tracking-[-0.05em]">
                {heading}
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10 space-y-0">
              {children}
              {footer ? (
                <div className="document-section pt-7">
                  <div className="content-measure text-muted-foreground text-base leading-7">
                    {footer}
                  </div>
                </div>
              ) : null}
            </CardContent>
          </Card>
        </Reveal>
      </Section>
    </main>
  );
}

export function DocumentSection({
  title,
  eyebrow,
  tone = "default",
  children,
  className,
}: {
  title: ReactNode;
  eyebrow?: ReactNode;
  tone?: "default" | "accent";
  children: ReactNode;
  className?: string;
}) {
  return (
    <section data-tone={tone} className={cn("document-section", className)}>
      {eyebrow ? (
        <p className="text-primary/70 font-mono text-[0.72rem] tracking-[0.28em] uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-heading text-foreground text-[clamp(1.45rem,2vw,2rem)] font-semibold tracking-[-0.04em]">
        {title}
      </h2>
      <div className="content-measure text-muted-foreground grid gap-4 text-base leading-7">
        {children}
      </div>
    </section>
  );
}
