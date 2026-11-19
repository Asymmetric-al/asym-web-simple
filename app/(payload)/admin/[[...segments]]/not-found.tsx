import { NotFoundPage, generatePageMetadata } from "@payloadcms/next/views";
import config from "@payload-config";
import SiteNotFound from "@/app/not-found";
import { importMap } from "../importMap.js";
import type { Metadata } from "next";

interface Args {
  params: Promise<{
    segments: string[];
  }>;
  searchParams: Promise<Record<string, string | string[]>>;
}

const isPayloadConfigured = (): boolean =>
  Boolean(process.env.DATABASE_URI?.trim() && process.env.PAYLOAD_SECRET?.trim());

export const generateMetadata = ({
  params,
  searchParams,
}: Args): Promise<Metadata> => {
  if (!isPayloadConfigured()) {
    return Promise.resolve({
      title: "Page not found",
      description: "This page doesn’t exist on asym.app.",
      robots: {
        index: false,
        follow: false,
      },
    });
  }
  return generatePageMetadata({ config, params, searchParams });
};

const NotFound = ({ params, searchParams }: Args) => {
  if (!isPayloadConfigured()) {
    return <SiteNotFound />;
  }
  return NotFoundPage({ config, params, searchParams, importMap });
};

export default NotFound;
