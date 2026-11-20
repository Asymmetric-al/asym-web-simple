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

const PAPER = "#F3EEE3";
const SHEET = "#FCFBF7";
const RECORD = "#E9E2D2";
const INK = "#12202B";
const MUTED = "#485763";
const PINE = "#1B574C";
const PINE_SOFT = "#E3EEE9";
const RULE = "rgba(18,32,43,0.18)";
const SPACE_BETWEEN = "space-between";
const FONT_NEWSREADER = '"Newsreader"';
const FONT_MONO = '"IBM Plex Mono"';

export default async function openGraphImage() {
  const [
    logoData,
    newsreaderRegular,
    newsreaderSemiBold,
    newsreaderItalic,
    instrumentMedium,
    instrumentSemiBold,
    plexMonoMedium,
  ] = await Promise.all([
    readFile(
      path.join(process.cwd(), "public", "brand", "asym-mark-dark.png"),
      "base64"
    ),
    readFile(
      path.join(process.cwd(), "lib", "fonts", "Newsreader-Regular.ttf")
    ),
    readFile(
      path.join(process.cwd(), "lib", "fonts", "Newsreader-SemiBold.ttf")
    ),
    readFile(path.join(process.cwd(), "lib", "fonts", "Newsreader-Italic.ttf")),
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

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        background: PAPER,
        padding: "46px 54px",
        fontFamily: '"Instrument Sans"',
        color: INK,
        justifyContent: SPACE_BETWEEN,
        alignItems: "stretch",
        gap: "44px",
      }}
    >
      {/* Left editorial column */}
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
            width={42}
            height={42}
            style={{ display: "block", objectFit: "contain" }}
          />
          <span
            style={{
              fontSize: 32,
              fontWeight: 600,
              letterSpacing: "-0.03em",
            }}
          >
            asym
          </span>
          <span style={{ color: RULE, fontSize: 22 }}>|</span>
          <span style={{ fontSize: 18, fontWeight: 500, color: PINE }}>
            Open source &middot; AGPL-3.0-only
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontFamily: FONT_NEWSREADER,
              fontSize: 86,
              lineHeight: 0.96,
              fontWeight: 600,
              letterSpacing: "-0.03em",
            }}
          >
            One gift.
          </div>
          <div
            style={{
              fontFamily: FONT_NEWSREADER,
              fontStyle: "italic",
              fontSize: 86,
              lineHeight: 1,
              fontWeight: 500,
              letterSpacing: "-0.03em",
              color: INK,
            }}
          >
            Three hands.
          </div>
          <div
            style={{
              marginTop: "24px",
              fontSize: 23,
              lineHeight: 1.44,
              fontWeight: 500,
              color: MUTED,
            }}
          >
            Giving pages, receipts, donor records, and missionary updates on one
            shared record.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            borderTop: `1px solid ${RULE}`,
            paddingTop: "18px",
            fontSize: 18,
            fontWeight: 500,
            color: MUTED,
          }}
        >
          <span>
            Built by Asymmetric.al &nbsp;&middot;&nbsp; Starting with missions
            organizations
          </span>
        </div>
      </div>

      {/* Right specimen card — legible at social thumbnail widths */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          background: RECORD,
          border: `1.5px solid rgba(18,32,43,0.28)`,
          borderRadius: "24px",
          padding: "24px",
          justifyContent: SPACE_BETWEEN,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: SPACE_BETWEEN,
            alignItems: "center",
            fontFamily: FONT_MONO,
            fontSize: 15,
            color: MUTED,
          }}
        >
          <span>SAMPLE &middot; GIFT-0418</span>
          <span
            style={{
              background: PINE_SOFT,
              color: PINE,
              borderRadius: "999px",
              padding: "5px 14px",
              fontWeight: 500,
            }}
          >
            In public code
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            background: SHEET,
            border: `1.5px solid rgba(18,32,43,0.22)`,
            borderRadius: "16px",
            padding: "28px",
            marginTop: "16px",
            flex: 1,
            justifyContent: SPACE_BETWEEN,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: SPACE_BETWEEN,
              alignItems: "flex-start",
              borderBottom: `1px solid ${RULE}`,
              paddingBottom: "20px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: 15,
                  color: PINE,
                }}
              >
                RECEIPT #R-0418 &middot; SETTLED
              </span>
              <span
                style={{
                  fontFamily: FONT_NEWSREADER,
                  fontSize: 30,
                  fontWeight: 600,
                  marginTop: "6px",
                }}
              >
                Official Gift Receipt
              </span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "3px",
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  fontFamily: FONT_NEWSREADER,
                  fontSize: 34,
                  fontWeight: 600,
                }}
              >
                $100
              </span>
              <span
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: 15,
                  color: MUTED,
                }}
              >
                /mo
              </span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "14px",
              marginTop: "20px",
            }}
          >
            {[
              { role: "Donor", detail: "Receipt & portal history" },
              { role: "Missionary", detail: "Partner roster & redaction" },
              { role: "Office", detail: "Fund 310-EAST-WATER & CRM" },
            ].map((item) => (
              <div
                key={item.role}
                style={{
                  display: "flex",
                  justifyContent: SPACE_BETWEEN,
                  alignItems: "center",
                  background: PAPER,
                  borderRadius: "12px",
                  padding: "14px 18px",
                }}
              >
                <span style={{ fontSize: 20, fontWeight: 600, color: INK }}>
                  {item.role}
                </span>
                <span style={{ fontSize: 18, fontWeight: 500, color: MUTED }}>
                  {item.detail}
                </span>
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: SPACE_BETWEEN,
              alignItems: "center",
              marginTop: "18px",
              paddingTop: "16px",
              borderTop: `1px solid ${RULE}`,
              fontFamily: FONT_MONO,
              fontSize: 12,
              color: PINE,
            }}
          >
            <span>apps/donor &middot; apps/missionary &middot; apps/admin</span>
            <span style={{ color: MUTED, flexShrink: 0 }}>asym.app</span>
          </div>
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "Newsreader",
          data: newsreaderRegular,
          style: "normal",
          weight: 400,
        },
        {
          name: "Newsreader",
          data: newsreaderSemiBold,
          style: "normal",
          weight: 600,
        },
        {
          name: "Newsreader",
          data: newsreaderItalic,
          style: "italic",
          weight: 500,
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
          name: "IBM Plex Mono",
          data: plexMonoMedium,
          style: "normal",
          weight: 500,
        },
      ],
    }
  );
}
