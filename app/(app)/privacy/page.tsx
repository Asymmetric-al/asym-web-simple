import Link from "next/link";
import { DocumentPage, DocumentSection } from "@/components/site/document-page";
import { siteConfig } from "@/lib/config";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = createMetadata({
  title: "Privacy Policy",
  description:
    "How asym.app handles information from visitors and early access requests.",
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
      description="We collect only what we need to reply to you, run the website, and understand what nonprofit teams need from asym. Last updated November 19, 2026."
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
          This policy covers the asym website at asym.app, operated by
          Asymmetric.al, and the early access requests, emails, and
          conversations that start there.
        </p>
      </DocumentSection>

      <DocumentSection number="02" title="What we collect">
        <p>
          When you request early access, we collect your email address, your
          organization’s name, and anything you choose to tell us about the work
          you’d like help with. If you email us, we receive what you send.
        </p>
        <p>
          We may also collect basic operational data such as server logs,
          request metadata, analytics, and security signals needed to keep the
          site reliable and safe.
        </p>
      </DocumentSection>

      <DocumentSection number="03" title="How we use it">
        <p>
          We use this information to reply to you, send launch updates and early
          access invitations, improve the website, protect our systems, and
          understand what nonprofit teams need from asym.
        </p>
      </DocumentSection>

      <DocumentSection number="04" title="What we do not do">
        <p>We do not sell personal information.</p>
      </DocumentSection>

      <DocumentSection number="05" title="When we share information">
        <p>
          We share information with service providers that host the site and
          deliver email for us, such as Vercel and Resend, and with professional
          advisors when needed for legal compliance or security.
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
          You can ask us to stop contacting you at any time by replying to one
          of our emails. You may also ask us to access, correct, or delete
          information you have sent us, subject to legal and operational limits.
        </p>
      </DocumentSection>
    </DocumentPage>
  );
}
