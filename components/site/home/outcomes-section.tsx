import { Container } from "@/components/site/container";
import { PerspectiveFacet } from "@/components/site/home/asymmetric-field";
import { Eyebrow, SectionTitle } from "@/components/site/home/section-heading";
import { ArrowUpRightIcon } from "@/components/site/icons";
import { siteConfig } from "@/lib/config";

const outcomes: readonly {
  readonly id: string;
  readonly variant: "donor" | "field" | "office";
  readonly role: string;
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
    role: "Donors",
    appPath: "apps/donor",
    title: "Give with confidence.",
    body: "Supporters check their own giving history, review recurring gifts, download individual receipts, and pull annual giving statements without emailing the office.",
    scope:
      "Own-account scope · settled-only annual statements · Stripe payment settings when needed",
    linkLabel: "statements.ts",
    repoPath: "blob/develop/packages/api/src/donor-portal/statements.ts",
  },
  {
    id: "surface-missionary",
    variant: "field",
    role: "Field staff & missionaries",
    appPath: "apps/missionary",
    title: "Know who stands behind you.",
    body: "Field workers follow assigned support and stay in touch with opted-in supporters, while donor identities stay private by default.",
    scope:
      "Anonymous partner default · lifetime & last-gift amounts withheld per row · aggregate analytics separate",
    linkLabel: "donors.ts",
    repoPath: "blob/develop/packages/api/src/missionary-portal/donors.ts",
  },
  {
    id: "surface-office",
    variant: "office",
    role: "Office teams",
    appPath: "apps/admin",
    title: "Spend Monday on people, not spreadsheets.",
    body: "Staff manage donor households, designated funds, and supported batch previews alongside website and template tools in one admin app.",
    scope:
      "Shared giving tables · dry-run batch previews · separate page & template tools",
    linkLabel: "preview.ts",
    repoPath:
      "blob/develop/packages/api/src/admin/contribution-batches/preview.ts",
  },
];

export const OutcomesSection = () => (
  <section
    id="product"
    aria-labelledby="outcomes-title"
    className="scroll-mt-24 py-16 sm:py-20 lg:py-24"
  >
    <Container>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
        <div className="max-w-[36rem]">
          <Eyebrow>What asym is for</Eyebrow>
          <SectionTitle id="outcomes-title">
            One foundation. Clear for everyone involved.
          </SectionTitle>
        </div>
        <p className="text-muted-foreground max-w-[32rem] text-base leading-7 text-pretty">
          Three dedicated apps in{" "}
          <span
            translate="no"
            className="text-foreground font-mono text-sm whitespace-nowrap"
          >
            Asymmetric-al/core
          </span>{" "}
          read from shared giving tables, giving each person what their role
          allows without spreadsheet handoffs.
        </p>
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-3 lg:gap-6">
        {outcomes.map((item) => (
          <article
            key={item.id}
            id={item.id}
            className="border-rule-strong bg-card flex min-w-0 scroll-mt-24 flex-col justify-between rounded-2xl border p-6 shadow-[var(--shadow-card)] sm:p-7"
          >
            <div>
              <div className="flex items-center justify-between gap-3">
                <PerspectiveFacet variant={item.variant} />
                <span className="border-signal-border bg-signal-soft text-signal inline-flex items-center rounded-md border px-2 py-0.5 font-mono text-xs font-medium forced-colors:border-[CanvasText]">
                  In code
                </span>
              </div>

              <p className="text-signal mt-5 font-sans text-sm font-medium">
                {item.role}
              </p>
              <h3 className="font-heading text-foreground mt-2 text-2xl leading-tight font-semibold tracking-[-0.025em]">
                {item.title}
              </h3>
              <p className="text-foreground/85 mt-3 text-[0.9375rem] leading-7 text-pretty">
                {item.body}
              </p>
            </div>

            <div className="border-rule mt-6 border-t pt-4">
              <p className="text-muted-foreground text-xs leading-5">
                {item.scope}
              </p>
              <div className="mt-3 flex items-center justify-between gap-3 font-mono text-xs">
                <span translate="no" className="text-muted-foreground">
                  {item.appPath}
                </span>
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
          </article>
        ))}
      </div>
    </Container>
  </section>
);
