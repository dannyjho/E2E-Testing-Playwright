import { defineConfig, devices } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  timeout: 60 * 1000, // 每個 test 最長執行時間（預設是 30 秒）
  use: {
    actionTimeout: 15 * 1000,       // 每個 click/fill 等單一動作的最大時間
    navigationTimeout: 30 * 1000,   // 導航類操作如 page.goto/waitForURL 的最大等待時間
    headless: true,                 // CI 通常建議開 headless
    screenshot: 'only-on-failure', // 出錯才截圖
    video: 'retain-on-failure',    // 出錯才保留影片
  },
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 3 : undefined,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['list'],                 // 終端輸出測試結果
    ['allure-playwright']     // 輸出 Allure raw data 至 ./allure-results
  ],

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Collect trace when retrying the failed test. */
    trace: 'on-first-retry',
    // baseURL: 'http://localhost:3000', // 你可視情況取消註解
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});