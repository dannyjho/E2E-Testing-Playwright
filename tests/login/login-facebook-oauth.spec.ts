import { test, expect } from '@playwright/test';
import { setLocaleToTaiwan } from '../helpers/setLocaleToTaiwan';

test('TC06 - 取消 Facebook 快速登入成功', async ({ page }) => {
    // 前往會員中心
    await page.goto('/visitor-my-account/');

    await page.locator('#top-bar').getByTestId('button-change-locale').click();
    await page.getByTestId('select-change-country').selectOption('TW');
    await page.getByTestId('select-change-locale').selectOption('zh_TW');
    await page.getByRole('button', { name: '確定前往' }).click();

    // 等待 登入/註冊 按鈕出現並可點
    const registButton = page.getByRole('button', { name: '登入/註冊' });
    await expect(registButton).toBeVisible({ timeout: 10000 });
    await expect(registButton).toBeEnabled();
    await registButton.click();

    // 點擊 facebook 快速登入
    const fbLoginBtn = page.getByRole('button', { name: /facebook/i });
    await fbLoginBtn.click();

    // 點擊「稍後再說」
    const cancelLink = page.locator('a[href*="facebook-"]', {
        hasText: /Not now|稍後再說/,
    });
    await expect(cancelLink).toBeVisible({ timeout: 15000 });
    await cancelLink.click();

    // 驗證是否導回會員中心，並且 URL 帶有訊息資訊
    await page.waitForURL(/dogcatstar\.com\/my-account/, { timeout: 20000 });
});