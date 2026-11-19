import type { ReactNode } from "react";

// ---------------------------------------------------------------------------
// Site-wide globals — mirrors future Payload SiteSettings global
// ---------------------------------------------------------------------------

export interface SiteGlobal {
  name: string;
  shortName: string;
  description: string;
  url: string;
  email: string;
  repoUrl: string;
  cta: {
    primary: NavLink;
  };
}

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------

export interface NavLink {
  label: string;
  href: string;
}

export interface FooterGroup {
  title: string;
  links: NavLink[];
}

// ---------------------------------------------------------------------------
// Page building blocks — mirrors future Payload block types
// ---------------------------------------------------------------------------

export interface PageHeroData {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  ctas?: NavLink[];
}

export interface CapabilityCard {
  icon: string;
  title: string;
  description: string;
}

export interface FeatureItem {
  title: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
