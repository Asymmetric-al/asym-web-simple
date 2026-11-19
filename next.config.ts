import createBundleAnalyzer from "@next/bundle-analyzer";
import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const withBundleAnalyzer = createBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const EARLY_ACCESS = "/#early-access";
const PRODUCT = "/#product";
const OPEN_SOURCE = "/#open-source";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  ...(process.env.NEXT_DIST_DIR ? { distDir: process.env.NEXT_DIST_DIR } : {}),
  poweredByHeader: false,
  headers: () =>
    Promise.resolve([
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ]),
  redirects: () =>
    Promise.resolve([
      // Routes from earlier versions of the site now live as homepage sections.
      { source: "/about", destination: "/#about", permanent: true },
      { source: "/faq", destination: PRODUCT, permanent: true },
      { source: "/waitlist", destination: EARLY_ACCESS, permanent: true },
      {
        source: "/open-source-and-trust",
        destination: OPEN_SOURCE,
        permanent: true,
      },
      { source: "/platform", destination: PRODUCT, permanent: true },
      { source: "/missions", destination: "/#about", permanent: true },
      { source: "/specs", destination: OPEN_SOURCE, permanent: true },
      { source: "/manifesto", destination: "/", permanent: true },
      { source: "/give", destination: "/", permanent: true },
      { source: "/give/success", destination: "/", permanent: true },
      { source: "/join", destination: EARLY_ACCESS, permanent: true },
      { source: "/contact", destination: EARLY_ACCESS, permanent: true },
      { source: "/501c3", destination: "/", permanent: true },
      { source: "/deck", destination: OPEN_SOURCE, permanent: true },
      { source: "/contributor", destination: OPEN_SOURCE, permanent: true },
      {
        source: "/contributor/:path*",
        destination: OPEN_SOURCE,
        permanent: true,
      },
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
