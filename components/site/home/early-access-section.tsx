import Link from "next/link";
import { Container } from "@/components/site/container";
import { GitHubMark } from "@/components/site/github-mark";
import { EarlyAccessConfiguredLoader } from "@/components/site/home/early-access-configured-loader";
import { Eyebrow, SectionTitle } from "@/components/site/home/section-heading";
import { ArrowRightIcon, ArrowUpRightIcon } from "@/components/site/icons";
import { buttonVariants } from "@/components/ui/button-variants";
import { siteConfig } from "@/lib/config";
import {
  getVerifiedContactEmail,
  isEarlyAccessConfigured,
} from "@/lib/early-access-config";
import { cn } from "@/lib/utils";

const pilotChecklist = [
  "Nonprofit organizations of any size ready to run donor portals, annual giving statements, and supporter records from one shared foundation.",
  "Teams looking for hosted software and future AI assistance without maintaining their own servers.",
  "Organizations willing to share candid feedback while we finish testing onboarding and billing.",
] as const;

export const EarlyAccessSection = () => {
  const isConfigured = isEarlyAccessConfigured();
  const contactEmail = getVerifiedContactEmail();

  return (
    <section
      id="early-access"
      aria-labelledby="early-access-title"
      className="pb-16 sm:pb-20 lg:pb-24"
    >
      <Container>
        <div className="border-rule-strong bg-card relative rounded-2xl border p-6 shadow-[var(--shadow-card)] sm:p-10 lg:p-12">
          {/* Inset accent bar: Ember only when live intake is open */}
          <div
            aria-hidden="true"
            className={cn(
              "mb-6 h-[3px] w-14 rounded-full",
              isConfigured ? "bg-human" : "bg-signal"
            )}
          />

          {isConfigured ? (
            <EarlyAccessConfiguredLoader contactEmail={contactEmail} />
          ) : (
            <div className="grid gap-8 lg:grid-cols-[minmax(0,44fr)_minmax(0,56fr)] lg:items-start lg:gap-12">
              <div className="min-w-0">
                <Eyebrow>Current status</Eyebrow>
                <SectionTitle id="early-access-title">
                  Early access isn’t open yet.
                </SectionTitle>
                <p className="text-muted-foreground mt-4 max-w-[32rem] text-base leading-7 text-pretty sm:text-[1.0625rem] sm:leading-8">
                  We’re finishing end&#8209;to&#8209;end testing across donor
                  portals, field rosters, and office tools before opening hosted
                  onboarding. Follow the repository or review what has to be
                  ready before sign&#8209;ups open.
                </p>
              </div>
              <div className="border-rule min-w-0 border-t pt-6 lg:border-t-0 lg:border-l lg:pt-1 lg:pl-10">
                <h3 className="font-heading text-foreground text-2xl font-semibold tracking-[-0.025em]">
                  Who early access is for
                </h3>
                <ul className="text-muted-foreground mt-3 space-y-2 text-sm leading-6">
                  {pilotChecklist.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span
                        aria-hidden="true"
                        className="bg-signal mt-2 size-1.5 shrink-0 rounded-full"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link
                    href="/early-access/status?state=unavailable"
                    prefetch={false}
                    className={cn(
                      buttonVariants({ variant: "ink", size: "lg" }),
                      "px-6"
                    )}
                  >
                    Pre-launch checklist
                    <ArrowRightIcon dataIcon="inline-end" />
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
                <p className="text-muted-foreground mt-5 text-sm leading-6">
                  Want to reach the builders before hosted intake opens? Open a{" "}
                  <a
                    href={siteConfig.issuesUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground focus-visible:ring-ring focus-visible:ring-offset-card link-resilient rounded-xs font-medium underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent [@media(hover:hover)_and_(pointer:fine)]:hover:text-signal"
                  >
                    public note on GitHub
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>{" "}
                  (please don’t share private donor data), subscribe to the{" "}
                  <a
                    href={`${siteConfig.commitsUrl}.atom`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground focus-visible:ring-ring focus-visible:ring-offset-card link-resilient inline-flex items-center gap-0.5 rounded-xs underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent [@media(hover:hover)_and_(pointer:fine)]:hover:text-signal"
                  >
                    development feed (Atom)
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                  {contactEmail ? (
                    <>
                      , or email{" "}
                      <a
                        href={`mailto:${contactEmail}?subject=asym%20early%20access`}
                        className="text-foreground focus-visible:ring-ring focus-visible:ring-offset-card link-resilient rounded-xs underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent [@media(hover:hover)_and_(pointer:fine)]:hover:text-signal"
                      >
                        {contactEmail}
                      </a>
                    </>
                  ) : null}
                  .
                </p>
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};
