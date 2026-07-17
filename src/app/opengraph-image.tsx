import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "B_20 — Web Studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "#0a0a0b",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "#f59e0b",
              color: "#0a0a0b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
              fontWeight: 800,
            }}
          >
            B
          </div>
          <div style={{ color: "#f59e0b", fontSize: 32, fontWeight: 700, letterSpacing: 2 }}>
            B_20
          </div>
        </div>

        <div
          style={{
            marginTop: 48,
            color: "#fafafa",
            fontSize: 76,
            fontWeight: 800,
            lineHeight: 1.1,
            maxWidth: 1000,
          }}
        >
          نبني مواقع تعيش طويلاً
        </div>

        <div
          style={{
            marginTop: 28,
            color: "rgba(250,250,250,0.6)",
            fontSize: 30,
            maxWidth: 980,
            lineHeight: 1.4,
          }}
        >
          فريق B_20 يصمم ويطور تجارب رقمية سريعة، حديثة، وموثوقة.
        </div>
      </div>
    ),
    { ...size }
  );
}
