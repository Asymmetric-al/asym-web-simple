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
    "Open-source software for Christian missions organizations. Run your website, giving, receipts, donor care, missionary micro-CRMs, and office workflows from one shared ground truth.",
  /**
  Production domain served by this project (Vercel `asym-web-simple`).
  */
  url: "https://asym.app",
  repoUrl: "https://github.com/Asymmetric-al/core",
  commitsUrl: "https://github.com/Asymmetric-al/core/commits/develop",
  githubOrgUrl: "https://github.com/Asymmetric-al",
  founders: {
    conrad: {
      name: "Conrad",
      initials: "C",
      role: "Co-founder, Asymmetric.al",
      githubHandle: "cobmojo",
      githubUrl: "https://github.com/cobmojo",
    },
    blake: {
      name: "Blake",
      initials: "B",
      role: "Co-founder, Asymmetric.al",
      githubHandle: "II-ricky-bobby-II",
      githubUrl: "https://github.com/II-ricky-bobby-II",
    },
  },
  cta: {
    primary: {
      label: "Request early access",
      href: "/#early-access",
    },
  },
} as const;

/**
Public figures for Asymmetric-al/core, verified against origin/develop
on 24 November 2026 (`1120dc5f9`): 5,200+ commits on `develop` and 600+
repository-wide merged pull requests. Rounded down so counts stay true
as development continues; repository activity is not production readiness.
*/
export const repoStats = {
  asOf: "November 2026",
  since: "January 2026",
  verifiedCommit: "1120dc5f9",
  verifiedCommitUrl:
    "https://github.com/Asymmetric-al/core/tree/1120dc5f9b0656869ce238ae6947056c9c94034f",
  commits: "5,200+",
  commitsScope: "commits on develop",
  mergedPullRequests: "600+",
  mergedPullRequestsScope: "repository-wide merged PRs",
  license: "AGPL-3.0-only",
} as const;

export const navigationLinks = [
  { label: "Platform", href: "/#product" },
  { label: "Open source", href: "/#open-source" },
  { label: "Vision", href: "/#vision" },
  { label: "Company", href: "/#about" },
  { label: "Evaluate", href: "/evaluate" },
] as const;

export const footerLinks = [
  { label: "GitHub", href: siteConfig.repoUrl, external: true },
  { label: "Early access", href: siteConfig.cta.primary.href, external: false },
  { label: "Privacy", href: "/privacy", external: false },
  { label: "Terms", href: "/terms", external: false },
] as const;
