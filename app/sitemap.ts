import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";

const routes = [
  "/",
  "/statement-of-faith",
  "/privacy",
  "/terms",
  "/501c3",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const now = new Date();

  return routes.map((route, index) => ({
    url: route === "/" ? baseUrl : `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: index === 0 ? 1 : 0.8,
  }));
}
