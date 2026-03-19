import { DocumentPage, DocumentSection } from "@/components/site/document-page";
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
    <DocumentPage
      eyebrow="501(c)(3) Disclosure"
      title={
        <h1 className="font-heading text-foreground text-[clamp(2.8rem,5vw,4.5rem)] leading-[0.95] font-semibold tracking-[-0.07em] text-balance">
          Nonprofit covering and donation treatment.
        </h1>
      }
      description="Asymmetric.al is not a stand-alone tax entity. It operates under the legal and financial covering of Global Fellowship Inc."
      heading="Global Fellowship Inc. EIN 68-0214543"
      heroMeta={[
        "Nonprofit covering",
        "Board oversight",
        "Tax-deductible giving",
      ]}
      footer={
        <>
          Questions can be directed to{" "}
          <Link
            href="mailto:info@asymmetric.al"
            className="link-resilient text-foreground inline-block max-w-full font-medium underline underline-offset-4"
          >
            info@asymmetric.al
          </Link>
          .
        </>
      }
    >
      {disclosures.map((section, index) => (
        <DocumentSection
          key={section.title}
          title={section.title}
          tone={index === 0 ? "accent" : "default"}
        >
          <p>{section.body}</p>
        </DocumentSection>
      ))}
    </DocumentPage>
  );
}
