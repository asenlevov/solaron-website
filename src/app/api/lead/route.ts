import { NextRequest, NextResponse } from "next/server";

// Solaron's own lead-capture endpoint. The landing pages' form JS posts here
// (never directly to Sellinger, and never with the Sellinger site token in
// client JS). This route does minimal shape validation, then forwards
// server-side to Sellinger's landing-leads capture endpoint, attaching the
// token from an env var.
//
// Sellinger endpoint: POST https://app.sellinger.ai/api/landing-leads/capture
// — payload contract in sellinger.ai dev-docs/landing-leads-capture.md.
// The token goes in an Authorization: Bearer header; the body uses the
// endpoint's canonical snake_case keys.
//
// Required env vars (server-side only, never NEXT_PUBLIC_):
//   SELLINGER_CAPTURE_URL — https://app.sellinger.ai/api/landing-leads/capture
//   SOLARON_SITE_TOKEN    — shared secret, must equal the Sellinger
//                           deployment's LANDING_SITE_TOKEN_SOLARON

const MAX_FIELDS = 100;
const MAX_BODY_BYTES = 32 * 1024;

interface LeadRequestBody {
  elementId?: unknown;
  funnelSlug?: unknown;
  stepSlug?: unknown;
  segment?: unknown;
  utm?: unknown;
  fields?: unknown;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export async function POST(request: NextRequest) {
  const contentLength = request.headers.get("content-length");
  if (contentLength && Number(contentLength) > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: "Request body too large" }, { status: 413 });
  }

  let body: LeadRequestBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  if (!isPlainObject(body.fields)) {
    return NextResponse.json({ ok: false, error: "fields is required" }, { status: 400 });
  }
  if (Object.keys(body.fields).length > MAX_FIELDS) {
    return NextResponse.json({ ok: false, error: "Too many fields" }, { status: 400 });
  }
  if (body.utm !== undefined && !isPlainObject(body.utm)) {
    return NextResponse.json({ ok: false, error: "utm must be an object" }, { status: 400 });
  }
  for (const key of ["funnelSlug", "stepSlug", "segment", "elementId"] as const) {
    if (body[key] !== undefined && typeof body[key] !== "string") {
      return NextResponse.json({ ok: false, error: `${key} must be a string` }, { status: 400 });
    }
  }
  if (typeof body.funnelSlug !== "string" || !body.funnelSlug) {
    return NextResponse.json({ ok: false, error: "funnelSlug is required" }, { status: 400 });
  }

  const captureUrl = process.env.SELLINGER_CAPTURE_URL;
  const siteToken = process.env.SOLARON_SITE_TOKEN;
  if (!captureUrl || !siteToken) {
    console.error("[api/lead] Missing SELLINGER_CAPTURE_URL or SOLARON_SITE_TOKEN env var");
    return NextResponse.json({ ok: false, error: "Lead capture is not configured" }, { status: 503 });
  }

  try {
    const upstreamResponse = await fetch(captureUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${siteToken}`,
      },
      body: JSON.stringify({
        funnel_slug: body.funnelSlug,
        step_slug: body.stepSlug,
        segment: body.segment,
        element_id: body.elementId,
        page_url: request.headers.get("referer") || undefined,
        utm: body.utm,
        fields: body.fields,
      }),
    });

    const upstreamBody = await upstreamResponse.json().catch(() => null);
    if (!upstreamResponse.ok || !upstreamBody?.ok) {
      console.error(
        "[api/lead] Sellinger capture rejected the lead:",
        upstreamResponse.status,
        upstreamBody?.error,
      );
      return NextResponse.json(
        { ok: false, error: upstreamBody?.error || "Lead capture failed" },
        { status: upstreamResponse.status || 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[api/lead] Failed to reach Sellinger capture endpoint", error);
    return NextResponse.json({ ok: false, error: "Lead capture is temporarily unavailable" }, { status: 502 });
  }
}
