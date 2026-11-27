import Link from "next/link";
import { Container } from "@/components/site/container";
import { Faq11Slot } from "@/components/site/home/deferred-widget-slots";
import { Eyebrow, SectionTitle } from "@/components/site/home/section-heading";
import { ArrowRightIcon, ArrowUpRightIcon } from "@/components/site/icons";
import { repoStats, siteConfig } from "@/lib/config";
import type { ReactNode } from "react";

type FounderKey = "conrad" | "blake";

interface FaqEntry {
  readonly value: string;
  readonly question: string;
  readonly topic: string;
  readonly founder: FounderKey;
  readonly answer: readonly string[];
  readonly reference: {
    readonly label: string;
    readonly href: string;
    readonly external?: boolean;
  };
}

const FOUNDERS = {
  conrad: { ...siteConfig.founders.conrad, tone: "signal" as const },
  blake: { ...siteConfig.founders.blake, tone: "human" as const },
};

const FAQ_ENTRIES: readonly FaqEntry[] = [
  {
    value: "agpl-license",
    question: "Who owns our data, and what does open source mean for us?",
    topic: "Data & ownership",
    founder: "blake",
    answer: [
      "Your ministry owns every donor record, gift ledger, receipt, and web page completely. Open source applies only to the software code itself, never to your people’s private data or your ministry’s content, and running asym never puts any claim or restriction on your records.",
      "For your board, open source is long-term protection against lock-in. Your IT lead or an outside advisor can inspect the exact software behind your giving and privacy rules today, and your ministry always keeps the freedom to run it yourselves with no software license fees.",
    ],
    reference: {
      label: "Read LICENSE (AGPL-3.0-only)",
      href: `${siteConfig.repoUrl}/blob/develop/LICENSE`,
      external: true,
    },
  },
  {
    value: "stripe-custody",
    question: "What happens to our monthly donors’ cards if we leave?",
    topic: "Monthly giving & exit",
    founder: "conrad",
    answer: [
      "They stay with your ministry. Every organization connects its own Stripe account directly, so gifts go straight to you with 0% markup from Asymmetric.al and optional fee-cover for donors who want to help with processing costs. Card details go directly to Stripe, where they are tokenized and stored; asym only holds safe reference tokens, never raw card numbers.",
      "Because Stripe is portable and the account belongs to you, your ministry is never locked in. If you move to another tool that works with Stripe, your saved cards are already in your own account. If you ever switch payment processors altogether, Stripe supports secure, encrypted card transfers directly to another PCI-compliant processor so you can bring your supporters’ saved cards with you.",
    ],
    reference: {
      label: "Verify in tenant-client.ts",
      href: `${siteConfig.repoUrl}/blob/develop/packages/api/src/stripe/tenant-client.ts`,
      external: true,
    },
  },
  {
    value: "missionary-privacy",
    question: "What can missionaries see about the people who support them?",
    topic: "Missionaries & privacy",
    founder: "conrad",
    answer: [
      "Every missionary gets a personal workspace tied directly to live office records, already built in asym today. Instead of waiting on monthly spreadsheets from headquarters, workers can check their support progress anytime and keep thank-you notes and follow-ups for supporters who have chosen to share their contact details.",
      "Donor privacy is enforced automatically, never left to manual spreadsheet cleanup. Any supporter who has not opted in appears simply as Anonymous partner, with their name, contact details, and individual lifetime or last-gift totals kept hidden. Full household records and year-end tax statements stay with the donor and authorized office staff.",
    ],
    reference: {
      label: "Verify in donors.ts",
      href: `${siteConfig.repoUrl}/blob/develop/packages/api/src/missionary-portal/donors.ts`,
      external: true,
    },
  },
  {
    value: "checks-and-statements",
    question: "How do paper checks, church gifts, and tax statements work?",
    topic: "Checks & statements",
    founder: "conrad",
    answer: [
      "Missions offices still receive plenty of paper checks, cash envelopes, and single church checks split across several missionaries. In asym today, supporters can already log into the donor portal to view their giving history and download receipts and annual tax statements from completed gifts, while office staff can preview gift batches before posting them.",
      "We are actively finishing the workflow for recording paper checks, cash, and multi-missionary church checks in the same giving ledger before our first hosted group opens, with accounting deposit exports planned right after. The goal is one clean set of numbers at month-end and January statements generated straight from completed records.",
    ],
    reference: {
      label: "Verify in statements.ts",
      href: `${siteConfig.repoUrl}/blob/develop/packages/api/src/donor-portal/statements.ts`,
      external: true,
    },
  },
  {
    value: "website-and-field-safety",
    question: "Can we run our website and giving pages here safely?",
    topic: "Website & field safety",
    founder: "blake",
    answer: [
      "Yes. Instead of maintaining a separate website builder that drifts out of date, Mission Control already includes Web Studio today so your office can publish standard pages, missionary giving pages, project appeals, and updates connected to your live funds. Built-in visibility controls let your team keep missionaries serving in sensitive regions off public directories while still supporting them safely behind the scenes.",
      "We are actively finishing the public website side so supporters can browse live missionary and project directories and give to one or several missionaries and projects in a single checkout right on your own domain before our first hosted group opens.",
    ],
    reference: {
      label: "See how one system compares",
      href: "/evaluate#comparison",
    },
  },
  {
    value: "parallel-close",
    question: "How do we switch without putting year-end giving at risk?",
    topic: "Switching & finance",
    founder: "conrad",
    answer: [
      "You prove the numbers on a quiet test month before anything goes live. Our guided switching plan starts by bringing in one month your finance team has already closed, so your bookkeeper can check every gift total, missionary designation, receipt, and bank deposit to the penny without touching live giving or emailing a single donor.",
      "Nothing switches over until your finance lead is completely satisfied with the match. We schedule live transitions only from February through September, and never during the November through January year-end giving season.",
    ],
    reference: {
      label: "See the step-by-step switching plan",
      href: "/evaluate#migration",
    },
  },
  {
    value: "self-host-vs-hosted",
    question: "Do we have to run our own servers, or can you host it for us?",
    topic: "Hosting & support",
    founder: "blake",
    answer: [
      "You will not have to manage servers unless your team wants to. Both options run the exact same open-source software, with unlimited office staff, missionaries, and donors, and zero per-gift markup. If your organization has an IT team that prefers running its own servers, the software is public today with no license fees.",
      "For lean sending offices without an IT department, we are building managed hosting with flat, predictable tiers published before we open hosted sign-ups. It is designed to cover servers, backups, updates, guided onboarding, and optional extra hands for routine donor care, while keeping your freedom to move to your own servers anytime.",
    ],
    reference: {
      label: "Compare hosting options",
      href: "/evaluate#hosting",
    },
  },
  {
    value: "pricing-and-readiness",
    question: "Are there per-seat or gift fees, and what is ready today?",
    topic: "Pricing & readiness",
    founder: "blake",
    answer: [
      "There are no per-seat charges and no percentage fees from Asymmetric.al on charitable gifts. Whether you run asym yourselves with zero software license fees or choose our upcoming managed hosting on flat, published tiers, you can add unlimited office staff, missionaries, and donors, and only standard Stripe processing fees apply.",
      "Here is where things stand today. The core workspaces, donor receipts and statements, missionary privacy rules, Web Studio, and direct Stripe connections are public on GitHub to inspect now. We are actively finishing paper and split church check batches, live public giving directories, and mobilization workflows before we open hosted sign-ups.",
    ],
    reference: {
      label: "See the live build roadmap",
      href: "/#where-things-stand",
    },
  },
];

const StaticAnswerBody = ({ entry }: { readonly entry: FaqEntry }): ReactNode => {
  const founder = FOUNDERS[entry.founder];
  const badgeClass =
    founder.tone === "signal"
      ? "border-rule-strong bg-record text-signal"
      : "border-human-border/45 bg-human-soft text-human";

  return (
    <div className="flex flex-1 flex-col">
      <p className="text-signal font-mono text-xs font-medium">
        {entry.topic} · {repoStats.asOf}
      </p>
      <h3 className="font-heading text-foreground mt-2 text-xl leading-snug font-semibold tracking-[-0.02em] sm:text-2xl">
        {entry.question}
      </h3>
      <div className="text-muted-foreground mt-4 flex flex-col gap-3.5 text-sm leading-6 text-pretty sm:text-[0.9375rem] sm:leading-7">
        {entry.answer.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <div className="mt-auto">
        <div className="border-rule mt-6 flex flex-wrap items-center justify-between gap-4 border-t pt-5">
          <div className="flex min-w-0 items-center gap-3">
            <span
              aria-hidden="true"
              className={`font-heading inline-flex size-9 shrink-0 items-center justify-center rounded-full border text-xs font-semibold tracking-[-0.02em] forced-colors:border-[CanvasText] ${badgeClass}`}
            >
              {founder.initials}
            </span>
            <div className="min-w-0 text-xs leading-5">
              <p className="text-foreground font-sans font-semibold">
                <a
                  href={founder.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground focus-visible:ring-ring focus-visible:ring-offset-card -my-2 inline-flex min-h-11 items-center gap-0.5 rounded-xs underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent sm:my-0 sm:min-h-6 [@media(hover:hover)_and_(pointer:fine)]:hover:text-signal"
                >
                  {founder.name}
                  <ArrowUpRightIcon className="size-3" />
                  <span className="sr-only">
                    {" "}
                    on GitHub (opens in a new tab)
                  </span>
                </a>
              </p>
              <p className="text-muted-foreground truncate">{founder.role}</p>
            </div>
          </div>

          {entry.reference.external ? (
            <a
              href={entry.reference.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground focus-visible:ring-ring focus-visible:ring-offset-card inline-flex min-h-11 shrink-0 items-center gap-1 rounded-xs font-mono text-xs font-medium underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent sm:min-h-8 [@media(hover:hover)_and_(pointer:fine)]:hover:text-signal"
            >
              {entry.reference.label}
              <ArrowUpRightIcon className="size-3.5" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ) : (
            <Link
              href={entry.reference.href}
              prefetch={false}
              className="text-foreground focus-visible:ring-ring focus-visible:ring-offset-card inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-xs font-sans text-xs font-medium underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent sm:min-h-8 [@media(hover:hover)_and_(pointer:fine)]:hover:text-signal"
            >
              {entry.reference.label}
              <ArrowRightIcon className="size-3.5" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export const Faq11 = (): ReactNode => {
  const [defaultEntry] = FAQ_ENTRIES;
  if (!defaultEntry) {
    return null;
  }

  return (
    <section
      id="questions"
      aria-labelledby="faq-title"
      className="scroll-mt-24 pb-16 sm:pb-20 lg:pb-24"
    >
      <Container>
        <div className="border-rule border-t pt-14 sm:pt-18">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
            <div className="max-w-[38rem]">
              <Eyebrow>Common questions</Eyebrow>
              <SectionTitle id="faq-title">
                Straight answers from the people building it.
              </SectionTitle>
            </div>
            <p className="text-muted-foreground max-w-[32rem] text-base leading-7 text-pretty">
              Moving a ministry’s giving and donor records is a serious
              decision. Here is how{" "}
              <span translate="no" className="text-foreground font-medium">
                {siteConfig.shortName}
              </span>{" "}
              handles your data, serves your missionaries and finance team, and
              protects year-end giving. Sharing this with your board or finance
              team? Start with our{" "}
              <Link
                href="/evaluate"
                prefetch={false}
                className="text-foreground focus-visible:ring-ring focus-visible:ring-offset-background rounded-xs font-medium underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent [@media(hover:hover)_and_(pointer:fine)]:hover:text-signal"
              >
                leadership evaluation guide
              </Link>
              .
            </p>
          </div>

          <Faq11Slot>
            <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,44fr)_minmax(0,56fr)] lg:items-stretch lg:gap-8">
              <div aria-hidden="true" className="flex flex-col gap-1.5">
                {FAQ_ENTRIES.map((entry, idx) => (
                  <span
                    key={entry.value}
                    className={
                      idx === 0
                        ? "border-signal-border bg-card text-foreground flex min-h-12 w-full items-center justify-between gap-4 rounded-xl border px-4 py-3.5 text-left font-sans text-sm font-medium shadow-xs"
                        : "border-rule bg-record/55 text-muted-foreground flex min-h-12 w-full items-center justify-between gap-4 rounded-xl border px-4 py-3.5 text-left font-sans text-sm font-medium"
                    }
                  >
                    <span>{entry.question}</span>
                  </span>
                ))}
              </div>

              <div className="border-rule-strong bg-card flex min-w-0 flex-col rounded-2xl border p-6 shadow-[var(--shadow-card)] sm:p-8">
                <StaticAnswerBody entry={defaultEntry} />
              </div>

              <noscript>
                <div className="flex flex-col gap-4 lg:col-span-2">
                  {FAQ_ENTRIES.slice(1).map((entry) => (
                    <div
                      key={entry.value}
                      className="border-rule-strong bg-card rounded-2xl border p-6 shadow-[var(--shadow-card)] sm:p-8"
                    >
                      <StaticAnswerBody entry={entry} />
                    </div>
                  ))}
                </div>
              </noscript>
            </div>
          </Faq11Slot>
        </div>
      </Container>
    </section>
  );
};
