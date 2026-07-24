import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";

// Farms/agriculture landing page — same Route Handler pattern as
// solar-za-doma: serves the approved raw HTML, bypassing the [locale]
// layout tree so the page keeps its own fonts/styles byte-identical to the
// master design. Read per-request (no force-static) to avoid the Windows
// build-worker cwd casing ENOENT described in the solar-za-doma route.

const HTML_PATH = path.join(process.cwd(), "src/app/bg/lp/solar-za-stopanstva/page.html");

export async function GET() {
  const html = await readFile(HTML_PATH, "utf8");
  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}
