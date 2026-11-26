import createBundleAnalyzer from "@next/bundle-analyzer";
import { withPayload } from "@payloadcms/next/withPayload";
import { withCn } from "cn/next";
import type { NextConfig } from "next";

const withBundleAnalyzer = createBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const EARLY_ACCESS = "/#early-access";
const PRODUCT = "/#product";
const OPEN_SOURCE = "/#open-source";

const isDevelopment = process.env.NODE_ENV === "development";

const documentContentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDevelopment ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const apiContentSecurityPolicy = [
  "default-src 'none'",
  "frame-ancestors 'none'",
  "base-uri 'none'",
  "form-action 'self'",
].join("; ");

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
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
  ...(process.env.NEXT_DIST_DIR && { distDir: process.env.NEXT_DIST_DIR }),
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  headers: () =>
    Promise.resolve([
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        source: "/((?!api(?:/|$)).*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: documentContentSecurityPolicy,
          },
        ],
      },
      {
        source: "/api/:path*",
        headers: [
          { key: "Content-Security-Policy", value: apiContentSecurityPolicy },
        ],
      },
      {
        source: "/brand/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
    ]),
  redirects: () =>
    Promise.resolve([
      // Routes from earlier versions of the site now live as homepage sections.
      { source: "/about", destination: "/#about", permanent: true },
      { source: "/faq", destination: "/#questions", permanent: true },
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
  experimental: {
    inlineCss: true,
    optimizePackageImports: [
      "@ui-sdk/react",
      "@base-ui/react",
      "lucide-react",
      "motion",
    ],
    staleTimes: {
      static: 300,
    },
  },
  turbopack: {
    resolveAlias: {
      "tailwind-merge": "cn",
    },
  },
  productionBrowserSourceMaps: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

const wrappedConfig = withPayload(withBundleAnalyzer(nextConfig));
const originalHeaders = wrappedConfig.headers;

// Avoid Chromium cold-load connection restarts from Payload's Critical-CH header.
wrappedConfig.headers = async () => {
  const rules = originalHeaders ? await originalHeaders() : [];
  return rules.map((rule) => ({
    ...rule,
    headers: rule.headers.filter((header) => header.key !== "Critical-CH"),
  }));
};

export default withCn(wrappedConfig, {
  content: ["{app,components,lib}/**/*.{ts,tsx}"],
  css: "app/globals.css",
  out: "lib/cn-tables.ts",
});
