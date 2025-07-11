import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 90 * 1000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 3 : undefined,

  use: {
    baseURL: 'https://www.dogcatstar.com',
    actionTimeout: 30 * 1000,
    navigationTimeout: 60 * 1000,
    headless: true,
    viewport: { width: 1920, height: 1080 },
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: process.env.CI ? 'on-first-retry' : 'retain-on-failure',

    // 模擬台灣使用者環境
    locale: 'zh-TW',
    timezoneId: 'Asia/Taipei',
    geolocation: { longitude: 121.5654, latitude: 25.0330 },
    permissions: ['geolocation'],
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:115.0) Gecko/20100101 Firefox/115.0',
  },

  reporter: [
    ['list'],
    ['allure-playwright'],
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
});