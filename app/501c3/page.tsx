import { PageHero, Section } from "@/components/site/page";
import { Reveal } from "@/components/site/reveal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import Link from "next/link";

const disclosures = [
  {
    title: "Project structure",
    body: "Asymmetric.al operates as a project under Global Fellowship Inc., a United States nonprofit organization recognized as tax-exempt under section 501(c)(3) of the Internal Revenue Code.",
  },
  {
    title: "Tax-deductible contributions",
    body: "Contributions made for the support of Asymmetric.al through Global Fellowship Inc. are intended to be tax-deductible to the fullest extent permitted by law. Donors should consult their own tax advisors regarding individual circumstances.",
  },
  {
    title: "Governance and control",
    body: "All donations are received under the legal and financial oversight of Global Fellowship Inc. The governing board retains final discretion and control over the use of contributed funds in accordance with nonprofit law and the charitable mission of the organization.",
  },
  {
    title: "Donor intent",
    body: "Where permitted, gifts designated for Asymmetric.al are used to advance the project’s charitable purposes, including engineering, infrastructure, security, operations, and early nonprofit onboarding support.",
  },
  {
    title: "Receipts and records",
    body: "Donors should retain the official donation receipt issued by Global Fellowship Inc. for their records. Additional giving questions can be directed to info@asymmetric.al.",
  },
] as const;

export const metadata: Metadata = createMetadata({
  title: "501(c)(3) Disclosure",
  description:
    "Disclosure regarding Asymmetric.al's status as a project under Global Fellowship Inc. and the tax treatment of donations.",
  path: "/501c3",
});

export default function DisclosurePage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="501(c)(3) Disclosure"
        density="legal"
        title={
          <h1 className="text-balance font-heading text-[clamp(2.8rem,5vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.07em] text-foreground">
            Nonprofit covering and donation treatment.
          </h1>
        }
        description="Asymmetric.al is not a stand-alone tax entity. It operates under the legal and financial covering of Global Fellowship Inc."
      />

      <Section density="legal">
        <Reveal trigger="mount">
          <Card className="surface-panel rounded-[2rem]">
            <CardHeader>
              <CardTitle className="font-heading text-3xl font-semibold tracking-[-0.05em]">
                Global Fellowship Inc. EIN 68-0214543
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-[var(--space-stack-legal-lg)]">
              {disclosures.map((section) => (
                <div key={section.title} className="flex flex-col gap-3">
                  <h2 className="font-heading text-2xl font-semibold tracking-[-0.04em] text-foreground">
                    {section.title}
                  </h2>
                  <p className="content-measure text-base leading-7 text-muted-foreground">
                    {section.body}
                  </p>
                </div>
              ))}
              <p className="text-base leading-7 text-muted-foreground">
                Questions can be directed to{" "}
                <Link
                  href="mailto:info@asymmetric.al"
                  className="link-resilient inline-block max-w-full font-medium text-foreground underline underline-offset-4"
                >
                  info@asymmetric.al
                </Link>
                .
              </p>
            </CardContent>
          </Card>
        </Reveal>
      </Section>
    </main>
  );
}
