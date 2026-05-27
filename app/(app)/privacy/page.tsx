import { DocumentPage, DocumentSection } from "@/components/site/document-page";
import { siteConfig } from "@/lib/config";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = createMetadata({
  title: "Privacy Policy",
  description:
    "Simple privacy policy for the Asymmetric.al website and early Asym conversations.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <DocumentPage
      eyebrow="Privacy Policy"
      title={
        <h1 className="font-heading text-foreground mt-5 text-[clamp(3rem,6vw,5rem)] leading-[0.94] font-semibold tracking-[-0.07em] text-balance">
          Privacy Policy
        </h1>
      }
      description="We collect only what we need to respond, operate the website, protect the work, and understand whether Asym can serve a missions organization well."
      footer={
        <>
          Privacy questions can be sent to{" "}
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
      <DocumentSection number="01" title="What this covers">
        <p>
          This policy covers the Asymmetric.al website and direct conversations
          started through it. It also covers early Asym interest forms, emails,
          and related follow-up.
        </p>
      </DocumentSection>

      <DocumentSection number="02" title="What we collect">
        <p>
          We may collect information you choose to send us, such as your name,
          email address, organization, role, and message.
        </p>
        <p>
          We may also collect basic operational data such as server logs,
          request metadata, analytics, and security signals needed to keep the
          site reliable and safe.
        </p>
      </DocumentSection>

      <DocumentSection number="03" title="How we use it">
        <p>
          We use information to respond to you, evaluate fit, improve the
          website, protect our systems, and understand the needs of Christian
          missions organizations.
        </p>
      </DocumentSection>

      <DocumentSection number="04" title="What we do not do">
        <p>We do not sell personal information.</p>
      </DocumentSection>

      <DocumentSection number="05" title="When we share information">
        <p>
          We may share information with service providers who help host, secure,
          or operate the site, or with Global Fellowship Inc. and advisors when
          needed for governance, legal compliance, security, or stewardship.
        </p>
      </DocumentSection>

      <DocumentSection number="06" title="Retention and security">
        <p>
          We keep information only as long as reasonably necessary for the
          purpose it was provided, unless legal, operational, or governance
          needs require longer retention.
        </p>
        <p>
          We use practical safeguards, but no internet system can be guaranteed
          to be perfectly secure.
        </p>
      </DocumentSection>

      <DocumentSection number="07" title="Your choices">
        <p>
          You may ask us to access, correct, or delete information you have sent
          us, subject to legal and operational limits.
        </p>
      </DocumentSection>
    </DocumentPage>
  );
}
