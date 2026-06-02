import { Container } from "@/components/site/page";
import { cta, heroTitle, letterBlocks } from "@/lib/content/home-letter";
import type { LetterBlock } from "@/lib/content/home-letter";
import { siteConfig } from "@/lib/config";
import { createMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";
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

function LetterFlowBlock({ block }: { block: LetterBlock }) {
  if (block.type === "heading") {
    return (
      <h2
        id={block.id ?? block.headingId}
        className="letter-turn emphasis-line scroll-mt-32"
      >
        {block.text}
      </h2>
    );
  }

  if (block.type === "stanza") {
    return (
      <div className="tight-stanza">
        {block.lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    );
  }

  if (block.type === "signature") {
    return (
      <div className="letter-signature">
        {block.lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    );
  }

  return <p className={cn(block.emphasis && "letter-strong")}>{block.text}</p>;
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

      <article className="letter-prose pb-10 sm:pb-14">
        <Container className="max-w-[76rem]">
          <div
            id="letter"
            className="text-foreground scroll-mt-32 pt-[clamp(7.4rem,9vw,9.5rem)]"
          >
            <h1 className="font-heading max-w-none text-[clamp(2.85rem,6.1vw,5.5rem)] leading-[0.92] font-bold tracking-[-0.075em] text-balance lg:whitespace-nowrap">
              {heroTitle}
            </h1>

            <div className="letter-flow mt-8 max-w-[64rem] sm:mt-9">
              {letterBlocks.map((block, index) => (
                <LetterFlowBlock key={`${block.type}-${index}`} block={block} />
              ))}

              <section
                id="talk"
                aria-labelledby="talk-title"
                className="letter-cta scroll-mt-32"
              >
                <h2 id="talk-title">{cta.title}</h2>
                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
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
          </div>
        </Container>
      </article>
    </main>
  );
}
