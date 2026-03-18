import { PageHero, Section, SectionHeader } from "@/components/site/page";
import { Reveal, StaggerItem, StaggerReveal } from "@/components/site/reveal";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createMetadata } from "@/lib/metadata";
import {
  Activity,
  Blocks,
  Bot,
  Database,
  FileCode2,
  Fingerprint,
  Globe2,
  Layers3,
  ShieldCheck,
} from "lucide-react";
import type { Metadata } from "next";

const layers = [
  {
    title: "Layer 01 — Languages & Core",
    description: "TypeScript, JavaScript, React, Next.js, Node.js, NestJS, GraphQL, TanStack",
    icon: FileCode2,
  },
  {
    title: "Layer 02 — Data Persistence",
    description: "PostgreSQL, MySQL, Redis, TanStack DB, pgvector, TanStack Query, TanStack Table",
    icon: Database,
  },
  {
    title: "Layer 03 — Mission Control Modules",
    description: "Twenty CRM, Documenso CE, Chatwoot CE",
    icon: Layers3,
  },
  {
    title: "Layer 04 — Content Engine",
    description: "Directus",
    icon: Blocks,
  },
  {
    title: "Layer 05 — Infrastructure & Ops",
    description: "Vercel, AWS, Docker, GitHub, Sentry, OpenTelemetry",
    icon: Globe2,
  },
  {
    title: "Layer 06 — Identity & Security",
    description: "Supabase Authentication",
    icon: Fingerprint,
  },
  {
    title: "Layer 07 — Integrations & Async",
    description: "Stripe, SendGrid, Zapier, Inngest, BullMQ",
    icon: Activity,
  },
  {
    title: "Layer 08 — Interface & Design",
    description: "shadcn/ui, Recharts, Figma",
    icon: ShieldCheck,
  },
  {
    title: "Layer 09 — Intelligence",
    description: "OpenAI",
    icon: Bot,
  },
] as const;

const targets = [
  { label: "Edge Protocol", value: "HTTP/3 + QUIC" },
  { label: "API Read Latency", value: "< 150ms (p50)" },
  { label: "API Write Latency", value: "< 600ms (p95)" },
  { label: "Core Web Vitals", value: "75th % Pass" },
  { label: "Availability", value: "99.9% SLO" },
  { label: "Render Start", value: "~1.0s Global" },
] as const;

const releaseGates = [
  "Statement Studio totals match source gifts",
  "Reconciliation ties Stripe payouts to journals",
  "SPF, DKIM, DMARC stay green across tenants",
  "Secrets scan verified clean",
  "PII masking verified in OpenTelemetry logs",
  "Zapier flows verified idempotent",
  "Two-step donor recovery paths verified",
] as const;

export const metadata: Metadata = createMetadata({
  title: "Specs",
  description:
    "The architecture, performance targets, and release gates behind the Asymmetric.al mission operating system.",
  path: "/specs",
});

export default function SpecsPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="System Normal | Tech Manifest v2.1.0"
        title={
          <h1 className="text-balance font-heading text-[clamp(3rem,6vw,5.15rem)] font-semibold leading-[0.94] tracking-[-0.07em] text-foreground">
            The Architecture.
          </h1>
        }
        description="We do not hide our choices. We build on best-in-class open source technologies and proven cloud primitives because stewardship includes technical durability."
        meta={["Open source", "Portable", "Observable", "Secure", "Vercel-friendly"]}
      >
        <Reveal>
          <div className="page-shell-glow rounded-[2rem] border border-foreground/10 bg-primary px-6 py-7 text-primary-foreground shadow-[0_32px_80px_-56px_rgba(22,33,43,0.8)] sm:px-8 sm:py-9">
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.28em] text-primary-foreground/70">
              Engine room
            </p>
            <div className="mt-5 grid gap-3">
              {targets.slice(0, 4).map((item) => (
                <div
                  key={item.label}
                  className="rounded-[1.2rem] border border-white/10 bg-white/6 px-4 py-3"
                >
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-primary-foreground/66">
                    {item.label}
                  </p>
                  <p className="mt-1 font-heading text-xl font-semibold tracking-[-0.04em]">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </PageHero>

      <Section>
        <SectionHeader
          eyebrow="Layered stack"
          title="Built on open foundations and cloud primitives that can survive the long haul."
          description="These choices are practical, portable, and legible to serious engineering teams. Nothing here depends on proprietary magic."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <StaggerReveal>
            {layers.map((item) => (
              <StaggerItem key={item.title}>
                <Card className="surface-card h-full rounded-[1.8rem]">
                  <CardHeader>
                    <div className="flex size-11 items-center justify-center rounded-2xl bg-secondary text-primary shadow-sm">
                      <item.icon className="size-5" />
                    </div>
                    <CardTitle className="font-heading text-xl font-semibold tracking-[-0.04em]">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm leading-7 text-muted-foreground">
                    {item.description}
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </Section>

      <Section tone="sky">
        <SectionHeader
          eyebrow="Performance targets"
          title="Strong operational expectations, not vague aspirations."
          description="The system should feel fast, stay available, and be observable enough to trust when the stakes are real."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <StaggerReveal>
            {targets.map((item) => (
              <StaggerItem key={item.label}>
                <Card className="surface-card rounded-[1.7rem]">
                  <CardHeader>
                    <p className="font-mono text-[0.72rem] uppercase tracking-[0.28em] text-primary/70">
                      {item.label}
                    </p>
                    <CardTitle className="font-heading text-2xl font-semibold tracking-[-0.05em]">
                      {item.value}
                    </CardTitle>
                  </CardHeader>
                </Card>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </Section>

      <Section>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)]">
          <Reveal>
            <div className="surface-panel rounded-[2rem] p-7 sm:p-8">
              <p className="font-mono text-[0.72rem] uppercase tracking-[0.28em] text-primary/70">
                Release posture
              </p>
              <h2 className="mt-4 font-heading text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.02] tracking-[-0.06em]">
                Release gates are stewardship gates.
              </h2>
              <p className="mt-5 text-base leading-7 text-muted-foreground">
                We care about elegance, but we care more about truth in the
                system: money reconciled, statements correct, deliverability
                healthy, logs scrubbed, workflows safe, and donor recovery
                paths intact.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <Card className="page-shell-glow rounded-[2rem] border border-foreground/10 bg-primary text-primary-foreground shadow-[0_30px_78px_-52px_rgba(22,33,43,0.84)]">
              <CardHeader>
                <p className="font-mono text-[0.72rem] uppercase tracking-[0.3em] text-primary-foreground/70">
                  Release gates
                </p>
                <CardTitle className="font-heading text-2xl font-semibold tracking-[-0.05em]">
                  Current threshold checklist
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid gap-3">
                  {releaseGates.map((gate) => (
                    <li
                      key={gate}
                      className="rounded-[1.25rem] border border-white/10 bg-white/6 px-4 py-3 text-sm leading-6 text-primary-foreground/86"
                    >
                      {gate}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </Section>
    </main>
  );
}
