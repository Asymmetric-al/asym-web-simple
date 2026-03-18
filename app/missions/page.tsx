import { MediaStage } from "@/components/site/media-stage";
import { PageHero, Section, SectionHeader } from "@/components/site/page";
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
  "AI and automation with guardrails. Staff do more with less friction while tenant safety and auditability remain intact.",
] as const;

export const metadata: Metadata = createMetadata({
  title: "Missions",
  description:
    "Why Asymmetric.al is built specifically for Christian missions agencies and the teams carrying the operational weight of sending.",
  path: "/missions",
});

export default function MissionsPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="The Underserved Sector"
        title={
          <h1 className="text-balance font-heading text-[clamp(3rem,6vw,5.15rem)] font-semibold leading-[0.94] tracking-[-0.07em] text-foreground">
            The frontier deserves world-class tools.
          </h1>
        }
        description="Global missions is the most important work on earth. The tools behind it should not feel like an afterthought. We exist to serve one thing: getting the gospel to people who have never heard the name of Jesus."
        actions={[
          { label: "Start the Conversation", href: "/contact" },
          { label: "Learn how the platform works", href: "/platform", variant: "outline" },
        ]}
        meta={["By missionaries, for missionaries", "Hopeful", "Trusted", "Modern", "Open hands"]}
      >
        <Reveal>
          <MediaStage
            sceneAlt="Mission landscape under an open sky"
            screenshotAlt="Mission-facing software overlay"
            badge="Why missions"
            caption={
              <div className="flex flex-col gap-1">
                <p className="font-medium text-foreground">
                  Close the gap between Silicon Valley innovation and the Great
                  Commission.
                </p>
                <p className="text-muted-foreground">
                  Software should lift the load from teams stewarding people,
                  churches, donors, and field realities across borders.
                </p>
              </div>
            }
          />
        </Reveal>
      </PageHero>

      <Section tone="sky">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <Reveal>
            <div className="surface-panel rounded-[2rem] p-7 sm:p-8">
              <p className="font-mono text-[0.72rem] uppercase tracking-[0.28em] text-primary/70">
                01 // The Focus
              </p>
              <h2 className="mt-4 font-heading text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.02] tracking-[-0.06em]">
                Why we give all our focus to missions agencies.
              </h2>
              <p className="mt-5 text-base leading-7 text-muted-foreground">
                Most software stacks are built for sales teams, memberships, or
                generic fundraising. Missions does not fit that mold. You are
                sending people, not shipping products.
              </p>
              <p className="mt-4 text-base leading-7 text-muted-foreground">
                The current leadership of Asymmetric.al felt that gap in
                missions ourselves. We watched faithful staff spend hours
                wrestling tools that were never built for their calling. That
                tension is what gave birth to Asymmetric.al: a project by
                missionaries, for missionaries.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-4">
            <Reveal delay={0.06}>
              <div className="page-shell-glow rounded-[2rem] border border-foreground/10 bg-primary px-7 py-8 text-primary-foreground shadow-[0_28px_70px_-50px_rgba(22,33,43,0.8)]">
                <p className="font-mono text-[0.72rem] uppercase tracking-[0.3em] text-primary-foreground/70">
                  02 // The Reality
                </p>
                <h3 className="mt-4 font-heading text-3xl font-semibold tracking-[-0.05em]">
                  Sending is different.
                </h3>
                <p className="mt-4 max-w-[50ch] text-base leading-7 text-primary-foreground/82">
                  Because missions is unique, we believe it deserves software
                  born from that world, not adapted to it after the fact.
                </p>
              </div>
            </Reveal>
            <div className="grid gap-4">
              <StaggerReveal>
                {differencePoints.map((item) => (
                  <StaggerItem key={item.title}>
                    <Card className="surface-card rounded-[1.7rem]">
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
        </div>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="03 // Our Calling"
          title="We use technology to serve the servants."
          description="Our role is not to be the hero of the story. Our role is to lift the load from the shoulders of the people carrying it."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <StaggerReveal>
            {audiences.map((item) => (
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

      <Section tone="accent">
        <SectionHeader
          eyebrow="04 // The Impact"
          title="What missions-only focus means in practice."
          description="Because we only build for missions nonprofits, we can shape the whole platform around your world instead of forcing you into someone else's pattern."
        />
        <div className="mt-10 grid gap-4 lg:grid-cols-5">
          <StaggerReveal>
            {impactPoints.map((point, index) => (
              <StaggerItem key={point}>
                <Card className="surface-card h-full rounded-[1.75rem]">
                  <CardHeader>
                    <p className="font-mono text-[0.72rem] uppercase tracking-[0.28em] text-primary/70">
                      0{index + 1}
                    </p>
                  </CardHeader>
                  <CardContent className="pt-0 text-sm leading-7 text-foreground/86">
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
            <div className="surface-panel rounded-[2rem] p-7 sm:p-8">
              <p className="font-mono text-[0.72rem] uppercase tracking-[0.28em] text-primary/70">
                05 // Origin Story
              </p>
              <h2 className="mt-4 font-heading text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.02] tracking-[-0.06em]">
                We felt this pain from the inside.
              </h2>
              <p className="mt-5 text-base leading-7 text-muted-foreground">
                Asymmetric.al started inside a mission organization that wanted
                to send technologists as missionaries. We expected to build
                field-facing tools. Instead, we kept running into the same
                problem: mission staff were drowning in admin.
              </p>
              <p className="mt-4 text-base leading-7 text-muted-foreground">
                Wrestling old donor systems, manual statements, scattered
                websites, and brittle integrations. The field was waiting, but
                the back office was underwater. That holy frustration pushed us
                toward a single question: what if missions agencies had
                first-class tools, built for their calling, not as an
                afterthought to some other market?
              </p>
            </div>
          </Reveal>

          <div className="grid gap-4">
            <Reveal delay={0.08}>
              <Card className="page-shell-glow rounded-[1.8rem] border border-foreground/10 bg-primary text-primary-foreground shadow-[0_28px_70px_-50px_rgba(22,33,43,0.82)]">
                <CardHeader>
                  <p className="font-mono text-[0.72rem] uppercase tracking-[0.3em] text-primary-foreground/70">
                    06 // Open Source
                  </p>
                  <CardTitle className="font-heading text-2xl font-semibold tracking-[-0.05em]">
                    Not just a product. A shared build for the global church.
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm leading-7 text-primary-foreground/82">
                  <p>
                    Open by design, clear data ownership, and a stack that can
                    be audited and extended by a wider missions tech community.
                  </p>
                  <p>
                    Agencies can share patterns, flows, and templates instead
                    of solving the same problems alone.
                  </p>
                </CardContent>
              </Card>
            </Reveal>

            <Reveal delay={0.14}>
              <Card className="surface-card rounded-[1.8rem]">
                <CardHeader>
                  <p className="font-mono text-[0.72rem] uppercase tracking-[0.28em] text-primary/70">
                    07 // Invitation
                  </p>
                  <CardTitle className="font-heading text-2xl font-semibold tracking-[-0.05em]">
                    Let’s talk about your agency.
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm leading-7 text-muted-foreground">
                  <p>
                    We would rather build this with a small group of sending
                    agencies who care about the field than ship a finished
                    product that misses real needs.
                  </p>
                  <p>
                    If you lead a missions organization or you are a
                    missions-minded technologist who wants to contribute, we
                    would love to connect.
                  </p>
                  <Link
                    href="/join"
                    className={cn(
                      buttonVariants({ size: "lg" }),
                      "mt-2 px-5"
                    )}
                  >
                    Join the Build Community
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
