import { test, expect } from '@playwright/test';

test('密碼登入成功（切換）', async ({ page }) => {
  await page.goto('https://www.dogcatstar.com/');
  await expect(page).toHaveTitle(/汪喵星球 DogCatStar・始終以毛孩為本/);

  await page.click('#my-account-anchor', { timeout: 10000 });

  await expect(page).toHaveURL('https://www.dogcatstar.com/visitor-my-account/');

  await expect(page).toHaveTitle(/會員中心/);

  await expect(page.locator('body')).toContainText('會員中心');

  await page.
});