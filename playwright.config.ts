import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 90 * 1000, // 單個 test 最長時間
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined, // CI 限制 worker 避免 race condition

  use: {
    baseURL: 'https://www.dogcatstar.com', // 可使用 page.goto('/visitor-my-account')
    actionTimeout: 30 * 1000,
    navigationTimeout: 60 * 1000,
    headless: true,
    viewport: { width: 1920, height: 1080 },
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: process.env.CI ? 'on-first-retry' : 'retain-on-failure',
  },

  reporter: [
    ['list'],
    ['allure-playwright'], // 輸出 Allure 至 ./allure-results
  ],

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1920, height: 1080 } },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'], viewport: { width: 1920, height: 1080 } },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'], viewport: { width: 1920, height: 1080 } },
    },
  ],

  // 可加上 Web Server 設定（非必要，若需本地環境支援）
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});