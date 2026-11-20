import dynamic from "next/dynamic";
import Link from "next/link";
import { Container } from "@/components/site/container";
import { GitHubMark } from "@/components/site/github-mark";
import { ArrowUpRightIcon } from "@/components/site/icons";
import { Eyebrow, SectionTitle } from "@/components/site/home/section-heading";
import { buttonVariants } from "@/components/ui/button-variants";
import { siteConfig } from "@/lib/config";
import {
  getVerifiedContactEmail,
  isEarlyAccessConfigured,
} from "@/lib/early-access-config";
import { cn } from "@/lib/utils";

const EarlyAccessConfigured = dynamic(() =>
  import("@/components/site/home/early-access-form").then(
    (mod) => mod.EarlyAccessConfigured
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
          {isConfigured ? (
            <EarlyAccessConfigured contactEmail={contactEmail} />
          ) : (
            <div className="relative z-10 grid gap-8 lg:grid-cols-[minmax(0,42fr)_minmax(0,58fr)] lg:items-start lg:gap-12">
              <div className="min-w-0">
                <Eyebrow>Early access</Eyebrow>
                <SectionTitle id="early-access-title">
                  Early access isn’t open yet.
                </SectionTitle>
                <p className="text-muted-foreground mt-5 max-w-[34rem] text-base leading-7 text-pretty sm:text-lg sm:leading-8">
                  We’re finishing the first campaign workflow for missions
                  organizations. When sign&#8209;ups open, you’ll be able to
                  request access for your team here.
                </p>
              </div>
              <div className="min-w-0">
                <div className="sm:border-rule sm:bg-card sm:rounded-[1.6rem] sm:border sm:p-8">
                  <h3 className="font-heading text-foreground text-2xl font-semibold tracking-[-0.025em]">
                    While sign&#8209;ups are closed
                  </h3>
                  <p className="text-muted-foreground mt-3 text-base leading-7 text-pretty">
                    You can check what is already built and what is in
                    development right on this page, or follow public progress in
                    the repository README on GitHub.
                  </p>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <Link
                      href="/#where-things-stand"
                      prefetch={false}
                      className={cn(buttonVariants({ size: "lg" }), "px-6")}
                    >
                      See what’s built
                    </Link>
                    <a
                      href={siteConfig.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        buttonVariants({ variant: "outline", size: "lg" }),
                        "px-6"
                      )}
                    >
                      <GitHubMark className="size-4" />
                      Follow progress on GitHub
                      <ArrowUpRightIcon dataIcon="inline-end" />
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
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};
