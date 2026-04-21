import { PageHero, Section } from "@/components/site/page";
import { Reveal, StaggerItem, StaggerReveal } from "@/components/site/reveal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createMetadata } from "@/lib/metadata";
import { Blocks, BookOpen, HeartHandshake, Scale } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

const pillars = [
  {
    title: "Our conviction",
    description:
      "People doing Gospel work should not lose staff time to old software, fragile workarounds, and administrative drag. That conviction shapes the product.",
    icon: HeartHandshake,
  },
  {
    title: "Our faith",
    description:
      "We are openly Christian. We believe Jesus Christ is Lord, the Gospel is true, and our work should be marked by truth, service, stewardship, and love for neighbor.",
    icon: BookOpen,
  },
  {
    title: "Built for mission realities",
    description:
      "Donor care, missionary support, statements, reporting, and operations belong in the same system because that is how mission teams actually work.",
    icon: Scale,
  },
  {
    title: "Open-source foundations",
    description:
      "Asym is built on open-source foundations because transparency, stewardship, and long-term trust matter. Most organizations will never need to think about that day to day. But if your team wants to extend or contribute, you can.",
    icon: Blocks,
  },
] as const;

export const metadata: Metadata = createMetadata({
  title: "About Asym and Why It Exists",
  description:
    "Learn why Asym exists, how Christian faith stays visible, and why stewardship, transparency, and mission reality shape the product.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero
        eyebrow="About Asym"
        title={
          <h1 className="font-heading text-foreground text-[clamp(3rem,6vw,5rem)] leading-[0.94] font-semibold tracking-[-0.07em] text-balance">
            People doing Gospel work deserve better tools.
          </h1>
        }
        description="Asymmetric.al exists because too many Christian missions organizations have been forced to choose between outdated nonprofit software and brittle DIY stacks. We believe teams caring for donors, missionaries, and operations deserve tools marked by clarity, trust, and stewardship. So we built Asym: the operating system for Christian missions."
        actions={[
          { label: "Join the Waitlist", href: "/waitlist" },
          {
            label: "Learn more about how Asym is built",
            href: "/open-source-and-trust",
            variant: "outline",
          },
        ]}
        meta={[
          "Openly Christian",
          "Stewardship and transparency",
          "Mission-built",
          "Statement of Faith visible",
        ]}
      >
        <Reveal trigger="mount">
          <Card className="page-shell-glow surface-interactive border-foreground/10 bg-primary text-primary-foreground rounded-[2rem] border shadow-[0_32px_82px_-56px_rgba(22,33,43,0.82)]">
            <CardHeader>
              <p className="text-primary-foreground/70 font-mono text-[0.72rem] tracking-[0.28em] uppercase">
                Why this stays visible
              </p>
              <CardTitle className="font-heading text-3xl font-semibold tracking-[-0.05em]">
                Faith and trust should not hide in the fine print.
              </CardTitle>
            </CardHeader>
            <CardContent className="text-primary-foreground/82 flex flex-col gap-3 text-sm leading-7">
              <p>We are openly Christian, and we want that to be clear.</p>
              <p>Statement of Faith, financials, and open-source trust stay public on purpose.</p>
              <p>
                <Link href="/statement-of-faith" className="underline underline-offset-4">
                  Learn more about our Statement of Faith
                </Link>
                .
              </p>
            </CardContent>
          </Card>
        </Reveal>
      </PageHero>

      <Section className="section-divider-accent">
        <div className="grid gap-4 md:grid-cols-2">
          <StaggerReveal>
            {pillars.map((item) => (
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

      <Section tone="sky">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Statement of Faith",
              href: "/statement-of-faith",
              description:
                "Read the doctrinal foundation behind the work and the convictions that shape it.",
            },
            {
              title: "Open Source and Trust",
              href: "/open-source-and-trust",
              description:
                "See how open-source foundations, stewardship, and long-term trust fit together without making contribution mandatory.",
            },
            {
              title: "Financials",
              href: "/501c3",
              description:
                "Review nonprofit covering, financial oversight, and donation treatment under Global Fellowship Inc.",
            },
          ].map((item) => (
            <Card key={item.href} className="surface-card surface-interactive rounded-[1.8rem]">
              <CardHeader>
                <CardTitle className="font-heading text-xl font-semibold tracking-[-0.04em]">
                  <Link href={item.href} className="link-resilient">
                    {item.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-sm leading-7">
                {item.description}
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>
    </main>
  );
}
