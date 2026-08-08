import { expect, test, type APIRequestContext, type Page } from "@playwright/test";

/**
 * The two things the landing-page forms must never get wrong:
 *   1. the thank-you panel appears only when the lead was actually recorded;
 *   2. every submission carries населено място through to the capture payload.
 *
 * The failure case is produced by the stub upstream (e2e/stub-capture.mjs)
 * returning 502, so the whole real chain runs — browser → /api/lead → upstream.
 * Nothing is intercepted in the page.
 */

const STUB = `http://127.0.0.1:${process.env.E2E_STUB_PORT || 4599}`;
const HELP_PHONE = "+359 899 639726";

const FUNNELS = [
  { path: "/bg/lp/oferta", slug: "solar-oferta" },
  { path: "/bg/lp/solar-za-doma", slug: "solar-za-doma" },
  { path: "/bg/lp/solar-za-biznesa", slug: "solar-za-biznesa" },
  { path: "/bg/lp/solar-za-stopanstva", slug: "solar-za-stopanstva" },
  { path: "/bg/lp/solaren-karport", slug: "solaren-karport-dom" },
] as const;

const LEAD = {
  name: "Иван Петров",
  phone: "+359881234567",
  email: "ivan.petrov@example.bg",
  city: "Пловдив",
};

interface Capture {
  funnel_slug: string;
  utm?: Record<string, string>;
  fields: Record<string, unknown>;
}

async function setUpstreamFailing(request: APIRequestContext, fail: boolean) {
  expect((await request.post(`${STUB}/__mode`, { data: { fail } })).ok()).toBeTruthy();
}

async function resetCaptures(request: APIRequestContext) {
  expect((await request.delete(`${STUB}/__received`)).ok()).toBeTruthy();
}

async function receivedCaptures(request: APIRequestContext): Promise<Capture[]> {
  const res = await request.get(`${STUB}/__received`);
  expect(res.ok()).toBeTruthy();
  return ((await res.json()) as { received: Capture[] }).received;
}

/** Click through the calculator steps until the contact form is on screen. */
async function openLeadForm(page: Page) {
  const submit = page.locator("#submitLead");
  for (let step = 0; step < 6; step += 1) {
    if (await submit.isVisible()) return;
    await page.locator(".panel.on .cbtn:not(.ghost)").first().click();
  }
  throw new Error("the lead form never became visible");
}

const thanksPanel = (page: Page) => page.locator(".panel.on .thanks");
const errorBox = (page: Page) => page.locator("#leadErr");

for (const funnel of FUNNELS) {
  test.describe(funnel.path, () => {
    test("a recorded lead shows the thank-you panel and carries населено място", async ({
      page,
      request,
    }) => {
      await setUpstreamFailing(request, false);
      await resetCaptures(request);

      await page.goto(`${funnel.path}?utm_source=meta&utm_medium=paid&utm_campaign=e2e`);
      await openLeadForm(page);
      await page.fill("#f-name", LEAD.name);
      await page.fill("#f-phone", LEAD.phone);
      await page.fill("#f-email", LEAD.email);
      await page.fill("#f-city", LEAD.city);
      await page.click("#submitLead");

      await expect(thanksPanel(page)).toBeVisible();
      await expect(errorBox(page)).toBeHidden();

      const captures = await receivedCaptures(request);
      expect(captures).toHaveLength(1);
      expect(captures[0].funnel_slug).toBe(funnel.slug);
      expect(captures[0].fields.name).toBe(LEAD.name);
      expect(captures[0].fields.phone).toBe(LEAD.phone);
      expect(captures[0].fields.email).toBe(LEAD.email);
      expect(captures[0].fields.location).toBe(LEAD.city);
      expect(captures[0].utm).toMatchObject({
        utm_source: "meta",
        utm_medium: "paid",
        utm_campaign: "e2e",
      });
    });

    test("a lead that was not recorded shows no thank-you, only the honest message", async ({
      page,
      request,
    }) => {
      await setUpstreamFailing(request, true);
      await resetCaptures(request);

      await page.goto(funnel.path);
      await openLeadForm(page);
      await page.fill("#f-name", LEAD.name);
      await page.fill("#f-phone", LEAD.phone);
      await page.fill("#f-email", LEAD.email);
      await page.fill("#f-city", LEAD.city);

      const submit = page.locator("#submitLead");
      const label = (await submit.textContent()) ?? "";
      await submit.click();

      await expect(errorBox(page)).toBeVisible();
      await expect(errorBox(page)).toContainText("не е записана");
      await expect(errorBox(page)).toContainText(HELP_PHONE);
      await expect(thanksPanel(page)).toHaveCount(0);

      // The retry the message promises has to actually be possible.
      await expect(submit).toBeEnabled();
      await expect(submit).toHaveText(label);

      expect(await receivedCaptures(request)).toHaveLength(0);
    });

    test("населено място is required before anything is sent", async ({ page, request }) => {
      await setUpstreamFailing(request, false);
      await resetCaptures(request);

      await page.goto(funnel.path);
      await openLeadForm(page);
      await page.fill("#f-name", LEAD.name);
      await page.fill("#f-phone", LEAD.phone);
      await page.fill("#f-email", LEAD.email);

      let alertText = "";
      page.once("dialog", (dialog) => {
        alertText = dialog.message();
        void dialog.dismiss();
      });
      await page.click("#submitLead");

      expect(alertText).toContain("населено място");
      await expect(thanksPanel(page)).toHaveCount(0);
      expect(await receivedCaptures(request)).toHaveLength(0);
    });
  });
}
