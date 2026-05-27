import { siteConfig } from "@/lib/config";
import type { Metadata } from "next";

export const siteMetadata = {
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  ogImage: "/opengraph-image",
  creator: siteConfig.name,
  authors: [
    {
      name: siteConfig.name,
      url: siteConfig.url,
    },
  ],
  keywords: [
    "Christian missions software",
    "early missions technology",
    "missions donor care software",
    "missionary support software",
    "nonprofit operations software",
    "donor portal for missions",
    "Christian nonprofit technology",
    "mission technology builders",
    "Asym",
  ],
} as const;

export const baseMetadata: Metadata = {
  metadataBase: new URL(siteMetadata.url),
  title: {
    default: siteMetadata.name,
    template: `%s | ${siteMetadata.name}`,
  },
  description: siteMetadata.description,
  keywords: [...siteMetadata.keywords],
  authors: [...siteMetadata.authors],
  creator: siteMetadata.creator,
  publisher: siteMetadata.name,
  category: "nonprofit technology",
  applicationName: siteMetadata.name,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteMetadata.url,
    title: siteMetadata.name,
    description: siteMetadata.description,
    siteName: siteMetadata.name,
    images: [
      {
        url: siteMetadata.ogImage,
        width: 1200,
        height: 630,
        alt: siteMetadata.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.name,
    description: siteMetadata.description,
    images: [siteMetadata.ogImage],
  },
  manifest: "/site.webmanifest",
};

export function createMetadata({
  title,
  description,
  path = "/",
  image,
  noIndex = false,
}: {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const canonicalPath = path === "/" ? "/" : path.replace(/\/$/, "");
  const url = `${siteMetadata.url}${canonicalPath}`;
  const ogImage = image ?? siteMetadata.ogImage;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: title ?? siteMetadata.name,
      description: description ?? siteMetadata.description,
      url,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title ?? siteMetadata.name,
        },
      ],
    },
    twitter: {
      title: title ?? siteMetadata.name,
      description: description ?? siteMetadata.description,
      images: [ogImage],
    },
    ...(noIndex
      ? {
          robots: {
            index: false,
            follow: false,
          },
        }
      : {}),
  };
}
