import { AboutSection } from "@/components/site/home/about-section";
import { ArchitectureSection } from "@/components/site/home/architecture-section";
import { ConnectedSection } from "@/components/site/home/connected-section";
import { EarlyAccessSection } from "@/components/site/home/early-access-section";
import { HomeHero } from "@/components/site/home/hero";
import { OpenSourceSection } from "@/components/site/home/open-source-section";
import { ProductSection } from "@/components/site/home/product-section";
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
        "Independent, for-profit software company building asym for nonprofits, starting with missions organizations.",
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
      <ConnectedSection />
      <ArchitectureSection />
      <OpenSourceSection />
      <ProductSection />
      <AboutSection />
      <EarlyAccessSection />
    </main>
  );
}
