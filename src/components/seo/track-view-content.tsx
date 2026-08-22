"use client";

import { useEffect, useRef } from "react";

import { trackConversion } from "@/lib/tracking/events";
import { CONSENT_CHANGE_EVENT, hasMarketingConsent } from "@/lib/tracking/consent";

/*
 * Marks a page as a retargeting-worthy view (configurator, consultation).
 *
 * ViewContent is the audience-building event: it is what lets Meta retarget the
 * people who priced a system but did not enquire. PageView alone cannot express
 * "looked at the thing that matters".
 */
export function TrackViewContent({
  contentName,
  contentCategory,
}: {
  contentName: string;
  contentCategory?: string;
}) {
  const fired = useRef(false);

  useEffect(() => {
    function fire() {
      if (fired.current || !hasMarketingConsent()) return;
      fired.current = true;
      trackConversion({
        eventName: "ViewContent",
        params: { content_name: contentName, content_category: contentCategory },
      });
    }

    fire();
    /* A visitor who accepts the banner while already on this page should still
       join the retargeting audience for it. */
    window.addEventListener(CONSENT_CHANGE_EVENT, fire);
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, fire);
  }, [contentName, contentCategory]);

  return null;
}
