"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import {
  CONSENT_STORAGE_KEY as STORAGE_KEY,
  persistConsent,
  type ConsentValue,
} from "@/lib/tracking/consent";

/*
 * The banner is server-rendered and shown via a synchronous inline script that
 * checks localStorage before first paint. This way it appears together with
 * the initial page render instead of popping in after hydration (which made
 * it the LCP element on slow mobile connections).
 */
export function CookieConsent() {
  const [dismissed, setDismissed] = useState(false);
  const t = useTranslations("Common");

  function accept(value: ConsentValue) {
    /* Writes localStorage exactly as before, and additionally mirrors the
       choice into a cookie so the server can honour it, then tells the pixel
       to mount or stay away without a reload. */
    persistConsent(value);
    setDismissed(true);
  }

  if (dismissed) return null;

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `try{if(!localStorage.getItem("${STORAGE_KEY}"))document.documentElement.classList.add("show-cookie-banner")}catch(e){}`,
        }}
      />
      <div
        role="dialog"
        aria-label={t("cookieConsent")}
        className="cookie-banner fixed bottom-4 left-4 right-4 z-[100] mx-auto max-w-2xl rounded-xl border border-border bg-background p-5 shadow-elevated sm:bottom-6 sm:left-6 sm:right-6"
      >
        <p className="text-sm leading-relaxed text-foreground-secondary">
          {t("cookieText")}{" "}
          <Link
            href={"/pravna-informatsiya/biskvitki" as never}
            className="underline underline-offset-4 transition-colors hover:text-foreground"
          >
            {t("cookiePolicy")}
          </Link>
        </p>

        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => accept("essential")}
            className="inline-flex h-9 items-center justify-center rounded-lg border border-border bg-transparent px-4 text-sm font-medium text-foreground transition-colors hover:bg-background-secondary"
          >
            {t("essentialOnly")}
          </button>
          <button
            type="button"
            onClick={() => accept("all")}
            className="inline-flex h-9 items-center justify-center rounded-lg bg-accent px-4 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
          >
            {t("acceptAll")}
          </button>
        </div>
      </div>
    </>
  );
}
