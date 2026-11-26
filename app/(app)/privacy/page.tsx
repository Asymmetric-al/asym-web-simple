import { DocumentPage, DocumentSection } from "@/components/site/document-page";
import { siteConfig } from "@/lib/config";
import { getVerifiedContactEmail } from "@/lib/early-access-config";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

// eslint-disable-next-line sonarjs/variable-name -- Next.js route segment config export name.
export const unstable_instant = {
  prefetch: "static",
};

export const metadata: Metadata = createMetadata({
  title: "Privacy policy",
  description:
    "How asym.app handles information from visitors and early access requests.",
  path: "/privacy",
});

const contactLinkClassName =
  "text-foreground focus-visible:ring-ring focus-visible:ring-offset-background link-resilient rounded-[0.375rem] font-medium underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent [@media(hover:hover)_and_(pointer:fine)]:hover:text-signal";

const PRIVACY_TOC = [
  { id: "sec-01", number: "01", label: "What this covers" },
  { id: "sec-02", number: "02", label: "What we collect" },
  { id: "sec-03", number: "03", label: "How we use it" },
  { id: "sec-04", number: "04", label: "What we do not do" },
  { id: "sec-05", number: "05", label: "When we share information" },
  { id: "sec-06", number: "06", label: "Retention and security" },
  { id: "sec-07", number: "07", label: "Your choices" },
] as const;

export default function PrivacyPage() {
  const contactEmail = getVerifiedContactEmail();

  return (
    <DocumentPage
      eyebrow="Updated November 20, 2026"
      toc={PRIVACY_TOC}
      title={
        <h1 className="font-heading text-foreground mt-5 text-[clamp(2.8rem,5.5vw,4.6rem)] leading-[0.98] font-medium tracking-[-0.03em] text-balance">
          Privacy policy
        </h1>
      }
      description="We collect only what we need to reply to you, share launch updates and early access invitations, run the website, and understand what missions agencies and nonprofit teams need from asym."
      footer={
        contactEmail ? (
          <>
            To ask about your information or request access, a correction, or
            deletion, email{" "}
            <a href={`mailto:${contactEmail}`} className={contactLinkClassName}>
              {contactEmail}
            </a>
            .
          </>
        ) : (
          <div className="space-y-2">
            <p>
              If you’ve already heard from us, you can reply to that email.
              Please don’t post personal or donor information on GitHub.
            </p>
            <p>
              A direct private email address for new privacy or deletion
              requests will be listed here before early access opens. You can
              follow public development in{" "}
              <a
                href={siteConfig.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={contactLinkClassName}
              >
                the Asymmetric-al/core repository on GitHub
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              .
            </p>
          </div>
        )
      }
    >
      <DocumentSection id="sec-01" number="01" title="What this covers">
        <p>
          This policy covers the asym website at asym.app, operated by
          Asymmetric.al, and the early access requests, emails, and
          conversations that start there.
        </p>
      </DocumentSection>

      <DocumentSection id="sec-02" number="02" title="What we collect">
        <p>
          When you request early access, we collect your email address, your
          organization’s name, and anything you choose to tell us about the work
          you’d like help with. If you email us directly, we receive what you
          send.
        </p>
        <p>
          We may also collect basic operational data such as server logs,
          request metadata, and security signals needed to keep the site
          reliable and safe.
        </p>
      </DocumentSection>

      <DocumentSection id="sec-03" number="03" title="How we use it">
        <p>
          We use early access details to reply to you, share launch updates and
          early access invitations, and understand what missions agencies and
          nonprofit teams need from asym. We use operational data to keep the
          website reliable and protect our systems.
        </p>
      </DocumentSection>

      <DocumentSection id="sec-04" number="04" title="What we do not do">
        <p>We do not sell personal information.</p>
      </DocumentSection>

      <DocumentSection id="sec-05" number="05" title="When we share information">
        <p>
          We share information with service providers that host the site and
          deliver email for us, such as Vercel and Resend, and with professional
          advisors when needed for legal compliance or security.
        </p>
      </DocumentSection>

      <DocumentSection id="sec-06" number="06" title="Retention and security">
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

      <DocumentSection id="sec-07" number="07" title="Your choices">
        <p>
          You can ask us to stop contacting you at any time by replying to one
          of our emails. You may also ask us to access, correct, or delete
          information you have sent us, subject to legal and operational limits.
        </p>
      </DocumentSection>
    </DocumentPage>
  );
}
