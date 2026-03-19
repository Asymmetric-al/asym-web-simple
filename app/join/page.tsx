import { InquiryForm } from "@/components/site/inquiry-form";
import { PageHero, Section, SectionHeader } from "@/components/site/page";
import { Reveal, StaggerItem, StaggerReveal } from "@/components/site/reveal";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createMetadata } from "@/lib/metadata";
import { ArrowUpRight, Code2, Compass, Handshake, Layers3 } from "lucide-react";
import type { Metadata } from "next";

const lanes = [
  {
    title: "Pilot agencies",
    description:
      "Executive and operations teams who feel the weight of broken systems and want to help shape a healthier operating model early.",
  },
  {
    title: "Missions-minded builders",
    description:
      "Senior engineers, designers, and systems thinkers who want to use real technical skill in service of the Great Commission.",
  },
  {
    title: "Build supporters",
    description:
      "Donors and advisors who want to fund shared infrastructure with visible stewardship and open-source posture.",
  },
] as const;

const principles = [
  {
    title: "High agency",
    description:
      "We look for people who can move without constant ceremony while still communicating clearly and acting responsibly.",
    icon: Compass,
  },
  {
    title: "Technical rigor",
    description:
      "The work deserves serious engineering, not hobby-grade shortcuts. Quality, accessibility, and durability are part of the calling.",
    icon: Code2,
  },
  {
    title: "Open hands",
    description:
      "We care about portability, shared patterns, and stewardship over lock-in. Posture matters as much as talent.",
    icon: Handshake,
  },
  {
    title: "System thinking",
    description:
      "The hard part is rarely one feature. It is how finance, giving, content, mobilization, and member care fit together coherently.",
    icon: Layers3,
  },
] as const;

export const metadata: Metadata = createMetadata({
  title: "Join the Build",
  description:
    "Join the Asymmetric.al build as a pilot agency, missions-minded builder, or supporter of shared nonprofit infrastructure.",
  path: "/join",
});

export default function JoinPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Join the Build"
        title={
          <h1 className="text-balance font-heading text-[clamp(3rem,6vw,5rem)] font-semibold leading-[0.94] tracking-[-0.07em] text-foreground">
            Technical, warm, and pointed at the field.
          </h1>
        }
        description="We are building with pilot agencies, experienced builders, and donors who understand that good infrastructure can create disproportionate ministry leverage."
        meta={["Pilot agencies", "Senior builders", "Open source", "Mission-first", "High agency"]}
      >
        <Reveal>
          <Card className="page-shell-glow rounded-[2rem] border border-foreground/10 bg-primary text-primary-foreground shadow-[0_32px_82px_-56px_rgba(22,33,43,0.82)]">
            <CardHeader>
              <p className="font-mono text-[0.72rem] uppercase tracking-[0.28em] text-primary-foreground/70">
                What joining looks like
              </p>
              <CardTitle className="font-heading text-3xl font-semibold tracking-[-0.05em]">
                Real conversations. Clear fit. Shared build.
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 text-sm leading-7 text-primary-foreground/82">
              <p>Pilot agencies shape workflows and migration priorities.</p>
              <p>Builders contribute product, design, and engineering depth.</p>
              <p>Supporters fund the rails that many ministries can share.</p>
            </CardContent>
          </Card>
        </Reveal>
      </PageHero>

      <Section>
        <SectionHeader
          eyebrow="Where you fit"
          title="There is more than one way to join."
          description="Different people enter the build from different angles. The common thread is a commitment to serious work, visible trust, and service to the global church."
        />
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          <StaggerReveal>
            {lanes.map((item) => (
              <StaggerItem key={item.title}>
                <Card className="surface-card h-full rounded-[1.85rem]">
                  <CardHeader>
                    <CardTitle className="font-heading text-2xl font-semibold tracking-[-0.05em]">
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
          eyebrow="What we look for"
          title="People and organizations who can carry weight well."
          description="The work is collaborative, but it is not casual. We care about clarity, humility, craftsmanship, and follow-through."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StaggerReveal>
            {principles.map((item) => (
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
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] lg:items-start">
          <Reveal>
            <Card className="surface-panel rounded-[2rem]">
              <CardHeader>
                <p className="font-mono text-[0.72rem] uppercase tracking-[0.28em] text-primary/70">
                  Process
                </p>
                <CardTitle className="font-heading text-3xl font-semibold tracking-[-0.05em]">
                  Start with context, not a funnel.
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4 text-base leading-7 text-muted-foreground">
                <p>
                  Tell us who you are, what kind of work you want to do, and
                  where you see the current system breaking down. We start with
                  honest conversation, not a scripted sales motion.
                </p>
                <p className="inline-flex max-w-full items-center gap-2 rounded-full bg-secondary/55 px-3 py-1.5 text-center font-mono text-[0.72rem] uppercase tracking-[0.24em] text-primary/75">
                  Join the waitlist
                  <ArrowUpRight className="size-3.5" />
                </p>
              </CardContent>
            </Card>
          </Reveal>
          <Reveal delay={0.08}>
            <InquiryForm kind="waitlist" />
          </Reveal>
        </div>
      </Section>
    </main>
  );
}
