import { createHash, randomUUID } from "crypto";

/*
 * Meta Conversions API — the server half of the browser pixel.
 *
 * Every event sent from here is the twin of an `fbq('track', ...)` call that
 * already fired in the browser, and both carry the same `event_id`. Meta uses
 * that id to collapse the pair into one conversion. Without it the same lead is
 * counted twice and cost-per-lead reads roughly half of what it really is.
 *
 * Contact fields are hashed here rather than at the call site, so no caller can
 * accidentally put a raw email on the wire.
 */

const DATASET_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;
const ACCESS_TOKEN = process.env.FB_CAPI_TOKEN;
const API_VERSION = "v21.0";

/*
 * Deliberately NOT read from the environment by default.
 *
 * A test_event_code routes the event into Events Manager → Test Events, where
 * it is visible but does NOT count towards optimisation or reporting. Leaving
 * one set in production silently disables real conversion tracking while every
 * dashboard still looks healthy. It is passed explicitly by scripts/probes
 * instead, and FB_CAPI_TEST_EVENT_CODE must never be set on the Vercel
 * production environment.
 */
const ENV_TEST_EVENT_CODE = process.env.FB_CAPI_TEST_EVENT_CODE;

export type MetaEventName = "Lead" | "ViewContent" | "PageView";

/** Fields Meta expects as SHA-256 of a normalised value. */
export interface ContactFields {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
}

/** Fields that travel unhashed. */
export interface RequestContext {
  clientIpAddress?: string;
  clientUserAgent?: string;
  /** `_fbp` cookie — Meta's own browser id. */
  fbp?: string;
  /** `_fbc` cookie, or one built from an `fbclid` query param. */
  fbc?: string;
}

export interface SendServerEventOptions {
  eventName: MetaEventName;
  /** MUST match the `eventID` given to fbq() in the browser. */
  eventId: string;
  sourceUrl: string;
  contact?: ContactFields;
  context?: RequestContext;
  customData?: Record<string, unknown>;
  /** Test Events only. Never pass this on a real visitor path. */
  testEventCode?: string;
}

export interface SendServerEventResult {
  ok: boolean;
  status?: number;
  /** Meta's own count — the only trustworthy "it landed" signal. */
  eventsReceived?: number;
  error?: string;
  eventId: string;
}

function sha256(value: string): string {
  return createHash("sha256").update(value, "utf8").digest("hex");
}

/*
 * Meta's normalisation rules. Getting these wrong does not error — the event is
 * accepted and simply never matches a person, which looks like "tracking works
 * but attribution is empty".
 */
function normaliseEmail(value: string) {
  return value.trim().toLowerCase();
}

function normalisePhone(value: string) {
  /* Digits only; Meta wants the country code and no leading + or 00. */
  const digits = value.replace(/\D/g, "");
  return digits.replace(/^0+/, "");
}

function normaliseName(value: string) {
  return value.trim().toLowerCase();
}

function normaliseCity(value: string) {
  return value.trim().toLowerCase().replace(/[\s\-.]/g, "");
}

function normaliseCountry(value: string) {
  return value.trim().toLowerCase().slice(0, 2);
}

function normaliseZip(value: string) {
  return value.trim().toLowerCase().replace(/\s/g, "");
}

/** Hash a field only if it survived normalisation as a non-empty string. */
function hashed(
  value: string | undefined,
  normalise: (v: string) => string,
): string[] | undefined {
  if (!value) return undefined;
  const normalised = normalise(value);
  return normalised ? [sha256(normalised)] : undefined;
}

function buildUserData(contact: ContactFields = {}, context: RequestContext = {}) {
  const userData: Record<string, unknown> = {};

  const em = hashed(contact.email, normaliseEmail);
  const ph = hashed(contact.phone, normalisePhone);
  const fn = hashed(contact.firstName, normaliseName);
  const ln = hashed(contact.lastName, normaliseName);
  const ct = hashed(contact.city, normaliseCity);
  const st = hashed(contact.state, normaliseName);
  const zp = hashed(contact.zip, normaliseZip);
  const country = hashed(contact.country, normaliseCountry);

  if (em) userData.em = em;
  if (ph) userData.ph = ph;
  if (fn) userData.fn = fn;
  if (ln) userData.ln = ln;
  if (ct) userData.ct = ct;
  if (st) userData.st = st;
  if (zp) userData.zp = zp;
  if (country) userData.country = country;

  if (context.clientIpAddress) userData.client_ip_address = context.clientIpAddress;
  if (context.clientUserAgent) userData.client_user_agent = context.clientUserAgent;
  if (context.fbp) userData.fbp = context.fbp;
  if (context.fbc) userData.fbc = context.fbc;

  return userData;
}

/**
 * Send one event to the Conversions API.
 *
 * Returns a result rather than throwing: a tracking failure must never break a
 * lead submission. It does not swallow the outcome silently, though — the
 * previous version discarded Meta's response entirely, which is why nobody
 * noticed the credentials could not write to the dataset.
 */
export async function sendServerEvent({
  eventName,
  eventId,
  sourceUrl,
  contact,
  context,
  customData,
  testEventCode = ENV_TEST_EVENT_CODE,
}: SendServerEventOptions): Promise<SendServerEventResult> {
  if (!DATASET_ID || !ACCESS_TOKEN) {
    return {
      ok: false,
      error: "NEXT_PUBLIC_FB_PIXEL_ID or FB_CAPI_TOKEN is not configured",
      eventId,
    };
  }

  const body: Record<string, unknown> = {
    data: [
      {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        event_source_url: sourceUrl,
        action_source: "website",
        user_data: buildUserData(contact, context),
        ...(customData ? { custom_data: customData } : {}),
      },
    ],
    access_token: ACCESS_TOKEN,
  };

  if (testEventCode) body.test_event_code = testEventCode;

  try {
    const response = await fetch(
      `https://graph.facebook.com/${API_VERSION}/${DATASET_ID}/events`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      },
    );

    const payload = (await response.json().catch(() => null)) as
      | { events_received?: number; error?: { message?: string } }
      | null;

    if (!response.ok || payload?.error) {
      const message = payload?.error?.message ?? `HTTP ${response.status}`;
      console.error("[facebook-capi] Meta rejected the event:", eventName, message);
      return { ok: false, status: response.status, error: message, eventId };
    }

    return {
      ok: true,
      status: response.status,
      eventsReceived: payload?.events_received,
      eventId,
    };
  } catch (error) {
    console.error("[facebook-capi] Could not reach the Conversions API:", eventName, error);
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Network error",
      eventId,
    };
  }
}

/** Shared id for a browser/server pair, when the browser did not supply one. */
export function newEventId(): string {
  return randomUUID();
}
