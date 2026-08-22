"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

import {
  hasMarketingConsent,
  readConsent,
  subscribeToConsent,
  syncConsentCookie,
  type ConsentValue,
} from "@/lib/tracking/consent";

const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

declare global {
  interface Window {
    fbq?: ((...args: unknown[]) => void) & { queue?: unknown[] };
    _fbq?: unknown;
  }
}

/*
 * Events raised before fbevents.js has initialised.
 *
 * This is not theoretical: ViewContent fires from a mount effect, which on a
 * cold page load runs before the consent-gated <Script> has executed. Dropping
 * those calls silently lost the browser half of every ViewContent while the
 * server half still fired — the event looked tracked, but nothing deduplicated
 * and no retargeting audience was built.
 */
type PendingEvent = [string, Record<string, unknown> | undefined, string];
const pending: PendingEvent[] = [];

function emit(eventName: string, params: Record<string, unknown> | undefined, eventId: string) {
  window.fbq?.("track", eventName, params ?? {}, { eventID: eventId });
}

/** Called once fbq exists; order is preserved. */
function flushPending() {
  if (!window.fbq) return;
  while (pending.length) {
    const next = pending.shift();
    if (next) emit(next[0], next[1], next[2]);
  }
}

let waiting = false;

/*
 * Wait for the snippet to define fbq, then drain.
 *
 * next/script does not reliably fire onLoad/onReady for an INLINE script, so
 * the flush cannot hang off those callbacks — it polls instead. Cheap, bounded,
 * and it stops as soon as the queue drains.
 */
function flushWhenReady() {
  if (waiting) return;
  waiting = true;
  const startedAt = Date.now();
  const timer = window.setInterval(() => {
    if (window.fbq) flushPending();
    /* Give up after 10s: the visitor likely runs a blocker, and holding the
       queue open forever would fire stale events on a later page. */
    if (!pending.length || Date.now() - startedAt > 10_000) {
      window.clearInterval(timer);
      waiting = false;
      pending.length = 0;
    }
  }, 120);
}

/**
 * Fire a browser-side conversion.
 *
 * `eventId` is not optional by accident — it is the key Meta uses to collapse
 * this call and its Conversions API twin into a single conversion. Callers get
 * it from `trackConversion` in lib/tracking/events.
 */
export function trackFbEvent(
  eventName: string,
  params: Record<string, unknown> | undefined,
  eventId: string,
) {
  if (typeof window === "undefined") return;
  if (!window.fbq) {
    pending.push([eventName, params, eventId]);
    flushWhenReady();
    return;
  }
  emit(eventName, params, eventId);
}

/**
 * The Meta pixel, mounted only for visitors who chose "Приеми всички".
 *
 * When consent is absent or "essential" this renders nothing at all: no
 * <script>, no <noscript> beacon, so the browser never requests fbevents.js and
 * no identifier is written. That is the difference between a pixel that is
 * silent and a pixel that is not there, and only the second one is lawful
 * before consent.
 */
export function FacebookPixel() {
  const pathname = usePathname();
  /*
   * The base snippet fires its own PageView when it initialises. Without this
   * guard the route effect below fires a second one for the same page, and
   * every landing view is counted twice.
   */
  const initialisedPath = useRef<string | null>(null);

  /*
   * localStorage is an external store, so it is read through
   * useSyncExternalStore rather than mirrored into state. The server snapshot
   * is null: the server cannot see the visitor's choice, so it must render no
   * pixel and let the client decide.
   */
  const consent = useSyncExternalStore<ConsentValue | null>(
    subscribeToConsent,
    readConsent,
    () => null,
  );

  /* Backfill the cookie for visitors who consented before it existed. */
  useEffect(() => {
    syncConsentCookie();
  }, [consent]);

  const granted = hasMarketingConsent(consent);

  useEffect(() => {
    if (!granted || !window.fbq) return;
    if (initialisedPath.current === null) {
      /* The snippet's own PageView covers this one. */
      initialisedPath.current = pathname;
      return;
    }
    if (initialisedPath.current === pathname) return;
    initialisedPath.current = pathname;
    window.fbq("track", "PageView");
  }, [granted, pathname]);

  if (!FB_PIXEL_ID || !granted) return null;

  return (
    <>
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        /* Anything raised while the snippet was still loading goes now, with the
           event ids its server twins already used. */
        onReady={flushPending}
        onLoad={flushPending}
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${FB_PIXEL_ID}');
            fbq('track', 'PageView');
          `,
        }}
      />
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element -- Meta's
            no-JavaScript beacon must be a plain 1x1 <img> hitting facebook.com;
            next/image would rewrite it through the optimiser and break it. */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
