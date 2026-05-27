import { DocumentPage, DocumentSection } from "@/components/site/document-page";
import { siteConfig } from "@/lib/config";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = createMetadata({
  title: "501(c)(3)",
  description:
    "Nonprofit covering and financial oversight information for Asymmetric.al and Asym.",
  path: "/501c3",
});

export default function NonprofitCoveringPage() {
  return (
    <DocumentPage
      eyebrow="501(c)(3)"
      title={
        <h1 className="font-heading text-foreground mt-5 text-[clamp(3rem,6vw,5rem)] leading-[0.94] font-semibold tracking-[-0.07em] text-balance">
          Nonprofit covering
        </h1>
      }
      description="Asymmetric.al operates under Global Fellowship Inc., a United States nonprofit recognized as tax-exempt under section 501(c)(3) of the Internal Revenue Code."
      footer={
        <>
          Questions can be sent to{" "}
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
      <DocumentSection number="01" title="Legal covering">
        <p>
          Asymmetric.al is a project under {siteConfig.nonprofit}. Asym is the
          product being built through that nonprofit ministry.
        </p>
      </DocumentSection>

      <DocumentSection number="02" title="EIN">
        <p>
          {siteConfig.nonprofit} EIN: {siteConfig.ein}.
        </p>
      </DocumentSection>

      <DocumentSection number="03" title="Contributions">
        <p>
          Contributions made for Asymmetric.al through {siteConfig.nonprofit}{" "}
          are intended to be tax-deductible to the fullest extent permitted by
          law. Donors should consult their own tax advisors about individual
          circumstances.
        </p>
      </DocumentSection>

      <DocumentSection number="04" title="Oversight">
        <p>
          Gifts are received under the legal and financial oversight of{" "}
          {siteConfig.nonprofit}. The governing board retains final discretion
          and control over the use of contributed funds in accordance with
          nonprofit law and the charitable mission of the organization.
        </p>
      </DocumentSection>

      <DocumentSection number="05" title="Receipts">
        <p>
          Donors should keep the official receipt issued by{" "}
          {siteConfig.nonprofit} for their records.
        </p>
      </DocumentSection>
    </DocumentPage>
  );
}
