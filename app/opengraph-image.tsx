/* eslint-disable @next/next/no-img-element -- ImageResponse renders plain img elements. */
import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { siteMetadata } from "@/lib/metadata";

export const runtime = "nodejs";
export const alt = siteMetadata.socialTitle;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const INK = "#16212B";
const MUTED = "#5A6975";

export default async function openGraphImage() {
  const logoData = await readFile(
    path.join(process.cwd(), "public", "brand", "asym-mark-dark.png"),
    "base64"
  );
  const logoSrc = `data:image/png;base64,${logoData}`;

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        height: "100%",
        width: "100%",
        background:
          "linear-gradient(160deg, #fcfbf7 0%, #f6f2ea 55%, #e8efe2 100%)",
        color: INK,
        padding: "64px 72px",
        fontFamily: "sans-serif",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <img
          src={logoSrc}
          alt=""
          width={52}
          height={52}
          style={{ display: "block", objectFit: "contain" }}
        />
        <span
          style={{ fontSize: 40, fontWeight: 700, letterSpacing: "-0.04em" }}
        >
          asym
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <div
          style={{
            fontSize: 70,
            lineHeight: 1.02,
            fontWeight: 700,
            letterSpacing: "-0.055em",
          }}
        >
          Your website, fundraising, and CRM.
        </div>
        <div
          style={{
            fontSize: 70,
            lineHeight: 1.02,
            fontWeight: 700,
            letterSpacing: "-0.055em",
            color: MUTED,
          }}
        >
          Built to work together with AI.
        </div>
      </div>

      <div style={{ display: "flex", gap: "12px" }}>
        {[
          "Open source",
          "Launching soon",
          "Starting with missions organizations",
        ].map((item) => (
          <div
            key={item}
            style={{
              display: "flex",
              borderRadius: "999px",
              border: "1px solid rgba(22,33,43,0.14)",
              padding: "10px 20px",
              fontSize: 22,
              color: INK,
              background: "rgba(251,250,247,0.9)",
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>,
    size
  );
}
