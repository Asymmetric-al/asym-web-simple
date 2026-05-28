import { Container } from "@/components/site/page";
import {
  cta,
  heroTitle,
  introParagraphs,
  letterSections,
} from "@/lib/content/home-letter";
import { siteConfig } from "@/lib/config";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import Image from "next/image";

const mailtoHref = `mailto:${siteConfig.email}?subject=Building%20with%20Asym`;

export const metadata: Metadata = createMetadata({
  title: "Asym is being built for missions organizations",
  description:
    "A letter from Conrad and Blake about the early build of Asym, a product for Christian missions organizations and the teams carrying donor care, finance, missionary support, and operations.",
  path: "/",
});

function StructuredData({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

function LandscapeBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    >
      <Image
        src="/BG.jpg"
        alt=""
        fill
        preload
        sizes="100vw"
        className="[transform:scale(1.035)] object-cover object-[54%_42%] brightness-[1.04] contrast-[1.06] saturate-[1.08] dark:opacity-[0.7] dark:brightness-[0.66] dark:contrast-[1.08]"
      />
      <div className="from-background/78 via-background/18 to-background/64 dark:from-background/88 dark:via-background/42 dark:to-background/82 absolute inset-0 bg-gradient-to-b" />
      <div className="from-background/94 via-background/52 to-background/4 dark:from-background/92 dark:via-background/66 dark:to-background/24 absolute inset-0 bg-gradient-to-r" />
      <div className="from-accent/16 to-primary/12 dark:from-accent/10 dark:to-primary/10 absolute inset-0 bg-gradient-to-tr via-transparent" />
      <div
        className="absolute inset-0 opacity-[0.2] mix-blend-overlay dark:opacity-[0.24] dark:mix-blend-soft-light"
        style={{
          backgroundImage:
            "linear-gradient(0deg, transparent 2px, transparent 4px, color-mix(in srgb, var(--foreground) 14%, transparent) 4px, color-mix(in srgb, var(--foreground) 14%, transparent) 5px), linear-gradient(90deg, transparent 2px, transparent 4px, color-mix(in srgb, var(--foreground) 14%, transparent) 4px, color-mix(in srgb, var(--foreground) 14%, transparent) 5px)",
          backgroundSize: "5px 5px",
        }}
      />
    </div>
  );
}

export default function HomePage() {
  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: siteConfig.url,
    email: siteConfig.email,
    description: siteConfig.description,
    areaServed: "Global",
    knowsAbout: [
      "missions software",
      "donor care",
      "missionary support",
      "nonprofit operations",
    ],
    parentOrganization: {
      "@type": "NGO",
      name: siteConfig.nonprofit,
    },
  };

  const softwareStructuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteConfig.shortName,
    applicationCategory: "Missions software",
    operatingSystem: "Web",
    description:
      "An early product for Christian missions organizations, built by the nonprofit ministry Asymmetric.al.",
    provider: {
      "@type": "NGO",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  return (
    <main
      id="main-content"
      className="relative isolate overflow-hidden"
      tabIndex={-1}
    >
      <StructuredData data={organizationStructuredData} />
      <StructuredData data={softwareStructuredData} />
      <LandscapeBackground />

      <article className="letter-prose pb-12 sm:pb-16">
        <Container className="max-w-[76rem]">
          <div
            id="letter"
            className="text-foreground scroll-mt-32 pt-[clamp(7.4rem,9vw,9.5rem)]"
          >
            <h1 className="font-heading max-w-none text-[clamp(2.85rem,6.1vw,5.5rem)] leading-[0.92] font-bold tracking-[-0.075em] text-balance lg:whitespace-nowrap">
              {heroTitle}
            </h1>

            <div className="letter-copy mt-9 max-w-[64rem] space-y-3.5 text-[1.03rem] leading-[1.68] font-normal sm:space-y-4 sm:text-[1.1rem] sm:leading-[1.72] lg:text-[1.18rem] lg:leading-[1.76]">
              {introParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="letter-copy max-w-[64rem] text-[1.03rem] leading-[1.68] font-normal sm:text-[1.1rem] sm:leading-[1.72] lg:text-[1.18rem] lg:leading-[1.76]">
              {letterSections.map((section) => (
                <section
                  key={section.headingId}
                  id={"id" in section ? section.id : undefined}
                  aria-labelledby={
                    section.title ? section.headingId : undefined
                  }
                  className="scroll-mt-32 space-y-3.5 pt-8 sm:space-y-4 sm:pt-9"
                >
                  {section.title ? (
                    <h2
                      id={section.headingId}
                      className="font-heading text-foreground text-[clamp(1.5rem,3vw,2.125rem)] leading-tight font-bold tracking-[-0.055em] text-balance"
                    >
                      {section.title}
                    </h2>
                  ) : null}
                  {section.paragraphs.map((paragraph, index) => (
                    <p key={`${section.title}-${index}`}>{paragraph}</p>
                  ))}
                </section>
              ))}
            </div>

            <section
              id="talk"
              aria-labelledby="talk-title"
              className="scroll-mt-32 pt-9 sm:pt-10"
            >
              <h2
                id="talk-title"
                className="font-heading text-foreground text-[clamp(1.5rem,3vw,2.125rem)] leading-tight font-bold tracking-[-0.055em] text-balance"
              >
                {cta.title}
              </h2>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-base leading-7">
                <a
                  href={mailtoHref}
                  className="text-primary hover:text-foreground focus-visible:ring-ring/45 rounded-sm font-medium underline underline-offset-4 transition-colors focus-visible:ring-[3px] focus-visible:outline-none"
                >
                  {cta.emailLabel}
                </a>
                <a
                  href={cta.contributeHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-foreground focus-visible:ring-ring/45 rounded-sm font-medium underline underline-offset-4 transition-colors focus-visible:ring-[3px] focus-visible:outline-none"
                >
                  {cta.contributeLabel}
                </a>
              </div>
            </section>
          </div>
        </Container>
      </article>
    </main>
  );
}
