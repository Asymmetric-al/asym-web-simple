export const siteConfig = {
  name: "Asymmetric.al",
  shortName: "Asym",
  description:
    "Asym is an early product for Christian missions organizations. Asymmetric.al is the nonprofit ministry behind it.",
  mission: "Building mission technology that gives small teams time back.",
  url: "https://asymmetric.al",
  email: "info@asymmetric.al",
  nonprofit: "Global Fellowship Inc.",
  ein: "68-0214543",
  location: "Meadow Vista, California",
  /** Primary site CTA - keep in sync with the one-page homepage anchors. */
  cta: {
    primary: {
      label: "Build with us",
      href: "#talk",
    },
    secondary: {
      label: "Letter",
      href: "#letter",
    },
  },
} as const;

export const navigationLinks = [
  { label: "Letter", href: "#letter" },
  { label: "Why", href: "#why" },
  { label: "Product", href: "#product" },
  { label: "Builders", href: "#builders" },
] as const;

export const supportLinks = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Statement of Faith", href: "/statement-of-faith" },
  { label: "501(c)(3)", href: "/501c3" },
] as const;

export const footerGroups = [
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Statement of Faith", href: "/statement-of-faith" },
      { label: "501(c)(3)", href: "/501c3" },
    ],
  },
] as const;

export const siteFeatures = {
  smoothScroll: true,
} as const;
