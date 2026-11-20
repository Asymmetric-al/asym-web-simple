import { DocumentPage, DocumentSection } from "@/components/site/document-page";
import { siteConfig } from "@/lib/config";
import { getVerifiedContactEmail } from "@/lib/early-access-config";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = createMetadata({
  title: "Terms of service",
  description:
    "Simple terms for asym.app and any early access to asym provided by Asymmetric.al.",
  path: "/terms",
});

const contactLinkClassName =
  "text-foreground hover:text-primary focus-visible:ring-ring focus-visible:ring-offset-background link-resilient inline-flex min-h-11 items-center rounded-[0.375rem] font-medium underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent sm:min-h-0";

export default function TermsPage() {
  const contactEmail = getVerifiedContactEmail();

  return (
    <DocumentPage
      eyebrow="Updated November 20, 2026"
      title={
        <h1 className="font-heading text-foreground mt-5 text-[clamp(2.8rem,5.5vw,4.6rem)] leading-[0.98] font-semibold tracking-[-0.04em] text-balance">
          Terms of service
        </h1>
      }
      description="These terms apply to asym.app, operated by Asymmetric.al, and any early access to asym that we provide directly."
      footer={
        contactEmail ? (
          <>
            Questions about these terms can be sent to{" "}
            <a href={`mailto:${contactEmail}`} className={contactLinkClassName}>
              {contactEmail}
            </a>
            .
          </>
        ) : (
          <div className="space-y-2">
            <p>
              Direct private email contact for legal or commercial questions
              will be listed here before early access opens.
            </p>
            <p>
              You can follow public development of the open-source codebase in{" "}
              <a
                href={siteConfig.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={contactLinkClassName}
              >
                the Asymmetric-al/core repository on GitHub
              </a>{" "}
              (never share private or donor information in public repositories).
            </p>
          </div>
        )
      }
    >
      <DocumentSection number="01" title="Acceptance">
        <p>
          By using asym.app or any early access to asym provided by
          Asymmetric.al, you agree to these terms. If you do not agree, do not
          use the website or the product.
        </p>
      </DocumentSection>

      <DocumentSection number="02" title="Prelaunch product">
        <p>
          asym is open source and currently in prelaunch development. Features,
          workflows, and hosted options may change, break, or be replaced as we
          build and learn from missions teams and other nonprofits.
        </p>
      </DocumentSection>

      <DocumentSection number="03" title="Accounts and early access">
        <p>
          If Asymmetric.al invites your organization into early access, keep
          account credentials secure and use the product only for the
          organization and purposes agreed upon.
        </p>
      </DocumentSection>

      <DocumentSection number="04" title="Acceptable use">
        <p>
          Do not use the website or product to break the law, harm others, abuse
          systems, interfere with service reliability, or attempt to access data
          that does not belong to you.
        </p>
      </DocumentSection>

      <DocumentSection number="05" title="Managed subscriptions and services">
        <p>
          Asymmetric.al is a for-profit software company. Any future paid
          managed software subscription or managed donor-care service will be
          governed by separate written terms and pricing agreed before billing
          begins.
        </p>
      </DocumentSection>

      <DocumentSection number="06" title="Open-source code and ownership">
        <p>
          The public source code in Asymmetric-al/core is licensed under the GNU
          AGPL-3.0-only license, which governs your use, modification, and
          distribution of that code.
        </p>
        <p>
          The asym.app website, brand assets, copy, and related materials are
          owned by Asymmetric.al or its licensors, except where an open-source
          license states otherwise.
        </p>
      </DocumentSection>

      <DocumentSection number="07" title="No warranties">
        <p>
          The website and any early access to asym are provided as is. We do not
          promise that every part will be uninterrupted, error-free, or fit for
          every use case.
        </p>
      </DocumentSection>

      <DocumentSection number="08" title="Changes">
        <p>
          We may update these terms as the website, product, and company
          develop. The latest version will live on this page with an updated
          date.
        </p>
      </DocumentSection>
    </DocumentPage>
  );
}
