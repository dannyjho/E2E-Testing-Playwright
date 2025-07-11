import { test, expect } from '@playwright/test';

test('TC06 - 取消 Facebook 快速登入成功', async ({ page }) => {
    await page.goto('https://www.dogcatstar.com'); // 先讓網站初始化 domain

    await page.evaluate(() => {
        sessionStorage.setItem('site-info', JSON.stringify([
            [
                "/dni/mu/site_info?country_code=TW",
                {
                    data: {
                        data: {
                            site_id: 1,
                            site_currency: "TWD",
                            site_currency_symbol: "NT$",
                            user_lang: null,
                            all_site_country_code: [
                                {
                                    path: "/",
                                    blog_id: "1",
                                    code: "TW",
                                    country: "Taiwan",
                                    main_language: "zh_TW",
                                    currency_symbol: "NT$"
                                }
                            ],
                            frontend_version: ""
                        },
                        status: 200,
                        statusText: "",
                        headers: {},
                        config: {},
                        request: {}
                    },
                    isValidating: false,
                    isLoading: false
                }
            ]
        ]));
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