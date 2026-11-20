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
const INK = "#12202B";
const MUTED = "#485763";
const PINE = "#1B574C";
const DRAFT = "#4A5966";
const RULE = "rgba(18,32,43,0.18)";
const SPACE_BETWEEN = "space-between";
const FONT_NEWSREADER = '"Newsreader"';
const FONT_MONO = '"IBM Plex Mono"';

export default async function openGraphImage() {
  const [
    logoData,
    plateData,
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
      path.join(process.cwd(), "lib", "art", "three-hands-og.png"),
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
  const plateSrc = `data:image/png;base64,${plateData}`;

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        background: PAPER,
        padding: "44px 52px",
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
          width: "510px",
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
          <span style={{ fontSize: 17, fontWeight: 500, color: PINE }}>
            Open source &middot; AGPL-3.0-only
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontFamily: FONT_NEWSREADER,
              fontSize: 88,
              lineHeight: 0.95,
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
              fontSize: 88,
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
              marginTop: "22px",
              fontSize: 21,
              lineHeight: 1.44,
              fontWeight: 500,
              color: MUTED,
            }}
          >
            Donor portals, self-service receipts, redacted missionary rosters,
            and office CRM on one shared open-source record.
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
            <span>Built by Asymmetric.al &middot; Missions organizations</span>
            <span style={{ fontFamily: FONT_MONO, fontSize: 15, color: INK }}>
              asym.app
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: 15,
              color: DRAFT,
            }}
          >
            <span
              style={{
                width: "9px",
                height: "9px",
                borderRadius: "999px",
                border: `1.5px dashed ${DRAFT}`,
              }}
            />
            <span>
              Hosted teams &amp; human-approved AI appeals in development
            </span>
          </div>
        </div>
      </div>

      {/* Right embossed Hero Plate I copperplate triptych — unified art direction, zero fake UI */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          justifyContent: SPACE_BETWEEN,
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "414px",
            overflow: "hidden",
            border: `1px solid rgba(18,32,43,0.32)`,
            background: SHEET,
            padding: "8px",
          }}
        >
          <img
            src={plateSrc}
            alt=""
            width={530}
            height={398}
            style={{
              display: "block",
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: SPACE_BETWEEN,
            alignItems: "center",
            padding: "16px 2px 4px",
            borderTop: `1px solid ${RULE}`,
            gap: "12px",
          }}
        >
          {[
            { num: "01", role: "Donor", detail: "Portal & receipts" },
            { num: "02", role: "Missionary", detail: "Redacted roster" },
            { num: "03", role: "Office", detail: "Ledger & CRM" },
          ].map((item) => (
            <div
              key={item.num}
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span
                  style={{
                    fontFamily: FONT_MONO,
                    fontSize: 14,
                    color: PINE,
                    fontWeight: 500,
                  }}
                >
                  {item.num}
                </span>
                <span style={{ fontSize: 17, fontWeight: 600, color: INK }}>
                  {item.role}
                </span>
              </div>
              <span
                style={{
                  fontSize: 14,
                  color: MUTED,
                  marginTop: "2px",
                }}
              >
                {item.detail}
              </span>
            </div>
          ))}
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
