import { test, expect } from '@playwright/test';
import { setLocaleToTaiwan } from '../helpers/setLocaleToTaiwan';
import { openLoginModal } from '../helpers/loginFlow';

test('TC06 - 取消 Facebook 快速登入成功', async ({ page }, testInfo) => {

    test.skip(testInfo.project.name === 'chromium', '此測試不支援 Chromium');

    await page.goto('/visitor-my-account/');
    await setLocaleToTaiwan(page);
    await openLoginModal(page);

    const fbLoginBtn = page.getByRole('button', { name: /facebook/i });
    await fbLoginBtn.click();

    const cancelLink = page.locator('a[href*="facebook-"]', {
        hasText: /Not now|稍後再說/,
    });
    await expect(cancelLink).toBeVisible({ timeout: 15000 });
    await cancelLink.click();

    await page.waitForURL(/dogcatstar\.com\/my-account/, { timeout: 20000 });
});