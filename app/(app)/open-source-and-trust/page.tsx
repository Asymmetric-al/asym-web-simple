import { PageHero, Section } from "@/components/site/page";
import { Reveal, StaggerItem, StaggerReveal } from "@/components/site/reveal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createMetadata } from "@/lib/metadata";
import { Blocks, BookOpen, ShieldCheck, Wrench } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

const trustCards = [
  {
    title: "Supported product first",
    description:
      "Most teams simply use Asym as a supported system. You do not need an internal engineering team to benefit from the product.",
    icon: ShieldCheck,
  },
  {
    title: "Contribution stays optional",
    description:
      "If your team wants to extend or contribute, you can. If you do not, nothing about the normal product experience depends on it.",
    icon: Wrench,
  },
  {
    title: "Transparency and stewardship",
    description:
      "Open-source foundations reduce long-term trust risk and make ownership easier to understand over time.",
    icon: Blocks,
  },
  {
    title: "Faith stays visible",
    description:
      "Asym is openly Christian and operates under nonprofit covering, so trust is not reduced to technical claims alone.",
    icon: BookOpen,
  },
] as const;

const publicLinks = [
  {
    title: "Statement of Faith",
    href: "/statement-of-faith",
    description:
      "Read the doctrinal foundation behind the work.",
  },
  {
    title: "Financials",
    href: "/501c3",
    description:
      "Review nonprofit covering, financial oversight, and donation treatment.",
  },
  {
    title: "System specs",
    href: "/specs",
    description:
      "See the architecture, ownership, and technical choices behind the system.",
  },
] as const;

export const metadata: Metadata = createMetadata({
  title: "Open-Source Foundations and Trust",
  description:
    "See how Asym uses open-source foundations, transparent ownership, Christian faith, and nonprofit covering to build long-term trust for missions teams.",
  path: "/open-source-and-trust",
});

export default function OpenSourceAndTrustPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero
        eyebrow="Open Source and Trust"
        title={
          <h1 className="font-heading text-foreground text-[clamp(3rem,6vw,5rem)] leading-[0.94] font-semibold tracking-[-0.07em] text-balance">
            Built on open-source foundations, with transparent ownership and room to extend.
          </h1>
        }
        description="Asym is built in the open because transparency, stewardship, and long-term trust matter. Most teams simply benefit from that. If your team wants to extend or contribute, you can."
        actions={[
          { label: "Join the Waitlist", href: "/waitlist" },
          {
            label: "Learn how Asym is built",
            href: "/specs",
            variant: "outline",
          },
        ]}
        meta={[
          "Transparent foundations",
          "Supported product first",
          "Contribution optional",
          "Faith and financials visible",
          "Nonprofit covering visible",
        ]}
      >
        <Reveal trigger="mount">
          <Card className="page-shell-glow surface-interactive border-foreground/10 bg-primary text-primary-foreground rounded-[2rem] border shadow-[0_32px_82px_-56px_rgba(22,33,43,0.82)]">
            <CardHeader>
              <p className="text-primary-foreground/70 font-mono text-[0.72rem] tracking-[0.28em] uppercase">
                Why this matters
              </p>
              <CardTitle className="font-heading text-3xl font-semibold tracking-[-0.05em]">
                Trust is easier to build when the foundations are visible.
              </CardTitle>
            </CardHeader>
            <CardContent className="text-primary-foreground/82 flex flex-col gap-3 text-sm leading-7">
              <p>Open foundations help lower long-term trust risk.</p>
              <p>Supported delivery keeps the product practical for normal teams.</p>
              <p>Faith and nonprofit covering stay visible instead of buried.</p>
            </CardContent>
          </Card>
        </Reveal>
      </PageHero>

      <Section className="section-divider-accent">
        <div className="grid gap-4 md:grid-cols-2">
          <StaggerReveal>
            {trustCards.map((item) => (
              <StaggerItem key={item.title}>
                <Card className="surface-card surface-interactive h-full rounded-[1.8rem]">
                  <CardHeader>
                    <div className="bg-secondary text-primary flex size-11 items-center justify-center rounded-2xl shadow-sm">
                      <item.icon className="size-5" />
                    </div>
                    <CardTitle className="font-heading text-xl font-semibold tracking-[-0.04em]">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-muted-foreground text-sm leading-7">
                    {item.description}
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </Section>

      <Section tone="sky" className="section-divider-accent">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-start">
          <Reveal>
            <Card className="page-shell-glow surface-panel surface-interactive rounded-[2rem] p-1">
              <CardHeader className="pb-0">
                <p className="text-primary/70 font-mono text-[0.72rem] tracking-[0.28em] uppercase">
                  Public trust surfaces
                </p>
                <CardTitle className="font-heading text-3xl font-semibold tracking-[-0.05em]">
                  The trust story should not depend on private explanations.
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground flex flex-col gap-4 text-base leading-7">
                <p>
                  The public website should make trust legible:
                  Christian faith, nonprofit covering, open-source foundations,
                  and system transparency all belong in the public story.
                </p>
                <p>
                  That is why Asym keeps Statement of Faith, Financials, and
                  system specs visible instead of treating them like fine print.
                </p>
              </CardContent>
            </Card>
          </Reveal>
          <div className="grid gap-4">
            <StaggerReveal>
              {publicLinks.map((item) => (
                <StaggerItem key={item.href}>
                  <Card className="surface-card surface-interactive rounded-[1.8rem]">
                    <CardHeader>
                      <CardTitle className="font-heading text-xl font-semibold tracking-[-0.04em]">
                        <Link href={item.href} className="link-resilient">
                          {item.title}
                        </Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-muted-foreground text-sm leading-7">
                      {item.description}
                    </CardContent>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerReveal>
          </div>
        </div>
      </Section>
    </main>
  );
}
