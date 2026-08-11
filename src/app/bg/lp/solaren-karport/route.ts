import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";

// Homeowner solar-carport landing (written by Fable, 2026-07-23). Served as
// raw HTML via a Route Handler, bypassing the [locale] layout tree so the
// page keeps its own fonts/styles. Uses solaron's brand system (Space
// Grotesk/Inter, accent greens, dark #0a0f0a) — see globals.css tokens.
//
// Not prerendered: `dynamic = "force-static"` triggers a Windows
// path-casing ENOENT at build time (see ../solar-za-doma/route.ts).

const HTML_PATH = path.join(process.cwd(), "src/app/bg/lp/solaren-karport/page.html");

export async function GET() {
  const html = await readFile(HTML_PATH, "utf8");
  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}
