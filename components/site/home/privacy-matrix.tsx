import { ShieldCheck } from "lucide-react";
import { PrivacyMatrixSlot } from "@/components/site/home/deferred-widget-slots";
import {
  Frame,
  FrameFooter,
  FrameHeader,
  FramePanel,
} from "@/components/site/reui/frame";
import { siteConfig } from "@/lib/config";
import type { ReactNode } from "react";

const VISIBILITY_RULES = [
  {
    detail: "Who gave",
    donor: "Only your own household or church account",
    missionary: "Anonymous partner by default; named only if the donor opts in",
    office: "Full legal household, church, or organization record",
  },
  {
    detail: "Gift amount & history",
    donor: "Your individual receipts and completed gift totals",
    missionary:
      "Monthly support progress visible; lifetime and last-gift totals hidden per row",
    office: "Complete gift, fund designation, fee, and deposit record",
  },
  {
    detail: "Contact, notes & care",
    donor: "Your own contact details and communication choices",
    missionary:
      "Built-in micro-CRM for opted-in supporters; anonymous donors stay private",
    office: "Full household history with role-separated staff access",
  },
  {
    detail: "Year-end tax statement",
    donor: "Download completed gifts for the year anytime",
    missionary: "Never shown in the missionary workspace",
    office: "Generated straight from the same completed giving records",
  },
] as const;

const HEADER_CELL_CLASS = "border-rule border-l px-5 py-3";
const HEADER_TITLE_BASE_CLASS = "block font-sans text-xs font-semibold";
const MONO_PATH_CLASS = "text-muted-foreground font-mono text-xs";
const BODY_CELL_CLASS =
  "rounded-xl px-3.5 py-2.5 md:border-rule md:rounded-none md:border-l md:px-5 md:py-4";
const MOBILE_ROLE_LABEL_CLASS =
  "text-muted-foreground mb-1 block font-mono text-xs font-medium md:sr-only";

export const PrivacyMatrix = (): ReactNode => (
  <figure className="mt-8">
    <Frame variant="default" spacing="none">
      <PrivacyMatrixSlot>
        <FrameHeader className="flex-col gap-3 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex flex-wrap items-center gap-2.5">
            <p className="text-foreground font-sans text-sm font-semibold">
              One record, three tailored views
            </p>
            <span className="border-signal-border bg-signal-soft text-signal inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 font-mono text-xs font-medium forced-colors:border-[CanvasText]">
              <ShieldCheck className="size-3.5" aria-hidden="true" />
              Automatic privacy rules
            </span>
          </div>

          <span
            aria-hidden="true"
            className="text-muted-foreground inline-flex min-h-11 items-center font-mono text-xs sm:min-h-10"
          >
            apps/donor · apps/missionary · apps/admin
          </span>
        </FrameHeader>

        <FramePanel>
          <div
            aria-hidden="true"
            className="border-rule bg-record/35 hidden border-b md:grid md:grid-cols-[minmax(0,22fr)_minmax(0,26fr)_minmax(0,26fr)_minmax(0,26fr)]"
          >
            <div className="text-muted-foreground px-6 py-3 font-sans text-xs font-semibold">
              Record detail
            </div>
            <div className={HEADER_CELL_CLASS}>
              <span className={`${HEADER_TITLE_BASE_CLASS} text-foreground`}>
                Donor portal
              </span>
              <span translate="no" className={MONO_PATH_CLASS}>
                apps/donor
              </span>
            </div>
            <div className={`${HEADER_CELL_CLASS} bg-signal-soft/45`}>
              <span className={`${HEADER_TITLE_BASE_CLASS} text-signal`}>
                Missionary workspace
              </span>
              <span translate="no" className={MONO_PATH_CLASS}>
                apps/missionary
              </span>
            </div>
            <div className={HEADER_CELL_CLASS}>
              <span className={`${HEADER_TITLE_BASE_CLASS} text-foreground`}>
                Mission Control
              </span>
              <span translate="no" className={MONO_PATH_CLASS}>
                apps/admin
              </span>
            </div>
          </div>

          <div className="divide-rule divide-y">
            {VISIBILITY_RULES.map((rule) => (
              <div
                key={rule.detail}
                className="grid gap-3 px-5 py-4 md:grid-cols-[minmax(0,22fr)_minmax(0,26fr)_minmax(0,26fr)_minmax(0,26fr)] md:gap-0 md:p-0"
              >
                <div className="text-foreground font-heading text-sm font-semibold tracking-[-0.015em] md:px-6 md:py-4">
                  {rule.detail}
                </div>
                <div className={BODY_CELL_CLASS}>
                  <span className={MOBILE_ROLE_LABEL_CLASS}>
                    Donor portal<span className="sr-only">: </span>
                  </span>
                  <p className="text-foreground/85 text-sm leading-6">
                    {rule.donor}
                  </p>
                </div>
                <div className={`${BODY_CELL_CLASS} bg-signal-soft/45`}>
                  <span className="text-signal mb-1 block font-mono text-xs font-medium md:sr-only">
                    Missionary workspace<span className="sr-only">: </span>
                  </span>
                  <p className="text-foreground text-sm leading-6 font-medium">
                    {rule.missionary}
                  </p>
                </div>
                <div className={BODY_CELL_CLASS}>
                  <span className={MOBILE_ROLE_LABEL_CLASS}>
                    Mission Control<span className="sr-only">: </span>
                  </span>
                  <p className="text-foreground/85 text-sm leading-6">
                    {rule.office}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </FramePanel>
      </PrivacyMatrixSlot>

      <FrameFooter className="px-4 py-3 sm:px-6">
        <figcaption className="text-muted-foreground text-xs leading-5">
          Privacy rules are enforced automatically in server code (
          <a
            href={`${siteConfig.repoUrl}/blob/develop/packages/api/src/missionary-portal/donors.ts`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground focus-visible:ring-ring rounded-xs font-mono font-medium underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-2 focus-visible:outline-transparent [@media(hover:hover)_and_(pointer:fine)]:hover:text-signal"
          >
            donors.ts
            <span className="sr-only">
              {" "}
              in Asymmetric-al/core (opens in a new tab)
            </span>
          </a>{" "}
          and{" "}
          <a
            href={`${siteConfig.repoUrl}/blob/develop/packages/api/src/donor-portal/statements.ts`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground focus-visible:ring-ring rounded-xs font-mono font-medium underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-2 focus-visible:outline-transparent [@media(hover:hover)_and_(pointer:fine)]:hover:text-signal"
          >
            statements.ts
            <span className="sr-only">
              {" "}
              in Asymmetric-al/core (opens in a new tab)
            </span>
          </a>
          ) and database permissions, never left to manual spreadsheet cleanup.
        </figcaption>
      </FrameFooter>
    </Frame>
  </figure>
);
