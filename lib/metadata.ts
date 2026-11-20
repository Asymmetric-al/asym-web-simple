import { siteConfig } from "@/lib/config";
import type { Metadata } from "next";

export const siteMetadata = {
  name: siteConfig.shortName,
  title:
    "asym | Open-source giving and donor records for missions organizations",
  description: siteConfig.description,
  socialTitle:
    "One gift. Three hands. Open-source software for missions organizations.",
  socialDescription:
    "Open-source donor portals, self-service receipts, redacted missionary rosters, and office CRM on one shared record. Hosted access not open yet.",
  url: siteConfig.url,
  ogImage: "/opengraph-image",
} as const;

export const baseMetadata: Metadata = {
  metadataBase: siteMetadata.url,
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.name}`,
  },
  description: siteMetadata.description,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "nonprofit software",
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
    title: siteMetadata.socialTitle,
    description: siteMetadata.socialDescription,
    siteName: siteMetadata.name,
    images: [
      {
        url: siteMetadata.ogImage,
        width: 1200,
        height: 630,
        alt: siteMetadata.socialTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.socialTitle,
    description: siteMetadata.socialDescription,
    images: [siteMetadata.ogImage],
  },
  manifest: "/site.webmanifest",
};

export const createMetadata = ({
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
}): Metadata => {
  const canonicalPath = path === "/" ? "/" : path.replace(/\/$/u, "");
  const url = `${siteMetadata.url}${canonicalPath}`;
  const ogImage = image ?? siteMetadata.ogImage;
  const socialTitle = title ?? siteMetadata.socialTitle;

  return {
    ...(title && { title }),
    ...(description && { description }),
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      url,
      title: socialTitle,
      description: description ?? siteMetadata.socialDescription,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: socialTitle,
        },
      ],
    },
    twitter: {
      title: socialTitle,
      description: description ?? siteMetadata.socialDescription,
      images: [ogImage],
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
};
