import { Container } from "@/components/site/container";
import { Eyebrow, SectionTitle } from "@/components/site/home/section-heading";
import { ArrowUpRightIcon } from "@/components/site/icons";
import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@/components/site/reui/timeline";
import { repoStats, siteConfig } from "@/lib/config";
import type { TimelineStepState } from "@/components/site/reui/timeline";

const buildArc: readonly {
  readonly date: string;
  readonly title: string;
  readonly detail: string;
  readonly state: TimelineStepState;
}[] = [
  {
    date: `${repoStats.since} · Public repo`,
    title: "Independent company, built in the open",
    detail: `Started Asymmetric-al/core under ${repoStats.license}, shaped by weekly giving and donor-care operations at Global Fellowship.`,
    state: "completed",
  },
  {
    date: "Core today · 3 workspaces",
    title: "Shared ground truth & automatic privacy",
    detail:
      "Donor portal, missionary micro-CRMs, and Mission Control all running from the same live giving records with automatic donor privacy.",
    state: "active",
  },
  {
    date: "Next · First hosted group",
    title: "Parallel-close onboarding & grounded AI",
    detail:
      "Paper check batch saving, live public directories, verified hosted Stripe onboarding, and human-approved care drafts.",
    state: "upcoming",
  },
];

export const AboutSection = () => (
  <section
    id="about"
    aria-labelledby="about-title"
    className="scroll-mt-24 pt-16 pb-16 sm:pt-20 sm:pb-20 lg:pt-24 lg:pb-24"
  >
    <Container>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,40fr)_minmax(0,60fr)] lg:items-start lg:gap-14">
        <div className="min-w-0">
          <Eyebrow>Company</Eyebrow>
          <SectionTitle id="about-title">
            Built from inside the work.
          </SectionTitle>
          <Timeline
            aria-label="Asymmetric.al public build timeline"
            className="border-rule mt-6 border-t pt-6"
          >
            {buildArc.map((milestone) => (
              <TimelineItem key={milestone.title} state={milestone.state}>
                <TimelineSeparator />
                <TimelineIndicator />
                <TimelineDate>{milestone.date}</TimelineDate>
                <TimelineTitle>{milestone.title}</TimelineTitle>
                <TimelineContent>{milestone.detail}</TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </div>

        <div className="border-rule-strong bg-card rounded-2xl border p-7 shadow-[var(--shadow-card)] sm:p-9">
          <p className="text-signal font-sans text-sm font-medium">
            From the founders
          </p>

          <div className="text-muted-foreground mt-4 flex flex-col gap-4 text-base leading-7 text-pretty sm:text-[1.0625rem] sm:leading-8">
            <p className="text-foreground">
              <a
                href={siteConfig.githubOrgUrl}
                target="_blank"
                rel="noopener noreferrer"
                translate="no"
                className="text-foreground focus-visible:ring-ring focus-visible:ring-offset-card rounded-xs font-medium underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent [@media(hover:hover)_and_(pointer:fine)]:hover:text-signal"
              >
                {siteConfig.name}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>{" "}
              is an independent, for-profit software company building{" "}
              <span translate="no" className="font-medium">
                {siteConfig.shortName}
              </span>{" "}
              in public. The name comes from asymmetric leverage: helping a
              small office serve a large mission with care, without adding extra
              overhead or vendor lock-in.
            </p>
            <p>
              We’re Conrad and Blake. Conrad co-leads Global Fellowship, a
              missions organization, so designated support, donor receipts,
              check batches, and field privacy are part of our real week. That
              firsthand experience is why we’re starting with Christian missions
              organizations. <span translate="no">{siteConfig.name}</span> is a
              separate company, and every organization’s records stay strictly
              isolated with written rules for any support access.
            </p>
          </div>

          <div className="border-rule mt-6 flex flex-wrap items-center justify-between gap-4 border-t pt-5">
            <div className="flex items-center gap-3.5">
              <div aria-hidden="true" className="flex items-center gap-1.5">
                <span className="border-rule-strong bg-record font-heading text-signal inline-flex size-10 items-center justify-center rounded-full border text-xs font-semibold tracking-[-0.02em] forced-colors:border-[CanvasText]">
                  {siteConfig.founders.conrad.initials}
                </span>
                <span className="border-human-border/45 bg-human-soft font-heading text-human inline-flex size-10 items-center justify-center rounded-full border text-xs font-semibold tracking-[-0.02em] forced-colors:border-[CanvasText]">
                  {siteConfig.founders.blake.initials}
                </span>
              </div>
              <div>
                <p className="text-foreground flex flex-wrap items-center gap-x-1.5 font-sans text-sm font-semibold leading-5">
                  <a
                    href={siteConfig.founders.conrad.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground focus-visible:ring-ring focus-visible:ring-offset-card -my-2 inline-flex min-h-11 items-center gap-0.5 rounded-xs underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent sm:my-0 sm:min-h-6 [@media(hover:hover)_and_(pointer:fine)]:hover:text-signal"
                  >
                    {siteConfig.founders.conrad.name}
                    <ArrowUpRightIcon className="size-3.5" />
                    <span className="sr-only">
                      {" "}
                      on GitHub (opens in a new tab)
                    </span>
                  </a>
                  <span
                    aria-hidden="true"
                    className="text-muted-foreground font-normal"
                  >
                    &amp;
                  </span>
                  <a
                    href={siteConfig.founders.blake.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground focus-visible:ring-ring focus-visible:ring-offset-card -my-2 inline-flex min-h-11 items-center gap-0.5 rounded-xs underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent sm:my-0 sm:min-h-6 [@media(hover:hover)_and_(pointer:fine)]:hover:text-signal"
                  >
                    {siteConfig.founders.blake.name}
                    <ArrowUpRightIcon className="size-3.5" />
                    <span className="sr-only">
                      {" "}
                      on GitHub (opens in a new tab)
                    </span>
                  </a>
                </p>
                <p className="text-muted-foreground text-xs leading-5">
                  Founders, <span translate="no">{siteConfig.name}</span>
                </p>
              </div>
            </div>

            <a
              href={siteConfig.githubOrgUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground focus-visible:ring-ring focus-visible:ring-offset-card inline-flex min-h-11 items-center gap-1 rounded-full font-sans text-sm font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent sm:min-h-8 [@media(hover:hover)_and_(pointer:fine)]:hover:text-signal"
            >
              <span className="underline underline-offset-4">
                <span translate="no">{siteConfig.name}</span> on GitHub
              </span>
              <ArrowUpRightIcon className="size-3.5" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>
      </div>
    </Container>
  </section>
);
