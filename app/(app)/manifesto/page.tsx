import { PageHero, Section } from "@/components/site/page";
import { Reveal, StaggerItem, StaggerReveal } from "@/components/site/reveal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";
import { ArrowRight, ShieldCheck, Users } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

const manifestoSections = [
  {
    label: "01 // The Problem",
    title: "Mission teams should not have to spend this much time on system glue.",
    paragraphs: [
      "The problem we kept seeing was not a lack of calling or effort. It was too much staff time getting eaten by disconnected tools, spreadsheets, manual handoffs, and software that was never built for Christian missions.",
      "That drag shows up in donor care, missionary visibility, statements, reporting, and month-end. When the system is fragmented, the strain lands on the people already carrying the work.",
      "Asym exists because we believe people doing Gospel work deserve better than old software and fragile workarounds.",
    ],
  },
  {
    label: "02 // The Standard",
    title: "Good software should lower friction and clarify next actions.",
    paragraphs: [
      "We are not interested in software theater. We want donor care, missionary support, statements, reporting, and operations to feel clear enough that teams can move without rebuilding context in three other tools.",
      "That means plain language, visible trust, and fewer handoffs. It means the product should help people know what changed, what matters, and what comes next.",
      "When the work is serious, clarity is not cosmetic. It is stewardship.",
    ],
  },
  {
    label: "03 // What This Means",
    title: "The system should serve the mission, not compete with it.",
    paragraphs: [
      "Asym stays focused on one mission-built system instead of a pile of unrelated tools. The goal is relief that feels concrete: donor self-service, Mission Control for staff, visibility for missionaries, cleaner statements, and stronger reporting.",
      "We also want trust to be visible. Faith, nonprofit covering, ownership, domains, keys, and open-source foundations should not be buried behind private explanations.",
      "That is the philosophy behind the product in plain language: less system glue, more time for people.",
    ],
  },
] as const;

export const metadata: Metadata = createMetadata({
  title: "Why Asym Cares About Clarity and Stewardship",
  description:
    "A short look at the convictions behind Asym: less system glue, clearer follow-through, and visible trust for Christian missions teams.",
  path: "/manifesto",
});

export default function ManifestoPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero
        eyebrow="Why this exists"
        title={
          <h1 className="font-heading text-foreground text-[clamp(3rem,6vw,5.15rem)] leading-[0.94] font-semibold tracking-[-0.07em] text-balance">
            Why Asym cares so much about clarity and stewardship.
          </h1>
        }
        description="This page is the philosophy behind the product in plain language. We believe people doing Gospel work should not lose staff time to disconnected systems, weak follow-through, and software that was never built for missions."
        meta={[
          "Stewardship",
          "Clarity first",
          "Visible trust",
          "Mission reality",
        ]}
      >
        <Reveal trigger="mount">
          <Card className="page-shell-glow border-foreground/10 bg-primary text-primary-foreground rounded-[2rem] border shadow-[0_32px_84px_-58px_rgba(22,33,43,0.82)]">
            <CardHeader>
              <p className="text-primary-foreground/70 font-mono text-[0.72rem] tracking-[0.28em] uppercase">
                Guiding phrase
              </p>
              <CardTitle className="font-heading text-3xl font-semibold tracking-[-0.05em]">
                Less system glue. More time for people.
              </CardTitle>
            </CardHeader>
            <CardContent className="text-primary-foreground/82 space-y-4 text-sm leading-7">
              <p>
                We want the product to feel calm, clear, and dependable for
                teams carrying serious work.
              </p>
              <p>
                The goal is not to sound impressive. The goal is to reduce drag
                for donor care, missionary support, statements, reporting, and
                operations.
              </p>
            </CardContent>
          </Card>
        </Reveal>
      </PageHero>

      <Section className="section-divider-accent">
        <div className="grid gap-4">
          <StaggerReveal>
            {manifestoSections.map((section, index) => (
              <StaggerItem key={section.label}>
                <Card
                  className={cn(
                    "surface-panel surface-interactive rounded-[2rem]",
                    index % 2 === 1 && "bg-secondary/24"
                  )}
                >
                  <CardHeader>
                    <p className="text-primary/70 font-mono text-[0.72rem] tracking-[0.28em] uppercase">
                      {section.label}
                    </p>
                    <CardTitle className="font-heading max-w-[18ch] text-[clamp(1.9rem,3.6vw,2.8rem)] leading-[1.02] font-semibold tracking-[-0.05em]">
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-muted-foreground grid gap-4 text-base leading-7 lg:max-w-[75ch]">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </Section>

      <div className="mx-4 my-12 rounded-[1.85rem] border border-border bg-secondary/30 px-6 py-8 sm:mx-8 sm:px-8">
        <p className="font-heading text-2xl font-medium tracking-[-0.04em] text-foreground italic leading-relaxed text-balance md:text-3xl">
          Small inputs. Mountain-moving outputs.
        </p>
      </div>

      <Section className="border-b border-border bg-card">
        <Reveal>
          <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-12 lg:gap-24">
            <div className="order-2 lg:col-span-7 lg:order-1 lg:pt-8">
              <div className="surface-panel rounded-[1.85rem] border border-border p-6 shadow-[var(--shadow-card)]">
                <div className="mb-6 font-mono text-[10px] uppercase tracking-widest text-primary">
                  WHAT STAYS VISIBLE
                </div>
                <div className="flex flex-col gap-8">
                  <div className="flex items-start gap-6">
                    <div className="rounded-sm border border-border bg-secondary p-3 text-primary shrink-0">
                      <Users size={24} />
                    </div>
                    <div>
                      <h4 className="font-heading mb-2 text-xl font-semibold tracking-[-0.04em] text-foreground">
                        Christian faith
                      </h4>
                      <p className="text-muted-foreground font-light leading-relaxed text-balance">
                        Statement of Faith is public because we do not want the
                        convictions behind the work to be hidden or implied.
                      </p>
                    </div>
                  </div>
                  <div className="h-px w-full bg-border" />
                  <div className="flex items-start gap-6">
                    <div className="rounded-sm border border-border bg-secondary p-3 text-foreground shrink-0">
                      <ShieldCheck size={24} />
                    </div>
                    <div>
                      <h4 className="font-heading mb-2 text-xl font-semibold tracking-[-0.04em] text-foreground">
                        Nonprofit covering
                      </h4>
                      <p className="text-muted-foreground font-light leading-relaxed text-balance">
                        Asym operates under Global Fellowship Inc. with board
                        oversight and financial accountability because trust
                        should be concrete.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 flex flex-col lg:col-span-5 lg:order-2 lg:sticky lg:top-32 lg:items-end lg:text-right self-start">
              <div className="flex flex-col gap-6">
                <div className="inline-flex items-center gap-3 rounded-sm border border-border bg-secondary/50 px-3 py-1.5 w-fit backdrop-blur-md">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-primary">
                    04 // What stays visible
                  </span>
                </div>
                <h2 className="font-heading text-4xl font-semibold tracking-[-0.06em] text-foreground leading-[0.9] text-balance text-right md:text-5xl lg:text-6xl">
                  Faith, covering,
                  <br />
                  and governance.
                </h2>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      <Section className="bg-background relative overflow-hidden">
        <div className="absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 opacity-10 pointer-events-none">
          <div className="h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
        </div>

        <Reveal>
          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <div className="mb-8 inline-flex items-center gap-2 rounded-sm border border-border bg-secondary/50 px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest text-muted-foreground backdrop-blur-md">
              <span className="text-primary/80">*</span>
              <span>05 // Open hands</span>
            </div>

            <h2 className="font-heading mb-12 text-4xl font-semibold tracking-[-0.06em] text-foreground leading-tight text-balance md:text-6xl">
              We operate with open hands.
              <br />
              <span className="text-muted-foreground">
                No lock-in mindset. No vague trust claims. Clear foundations.
              </span>
            </h2>

            <div className="mb-20">
              <Link
                href="/statement-of-faith"
                className="inline-flex items-center gap-3 rounded-sm border border-border bg-card px-6 py-3 text-xs font-mono uppercase tracking-widest text-muted-foreground transition-all hover:border-foreground hover:text-foreground group"
              >
                See our Statement of Faith{" "}
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>

            <div className="mx-auto max-w-md">
              <div className="rounded-[1.6rem] border border-border bg-card p-1">
                <div className="flex flex-col items-center gap-6 rounded-[1.4rem] bg-background p-8">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border border-border bg-secondary/50">
                    <span className="text-2xl font-bold text-muted-foreground">
                      T
                    </span>
                  </div>
                  <div>
                    <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      Public trust
                    </p>
                    <span className="font-heading flex flex-col gap-1 text-2xl font-semibold tracking-[-0.05em] text-foreground">
                      Visible foundations
                      <span className="text-sm font-medium tracking-normal text-muted-foreground">
                        Statement of Faith | Financials | Open Source and Trust
                      </span>
                    </span>
                  </div>
                  <div className="flex w-full justify-between border-t border-border pt-6 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                    <span>Asym</span>
                    <span>Built in public</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>
    </main>
  );
}
