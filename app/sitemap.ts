import { siteConfig } from "@/lib/config";
import type { MetadataRoute } from "next";

const routes: readonly {
  readonly path: string;
  readonly lastModified: string;
  readonly changeFrequency: "weekly" | "monthly";
  readonly priority: number;
}[] = [
  {
    path: "/",
    lastModified: "2026-11-21",
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    path: "/privacy",
    lastModified: "2026-11-19",
    changeFrequency: "monthly",
    priority: 0.6,
  },
  {
    path: "/terms",
    lastModified: "2026-11-19",
    changeFrequency: "monthly",
    priority: 0.6,
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  return routes.map(({ path, lastModified, changeFrequency, priority }) => ({
    url: path === "/" ? baseUrl : `${baseUrl}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
