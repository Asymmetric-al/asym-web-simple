import { notFound } from "next/navigation";
import { RootPage, generatePageMetadata } from "@payloadcms/next/views";
import config from "@payload-config";

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
      title: "Not found",
      robots: { index: false, follow: false },
    });
  }
  return generatePageMetadata({ config, params, searchParams });
};

const Page = ({ params, searchParams }: Args) => {
  if (!isPayloadConfigured()) {
    notFound();
  }
  return RootPage({ config, params, searchParams, importMap });
};

export default Page;
