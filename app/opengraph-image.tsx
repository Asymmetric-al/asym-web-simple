/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const runtime = "nodejs";
export const alt = "Asym is being built for missions organizations";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function OpengraphImage() {
  const logoData = await readFile(
    join(process.cwd(), "public", "brand", "asym-mark-dark.png"),
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
          "linear-gradient(135deg, #f4f9fd 0%, #faf6ef 52%, #e7eee1 100%)",
        color: "#16212B",
        padding: "56px",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          borderRadius: "36px",
          border: "1px solid rgba(22,33,43,0.12)",
          background: "rgba(252,251,248,0.88)",
          boxShadow: "0 26px 80px -50px rgba(22,33,43,0.5)",
          padding: "48px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "auto -80px -140px auto",
            width: "340px",
            height: "340px",
            borderRadius: "999px",
            background: "rgba(221,242,255,0.85)",
            filter: "blur(18px)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "28px",
            maxWidth: "820px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              fontSize: "22px",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#4E82AD",
            }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "62px",
                height: "62px",
                borderRadius: "999px",
                background: "rgba(246,242,234,0.72)",
                border: "1px solid rgba(22,33,43,0.12)",
              }}
            >
              <img
                src={logoSrc}
                alt=""
                width={40}
                height={40}
                style={{ display: "block", objectFit: "contain" }}
              />
            </span>
            Asym
          </div>
          <div
            style={{
              fontSize: 74,
              lineHeight: 0.96,
              fontWeight: 700,
              letterSpacing: "-0.075em",
            }}
          >
            We&apos;re building Asym.
          </div>
          <div
            style={{
              fontSize: 30,
              lineHeight: 1.38,
              color: "#435361",
              maxWidth: "860px",
            }}
          >
            A product for Christian missions organizations. Early, unfinished,
            and worth building.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: "14px",
            flexWrap: "wrap",
          }}
        >
          {[
            "No customers yet",
            "A few organizations waiting",
            "Building nonstop",
          ].map((item) => (
            <div
              key={item}
              style={{
                borderRadius: "999px",
                border: "1px solid rgba(22,33,43,0.12)",
                padding: "10px 16px",
                fontSize: "18px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#5C6C78",
                background: "rgba(250,246,239,0.85)",
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>,
    size
  );
}
