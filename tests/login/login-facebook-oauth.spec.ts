import { test, expect } from '@playwright/test';

test('TC06 - 取消 Facebook 快速登入成功', async ({ page }) => {
    // 前往會員中心
    await page.goto('https://www.dogcatstar.com/visitor-my-account/');

    // 等待畫面讀取
    const registButton = page.getByRole('button', { name: '登入/註冊' });

    // 點擊登入進入登入畫面
    await expect(registButton).toBeVisible();
    await registButton.click();

    // 點擊 facebook 快速登入
    const fbLoginBtn = page.getByRole('button', { name: /facebook/i });
    await fbLoginBtn.click();

    // 點擊「稍後再說」
    await page.getByRole('link', { name: 'Not now' }).click();
    
    // 驗證是否導回會員中心，並且 URL 帶有訊息資訊
    await page.waitForURL(/loginByFacebook=false&error=200/);
});