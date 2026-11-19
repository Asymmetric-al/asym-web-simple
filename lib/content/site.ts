/**
 * Site content adapter — Phase 1: reads from hardcoded lib/config.ts.
 * Phase 2: swap internals to Payload Local API. Component imports stay the same.
 */

import { footerLinks, navigationLinks, siteConfig } from "@/lib/config";
import type { NavLink, SiteGlobal } from "./types";

export const getSiteGlobal = (): Promise<SiteGlobal> =>
  Promise.resolve({
    name: siteConfig.name,
    shortName: siteConfig.shortName,
    description: siteConfig.description,
    url: siteConfig.url,
    email: siteConfig.email,
    repoUrl: siteConfig.repoUrl,
    cta: {
      primary: { ...siteConfig.cta.primary },
    },
  });

export const getNavigation = (): Promise<NavLink[]> =>
  Promise.resolve(navigationLinks.map((link) => ({ ...link })));

export const getFooterLinks = (): Promise<NavLink[]> =>
  Promise.resolve(footerLinks.map(({ label, href }) => ({ label, href })));
