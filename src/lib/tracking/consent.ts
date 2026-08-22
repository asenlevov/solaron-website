/*
 * Cookie-consent plumbing for tracking.
 *
 * The banner (components/marketing/cookie-consent.tsx) already owns the UI and
 * the wording; this module only reads the choice it stores and makes that
 * choice legible to (a) the pixel component and (b) the server, which cannot
 * see localStorage.
 *
 * Storage rules:
 *   - localStorage["cookie-consent"] stays the source of truth. The banner's
 *     pre-paint inline script reads it, so it must keep working untouched.
 *   - The same value is mirrored into a non-httpOnly cookie of the same name so
 *     /api/track can refuse to forward anything the visitor did not agree to.
 *     The mirror is a copy, never a second opinion — localStorage always wins.
 */

export const CONSENT_STORAGE_KEY = "cookie-consent";
export const CONSENT_COOKIE_NAME = "cookie-consent";
export const CONSENT_CHANGE_EVENT = "solaron:consent-change";

/* Matches the two banner buttons: "Приеми всички" and "Само необходими". */
export type ConsentValue = "all" | "essential";

/* Six months, the usual ceiling for a consent record under Bulgarian CPDP guidance. */
const CONSENT_MAX_AGE_SECONDS = 60 * 60 * 24 * 180;

function isConsentValue(value: string | null | undefined): value is ConsentValue {
  return value === "all" || value === "essential";
}

/** The visitor's stored choice, or null if they have not chosen yet. */
export function readConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return isConsentValue(stored) ? stored : null;
  } catch {
    /* Safari private mode and friends: treat an unreadable store as "no consent". */
    return null;
  }
}

/** Marketing/analytics tags may load only for an explicit "accept all". */
export function hasMarketingConsent(value = readConsent()): boolean {
  return value === "all";
}

function writeConsentCookie(value: ConsentValue) {
  if (typeof document === "undefined") return;
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie =
    `${CONSENT_COOKIE_NAME}=${value}; path=/; max-age=${CONSENT_MAX_AGE_SECONDS}; SameSite=Lax${secure}`;
}

function readConsentCookie(): ConsentValue | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp(`(?:^|;\\s*)${CONSENT_COOKIE_NAME}=([^;]*)`),
  );
  const value = match?.[1];
  return isConsentValue(value) ? value : null;
}

/**
 * Record a choice: localStorage (source of truth), cookie mirror (for the
 * server), then a same-tab event so the pixel can mount or stay away without a
 * reload.
 */
export function persistConsent(value: ConsentValue) {
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
  } catch {
    /* Still mirror to the cookie — a session-only consent beats none. */
  }
  writeConsentCookie(value);
  window.dispatchEvent(
    new CustomEvent<ConsentValue>(CONSENT_CHANGE_EVENT, { detail: value }),
  );
}

/**
 * Backfill the cookie for visitors who accepted before the mirror existed.
 * Without this, everyone who had already clicked "Приеми всички" would keep the
 * browser pixel (localStorage says yes) but be refused server-side (no cookie),
 * which is exactly the half-tracked state that makes dedup look broken.
 */
export function syncConsentCookie() {
  const stored = readConsent();
  if (stored && readConsentCookie() !== stored) writeConsentCookie(stored);
}

/**
 * Subscribe to consent changes: the banner's own event for this tab, and the
 * `storage` event for a choice made in another one. Shaped for
 * `useSyncExternalStore`, which is how the pixel reads this without a
 * setState-in-effect cascade.
 */
export function subscribeToConsent(onChange: () => void): () => void {
  window.addEventListener(CONSENT_CHANGE_EVENT, onChange);
  const onStorage = (event: StorageEvent) => {
    if (event.key === CONSENT_STORAGE_KEY) onChange();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(CONSENT_CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onStorage);
  };
}
