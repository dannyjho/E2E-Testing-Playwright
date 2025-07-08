import { test, expect } from '@playwright/test';

test('進入毛起來首頁並驗證標題', async ({ page }) => {
  await page.goto('https://www.dogcatstar.com/');
  await expect(page).toHaveTitle(/汪喵星球 DogCatStar・始終以毛孩為本/);
  await page.locator('#my-account-anchor').click();
  await expect(page).toHaveTitle(/會員中心/);
})