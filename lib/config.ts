export const siteConfig = {
  /**
  Company name. Product copy uses `shortName`.
  */
  name: "Asymmetric.al",
  /**
  Product name, written lowercase in copy.
  */
  shortName: "asym",
  description:
    "Open-source donor portals, self-service receipts, redacted missionary rosters, and office CRM on one shared record for missions organizations. Hosted access is not open yet.",
  /**
  Production domain served by this project (Vercel `asym-web-simple`).
  */
  url: "https://asym.app",
  repoUrl: "https://github.com/Asymmetric-al/core",
  commitsUrl: "https://github.com/Asymmetric-al/core/commits/develop",
  issuesUrl: "https://github.com/Asymmetric-al/core/issues",
  githubOrgUrl: "https://github.com/Asymmetric-al",
  cta: {
    primary: {
      label: "Request early access",
      href: "/#early-access",
    },
  },
} as const;

/**
Public figures for Asymmetric-al/core, verified against origin/develop
(`337785a7d`) on 21 November 2026: 5,265 commits on `develop` and 601
repository-wide merged pull requests. Rounded down so counts stay true
as development continues; repository activity is not production readiness.
*/
export const repoStats = {
  asOf: "November 2026",
  since: "January 2026",
  commits: "5,200+",
  commitsScope: "commits on develop",
  mergedPullRequests: "600+",
  mergedPullRequestsScope: "repository-wide merged PRs",
  license: "AGPL-3.0-only",
} as const;

export const navigationLinks = [
  { label: "Product", href: "/#product" },
  { label: "Open source", href: "/#open-source" },
  { label: "About", href: "/#about" },
] as const;

export const footerLinks = [
  { label: "GitHub", href: siteConfig.repoUrl, external: true },
  { label: "Early access", href: siteConfig.cta.primary.href, external: false },
  { label: "Privacy", href: "/privacy", external: false },
  { label: "Terms", href: "/terms", external: false },
] as const;

export const siteFeatures = {
  smoothScroll: false,
} as const;
