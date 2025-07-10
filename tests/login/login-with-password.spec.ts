import { test, expect } from '@playwright/test';

test('TC04 - 切換至密碼登入成功', async ({ page }) => {
    // 前往會員中心
    await page.goto('https://www.dogcatstar.com/visitor-my-account/');

    // 等待畫面讀取
    const registButton = page.getByRole('button', { name: '登入/註冊' });

    // 點擊登入進入登入畫面
    await expect(registButton).toBeVisible();
    await registButton.click();

    // 輸入帳號並切換密碼登入
    await expect(page.locator('div[role="combobox"]')).toContainText('+886');

    // 輸入手機號碼
    await page.locator('input[name="username"]').fill('932579974');
    const loginButton = page.getByRole('button', { name: '登入/註冊' });
    await expect(loginButton).toBeEnabled();

    // 點擊登入/註冊按鈕
    await loginButton.click();

    const switchToPasswordButton = page.getByRole('button', { name: '密碼登入' });

    // 等待按鈕出現
    await expect(switchToPasswordButton).toBeVisible();

    // 點擊按鈕
    await switchToPasswordButton.click();

    // 等待密碼輸入框出現
    const passwordInput = page.locator('input[type="password"]');
    await expect(passwordInput).toBeVisible();

    // 輸入密碼
    await passwordInput.fill('qaz852456');

    const confirmBtn = page.getByRole('button', { name: '確認' });
    await expect(confirmBtn).toBeEnabled();
    await confirmBtn.click();

    // 驗證是否導入會員中心
    await expect(page).toHaveTitle(/會員專區/);
});