import { Features22 } from "@/components/site/reactbits/features-22";
import type { GroundTruthWorkflow } from "@/components/site/reactbits/features-22";
import type { ReactNode } from "react";

const WORKFLOWS: readonly GroundTruthWorkflow[] = [
  {
    value: "giving-finance",
    label: "Giving & Finance",
    shortLine:
      "Online recurring gifts, paper checks, and month-end books in one place.",
    category: "Giving & Finance",
    headline: "Online gifts, paper checks, and month-end books in one place.",
    summary:
      "Every online recurring gift, cash envelope, and multi-missionary church check enters the same giving ledger, so Finance reconciles once instead of matching exports from three different tools.",
    details: [
      "Recurring card and ACH giving with optional donor fee-cover, deposited straight into your agency’s own Stripe account",
      "Paper check and cash batches, including splitting one church check across multiple missionaries and funds",
      "Donor-Advised Fund (DAF) soft credits, accurate receipts, January tax statements, and bank-deposit accounting exports",
    ],
    foundation: "Shared giving records · deposit matching · completed-gift statements",
    schemaScope: "contributions · batches",
    surfaces: ["apps/admin", "apps/donor", "Your Stripe"],
    icon: "giving",
  },
  {
    value: "missionary-crm",
    label: "Missionary micro-CRMs",
    shortLine: "Personal partner care with built-in donor privacy.",
    category: "Missionary workspace",
    headline: "A built-in micro-CRM for every missionary’s support team.",
    summary:
      "Missionaries stay close to their prayer and financial partners and see live support progress right away, while built-in privacy rules protect donors who prefer to stay anonymous.",
    details: [
      "Live view of monthly support progress and recurring gift status without waiting on office spreadsheets",
      "Personal micro-CRM for opted-in partners: notes, thank-you follow-ups, household context, and prayer updates",
      "Donors who have not opted in appear automatically as Anonymous partner, with lifetime and last-gift totals kept hidden",
    ],
    foundation: "Per-missionary micro-CRM · private anonymous defaults · live support",
    schemaScope: "missionary-portal/donors.ts",
    surfaces: ["apps/missionary", "Privacy rules", "Anonymous default"],
    icon: "micro-crm",
  },
  {
    value: "donor-church-care",
    label: "Donor & church care",
    shortLine: "Simple self-service for givers and clear records for churches.",
    category: "Supporter experience",
    headline: "Simple self-service for givers, clear records for partner churches.",
    summary:
      "Supporters and sending churches check gifts, update cards, and download year-end statements on their own, taking routine emails and phone calls off a lean office.",
    details: [
      "Give to one or multiple missionaries and projects in one checkout right on your organization’s own website",
      "Donor portal for gift history, recurring schedules, saved payment methods, privacy preferences, and annual tax statements",
      "Partner-church tracking that keeps legal receipts and congregation summaries clear even when church treasurers change",
    ],
    foundation:
      "Own-account donor portal · cards kept in your Stripe · explicit privacy",
    schemaScope: "donor-portal/statements.ts",
    surfaces: ["apps/donor", "Direct Stripe", "Annual statements"],
    icon: "donor-care",
  },
  {
    value: "web-studio",
    label: "Web Studio",
    shortLine: "Missionary pages and appeals linked straight to live funds.",
    category: "Website publishing",
    headline: "Publish missionary pages and appeals straight from live records.",
    summary:
      "Create and update missionary giving pages, project appeals, and ministry updates inside Mission Control without copying details into a separate website builder or waiting on a developer.",
    details: [
      "Build standard pages, missionary giving pages, project pages, and ministry updates in one visual editor",
      "Connected directly to live missionary and project funds so giving links and goals stay current automatically",
      "Granular visibility controls to protect missionaries serving in sensitive regions on public directories",
    ],
    foundation:
      "Built-in Web Studio · live fund links · field-safety visibility controls",
    schemaScope: "apps/admin · Web Studio",
    surfaces: ["Web Studio", "Live funds", "Field safety"],
    icon: "web-studio",
  },
  {
    value: "mobilization-care",
    label: "Mobilization & care",
    shortLine: "Candidate pipelines and private pastoral member care.",
    category: "Full ministry lifecycle",
    headline: "From first inquiry to long-term field care on one record.",
    summary:
      "Coordinate missionary candidates, events, communications, and pastoral member care on the same organizational record, with strict role permissions keeping confidential notes private.",
    details: [
      "Structured mobilization steps for applications, references, interviews, and committee approvals",
      "Separate, role-restricted member-care records kept apart from everyday fundraising and donor screens",
      "Shared email, letter, and PDF templates populated directly from up-to-date household and missionary records",
    ],
    foundation: "One shared database · strict role separation · private care notes",
    schemaScope: "openspec/ · role isolation",
    surfaces: ["apps/admin", "Member care", "Document templates"],
    icon: "mobilization",
  },
];

export const WorkflowsExplorer = (): ReactNode => (
  <Features22 workflows={WORKFLOWS} />
);
