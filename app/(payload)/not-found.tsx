import Link from "next/link";
import type { Metadata } from "next";
import type { CSSProperties } from "react";

export const metadata: Metadata = {
  title: "Page not found | asym",
  robots: {
    index: false,
    follow: false,
  },
};

const MAIN_STYLE: CSSProperties = {
  display: "flex",
  minHeight: "100dvh",
  alignItems: "center",
  justifyContent: "center",
  padding: "2rem",
  fontFamily: "system-ui, -apple-system, sans-serif",
  background: "#f6f2ea",
  color: "#16212b",
};

const WRAP_STYLE: CSSProperties = {
  maxWidth: "28rem",
};

const EYEBROW_STYLE: CSSProperties = {
  margin: 0,
  fontSize: "0.75rem",
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: "#54636f",
};

const HEADING_STYLE: CSSProperties = {
  margin: "0.75rem 0 0",
  fontSize: "2rem",
  lineHeight: 1.1,
  fontWeight: 600,
};

const BODY_STYLE: CSSProperties = {
  margin: "1rem 0 1.5rem",
  fontSize: "1rem",
  lineHeight: 1.6,
  color: "#54636f",
};

const LINK_STYLE: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  borderRadius: "999px",
  background: "#1e3a4f",
  color: "#f7fbff",
  padding: "0.625rem 1.25rem",
  fontSize: "0.9375rem",
  fontWeight: 500,
  textDecoration: "none",
};

export default function PayloadNotFound() {
  return (
    <main style={MAIN_STYLE}>
      <div style={WRAP_STYLE}>
        <p style={EYEBROW_STYLE}>404</p>
        <h1 style={HEADING_STYLE}>This page doesn’t exist.</h1>
        <p style={BODY_STYLE}>
          Admin access is not enabled on this deployment.
        </p>
        <Link href="/" style={LINK_STYLE}>
          Go to the homepage
        </Link>
      </div>
    </main>
  );
}
