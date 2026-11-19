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
    "Connected websites, fundraising, donor records, and email, built to work with AI. asym is launching soon. Request early access.",
  /**
  Production domain served by this project (Vercel `asym-web-simple`).
  */
  url: "https://asym.app",
  /**
  Public contact address. Before launch, confirm this inbox receives mail:
  as of November 2026 asymmetric.al publishes no MX records.
  */
  email: "info@asymmetric.al",
  repoUrl: "https://github.com/Asymmetric-al/core",
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
  license: "AGPL-3.0",
} as const;

export const navigationLinks = [
  { label: "Product", href: "/#product" },
  { label: "Open source", href: "/#open-source" },
  { label: "About", href: "/#about" },
] as const;

export const footerLinks = [
  { label: "GitHub", href: siteConfig.repoUrl, external: true },
  { label: "Contact", href: `mailto:${siteConfig.email}`, external: false },
  { label: "Privacy", href: "/privacy", external: false },
  { label: "Terms", href: "/terms", external: false },
] as const;

export const siteFeatures = {
  smoothScroll: true,
} as const;
