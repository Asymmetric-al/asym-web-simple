import { AboutSection } from "@/components/site/home/about-section";
import { ConnectedSection } from "@/components/site/home/connected-section";
import { EarlyAccessSection } from "@/components/site/home/early-access-section";
import { HomeHero } from "@/components/site/home/hero";
import { OpenSourceSection } from "@/components/site/home/open-source-section";
import { ProductSection } from "@/components/site/home/product-section";
import { siteConfig } from "@/lib/config";
import { siteMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: siteMetadata.title },
  description: siteMetadata.description,
  alternates: { canonical: "/" },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      url: siteConfig.url,
      sameAs: [siteConfig.githubOrgUrl],
    },
    {
      "@type": "SoftwareApplication",
      name: siteConfig.shortName,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description: siteMetadata.socialDescription,
      license: "https://www.gnu.org/licenses/agpl-3.0.html",
      codeRepository: siteConfig.repoUrl,
      publisher: { "@id": `${siteConfig.url}/#organization` },
    },
  ],
};

export default function HomePage() {
  return (
    <main id="main-content" tabIndex={-1} className="relative outline-none">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger -- JSON-LD per the Next.js guide; `<` is escaped below.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c"),
        }}
      />
      <HomeHero />
      <ProductSection />
      <ConnectedSection />
      <AboutSection />
      <OpenSourceSection />
      <EarlyAccessSection />
    </main>
  );
}
