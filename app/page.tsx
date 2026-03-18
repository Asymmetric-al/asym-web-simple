import StaggeredText from "@/components/react-bits/staggered-text";
import { MediaStage } from "@/components/site/media-stage";
import { PageHero, Section, SectionHeader } from "@/components/site/page";
import { Reveal, StaggerItem, StaggerReveal } from "@/components/site/reveal";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button-variants";
import { createMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Blocks,
  ChartNoAxesCombined,
  Globe,
  Layers3,
  LockKeyhole,
  MailCheck,
  ShieldCheck,
  Sparkles,
  Unplug,
  Waypoints,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/config";

const heroLines = [
  "Unified Operating System",
  "Accelerating the Great Commission",
  "Open Source Core",
  "Soli Deo Gloria",
  "Zero Admin Drag",
  "Tenant Sovereignty Architecture",
  "Missions-First Design",
  "Small Inputs, Exponential Outputs",
  "By Missionaries, For Missionaries",
  "Nonprofit 501(c)(3)",
  "Secure Data Stewardship",
  "No Vendor Lock-in",
];

const foundations = [
  {
    title: "Unified Surface",
    description:
      "One login for finance, mobilization, and care. No context switching between fragmented tools. Your people stay focused.",
    icon: Layers3,
  },
  {
    title: "Tenant Sovereignty",
    description:
      "You own your data. You own your payment keys. Your domains, your reputation. We are stewards, not owners.",
    icon: ShieldCheck,
  },
  {
    title: "Open Foundations",
    description:
      "Built on proven open-source standards like Next.js and Directus. Extensible by design. Safe for the long haul.",
    icon: Blocks,
  },
] as const;

const capabilities = [
  {
    title: "Sovereign Web Architecture",
    description:
      "Headless Directus CMS with Next.js gives agencies a portable website stack they actually own.",
    icon: Globe,
  },
  {
    title: "Native Missionary Dashboards",
    description:
      "Finance, fundraising, and care live in the same system so your teams stop paying the fragmentation tax.",
    icon: ChartNoAxesCombined,
  },
  {
    title: "Enterprise Orchestration",
    description:
      "High-fidelity events into Zapier let agencies build real workflows without custom code in every corner.",
    icon: Waypoints,
  },
  {
    title: "Fortress Identity",
    description:
      "Secure authentication is part of the foundation, not an afterthought bolted on after launch.",
    icon: LockKeyhole,
  },
  {
    title: "Zero-Touch Balance",
    description:
      "Automated reconciliation ties Stripe payouts to actual ledger activity and removes spreadsheet drag.",
    icon: Sparkles,
  },
  {
    title: "Radical Transparency",
    description:
      "OpenTelemetry, auditable code, and observable infrastructure keep trust visible across the stack.",
    icon: Unplug,
  },
  {
    title: "High-Fidelity Communications",
    description:
      "Receipts, tax statements, and lifecycle emails stay branded, modern, and trustworthy at every touchpoint.",
    icon: MailCheck,
  },
  {
    title: "Audit-Grade Trust",
    description:
      "Critical actions are recorded through tamper-evident logging so finance and leadership can operate with confidence.",
    icon: ShieldCheck,
  },
] as const;

const buildTracks = [
  {
    title: "For sending agencies",
    description:
      "Early access, migration support, and a direct line into the product roadmap while the system is still being shaped.",
  },
  {
    title: "For builders",
    description:
      "High-agency engineers, designers, and systems thinkers who want to use their craft in service of the Great Commission.",
  },
  {
    title: "For donors",
    description:
      "Capital that funds shared rails for many ministries at once instead of trapping each organization inside its own tool debt.",
  },
] as const;

export const metadata: Metadata = createMetadata({
  title: "Mission Operating System for Christian Missions Organizations",
  description:
    "Less admin. More ministry. Asymmetric.al is the unified operating system for Christian missions agencies that need trust, sovereignty, and modern software.",
  path: "/",
});

export default function HomePage() {
  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: siteConfig.name,
    url: siteConfig.url,
    email: siteConfig.email,
    description: siteConfig.description,
    areaServed: "Global",
    parentOrganization: {
      "@type": "NGO",
      name: siteConfig.nonprofit,
    },
  };

  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationStructuredData),
        }}
      />
      <PageHero
        eyebrow="Mission Operating System"
        title={
          <div>
            <StaggeredText
              as="h1"
              text="Run the Work In One Place"
              segmentBy="words"
              delay={55}
              duration={0.72}
              blur={false}
              className="font-heading text-[clamp(3.2rem,7vw,6rem)] font-semibold leading-[0.92] tracking-[-0.07em] text-foreground"
            />
            <p className="mt-4 max-w-[18ch] font-heading text-[clamp(1.15rem,2.2vw,1.6rem)] font-medium tracking-[-0.04em] text-primary/78">
              Less admin. More ministry.
            </p>
          </div>
        }
        description="The unified platform for the modern missions agency. Bring finance, mobilization, donor support, communications, and web operations under one calm, trustworthy surface."
        actions={[
          { label: "Request a Call", href: "/contact", variant: "outline" },
          { label: "See the Platform", href: "/platform" },
        ]}
        meta={[
          "Unified operating system",
          "Open source core",
          "Tenant sovereignty",
          "Nonprofit 501(c)(3)",
        ]}
      >
        <Reveal>
          <MediaStage
            sceneAlt="Open landscape representing the broad horizon of missions work"
            screenshotAlt="Asymmetric mission control interface preview"
            badge="Mission Control"
            priority
            caption={
              <div className="space-y-1">
                <p className="font-medium text-foreground">
                  One surface for finance, mobilization, and care.
                </p>
                <p className="text-muted-foreground">
                  Calm software, visible trust, and clearer action for the teams
                  stewarding the work.
                </p>
              </div>
            }
          />
        </Reveal>
      </PageHero>

      <Section className="pt-0" containerClassName="flex flex-col gap-10">
        <Reveal>
          <div className="surface-panel rounded-[2rem] p-5 sm:p-6">
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.28em] text-primary/75">
              Signals from the build
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {heroLines.map((line) => (
                <Badge
                  key={line}
                  variant="outline"
                  className="h-auto rounded-full border-foreground/10 bg-background/78 px-3 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground"
                >
                  {line}
                </Badge>
              ))}
            </div>
          </div>
        </Reveal>
      </Section>

      <Section tone="sky">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-start">
          <Reveal>
            <div className="surface-panel rounded-[2.2rem] p-7 sm:p-9">
              <SectionHeader
                eyebrow="Why the name?"
                title="Simple faithfulness can still create outsized outcomes."
                description="Good tools let simple actions create larger outcomes. We believe God multiplies faithfulness. If God is in it, little becomes much."
              />
              <div className="mt-8 rounded-[1.9rem] bg-primary px-6 py-8 text-primary-foreground sm:px-8">
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-primary-foreground/70">
                  Visual line
                </p>
                <div className="mt-3 font-heading text-[clamp(3.25rem,8vw,6rem)] font-semibold leading-none tracking-[-0.08em]">
                  1 → ∞
                </div>
                <p className="mt-4 max-w-[24ch] text-base leading-7 text-primary-foreground/82">
                  Simple Faithfulness → Exponential Impact
                </p>
              </div>
            </div>
          </Reveal>

          <div className="grid gap-4">
            <StaggerReveal>
              {foundations.map((item) => (
                <StaggerItem key={item.title}>
                  <Card className="surface-card rounded-[1.8rem]">
                    <CardHeader className="gap-4">
                      <div className="flex size-11 items-center justify-center rounded-2xl bg-secondary text-primary shadow-sm">
                        <item.icon className="size-5" />
                      </div>
                      <CardTitle className="font-heading text-2xl font-semibold tracking-[-0.05em]">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-base leading-7 text-muted-foreground">
                      {item.description}
                    </CardContent>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerReveal>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="System Capabilities"
          title="Infrastructure as stewardship."
          description="We do not look for ways to extract rent from your basic needs. We build digital rails for high-trust organizations to operate with sovereignty and speed."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StaggerReveal>
            {capabilities.map((item) => (
              <StaggerItem key={item.title}>
                <Card className="surface-card h-full rounded-[1.8rem]">
                  <CardHeader>
                    <div className="flex size-11 items-center justify-center rounded-2xl bg-accent text-accent-foreground shadow-sm">
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

      <Section tone="accent">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <Reveal>
            <div className="page-shell-glow relative overflow-hidden rounded-[2.2rem] border border-foreground/10 bg-primary px-7 py-8 text-primary-foreground shadow-[0_32px_80px_-54px_rgba(22,33,43,0.78)] sm:px-9 sm:py-10">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(221,242,255,0.18),transparent_35%)]" />
              <p className="font-mono text-[0.72rem] uppercase tracking-[0.28em] text-primary-foreground/70">
                Hiring builders
              </p>
              <h2 className="mt-4 max-w-[16ch] font-heading text-[clamp(2.3rem,4vw,3.7rem)] font-semibold leading-[0.98] tracking-[-0.06em]">
                Write code for the Great Commission.
              </h2>
              <p className="mt-5 max-w-[58ch] text-base leading-7 text-primary-foreground/82">
                We are looking for high-agency senior engineers, designers, and
                problem solvers who want to use their craft for a higher
                purpose. Join the core team or contribute to the open source
                ecosystem.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/join"
                  className={cn(
                    buttonVariants({ size: "lg", variant: "secondary" }),
                    "px-5"
                  )}
                >
                  Join the Team
                  <ArrowRight data-icon="inline-end" />
                </Link>
                <Link
                  href="/give"
                  className={cn(
                    buttonVariants({ size: "lg", variant: "outline" }),
                    "border-white/20 bg-white/6 px-5 text-primary-foreground hover:bg-white/10"
                  )}
                >
                  Support the Build
                </Link>
              </div>
            </div>
          </Reveal>

          <div className="grid gap-4">
            <StaggerReveal>
              {buildTracks.map((item) => (
                <StaggerItem key={item.title}>
                  <Card className="surface-card rounded-[1.8rem]">
                    <CardHeader>
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
        </div>
      </Section>
    </main>
  );
}
