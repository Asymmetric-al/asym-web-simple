/* eslint-disable @next/next/no-img-element -- ImageResponse renders plain img elements. */
import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { isEarlyAccessConfigured } from "@/lib/early-access-config";
import { siteMetadata } from "@/lib/metadata";

export const runtime = "nodejs";
export const alt = siteMetadata.socialTitle;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const BG = "#FAF9F6";
const SURFACE = "#FFFFFF";
const INK = "#14171A";
const MUTED = "#525860";
const SIGNAL = "#156651";
const HUMAN = "#BF3E24";
const RULE = "rgba(20,23,26,0.12)";
const SPACE_BETWEEN = "space-between";
const FONT_SANS = '"Instrument Sans"';
const FONT_MONO = '"IBM Plex Mono"';

export default async function openGraphImage() {
  const [logoData, instrumentMedium, instrumentSemiBold, plexMonoMedium] =
    await Promise.all([
      readFile(
        path.join(process.cwd(), "public", "brand", "asym-mark-dark.png"),
        "base64"
      ),
      readFile(
        path.join(process.cwd(), "lib", "fonts", "InstrumentSans-Medium.ttf")
      ),
      readFile(
        path.join(process.cwd(), "lib", "fonts", "InstrumentSans-SemiBold.ttf")
      ),
      readFile(
        path.join(process.cwd(), "lib", "fonts", "IBMPlexMono-Medium.ttf")
      ),
    ]);
  const logoSrc = `data:image/png;base64,${logoData}`;
  const isConfigured = isEarlyAccessConfigured();

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        background: BG,
        padding: "46px 54px",
        fontFamily: FONT_SANS,
        color: INK,
        justifyContent: SPACE_BETWEEN,
        alignItems: "stretch",
        gap: "44px",
      }}
    >
      {/* Left column: warm modern nonprofit proposition */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: SPACE_BETWEEN,
          width: "540px",
          paddingTop: "4px",
          paddingBottom: "4px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <img
            src={logoSrc}
            alt=""
            width={40}
            height={40}
            style={{ display: "block", objectFit: "contain" }}
          />
          <span
            style={{
              fontSize: 30,
              fontWeight: 600,
              letterSpacing: "-0.03em",
            }}
          >
            asym
          </span>
          <span style={{ color: RULE, fontSize: 22 }}>|</span>
          <span style={{ fontSize: 16, fontWeight: 600, color: SIGNAL }}>
            Open source &middot; AGPL-3.0-only
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 70,
              lineHeight: 0.98,
              fontWeight: 600,
              letterSpacing: "-0.04em",
            }}
          >
            Less overhead.
          </div>
          <div
            style={{
              fontSize: 70,
              lineHeight: 1.04,
              fontWeight: 600,
              letterSpacing: "-0.04em",
              color: INK,
            }}
          >
            Outsized impact.
          </div>
          <div
            style={{
              marginTop: "22px",
              fontSize: 21,
              lineHeight: 1.45,
              fontWeight: 500,
              color: MUTED,
            }}
          >
            Open-source giving and donor-care software for nonprofits of any
            size, with practical AI in development.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            borderTop: `1px solid ${RULE}`,
            paddingTop: "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: SPACE_BETWEEN,
              alignItems: "center",
              fontSize: 17,
              fontWeight: 500,
              color: MUTED,
            }}
          >
            <span>Built by Asymmetric.al</span>
            <span style={{ fontFamily: FONT_MONO, fontSize: 15, color: INK }}>
              asym.app
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: 17,
              fontWeight: 600,
              color: INK,
            }}
          >
            <span
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "999px",
                background: isConfigured ? HUMAN : "transparent",
                border: isConfigured ? "none" : `2px dashed ${MUTED}`,
              }}
            />
            <span>
              {isConfigured
                ? "Early access requests open"
                : "Hosted access not open yet"}{" "}
              &middot; AI tools in development
            </span>
          </div>
        </div>
      </div>

      {/* Right column: warm sculptural asym architectural planes */}
      <div
        style={{
          display: "flex",
          width: "508px",
          height: "538px",
          borderRadius: "28px",
          border: "1px solid rgba(20,23,26,0.12)",
          background: "#F3F1EB",
          padding: "20px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "468px",
            height: "498px",
            borderRadius: "22px",
            border: "1px solid rgba(20,23,26,0.16)",
            overflow: "hidden",
            background: "#F5F2EB",
          }}
        >
          <svg
            width="468"
            height="498"
            viewBox="0 0 468 498"
            fill="none"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="0" y="0" width="468" height="498" fill="#F5F2EB" />
            <path
              d="M 0 0 H 468 V 214 C 384 154, 286 132, 182 148 C 102 160, 44 192, 0 232 Z"
              fill="#F2DBD3"
              fillOpacity="0.78"
            />
            <path
              d="M 164 0 H 468 V 498 H 146 C 152 364, 158 182, 164 0 Z"
              fill="#D5E8E0"
            />
            <path
              d="M 0 194 C 52 162, 108 152, 168 158 V 498 H 0 Z"
              fill="#E7E2D7"
              fillOpacity="0.78"
            />
            <path
              d="M 176 0 H 246 C 208 66, 194 148, 208 232 C 228 352, 318 412, 468 414 V 498 H 268 C 186 498, 144 428, 144 318 V 126 C 144 64, 154 24, 176 0 Z"
              fill={SIGNAL}
            />
            <path
              d="M 222 184 C 268 292, 356 352, 468 354 V 402 C 344 400, 252 336, 208 228 Z"
              fill={SURFACE}
              fillOpacity="0.24"
            />
            <path
              d="M 0 228 A 56 56 0 0 1 56 172 H 412 A 56 56 0 0 1 468 228"
              stroke="#C9583E"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
            <path
              d="M 174 172 C 266 172, 358 224, 434 334"
              stroke={SURFACE}
              strokeOpacity="0.62"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="164" cy="172" r="12" fill={SURFACE} />
            <circle cx="164" cy="172" r="5.5" fill="#C9583E" />
          </svg>
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "Instrument Sans",
          data: instrumentMedium,
          style: "normal",
          weight: 500,
        },
        {
          name: "Instrument Sans",
          data: instrumentSemiBold,
          style: "normal",
          weight: 600,
        },
        {
          name: "IBM Plex Mono",
          data: plexMonoMedium,
          style: "normal",
          weight: 500,
        },
      ],
    }
  );
}
