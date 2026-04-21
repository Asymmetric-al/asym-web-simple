export const siteConfig = {
  name: "Asymmetric.al",
  shortName: "Asym",
  description:
    "Asym is the operating system for Christian missions, giving teams one mission-built system for donor care, missionary support, statements, reporting, and operations.",
  mission: "The operating system for Christian missions",
  url: "https://asymmetric.al",
  email: "info@asymmetric.al",
  nonprofit: "Global Fellowship Inc.",
  ein: "68-0214543",
  location: "Meadow Vista, California",
  /** Primary site CTA — keep in sync with home `PageHero` actions when both are visible. */
  cta: {
    primary: {
      label: "Join the Waitlist",
      href: "/waitlist",
    },
    secondary: {
      label: "Get the Mission Tech Stack Audit",
      href: "/contact",
    },
  },
} as const;

export const navigationLinks = [
  { label: "Platform", href: "/platform" },
  { label: "About", href: "/about" },
  { label: "Missions", href: "/missions" },
  { label: "Specs", href: "/specs" },
  { label: "Give", href: "/give" },
] as const;

export const supportLinks = [
  { label: "Waitlist", href: "/waitlist" },
  { label: "FAQ", href: "/faq" },
  { label: "Open Source & Trust", href: "/open-source-and-trust" },
  { label: "Join the Build", href: "/join" },
  { label: "Contact", href: "/contact" },
  { label: "Statement of Faith", href: "/statement-of-faith" },
] as const;

export const footerGroups = [
  {
    title: "Explore",
    links: [
      { label: "Platform", href: "/platform" },
      { label: "About", href: "/about" },
      { label: "FAQ", href: "/faq" },
      { label: "Open Source & Trust", href: "/open-source-and-trust" },
      { label: "Philosophy", href: "/manifesto" },
      { label: "Statement of Faith", href: "/statement-of-faith" },
    ],
  },
  {
    title: "Take Action",
    links: [
      { label: "Join the Waitlist", href: "/waitlist" },
      { label: "Get the Mission Tech Stack Audit", href: "/contact" },
      { label: "For Missions", href: "/missions" },
      { label: "Give to Build", href: "/give" },
      { label: "Join the Team", href: "/join" },
    ],
  },
  {
    title: "Trust",
    links: [
      { label: "Financials", href: "/501c3" },
      { label: "System Specs", href: "/specs" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
] as const;

export const siteFeatures = {
  smoothScroll: true,
} as const;
