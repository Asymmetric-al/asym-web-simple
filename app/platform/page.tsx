import { MediaStage } from "@/components/site/media-stage";
import { PageHero, Section, SectionHeader } from "@/components/site/page";
import { PlatformTabs, type PlatformTabItem } from "@/components/site/platform-tabs";
import { Reveal, StaggerItem, StaggerReveal } from "@/components/site/reveal";
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
  Building2,
  Database,
  Globe2,
  HeartHandshake,
  MessageSquareMore,
  ScrollText,
  Workflow,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

const falseChoiceCards = [
  {
    title: "The DIY Trap",
    subhead: "The Generic Stack",
    failures: ["Data silos", "Broken automation links", "High subscription fees"],
    description:
      "Salesforce, Mailchimp, QuickBooks, spreadsheets, and site builders create a brittle operating model with no shared source of truth.",
  },
  {
    title: "The Legacy Monolith",
    subhead: "The Outdated Vendor",
    failures: ["Vendor lock-in", "Clunky UX", "Slow roadmaps"],
    description:
      "Older proprietary software feels safe until every change request, workflow update, or product need slows to a crawl.",
  },
] as const;

const reasons = [
  {
    title: "Sending is not selling",
    description:
      "Generic CRMs understand pipeline velocity. They do not understand deputation, support raising, or long-term donor relationships around a missionary family.",
  },
  {
    title: "The fragmentation tax is real",
    description:
      "Disconnected tools multiply subscription cost, duplicate work, and staff burnout. The problem is not one dashboard. It is the system underneath.",
  },
  {
    title: "Sovereignty matters",
    description:
      "You should not be hostage to someone else's roadmap, keys, or domain reputation. We build architecture where ownership remains with the agency.",
  },
] as const;

const tabs: PlatformTabItem[] = [
  {
    id: "crm",
    title: "Partners CRM",
    tag: "People + relationships",
    summary:
      "A missions-built CRM for people, churches, and pledges with a modern interface and a real-time source of truth.",
    details: [
      "Powered by a custom missions-built Twenty CRM foundation.",
      "Tracks churches, households, designations, and relationship history together.",
      "Built for development teams that need speed without sacrificing accuracy.",
    ],
  },
  {
    id: "contributions",
    title: "Contributions Hub",
    tag: "Giving + reconciliation",
    summary:
      "Live transaction visibility, Stripe-native processing, and integrated management for reversals, allocations, and donor support.",
    details: [
      "Transaction feed and gift management in the same operational surface.",
      "Reconciliation automation reduces spreadsheet work and finance backlog.",
      "Designed to keep donor trust visible through every payment flow.",
    ],
  },
  {
    id: "web",
    title: "Web Studio",
    tag: "Web + content",
    summary:
      "The power of Next.js with a visual CMS experience so agencies control their sites without change-order lock-in.",
    details: [
      "Headless architecture with editing workflows on open foundations.",
      "Structured content that supports stories, appeals, and campaigns cleanly.",
      "Built for teams with or without a dedicated frontend staff.",
    ],
  },
  {
    id: "email",
    title: "Email Studio",
    tag: "Brand + communications",
    summary:
      "Donation receipts, password resets, and campaign emails all deserve the same quality and ownership as your public website.",
    details: [
      "Branded email and PDF output for high-trust communications.",
      "No more compromise between speed and polish.",
      "Supports the moments that most directly reinforce donor confidence.",
    ],
  },
  {
    id: "statements",
    title: "Statements Studio",
    tag: "Reporting + statements",
    summary:
      "Generate receipt packs and year-end tax documents automatically with templates that reflect your actual standards.",
    details: [
      "Year-end and ad hoc statement generation in one place.",
      "Template control without endless custom document code.",
      "Built for finance teams who need confidence and repeatability.",
    ],
  },
  {
    id: "mobilize",
    title: "Mobilize",
    tag: "Pipelines + workflow",
    summary:
      "Visual workflow orchestration for candidates, onboarding, and deployment using Zapier's ecosystem without spaghetti logic.",
    details: [
      "Move people from interest to field with clear steps and state changes.",
      "Tie mobilization into forms, CRM, signatures, and support raising.",
      "Keep workflow logic visible enough for operators to own.",
    ],
  },
];

const supportingModules = [
  {
    title: "Donor Support Hub",
    description:
      "Track questions and follow-up with a connected donor care workflow powered by Chatwoot CE.",
    icon: HeartHandshake,
  },
  {
    title: "Sign Studio",
    description:
      "Agreements, waivers, and onboarding packets handled through a fully integrated Documenso CE flow.",
    icon: ScrollText,
  },
  {
    title: "Report Studio",
    description:
      "Real-time reporting for leadership, finance, and operations in a single, legible surface.",
    icon: Database,
  },
  {
    title: "Automations",
    description:
      "Trigger workflows from gifts, applications, and system events through Zapier's integration network.",
    icon: Workflow,
  },
  {
    title: "Member Care",
    description:
      "Track care plans, milestones, and follow-up in one place so workers do not slip through the cracks.",
    icon: MessageSquareMore,
  },
  {
    title: "Events & Gatherings",
    description:
      "Run registrations and logistics on your own site while keeping CRM records in sync automatically.",
    icon: Building2,
  },
  {
    title: "Roadmap Active",
    description:
      "The OS is alive. New modules are deployed continuously as we listen to real agencies on the front lines.",
    icon: Globe2,
  },
] as const;

export const metadata: Metadata = createMetadata({
  title: "Platform",
  description:
    "See how Asymmetric.al replaces the fragmented DIY stack with a coherent mission operating system built for sending agencies.",
  path: "/platform",
});

export default function PlatformPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Mission Operating System"
        title={
          <h1 className="text-balance font-heading text-[clamp(3rem,6vw,5.2rem)] font-semibold leading-[0.93] tracking-[-0.07em] text-foreground">
            One Surface. Total Clarity.
          </h1>
        }
        description="Most agencies are running on a patchwork of disconnected tools. Asymmetric.al replaces the chaos of the DIY stack with a single operating system designed specifically for the complexities of sending."
        actions={[
          { label: "System Architecture", href: "/specs", variant: "outline" },
          { label: "Role Views", href: "/missions" },
        ]}
        meta={["One login", "Shared database", "Open-source foundations", "Continuous deployment"]}
      >
        <Reveal trigger="mount">
          <MediaStage
            sceneAlt="Bright open landscape behind the product"
            screenshotAlt="Platform view showing mission control"
            badge="Unified solution"
            priority
            caption={
              <div className="flex flex-col gap-1">
                <p className="font-medium text-foreground">
                  Replace the clutter with Mission Control.
                </p>
                <p className="text-muted-foreground">
                  Finance, mobilization, donor support, communications, and web
                  operations share one operating surface and one story.
                </p>
              </div>
            }
          />
        </Reveal>
      </PageHero>

      <Section tone="sky">
        <SectionHeader
          eyebrow="The False Choice"
          title="Agencies have been forced to choose between two failing options."
          description="That compromise drains resources and slows deployment. The problem is not just one old system or one missing integration. It is the entire operating model."
        />
        <Reveal className="mt-6">
          <div className="rounded-[1.8rem] border border-foreground/10 bg-card/86 p-6 shadow-[0_24px_70px_-54px_rgba(22,33,43,0.75)]">
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.28em] text-primary/70">
              System warning
            </p>
            <p className="mt-3 max-w-[62ch] font-heading text-[clamp(1.35rem,2.4vw,2rem)] font-semibold leading-[1.15] tracking-[-0.04em] text-foreground">
              “Our ops, mobilization, and finance teams are spending more time
              managing our tools than we are supporting our missionaries.”
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Common agency feedback
            </p>
          </div>
        </Reveal>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <StaggerReveal>
            {falseChoiceCards.map((item) => (
              <StaggerItem key={item.title}>
                <Card className="surface-card h-full rounded-[1.85rem]">
                  <CardHeader>
                    <p className="font-mono text-[0.72rem] uppercase tracking-[0.28em] text-primary/70">
                      {item.subhead}
                    </p>
                    <CardTitle className="font-heading text-2xl font-semibold tracking-[-0.05em]">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-5">
                    <p className="text-base leading-7 text-muted-foreground">
                      {item.description}
                    </p>
                    <ul className="grid gap-3">
                      {item.failures.map((failure) => (
                        <li
                          key={failure}
                          className="rounded-[1.2rem] border border-foreground/10 bg-background/70 px-4 py-3 text-sm font-medium text-foreground/86"
                        >
                          {failure}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Why we focus here"
          title="We are not trying to build software for everyone."
          description="We are hyper-focused on the operational realities of sending agencies, because generic tools miss too much of the story."
        />
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          <StaggerReveal>
            {reasons.map((item) => (
              <StaggerItem key={item.title}>
                <Card className="surface-card h-full rounded-[1.8rem]">
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
      </Section>

      <Section tone="accent">
        <SectionHeader
          eyebrow="The Unified Solution"
          title="Mission Control"
          description="Replace the clutter with cohesion. Every operational function under one login, sharing one database, without an integration tax."
        />
        <div className="mt-8">
          <PlatformTabs items={tabs} />
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StaggerReveal>
            {supportingModules.map((item) => (
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

      <Section>
        <div className="surface-panel grid gap-6 rounded-[2.2rem] p-7 sm:p-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-end">
          <Reveal>
            <div>
              <p className="font-mono text-[0.72rem] uppercase tracking-[0.28em] text-primary/70">
                Partnership model
              </p>
              <h2 className="mt-4 max-w-[16ch] font-heading text-[clamp(2.15rem,4vw,3.45rem)] font-semibold leading-[1] tracking-[-0.06em]">
                Let’s build the future.
              </h2>
              <p className="mt-5 max-w-[58ch] text-base leading-7 text-muted-foreground">
                We are looking for agencies that are tired of the status quo.
                Early access, migration support, and open-source contribution
                are part of the model from the start.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="grid gap-3">
              {["Early Access Program", "Data Migration Support", "Open Source Contribution"].map(
                (item) => (
                  <div
                    key={item}
                    className="rounded-[1.35rem] border border-foreground/10 bg-secondary/55 px-4 py-4 text-sm font-medium text-foreground"
                  >
                    {item}
                  </div>
                )
              )}
              <Link
                href="/contact"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "mt-2 px-5"
                )}
              >
                Start the Conversation
                <ArrowRight data-icon="inline-end" />
              </Link>
            </div>
          </Reveal>
        </div>
      </Section>
    </main>
  );
}
