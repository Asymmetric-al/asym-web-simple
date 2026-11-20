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
    "Open-source platform for websites, giving, receipts, and donor records. AI campaign workflows in development, starting with missions organizations.",
  /**
  Production domain served by this project (Vercel `asym-web-simple`).
  */
  url: "https://asym.app",
  repoUrl: "https://github.com/Asymmetric-al/core",
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
Public figures for Asymmetric-al/core, checked against GitHub on
19 November 2026 (develop: 4,915 commits; 595 merged pull requests).
Rounded down so they stay true as the repository grows.
*/
export const repoStats = {
  asOf: "November 2026",
  since: "January 2026",
  commits: "4,900+",
  mergedPullRequests: "590+",
  license: "AGPL-3.0-only",
} as const;

export const navigationLinks = [
  { label: "Product", href: "/#product" },
  { label: "Open source", href: "/#open-source" },
  { label: "About", href: "/#about" },
] as const;

export const mobileNavigationLinks = [
  ...navigationLinks,
  { label: "Where things stand", href: "/#where-things-stand" },
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
