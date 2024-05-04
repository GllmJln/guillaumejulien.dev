import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

const getBrowsers = () => {
  const browsers = [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
  ];

  if (process.env.CI) {
    browsers.push({
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    });
  }

  return browsers;
};

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./e2e",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.PROD
      ? "https://guillaumejulien.dev"
      : "http://localhost:4321",

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
  },

  /* Configure projects for major browsers */
  projects: getBrowsers(),

  /* Run your local dev server before starting the tests */
  webServer: !process.env.PROD
    ? {
        command: "npm run build && npm run preview",
        url: "http://localhost:4321",
        timeout: 120 * 1000,
        reuseExistingServer: !process.env.CI,
        stderr: "pipe",
        stdout: "pipe",
      }
    : undefined,
});
