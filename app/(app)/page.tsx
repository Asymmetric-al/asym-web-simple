import StaggeredText from "@/components/react-bits/staggered-text";
import { HeroProductPreview } from "@/components/site/hero-product-preview";
import { HomePageHero } from "@/components/site/home-page-hero";
import { Section, SectionHeader } from "@/components/site/page";
import { Reveal, StaggerItem, StaggerReveal } from "@/components/site/reveal";
import { ScrollThesis } from "@/components/site/scroll-thesis";
import { SiteLogoMark } from "@/components/site/site-logo-mark";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    <main id="main-content" tabIndex={-1}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationStructuredData),
        }}
      />
      <HomePageHero
        eyebrow="Mission Operating System"
        title={
          <div>
            <StaggeredText
              as="h1"
              text="Run the Work In One Place"
              trigger="mount"
              segmentBy="words"
              blur={false}
              className="font-heading text-foreground text-[clamp(3.25rem,8.5vw,6.5rem)] leading-[0.9] font-semibold tracking-[-0.07em]"
            />
          </div>
        }
        subtitle={
          <p className="font-heading text-primary/80 mx-auto max-w-xl text-[clamp(1.15rem,2.4vw,1.65rem)] font-medium tracking-[-0.04em] max-lg:mx-0">
            Less admin. More{" "}
            <span className="text-primary italic">ministry.</span>
          </p>
        }
        description="The unified platform for the modern missions agency. Bring finance, mobilization, donor support, communications, and web operations under one calm, trustworthy surface."
        actions={[
          { label: "Join Waitlist", href: "/join" },
          {
            label: "Request a Call",
            href: "/contact",
            variant: "outline",
          },
        ]}
        meta={[
          "Unified operating system",
          "Open source core",
          "Tenant sovereignty",
          "Nonprofit 501(c)(3)",
        ]}
      >
        <Reveal trigger="mount">
          <HeroProductPreview
            screenshotAlt="Asymmetric mission control interface preview"
            caption={
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <p className="text-foreground font-medium">
                    One surface for finance, mobilization, and care.
                  </p>
                  <p className="text-muted-foreground">
                    Calm software, visible trust, and clearer action for the
                    teams stewarding the work.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="border-foreground/10 bg-background/76 text-muted-foreground rounded-full border px-3 py-1 font-mono text-[0.68rem] tracking-[0.2em] uppercase">
                    Shared source of truth
                  </span>
                  <span className="border-foreground/10 bg-background/76 text-muted-foreground rounded-full border px-3 py-1 font-mono text-[0.68rem] tracking-[0.2em] uppercase">
                    Clear operator surfaces
                  </span>
                </div>
              </div>
            }
          />
        </Reveal>
      </HomePageHero>

      <Section className="pt-0" containerClassName="flex flex-col gap-8">
        <Reveal>
          <div className="page-shell-glow surface-panel surface-interactive rounded-[2rem] p-5 sm:p-6">
            <p className="text-primary/75 font-mono text-[0.72rem] tracking-[0.28em] uppercase">
              Signals from the build
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {heroLines.map((line) => (
                <Badge
                  key={line}
                  variant="outline"
                  className="border-foreground/10 bg-background/78 text-muted-foreground h-auto rounded-full px-3 py-1.5 font-mono text-[0.7rem] tracking-[0.22em] uppercase"
                >
                  {line}
                </Badge>
              ))}
            </div>
          </div>
        </Reveal>
      </Section>

      <ScrollThesis
        eyebrow="Operational thesis"
        text="A missions-first operating system should bring finance, mobilization, donor support, communications, and web operations into one calm, trustworthy surface."
      />

      <Section tone="sky" className="section-divider-accent">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-start">
          <Reveal>
            <div className="page-shell-glow surface-panel surface-interactive rounded-[2.2rem] p-7 sm:p-9">
              <SectionHeader
                eyebrow="Why the name?"
                title="Simple faithfulness can still create outsized outcomes."
                description="Good tools let simple actions create larger outcomes. We believe God multiplies faithfulness. If God is in it, little becomes much."
              />
              <div className="bg-primary text-primary-foreground mt-8 rounded-[1.9rem] px-6 py-8 sm:px-8">
                <p className="text-primary-foreground/70 font-mono text-[0.7rem] tracking-[0.3em] uppercase">
                  Mark
                </p>
                <div className="text-primary-foreground mt-3 flex justify-start">
                  <SiteLogoMark className="size-[clamp(4.5rem,14vw,7.5rem)]" />
                </div>
                <p className="text-primary-foreground/82 mt-4 max-w-[24ch] text-base leading-7">
                  Simple Faithfulness → Exponential Impact
                </p>
              </div>
            </div>
          </Reveal>

          <div className="grid gap-4">
            <StaggerReveal>
              {foundations.map((item) => (
                <StaggerItem key={item.title}>
                  <Card className="surface-card surface-interactive rounded-[1.8rem]">
                    <CardHeader className="gap-4">
                      <div className="bg-secondary text-primary flex size-11 items-center justify-center rounded-2xl shadow-sm">
                        <item.icon className="size-5" />
                      </div>
                      <CardTitle className="font-heading text-2xl font-semibold tracking-[-0.05em]">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-muted-foreground text-base leading-7">
                      {item.description}
                    </CardContent>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerReveal>
          </div>
        </div>
      </Section>

      <Section className="section-divider-accent">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-6">
          <StaggerReveal step={0.042}>
            <StaggerItem className="col-span-full">
              <SectionHeader
                eyebrow="System Capabilities"
                title="Infrastructure as stewardship."
                description="We do not look for ways to extract rent from your basic needs. We build digital rails for high-trust organizations to operate with sovereignty and speed."
              />
            </StaggerItem>
            {capabilities.map((item, index) => (
              <StaggerItem
                key={item.title}
                className={cn(
                  index < 2
                    ? "xl:col-span-3"
                    : index === capabilities.length - 2
                      ? "xl:col-span-4"
                      : "xl:col-span-2"
                )}
              >
                <Card className="surface-card surface-interactive h-full rounded-[1.8rem]">
                  <CardHeader>
                    <div className="bg-accent text-accent-foreground flex size-11 items-center justify-center rounded-2xl shadow-sm">
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

      <Section tone="accent">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <Reveal>
            <div className="page-shell-glow surface-interactive border-foreground/10 bg-primary text-primary-foreground relative overflow-hidden rounded-[2.2rem] border px-7 py-8 shadow-[0_32px_80px_-54px_rgba(22,33,43,0.78)] sm:px-9 sm:py-10">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(221,242,255,0.18),transparent_35%)]" />
              <p className="text-primary-foreground/70 font-mono text-[0.72rem] tracking-[0.28em] uppercase">
                Hiring builders
              </p>
              <h2 className="font-heading mt-4 max-w-[16ch] text-[clamp(2.3rem,4vw,3.7rem)] leading-[0.98] font-semibold tracking-[-0.06em]">
                Write code for the Great Commission.
              </h2>
              <p className="text-primary-foreground/82 mt-5 max-w-[58ch] text-base leading-7">
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
                    "text-primary-foreground border-white/20 bg-white/6 px-5 hover:bg-white/10"
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
                  <Card className="surface-card surface-interactive rounded-[1.8rem]">
                    <CardHeader>
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
        </div>
      </Section>
    </main>
  );
}
