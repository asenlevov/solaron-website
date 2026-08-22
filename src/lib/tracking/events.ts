"use client";

import { trackFbEvent } from "@/components/seo/facebook-pixel";
import { hasMarketingConsent } from "./consent";

/*
 * One call site for every conversion, so the browser pixel and the Conversions
 * API can never disagree about what happened or what to call it.
 *
 * Both halves are fired from here with the SAME event id. Meta keeps whichever
 * arrives first and discards the duplicate, which is what lets us run browser
 * and server tracking together without inflating the conversion count.
 */

export type ConversionEvent = "Lead" | "ViewContent";

/** Unhashed here; /api/track hashes before anything leaves our servers. */
export interface ConversionContact {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  city?: string;
}

export interface TrackConversionOptions {
  eventName: ConversionEvent;
  params?: Record<string, unknown>;
  contact?: ConversionContact;
}

function newEventId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  /* Older Safari: good enough for a dedup key, which only needs uniqueness. */
  return `evt-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

/**
 * Fire a conversion on both paths.
 *
 * Returns the shared event id so tests (and the dedup probe) can assert that
 * the browser call and the server call carried the same one.
 */
export function trackConversion({
  eventName,
  params,
  contact,
}: TrackConversionOptions): string | null {
  /* The gate is re-checked here and again on the server. A visitor who declined
     never reaches Meta by either path. */
  if (!hasMarketingConsent()) return null;

  const eventId = newEventId();

  trackFbEvent(eventName, params, eventId);

  /*
   * keepalive matters: Lead fires on WhatsApp and phone clicks, which navigate
   * away immediately. A normal fetch would be cancelled mid-flight and the
   * server half of those conversions would simply never arrive.
   */
  void fetch("/api/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    keepalive: true,
    body: JSON.stringify({
      eventName,
      eventId,
      sourceUrl: window.location.href,
      params,
      contact,
    }),
  }).catch(() => {
    /* Tracking must never surface an error to a visitor mid-conversion. */
  });

  return eventId;
}
