export const siteConfig = {
  name: "Asymmetric.al",
  shortName: "Asym",
  description:
    "Less admin. More ministry. The unified mission operating system for modern sending agencies.",
  mission: "Mission Operating System",
  url: "https://asymmetric.al",
  email: "info@asymmetric.al",
  nonprofit: "Global Fellowship Inc.",
  ein: "68-0214543",
  location: "Meadow Vista, California",
  /** Primary site CTA — keep in sync with home `PageHero` actions when both are visible. */
  cta: {
    primary: {
      label: "Join Waitlist",
      href: "/contact",
    },
    secondary: {
      label: "Request a Call",
      href: "/contact",
    },
  },
} as const;

export const navigationLinks = [
  { label: "Platform", href: "/platform" },
  { label: "Missions", href: "/missions" },
  { label: "Specs", href: "/specs" },
  { label: "Philosophy", href: "/manifesto" },
  { label: "Give", href: "/give" },
] as const;

export const supportLinks = [
  { label: "Join the Build", href: "/join" },
  { label: "Contact", href: "/contact" },
  { label: "Statement of Faith", href: "/statement-of-faith" },
] as const;

export const footerGroups = [
  {
    title: "Platform",
    links: [
      { label: "Mission Control", href: "/platform" },
      { label: "System Specs", href: "/specs" },
      { label: "Philosophy", href: "/manifesto" },
      { label: "Statement of Faith", href: "/statement-of-faith" },
    ],
  },
  {
    title: "Involvement",
    links: [
      { label: "For Missions", href: "/missions" },
      { label: "Give to Build", href: "/give" },
      { label: "Join the Team", href: "/join" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "501(c)(3) Disclosure", href: "/501c3" },
    ],
  },
] as const;

export const siteFeatures = {
  smoothScroll: true,
} as const;
