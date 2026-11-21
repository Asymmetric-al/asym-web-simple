import { AboutSection } from "@/components/site/home/about-section";
import { EarlyAccessSection } from "@/components/site/home/early-access-section";
import { HomeHero } from "@/components/site/home/hero";
import { OpenSourceSection } from "@/components/site/home/open-source-section";
import { OutcomesSection } from "@/components/site/home/outcomes-section";
import { VisionSection } from "@/components/site/home/vision-section";
import { siteConfig } from "@/lib/config";
import { createMetadata, siteMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = createMetadata({
  description: siteMetadata.description,
  path: "/",
});

const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteConfig.url}#organization`,
      name: siteConfig.name,
      url: siteConfig.url,
      sameAs: [siteConfig.githubOrgUrl, siteConfig.repoUrl],
      description:
        "Independent, for-profit software company building asym, open-source giving and donor-care software for nonprofits.",
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${siteConfig.url}#software`,
      name: siteConfig.shortName,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: siteConfig.url,
      license: "https://spdx.org/licenses/AGPL-3.0-only.html",
      publisher: {
        "@id": `${siteConfig.url}#organization`,
      },
      isBasedOn: {
        "@id": `${siteConfig.url}#source`,
      },
      description: siteMetadata.description,
    },
    {
      "@type": "SoftwareSourceCode",
      "@id": `${siteConfig.url}#source`,
      name: "Asymmetric-al/core",
      codeRepository: siteConfig.repoUrl,
      license: "https://spdx.org/licenses/AGPL-3.0-only.html",
      programmingLanguage: "TypeScript",
      creator: {
        "@id": `${siteConfig.url}#organization`,
      },
    },
  ],
};

export default function HomePage() {
  return (
    <main
      id="main-content"
      className="relative isolate outline-none"
      tabIndex={-1}
    >
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger -- Static JSON-LD structured data for search engines.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <HomeHero />
      <VisionSection />
      <OutcomesSection />
      <OpenSourceSection />
      <AboutSection />
      <EarlyAccessSection />
    </main>
  );
}
