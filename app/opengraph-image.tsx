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
const MUTED = "#54636F";
const FONT_FAMILY = "Plus Jakarta Sans";

export default async function openGraphImage() {
  const [logoData, mediumFont, semiBoldFont, boldFont] = await Promise.all([
    readFile(
      path.join(process.cwd(), "public", "brand", "asym-mark-dark.png"),
      "base64"
    ),
    readFile(
      path.join(process.cwd(), "lib", "fonts", "PlusJakartaSans-Medium.ttf")
    ),
    readFile(
      path.join(process.cwd(), "lib", "fonts", "PlusJakartaSans-SemiBold.ttf")
    ),
    readFile(
      path.join(process.cwd(), "lib", "fonts", "PlusJakartaSans-Bold.ttf")
    ),
  ]);
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
        fontFamily: '"Plus Jakarta Sans"',
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
          style={{ fontSize: 40, fontWeight: 600, letterSpacing: "-0.04em" }}
        >
          asym
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <div
          style={{
            fontSize: 64,
            lineHeight: 1.04,
            fontWeight: 600,
            letterSpacing: "-0.045em",
          }}
        >
          Your website, fundraising, and CRM.
        </div>
        <div
          style={{
            fontSize: 64,
            lineHeight: 1.04,
            fontWeight: 600,
            letterSpacing: "-0.045em",
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
              border: "1px solid rgba(22,33,43,0.16)",
              padding: "10px 20px",
              fontSize: 21,
              fontWeight: 500,
              color: INK,
              background: "rgba(251,250,247,0.92)",
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: FONT_FAMILY,
          data: mediumFont,
          style: "normal",
          weight: 500,
        },
        {
          name: FONT_FAMILY,
          data: semiBoldFont,
          style: "normal",
          weight: 600,
        },
        {
          name: FONT_FAMILY,
          data: boldFont,
          style: "normal",
          weight: 700,
        },
      ],
    }
  );
}
