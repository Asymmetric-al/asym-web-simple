import { PageHero, Section, SectionHeader } from "@/components/site/page";
import { Reveal, StaggerItem, StaggerReveal } from "@/components/site/reveal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createMetadata } from "@/lib/metadata";
import { BookOpen } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

interface FaithPoint {
  readonly label: string;
  readonly title: string;
  readonly text: string;
}

const FAITH_POINTS: readonly FaithPoint[] = [
  {
    label: "01",
    title: "Scripture",
    text: "We believe the Old and New Testaments were breathed out by God through the Holy Spirit, are true and without error, and are the final authority in all matters of faith and practice.",
  },
  {
    label: "02",
    title: "God",
    text: "We believe in one true and living God, the maker of heaven and earth, who exists eternally as three distinct persons: Father, Son, and Holy Spirit.",
  },
  {
    label: "03",
    title: "Humanity and sin",
    text: "We believe humanity was created in the image of God to glorify Him and enjoy Him forever. Because of Adam's sin, all people are now born with a sinful nature, separated from God, and unable to save themselves.",
  },
  {
    label: "04",
    title: "Jesus Christ",
    text: "We believe Jesus Christ is the only begotten Son of God, born of the virgin Mary, perfectly obedient, crucified, buried, bodily raised on the third day, ascended into heaven, and now seated at the right hand of God.",
  },
  {
    label: "05",
    title: "Salvation",
    text: "We believe salvation is not the work of man but a gracious gift of God, received by faith and made possible only through the substitutionary death of Jesus Christ on the cross.",
  },
  {
    label: "06",
    title: "Church and ordinances",
    text: "We believe in one church, the body of Christ, made up of all who have been born again by the Holy Spirit. We affirm baptism and the Lord's Supper as practices for believers in Jesus Christ.",
  },
  {
    label: "07",
    title: "Christ's return",
    text: "We believe Jesus Christ is coming again in glory to receive His church to Himself and to judge the world in righteousness.",
  },
  {
    label: "08",
    title: "Resurrection and judgment",
    text: "We believe in the resurrection of the dead, the punishment of the wicked, and the eternal blessedness of the redeemed.",
  },
] as const;

const trustLinks = [
  {
    title: "About Asym",
    href: "/about",
    description:
      "See why Christian faith, stewardship, and mission reality stay visible in the public story.",
  },
  {
    title: "Open Source and Trust",
    href: "/open-source-and-trust",
    description:
      "Read how supported delivery, open-source foundations, and long-term trust fit together.",
  },
  {
    title: "Financials",
    href: "/501c3",
    description:
      "Review the nonprofit covering and financial oversight under Global Fellowship Inc.",
  },
] as const;

export const metadata: Metadata = createMetadata({
  title: "Statement of Faith",
  description:
    "The Christian doctrinal foundation behind Asym and its nonprofit covering under Global Fellowship Inc.",
  path: "/statement-of-faith",
});

export default function StatementOfFaithPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero
        eyebrow="Statement of Faith"
        title={
          <h1 className="font-heading text-foreground text-[clamp(3rem,6vw,5rem)] leading-[0.94] font-semibold tracking-[-0.07em] text-balance">
            Christian faith stays visible here.
          </h1>
        }
        description="Asym is openly Christian. This statement summarizes the doctrinal foundation behind the work under Global Fellowship Inc."
        meta={[
          "Openly Christian",
          "Doctrinal foundation",
          "Public trust surface",
          "Nonprofit covering",
        ]}
      >
        <Reveal trigger="mount">
          <Card className="page-shell-glow surface-interactive border-foreground/10 bg-primary text-primary-foreground rounded-[2rem] border shadow-[0_32px_82px_-56px_rgba(22,33,43,0.82)]">
            <CardHeader>
              <div className="bg-primary-foreground/12 flex size-12 items-center justify-center rounded-2xl">
                <BookOpen className="size-6" aria-hidden />
              </div>
              <CardTitle className="font-heading text-3xl font-semibold tracking-[-0.05em]">
                Faith should be visible, plain, and sincere.
              </CardTitle>
            </CardHeader>
            <CardContent className="text-primary-foreground/82 flex flex-col gap-3 text-sm leading-7">
              <p>We do not treat doctrine like private background information.</p>
              <p>
                These convictions shape how we think about truth, stewardship,
                service, and accountability.
              </p>
              <p>
                Asym operates under Christian governance and nonprofit covering,
                and we want that to be clear instead of implied.
              </p>
            </CardContent>
          </Card>
        </Reveal>
      </PageHero>

      <Section className="section-divider-accent">
        <SectionHeader
          eyebrow="Core convictions"
          title="The doctrinal foundation beneath the work."
          description="These statements summarize the historic Christian beliefs behind Asym."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <StaggerReveal>
            {FAITH_POINTS.map((point) => (
              <StaggerItem key={point.label}>
                <Card className="surface-card surface-interactive h-full rounded-[1.8rem]">
                  <CardHeader>
                    <p className="text-primary/70 font-mono text-[0.72rem] tracking-[0.28em] uppercase">
                      {point.label}
                    </p>
                    <CardTitle className="font-heading text-xl font-semibold tracking-[-0.04em]">
                      {point.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-muted-foreground text-sm leading-7">
                    {point.text}
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
            <Card className="page-shell-glow surface-panel surface-interactive rounded-[2rem] p-1">
              <CardHeader className="pb-0">
                <p className="text-primary/70 font-mono text-[0.72rem] tracking-[0.28em] uppercase">
                  Closing note
                </p>
                <CardTitle className="font-heading text-3xl font-semibold tracking-[-0.05em]">
                  We want faith to be visible in public, not implied in private.
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground flex flex-col gap-4 text-base leading-7">
                <p>
                  This page is one part of a wider public trust surface that
                  also includes nonprofit covering, financial oversight, and
                  open-source foundations.
                </p>
                <p>
                  If you are evaluating Asym, we want you to be able to see the
                  convictions, the stewardship commitments, and the trust story in
                  plain language.
                </p>
              </CardContent>
            </Card>
          </Reveal>
          <div className="grid gap-4">
            <StaggerReveal>
              {trustLinks.map((item) => (
                <StaggerItem key={item.href}>
                  <Card className="surface-card surface-interactive rounded-[1.8rem]">
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
                </StaggerItem>
              ))}
            </StaggerReveal>
          </div>
        </div>
      </Section>
    </main>
  );
}
