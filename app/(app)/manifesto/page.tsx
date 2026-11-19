import { ArrowRight, ShieldCheck, Users } from "lucide-react";
import Link from "next/link";
import { PageHero, Section } from "@/components/site/page";
import { Reveal, StaggerItem, StaggerReveal } from "@/components/site/reveal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";

const manifestoSections = [
  {
    label: "01 // The Problem",
    title:
      "Mission teams should not have to spend this much time on system glue.",
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

      <div className="border-border bg-secondary/30 mx-4 my-12 rounded-[1.85rem] border px-6 py-8 sm:mx-8 sm:px-8">
        <p className="font-heading text-foreground text-2xl leading-relaxed font-medium tracking-[-0.04em] text-balance italic md:text-3xl">
          Small inputs. Mountain-moving outputs.
        </p>
      </div>

      <Section className="border-border bg-card border-b">
        <Reveal>
          <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-12 lg:gap-24">
            <div className="order-2 lg:order-1 lg:col-span-7 lg:pt-8">
              <div className="surface-panel border-border rounded-[1.85rem] border p-6 shadow-[var(--shadow-card)]">
                <div className="text-primary mb-6 font-mono text-[10px] tracking-widest uppercase">
                  WHAT STAYS VISIBLE
                </div>
                <div className="flex flex-col gap-8">
                  <div className="flex items-start gap-6">
                    <div className="border-border bg-secondary text-primary shrink-0 rounded-sm border p-3">
                      <Users size={24} />
                    </div>
                    <div>
                      <h4 className="font-heading text-foreground mb-2 text-xl font-semibold tracking-[-0.04em]">
                        Christian faith
                      </h4>
                      <p className="text-muted-foreground leading-relaxed font-light text-balance">
                        Statement of Faith is public because we do not want the
                        convictions behind the work to be hidden or implied.
                      </p>
                    </div>
                  </div>
                  <div className="bg-border h-px w-full" />
                  <div className="flex items-start gap-6">
                    <div className="border-border bg-secondary text-foreground shrink-0 rounded-sm border p-3">
                      <ShieldCheck size={24} />
                    </div>
                    <div>
                      <h4 className="font-heading text-foreground mb-2 text-xl font-semibold tracking-[-0.04em]">
                        Nonprofit covering
                      </h4>
                      <p className="text-muted-foreground leading-relaxed font-light text-balance">
                        Asym operates under Global Fellowship Inc. with board
                        oversight and financial accountability because trust
                        should be concrete.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 flex flex-col self-start lg:sticky lg:top-32 lg:order-2 lg:col-span-5 lg:items-end lg:text-right">
              <div className="flex flex-col gap-6">
                <div className="border-border bg-secondary/50 inline-flex w-fit items-center gap-3 rounded-sm border px-3 py-1.5 backdrop-blur-md">
                  <span className="text-primary font-mono text-[10px] tracking-widest uppercase">
                    04 // What stays visible
                  </span>
                </div>
                <h2 className="font-heading text-foreground text-right text-4xl leading-[0.9] font-semibold tracking-[-0.06em] text-balance md:text-5xl lg:text-6xl">
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
        <div className="pointer-events-none absolute top-1/2 left-1/2 z-0 -translate-x-1/2 -translate-y-1/2 opacity-10">
          <div className="bg-primary/20 h-64 w-64 rounded-full blur-3xl" />
        </div>

        <Reveal>
          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <div className="border-border bg-secondary/50 text-muted-foreground mb-8 inline-flex items-center gap-2 rounded-sm border px-3 py-1.5 font-mono text-[10px] tracking-widest uppercase backdrop-blur-md">
              <span className="text-primary/80">*</span>
              <span>05 // Open hands</span>
            </div>

            <h2 className="font-heading text-foreground mb-12 text-4xl leading-tight font-semibold tracking-[-0.06em] text-balance md:text-6xl">
              We operate with open hands.
              <br />
              <span className="text-muted-foreground">
                No lock-in mindset. No vague trust claims. Clear foundations.
              </span>
            </h2>

            <div className="mb-20">
              <Link
                href="/statement-of-faith"
                className="border-border bg-card text-muted-foreground hover:border-foreground hover:text-foreground group inline-flex items-center gap-3 rounded-sm border px-6 py-3 font-mono text-xs tracking-widest uppercase transition-all"
              >
                See our Statement of Faith{" "}
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>

            <div className="mx-auto max-w-md">
              <div className="border-border bg-card rounded-[1.6rem] border p-1">
                <div className="bg-background flex flex-col items-center gap-6 rounded-[1.4rem] p-8">
                  <div className="border-border bg-secondary/50 flex h-16 w-16 items-center justify-center rounded-full border">
                    <span className="text-muted-foreground text-2xl font-bold">
                      T
                    </span>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-2 font-mono text-[10px] tracking-[0.2em] uppercase">
                      Public trust
                    </p>
                    <span className="font-heading text-foreground flex flex-col gap-1 text-2xl font-semibold tracking-[-0.05em]">
                      Visible foundations
                      <span className="text-muted-foreground text-sm font-medium tracking-normal">
                        Statement of Faith | Financials | Open Source and Trust
                      </span>
                    </span>
                  </div>
                  <div className="border-border text-muted-foreground flex w-full justify-between border-t pt-6 font-mono text-[10px] tracking-widest uppercase">
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
