import { test, expect } from '@playwright/test';

test.describe.serial('OAuth Flow Tests', () => {
    test('TC04 - 切換至密碼登入成功', async ({ page }) => {
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

        // 前往會員中心頁面（直接進入目標畫面）
        await page.goto('/visitor-my-account/', { waitUntil: 'domcontentloaded' });

        // 等待 登入/註冊 按鈕出現並可點
        const registButton = page.getByRole('button', { name: '登入/註冊' });
        await expect(registButton).toBeVisible({ timeout: 15000 });
        await expect(registButton).toBeEnabled();
        await registButton.click();

        // 確保登入畫面載入完成（有 +886）
        const combobox = page.locator('div[role="combobox"]');
        await combobox.waitFor({ state: 'visible', timeout: 15000 });
        await expect(combobox).toContainText('+886', { timeout: 15000 });

        // 輸入手機號碼
        await page.locator('input[name="username"]').fill('932579974');

        // 等待登入按鈕出現並可點
        const loginButton = page.getByRole('button', { name: '登入/註冊' });
        await expect(loginButton).toBeVisible({ timeout: 10000 });
        await expect(loginButton).toBeEnabled({ timeout: 10000 });
        await loginButton.click();

        // 切換到 密碼登入
        const switchToPasswordButton = page.getByRole('button', { name: '密碼登入' });
        await expect(switchToPasswordButton).toBeVisible({ timeout: 20000 });
        await switchToPasswordButton.click();

        // 等待密碼輸入欄出現
        const passwordInput = page.locator('input[type="password"]');
        await expect(passwordInput).toBeVisible({ timeout: 10000 });

        // 輸入密碼
        await passwordInput.fill('qaz852456');

        // 點擊 確認 按鈕
        const confirmBtn = page.getByRole('button', { name: '確認' });
        await expect(confirmBtn).toBeVisible({ timeout: 10000 });
        await expect(confirmBtn).toBeEnabled();
        await Promise.all([
            page.waitForURL(/\/my-account/, { timeout: 30000 }),
            confirmBtn.click(),
        ]);

        // 驗證是否導入會員中心
        await expect(page).toHaveTitle(/會員專區/, { timeout: 10000 });
    });
});