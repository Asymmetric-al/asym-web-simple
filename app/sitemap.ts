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
    lastModified: "2026-11-25",
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    path: "/evaluate",
    lastModified: "2026-11-25",
    changeFrequency: "weekly",
    priority: 0.9,
  },
  {
    path: "/privacy",
    lastModified: "2026-11-20",
    changeFrequency: "monthly",
    priority: 0.6,
  },
  {
    path: "/terms",
    lastModified: "2026-11-20",
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
