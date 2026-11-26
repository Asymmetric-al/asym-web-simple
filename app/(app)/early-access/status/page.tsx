import { cookies } from "next/headers";
import Link from "next/link";
import { Container } from "@/components/site/container";
import { StatusPill } from "@/components/site/home/section-heading";
import {
  ArrowLeftIcon,
  ArrowUpRightIcon,
  CircleAlertIcon,
  CircleCheckIcon,
} from "@/components/site/icons";
import { Frame, FramePanel } from "@/components/site/reui/frame";
import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@/components/site/reui/timeline";
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
import { isEarlyAccessConfirmationValid } from "@/lib/early-access-guard";
import { createMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";
import type { TimelineStepState } from "@/components/site/reui/timeline";
import type { Metadata } from "next";

// Blocking request-time render so no-JS form redirects always receive resolved status HTML without Suspense $RC swap scripts.
// eslint-disable-next-line unicorn/consistent-boolean-name -- Next.js route segment config export name.
export const instant = false;

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

const READINESS_MILESTONES: readonly {
  readonly date: string;
  readonly title: string;
  readonly detail: string;
  readonly state: TimelineStepState;
}[] = [
  {
    date: "In public code today",
    title: "Donor portal, missionary micro-CRMs & Mission Control",
    detail:
      "Donor portal for giving history, receipts, and annual statements (apps/donor), personal missionary micro-CRMs with automatic Anonymous partner privacy and hidden per-row totals (apps/missionary), plus Mission Control CRM, Web Studio, and batch previews (apps/admin).",
    state: "completed",
  },
  {
    date: "Building now",
    title: "Paper check batch saving & live public directories",
    detail:
      "Finish saving paper check and cash batches with verified bank-deposit accounting exports, and replace sample demo profiles on public missionary directory and giving pages with live organization data.",
    state: "active",
  },
  {
    date: "Before hosted intake opens",
    title: "Hosted Stripe verification, billing & private support inbox",
    detail:
      "Complete hosted organization Stripe verification, published flat-tier billing, guided parallel-close onboarding, and a private support inbox before opening cohort sign-ups.",
    state: "upcoming",
  },
];

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
        "Use your browser’s Back button, which may keep what you entered so you can edit it, or start a new request with a valid email address and organization name.",
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
      description: `${formatRetryWait(retrySeconds)} Your browser’s Back button may keep what you entered.`,
      primaryLabel: START_NEW_REQUEST_LABEL,
      primaryHref: EARLY_ACCESS_HREF,
      primaryIcon: "none",
    };
  }

  if (state === "unavailable") {
    return {
      tone: "neutral",
      eyebrow: "Sign\u{2011}ups closed",
      title: earlyAccessCopy.notConfigured,
      description:
        "Hosted onboarding stays closed until our pre-launch readiness checklist is complete. You can inspect the codebase or track current module maturity on GitHub.",
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
        "Use your browser’s Back button, which may keep what you entered so you can try again, or start a new request.",
      primaryLabel: START_NEW_REQUEST_LABEL,
      primaryHref: EARLY_ACCESS_HREF,
      primaryIcon: "none",
    };
  }

  if (isConfigured) {
    return {
      tone: "neutral",
      eyebrow: "",
      title: EARLY_ACCESS_STATUS_TITLE,
      description:
        "This page confirms a request right after you submit the early access form. If you haven’t sent one yet, you can submit your organization’s details on the homepage.",
      primaryLabel: "Request early access",
      primaryHref: EARLY_ACCESS_HREF,
      primaryIcon: "none",
    };
  }

  return {
    tone: "neutral",
    eyebrow: "",
    title: EARLY_ACCESS_STATUS_TITLE,
    description:
      "Early access isn’t open yet. While we finish testing, you can inspect the public code and follow progress on GitHub.",
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
  const isConfirmed = isEarlyAccessConfirmationValid(
    params.state,
    cookieStore.get(EARLY_ACCESS_CONFIRMED_COOKIE)?.value
  );
  const isConfigured = isEarlyAccessConfigured();
  const content = buildStatusContent({
    state: params.state,
    retrySeconds,
    isConfirmed,
    isConfigured,
  });
  const contactEmail = getVerifiedContactEmail();

  let statusIcon = content.eyebrow ? (
    <StatusPill>{content.eyebrow}</StatusPill>
  ) : null;
  if (content.tone === "success") {
    statusIcon = <CircleCheckIcon className="text-signal size-7" />;
  } else if (content.tone === "error") {
    statusIcon = <CircleAlertIcon className="text-destructive size-7" />;
  }

  let headingSpacing = "mt-0";
  if (statusIcon) {
    headingSpacing = content.tone === "neutral" ? "mt-5" : "mt-3";
  }

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="flex flex-1 items-center pt-32 pb-20 outline-none sm:pt-36"
    >
      <Container className="max-w-2xl">
        <Frame variant="default" spacing="lg">
          <FramePanel className="p-6 sm:p-9">
            <div
              aria-hidden="true"
              className="bg-signal mb-5 h-[3px] w-14 rounded-full"
            />
            {statusIcon}
            {content.tone === "neutral" ? null : (
              <p className="text-signal mt-5 font-mono text-xs font-medium tracking-[0.02em]">
                {content.eyebrow}
              </p>
            )}
            <h1
              className={cn(
                "font-heading text-foreground text-[clamp(2rem,4vw,2.9rem)] leading-[1.04] font-semibold tracking-[-0.03em] text-balance",
                headingSpacing
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
            {!isConfigured && content.tone === "neutral" ? (
              <div className="border-rule mt-6 border-t pt-6">
                <p className="text-signal font-mono text-xs font-medium">
                  Pre-launch readiness timeline
                </p>
                <Timeline
                  aria-label="Pre-launch readiness milestones"
                  className="mt-4"
                >
                  {READINESS_MILESTONES.map((milestone) => (
                    <TimelineItem
                      key={milestone.title}
                      state={milestone.state}
                    >
                      <TimelineSeparator />
                      <TimelineIndicator />
                      <TimelineDate>{milestone.date}</TimelineDate>
                      <TimelineTitle>{milestone.title}</TimelineTitle>
                      <TimelineContent>{milestone.detail}</TimelineContent>
                    </TimelineItem>
                  ))}
                </Timeline>
              </div>
            ) : null}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={content.primaryHref}
                className={cn(
                  buttonVariants({ variant: "ink", size: "lg" }),
                  "px-6"
                )}
              >
                {content.primaryIcon === "back" ? (
                  <ArrowLeftIcon dataIcon="inline-start" />
                ) : null}
                {content.primaryLabel}
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
                Follow progress on GitHub
                <span className="sr-only"> (opens in a new tab)</span>
                <ArrowUpRightIcon dataIcon="inline-end" />
              </a>
            </div>
            {content.tone === "success" ? null : (
              <p className="text-muted-foreground mt-5 text-sm leading-6">
                Follow public milestones in{" "}
                <a
                  href={`${siteConfig.repoUrl}#readme`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground focus-visible:ring-ring focus-visible:ring-offset-background link-resilient rounded-xs font-medium underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent [@media(hover:hover)_and_(pointer:fine)]:hover:text-signal"
                >
                  Core’s README
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>{" "}
                or subscribe to the{" "}
                <a
                  href={`${siteConfig.commitsUrl}.atom`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground focus-visible:ring-ring focus-visible:ring-offset-background link-resilient rounded-xs underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent [@media(hover:hover)_and_(pointer:fine)]:hover:text-signal"
                >
                  development feed (Atom)
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
                {contactEmail ? (
                  <>
                    , or email{" "}
                    <a
                      href={`mailto:${contactEmail}?subject=asym%20early%20access`}
                      className="text-foreground focus-visible:ring-ring focus-visible:ring-offset-background link-resilient rounded-xs underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent [@media(hover:hover)_and_(pointer:fine)]:hover:text-signal"
                    >
                      {contactEmail}
                    </a>
                  </>
                ) : (
                  ". A direct private inbox will be listed here before hosted pilots open; new GitHub issues are currently limited to collaborators"
                )}
                .
              </p>
            )}
          </FramePanel>
        </Frame>
      </Container>
    </main>
  );
}
