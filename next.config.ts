import { withPayload } from "@payloadcms/next/withPayload";
import createBundleAnalyzer from "@next/bundle-analyzer";
import type { NextConfig } from "next";

const withBundleAnalyzer = createBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const EARLY_ACCESS = "/#early-access";
const PRODUCT = "/#product";
const OPEN_SOURCE = "/#open-source";

const nextConfig: NextConfig = {
  redirects: () =>
    Promise.resolve([
      // Routes from earlier versions of the site now live as homepage sections.
      { source: "/about", destination: "/#about", permanent: false },
      { source: "/faq", destination: PRODUCT, permanent: false },
      { source: "/waitlist", destination: EARLY_ACCESS, permanent: false },
      {
        source: "/open-source-and-trust",
        destination: OPEN_SOURCE,
        permanent: false,
      },
      { source: "/platform", destination: PRODUCT, permanent: false },
      { source: "/missions", destination: "/#about", permanent: false },
      { source: "/specs", destination: OPEN_SOURCE, permanent: false },
      { source: "/manifesto", destination: "/", permanent: false },
      { source: "/give", destination: "/", permanent: false },
      { source: "/join", destination: EARLY_ACCESS, permanent: false },
      { source: "/contact", destination: EARLY_ACCESS, permanent: false },
      { source: "/501c3", destination: "/", permanent: false },
    ]),
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "deifkwefumgah.cloudfront.net",
      },
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],
  },
  productionBrowserSourceMaps: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default withPayload(withBundleAnalyzer(nextConfig));
