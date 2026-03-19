import { PageHero, Section } from "@/components/site/page";
import { Reveal, StaggerItem, StaggerReveal } from "@/components/site/reveal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button-variants";
import { createMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

const manifestoSections = [
  {
    label: "01 // The Origin",
    title: "Bad tools are a stewardship issue.",
    paragraphs: [
      "We started with a simple conviction: place excellent technology in the hands of frontline workers. The biggest gap was not on the field; it was the crushing administrative load behind the scenes.",
      "Sending agencies and their missionaries were wrestling with spreadsheets instead of serving people. Donors were navigating broken systems. Friction in the back office translates directly to lost ministry on the front lines.",
      "Asymmetric.al is the outgrowth of that need. We operate on a logic of asymmetry: simple faithfulness that produces mountain-moving outcomes.",
    ],
  },
  {
    label: "02 // The Paradigm",
    title: "The upside down Kingdom.",
    paragraphs: [
      "We do not measure significance the way the market does. The Kingdom often grows through hidden obedience, local faithfulness, and small acts of costly service that compound over time.",
      "That posture changes how we build. We are not chasing novelty for its own sake or software theater that makes the product feel important while the user still feels burdened.",
      "We want software that removes friction from humble, repeated acts of stewardship: reconciling gifts, caring for workers, following up with donors, and moving candidates toward the field with clarity.",
    ],
  },
  {
    label: "03 // The Design Philosophy",
    title: "Precision through hyper-focus.",
    paragraphs: [
      "Minimize clicks. Maximize ministry. We apply an asymmetrical principle to product design: minimizing inputs to maximize outputs. This governs every decision we make, from our architecture to our interface.",
      "Because we are focused solely on sending agencies, we can build specific workflows that generic software misses. Whether it is a donor updating a card or a mobilizer tracking a candidate, we engineer for the fewest meaningful actions.",
      "Your time is one of the most valuable resources in the Great Commission. By removing administrative friction, we protect capacity to fund ministry, support missionaries, and advance the Gospel.",
    ],
  },
  {
    label: "04 // The Staffing Model",
    title: "By missionaries, for missionaries.",
    paragraphs: [
      "Our core staff raise support just like the missionaries we serve. We do this because the work is ministry. We also retain paid development staff to ensure professional delivery and technical seriousness.",
      "Operating as a project under Global Fellowship Inc. means governance, accountability, and financial oversight are part of the structure, not an afterthought. Covering matters. Oversight matters. Stewardship matters.",
    ],
  },
  {
    label: "05 // Our Posture",
    title: "We operate with open hands.",
    paragraphs: [
      "We do not lock you in. We acknowledge limits. We build open source. Trust must remain visible in the architecture, the product, and the business model.",
      "Our aim is not to make agencies dependent on us. It is to help the global church operate with healthier, more durable digital rails that can outlast a single vendor, a single funding season, or a single product cycle.",
    ],
  },
] as const;

export const metadata: Metadata = createMetadata({
  title: "Manifesto",
  description:
    "The underlying logic of Asymmetric.al: software, stewardship, hyper-focus, and the Kingdom logic behind small inputs and exponential outputs.",
  path: "/manifesto",
});

export default function ManifestoPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="The Philosophy // v1.0"
        title={
          <h1 className="font-heading text-foreground text-[clamp(3rem,6vw,5.15rem)] leading-[0.94] font-semibold tracking-[-0.07em] text-balance">
            Small Inputs. Exponential Outputs.
          </h1>
        }
        description="The underlying logic of Asymmetric.al. How we think about software, stewardship, and the scale of the Great Commission."
        meta={[
          "Stewardship",
          "Hyper-focus",
          "Open hands",
          "Support-raised staff",
          "Kingdom logic",
        ]}
      >
        <Reveal trigger="mount">
          <Card className="page-shell-glow border-foreground/10 bg-primary text-primary-foreground rounded-[2rem] border shadow-[0_32px_84px_-58px_rgba(22,33,43,0.82)]">
            <CardHeader>
              <p className="text-primary-foreground/70 font-mono text-[0.72rem] tracking-[0.28em] uppercase">
                Guiding phrase
              </p>
              <CardTitle className="font-heading text-3xl font-semibold tracking-[-0.05em]">
                Minimize Clicks. Maximize Ministry.
              </CardTitle>
            </CardHeader>
            <CardContent className="text-primary-foreground/82 space-y-4 text-sm leading-7">
              <p>
                The site and product should feel like clear sky, open ground,
                and precise software. Warmth without sentimentality. Beauty with
                weight.
              </p>
              <p>
                This is not generic B2B SaaS, church branding theatre, or
                corporate enterprise coldness. It is a serious tool for serious
                people doing costly work with hope.
              </p>
            </CardContent>
          </Card>
        </Reveal>
      </PageHero>

      <Section className="section-divider-accent">
        <div className="grid gap-4">
          <StaggerReveal>
            {manifestoSections.map((section, index) => (
              <StaggerItem key={section.label}>
                <Card
                  className={cn(
                    "surface-panel surface-interactive rounded-[2rem]",
                    index % 2 === 1 && "bg-secondary/24"
                  )}
                >
                  <CardHeader>
                    <p className="text-primary/70 font-mono text-[0.72rem] tracking-[0.28em] uppercase">
                      {section.label}
                    </p>
                    <CardTitle className="font-heading max-w-[18ch] text-[clamp(1.9rem,3.6vw,2.8rem)] leading-[1.02] font-semibold tracking-[-0.05em]">
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-muted-foreground grid gap-4 text-base leading-7 lg:max-w-[75ch]">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </Section>

      <Section tone="accent">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:items-end">
          <Reveal>
            <div className="page-shell-glow surface-panel surface-interactive rounded-[2rem] p-7 sm:p-8">
              <p className="text-primary/70 font-mono text-[0.72rem] tracking-[0.28em] uppercase">
                Theological bedrock
              </p>
              <h2 className="font-heading mt-4 max-w-[18ch] text-[clamp(2rem,4vw,3.1rem)] leading-[1.02] font-semibold tracking-[-0.06em]">
                Doctrine is not wallpaper.
              </h2>
              <p className="text-muted-foreground mt-5 max-w-[58ch] text-base leading-7">
                Our Christian conviction is not decorative language added after
                the fact. It shapes the posture of the organization and the
                purpose of the work.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <Link
              href="/statement-of-faith"
              className={cn(
                buttonVariants({ size: "lg" }),
                "w-full px-5 sm:w-auto"
              )}
            >
              Read our Statement of Faith
              <ArrowRight data-icon="inline-end" />
            </Link>
          </Reveal>
        </div>
      </Section>
    </main>
  );
}
