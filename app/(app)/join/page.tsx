import { PageHero, Section, SectionHeader } from "@/components/site/page";
import { Reveal, StaggerItem, StaggerReveal } from "@/components/site/reveal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button-variants";
import { createMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";
import { ArrowRight, Code, Globe, Heart, Users, GitPullRequest, BookOpen, Zap, Terminal } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

const pathways = [
  {
    title: "Full-Time Staff",
    icon: Users,
    subtitle: "The Core Team",
    description: "Join the core engineering unit. Our staff operate on a support-raised model, similar to the missionaries we serve. This allows us to sustain world-class engineering talent while keeping platform costs accessible for the global church.",
    action: "View Roles",
    link: "#roles",
    internal: true,
  },
  {
    title: "Internships",
    icon: BookOpen,
    subtitle: "The Forge",
    description: "A rigorous season of contribution and learning. We pair you with senior engineers to ship real code to production. Ideal for students or boot camp graduates looking to bridge the gap to seniority.",
    action: "Inquire via Email",
    link: "mailto:careers@asymmetric.al?subject=Internship Inquiry",
    internal: false,
  },
  {
    title: "Open Source",
    icon: GitPullRequest,
    subtitle: "The Community",
    description: "You don't need to change jobs to contribute. Jump into our GitHub, pick up a ticket, and help us improve the ecosystem. A perfect way to tithe your talent on your own schedule.",
    action: "GitHub Repo",
    link: "https://github.com/Asymmetric-al",
    internal: false,
  },
] as const;

const values = [
  {
    title: "Excellence as Stewardship",
    icon: Heart,
    description: "We don't ship broken windows. We believe that building reliable, performant, and maintainable software is a form of care for the people who rely on it.",
  },
  {
    title: "High-Agency Builders",
    icon: Zap,
    description: "We are a lean team. We value individuals who can take an ambiguous problem, architect a solution, and drive it to completion without needing constant oversight.",
  },
  {
    title: "Empathy for the Field",
    icon: Globe,
    description: "We build for people working in low-bandwidth, high-stress environments. We prioritize offline-first architecture and accessible UX over flashy trends.",
  },
] as const;

const roles = [
  {
    id: "fe-eng",
    title: "Senior Frontend Engineer",
    type: "Full-Time (Support Raised)",
    location: "Remote",
    stack: "React, Next.js, TypeScript, Tailwind",
    description: "Own the Mission Control interface. You will architect the dashboard experience used by thousands of workers, focusing on performance, accessibility, and offline-sync capabilities.",
  },
  {
    id: "be-eng",
    title: "Backend Systems Architect",
    type: "Full-Time (Support Raised)",
    location: "Remote",
    stack: "Node.js, PostgreSQL, Redis, Keycloak",
    description: "Scale the kernel. You will handle complex data synchronization between tenants, manage identity across services, and ensure data sovereignty protocols.",
  },
  {
    id: "db-eng",
    title: "Database Reliability Engineer",
    type: "Full-Time (Support Raised)",
    location: "Remote",
    stack: "PostgreSQL, Redis, pgvector",
    description: "Steward the data. You will optimize complex multi-tenant queries, design efficient schemas for financial ledgers, and manage replication strategies for high availability.",
  },
  {
    id: "devops",
    title: "Infrastructure Engineer",
    type: "Full-Time (Support Raised)",
    location: "Remote",
    stack: "AWS, Terraform, Docker, GitHub Actions",
    description: "Manage the fleet. You will own our Infrastructure as Code, secure our cloud perimeter, and build resilient CI/CD pipelines for zero-downtime deployments.",
  },
  {
    id: "dev-rel",
    title: "Developer Advocate",
    type: "Part-Time / Contract",
    location: "Remote",
    stack: "Docs, Community, Content",
    description: "Bridge the gap between our core team and the open-source community. You will write technical documentation, manage PRs, and help external contributors succeed.",
  },
  {
    id: "prod-design",
    title: "Product Designer",
    type: "Full-Time (Support Raised)",
    location: "Remote",
    stack: "Figma, Design Systems, UX Research",
    description: "Translate complex operational workflows into intuitive interfaces. You will maintain our design system and work directly with missionaries to understand their friction points.",
  },
] as const;

export const metadata: Metadata = createMetadata({
  title: "Join the Build",
  description: "Join the Asymmetric.al build as a pilot agency, missions-minded builder, or supporter of shared nonprofit infrastructure.",
  path: "/join",
});

export default function JoinPage() {
  const scrollToRoles = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById("roles");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero
        eyebrow="OPEN RECRUITMENT"
        title={
          <h1 className="font-heading text-foreground text-[clamp(3rem,6vw,5rem)] leading-[0.94] font-semibold tracking-[-0.07em] text-balance">
            Your code.<br />
            Their mission.
          </h1>
        }
        description="We are bridging the gap between Silicon Valley innovation and the Great Commission. If you are a builder looking to use your craft for something that outlasts you, you belong here."
        meta={[
          "Full-Time Staff",
          "Internships",
          "Open Source",
          "High agency",
          "Mission-first",
        ]}
      >
        <Reveal trigger="mount">
          <Card className="page-shell-glow surface-interactive border-foreground/10 bg-primary text-primary-foreground rounded-[2rem] border shadow-[0_32px_82px_-56px_rgba(22,33,43,0.82)]">
            <CardHeader>
              <p className="text-primary-foreground/70 font-mono text-[0.72rem] tracking-[0.28em] uppercase">
                Three ways to engage
              </p>
              <CardTitle className="font-heading text-3xl font-semibold tracking-[-0.05em]">
                Full-Time. Intern. Open Source.
              </CardTitle>
            </CardHeader>
            <CardContent className="text-primary-foreground/82 flex flex-col gap-3 text-sm leading-7">
              <p>Join the core engineering unit on support-raised model.</p>
              <p>Learn through rigorous internship shipping real code.</p>
              <p>Contribute to open source on your own schedule.</p>
            </CardContent>
          </Card>
        </Reveal>
      </PageHero>

      <Section className="section-divider-accent">
        <SectionHeader
          eyebrow="How to Engage"
          title="There are three ways to join the mission."
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
                      <CardTitle className="font-heading text-2xl font-semibold tracking-[-0.05em] mt-2">
                        {pathway.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="text-muted-foreground text-sm leading-7">
                    <p>{pathway.description}</p>
                    <div className="mt-6 pt-4 border-t border-border">
                      {pathway.internal ? (
                        <button
                          onClick={scrollToRoles}
                          className="text-xs font-mono text-foreground hover:text-primary transition-colors flex items-center gap-2 uppercase tracking-widest cursor-pointer"
                        >
                          {pathway.action} <ArrowRight size={12} />
                        </button>
                      ) : (
                        <Link
                          href={pathway.link}
                          target={pathway.link.startsWith("http") ? "_blank" : undefined}
                          rel={pathway.link.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="text-xs font-mono text-foreground hover:text-primary transition-colors flex items-center gap-2 uppercase tracking-widest"
                        >
                          {pathway.action} <ArrowRight size={12} />
                        </Link>
                      )}
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
                    <CardTitle className="font-heading text-xl font-semibold tracking-[-0.04em] mt-4">
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
          eyebrow="Active Deployments"
          title="Current priority needs for the team"
          description="We are looking for high-agency builders to join these roles."
        />
        <div className="mt-8 grid gap-4">
          <StaggerReveal>
            {roles.map((role) => (
              <StaggerItem key={role.id}>
                <Card className="surface-card surface-interactive rounded-[1.8rem] transition-all duration-300 hover:border-foreground/20">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-6">
                    <div className="flex-1 space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                        <h3 className="text-xl font-bold text-foreground font-display tracking-tight">
                          {role.title}
                        </h3>
                        <span className="px-2 py-0.5 rounded-sm text-[10px] font-mono uppercase tracking-widest w-fit border border-border bg-secondary text-muted-foreground">
                          {role.type}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-sm max-w-2xl leading-relaxed font-light">
                        {role.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-3 pt-2">
                        <div className="flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground uppercase tracking-widest bg-secondary px-2 py-1 rounded-sm border border-border">
                          <Code size={10} /> {role.stack}
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground uppercase tracking-widest bg-secondary px-2 py-1 rounded-sm border border-border">
                          <Globe size={10} /> {role.location}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-end w-full md:w-auto pt-4 md:pt-0 border-t border-border md:border-0">
                      <Link href="/contact" className="w-full md:w-auto">
                        <button className={cn(buttonVariants({ size: "lg" }), "w-full md:w-auto")}>
                          Initiate <ArrowRight size={14} className="ml-2" />
                        </button>
                      </Link>
                    </div>
                  </div>
                </Card>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>

        <div className="mt-20 mb-24 p-12 border border-dashed border-border rounded-sm bg-card text-center relative overflow-hidden">
          <div className="relative z-10">
            <h4 className="text-2xl font-display font-bold text-foreground mb-4 tracking-tight">
              Don't see your specific role?
            </h4>
            <p className="text-muted-foreground text-sm mb-8 max-w-lg mx-auto leading-relaxed font-light">
              We are always interested in conversations with high-agency builders.
              Whether you are a Security Specialist, Data Scientist, or just want to help—let's talk.
            </p>
            <Link href="/contact">
              <button className={buttonVariants({ size: "lg" })}>Start a Conversation</button>
            </Link>
          </div>
        </div>
      </Section>
    </main>
  );
}