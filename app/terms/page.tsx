import { PageHero, Section } from "@/components/site/page";
import { Reveal } from "@/components/site/reveal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import Link from "next/link";

const sections = [
  {
    title: "Acceptance of these terms",
    body: [
      "By accessing or using this website, you agree to these Terms of Service. If you do not agree, do not use the site.",
      "These terms govern the public website and its informational and contact functions. They do not by themselves create a software subscription agreement, implementation agreement, or donor relationship.",
    ],
  },
  {
    title: "Use of the website",
    body: [
      "You may use the site for lawful informational, contact, and communication purposes.",
      "You may not interfere with the site, attempt unauthorized access, abuse forms or communication channels, scrape the site in a harmful manner, or use the site in any way that could damage the service or its users.",
    ],
  },
  {
    title: "Intellectual property",
    body: [
      "Unless otherwise noted, the website content, visual design, brand elements, and original copy are owned by or licensed to Asymmetric.al and its covering organization.",
      "Open-source software components referenced by the project remain subject to their own licenses. Nothing in these terms overrides those upstream licenses.",
    ],
  },
  {
    title: "Third-party services and links",
    body: [
      "The site may reference or link to third-party tools, documentation, hosting providers, or payment and communication services. We are not responsible for the content, policies, or availability of those third-party services.",
    ],
  },
  {
    title: "Disclaimers",
    body: [
      "This website is provided on an as-is and as-available basis. We aim for accuracy and reliability, but we do not guarantee that the site will always be uninterrupted, error-free, or complete.",
      "Information on the site is for general informational purposes and should not be treated as legal, tax, accounting, or investment advice.",
    ],
  },
  {
    title: "Limitation of liability",
    body: [
      "To the fullest extent permitted by law, Asymmetric.al and Global Fellowship Inc. will not be liable for indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the site.",
    ],
  },
  {
    title: "Updates and contact",
    body: [
      "We may update these terms from time to time. Continued use of the site after changes are posted constitutes acceptance of the updated terms.",
      "Questions regarding these terms may be sent to info@asymmetric.al.",
    ],
  },
] as const;

export const metadata: Metadata = createMetadata({
  title: "Terms of Service",
  description: "Terms governing use of the Asymmetric.al public website.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Terms of Service"
        title={
          <h1 className="text-balance font-heading text-[clamp(2.8rem,5vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.07em] text-foreground">
            Terms for using this website.
          </h1>
        }
        description="These terms apply to the public website and its communication flows. Product, pilot, donor, and implementation relationships may require additional written agreements."
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
