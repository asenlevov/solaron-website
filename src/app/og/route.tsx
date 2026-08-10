import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

import { OG_IMAGE_SIZE } from "@/lib/og";

const ACCENT = "#3B7A2A";
const FOREGROUND = "#171717";
const FOREGROUND_SECONDARY = "#525252";
const FOREGROUND_TERTIARY = "#a3a3a3";

const MAX_TITLE_LEN = 110;
const MAX_DESC_LEN = 180;
const MAX_EYEBROW_LEN = 40;

type Assets = {
  regular: Buffer;
  bold: Buffer;
  logo: string;
};

let assets: Promise<Assets> | undefined;

function loadAssets(): Promise<Assets> {
  assets ??= (async () => {
    const root = process.cwd();
    const [regular, bold, logo] = await Promise.all([
      readFile(join(root, "public", "fonts", "Inter-Regular.ttf")),
      readFile(join(root, "public", "fonts", "Inter-Bold.ttf")),
      readFile(join(root, "public", "logo-solaron.png")),
    ]);
    return {
      regular,
      bold,
      logo: `data:image/png;base64,${logo.toString("base64")}`,
    };
  })();
  return assets;
}

function clamp(value: string | null, max: number): string {
  const trimmed = value?.trim() ?? "";
  if (!trimmed) return "";
  return trimmed.length > max ? `${trimmed.slice(0, max - 1)}…` : trimmed;
}

/** Long Cyrillic headlines need a smaller size to stay on three lines. */
function titleFontSize(title: string): number {
  if (title.length > 80) return 46;
  if (title.length > 55) return 54;
  if (title.length > 32) return 64;
  return 72;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const title = clamp(searchParams.get("title"), MAX_TITLE_LEN) || "Solaron";
  const description =
    clamp(searchParams.get("description"), MAX_DESC_LEN) ||
    "Соларни решения за дома и бизнеса в България.";
  const eyebrow = clamp(searchParams.get("eyebrow"), MAX_EYEBROW_LEN);

  const { regular, bold, logo } = await loadAssets();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#ffffff",
          fontFamily: "Inter",
        }}
      >
        <div
          style={{
            width: "100%",
            height: 14,
            flexShrink: 0,
            background: `linear-gradient(90deg, ${ACCENT}, #2ecc71)`,
          }}
        />
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "56px 72px 48px 72px",
            position: "relative",
          }}
        >
          {/* Soft brand glow behind the lower-right corner */}
          <div
            style={{
              position: "absolute",
              right: -160,
              bottom: -220,
              width: 620,
              height: 620,
              borderRadius: 620,
              background:
                "radial-gradient(circle, rgba(59, 122, 42, 0.16) 0%, rgba(59, 122, 42, 0) 70%)",
            }}
          />

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo} alt="Solaron" width={280} height={48} />

          <div style={{ display: "flex", flexDirection: "column" }}>
            {eyebrow ? (
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: ACCENT,
                  marginBottom: 18,
                }}
              >
                {eyebrow}
              </div>
            ) : null}
            <div
              style={{
                fontSize: titleFontSize(title),
                fontWeight: 700,
                lineHeight: 1.14,
                letterSpacing: "-0.02em",
                color: FOREGROUND,
                maxWidth: 1000,
              }}
            >
              {title}
            </div>
            <div
              style={{
                marginTop: 22,
                fontSize: 27,
                lineHeight: 1.42,
                color: FOREGROUND_SECONDARY,
                maxWidth: 900,
              }}
            >
              {description}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <div
              style={{
                width: 44,
                height: 5,
                borderRadius: 5,
                background: ACCENT,
              }}
            />
            <div style={{ fontSize: 24, color: FOREGROUND_TERTIARY }}>
              solaron.io
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...OG_IMAGE_SIZE,
      fonts: [
        { name: "Inter", data: regular, weight: 400, style: "normal" },
        { name: "Inter", data: bold, weight: 700, style: "normal" },
      ],
      headers: {
        "cache-control": "public, max-age=31536000, immutable, no-transform",
      },
    },
  );
}
