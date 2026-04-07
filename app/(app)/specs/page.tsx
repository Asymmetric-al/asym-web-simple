import { PageHero, Section, SectionHeader } from "@/components/site/page";
import { Reveal, StaggerItem, StaggerReveal } from "@/components/site/reveal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import Link from "next/link";

const layers = [
  {
    title: "Layer 01 — Languages & Core",
    description: "TypeScript, JavaScript, React, Next.js, Node.js, NestJS, GraphQL, TanStack",
    links: [
      { label: "TypeScript", url: "https://github.com/microsoft/TypeScript" },
      { label: "React", url: "https://github.com/facebook/react" },
      { label: "Next.js", url: "https://nextjs.org/" },
      { label: "Node.js", url: "https://github.com/nodejs" },
    ],
    icon: FileCode2,
  },
  {
    title: "Layer 02 — Data Persistence",
    description: "PostgreSQL, MySQL, Redis, TanStack DB, pgvector, TanStack Query, TanStack Table",
    links: [
      { label: "PostgreSQL", url: "https://www.postgresql.org/" },
      { label: "Redis", url: "https://github.com/redis/redis/" },
      { label: "TanStack Query", url: "https://tanstack.com/query/latest" },
    ],
    icon: Database,
  },
  {
    title: "Layer 03 — Mission Control Modules",
    description: "Twenty CRM, Documenso CE, Chatwoot CE",
    links: [
      { label: "Twenty CRM", url: "https://github.com/twentyhq/twenty" },
      { label: "Documenso CE", url: "https://github.com/documenso/documenso" },
      { label: "Chatwoot CE", url: "https://github.com/chatwoot/chatwoot" },
    ],
    icon: Layers3,
  },
  {
    title: "Layer 04 — Content Engine",
    description: "Payload CMS",
    links: [{ label: "Payload CMS", url: "https://payloadcms.com/" }],
    icon: Blocks,
  },
  {
    title: "Layer 05 — Infrastructure & Ops",
    description: "Vercel, GitHub, Sentry, OpenTelemetry",
    links: [
      { label: "Vercel", url: "https://vercel.com/" },
      { label: "GitHub", url: "https://github.com/" },
      { label: "Sentry", url: "https://github.com/getsentry/sentry" },
    ],
    icon: Globe2,
  },
  {
    title: "Layer 06 — Identity & Security",
    description: "Supabase Authentication",
    links: [{ label: "Supabase Auth", url: "https://supabase.com/docs/guides/auth" }],
    icon: Fingerprint,
  },
  {
    title: "Layer 07 — Integrations & Async",
    description: "Stripe, Resend, Zapier, Inngest, BullMQ",
    links: [
      { label: "Stripe", url: "https://stripe.com/" },
      {
        label: "Resend",
        url: "https://resend.com/docs/dashboard/emails/introduction",
      },
      { label: "Zapier", url: "https://zapier.com/" },
    ],
    icon: Activity,
  },
  {
    title: "Layer 08 — Interface & Design",
    description: "shadcn/ui, Recharts, Figma",
    links: [
      { label: "shadcn/ui", url: "https://ui.shadcn.com/" },
      { label: "Recharts", url: "https://recharts.org/" },
      { label: "Figma", url: "https://www.figma.com/" },
    ],
    icon: ShieldCheck,
  },
  {
    title: "Layer 09 — Intelligence",
    description: "OpenAI",
    links: [{ label: "OpenAI", url: "https://openai.com/" }],
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
    <main id="main-content" tabIndex={-1}>
      <PageHero
        eyebrow="System Normal | TECH MANIFEST v2.1.0"
        title={
          <h1 className="font-heading text-foreground text-[clamp(3rem,6vw,5.15rem)] leading-[0.94] font-semibold tracking-[-0.07em] text-balance">
            Transparent Architecture.
          </h1>
        }
        description="We don't hide our choices. We build on a foundation of best-in-class open source technologies and proven cloud primitives. This is the engine room of Asymmetric.al."
        meta={[
          "Open source",
          "Portable",
          "Observable",
          "Secure",
        ]}
      >
        <Reveal trigger="mount">
          <div className="page-shell-glow surface-interactive border-foreground/10 bg-primary text-primary-foreground rounded-[2rem] border px-6 py-7 shadow-[0_32px_80px_-56px_rgba(22,33,43,0.8)] sm:px-8 sm:py-9">
            <p className="text-primary-foreground/70 font-mono text-[0.72rem] tracking-[0.28em] uppercase">
              Engine room
            </p>
            <div className="mt-5 grid gap-3">
              {targets.slice(0, 4).map((item) => (
                <div
                  key={item.label}
                  className="rounded-[1.2rem] border border-white/10 bg-white/6 px-4 py-3"
                >
                  <p className="text-primary-foreground/66 font-mono text-[0.68rem] tracking-[0.22em] uppercase">
                    {item.label}
                  </p>
                  <p className="font-heading mt-1 text-xl font-semibold tracking-[-0.04em]">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </PageHero>

      <Section className="section-divider-accent">
        <SectionHeader
          eyebrow="Layered stack"
          title="Built on open foundations and cloud primitives that can survive the long haul."
          description="These choices are practical, portable, and legible to serious engineering teams. Nothing here depends on proprietary magic."
        />
        <div className="mt-8 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <StaggerReveal>
            {layers.map((item) => (
              <StaggerItem key={item.title}>
                <Card className="surface-card surface-interactive h-full rounded-[1.8rem] transition-all duration-300 hover:border-foreground/20">
                  <CardHeader>
                    <div className="bg-secondary text-primary flex size-11 items-center justify-center rounded-2xl shadow-sm">
                      <item.icon className="size-5" />
                    </div>
                    <CardTitle className="font-heading text-xl font-semibold tracking-[-0.04em]">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-muted-foreground text-sm leading-7">
                    <p>{item.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.links.map((link) => (
                        <Link
                          key={link.label}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/tag inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/50 px-2.5 py-1.5 font-mono text-[10px] text-muted-foreground transition-all hover:border-foreground/20 hover:bg-secondary hover:text-foreground"
                        >
                          {link.label}
                          <span className="opacity-0 transition-opacity group-hover/tag:opacity-100">→</span>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </Section>

      <Section tone="sky" className="section-divider-accent">
        <SectionHeader
          eyebrow="Performance targets"
          title="Strong operational expectations, not vague aspirations."
          description="The system should feel fast, stay available, and be observable enough to trust when the stakes are real."
        />
        <div className="mt-8 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <StaggerReveal>
            {targets.map((item) => (
              <StaggerItem key={item.label}>
                <Card className="surface-card surface-interactive rounded-[1.7rem] border-border hover:border-foreground/20 transition-colors">
                  <CardHeader>
                    <p className="text-primary/70 font-mono text-[0.72rem] tracking-[0.28em] uppercase">
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
            <div className="page-shell-glow surface-panel surface-interactive rounded-[2rem] p-7 sm:p-8">
              <p className="text-primary/70 font-mono text-[0.72rem] tracking-[0.28em] uppercase">
                Release posture
              </p>
              <h2 className="font-heading mt-4 text-[clamp(2rem,4vw,3rem)] leading-[1.02] font-semibold tracking-[-0.06em]">
                Release gates are stewardship gates.
              </h2>
              <p className="text-muted-foreground mt-5 text-base leading-7">
                We care about elegance, but we care more about truth in the
                system: money reconciled, statements correct, deliverability
                healthy, logs scrubbed, workflows safe, and donor recovery paths
                intact.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <Card className="page-shell-glow surface-interactive border-foreground/10 bg-primary text-primary-foreground rounded-[2rem] border shadow-[0_30px_78px_-52px_rgba(22,33,43,0.84)]">
              <CardHeader>
                <p className="text-primary-foreground/70 font-mono text-[0.72rem] tracking-[0.3em] uppercase">
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
                      className="text-primary-foreground/86 rounded-[1.25rem] border border-white/10 bg-white/6 px-4 py-3 text-sm leading-6"
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
