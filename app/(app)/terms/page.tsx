import { DocumentPage, DocumentSection } from "@/components/site/document-page";
import { siteConfig } from "@/lib/config";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = createMetadata({
  title: "Terms of Service",
  description:
    "Simple terms for the Asymmetric.al website and early Asym access.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <DocumentPage
      eyebrow="Terms of Service"
      title={
        <h1 className="font-heading text-foreground mt-5 text-[clamp(3rem,6vw,5rem)] leading-[0.94] font-semibold tracking-[-0.07em] text-balance">
          Terms of Service
        </h1>
      }
      description="These terms apply to the Asymmetric.al website and any early access to Asym that we provide directly."
      footer={
        <>
          Questions about these terms can be sent to{" "}
          <Link
            href={`mailto:${siteConfig.email}`}
            className="text-foreground hover:text-primary focus-visible:ring-ring/45 link-resilient rounded-sm font-medium underline underline-offset-4 transition-colors focus-visible:ring-[3px] focus-visible:outline-none"
          >
            {siteConfig.email}
          </Link>
          .
        </>
      }
    >
      <DocumentSection number="01" title="Acceptance">
        <p>
          By using this website or any early Asym access we provide, you agree
          to these terms. If you do not agree, do not use the site or the
          product.
        </p>
      </DocumentSection>

      <DocumentSection number="02" title="Early product">
        <p>
          Asym is early and unfinished. Some parts may change, break, be
          removed, or be replaced as we learn from the missions organizations
          waiting to use it.
        </p>
      </DocumentSection>

      <DocumentSection number="03" title="Accounts and access">
        <p>
          If we give you access to Asym, keep account credentials secure and use
          the product only for the organization or purpose we approved.
        </p>
      </DocumentSection>

      <DocumentSection number="04" title="Acceptable use">
        <p>
          Do not use the website or product to break the law, harm others, abuse
          systems, interfere with service reliability, or attempt to access data
          that does not belong to you.
        </p>
      </DocumentSection>

      <DocumentSection number="05" title="Payments and donations">
        <p>
          Any donations or payments made through Global Fellowship Inc. are
          handled under its nonprofit oversight and applicable payment processor
          terms.
        </p>
      </DocumentSection>

      <DocumentSection number="06" title="Ownership">
        <p>
          The Asymmetric.al website, Asym product, design, copy, and related
          work are owned by Global Fellowship Inc. or its licensors unless a
          separate open-source license says otherwise.
        </p>
      </DocumentSection>

      <DocumentSection number="07" title="No warranties">
        <p>
          The website and any early Asym access are provided as is. We do not
          promise that every part will be uninterrupted, error-free, or fit for
          every use case.
        </p>
      </DocumentSection>

      <DocumentSection number="08" title="Changes">
        <p>
          We may update these terms as the website, product, and ministry
          develop. The latest version will live on this page.
        </p>
      </DocumentSection>
    </DocumentPage>
  );
}
