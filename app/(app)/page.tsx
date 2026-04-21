import { HeroProductPreview } from "@/components/site/hero-product-preview";
import { HomePageHero } from "@/components/site/home-page-hero";
import { Section, SectionHeader } from "@/components/site/page";
import { Reveal, StaggerItem, StaggerReveal } from "@/components/site/reveal";
import { SiteLogoMark } from "@/components/site/site-logo-mark";
import { buttonVariants } from "@/components/ui/button-variants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Blocks,
  ChartNoAxesCombined,
  FileText,
  Layers3,
  MailCheck,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/config";

type IconCard = {
  readonly title: string;
  readonly description: string;
  readonly icon: LucideIcon;
};

type Step = {
  readonly label: string;
  readonly title: string;
  readonly description: string;
};

const trustBar = [
  "Mission Control",
  "Donor Self-Service",
  "Missionary Dashboard",
  "Statements",
  "Accounting Sync",
] as const;

const problemPoints = [
  {
    title: "Month-end still drags",
    description:
      "Month-end takes too many people, too many exports, and too much hand-checking before finance trusts the numbers.",
  },
  {
    title: "Donors still need staff help",
    description:
      "Donors still need staff help for recurring gifts, receipts, card changes, and other updates that should be self-serve.",
  },
  {
    title: "Missionaries hear changes too late",
    description:
      "Missionaries still hear what changed too late and act too late because the answer lives in too many systems.",
  },
  {
    title: "Staff are stuck on system glue",
    description:
      "Staff still spend too much time managing manual handoffs, workarounds, and disconnected tools instead of serving people.",
  },
] as const;

const guidePoints: readonly IconCard[] = [
  {
    title: "Purpose-built for Christian missions",
    description:
      "Asymmetric.al built Asym from inside mission realities instead of adapting a generic business template after the fact.",
    icon: ShieldCheck,
  },
  {
    title: "Mission Control for staff",
    description:
      "Teams search people, review gifts, run reports, and launch workflows from one role-aware operating surface.",
    icon: Layers3,
  },
  {
    title: "Self-service portals for donors",
    description:
      "Donors can give, update recurring gifts, change payment methods, and download receipts without staff handoffs.",
    icon: MailCheck,
  },
  {
    title: "Live dashboards for missionaries",
    description:
      "Missionaries can see support progress, new donors, at-risk recurring, tasks, and next actions without waiting on staff.",
    icon: ChartNoAxesCombined,
  },
  {
    title: "Ownership over keys, branding, and domains",
    description:
      "Ownership and trust stay visible instead of hiding behind a vendor boundary your team cannot inspect.",
    icon: Blocks,
  },
  {
    title: "Built on open-source foundations",
    description:
      "Most teams simply use Asym as a supported system, but the foundations stay open for transparency, stewardship, and long-term trust.",
    icon: FileText,
  },
] as const;

const productSections: readonly IconCard[] = [
  {
    title: "Mission Control",
    description:
      "Search people, review gifts, run reports, generate statements, manage content, and launch workflows from one role-aware console.",
    icon: Layers3,
  },
  {
    title: "Donor self-service",
    description:
      "Let donors give, update recurring gifts, change payment methods, and download receipts without staff handoffs.",
    icon: MailCheck,
  },
  {
    title: "Missionary dashboard",
    description:
      "Show support progress, new donors, at-risk recurring, tasks, and draft thank-yous without asking staff to chase updates.",
    icon: Users,
  },
  {
    title: "Statements and finance",
    description:
      "Move from guesswork to cleaner reporting, branded statements, signed links, and stronger reconciliation flows.",
    icon: FileText,
  },
] as const;

const planSteps: readonly Step[] = [
  {
    label: "01",
    title: "Join the waitlist or take the audit",
    description:
      "Start with the public entry point that matches your urgency without pretending every organization should onboard the same way on day one.",
  },
  {
    label: "02",
    title: "Map the handoffs and blind spots",
    description:
      "We identify the spreadsheets, exports, and manual workflows that create the most drag in your current stack.",
  },
  {
    label: "03",
    title: "Replace the patchwork in sequence",
    description:
      "We show how Asym can replace the stack in a sequence your team can absorb instead of forcing a disruptive rewrite all at once.",
  },
] as const;

const successBullets = [
  "Donors give and self-serve without waiting on staff.",
  "Missionaries see what changed and know what to do next.",
  "Finance trusts the numbers sooner.",
  "Leadership gets visibility without asking three teams for updates.",
] as const;

export const metadata: Metadata = createMetadata({
  title: "The Operating System for Christian Missions",
  description:
    "Asym is the operating system for Christian missions, giving teams one mission-built system for donor care, missionary support, statements, reporting, and operations.",
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

  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.shortName,
    url: siteConfig.url,
    description: siteConfig.description,
  };

  return (
    <main id="main-content" tabIndex={-1}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteStructuredData),
        }}
      />

      <HomePageHero
        eyebrow="The operating system for Christian missions"
        title={
          <h1 className="font-heading text-foreground text-[clamp(2.7rem,6.4vw,5.35rem)] leading-[0.92] font-semibold tracking-[-0.07em] text-pretty">
            Stop spending staff time managing the gaps between disconnected systems.
          </h1>
        }
        subtitle={
          <p className="font-heading text-primary/80 mx-auto max-w-2xl text-[clamp(1.15rem,2.4vw,1.65rem)] font-medium tracking-[-0.04em] max-lg:mx-0">
            One mission-built system for donor care, missionary support, and operations.
          </p>
        }
        description="Asym gives Christian missions teams one mission-built system for donor care, missionary support, statements, reporting, and operations, so the team can move with more clarity and less admin drag."
        actions={[
          { label: siteConfig.cta.primary.label, href: siteConfig.cta.primary.href },
          {
            label: siteConfig.cta.secondary.label,
            href: siteConfig.cta.secondary.href,
            variant: "outline",
          },
        ]}
        supportAction={{
          label: "See the Donor and Missionary Portal Walkthrough",
          href: "/platform#portal-walkthrough",
        }}
        meta={[...trustBar]}
      >
        <Reveal trigger="mount">
          <HeroProductPreview
            screenshotAlt="Asymmetric mission control interface preview"
            caption={
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <p className="text-foreground font-medium">
                    One mission-built system for donor care, missionary support, and operations.
                  </p>
                  <p className="text-muted-foreground">
                    Calm software, visible trust, and role-aware workflows for the teams carrying the operational weight of sending.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="border-foreground/10 bg-background/76 text-muted-foreground rounded-full border px-3 py-1 font-mono text-[0.68rem] tracking-[0.2em] uppercase">
                    Donor and missionary portal walkthrough
                  </span>
                  <span className="border-foreground/10 bg-background/76 text-muted-foreground rounded-full border px-3 py-1 font-mono text-[0.68rem] tracking-[0.2em] uppercase">
                    Mission-built workflows
                  </span>
                </div>
              </div>
            }
          />
        </Reveal>
      </HomePageHero>

      <Section tone="sky" className="section-divider-accent">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start">
          <Reveal>
            <div className="page-shell-glow surface-panel surface-interactive rounded-[2.2rem] p-7 sm:p-9">
              <SectionHeader
                eyebrow="The problem"
                title="Most mission agencies are stuck between old software and fragile patchwork."
                description="You can stay inside an outdated all-in-one system that slows everyone down. Or you can stitch together newer tools and keep paying the cost in handoffs, workarounds, and staff time spent keeping things moving. Either way, the strain lands on your team."
              />
              <div className="bg-primary text-primary-foreground mt-8 rounded-[1.9rem] px-6 py-8 sm:px-8">
                <p className="text-primary-foreground/70 font-mono text-[0.7rem] tracking-[0.3em] uppercase">
                  The pressure underneath it
                </p>
                <div className="text-primary-foreground mt-3 flex justify-start">
                  <SiteLogoMark className="size-[clamp(4.5rem,14vw,7.5rem)]" />
                </div>
                <p className="text-primary-foreground/82 mt-4 max-w-[24ch] text-base leading-7">
                  Old software and patchwork workflows create drag that lands on the people already carrying the work.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="grid gap-4">
            <StaggerReveal>
              {problemPoints.map((item) => (
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

      <Section className="section-divider-accent">
        <SectionHeader
          eyebrow="Guide and trust"
          title="Asym was built for the exact pressure mission teams live with."
          description="Asymmetric.al built Asym from inside mission realities, not from a generic business template. That means donor care, missionary visibility, statements, and finance do not feel like bolt-ons. They feel like the system was made for the work you already do."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <StaggerReveal>
            {guidePoints.map((item) => (
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

      <Section tone="accent" className="section-divider-accent">
        <SectionHeader
          eyebrow="One system"
          title="One system for the work mission teams keep doing in too many places."
          description="Mission Control, donor self-service, missionary visibility, statements, and finance should not be split across disconnected tools. Asym brings them together in one mission-built system."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StaggerReveal>
            {productSections.map((item) => (
              <StaggerItem key={item.title}>
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

      <Section className="section-divider-accent">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-start">
          <Reveal>
            <Card className="page-shell-glow surface-panel surface-interactive rounded-[2rem] p-1">
              <CardHeader className="pb-0">
                <p className="text-primary/70 font-mono text-[0.72rem] tracking-[0.28em] uppercase">
                  How to get started
                </p>
                <CardTitle className="font-heading text-3xl font-semibold tracking-[-0.05em]">
                  Start with the relief your team needs fastest.
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground flex flex-col gap-4 text-base leading-7">
                <p>
                  The system can be adopted in a calm sequence, starting with the flows that create relief fastest.
                </p>
                <p>
                  You do not need to replace everything at once. Start where the drag is worst, then expand in a sequence your team can actually absorb.
                </p>
              </CardContent>
            </Card>
          </Reveal>
          <div className="grid gap-4">
            <StaggerReveal>
              {planSteps.map((step) => (
                <StaggerItem key={step.label}>
                  <Card className="surface-card surface-interactive rounded-[1.8rem]">
                    <CardHeader>
                      <p className="text-primary/70 font-mono text-[0.72rem] tracking-[0.28em] uppercase">
                        {step.label}
                      </p>
                      <CardTitle className="font-heading text-xl font-semibold tracking-[-0.04em]">
                        {step.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-muted-foreground text-sm leading-7">
                      {step.description}
                    </CardContent>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerReveal>
          </div>
        </div>
      </Section>

      <Section tone="sky" className="section-divider-accent">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.96fr)_minmax(0,1.04fr)] lg:items-start">
          <Reveal>
            <div className="page-shell-glow surface-interactive border-foreground/10 bg-primary text-primary-foreground relative overflow-hidden rounded-[2.2rem] border px-7 py-8 shadow-[0_32px_80px_-54px_rgba(22,33,43,0.78)] sm:px-9 sm:py-10">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(221,242,255,0.18),transparent_35%)]" />
              <p className="text-primary-foreground/70 font-mono text-[0.72rem] tracking-[0.28em] uppercase">
                Success and stakes
              </p>
              <h2 className="font-heading mt-4 max-w-[14ch] text-[clamp(2.3rem,4vw,3.7rem)] leading-[0.98] font-semibold tracking-[-0.06em]">
                When the system gets out of the way, the team moves with confidence.
              </h2>
              <p className="text-primary-foreground/82 mt-5 max-w-[58ch] text-base leading-7">
                If nothing changes, donor follow-up still slips. Month-end still drags. Missionaries still hear critical things too late. Staff keep spending energy on systems and workarounds that should have been serving them.
              </p>
            </div>
          </Reveal>

          <Card className="surface-card surface-interactive rounded-[2rem]">
            <CardHeader>
              <p className="text-primary/70 font-mono text-[0.72rem] tracking-[0.28em] uppercase">
                What changes
              </p>
              <CardTitle className="font-heading text-3xl font-semibold tracking-[-0.05em]">
                The team gets room to move.
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <ul className="flex list-none flex-col gap-4 pl-0 text-base leading-7">
                {successBullets.map((item) => (
                  <li
                    key={item}
                    className="border-foreground/10 rounded-[1.4rem] border bg-background/70 px-4 py-4"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section className="section-divider-accent">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <Reveal>
            <div className="page-shell-glow surface-interactive border-foreground/10 bg-primary text-primary-foreground relative overflow-hidden rounded-[2.2rem] border px-7 py-8 shadow-[0_32px_80px_-54px_rgba(22,33,43,0.78)] sm:px-9 sm:py-10">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(221,242,255,0.18),transparent_35%)]" />
              <p className="text-primary-foreground/70 font-mono text-[0.72rem] tracking-[0.28em] uppercase">
                Managed Donor Care + Ops
              </p>
              <h2 className="font-heading mt-4 max-w-[16ch] text-[clamp(2.3rem,4vw,3.7rem)] leading-[0.98] font-semibold tracking-[-0.06em]">
                Need more lift than software alone?
              </h2>
              <p className="text-primary-foreground/82 mt-5 max-w-[58ch] text-base leading-7">
                For organizations that want more help, Asym can add a managed donor care and ops layer that handles routine donor questions, expense follow-through, and simple reconciliation prep inside the same mission-built system.
              </p>
              <div className="mt-8">
                <Link
                  href="/contact"
                  className={cn(
                    buttonVariants({ size: "lg", variant: "secondary" }),
                    "px-5",
                  )}
                >
                  Talk with us about managed support
                  <ArrowRight data-icon="inline-end" />
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <Card className="page-shell-glow surface-panel surface-interactive rounded-[2rem] p-1">
              <CardHeader className="pb-0">
                <p className="text-primary/70 font-mono text-[0.72rem] tracking-[0.28em] uppercase">
                  Final CTA
                </p>
                <CardTitle className="font-heading text-3xl font-semibold tracking-[-0.05em]">
                  Less system glue. More time for people.
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground flex flex-col gap-5 text-base leading-7">
                <p>
                  If your team is carrying too much load in held-together systems, join the waitlist and see what Asym could replace first.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/waitlist"
                    className={cn(buttonVariants({ size: "lg" }), "px-5")}
                  >
                    Join the Waitlist
                    <ArrowRight data-icon="inline-end" />
                  </Link>
                  <Link
                    href="/contact"
                    className={cn(
                      buttonVariants({ size: "lg", variant: "outline" }),
                      "px-5",
                    )}
                  >
                    Get the Mission Tech Stack Audit
                  </Link>
                </div>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </Section>
    </main>
  );
}
