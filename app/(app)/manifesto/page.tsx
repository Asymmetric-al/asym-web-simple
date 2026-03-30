import { PageHero, Section } from "@/components/site/page";
import { Reveal, StaggerItem, StaggerReveal } from "@/components/site/reveal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button-variants";
import { createMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";
import { ArrowRight, Users, ShieldCheck } from "lucide-react";
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
] as const;

export const metadata: Metadata = createMetadata({
  title: "Manifesto",
  description:
    "The underlying logic of Asymmetric.al: software, stewardship, hyper-focus, and the Kingdom logic behind small inputs and exponential outputs.",
  path: "/manifesto",
});

export default function ManifestoPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero
        eyebrow="THE PHILOSOPHY // V1.0"
        title={
          <h1 className="font-heading text-foreground text-[clamp(3rem,6vw,5.15rem)] leading-[0.94] font-semibold tracking-[-0.07em] text-balance">
            Small Inputs.<br />
            Exponential Outputs.
          </h1>
        }
        description="The underlying logic of Asymmetric.al. How we think about software, stewardship, and the scale of the Great Commission. We operate on a logic of asymmetry: simple faithfulness that produces mountain-moving outcomes. This mirrors the Kingdom principle found in Matthew 20:26."
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

      <div className="bg-secondary/30 border-l-2 border-primary/50 my-12 mx-8 pl-8 py-8 rounded-r-sm">
        <p className="font-display text-2xl md:text-3xl text-foreground italic leading-relaxed text-balance">
          "Consider the mustard seed—how God multiplies the smallest unit into the largest capacity."
        </p>
      </div>

      <Section className="border-b border-border bg-card">
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
            <div className="lg:col-span-7 order-2 lg:order-1 lg:pt-8">
              <div className="bg-background shadow-xl border border-border rounded-sm p-6">
                <div className="font-mono text-[10px] text-primary uppercase tracking-widest mb-6">
                  STAFFING ARCHITECTURE
                </div>
                <div className="flex flex-col gap-8">
                  <div className="flex items-start gap-6">
                    <div className="p-3 bg-secondary rounded-sm border border-border text-primary shrink-0">
                      <Users size={24} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold font-display text-foreground mb-2">Support Raised Staff</h4>
                      <p className="text-muted-foreground font-light leading-relaxed text-balance">
                        Our core staff raise support just like the missionaries we serve. We do this because the work <em>is</em> ministry. We also retain paid development staff to ensure professional delivery.
                      </p>
                    </div>
                  </div>
                  <div className="h-px w-full bg-border" />
                  <div className="flex items-start gap-6">
                    <div className="p-3 bg-secondary rounded-sm border border-border text-foreground shrink-0">
                      <ShieldCheck size={24} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold font-display text-foreground mb-2">Governance & Covering</h4>
                      <p className="text-muted-foreground font-light leading-relaxed text-balance">
                        Operating as a project under Global Fellowship Inc. (501c3), we are accountable to a board of directors and strict financial oversight.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 order-1 lg:order-2 lg:sticky lg:top-32 flex flex-col lg:items-end lg:text-right self-start">
              <div className="flex flex-col gap-6">
                <div className="inline-flex items-center gap-3 px-3 py-1.5 border border-border bg-secondary/50 rounded-sm w-fit backdrop-blur-md">
                  <span className="font-mono text-[10px] text-primary uppercase tracking-widest">04 // The Staffing Model</span>
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground tracking-tighter leading-[0.9] text-balance text-right">
                  By Missionaries,<br />For Missionaries.
                </h2>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      <Section className="bg-background relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 pointer-events-none z-0">
          <div className="w-64 h-64 rounded-full bg-primary/20 blur-3xl" />
        </div>

        <Reveal>
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-border bg-secondary/50 rounded-sm text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-8 backdrop-blur-md">
              <span className="text-success">✦</span>
              <span>05 // Our Values</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-display font-medium text-foreground leading-tight mb-12 text-balance">
              We operate with open hands. <br/>
              <span className="text-muted-foreground">We do not lock you in. We acknowledge limits. We build open source.</span>
            </h2>

            <div className="mb-20">
              <Link
                href="/statement-of-faith"
                className="inline-flex items-center gap-3 px-6 py-3 border border-border hover:border-foreground text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-all group bg-card rounded-sm"
              >
                Read our Statement of Faith <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="max-w-md mx-auto">
              <div className="bg-card border-border p-1 rounded-sm">
                <div className="bg-background p-8 flex flex-col items-center gap-6 rounded-sm">
                  <div className="w-16 h-16 rounded-full border border-border bg-secondary/50 flex items-center justify-center">
                    <span className="text-2xl font-bold text-muted-foreground">✝</span>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.2em] mb-2">
                      Digitally Signed
                    </p>
                    <span className="text-2xl font-display font-bold text-foreground tracking-tight">
                      The Maintainers
                    </span>
                  </div>
                  <div className="w-full pt-6 border-t border-border flex justify-between text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                    <span>Asymmetric.al</span>
                    <span>EST. 2024</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>
    </main>
  );
}