import { PageHero, Section } from "@/components/site/page";
import { Reveal } from "@/components/site/reveal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import Link from "next/link";

const sections = [
  {
    title: "Overview",
    body: [
      "This Privacy Policy describes how Asymmetric.al handles information collected through this website and through direct communications initiated from this site.",
      "Asymmetric.al is a project of Global Fellowship Inc. We collect only the information necessary to operate the website, respond to inquiries, and maintain a secure, reliable service experience.",
    ],
  },
  {
    title: "Information we collect",
    body: [
      "Information you choose to send us, including your name, organization, role, email address, and message contents.",
      "Operational data such as server logs, request metadata, security signals, and aggregate website analytics needed to keep the site reliable and safe.",
      "If you contact us by email, the contents of that correspondence and related follow-up records may be retained for stewardship, security, and organizational continuity.",
    ],
  },
  {
    title: "How we use information",
    body: [
      "To respond to agency, donor, governance, media, or builder inquiries.",
      "To improve website performance, reliability, and security.",
      "To evaluate early platform interest, coordinate conversations, and understand broad operating needs across missions organizations.",
    ],
  },
  {
    title: "Sharing and disclosure",
    body: [
      "We do not sell personal information.",
      "We may share information with service providers who help host, secure, or operate the site, or with our covering nonprofit and advisors when needed for governance, legal compliance, or donor stewardship.",
      "We may disclose information if required by law or if necessary to protect the rights, safety, and integrity of our users, staff, systems, or the public.",
    ],
  },
  {
    title: "Retention and security",
    body: [
      "We retain information only as long as reasonably necessary for the purpose for which it was provided, or as required for legal, operational, or governance reasons.",
      "We use practical technical and organizational safeguards to protect the information we receive, but no internet transmission or storage system can be guaranteed to be perfectly secure.",
    ],
  },
  {
    title: "Your choices",
    body: [
      "You may contact us to request access, correction, or deletion of information you have sent us, subject to applicable legal and operational constraints.",
      "Questions about this policy can be sent to info@asymmetric.al.",
    ],
  },
] as const;

export const metadata: Metadata = createMetadata({
  title: "Privacy Policy",
  description:
    "Privacy policy for the Asymmetric.al website and inquiry flows.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Privacy Policy"
        title={
          <h1 className="text-balance font-heading text-[clamp(2.8rem,5vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.07em] text-foreground">
            Privacy and stewardship of information.
          </h1>
        }
        description="We aim to be clear, proportionate, and respectful in how we handle information. This page applies to the public website and communications initiated from it."
      />

      <Section>
        <Reveal>
          <Card className="surface-panel rounded-[2rem]">
            <CardHeader>
              <CardTitle className="font-heading text-3xl font-semibold tracking-[-0.05em]">
                Effective as of March 17, 2026
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-8">
              {sections.map((section) => (
                <div key={section.title} className="flex flex-col gap-3">
                  <h2 className="font-heading text-2xl font-semibold tracking-[-0.04em] text-foreground">
                    {section.title}
                  </h2>
                  {section.body.map((paragraph) => (
                    <p key={paragraph} className="content-measure text-base leading-7 text-muted-foreground">
                      {paragraph}
                    </p>
                  ))}
                </div>
              ))}
              <p className="text-base leading-7 text-muted-foreground">
                Questions or requests can be sent to{" "}
                <Link
                  href="mailto:info@asymmetric.al"
                  className="font-medium text-foreground underline underline-offset-4"
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
