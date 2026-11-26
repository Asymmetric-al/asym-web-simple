import { readFileSync } from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";
import {
  MARK_DATUM_PATH,
  MARK_FRAME_RECT,
  MARK_SWEEP_PATH,
  MARK_VIEWBOX,
} from "@/components/site/brand/mark-geometry";
import { isEarlyAccessConfigured } from "@/lib/early-access-config";
import { siteMetadata } from "@/lib/metadata";

export const alt = siteMetadata.socialTitle;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const FONTS_DIR = path.join(process.cwd(), "lib", "fonts");
const jakartaBold = readFileSync(path.join(FONTS_DIR, "PlusJakartaSans-Bold.ttf"));
const instrumentMedium = readFileSync(
  path.join(FONTS_DIR, "InstrumentSans-Medium.ttf")
);
const instrumentSemiBold = readFileSync(
  path.join(FONTS_DIR, "InstrumentSans-SemiBold.ttf")
);
const geistMonoMedium = readFileSync(
  path.join(FONTS_DIR, "GeistMono-Medium.ttf")
);

const BG = "#101214";
const SURFACE = "#171A1D";
const INK = "#F1F0EC";
const MUTED = "#A4ABB1";
const SIGNAL = "#8FC9A9";
const HUMAN_LIGHT = "#D3876B";
const RULE = "rgba(241,240,236,0.12)";
const RULE_STRONG = "rgba(241,240,236,0.20)";
const SPACE_BETWEEN = "space-between";
const FONT_HEADING = '"Plus Jakarta Sans"';
const FONT_SANS = '"Instrument Sans"';
const FONT_MONO = '"Geist Mono"';

export default function openGraphImage() {
  const isConfigured = isEarlyAccessConfigured();

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        position: "relative",
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
      {/* Left column: Warm Charcoal Night Maia proposition */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: SPACE_BETWEEN,
          width: "548px",
          paddingTop: "4px",
          paddingBottom: "4px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <svg
              width="34"
              height="37"
              viewBox={MARK_VIEWBOX}
              fill="none"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x={MARK_FRAME_RECT.x}
                y={MARK_FRAME_RECT.y}
                width={MARK_FRAME_RECT.width}
                height={MARK_FRAME_RECT.height}
                rx={MARK_FRAME_RECT.rx}
                stroke={INK}
                strokeWidth="44"
              />
              <path
                d={MARK_DATUM_PATH}
                stroke={INK}
                strokeWidth="44"
                strokeLinecap="round"
              />
              <path
                d={MARK_SWEEP_PATH}
                stroke={INK}
                strokeWidth="44"
                strokeLinecap="round"
              />
            </svg>
            <span
              style={{
                fontFamily: FONT_HEADING,
                fontSize: 28,
                fontWeight: 700,
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
              fontFamily: FONT_SANS,
              fontSize: 18,
              fontWeight: 500,
              color: SIGNAL,
            }}
          >
            Open-source software for Christian missions organizations
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontFamily: FONT_HEADING,
              fontSize: 56,
              lineHeight: 1.04,
              fontWeight: 700,
              letterSpacing: "-0.035em",
              color: INK,
            }}
          >
            Run a large mission
          </div>
          <div
            style={{
              fontFamily: FONT_HEADING,
              fontSize: 56,
              lineHeight: 1.06,
              fontWeight: 700,
              letterSpacing: "-0.035em",
              color: INK,
            }}
          >
            from a small office.
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
            Your website, giving, donor care, missionary micro-CRMs, and office
            workflows on one shared ground truth.
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
              fontSize: 16,
              fontWeight: 500,
              color: MUTED,
            }}
          >
            <span>Built by Asymmetric.al</span>
            <span style={{ fontFamily: FONT_MONO, fontSize: 15, color: INK }}>
              AGPL-3.0-only &middot; asym.app
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontSize: 16,
              fontWeight: 600,
              color: INK,
            }}
          >
            <span
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "999px",
                background: isConfigured ? HUMAN_LIGHT : "transparent",
                border: isConfigured ? "none" : `1.5px dashed ${MUTED}`,
              }}
            />
            <span>
              {isConfigured
                ? "Open-source Core is public on GitHub. Early access is open for hosted pilots."
                : "Open-source Core is public on GitHub. Hosted early access opens soon."}
            </span>
          </div>
        </div>
      </div>

      {/* Right column: soft Maia Warm Charcoal Night sculptural asym planes */}
      <div
        style={{
          display: "flex",
          width: "500px",
          height: "538px",
          borderRadius: "26px",
          border: `1px solid ${RULE_STRONG}`,
          background: "#171A1D",
          padding: "18px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "464px",
            height: "502px",
            borderRadius: "20px",
            border: `1px solid ${RULE}`,
            overflow: "hidden",
            background: "#23272A",
          }}
        >
          <svg
            width="464"
            height="502"
            viewBox="0 0 464 502"
            fill="none"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="0" y="0" width="464" height="502" fill="#23272A" />
            <path
              d="M 0 0 H 464 V 216 C 380 156, 284 134, 180 150 C 102 162, 44 194, 0 234 Z"
              fill="#28211E"
              fillOpacity="0.86"
            />
            <path
              d="M 162 0 H 464 V 502 H 144 C 150 366, 156 184, 162 0 Z"
              fill="#303931"
            />
            <path
              d="M 0 196 C 52 164, 108 154, 166 160 V 502 H 0 Z"
              fill="#23272A"
              fillOpacity="0.86"
            />
            <path
              d="M 174 0 H 244 C 206 66, 192 150, 206 234 C 226 354, 316 414, 464 416 V 502 H 266 C 184 502, 142 432, 142 320 V 128 C 142 66, 152 24, 174 0 Z"
              fill="#7BB093"
            />
            <path
              d="M 220 186 C 266 294, 354 354, 464 356 V 404 C 342 402, 250 338, 206 230 Z"
              fill={SURFACE}
              fillOpacity="0.24"
            />
            <path
              d="M 0 230 A 56 56 0 0 1 56 174 H 408 A 56 56 0 0 1 464 230"
              stroke="#C7846C"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
            <path
              d="M 172 174 C 264 174, 356 226, 432 336"
              stroke={SURFACE}
              strokeOpacity="0.58"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="162" cy="174" r="12" fill={SURFACE} />
            <circle cx="162" cy="174" r="5.5" fill="#C7846C" />
          </svg>
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "Plus Jakarta Sans",
          data: jakartaBold,
          style: "normal",
          weight: 700,
        },
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
          name: "Geist Mono",
          data: geistMonoMedium,
          style: "normal",
          weight: 500,
        },
      ],
    }
  );
}
