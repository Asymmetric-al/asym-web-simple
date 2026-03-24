/**
 * Site content adapter — Phase 1: reads from hardcoded lib/config.ts.
 * Phase 2: swap internals to Payload Local API. Component imports stay the same.
 */

import {
  footerGroups,
  navigationLinks,
  siteConfig,
  supportLinks,
} from "@/lib/config";
import type { FooterGroup, NavLink, SiteGlobal } from "./types";

export async function getSiteGlobal(): Promise<SiteGlobal> {
  return {
    name: siteConfig.name,
    shortName: siteConfig.shortName,
    description: siteConfig.description,
    mission: siteConfig.mission,
    url: siteConfig.url,
    email: siteConfig.email,
    nonprofit: siteConfig.nonprofit,
    ein: siteConfig.ein,
    location: siteConfig.location,
    cta: {
      primary: { ...siteConfig.cta.primary },
      secondary: { ...siteConfig.cta.secondary },
    },
  };
}

export async function getNavigation(): Promise<NavLink[]> {
  return navigationLinks.map((l) => ({ ...l }));
}

export async function getSupportLinks(): Promise<NavLink[]> {
  return supportLinks.map((l) => ({ ...l }));
}

export async function getFooterGroups(): Promise<FooterGroup[]> {
  return footerGroups.map((g) => ({
    title: g.title,
    links: g.links.map((l) => ({ ...l })),
  }));
}
