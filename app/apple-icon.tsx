import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "#16212B",
          borderRadius: 44,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 144,
            height: 144,
            borderRadius: 34,
            background: "linear-gradient(135deg, #DDF2FF, #E7EEE1)",
            color: "#1E3A4F",
            fontFamily:
              "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
            fontSize: 34,
            fontWeight: 700,
            letterSpacing: "-0.08em",
          }}
        >
          1→∞
        </div>
      </div>
    ),
    size
  );
}
