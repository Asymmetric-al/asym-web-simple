import { ArrowLeft, ArrowUpRight, CircleAlert, CircleCheck } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import { Container } from "@/components/site/container";
import { StatusPill } from "@/components/site/home/section-heading";
import { buttonVariants } from "@/components/ui/button-variants";
import { siteConfig } from "@/lib/config";
import {
  EARLY_ACCESS_CONFIRMED_COOKIE,
  earlyAccessCopy,
  formatRetryWait,
  parseRetryAfterSeconds,
} from "@/lib/early-access";
import {
  getVerifiedContactEmail,
  isEarlyAccessConfigured,
} from "@/lib/early-access-config";
import { createMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

const EARLY_ACCESS_HREF = "/#early-access";
const EARLY_ACCESS_LABEL = "Early access";
const EARLY_ACCESS_STATUS_TITLE = "Early access status";
const BACK_TO_HOMEPAGE_LABEL = "Back to homepage";
const START_NEW_REQUEST_LABEL = "Start a new request";

export const metadata: Metadata = createMetadata({
  title: EARLY_ACCESS_STATUS_TITLE,
  description: "Status of your early access submission on asym.app.",
  path: "/early-access/status",
  noIndex: true,
});

interface StatusContent {
  readonly tone: "success" | "neutral" | "error";
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly primaryLabel: string;
  readonly primaryHref: string;
  readonly primaryIcon: "back" | "none";
}

const buildStatusContent = ({
  state,
  retrySeconds,
  isConfirmed,
  isConfigured,
}: {
  readonly state: string | undefined;
  readonly retrySeconds: number | undefined;
  readonly isConfirmed: boolean;
  readonly isConfigured: boolean;
}): StatusContent => {
  if (state === "received" && isConfirmed) {
    return {
      tone: "success",
      eyebrow: EARLY_ACCESS_LABEL,
      title: "Request received",
      description: earlyAccessCopy.success,
      primaryLabel: BACK_TO_HOMEPAGE_LABEL,
      primaryHref: "/",
      primaryIcon: "back",
    };
  }

  if (state === "invalid") {
    return {
      tone: "error",
      eyebrow: "Check your details",
      title: "Your request needs a valid email and organization.",
      description:
        "Use your browser’s Back button to keep and edit what you entered, or start a new request with a valid email address and organization name.",
      primaryLabel: START_NEW_REQUEST_LABEL,
      primaryHref: EARLY_ACCESS_HREF,
      primaryIcon: "none",
    };
  }

  if (state === "rate_limited") {
    return {
      tone: "error",
      eyebrow: "Please wait",
      title: "Please wait before trying again.",
      description: `${formatRetryWait(retrySeconds)} Use your browser’s Back button to keep what you entered.`,
      primaryLabel: START_NEW_REQUEST_LABEL,
      primaryHref: EARLY_ACCESS_HREF,
      primaryIcon: "none",
    };
  }

  if (state === "unavailable") {
    return {
      tone: "neutral",
      eyebrow: "Opening soon",
      title: earlyAccessCopy.notConfigured,
      description:
        "We’re not taking early access requests yet. You can read the code and follow the work on GitHub.",
      primaryLabel: BACK_TO_HOMEPAGE_LABEL,
      primaryHref: "/",
      primaryIcon: "back",
    };
  }

  if (state === "failed") {
    return {
      tone: "error",
      eyebrow: "Submission error",
      title: earlyAccessCopy.failure,
      description:
        "Use your browser’s Back button to keep what you entered and try again, or start a new request.",
      primaryLabel: START_NEW_REQUEST_LABEL,
      primaryHref: EARLY_ACCESS_HREF,
      primaryIcon: "none",
    };
  }

  if (isConfigured) {
    return {
      tone: "neutral",
      eyebrow: EARLY_ACCESS_LABEL,
      title: EARLY_ACCESS_STATUS_TITLE,
      description:
        "This page confirms a request right after you submit the early-access form. If you haven’t sent one yet, you can submit your organization’s details on the homepage.",
      primaryLabel: "Request early access",
      primaryHref: EARLY_ACCESS_HREF,
      primaryIcon: "none",
    };
  }

  return {
    tone: "neutral",
    eyebrow: EARLY_ACCESS_LABEL,
    title: EARLY_ACCESS_STATUS_TITLE,
    description:
      "We’re not taking early access requests yet. You can read the code and follow the work on GitHub.",
    primaryLabel: BACK_TO_HOMEPAGE_LABEL,
    primaryHref: "/",
    primaryIcon: "back",
  };
};

export default async function EarlyAccessStatusPage({
  searchParams,
}: {
  readonly searchParams: Promise<{ state?: string; retry?: string }>;
}) {
  const [params, cookieStore] = await Promise.all([searchParams, cookies()]);
  const retrySeconds = params.retry
    ? parseRetryAfterSeconds(params.retry)
    : undefined;
  const isConfirmed =
    cookieStore.get(EARLY_ACCESS_CONFIRMED_COOKIE)?.value === "1";
  const isConfigured = isEarlyAccessConfigured();
  const content = buildStatusContent({
    state: params.state,
    retrySeconds,
    isConfirmed,
    isConfigured,
  });
  const contactEmail = getVerifiedContactEmail();

  let statusIcon = <StatusPill>{content.eyebrow}</StatusPill>;
  if (content.tone === "success") {
    statusIcon = (
      <CircleCheck className="text-primary size-7" aria-hidden="true" />
    );
  } else if (content.tone === "error") {
    statusIcon = (
      <CircleAlert className="text-destructive size-7" aria-hidden="true" />
    );
  }

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="flex flex-1 items-center pt-32 pb-20 outline-none sm:pt-36"
    >
      <Container className="max-w-2xl">
        <div className="surface-panel rounded-[2rem] p-6 sm:p-9">
          {statusIcon}
          {content.tone === "neutral" ? null : (
            <p className="text-primary/82 dark:text-ring mt-5 font-mono text-[0.8125rem] font-medium tracking-[0.02em]">
              {content.eyebrow}
            </p>
          )}
          <h1
            className={cn(
              "font-heading text-foreground text-[clamp(1.9rem,4vw,2.75rem)] leading-[1.06] font-semibold tracking-[-0.035em] text-balance",
              content.tone === "neutral" ? "mt-5" : "mt-3"
            )}
          >
            {content.title}
          </h1>
          <p
            role={content.tone === "error" ? "alert" : "status"}
            className="text-muted-foreground mt-4 text-base leading-7 sm:text-lg sm:leading-8"
          >
            {content.description}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href={content.primaryHref}
              className={cn(buttonVariants({ size: "lg" }), "px-6")}
            >
              {content.primaryIcon === "back" ? (
                <ArrowLeft data-icon="inline-start" aria-hidden="true" />
              ) : null}
              {content.primaryLabel}
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
              Follow development on GitHub
              <ArrowUpRight data-icon="inline-end" aria-hidden="true" />
            </a>
          </div>
          {contactEmail && content.tone !== "success" ? (
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
