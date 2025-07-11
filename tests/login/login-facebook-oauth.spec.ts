import { test, expect } from '@playwright/test';

test('TC06 - 取消 Facebook 快速登入成功', async ({ page }) => {
    await page.goto('https://www.dogcatstar.com');

    await page.evaluate(() => {
        localStorage.setItem(
            'https://www.dogcatstar.com',
            JSON.stringify({
                org_is_active: true,
                channel_lang: 'zh-hant',
                template_lang: 'zh-hant',
                timezone: 'Asia/Taipei',
                modules: {
                    web_push: { enabled: false, config: null },
                    ai_product_search: { enabled: false, config: null },
                    ai_product_embed: { enabled: false, config: null },
                },
                error_tracking_config: {
                    enabled_platforms: [],
                    log_levels: [],
                },
                enabled_guid_providers: [],
            })
        );
    });

    // 前往會員中心
    await page.goto('/visitor-my-account/');
    await page.waitForSelector('button:has-text("登入/註冊")', { timeout: 10000 });

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
    await page.waitForURL(/dogcatstar\.com\/my-account/, { timeout: 30000 });
});