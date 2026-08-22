import { defineConfig, devices } from "@playwright/test";

/**
 * E2E harness for the lead-capture flow on the /bg/lp landing pages.
 *
 * Two servers come up per run: the app on APP_PORT, and a stub of Sellinger's
 * capture endpoint (`e2e/stub-capture.mjs`) that /api/lead is pointed at, so no
 * test ever writes into the live CRM. Both viewports run on every spec — the
 * calculator and its form are used at least as much on a phone as on a desktop.
 */
export const APP_PORT = Number(process.env.E2E_APP_PORT || 3210);
export const STUB_PORT = Number(process.env.E2E_STUB_PORT || 4599);
export const STUB_TOKEN = "e2e-site-token";

export default defineConfig({
  testDir: "./e2e",
  testMatch: "**/*.spec.ts",
  /* The consent/pixel specs need a production build — they click the banner and
     then assert on what the browser did, and this config's dev server reloads
     over HMR mid-interaction. They run under playwright.tracking.config.ts:
     `npm run test:e2e:tracking`. */
  testIgnore: "**/tracking-consent.spec.ts",
  outputDir: "./e2e/.artifacts",
  // One dev server, one stub: serialize so the two specs can't fight over the
  // stub's failure mode.
  fullyParallel: false,
  workers: 1,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  timeout: 90_000,
  expect: { timeout: 15_000 },
  reporter: [["list"]],
  use: {
    baseURL: `http://127.0.0.1:${APP_PORT}`,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "desktop",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } },
    },
    {
      name: "mobile",
      use: { ...devices["Pixel 7"] },
    },
  ],
  webServer: [
    {
      command: "node e2e/stub-capture.mjs",
      url: `http://127.0.0.1:${STUB_PORT}/__health`,
      reuseExistingServer: !process.env.CI,
      env: {
        STUB_CAPTURE_PORT: String(STUB_PORT),
        STUB_CAPTURE_TOKEN: STUB_TOKEN,
      },
    },
    {
      command: `npm run dev -- --port ${APP_PORT}`,
      url: `http://127.0.0.1:${APP_PORT}/bg/lp/solar-za-doma`,
      reuseExistingServer: !process.env.CI,
      timeout: 180_000,
      env: {
        SELLINGER_CAPTURE_URL: `http://127.0.0.1:${STUB_PORT}/capture`,
        SOLARON_SITE_TOKEN: STUB_TOKEN,
      },
    },
  ],
});
