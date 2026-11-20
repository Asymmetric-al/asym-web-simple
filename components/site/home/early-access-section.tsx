import { ArrowUpRight } from "lucide-react";
import dynamic from "next/dynamic";
import { HalftoneFrame } from "@/components/react-bits/halftone-frame";
import { Container } from "@/components/site/container";
import { GitHubMark } from "@/components/site/github-mark";
import {
  Eyebrow,
  SectionTitle,
  StatusPill,
} from "@/components/site/home/section-heading";
import { buttonVariants } from "@/components/ui/button-variants";
import { siteConfig } from "@/lib/config";
import {
  getVerifiedContactEmail,
  isEarlyAccessConfigured,
} from "@/lib/early-access-config";
import { cn } from "@/lib/utils";

const EarlyAccessForm = dynamic(() =>
  import("@/components/site/home/early-access-form").then(
    (mod) => mod.EarlyAccessForm
  )
);

export const EarlyAccessSection = () => {
  const isConfigured = isEarlyAccessConfigured();
  const contactEmail = getVerifiedContactEmail();

  return (
    <section
      id="early-access"
      aria-labelledby="early-access-title"
      className="pt-[clamp(2rem,4vw,3rem)] pb-[clamp(2.5rem,5vw,4rem)]"
    >
      <Container>
        <div className="surface-hero relative overflow-hidden rounded-[2.25rem] p-5 sm:p-9 lg:p-12">
          <HalftoneFrame />
          <div className="relative z-10 grid gap-8 lg:grid-cols-[minmax(0,42fr)_minmax(0,58fr)] lg:gap-12">
            <div className="min-w-0">
              <Eyebrow>Early access</Eyebrow>
              <SectionTitle id="early-access-title">
                {isConfigured
                  ? "Request early access for your team."
                  : "See what we’re building."}
              </SectionTitle>
              <p className="text-muted-foreground mt-5 max-w-[34rem] text-base leading-7 sm:text-lg sm:leading-8">
                {isConfigured ? (
                  <>
                    Tell us which organization you’re with. If there’s a part of
                    fundraising or donor care you’d like help with, we’d like to
                    hear about it.
                  </>
                ) : (
                  <>
                    We’re building <span translate="no">asym</span> in the open
                    ahead of launch and inviting missions teams once
                    sign&#8209;ups open.
                  </>
                )}
              </p>
            </div>
            <div className="min-w-0">
              {isConfigured ? (
                <EarlyAccessForm contactEmail={contactEmail} />
              ) : (
                <div className="sm:border-foreground/12 sm:bg-card sm:rounded-[1.6rem] sm:border sm:p-8">
                  <StatusPill>Opening soon</StatusPill>
                  <h3 className="font-heading text-foreground mt-4 text-2xl font-semibold tracking-[-0.025em]">
                    Sign&#8209;ups aren’t open yet.
                  </h3>
                  <p className="text-muted-foreground mt-3 text-base leading-7">
                    You can read the code and follow development on GitHub.
                  </p>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <a
                      href={siteConfig.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(buttonVariants({ size: "lg" }), "px-6")}
                    >
                      <GitHubMark className="size-4" />
                      View the code on GitHub
                      <ArrowUpRight data-icon="inline-end" aria-hidden="true" />
                    </a>
                    <a
                      href={siteConfig.issuesUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        buttonVariants({ variant: "outline", size: "lg" }),
                        "px-6"
                      )}
                    >
                      Browse development issues
                      <ArrowUpRight data-icon="inline-end" aria-hidden="true" />
                    </a>
                  </div>
                  {contactEmail ? (
                    <p className="text-muted-foreground mt-5 text-sm leading-6">
                      Or email{" "}
                      <a
                        href={`mailto:${contactEmail}?subject=asym%20early%20access`}
                        className="text-foreground hover:text-primary focus-visible:ring-ring focus-visible:ring-offset-background link-resilient rounded-xs underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent"
                      >
                        {contactEmail}
                      </a>
                      .
                    </p>
                  ) : null}
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
