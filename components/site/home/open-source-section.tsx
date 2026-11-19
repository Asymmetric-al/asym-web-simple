import { ArrowUpRight, Check, CircleDashed } from "lucide-react";
import { Container } from "@/components/site/container";
import { GitHubMark } from "@/components/site/github-mark";
import {
  Eyebrow,
  SectionTitle,
  StatusPill,
} from "@/components/site/home/section-heading";
import { repoStats, siteConfig } from "@/lib/config";

/**
Checked against Asymmetric-al/core on develop. "In the public code" means
the code exists there; maturity still varies by module (see Core's README).
*/
const buildStatus = [
  {
    label: "In the public code",
    icon: Check,
    iconClassName: "bg-accent text-accent-foreground",
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
    icon: CircleDashed,
    iconClassName: "bg-secondary text-primary",
    items: ["AI that prepares campaign work", "Approval rules for AI actions"],
  },
] as const;

const stats = [
  { value: repoStats.commits, label: "commits" },
  { value: repoStats.mergedPullRequests, label: "merged pull requests" },
  { value: repoStats.license, label: "license" },
] as const;

export const OpenSourceSection = () => (
  <section
    id="open-source"
    aria-labelledby="open-source-title"
    className="py-[clamp(3.25rem,6vw,5.25rem)]"
  >
    <Container className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14">
      <div className="flex flex-col">
        <Eyebrow>Open source</Eyebrow>
        <SectionTitle id="open-source-title">
          Open source, with a team to run it for you.
        </SectionTitle>
        <div className="text-muted-foreground mt-6 max-w-[42rem] space-y-5 text-base leading-7 sm:text-lg sm:leading-8">
          <p>
            The code is public under the AGPL. You can read it, follow
            development, and see how <span translate="no">asym</span> is being
            built.
          </p>
          <p>
            We’ll offer a paid managed subscription for hosting, AI workflows,
            updates, and product support, so your team doesn’t have to run any
            of it.
          </p>
        </div>
        <a
          href={siteConfig.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:text-foreground focus-visible:ring-ring focus-visible:ring-offset-background mt-4 inline-flex min-h-11 w-fit items-center gap-1.5 rounded-sm font-medium underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent sm:min-h-10"
        >
          Explore the code on GitHub
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </a>

        <div className="border-foreground/18 bg-card/70 mt-8 rounded-[1.5rem] border border-dashed p-5 sm:p-6">
          <StatusPill>Planned</StatusPill>
          <h3 className="font-heading text-foreground mt-4 text-xl font-semibold tracking-[-0.015em]">
            Managed donor care
          </h3>
          <p className="text-muted-foreground mt-2 text-sm leading-6 sm:text-base sm:leading-7">
            A separate service will combine AI with our team to handle supported
            donor requests, such as receipts and recurring-gift changes, with
            escalation to the person your organization chooses.
          </p>
        </div>
      </div>

      <div className="surface-panel min-w-0 rounded-[2rem] p-5 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <a
            href={siteConfig.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:text-primary focus-visible:ring-ring focus-visible:ring-offset-background inline-flex min-h-11 min-w-0 items-center gap-2.5 rounded-sm font-mono text-sm font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent sm:min-h-10"
          >
            <GitHubMark className="size-5 shrink-0" />
            <span className="truncate" translate="no">
              Asymmetric-al/core
            </span>
          </a>
          <span className="border-foreground/14 text-muted-foreground rounded-full border px-2.5 py-0.5 text-xs">
            Public
          </span>
        </div>
        <p className="text-muted-foreground mt-3 text-sm leading-6">
          An open-source platform for nonprofits, bringing CRM, fundraising,
          websites, and team operations into one connected system.
        </p>

        <dl className="border-foreground/12 mt-5 grid grid-cols-3 gap-3 border-y py-5">
          {stats.map((stat) => (
            <div key={stat.label} className="flex min-w-0 flex-col">
              <dt className="text-muted-foreground text-xs leading-5">
                {stat.label}
              </dt>
              <dd className="font-heading text-foreground order-first text-lg font-semibold tracking-[-0.025em] tabular-nums sm:text-2xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
        <p className="text-muted-foreground mt-3 text-xs">
          Since {repoStats.since}, as of {repoStats.asOf}.
        </p>

        <h3 className="text-foreground mt-7 font-sans text-sm font-medium tracking-normal">
          Where things stand
        </h3>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          {buildStatus.map((group) => {
            const Icon = group.icon;

            return (
              <div key={group.label}>
                <p className="text-muted-foreground font-mono text-xs tracking-[0.14em] uppercase">
                  {group.label}
                </p>
                <ul className="mt-3 space-y-2.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="text-foreground flex items-start gap-2.5 text-sm leading-5"
                    >
                      <span
                        className={`mt-px flex size-[1.125rem] shrink-0 items-center justify-center rounded-full ${group.iconClassName}`}
                        aria-hidden="true"
                      >
                        <Icon className="size-3" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </Container>
  </section>
);
