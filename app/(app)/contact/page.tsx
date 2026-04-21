import { InquiryForm } from "@/components/site/inquiry-form";
import { PageHero, Section } from "@/components/site/page";
import { Reveal, StaggerItem, StaggerReveal } from "@/components/site/reveal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createMetadata } from "@/lib/metadata";
import { Mail, MapPin, MessageSquare, type LucideIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

type ContactChannel = {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  content: ReactNode;
  meta?: string;
  href?: string;
};

const contactChannels: ContactChannel[] = [
  {
    id: "general",
    icon: Mail,
    title: "General Inquiry",
    description:
      "Questions about agency fit, rollout timing, governance, nonprofit covering, or whether the Mission Tech Stack Audit is the right next step.",
    content: "info@asymmetric.al",
    meta: "RESPONSE TIME: ~24HRS",
    href: "mailto:info@asymmetric.al",
  },
  {
    id: "builder",
    icon: MessageSquare,
    title: "Builder Support",
    description:
      "Technical questions, contribution interest, and open-source discussion for teams or builders who want to go deeper.",
    content: "github.com/asymmetric-al",
    href: "https://github.com/Asymmetric-al",
  },
  {
    id: "hq",
    icon: MapPin,
    title: "Global HQ",
    description:
      "Formal correspondence, nonprofit paperwork, and mailing-address level contact.",
    content: (
      <>
        Global Fellowship Inc.
        <br />
        Attn: Asymmetric.al Project
        <br />
        PO Box 1
        <br />
        Meadow Vista, CA 95722
      </>
    ),
  },
];

export const metadata: Metadata = createMetadata({
  title: "Mission Tech Stack Audit and Contact",
  description:
    "Request the Mission Tech Stack Audit or start a direct conversation with Asym about fit, trust, governance, or rollout timing.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero
        title={
          <h1 className="font-heading text-foreground text-[clamp(3rem,6vw,5rem)] leading-[0.92] font-semibold tracking-[-0.07em] text-balance">
            Start with the
            <br />
            Mission Tech Stack Audit.
          </h1>
        }
        description="Use this page to request the Mission Tech Stack Audit or ask direct questions about rollout timing, trust, governance, or the fit between Asym and your current systems."
        meta={[
          "info@asymmetric.al",
          "Mission Tech Stack Audit",
          "General inquiry",
          "Builder support",
        ]}
      >
        <Reveal trigger="mount">
          <Card className="page-shell-glow surface-interactive border-foreground/10 bg-primary text-primary-foreground rounded-[2rem] border shadow-[0_32px_82px_-56px_rgba(22,33,43,0.82)]">
            <CardHeader>
              <p className="text-primary-foreground/70 font-mono text-[0.72rem] tracking-[0.28em] uppercase">
                Start here
              </p>
              <CardTitle className="font-heading link-resilient text-3xl font-semibold tracking-[-0.05em]">
                info@asymmetric.al
              </CardTitle>
            </CardHeader>
            <CardContent className="text-primary-foreground/82 text-sm leading-7">
              <p>Use direct email if you already know the question you need to ask.</p>
            </CardContent>
          </Card>
        </Reveal>
      </PageHero>

      <Section className="section-divider-accent">
        <div className="grid gap-4 md:grid-cols-3">
          <StaggerReveal>
            {contactChannels.map((channel) => {
              const channelBody = (
                <>
                  <div className="bg-secondary text-primary flex size-11 items-center justify-center rounded-2xl shadow-sm">
                    <channel.icon className="size-5" />
                  </div>
                  <div className="mt-5 space-y-3">
                    <CardTitle className="font-heading text-xl font-semibold tracking-[-0.04em]">
                      {channel.title}
                    </CardTitle>
                    <p className="text-sm leading-7 text-muted-foreground">
                      {channel.description}
                    </p>
                    <div className="link-resilient text-foreground font-mono text-[0.72rem] uppercase tracking-[0.22em]">
                      {channel.content}
                    </div>
                    {channel.meta ? (
                      <p className="text-primary/72 font-mono text-[0.68rem] uppercase tracking-[0.22em]">
                        {channel.meta}
                      </p>
                    ) : null}
                  </div>
                </>
              );

              return (
                <StaggerItem key={channel.id}>
                  <Card className="surface-card surface-interactive h-full rounded-[1.8rem]">
                    <CardHeader>
                      {channel.href ? (
                        <Link
                          href={channel.href}
                          target={channel.href.startsWith("http") ? "_blank" : undefined}
                          rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="block"
                        >
                          {channelBody}
                        </Link>
                      ) : (
                        channelBody
                      )}
                    </CardHeader>
                  </Card>
                </StaggerItem>
              );
            })}
          </StaggerReveal>
        </div>
      </Section>

      <Section tone="sky">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-start">
          <Reveal>
            <Card className="page-shell-glow surface-panel surface-interactive rounded-[2rem]">
              <CardHeader>
                <p className="text-primary/70 font-mono text-[0.72rem] tracking-[0.28em] uppercase">
                  What to include
                </p>
                <CardTitle className="font-heading text-3xl font-semibold tracking-[-0.05em]">
                  Share enough context for a useful first reply.
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground flex flex-col gap-5 text-base leading-7 text-pretty">
                <ul className="flex list-none flex-col gap-3.5 pl-0">
                  <li className="relative pl-[1.1em] before:absolute before:left-0 before:top-[0.55em] before:size-1.5 before:rounded-full before:bg-primary/35">
                    Include your name, organization, topic, and the main question so
                    the first reply can be substantive.
                  </li>
                  <li className="relative pl-[1.1em] before:absolute before:left-0 before:top-[0.55em] before:size-1.5 before:rounded-full before:bg-primary/35">
                    Note any tools, workflows, or systems that are creating drag
                    today. Disconnected tools, donor care issues, missionary support bottlenecks, statements, and reporting all help us route faster.
                  </li>
                  <li className="relative pl-[1.1em] before:absolute before:left-0 before:top-[0.55em] before:size-1.5 before:rounded-full before:bg-primary/35">
                    Say whether you lead operations, finance, donor care, advancement, technology, or general evaluation so we know who we are serving.
                  </li>
                </ul>
                <p className="border-foreground/10 text-sm leading-6 text-muted-foreground border-t pt-4">
                  Prefer to write directly?{" "}
                  <Link
                    href="mailto:info@asymmetric.al"
                    className="link-resilient text-foreground font-medium underline underline-offset-4"
                  >
                    info@asymmetric.al
                  </Link>
                </p>
              </CardContent>
            </Card>
          </Reveal>
          <Reveal delay={0.08}>
            <InquiryForm kind="contact" />
          </Reveal>
        </div>
      </Section>
    </main>
  );
}
