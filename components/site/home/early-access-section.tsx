import Link from "next/link";
import { Container } from "@/components/site/container";
import { GitHubMark } from "@/components/site/github-mark";
import { Eyebrow, SectionTitle } from "@/components/site/home/section-heading";
import { ArrowUpRightIcon } from "@/components/site/icons";
import { buttonVariants } from "@/components/ui/button-variants";
import { siteConfig } from "@/lib/config";
import {
  getVerifiedContactEmail,
  isEarlyAccessConfigured,
} from "@/lib/early-access-config";
import { cn } from "@/lib/utils";

const pilotChecklist = [
  "Missions organizations ready to run donor portals, tax statements, and missionary rosters from one record.",
  "Small staffs looking for hosted software without maintaining their own servers.",
  "Teams willing to share candid feedback while we finish testing onboarding and billing.",
] as const;

const loadEarlyAccessForm = () =>
  import("@/components/site/home/early-access-form");

export const EarlyAccessSection = async () => {
  const isConfigured = isEarlyAccessConfigured();
  const contactEmail = getVerifiedContactEmail();

  let configuredForm = null;
  if (isConfigured) {
    const { EarlyAccessConfigured } = await loadEarlyAccessForm();
    configuredForm = <EarlyAccessConfigured contactEmail={contactEmail} />;
  }

  return (
    <section
      id="early-access"
      aria-labelledby="early-access-title"
      className="pb-[clamp(3.25rem,5.5vw,5rem)]"
    >
      <Container>
        <div className="border-rule-strong bg-card relative border p-6 sm:p-10 lg:p-12">
          {/* Inset accent rule: vermilion only when live intake is open */}
          <div
            aria-hidden="true"
            className={cn(
              "mb-6 h-[2.5px] w-16",
              isConfigured ? "bg-vermilion" : "bg-pine"
            )}
          />

          {configuredForm ?? (
            <div className="grid gap-8 lg:grid-cols-[minmax(0,44fr)_minmax(0,56fr)] lg:items-start lg:gap-12">
              <div className="min-w-0">
                <Eyebrow>Early access</Eyebrow>
                <SectionTitle id="early-access-title">
                  Early access isn’t open yet.
                </SectionTitle>
                <p className="text-muted-foreground mt-4 max-w-[32rem] text-base leading-7 text-pretty sm:text-[1.0625rem] sm:leading-8">
                  We’re finishing end&#8209;to&#8209;end testing across donor
                  portals, missionary rosters, and office tools before opening
                  hosted onboarding. Until intake opens, our public develop
                  branch is the live changelog.
                </p>
              </div>
              <div className="border-rule min-w-0 border-t pt-6 lg:border-t-0 lg:border-l lg:pt-1 lg:pl-10">
                <h3 className="font-heading text-foreground text-2xl font-medium tracking-[-0.02em]">
                  Who early access is for
                </h3>
                <ul className="text-muted-foreground mt-3 space-y-2 text-sm leading-6">
                  {pilotChecklist.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span
                        aria-hidden="true"
                        className="bg-pine mt-2 size-1.5 shrink-0 rounded-full"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <a
                    href={siteConfig.commitsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      buttonVariants({ variant: "ink", size: "lg" }),
                      "px-6"
                    )}
                  >
                    <GitHubMark className="size-4" />
                    Follow commits on develop
                    <span className="sr-only"> (opens in a new tab)</span>
                    <ArrowUpRightIcon dataIcon="inline-end" />
                  </a>
                  <a
                    href={`${siteConfig.repoUrl}#readme`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      buttonVariants({ variant: "outline", size: "lg" }),
                      "px-6"
                    )}
                  >
                    Read Core README
                    <span className="sr-only"> (opens in a new tab)</span>
                    <ArrowUpRightIcon dataIcon="inline-end" />
                  </a>
                </div>
                <p className="text-muted-foreground mt-5 text-sm leading-6">
                  Checking back later? Bookmark the{" "}
                  <Link
                    href="/early-access/status?state=unavailable"
                    prefetch={false}
                    className="text-foreground focus-visible:ring-ring focus-visible:ring-offset-card rounded-xs font-medium underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent [@media(hover:hover)_and_(pointer:fine)]:hover:text-pine"
                  >
                    early access status page
                  </Link>
                  {contactEmail ? (
                    <>
                      {" "}
                      or email{" "}
                      <a
                        href={`mailto:${contactEmail}?subject=asym%20early%20access`}
                        className="text-foreground focus-visible:ring-ring focus-visible:ring-offset-card link-resilient rounded-xs underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent [@media(hover:hover)_and_(pointer:fine)]:hover:text-pine"
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
