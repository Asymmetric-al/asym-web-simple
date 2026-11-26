import { siteConfig } from "@/lib/config";

export type QuickJumpGroupId =
  | "sections"
  | "evaluation"
  | "code"
  | "appearance";

export type QuickJumpAction =
  | { readonly type: "route"; readonly href: string }
  | { readonly type: "external"; readonly href: string }
  | { readonly type: "theme"; readonly theme: "light" | "dark" | "system" };

export interface QuickJumpItem {
  readonly id: string;
  readonly group: QuickJumpGroupId;
  readonly title: string;
  readonly subtitle: string;
  readonly badge: string;
  readonly keywords: readonly string[];
  readonly action: QuickJumpAction;
}

export const QUICK_JUMP_GROUPS: readonly {
  readonly id: QuickJumpGroupId;
  readonly label: string;
}[] = [
  { id: "sections", label: "Platform & sections" },
  { id: "evaluation", label: "Board, Finance & legal" },
  { id: "code", label: "Public source code" },
  { id: "appearance", label: "Appearance" },
];

export const buildQuickJumpItems = (
  isConfigured: boolean
): readonly QuickJumpItem[] => [
  {
    id: "section-product",
    group: "sections",
    title: "The platform & privacy matrix",
    subtitle: "Donor portal, missionary micro-CRMs, Mission Control, Web Studio",
    badge: "/#product",
    keywords: [
      "platform",
      "donor",
      "missionary",
      "micro-crm",
      "privacy",
      "web studio",
      "workflows",
    ],
    action: { type: "route", href: "/#product" },
  },
  {
    id: "section-open-source",
    group: "sections",
    title: "Open source & build roadmap",
    subtitle: "Stewardship terms, local setup commands, and live status ledger",
    badge: "/#open-source",
    keywords: [
      "open source",
      "roadmap",
      "status",
      "agpl",
      "local",
      "cli",
      "clone",
    ],
    action: { type: "route", href: "/#open-source" },
  },
  {
    id: "section-vision",
    group: "sections",
    title: "Vision · Grounded AI",
    subtitle: "AI drafts; people send. Workflow diagram and permission rules",
    badge: "/#vision",
    keywords: ["vision", "ai", "grounded", "draft", "pipeline", "care"],
    action: { type: "route", href: "/#vision" },
  },
  {
    id: "section-about",
    group: "sections",
    title: "Company & common questions",
    subtitle: "Founders letter, Global Fellowship context, and common questions",
    badge: "/#about",
    keywords: [
      "company",
      "founders",
      "conrad",
      "blake",
      "faq",
      "questions",
      "global fellowship",
    ],
    action: { type: "route", href: "/#about" },
  },
  {
    id: "section-early-access",
    group: "sections",
    title: isConfigured ? "Request early access" : "Pre-launch readiness",
    subtitle: isConfigured
      ? "Start an early access conversation for your ministry"
      : "Review what is in Core today and what remains before hosted pilots",
    badge: isConfigured ? "/#early-access" : "/early-access/status",
    keywords: ["early access", "pilot", "cohort", "readiness", "signup"],
    action: {
      type: "route",
      href: isConfigured
        ? "/#early-access"
        : "/early-access/status?state=unavailable",
    },
  },
  {
    id: "eval-brief",
    group: "evaluation",
    title: "Evaluation & migration brief",
    subtitle: "Stitched tools comparison, parallel close, hosting, and packet",
    badge: "/evaluate",
    keywords: ["evaluate", "board", "finance", "it", "brief", "compare"],
    action: { type: "route", href: "/evaluate" },
  },
  {
    id: "eval-migration",
    group: "evaluation",
    title: "Parallel-close migration steps",
    subtitle: "Reconcile one completed period to the cent before cutover",
    badge: "/evaluate#migration",
    keywords: ["migration", "parallel close", "reconcile", "switch", "cutover"],
    action: { type: "route", href: "/evaluate#migration" },
  },
  {
    id: "eval-hosting",
    group: "evaluation",
    title: "Self-hosted vs. managed hosting",
    subtitle: "$0 AGPL-3.0-only Core or flat hosted tiers with unlimited users",
    badge: "/evaluate#hosting",
    keywords: ["pricing", "cost", "self-host", "managed", "stripe", "tiers"],
    action: { type: "route", href: "/evaluate#hosting" },
  },
  {
    id: "eval-packet",
    group: "evaluation",
    title: "Governance & review documents",
    subtitle: "Code-enforced privacy, direct Stripe accounts, and policy links",
    badge: "/evaluate#governance",
    keywords: ["governance", "compliance", "trust", "packet", "security", "rls"],
    action: { type: "route", href: "/evaluate#governance" },
  },
  {
    id: "legal-privacy",
    group: "evaluation",
    title: "Privacy policy",
    subtitle: "How asym.app handles visitor and early-access information",
    badge: "/privacy",
    keywords: ["privacy", "policy", "data", "gdpr", "legal"],
    action: { type: "route", href: "/privacy" },
  },
  {
    id: "legal-terms",
    group: "evaluation",
    title: "Terms of service",
    subtitle: "Prelaunch website and early access terms for asym.app",
    badge: "/terms",
    keywords: ["terms", "legal", "license", "agpl"],
    action: { type: "route", href: "/terms" },
  },
  {
    id: "legal-faith",
    group: "evaluation",
    title: "Statement of Faith",
    subtitle: "Personal Christian convictions of the founders",
    badge: "/statement-of-faith",
    keywords: ["statement of faith", "founders", "convictions", "missions"],
    action: { type: "route", href: "/statement-of-faith" },
  },
  {
    id: "code-repo",
    group: "code",
    title: "Asymmetric-al/core on GitHub",
    subtitle: "Full AGPL-3.0-only monorepo with specs and ADRs",
    badge: "GitHub",
    keywords: ["github", "repo", "core", "source", "code"],
    action: { type: "external", href: siteConfig.repoUrl },
  },
  {
    id: "code-donors",
    group: "code",
    title: "donors.ts · Missionary privacy rules",
    subtitle: "Anonymous partner default and withheld per-row gift totals",
    badge: "packages/api",
    keywords: ["donors.ts", "anonymous", "privacy", "missionary", "api"],
    action: {
      type: "external",
      href: `${siteConfig.repoUrl}/blob/develop/packages/api/src/missionary-portal/donors.ts`,
    },
  },
  {
    id: "code-stripe",
    group: "code",
    title: "tenant-client.ts · Direct Stripe custody",
    subtitle: "Per-organization Stripe account connection with 0% gift markup",
    badge: "packages/api",
    keywords: ["stripe", "tenant", "payments", "cards", "custody"],
    action: {
      type: "external",
      href: `${siteConfig.repoUrl}/blob/develop/packages/api/src/stripe/tenant-client.ts`,
    },
  },
  {
    id: "code-adrs",
    group: "code",
    title: "docs/adr/ · Architecture decisions",
    subtitle: "Written architecture decision records and OpenSpec requirements",
    badge: "docs/adr",
    keywords: ["adr", "architecture", "openspec", "docs", "decisions"],
    action: {
      type: "external",
      href: `${siteConfig.repoUrl}/tree/develop/docs/adr`,
    },
  },
  {
    id: "theme-light",
    group: "appearance",
    title: "Switch to Light theme",
    subtitle: "Warm Modern Daylight palette",
    badge: "Light",
    keywords: ["theme", "light", "daylight", "appearance"],
    action: { type: "theme", theme: "light" },
  },
  {
    id: "theme-dark",
    group: "appearance",
    title: "Switch to Dark theme",
    subtitle: "Warm Charcoal Night palette",
    badge: "Dark",
    keywords: ["theme", "dark", "night", "appearance"],
    action: { type: "theme", theme: "dark" },
  },
  {
    id: "theme-system",
    group: "appearance",
    title: "Use System theme",
    subtitle: "Follow your operating system appearance preference",
    badge: "System",
    keywords: ["theme", "system", "auto", "appearance"],
    action: { type: "theme", theme: "system" },
  },
];

export const filterQuickJumpItems = (
  items: readonly QuickJumpItem[],
  query: string
): readonly QuickJumpItem[] => {
  const trimmed = query.trim().toLowerCase();
  if (trimmed.length === 0) {
    return items;
  }

  const terms = trimmed.split(/\s+/u).filter(Boolean);
  const titleMatches: QuickJumpItem[] = [];
  const otherMatches: QuickJumpItem[] = [];

  for (const item of items) {
    const titleLower = item.title.toLowerCase();
    const haystack = [titleLower, item.subtitle, item.badge, ...item.keywords]
      .join(" ")
      .toLowerCase();

    if (terms.some((term) => !haystack.includes(term))) {
      continue;
    }

    const bucket = terms.every((term) => titleLower.includes(term))
      ? titleMatches
      : otherMatches;
    bucket.push(item);
  }

  return [...titleMatches, ...otherMatches];
};
