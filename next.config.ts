import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";
import createBundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = createBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  experimental: {
    viewTransition: true,
  },
  async redirects() {
    return [
      { source: "/about", destination: "/#letter", permanent: false },
      { source: "/faq", destination: "/#letter", permanent: false },
      { source: "/waitlist", destination: "/#talk", permanent: false },
      {
        source: "/open-source-and-trust",
        destination: "/#letter",
        permanent: false,
      },
      { source: "/platform", destination: "/#product", permanent: false },
      { source: "/missions", destination: "/#why", permanent: false },
      { source: "/specs", destination: "/#product", permanent: false },
      { source: "/manifesto", destination: "/#letter", permanent: false },
      { source: "/give", destination: "/#talk", permanent: false },
      { source: "/join", destination: "/#builders", permanent: false },
      { source: "/contact", destination: "/#talk", permanent: false },
    ];
  },
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
