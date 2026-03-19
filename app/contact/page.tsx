import { InquiryForm } from "@/components/site/inquiry-form";
import { PageHero, Section } from "@/components/site/page";
import { Reveal, StaggerItem, StaggerReveal } from "@/components/site/reveal";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createMetadata } from "@/lib/metadata";
import { Building2, HandCoins, UserRoundSearch } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

const contactTracks = [
  {
    title: "Agency conversation",
    description:
      "For executive, operations, finance, and advancement teams evaluating the platform or asking migration questions.",
    icon: Building2,
  },
  {
    title: "Giving and governance",
    description:
      "For donors, foundations, or advisors who need clarity about oversight, giving methods, or nonprofit posture.",
    icon: HandCoins,
  },
  {
    title: "Builder interest",
    description:
      "For engineers, designers, and technical leaders who want to contribute or explore alignment.",
    icon: UserRoundSearch,
  },
] as const;

export const metadata: Metadata = createMetadata({
  title: "Contact",
  description:
    "Start a direct conversation with Asymmetric.al about agency fit, giving, governance, or joining the build.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Contact"
        title={
          <h1 className="text-balance font-heading text-[clamp(3rem,6vw,4.8rem)] font-semibold leading-[0.94] tracking-[-0.07em] text-foreground">
            Simple and direct.
          </h1>
        }
        description="Tell us who you are, what kind of conversation you need, and enough context to route it well. We would rather have a real exchange than a noisy inbox."
        meta={["info@asymmetric.al", "Agency fit", "Giving", "Builder interest"]}
      >
        <Reveal>
          <Card className="page-shell-glow rounded-[2rem] border border-foreground/10 bg-primary text-primary-foreground shadow-[0_32px_82px_-56px_rgba(22,33,43,0.82)]">
            <CardHeader>
              <p className="font-mono text-[0.72rem] uppercase tracking-[0.28em] text-primary-foreground/70">
                Direct line
              </p>
              <CardTitle className="link-resilient max-w-full font-heading text-3xl font-semibold tracking-[-0.05em]">
                info@asymmetric.al
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-7 text-primary-foreground/82">
              If you already know what you need, send an email directly and we
              will route it from there.
            </CardContent>
          </Card>
        </Reveal>
      </PageHero>

      <Section>
        <div className="grid gap-4 md:grid-cols-3">
          <StaggerReveal>
            {contactTracks.map((item) => (
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

      <Section tone="sky">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-start">
          <Reveal>
            <Card className="surface-panel rounded-[2rem]">
              <CardHeader>
                <p className="font-mono text-[0.72rem] uppercase tracking-[0.28em] text-primary/70">
                  What helps
                </p>
                <CardTitle className="font-heading text-3xl font-semibold tracking-[-0.05em]">
                  A few details make the first response better.
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4 text-base leading-7 text-muted-foreground">
                <p>Name, organization, role, and your main question.</p>
                <p>Any current tools or systems creating friction.</p>
                <p>Whether you are reaching out as an agency, donor, advisor, or builder.</p>
                <p>
                  Direct email always works:{" "}
                  <Link
                    href="mailto:info@asymmetric.al"
                    className="link-resilient inline-block max-w-full font-medium text-foreground underline underline-offset-4"
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
