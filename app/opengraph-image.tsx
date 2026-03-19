import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Asymmetric.al";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
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
            width: "100%",
            borderRadius: "36px",
            border: "1px solid rgba(22,33,43,0.12)",
            background: "rgba(252,251,248,0.88)",
            boxShadow: "0 26px 80px -50px rgba(22,33,43,0.5)",
            padding: "44px",
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
          <div style={{ display: "flex", flexDirection: "column", gap: "28px", maxWidth: "760px", zIndex: 1 }}>
            <div
              style={{
                display: "inline-flex",
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
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minWidth: "62px",
                  height: "62px",
                  borderRadius: "999px",
                  background: "linear-gradient(135deg, #DDF2FF, #E7EEE1)",
                  color: "#1E3A4F",
                  padding: "0 14px",
                }}
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "21px",
                      fontWeight: 700,
                      lineHeight: 1,
                    }}
                  >
                    1
                  </span>
                  <span
                    style={{
                      position: "relative",
                      display: "inline-flex",
                      width: "20px",
                      height: "10px",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        top: "4px",
                        left: 0,
                        right: "4px",
                        height: "2px",
                        background: "#1E3A4F",
                      }}
                    />
                    <span
                      style={{
                        position: "absolute",
                        right: 0,
                        top: "1px",
                        width: "6px",
                        height: "6px",
                        borderTop: "2px solid #1E3A4F",
                        borderRight: "2px solid #1E3A4F",
                        transform: "rotate(45deg)",
                      }}
                    />
                  </span>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginLeft: "-2px",
                    }}
                  >
                    {[0, -5].map((offset) => (
                      <span
                        key={offset}
                        style={{
                          width: "10px",
                          height: "8px",
                          marginLeft: `${offset}px`,
                          border: "2px solid #1E3A4F",
                          borderRadius: "999px",
                        }}
                      />
                    ))}
                  </span>
                </span>
              </span>
              Mission Operating System
            </div>
            <div style={{ fontSize: 76, lineHeight: 0.94, fontWeight: 700, letterSpacing: "-0.08em" }}>
              Run the Work In One Place
            </div>
            <div style={{ fontSize: 30, lineHeight: 1.45, color: "#435361", maxWidth: "820px" }}>
              Less admin. More ministry. The unified platform for the modern
              missions agency.
            </div>
            <div
              style={{
                display: "flex",
                gap: "14px",
                flexWrap: "wrap",
                marginTop: "8px",
              }}
            >
              {[
                "Open source core",
                "Tenant sovereignty",
                "Nonprofit 501(c)(3)",
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
        </div>
      </div>
    ),
    size
  );
}
