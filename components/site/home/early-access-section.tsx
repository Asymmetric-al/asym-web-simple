import Link from "next/link";
import { Container } from "@/components/site/container";
import { GitHubMark } from "@/components/site/github-mark";
import { EarlyAccessConfigured } from "@/components/site/home/early-access-form";
import { Eyebrow, SectionTitle } from "@/components/site/home/section-heading";
import { ArrowUpRightIcon } from "@/components/site/icons";
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
      className="pb-[clamp(3.25rem,5.5vw,5rem)]"
    >
      <Container>
        <div className="surface-folio relative rounded-2xl p-6 sm:p-10 lg:p-12">
          {/* Corner-safe inset accent rule: vermilion only when live intake is open */}
          <div
            aria-hidden="true"
            className={cn(
              "mb-6 h-[2.5px] w-16 rounded-full",
              isConfigured ? "bg-vermilion" : "bg-pine"
            )}
          />

          {isConfigured ? (
            <EarlyAccessConfigured contactEmail={contactEmail} />
          ) : (
            <div className="grid gap-8 lg:grid-cols-[minmax(0,44fr)_minmax(0,56fr)] lg:items-start lg:gap-12">
              <div className="min-w-0">
                <Eyebrow>Early access</Eyebrow>
                <SectionTitle id="early-access-title">
                  Early access isn’t open yet.
                </SectionTitle>
                <p className="text-muted-foreground mt-4 max-w-[32rem] text-base leading-7 text-pretty sm:text-[1.0625rem] sm:leading-8">
                  We’re finishing the first campaign workflow for missions
                  organizations. When sign&#8209;ups open, you’ll be able to
                  request access for your team here.
                </p>
              </div>
              <div className="border-rule min-w-0 border-t pt-6 lg:border-t-0 lg:border-l lg:pt-1 lg:pl-10">
                <h3 className="font-heading text-foreground text-2xl font-medium tracking-[-0.02em]">
                  In the meantime
                </h3>
                <p className="text-muted-foreground mt-2.5 text-base leading-7 text-pretty">
                  Inspect the public code inventory above, try the sample gift
                  and approval draft, or follow progress in the repository
                  README.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link
                    href="/#where-things-stand"
                    prefetch={false}
                    className={cn(
                      buttonVariants({ variant: "ink", size: "lg" }),
                      "px-6"
                    )}
                  >
                    See what’s built
                  </Link>
                  <a
                    href={`${siteConfig.repoUrl}#readme`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      buttonVariants({ variant: "outline", size: "lg" }),
                      "px-6"
                    )}
                  >
                    <GitHubMark className="size-4" />
                    Follow progress on GitHub
                    <span className="sr-only"> (opens in a new tab)</span>
                    <ArrowUpRightIcon dataIcon="inline-end" />
                  </a>
                </div>
                {contactEmail ? (
                  <p className="text-muted-foreground mt-5 text-sm leading-6">
                    Or email{" "}
                    <a
                      href={`mailto:${contactEmail}?subject=asym%20early%20access`}
                      className="text-foreground hover:text-pine focus-visible:ring-ring focus-visible:ring-offset-card link-resilient rounded-xs underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent"
                    >
                      {contactEmail}
                    </a>
                    .
                  </p>
                ) : null}
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};
