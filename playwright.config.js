// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      // デスクトップ版Chrome
      name: 'Desktop Chrome',
      use: {
        browserName: 'chromium',
        ...devices['Desktop Chrome'],
      },
    },

    {
      // デスクトップ版Firefox
      name: 'Desktop Firefox',
      use: {
        browserName: 'firefox',
        ...devices['Desktop Firefox'],
      },
    },

    {
      // デスクトップ版Safari
      name: 'Desktop Safari',
      use: {
        browserName: 'webkit',
        ...devices['Desktop Safari'],
      },
    },

    /* Test against mobile viewports. */
    {
      // iPhone版Chrome (Chromium エンジンを使用してエミュレーション)
      name: 'Mobile Chrome',
      use: {
        browserName: 'chromium',
        ...devices['iPhone 13 Pro'],
      },
    },
    // {
    //   // iPhone版Firefox (Firefox エンジンを使用してエミュレーション) テストに失敗するためコメントアウト中
    //   name: 'iPhone Firefox',
    //   use: {
    //     browserName: 'firefox',
    //     ...devices['iPhone 13 Pro'],
    //   },
    // },
    {
      // iPhone版Safari
      name: 'Mobile Safari',
      use: {
        browserName: 'webkit',
        ...devices['iPhone 13 Pro'],
      },
    },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

