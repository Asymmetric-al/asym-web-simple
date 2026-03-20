import { PageHero, Section, SectionHeader } from "@/components/site/page";
import { Reveal, StaggerItem, StaggerReveal } from "@/components/site/reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button-variants";
import { createMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  HandCoins,
  HeartHandshake,
  Scale,
  Shield,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

const pillars = [
  {
    title: "Open Source",
    description:
      "Code is public. Contributions accelerate the entire ecosystem instead of trapping value inside a single vendor.",
    icon: Shield,
  },
  {
    title: "Stewardship",
    description:
      "Operating under Global Fellowship Inc. means governance, accountability, and tax-deductible giving in the US.",
    icon: Scale,
  },
  {
    title: "Efficiency",
    description:
      "We build shared rails so individual ministries do not each have to fund the same infrastructure problem alone.",
    icon: HandCoins,
  },
  {
    title: "Scale",
    description:
      "One platform serving many agencies multiplies your impact beyond what one custom deployment could do by itself.",
    icon: HeartHandshake,
  },
] as const;

const faqItems = [
  {
    value: "deductible",
    question: "Is my gift tax-deductible?",
    answer:
      "Yes. All gifts are processed through our covering nonprofit, Global Fellowship Inc. (EIN 68-0214543), and are fully tax-deductible in the United States.",
  },
  {
    value: "margin",
    question: "Do you charge a margin?",
    answer:
      "No. Ministries keep their own Stripe accounts. We charge only at cost for hosting and licensing. Our aim is global impact, not profit extraction.",
  },
  {
    value: "open-source",
    question: "Will you stay open source?",
    answer:
      "Yes. We build on and contribute to open source. We will keep publishing our forks and patches so the ecosystem remains portable and transparent.",
  },
  {
    value: "funds",
    question: "What does my gift fund?",
    answer:
      "Core engineering, security reviews, data residency work, and early onboarding for pilot organizations that are shaping the platform with us.",
  },
  {
    value: "methods",
    question: "Can I give via check or DAF?",
    answer:
      "Yes. Checks payable to “Global Fellowship Inc” with “Asymmetric.al” in the memo can be mailed to PO Box 1, Meadow Vista, CA 95722. Email info@asymmetric.al for wire instructions and donor-advised fund coordination.",
  },
  {
    value: "control",
    question: "Who controls the funds?",
    answer:
      "Asymmetric.al operates as a project under the governance of the Global Fellowship board, which provides financial accountability and covering.",
  },
] as const;

export const metadata: Metadata = createMetadata({
  title: "Give",
  description:
    "Support the nonprofit build behind Asymmetric.al and help fund shared digital rails for missions organizations.",
  path: "/give",
});

export default function GivePage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero
        eyebrow="Nonprofit 501(c)(3)"
        title={
          <h1 className="font-heading text-foreground text-[clamp(3rem,6vw,5rem)] leading-[0.94] font-semibold tracking-[-0.07em] text-balance">
            Fuel the tool that serves the servants.
          </h1>
        }
        description="Your capital builds the digital rails for the next generation of missions. We operate with zero profit margin to maximize mission velocity."
        actions={[
          { label: "Email Giving Team", href: "/contact" },
          {
            label: "Read 501(c)(3) Disclosure",
            href: "/501c3",
            variant: "outline",
          },
        ]}
        meta={[
          "Global Fellowship Inc.",
          "Tax-deductible",
          "Open source",
          "Zero profit margin",
        ]}
      >
        <Reveal trigger="mount">
          <Card className="page-shell-glow surface-interactive border-foreground/10 bg-primary text-primary-foreground rounded-[2rem] border shadow-[0_32px_82px_-56px_rgba(22,33,43,0.82)]">
            <CardHeader>
              <p className="text-primary-foreground/70 font-mono text-[0.72rem] tracking-[0.28em] uppercase">
                Trust signals
              </p>
              <CardTitle className="font-heading text-3xl font-semibold tracking-[-0.05em]">
                Capital with a nonprofit posture.
              </CardTitle>
            </CardHeader>
            <CardContent className="text-primary-foreground/82 flex flex-col gap-3 text-sm leading-7">
              <p>Operating as a project under Global Fellowship Inc.</p>
              <p>EIN 68-0214543</p>
              <p>Open source code and shared rails.</p>
              <p>Mission velocity over margin.</p>
            </CardContent>
          </Card>
        </Reveal>
      </PageHero>

      <Section className="section-divider-accent">
        <SectionHeader
          eyebrow="Why give"
          title="The build is designed for multiplication."
          description="One well-built system can remove drag for many agencies at once. That is why we think this work is worth funding."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
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
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
          <Reveal>
            <div className="page-shell-glow surface-panel surface-interactive rounded-[2rem] p-7 sm:p-8">
              <p className="text-primary/70 font-mono text-[0.72rem] tracking-[0.28em] uppercase">
                Giving paths
              </p>
              <h2 className="font-heading mt-4 text-[clamp(2rem,4vw,3rem)] leading-[1.02] font-semibold tracking-[-0.06em]">
                Clean, trust-heavy giving options.
              </h2>
              <div className="text-muted-foreground mt-6 flex flex-col gap-4 text-base leading-7">
                <p>
                  Checks payable to “Global Fellowship Inc” with “Asymmetric.al”
                  in the memo can be mailed to PO Box 1, Meadow Vista, CA 95722.
                </p>
                <p>
                  Email info@asymmetric.al for donor-advised fund support, wire
                  instructions, or questions about project oversight and use of
                  funds.
                </p>
                <Link
                  href="mailto:info@asymmetric.al?subject=Asymmetric.al%20giving%20inquiry"
                  className={cn(buttonVariants({ size: "lg" }), "mt-2 px-5")}
                >
                  Start a Giving Conversation
                  <ArrowRight data-icon="inline-end" />
                </Link>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <Accordion
              defaultValue={["deductible"]}
              className="surface-panel surface-interactive border-foreground/10 rounded-[2rem]"
            >
              {faqItems.map((item) => (
                <AccordionItem key={item.value} value={item.value}>
                  <AccordionTrigger className="px-5 py-5 text-base font-semibold sm:px-6">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground px-5 text-sm leading-7 sm:px-6">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </Section>
    </main>
  );
}
