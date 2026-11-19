import { ArrowUpRight } from "lucide-react";
import { GitHubMark } from "@/components/site/github-mark";
import { EarlyAccessForm } from "@/components/site/home/early-access-form";
import {
  Eyebrow,
  SectionTitle,
  StatusPill,
} from "@/components/site/home/section-heading";
import { Container } from "@/components/site/page";
import { buttonVariants } from "@/components/ui/button-variants";
import { siteConfig } from "@/lib/config";
import {
  getVerifiedContactEmail,
  isEarlyAccessConfigured,
} from "@/lib/early-access-config";
import { cn } from "@/lib/utils";

export const EarlyAccessSection = () => {
  const isConfigured = isEarlyAccessConfigured();
  const contactEmail = getVerifiedContactEmail();

  return (
    <section
      id="early-access"
      aria-labelledby="early-access-title"
      className="scroll-mt-24 pt-[clamp(2rem,4vw,3rem)] pb-[clamp(3.5rem,6vw,5.5rem)]"
    >
      <Container>
        <div className="surface-hero page-shell-glow grid gap-8 rounded-[2.25rem] p-5 sm:p-9 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-12 lg:p-12">
          <div className="min-w-0">
            <Eyebrow>Early access</Eyebrow>
            <SectionTitle id="early-access-title">
              Help shape the first release.
            </SectionTitle>
            <p className="text-muted-foreground mt-5 max-w-[34rem] text-base leading-7 sm:text-lg sm:leading-8">
              {isConfigured ? (
                <>
                  Tell us about your organization and the work you’d like{" "}
                  <span translate="no">asym</span> to help with. We’ll share
                  launch updates and invite teams as early access opens.
                </>
              ) : (
                <>
                  We’re building <span translate="no">asym</span> in the open
                  ahead of launch and inviting missions teams as early access
                  opens.
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
                <h3 className="font-heading text-foreground mt-4 text-2xl font-semibold tracking-[-0.045em]">
                  Early-access sign-ups open before launch.
                </h3>
                <p className="text-muted-foreground mt-3 text-base leading-7">
                  Email intake isn’t active on this preview yet, so we don’t ask
                  for your details until delivery is connected. Follow progress
                  commit by commit or reach the team on GitHub in the meantime.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <a
                    href={siteConfig.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(buttonVariants({ size: "lg" }), "px-6")}
                  >
                    <GitHubMark className="size-4" />
                    Follow on GitHub
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
                    Ask a question on GitHub
                    <ArrowUpRight data-icon="inline-end" aria-hidden="true" />
                  </a>
                </div>
                {contactEmail ? (
                  <p className="text-muted-foreground mt-5 text-sm leading-6">
                    Or email{" "}
                    <a
                      href={`mailto:${contactEmail}?subject=asym%20early%20access`}
                      className="text-foreground hover:text-primary focus-visible:ring-ring link-resilient rounded-xs underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
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
      </Container>
    </section>
  );
};
