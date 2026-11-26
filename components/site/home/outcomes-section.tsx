import { Container } from "@/components/site/container";
import { PerspectiveFacet } from "@/components/site/home/asymmetric-field";
import { PrivacyMatrix } from "@/components/site/home/privacy-matrix";
import { Eyebrow, SectionTitle } from "@/components/site/home/section-heading";
import { WorkflowsExplorer } from "@/components/site/home/workflows-explorer";
import { ArrowUpRightIcon } from "@/components/site/icons";
import { ScreensGallery } from "@/components/site/reactbits/screens-gallery";
import { SpotlightCard } from "@/components/site/reactbits/spotlight-card";
import { siteConfig } from "@/lib/config";

const outcomes: readonly {
  readonly id: string;
  readonly variant: "donor" | "field" | "office";
  readonly role: string;
  readonly surfaceName: string;
  readonly appPath: string;
  readonly title: string;
  readonly body: string;
  readonly scope: string;
  readonly linkLabel: string;
  readonly repoPath: string;
}[] = [
  {
    id: "surface-donor",
    variant: "donor",
    role: "Supporters & churches",
    surfaceName: "Donor portal",
    appPath: "apps/donor",
    title: "Supporters manage their own giving and receipts.",
    body: "Donors give to one or several missionaries and projects right on your website, adjust recurring gifts, update expiring cards, choose their privacy level, and download receipts and year-end tax statements without emailing your office.",
    scope:
      "Own giving history · year-end tax statements · self-service card updates",
    linkLabel: "statements.ts",
    repoPath: "blob/develop/packages/api/src/donor-portal/statements.ts",
  },
  {
    id: "surface-missionary",
    variant: "field",
    role: "Built-in micro-CRMs",
    surfaceName: "Missionary workspace",
    appPath: "apps/missionary",
    title: "A micro-CRM for every missionary, with donor privacy built in.",
    body: "Missionaries stop waiting on monthly office spreadsheets. Each worker gets a personal micro-CRM tied to live agency records to check support progress, log thank-yous and follow-ups, and care for opted-in partners, while non-opted-in donors stay listed as Anonymous partner.",
    scope:
      "Personal missionary micro-CRM · private anonymous donors · live support progress",
    linkLabel: "donors.ts",
    repoPath: "blob/develop/packages/api/src/missionary-portal/donors.ts",
  },
  {
    id: "surface-office",
    variant: "office",
    role: "Office & Finance",
    surfaceName: "Mission Control",
    appPath: "apps/admin",
    title: "Run finance, donor care, and your website in one place.",
    body: "Finance, donor care, mobilization, and member-care staff work from one shared record. Manage households and partner churches, verify gift batches before posting, publish missionary and project pages in Web Studio, and keep accounting aligned.",
    scope: "Shared ministry CRM · gift batch verification · built-in Web Studio",
    linkLabel: "preview.ts",
    repoPath:
      "blob/develop/packages/api/src/admin/contribution-batches/preview.ts",
  },
];

export const OutcomesSection = () => (
  <section
    id="product"
    aria-labelledby="outcomes-title"
    className="scroll-mt-24 pb-16 sm:pb-20 lg:pb-24"
  >
    <Container>
      <div className="border-rule border-t pt-14 sm:pt-18">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div className="max-w-[38rem]">
            <Eyebrow>How asym works</Eyebrow>
            <SectionTitle id="outcomes-title">
              One ground truth. Every record and workflow.
            </SectionTitle>
          </div>
          <p className="text-muted-foreground max-w-[33rem] text-base leading-7 text-pretty">
            When a supporter gives on your website, updates a card, or sends a
            church check, every workspace updates right away. Donors,
            missionaries, and office teams all work from the same live records
            in{" "}
            <span translate="no" className="text-foreground font-medium">
              Core
            </span>
            , with clear privacy rules built in.
          </p>
        </div>

        <PrivacyMatrix />

        <div className="mt-6 grid gap-5 lg:grid-cols-3 lg:gap-6">
          {outcomes.map((item) => (
            <SpotlightCard
              key={item.id}
              id={item.id}
              as="article"
              tone={item.variant === "field" ? "human" : "signal"}
              className="border-rule-strong bg-card flex min-w-0 scroll-mt-24 flex-col justify-between rounded-2xl border p-6 shadow-[var(--shadow-card)] sm:p-7 [@media(hover:hover)_and_(pointer:fine)]:hover:border-rule-interactive"
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between gap-3">
                  <PerspectiveFacet variant={item.variant} />
                  <span
                    translate="no"
                    className="border-rule bg-record text-muted-foreground inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-xs forced-colors:border-[CanvasText]"
                  >
                    {item.appPath}
                  </span>
                </div>

                <p className="text-signal mt-5 font-sans text-sm font-medium">
                  {item.surfaceName} · {item.role}
                </p>
                <h3 className="font-heading text-foreground mt-2 text-2xl leading-tight font-semibold tracking-[-0.025em]">
                  {item.title}
                </h3>
                <p className="text-foreground/85 mt-3 text-[0.9375rem] leading-7 text-pretty">
                  {item.body}
                </p>
              </div>

              <div className="border-rule relative z-10 mt-6 border-t pt-4">
                <p className="text-muted-foreground text-xs leading-5">
                  {item.scope}
                </p>
                <div className="mt-3 flex items-center justify-between gap-3 font-mono text-xs">
                  <span className="text-muted-foreground">Core module</span>
                  <a
                    href={`${siteConfig.repoUrl}/${item.repoPath}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground focus-visible:ring-ring inline-flex min-h-11 items-center gap-1 rounded-xs font-medium underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent sm:min-h-8 [@media(hover:hover)_and_(pointer:fine)]:hover:text-signal"
                  >
                    {item.linkLabel}
                    <ArrowUpRightIcon className="size-3.5" />
                    <span className="sr-only">
                      {" "}
                      in Asymmetric-al/core (opens in a new tab)
                    </span>
                  </a>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>

        <WorkflowsExplorer />

        <ScreensGallery />
      </div>
    </Container>
  </section>
);
