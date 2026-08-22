import { NextRequest, NextResponse } from "next/server";

import {
  sendServerEvent,
  type ContactFields,
  type MetaEventName,
} from "@/lib/facebook-capi";
import { CONSENT_COOKIE_NAME } from "@/lib/tracking/consent";

/*
 * Server half of the Meta pixel.
 *
 * The browser fires fbq() and posts the same event id here; this route enriches
 * the event with things the browser cannot be trusted for (IP, user agent) or
 * must not send in the clear (contact details, which are hashed downstream) and
 * forwards it to the Conversions API.
 *
 * Consent is checked here as well as in the browser. The client gate protects
 * the visitor's device; this one protects the network call, and it is the gate
 * that still holds if someone posts to this endpoint directly.
 */

const ALLOWED_EVENTS: readonly MetaEventName[] = ["Lead", "ViewContent"];
const MAX_BODY_BYTES = 8 * 1024;

interface TrackRequestBody {
  eventName?: unknown;
  eventId?: unknown;
  sourceUrl?: unknown;
  params?: unknown;
  contact?: unknown;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

/** Only the fields Meta can match on; anything else the client sends is dropped. */
function readContact(value: unknown): ContactFields | undefined {
  if (!isPlainObject(value)) return undefined;
  return {
    email: asString(value.email),
    phone: asString(value.phone),
    firstName: asString(value.firstName),
    lastName: asString(value.lastName),
    city: asString(value.city),
    /* The site sells and installs in Bulgaria only. */
    country: "bg",
  };
}

/**
 * Meta's click id. Normally the pixel writes `_fbc`, but on the very first page
 * view the visitor arrives with `?fbclid=` before fbevents.js has run, so the
 * cookie does not exist yet. Rebuilding it from the URL is what keeps the first
 * ad click attributable — which is the whole point for this account.
 */
function resolveFbc(request: NextRequest, sourceUrl: string | undefined) {
  const cookie = request.cookies.get("_fbc")?.value;
  if (cookie) return cookie;
  if (!sourceUrl) return undefined;
  try {
    const fbclid = new URL(sourceUrl).searchParams.get("fbclid");
    return fbclid ? `fb.1.${Date.now()}.${fbclid}` : undefined;
  } catch {
    return undefined;
  }
}

function clientIp(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for");
  /* Vercel puts the real client first; the rest are proxies. */
  return forwarded?.split(",")[0]?.trim() || undefined;
}

export async function POST(request: NextRequest) {
  const contentLength = request.headers.get("content-length");
  if (contentLength && Number(contentLength) > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: "Body too large" }, { status: 413 });
  }

  /* No marketing consent, no event. Nothing is sent and nothing is stored. */
  if (request.cookies.get(CONSENT_COOKIE_NAME)?.value !== "all") {
    return new NextResponse(null, { status: 204 });
  }

  let body: TrackRequestBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const eventName = body.eventName as MetaEventName;
  if (!ALLOWED_EVENTS.includes(eventName)) {
    return NextResponse.json({ ok: false, error: "Unsupported event" }, { status: 400 });
  }

  const eventId = asString(body.eventId);
  if (!eventId) {
    /* Refusing rather than generating one: an id the browser did not use is
       worse than no server event, because it double-counts the conversion. */
    return NextResponse.json({ ok: false, error: "eventId is required" }, { status: 400 });
  }

  const sourceUrl = asString(body.sourceUrl);

  const result = await sendServerEvent({
    eventName,
    eventId,
    sourceUrl: sourceUrl ?? request.headers.get("referer") ?? "https://solaron.io",
    contact: readContact(body.contact),
    context: {
      clientIpAddress: clientIp(request),
      clientUserAgent: request.headers.get("user-agent") ?? undefined,
      fbp: request.cookies.get("_fbp")?.value,
      fbc: resolveFbc(request, sourceUrl),
    },
    customData: isPlainObject(body.params) ? body.params : undefined,
  });

  /* 202: we accepted it. A Meta-side failure is logged, not pushed at the
     visitor, whose form submission succeeded regardless. */
  return NextResponse.json(
    { ok: result.ok, eventId: result.eventId, eventsReceived: result.eventsReceived },
    { status: result.ok ? 200 : 202 },
  );
}
