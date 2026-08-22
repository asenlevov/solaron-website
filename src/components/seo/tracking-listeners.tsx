"use client";

import { useEffect } from "react";

import { trackConversion } from "@/lib/tracking/events";

/*
 * Conversion listeners, attached once at the document level.
 *
 * Delegation rather than per-element handlers: the phone CTAs appear in the
 * navbar, the footer, the floating CTA, the contact page and several landing
 * sections. Wiring each one would mean touching a dozen components and would
 * silently miss the next one somebody adds.
 */

/** Lead forms opt in with data-track-lead="<source label>". */
const LEAD_FORM_SELECTOR = "form[data-track-lead]";
/* tel: only. The wa.me CTAs are gone — the number behind them was disconnected,
   so every Lead they reported was a person who reached nobody. */
const CONTACT_LINK_SELECTOR = 'a[href^="tel:"]';

function fieldValue(form: HTMLFormElement, name: string): string | undefined {
  const data = new FormData(form);
  const value = data.get(name);
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

export function TrackingListeners() {
  useEffect(() => {
    function onSubmit(event: Event) {
      const form = (event.target as HTMLElement | null)?.closest?.(
        LEAD_FORM_SELECTOR,
      ) as HTMLFormElement | null;
      if (!form) return;

      /*
       * Contact details go to our own /api/track over HTTPS and are SHA-256
       * hashed there before they reach Meta. They raise the match rate enough
       * to be worth carrying — an unmatched Lead optimises nothing.
       */
      trackConversion({
        eventName: "Lead",
        params: {
          content_name: form.dataset.trackLead || "Contact form",
          /* A solar install closes offline over weeks, so there is no value to
             report here. Sending a made-up one would train the optimiser on a
             number we invented. */
        },
        contact: {
          email: fieldValue(form, "email"),
          phone: fieldValue(form, "phone"),
          firstName: fieldValue(form, "name"),
          city: fieldValue(form, "city"),
        },
      });
    }

    function onClick(event: MouseEvent) {
      const link = (event.target as HTMLElement | null)?.closest?.(
        CONTACT_LINK_SELECTOR,
      ) as HTMLAnchorElement | null;
      if (!link) return;

      trackConversion({
        eventName: "Lead",
        params: {
          content_name: "Phone click",
          /* Which surface the click came from, for creative-level reporting. */
          content_category: "phone",
        },
      });
    }

    /* Capture phase: React's form actions call preventDefault, and a tel: link
       can navigate away, before a bubbling listener would ever run. */
    document.addEventListener("submit", onSubmit, true);
    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("submit", onSubmit, true);
      document.removeEventListener("click", onClick, true);
    };
  }, []);

  return null;
}
