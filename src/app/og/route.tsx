import { ImageResponse } from "next/og";

export const runtime = "edge";

const ACCENT = "#3B7A2A";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title")?.trim() || "Solaron";
  const description =
    searchParams.get("description")?.trim() ||
    "Соларни решения за дома и бизнеса в България.";

  const maxTitleLen = 120;
  const maxDescLen = 220;
  const safeTitle = title.length > maxTitleLen ? `${title.slice(0, maxTitleLen - 1)}…` : title;
  const safeDesc =
    description.length > maxDescLen ? `${description.slice(0, maxDescLen - 1)}…` : description;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#ffffff",
          position: "relative",
        }}
      >
        <div
          style={{
            width: "100%",
            height: 12,
            background: ACCENT,
            flexShrink: 0,
          }}
        />
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            padding: 48,
            paddingTop: 56,
          }}
        >
          <div
            style={{
              fontSize: 28,
              fontWeight: 800,
              letterSpacing: "0.08em",
              color: "#171717",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            SOLARON
          </div>
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 24,
              paddingRight: 24,
              gap: 20,
            }}
          >
            <div
              style={{
                fontSize: 52,
                fontWeight: 700,
                lineHeight: 1.15,
                textAlign: "center",
                color: "#171717",
                fontFamily: "system-ui, sans-serif",
              }}
            >
              {safeTitle}
            </div>
            <div
              style={{
                fontSize: 26,
                lineHeight: 1.4,
                textAlign: "center",
                color: "#525252",
                maxWidth: 900,
                fontFamily: "system-ui, sans-serif",
              }}
            >
              {safeDesc}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              fontSize: 22,
              fontWeight: 600,
              color: "#a3a3a3",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            solaron.pro
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
