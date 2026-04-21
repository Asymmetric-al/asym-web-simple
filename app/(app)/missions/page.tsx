import { MediaStage } from "@/components/site/media-stage";
import { PageHero, Section, SectionHeader } from "@/components/site/page";
import { Reveal, StaggerItem, StaggerReveal } from "@/components/site/reveal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button-variants";
import { createMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Globe,
  HandHeart,
  HeartPulse,
  Landmark,
  Users,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

const differencePoints = [
  {
    title: "You send people, not products",
    description:
      "Support raising, field placement, member care, and long-term support all tie together. A donor pipeline view is not enough.",
  },
  {
    title: "You serve many kinds of partners",
    description:
      "Missionaries, national workers, churches, field leaders, finance staff, and donors all need different windows into the same underlying story.",
  },
  {
    title: "You live at the edges of complexity",
    description:
      "Cross-border gifts, multi-currency support, receipts, dispersed staff, and field realities all require more than a retrofitted generic stack.",
  },
] as const;

const audiences = [
  {
    title: "For Missionaries",
    description:
      "Clear dashboards, simple next steps, and tools that help them stay healthy enough to stay on the field.",
    icon: Globe,
  },
  {
    title: "For Mobilizers & Member Care",
    description:
      "Connected stories for applicants, references, interviews, training, and care so nothing slips through the cracks.",
    icon: HeartPulse,
  },
  {
    title: "For Finance & Operations",
    description:
      "Trustworthy numbers, automated matching, and statements without a side life in twelve spreadsheets.",
    icon: Landmark,
  },
  {
    title: "For Advancement & Development",
    description:
      "Giving, campaigns, missionary stories, and donor follow-up in one view so momentum and risk are visible early.",
    icon: HandHeart,
  },
  {
    title: "For Donors & Sending Churches",
    description:
      "Clear portals for giving, statements, card updates, and connection to the workers and stories they love.",
    icon: Users,
  },
] as const;

const impactPoints = [
  "Sending at the center. Every part of the system starts with missionaries, designations, and sending relationships.",
  "Front-to-back support. From first interest to retirement, the data stays connected so teams stay aligned.",
  "Global from day one. Currency, receipts, addresses, and communications all assume cross-border realities.",
  "One Mission Control, many roles. Executives, mobilizers, advancement, finance, and communications work from the same source.",
  "Clear automation and reporting. Routine follow-through happens with less manual cleanup and better visibility.",
] as const;

export const metadata: Metadata = createMetadata({
  title: "Why Christian Missions Teams Need Better Software",
  description:
    "Why Asym is built specifically for Christian missions organizations and the teams carrying the operational weight of donor care, missionary support, and operations.",
  path: "/missions",
});

export default function MissionsPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero
        eyebrow="The Underserved Sector"
        title={
          <h1 className="font-heading text-foreground text-[clamp(3rem,6vw,5.15rem)] leading-[0.94] font-semibold tracking-[-0.07em] text-balance">
            Christian missions teams deserve better software.
          </h1>
        }
        description="Christian missions teams carry donor care, missionary support, statements, reporting, and sending across borders. Asym exists to reduce the operational drag that slows that work down."
        actions={[
          { label: "Join the Waitlist", href: "/waitlist" },
          {
            label: "Learn how the platform works",
            href: "/platform",
            variant: "outline",
          },
        ]}
        meta={[
          "Mission-built",
          "Christian missions focus",
          "Open-source foundations",
          "Visible trust",
          "Waitlist-first rollout",
        ]}
      >
        <Reveal trigger="mount">
          <MediaStage
            sceneAlt="Mission landscape under an open sky"
            screenshotAlt="Mission-facing software overlay"
            badge="Why missions"
            priority
            caption={
              <div className="flex flex-col gap-1">
                <p className="text-foreground font-medium">
                  Mission teams should not have to build their own operating
                  system.
                </p>
                <p className="text-muted-foreground">
                  Software should reduce administrative drag for teams
                  stewarding donors, missionaries, churches, and field realities
                  across borders.
                </p>
              </div>
            }
          />
        </Reveal>
      </PageHero>

      <Section tone="sky" className="section-divider-accent">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <Reveal>
            <div className="page-shell-glow surface-panel surface-interactive rounded-[2rem] p-7 sm:p-8">
              <p className="text-primary/70 font-mono text-[0.72rem] tracking-[0.28em] uppercase">
                01 // The Focus
              </p>
              <h2 className="font-heading mt-4 text-[clamp(2rem,4vw,3rem)] leading-[1.02] font-semibold tracking-[-0.06em]">
                Why we give all our focus to missions agencies.
              </h2>
              <p className="text-muted-foreground mt-5 text-base leading-7">
                Most software is built for sales teams, memberships, or generic fundraising. Missions does not fit that mold. You are sending people, not shipping products.
              </p>
              <p className="text-muted-foreground mt-4 text-base leading-7">
                That changes what the system has to hold together: donors, missionaries, churches, finance, field realities, and follow-through all at once.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-4">
            <Reveal delay={0.06}>
              <div className="page-shell-glow surface-interactive border-foreground/10 bg-primary text-primary-foreground rounded-[2rem] border px-7 py-8 shadow-[0_28px_70px_-50px_rgba(22,33,43,0.8)]">
                <p className="text-primary-foreground/70 font-mono text-[0.72rem] tracking-[0.3em] uppercase">
                  02 // The Reality
                </p>
                <h3 className="font-heading mt-4 text-3xl font-semibold tracking-[-0.05em]">
                  Sending is different.
                </h3>
                <p className="text-primary-foreground/82 mt-4 max-w-[50ch] text-base leading-7">
                  Because missions is unique, we believe it deserves software
                  born from that world, not adapted to it after the fact.
                </p>
              </div>
            </Reveal>
            <div className="grid gap-4">
              <StaggerReveal>
                {differencePoints.map((item) => (
                  <StaggerItem key={item.title}>
                    <Card className="surface-card surface-interactive rounded-[1.7rem]">
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
        </div>
      </Section>

      <Section className="section-divider-accent">
        <SectionHeader
          eyebrow="03 // Our Calling"
          title="We build for the teams carrying the operational weight."
          description="We build for the operators, mobilizers, finance teams, advancement staff, and missionaries carrying this work every day."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-6">
          <StaggerReveal>
            {audiences.map((item, index) => (
              <StaggerItem
                key={item.title}
                className={index < 2 ? "xl:col-span-3" : "xl:col-span-2"}
              >
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

      <Section tone="accent">
        <SectionHeader
          eyebrow="04 // The Impact"
          title="What missions-only focus means in practice."
          description="Because we only build for missions nonprofits, we can shape the whole platform around your world instead of forcing you into someone else's pattern."
        />
        <div className="mt-8 grid gap-4 lg:grid-cols-6">
          <StaggerReveal>
            {impactPoints.map((point, index) => (
              <StaggerItem
                key={point}
                className={
                  index === impactPoints.length - 1
                    ? "lg:col-span-2"
                    : undefined
                }
              >
                <Card className="surface-card surface-interactive h-full rounded-[1.75rem]">
                  <CardHeader>
                    <p className="text-primary/70 font-mono text-[0.72rem] tracking-[0.28em] uppercase">
                      0{index + 1}
                    </p>
                  </CardHeader>
                  <CardContent className="text-foreground/86 pt-0 text-sm leading-7">
                    {point}
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </Section>

      <Section>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <Reveal>
            <div className="page-shell-glow surface-panel surface-interactive rounded-[2rem] p-7 sm:p-8">
              <p className="text-primary/70 font-mono text-[0.72rem] tracking-[0.28em] uppercase">
                05 // Origin Story
              </p>
              <h2 className="font-heading mt-4 text-[clamp(2rem,4vw,3rem)] leading-[1.02] font-semibold tracking-[-0.06em]">
                We felt this pain from the inside.
              </h2>
              <p className="text-muted-foreground mt-5 text-base leading-7">
                Asymmetric.al started inside a mission organization that wanted
                to send technologists as missionaries. We expected to build
                field-facing tools. Instead, we kept running into the same
                problem: mission staff were carrying too much admin.
              </p>
              <p className="text-muted-foreground mt-4 text-base leading-7">
                Old donor systems, manual statements, scattered websites, and
                brittle integrations were taking time away from people. That
                repeated pressure pushed us toward a single question: what if
                missions agencies had first-class tools built for their calling,
                not adapted from some other market?
              </p>
            </div>
          </Reveal>

          <div className="grid gap-4">
            <Reveal delay={0.08}>
              <Card className="page-shell-glow surface-interactive border-foreground/10 bg-primary text-primary-foreground rounded-[1.8rem] border shadow-[0_28px_70px_-50px_rgba(22,33,43,0.82)]">
                <CardHeader>
                  <p className="text-primary-foreground/70 font-mono text-[0.72rem] tracking-[0.3em] uppercase">
                    06 // Open Source
                  </p>
                  <CardTitle className="font-heading text-2xl font-semibold tracking-[-0.05em]">
                    Open foundations. Supported product. Clear trust.
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-primary-foreground/82 space-y-4 text-sm leading-7">
                  <p>
                    Asym is built on open-source foundations because transparency, stewardship, and long-term trust matter.
                  </p>
                  <p>
                    Most teams simply use the product as a supported system. If your team wants to extend or contribute, you can.
                  </p>
                </CardContent>
              </Card>
            </Reveal>

            <Reveal delay={0.14}>
              <Card className="surface-card surface-interactive rounded-[1.8rem]">
                <CardHeader>
                  <p className="text-primary/70 font-mono text-[0.72rem] tracking-[0.28em] uppercase">
                    07 // Invitation
                  </p>
                  <CardTitle className="font-heading text-2xl font-semibold tracking-[-0.05em]">
                    Let’s talk about your agency.
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground space-y-4 text-sm leading-7">
                  <p>
                    If your team is carrying this kind of operational drag, the waitlist is the best place to start.
                  </p>
                  <p>
                    We use it to route walkthroughs, early access updates, and rollout conversations around the flows creating the most pressure first.
                  </p>
                  <Link
                    href="/waitlist"
                    className={cn(buttonVariants({ size: "lg" }), "mt-2 px-5")}
                  >
                    Join the Waitlist
                    <ArrowRight data-icon="inline-end" />
                  </Link>
                </CardContent>
              </Card>
            </Reveal>
          </div>
        </div>
      </Section>
    </main>
  );
}
