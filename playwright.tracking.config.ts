import { defineConfig, devices } from "@playwright/test";

/**
 * Consent + pixel specs, run against a PRODUCTION build.
 *
 * The main e2e config drives `next dev`, which compiles routes on first hit and
 * reloads them over HMR when the compile lands. That is fine for specs that
 * only load a page, but these specs click a consent button and then assert on
 * what the browser did next — an HMR reload mid-interaction destroys the
 * execution context and fails a test that describes correct behaviour.
 *
 * A pixel id must be present or the gate has nothing to open, so one is set
 * here explicitly. It is a placeholder: no event from this suite is addressed
 * to a real dataset.
 */
const PORT = Number(process.env.TRACKING_E2E_PORT || 3222);
const PLACEHOLDER_PIXEL_ID = "000000000000000";

/* The specs read this to decide whether the pixel-loading assertions can run at
   all. It has to be set in the TEST process, not only in the server's, or those
   specs skip themselves and the suite reports green without checking them. */
process.env.NEXT_PUBLIC_FB_PIXEL_ID = PLACEHOLDER_PIXEL_ID;

export default defineConfig({
  testDir: "./e2e",
  testMatch: "**/tracking-consent.spec.ts",
  outputDir: "./e2e/.artifacts",
  fullyParallel: false,
  workers: 1,
  forbidOnly: !!process.env.CI,
  timeout: 120_000,
  expect: { timeout: 20_000 },
  reporter: [["list"]],
  use: {
    baseURL: `http://127.0.0.1:${PORT}`,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
  webServer: {
    command: `npm run build && npm run start -- --port ${PORT}`,
    url: `http://127.0.0.1:${PORT}/bg`,
    reuseExistingServer: !process.env.CI,
    timeout: 300_000,
    env: {
      NEXT_PUBLIC_FB_PIXEL_ID: PLACEHOLDER_PIXEL_ID,
      /* No FB_CAPI_TOKEN: the server half must be exercised without any event
         reaching Meta. /api/track still runs its consent and id checks. */
    },
  },
});
