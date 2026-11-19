import { ArrowLeft, ArrowUpRight, CircleAlert, CircleCheck } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/site/container";
import { buttonVariants } from "@/components/ui/button-variants";
import { siteConfig } from "@/lib/config";
import { earlyAccessCopy, formatRetryWait } from "@/lib/early-access";
import { getVerifiedContactEmail } from "@/lib/early-access-config";
import { createMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = createMetadata({
  title: "Early access status",
  description: "Status of your early access submission on asym.app.",
  path: "/early-access/status",
  noIndex: true,
});

interface StatusContent {
  readonly isSuccess: boolean;
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly primaryLabel: string;
  readonly primaryHref: string;
}

const EARLY_ACCESS_HREF = "/#early-access";
const START_NEW_REQUEST_LABEL = "Start a new request";

const buildStatusContent = (
  state: string | undefined,
  retrySeconds: number | undefined
): StatusContent => {
  if (state === "received") {
    return {
      isSuccess: true,
      eyebrow: "Early access",
      title: "Request received",
      description: earlyAccessCopy.success,
      primaryLabel: "Back to homepage",
      primaryHref: "/",
    };
  }

  if (state === "invalid") {
    return {
      isSuccess: false,
      eyebrow: "Check your details",
      title: "Your request needs a valid email and organization.",
      description:
        "Use your browser’s Back button to keep and edit what you entered, or start a new request with a valid email address and organization name.",
      primaryLabel: START_NEW_REQUEST_LABEL,
      primaryHref: EARLY_ACCESS_HREF,
    };
  }

  if (state === "rate_limited") {
    return {
      isSuccess: false,
      eyebrow: "Please wait",
      title: "Please wait before trying again.",
      description: `${formatRetryWait(retrySeconds)} Use your browser’s Back button to keep what you entered.`,
      primaryLabel: START_NEW_REQUEST_LABEL,
      primaryHref: EARLY_ACCESS_HREF,
    };
  }

  if (state === "unavailable") {
    return {
      isSuccess: false,
      eyebrow: "Opening soon",
      title: earlyAccessCopy.notConfigured,
      description:
        "Follow commits and development progress on GitHub while we prepare for early access.",
      primaryLabel: "Back to homepage",
      primaryHref: "/",
    };
  }

  return {
    isSuccess: false,
    eyebrow: "Submission error",
    title: earlyAccessCopy.failure,
    description:
      "Use your browser’s Back button to keep what you entered and try again, or start a new request.",
    primaryLabel: START_NEW_REQUEST_LABEL,
    primaryHref: EARLY_ACCESS_HREF,
  };
};

export default async function EarlyAccessStatusPage({
  searchParams,
}: {
  readonly searchParams: Promise<{ state?: string; retry?: string }>;
}) {
  const params = await searchParams;
  const parsedRetry = params.retry ? Number(params.retry) : NaN;
  const retrySeconds =
    Number.isFinite(parsedRetry) && parsedRetry > 0 ? parsedRetry : undefined;
  const content = buildStatusContent(params.state, retrySeconds);
  const contactEmail = getVerifiedContactEmail();

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="flex flex-1 items-center pt-32 pb-20 outline-none sm:pt-36"
    >
      <Container className="max-w-2xl">
        <div className="surface-panel rounded-[2rem] p-6 sm:p-9">
          {content.isSuccess ? (
            <CircleCheck className="text-primary size-7" aria-hidden="true" />
          ) : (
            <CircleAlert
              className="text-destructive size-7"
              aria-hidden="true"
            />
          )}
          <p className="text-primary/80 mt-5 font-mono text-xs tracking-[0.22em] uppercase">
            {content.eyebrow}
          </p>
          <h1 className="font-heading text-foreground mt-3 text-[clamp(1.9rem,4vw,2.75rem)] leading-[1.06] font-semibold tracking-[-0.035em] text-balance">
            {content.title}
          </h1>
          <p
            role={content.isSuccess ? "status" : "alert"}
            className="text-muted-foreground mt-4 text-base leading-7 sm:text-lg sm:leading-8"
          >
            {content.description}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href={content.primaryHref}
              className={cn(buttonVariants({ size: "lg" }), "px-6")}
            >
              <ArrowLeft data-icon="inline-start" aria-hidden="true" />
              {content.primaryLabel}
            </Link>
            {content.isSuccess ? null : (
              <a
                href={siteConfig.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "px-6"
                )}
              >
                Follow on GitHub
                <ArrowUpRight data-icon="inline-end" aria-hidden="true" />
              </a>
            )}
          </div>
          {contactEmail && !content.isSuccess ? (
            <p className="text-muted-foreground mt-5 text-sm leading-6">
              For private questions, email{" "}
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
      </Container>
    </main>
  );
}
