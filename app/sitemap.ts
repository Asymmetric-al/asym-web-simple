import { siteConfig } from "@/lib/config";
import type { MetadataRoute } from "next";

const routes = ["/", "/privacy", "/terms"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const now = new Date();

  return routes.map((route, index) => ({
    url: route === "/" ? baseUrl : `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: index === 0 ? 1 : 0.6,
  }));
}
