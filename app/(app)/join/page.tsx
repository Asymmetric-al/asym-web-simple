import { PageHero, Section, SectionHeader } from "@/components/site/page";
import { Reveal, StaggerItem, StaggerReveal } from "@/components/site/reveal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button-variants";
import { createMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  BookOpen,
  Code,
  GitPullRequest,
  Globe,
  Heart,
  Users,
  Zap,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

const pathways = [
  {
    title: "Full-Time Staff",
    icon: Users,
    subtitle: "Support-Raised Roles",
    description:
      "Join the core team on a support-raised model. These roles help build and maintain Asym for Christian missions organizations over the long haul.",
    action: "View roles",
    link: "#roles",
    internal: true,
  },
  {
    title: "Internships",
    icon: BookOpen,
    subtitle: "Learning Pathway",
    description:
      "A season of contribution and learning with real product work. Best for people who want practical experience inside a serious mission-driven software team.",
    action: "Inquire via email",
    link: "mailto:careers@asymmetric.al?subject=Internship Inquiry",
    internal: false,
  },
  {
    title: "Open Source",
    icon: GitPullRequest,
    subtitle: "Flexible Contribution",
    description:
      "You do not need to change jobs to contribute. If you want to help improve the product or ecosystem in your own time, open-source contribution is welcome.",
    action: "GitHub repo",
    link: "https://github.com/Asymmetric-al",
    internal: false,
  },
] as const;

const values = [
  {
    title: "Excellence is stewardship",
    icon: Heart,
    description:
      "Reliable, maintainable software is one form of care for the people who depend on it every day.",
  },
  {
    title: "Builders who take ownership",
    icon: Zap,
    description:
      "We value people who can bring clarity to ambiguous problems and carry work through to completion.",
  },
  {
    title: "Empathy for mission realities",
    icon: Globe,
    description:
      "We build for teams doing serious work across borders and in demanding environments. That should shape how we design and build.",
  },
] as const;

const roles = [
  {
    id: "fe-eng",
    title: "Senior Frontend Engineer",
    type: "Full-Time (Support Raised)",
    location: "Remote",
    stack: "React, Next.js, TypeScript, Tailwind",
    description:
      "Shape the staff and missionary surfaces in Asym. We need someone who can turn complex workflows into clear, reliable interfaces.",
  },
  {
    id: "be-eng",
    title: "Backend Systems Architect",
    type: "Full-Time (Support Raised)",
    location: "Remote",
    stack: "Node.js, PostgreSQL, Redis, Keycloak",
    description:
      "Shape the core data and workflow systems behind donor care, missionary support, and reporting.",
  },
  {
    id: "db-eng",
    title: "Database Reliability Engineer",
    type: "Full-Time (Support Raised)",
    location: "Remote",
    stack: "PostgreSQL, Redis, pgvector",
    description:
      "Help us keep mission data trustworthy, fast, and resilient as the platform grows.",
  },
  {
    id: "devops",
    title: "Infrastructure Engineer",
    type: "Full-Time (Support Raised)",
    location: "Remote",
    stack: "AWS, Terraform, Docker, GitHub Actions",
    description:
      "Own the cloud, deployment, and security foundations that keep the platform reliable.",
  },
  {
    id: "dev-rel",
    title: "Developer Advocate",
    type: "Part-Time / Contract",
    location: "Remote",
    stack: "Docs, Community, Content",
    description:
      "Help external contributors, docs, and community participation stay clear and healthy.",
  },
  {
    id: "prod-design",
    title: "Product Designer",
    type: "Full-Time (Support Raised)",
    location: "Remote",
    stack: "Figma, Design Systems, UX Research",
    description:
      "Turn complicated mission workflows into calm, understandable product experiences.",
  },
] as const;

export const metadata: Metadata = createMetadata({
  title: "Careers and Contributions at Asym",
  description:
    "Join Asym as staff, intern, or contributor if you want to use your craft in service of Christian missions.",
  path: "/join",
});

export default function JoinPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero
        eyebrow="Careers and contribution"
        title={
          <h1 className="font-heading text-foreground text-[clamp(3rem,6vw,5rem)] leading-[0.94] font-semibold tracking-[-0.07em] text-balance">
            Use your craft to serve Christian missions.
          </h1>
        }
        description="We are building Asym for teams carrying donor care, missionary support, and operations. If you are a builder who wants to do serious work in service of the global church, there are a few ways to get involved."
        meta={[
          "Full-Time Staff",
          "Internships",
          "Open Source",
          "Serious work",
          "Christian missions",
        ]}
      >
        <Reveal trigger="mount">
          <Card className="page-shell-glow surface-interactive border-foreground/10 bg-primary text-primary-foreground rounded-[2rem] border shadow-[0_32px_82px_-56px_rgba(22,33,43,0.82)]">
            <CardHeader>
              <p className="text-primary-foreground/70 font-mono text-[0.72rem] tracking-[0.28em] uppercase">
                Three ways to engage
              </p>
              <CardTitle className="font-heading text-3xl font-semibold tracking-[-0.05em]">
                Three ways to get involved.
              </CardTitle>
            </CardHeader>
            <CardContent className="text-primary-foreground/82 flex flex-col gap-3 text-sm leading-7">
              <p>Join the core team on a support-raised model.</p>
              <p>Learn through an internship with real product work.</p>
              <p>Contribute in the open on your own schedule.</p>
            </CardContent>
          </Card>
        </Reveal>
      </PageHero>

      <Section className="section-divider-accent">
        <SectionHeader
          eyebrow="How to Engage"
          title="There are three ways to get involved."
          description="Depending on your capacity and calling, there is a place for you to contribute."
        />
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          <StaggerReveal>
            {pathways.map((pathway) => (
              <StaggerItem key={pathway.title}>
                <Card className="surface-card surface-interactive h-full rounded-[1.85rem] transition-all duration-300 hover:border-foreground/20">
                  <CardHeader>
                    <div className="bg-secondary text-primary flex size-11 items-center justify-center rounded-2xl shadow-sm">
                      <pathway.icon className="size-5" />
                    </div>
                    <div className="mt-4">
                      <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                        {pathway.subtitle}
                      </p>
                      <CardTitle className="font-heading mt-2 text-2xl font-semibold tracking-[-0.05em]">
                        {pathway.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="text-muted-foreground text-sm leading-7">
                    <p>{pathway.description}</p>
                    <div className="mt-6 border-t border-border pt-4">
                      <Link
                        href={pathway.link}
                        target={!pathway.internal && pathway.link.startsWith("http") ? "_blank" : undefined}
                        rel={!pathway.internal && pathway.link.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-foreground transition-colors hover:text-primary"
                      >
                        {pathway.action}
                        <ArrowRight className="size-3" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </Section>

      <Section tone="accent" className="section-divider-accent">
        <SectionHeader
          eyebrow="Engineering Values"
          title="What we look for in builders."
          description="The work is collaborative, but it is not casual. We care about clarity, humility, craftsmanship, and follow-through."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <StaggerReveal>
            {values.map((value) => (
              <StaggerItem key={value.title}>
                <Card className="surface-card surface-interactive h-full rounded-[1.8rem] transition-all duration-300 hover:border-foreground/20">
                  <CardHeader>
                    <div className="bg-secondary text-primary flex size-11 items-center justify-center rounded-2xl shadow-sm">
                      <value.icon className="size-5" />
                    </div>
                    <CardTitle className="font-heading mt-4 text-xl font-semibold tracking-[-0.04em]">
                      {value.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-muted-foreground text-sm leading-7">
                    {value.description}
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </Section>

      <Section id="roles">
        <SectionHeader
          eyebrow="Open roles"
          title="Current roles for the team"
          description="We are looking for high-agency builders to join these roles."
        />
        <div className="mt-8 grid gap-4">
          <StaggerReveal>
            {roles.map((role) => (
              <StaggerItem key={role.id}>
                <Card className="surface-card surface-interactive rounded-[1.8rem] transition-all duration-300 hover:border-foreground/20">
                  <div className="flex flex-col items-start justify-between gap-6 p-6 md:flex-row md:items-center">
                    <div className="flex-1 space-y-3">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                        <h3 className="font-heading text-xl font-semibold tracking-[-0.04em] text-foreground">
                          {role.title}
                        </h3>
                        <span className="w-fit rounded-sm border border-border bg-secondary px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                          {role.type}
                        </span>
                      </div>
                      <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                        {role.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-3 pt-2">
                        <div className="flex items-center gap-1.5 rounded-sm border border-border bg-secondary px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                          <Code className="size-2.5" />
                          {role.stack}
                        </div>
                        <div className="flex items-center gap-1.5 rounded-sm border border-border bg-secondary px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                          <Globe className="size-2.5" />
                          {role.location}
                        </div>
                      </div>
                    </div>
                    <div className="flex w-full items-center justify-end border-t border-border pt-4 md:w-auto md:border-0 md:pt-0">
                      <Link
                        href="/contact"
                        className={cn(
                          buttonVariants({ size: "lg" }),
                          "w-full px-5 md:w-auto"
                        )}
                      >
                        Start a conversation
                        <ArrowRight data-icon="inline-end" />
                      </Link>
                    </div>
                  </div>
                </Card>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>

        <div className="relative mt-20 mb-24 overflow-hidden rounded-[1.8rem] border border-dashed border-border bg-card p-12 text-center">
          <div className="relative z-10">
            <h4 className="font-heading mb-4 text-2xl font-semibold tracking-[-0.05em] text-foreground">
              Do not see the exact role yet?
            </h4>
            <p className="mx-auto mb-8 max-w-lg text-sm leading-relaxed text-muted-foreground">
              We are always open to hearing from strong builders who want to serve Christian missions, even if the right role is not listed yet.
            </p>
            <Link href="/contact" className={cn(buttonVariants({ size: "lg" }), "px-5")}>
              Start a conversation
              <ArrowRight data-icon="inline-end" />
            </Link>
          </div>
        </div>
      </Section>
    </main>
  );
}
