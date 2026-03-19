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
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <div
              style={{
                fontSize: 42,
                fontWeight: 700,
                lineHeight: 1,
              }}
            >
              1
            </div>
            <div
              style={{
                display: "flex",
                position: "relative",
                width: 34,
                height: 14,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 6,
                  left: 0,
                  right: 7,
                  height: 2.5,
                  background: "#1E3A4F",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  right: 1,
                  top: 2,
                  width: 10,
                  height: 10,
                  borderTop: "2.5px solid #1E3A4F",
                  borderRight: "2.5px solid #1E3A4F",
                  transform: "rotate(45deg)",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: -2,
              }}
            >
              {[0, -8].map((offset) => (
                <div
                  key={offset}
                  style={{
                    width: 20,
                    height: 16,
                    marginLeft: offset,
                    border: "2.5px solid #1E3A4F",
                    borderRadius: 999,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
