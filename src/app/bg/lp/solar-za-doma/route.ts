import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";

// Standalone landing page (design/copy owner-approved). Served as raw HTML
// via a Route Handler — deliberately bypassing the app's [locale] layout
// tree (which renders its own <html>/<body>) so this page keeps its own
// fonts/styles byte-identical to the approved design, with no site
// header/footer wrapper. See research/funnels/opus-landing-original.html
// for the untouched reference copy and research/funnels/OWNER-CONFIRM.md
// for the fact-check checklist pending owner sign-off.
//
// Not prerendered (no `dynamic = "force-static"`): forcing static export
// makes Next read this file from a build worker whose resolved cwd can
// differ in path casing from the dev-server cwd on Windows, causing an
// ENOENT at build time. Reading it per-request avoids that entirely and
// costs nothing meaningful for a low-traffic landing page.

const HTML_PATH = path.join(process.cwd(), "src/app/bg/lp/solar-za-doma/page.html");

export async function GET() {
  const html = await readFile(HTML_PATH, "utf8");
  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}
