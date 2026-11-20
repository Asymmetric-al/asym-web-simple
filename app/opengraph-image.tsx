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
const RING = "#235D85";
const DATUM_BORDER = "1.5px solid rgba(30,58,79,0.18)";
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
        background: "#f6f2ea",
        padding: "28px",
        fontFamily: '"Plus Jakarta Sans"',
        color: INK,
      }}
    >
      {/* Card framed like the official asym mark with a Datum Lid record band */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          background: "#fbfaf7",
          border: "2px solid rgba(30,58,79,0.22)",
          borderRadius: "56px",
          overflow: "hidden",
        }}
      >
        {/* Upper mark chamber: brand wordmark + status */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "152px",
            padding: "0 56px",
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
              style={{
                fontSize: 40,
                fontWeight: 600,
                letterSpacing: "-0.03em",
              }}
            >
              asym
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              fontSize: 22,
              fontWeight: 500,
              color: MUTED,
            }}
          >
            <span
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "999px",
                background: RING,
              }}
            />
            <span>Launching soon</span>
          </div>
        </div>

        {/* Lower Datum Lid band (Pressed Parchment) */}
        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-between",
            background: "#f3eee4",
            borderTop: DATUM_BORDER,
            borderLeft: DATUM_BORDER,
            borderRight: DATUM_BORDER,
            borderTopLeftRadius: "52px",
            borderTopRightRadius: "52px",
            marginLeft: "-1.5px",
            marginRight: "-1.5px",
            padding: "48px 56px 44px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div
              style={{
                fontSize: 56,
                lineHeight: 1.06,
                fontWeight: 600,
                letterSpacing: "-0.03em",
              }}
            >
              Website, giving, and donor records.
            </div>
            <div
              style={{
                fontSize: 56,
                lineHeight: 1.06,
                fontWeight: 600,
                letterSpacing: "-0.03em",
                color: MUTED,
              }}
            >
              One platform built to work with AI.
            </div>
            <div
              style={{
                marginTop: "12px",
                fontSize: 23,
                lineHeight: 1.4,
                fontWeight: 500,
                color: MUTED,
              }}
            >
              Website, giving, receipts, and donor records in public code. AI
              workflows in development.
            </div>
          </div>

          <div style={{ display: "flex", gap: "14px" }}>
            {["Open source", "Starting with missions organizations"].map(
              (item) => (
                <div
                  key={item}
                  style={{
                    display: "flex",
                    borderRadius: "999px",
                    border: "1px solid rgba(30,58,79,0.18)",
                    padding: "10px 22px",
                    fontSize: 21,
                    fontWeight: 500,
                    color: INK,
                    background: "#fbfaf7",
                  }}
                >
                  {item}
                </div>
              )
            )}
          </div>
        </div>
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
