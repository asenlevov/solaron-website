import { expect, test, type Page } from "@playwright/test";

/*
 * The Meta pixel must not exist on the page until the visitor accepts.
 *
 * This is the one tracking behaviour with a legal consequence rather than a
 * reporting one, so it is asserted from captured network traffic and the live
 * DOM — never from a reading of our own source, which is exactly the evidence
 * that would not survive a regulator or an audit.
 *
 * Note these specs pass whether or not NEXT_PUBLIC_FB_PIXEL_ID is configured:
 * with no dataset id the pixel is inert, and "absent before consent" still
 * holds. The accept-all specs assert the gate opens only when a pixel exists.
 */

function recordFacebookRequests(page: Page) {
  const requests: string[] = [];
  page.on("request", (r) => {
    if (/connect\.facebook\.net|facebook\.com\/tr|fbevents/.test(r.url())) {
      requests.push(r.url());
    }
  });
  return requests;
}

const PIXEL_CONFIGURED = Boolean(process.env.NEXT_PUBLIC_FB_PIXEL_ID);

/*
 * Click a banner button and wait until the choice is actually recorded.
 *
 * The banner markup is server-rendered, so it is on screen and clickable before
 * React has hydrated its handler. A single click can land on the pre-hydration
 * DOM and do nothing — reliably so under `next dev`, which compiles on demand.
 * Retrying until localStorage changes is what makes this deterministic rather
 * than a race that passes on a fast machine.
 */
async function chooseConsent(page: Page, label: string) {
  await page.waitForLoadState("load");
  const button = page.getByRole("button", { name: label });
  await expect(button).toBeVisible({ timeout: 60_000 });
  await expect
    .poll(async () => {
      await button.click({ timeout: 1000 }).catch(() => {});
      return page.evaluate(() => localStorage.getItem("cookie-consent"));
    }, { timeout: 60_000, message: `consent "${label}" never registered` })
    .not.toBeNull();
}

/*
 * Under `next dev` each route is compiled on first hit, which can take tens of
 * seconds for the 3D and landing routes. These specs interact with the page
 * rather than just loading it, so they need room for that cold compile — the
 * behaviour under test is fast, the toolchain around it is not.
 */
test.describe.configure({ timeout: 180_000 });

test.describe("cookie consent gates the Meta pixel", () => {
  test("no pixel before the visitor has chosen", async ({ page }) => {
    const fb = recordFacebookRequests(page);
    await page.goto("/bg", { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("load");
    await expect(page.getByRole("button", { name: "Приеми всички" })).toBeVisible({ timeout: 60_000 });
    await page.waitForTimeout(2500);

    expect(fb, `unexpected Facebook requests: ${fb.join(", ")}`).toHaveLength(0);
    await expect(page.locator("#fb-pixel")).toHaveCount(0);
    expect(await page.evaluate(() => typeof window.fbq)).toBe("undefined");
  });

  test('"Само необходими" leaves the pixel absent, not merely silent', async ({ page }) => {
    const fb = recordFacebookRequests(page);
    await page.goto("/bg", { waitUntil: "domcontentloaded" });
    await chooseConsent(page, "Само необходими");

    /* Reload: the refusal has to survive a fresh document, which is where a
       consent bug would actually show up. */
    await page.goto("/bg/kontakti", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2500);

    expect(fb, `pixel loaded despite refusal: ${fb.join(", ")}`).toHaveLength(0);
    await expect(page.locator("#fb-pixel")).toHaveCount(0);
    expect(await page.evaluate(() => typeof window.fbq)).toBe("undefined");
    expect(await page.content()).not.toMatch(/fbevents|connect\.facebook\.net/);

    const consent = (await page.context().cookies()).find((c) => c.name === "cookie-consent");
    expect(consent?.value).toBe("essential");
  });

  test("/api/track refuses to forward anything without consent", async ({ request }) => {
    const response = await request.post("/api/track", {
      data: {
        eventName: "Lead",
        eventId: "spec-no-consent",
        sourceUrl: "https://solaron.io/bg",
      },
    });
    /* 204, and nothing reaches Meta. */
    expect(response.status()).toBe(204);
  });

  test("/api/track will not invent an event id", async ({ request }) => {
    /* An id the browser never used would double-count the conversion instead of
       deduplicating it, so a missing id must fail loudly. */
    const response = await request.post("/api/track", {
      headers: { Cookie: "cookie-consent=all" },
      data: { eventName: "Lead", sourceUrl: "https://solaron.io/bg" },
    });
    expect(response.status()).toBe(400);
    expect((await response.json()).error).toContain("eventId");
  });

  test("/api/track only accepts the two events we wired", async ({ request }) => {
    const response = await request.post("/api/track", {
      headers: { Cookie: "cookie-consent=all" },
      data: { eventName: "Purchase", eventId: "x", sourceUrl: "https://solaron.io/bg" },
    });
    expect(response.status()).toBe(400);
  });

  test("the landing pages can grant consent at all", async ({ page }) => {
    /* Ad traffic lands here. If the banner is missing from this layout, consent
       can never be given on the pages the ads actually point at. */
    await page.goto("/bg/lp/bezplatna-konsultatsiya", { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("load");
    await expect(page.getByRole("button", { name: "Приеми всички" })).toBeVisible({ timeout: 60_000 });
  });

  test('"Приеми всички" loads the pixel and fires one PageView', async ({ page }) => {
    test.skip(!PIXEL_CONFIGURED, "NEXT_PUBLIC_FB_PIXEL_ID is not set in this environment");
    const fb = recordFacebookRequests(page);
    await page.addInitScript(() => {
      (window as unknown as { __fbqCalls: unknown[][] }).__fbqCalls = [];
      let real: unknown;
      Object.defineProperty(window, "fbq", {
        configurable: true,
        get: () => real,
        set(v: (...a: unknown[]) => void) {
          real = function (this: unknown, ...args: unknown[]) {
            (window as unknown as { __fbqCalls: unknown[][] }).__fbqCalls.push(args);
            return v.apply(this, args);
          };
          Object.assign(real as object, v);
        },
      });
    });

    await page.goto("/bg", { waitUntil: "domcontentloaded" });
    await chooseConsent(page, "Приеми всички");
    await page.waitForTimeout(3500);

    expect(fb.some((u) => u.includes("fbevents.js"))).toBe(true);
    await expect(page.locator("#fb-pixel")).toHaveCount(1);

    /* The base snippet fires PageView itself; the route effect must not fire a
       second one for the same page. */
    const calls = await page.evaluate(
      () => (window as unknown as { __fbqCalls: unknown[][] }).__fbqCalls ?? [],
    );
    const pageViews = calls.filter((c) => c[0] === "track" && c[1] === "PageView");
    expect(pageViews).toHaveLength(1);
  });

  test("Lead fires exactly once on a phone click, with a shared event id", async ({ page }) => {
    test.skip(!PIXEL_CONFIGURED, "NEXT_PUBLIC_FB_PIXEL_ID is not set in this environment");
    const trackPosts: Array<Record<string, unknown>> = [];
    page.on("request", (r) => {
      if (r.url().includes("/api/track") && r.method() === "POST") {
        try { trackPosts.push(JSON.parse(r.postData() || "{}")); } catch { /* ignore */ }
      }
    });
    await page.addInitScript(() => {
      (window as unknown as { __fbqCalls: unknown[][] }).__fbqCalls = [];
      let real: unknown;
      Object.defineProperty(window, "fbq", {
        configurable: true,
        get: () => real,
        set(v: (...a: unknown[]) => void) {
          real = function (this: unknown, ...args: unknown[]) {
            (window as unknown as { __fbqCalls: unknown[][] }).__fbqCalls.push(args);
            return v.apply(this, args);
          };
          Object.assign(real as object, v);
        },
      });
    });

    await page.goto("/bg", { waitUntil: "domcontentloaded" });
    await chooseConsent(page, "Приеми всички");
    await page.goto("/bg/kontakti", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2500);

    /* Swallow the tel: navigation at the bubble phase. Our listener is on the
       capture phase at document level, so it has already run by then — this
       suppresses the external-handler prompt without hiding the click. */
    await page.evaluate(() => {
      document.addEventListener("click", (e) => {
        const a = (e.target as HTMLElement | null)?.closest?.('a[href^="tel:"]');
        if (a) e.preventDefault();
      });
    });

    const phone = page.locator('a[href="tel:+359884321560"]:visible').first();
    await expect(phone).toBeVisible();
    await phone.click();
    await page.waitForTimeout(2000);

    const calls = await page.evaluate(
      () => (window as unknown as { __fbqCalls: unknown[][] }).__fbqCalls ?? [],
    );
    const leads = calls.filter((c) => c[0] === "track" && c[1] === "Lead");
    expect(leads, "expected exactly one browser Lead").toHaveLength(1);
    const lead = leads[0];
    expect(lead?.[2]).toMatchObject({ content_category: "phone" });

    const browserEventId = (lead?.[3] as { eventID?: string } | undefined)?.eventID;
    const serverPost = trackPosts.find((p) => p.eventName === "Lead");
    expect(browserEventId).toBeTruthy();
    /* The dedup contract, asserted rather than assumed. */
    expect(serverPost?.eventId).toBe(browserEventId);
    expect(trackPosts.filter((p) => p.eventName === "Lead")).toHaveLength(1);
  });

  /*
   * The wa.me CTAs pointed at a number disconnected since 2026-06-29, so every
   * click reached nothing. They are gone; this is the guard that keeps them gone.
   */
  test("no wa.me link survives anywhere ad traffic lands", async ({ page }) => {
    for (const route of [
      "/bg",
      "/bg/kontakti",
      "/bg/konfigurator",
      "/bg/resheniya/za-doma",
      "/bg/lp/bezplatna-konsultatsiya",
    ]) {
      await page.goto(route, { waitUntil: "domcontentloaded" });
      await expect(page.locator('a[href*="wa.me"]'), route).toHaveCount(0);
      const html = await page.content();
      expect(html, route).not.toContain("wa.me/");
    }
  });
});
