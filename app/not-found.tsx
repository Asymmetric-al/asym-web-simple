import { Container, PageHero, Section } from "@/components/site/page";
import { buttonVariants } from "@/components/ui/button-variants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteConfig } from "@/lib/config";
import { ArrowRight, Compass } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero
        eyebrow="404"
        density="legal"
        title={
          <h1 className="font-heading text-foreground text-[clamp(2.9rem,5vw,4.8rem)] leading-[0.95] font-semibold tracking-[-0.07em] text-balance">
            The page is missing, but the letter is still here.
          </h1>
        }
        description="The link may be outdated. You can return to the letter or email us."
        actions={[
          { label: "Letter", href: "/#letter" },
          { label: "Build with us", href: "/#talk", variant: "outline" },
        ]}
      />

      <Section density="legal" className="pt-0">
        <Container className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <Card className="page-shell-glow surface-panel surface-interactive rounded-[2rem]">
            <CardHeader>
              <p className="text-primary/70 font-mono text-[0.72rem] tracking-[0.28em] uppercase">
                Suggested anchors
              </p>
              <CardTitle className="font-heading text-3xl font-semibold tracking-[-0.05em]">
                Start with the one-page note.
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3">
              {[
                { href: "/#letter", label: "The letter" },
                { href: "/#why", label: "Why this matters" },
                { href: "/#builders", label: "Builders we are looking for" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="surface-card surface-interactive text-foreground/84 hover:text-foreground rounded-[1.35rem] px-4 py-4 text-sm font-medium transition-transform duration-200 hover:-translate-y-0.5"
                >
                  {item.label}
                </Link>
              ))}
            </CardContent>
          </Card>

          <Card className="surface-card surface-interactive rounded-[2rem]">
            <CardHeader>
              <div className="bg-secondary text-primary flex size-11 items-center justify-center rounded-2xl shadow-sm">
                <Compass className="size-5" aria-hidden="true" />
              </div>
              <CardTitle className="font-heading text-2xl font-semibold tracking-[-0.05em]">
                If you were looking for something specific, tell us.
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4 text-base leading-7">
              <p>
                Broken links are useful signals. If you found this page while
                trying to understand Asym, email us and we will route you
                directly.
              </p>
              <Link
                href={`mailto:${siteConfig.email}?subject=Building%20with%20Asym`}
                className={buttonVariants({ size: "lg" })}
              >
                Email {siteConfig.email}
                <ArrowRight data-icon="inline-end" aria-hidden="true" />
              </Link>
            </CardContent>
          </Card>
        </Container>
      </Section>
    </main>
  );
}
