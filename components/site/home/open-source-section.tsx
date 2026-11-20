import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/site/container";
import { GitHubMark } from "@/components/site/github-mark";
import {
  Eyebrow,
  SectionTitle,
  StatusPill,
} from "@/components/site/home/section-heading";
import { repoStats, siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

/**
Checked against Asymmetric-al/core on develop. "In the public code" means
the code exists there; maturity still varies by module (see Core's README).
*/
const buildStatus = [
  {
    label: "In the public code",
    dashed: false,
    items: [
      "Giving pages and checkout",
      "Gifts, funds, and receipts",
      "Donor records and a donor portal",
      "Email templates",
      "Staff actions that show their effects before they run",
    ],
  },
  {
    label: "In development",
    dashed: true,
    items: [
      "AI that prepares campaign work",
      "Approval rules for AI actions",
      "Publishing approved giving pages",
    ],
  },
] as const;

const stats = [
  { value: repoStats.commits, label: "commits", isLicense: false },
  {
    value: repoStats.mergedPullRequests,
    label: "merged pull requests",
    isLicense: false,
  },
  { value: repoStats.license, label: "license", isLicense: true },
] as const;

export const OpenSourceSection = () => (
  <section
    id="open-source"
    aria-labelledby="open-source-title"
    className="py-[clamp(3.25rem,6vw,5.25rem)]"
  >
    <Container className="grid gap-10 lg:grid-cols-[minmax(0,42fr)_minmax(0,58fr)] lg:items-start lg:gap-x-14 lg:gap-y-8">
      <div className="flex flex-col lg:col-start-1 lg:row-start-1">
        <Eyebrow>Open source</Eyebrow>
        <SectionTitle id="open-source-title">
          <span className="block">The code is public.</span>{" "}
          <span className="block">Hosting will be a paid subscription.</span>
        </SectionTitle>
        <div className="text-muted-foreground mt-6 max-w-[42rem] space-y-5 text-base leading-7 sm:text-lg sm:leading-8">
          <p>
            The code is public under{" "}
            <span className="text-foreground font-mono text-[0.92em]">
              {repoStats.license}
            </span>
            . You can read it, follow development, and see how{" "}
            <span translate="no">asym</span> is being built.
          </p>
          <p>
            We plan to include hosting, AI workflows, updates, and product
            support in a paid managed subscription, so your team doesn’t have to
            run any of it.
          </p>
        </div>
        <a
          href={siteConfig.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:text-foreground focus-visible:ring-ring focus-visible:ring-offset-background mt-4 inline-flex min-h-11 w-fit items-center gap-1.5 rounded-[0.375rem] font-medium underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent sm:min-h-10"
        >
          Explore the code on GitHub
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </a>
      </div>

      <div className="surface-panel flex min-w-0 flex-col overflow-hidden rounded-[2rem] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-start">
        <div className="p-5 pb-0 sm:p-7 sm:pb-0">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <a
              href={siteConfig.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary focus-visible:ring-ring focus-visible:ring-offset-background inline-flex min-h-11 min-w-0 items-center gap-2.5 rounded-[0.375rem] font-mono text-[0.9375rem] font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent sm:min-h-10"
            >
              <GitHubMark className="size-5 shrink-0" />
              <span className="truncate" translate="no">
                Asymmetric-al/core
              </span>
            </a>
            <span className="border-rule text-muted-foreground rounded-full border px-2.5 py-0.5 text-xs">
              Public
            </span>
          </div>
          <p className="text-muted-foreground mt-3 text-sm leading-6">
            An open-source platform for nonprofits, bringing CRM, fundraising,
            websites, and team operations into one connected system.
          </p>

          <dl className="border-rule mt-5 grid grid-cols-2 border-t sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)_minmax(0,1.4fr)]">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={cn(
                  "flex min-w-0 flex-col py-4 sm:py-5",
                  index === 0 && "border-rule border-r pr-4 sm:pr-5",
                  index === 1 && "pl-4 sm:border-rule sm:border-r sm:px-5",
                  index === 2 &&
                    "border-rule col-span-2 border-t pt-4 sm:col-span-1 sm:border-t-0 sm:pt-5 sm:pl-5"
                )}
              >
                <dt className="text-muted-foreground mt-2 text-xs leading-5">
                  {stat.label}
                </dt>
                <dd
                  className={cn(
                    "font-heading text-foreground order-first leading-none font-semibold tracking-[-0.03em] tabular-nums",
                    stat.isLicense
                      ? "text-lg whitespace-nowrap sm:pt-1 xl:text-[1.4rem]"
                      : "text-2xl sm:text-[1.875rem]"
                  )}
                >
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
          <p className="text-muted-foreground pb-6 text-xs">
            Since {repoStats.since}, as of {repoStats.asOf}.
          </p>
        </div>

        <div className="datum-lid bg-record flex-1 px-5 pt-7 pb-6 sm:px-7 sm:pt-[1.875rem] sm:pb-7">
          <h3 className="text-foreground font-sans text-[0.9375rem] font-semibold tracking-normal">
            Where things stand
          </h3>
          <div className="mt-4 grid gap-6 sm:grid-cols-2">
            {buildStatus.map((group) => (
              <div key={group.label}>
                <p className="text-muted-foreground flex items-center gap-2 text-[0.8125rem] font-medium">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "border-ink inline-block w-[1.125rem] border-t-[1.5px]",
                      group.dashed && "border-dashed"
                    )}
                  />
                  {group.label}
                </p>
                <ul className="mt-3 space-y-2.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className={cn(
                        "border-ink/55 text-foreground border-l-[1.5px] pl-3.5 text-sm leading-5",
                        group.dashed && "border-dashed"
                      )}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-foreground/18 bg-card/70 rounded-[1.5rem] border border-dashed p-5 sm:p-6 lg:col-start-1 lg:row-start-2">
        <StatusPill>Planned</StatusPill>
        <h3 className="font-heading text-foreground mt-4 text-xl font-semibold tracking-[-0.015em]">
          Managed donor care
        </h3>
        <p className="text-muted-foreground mt-2 text-sm leading-6 sm:text-base sm:leading-7">
          A separate service we’re planning will combine AI with our team for
          supported requests such as receipt copies and recurring-gift changes,
          with escalation to the person your organization chooses.
        </p>
      </div>
    </Container>
  </section>
);
