import { expect, Page } from '@playwright/test';

/**
 * 檢查是否需要切換語言與幣別，如果有就執行切換為：台灣 / 繁中（台灣）
 */
export async function setLocaleToTaiwan(page: Page) {
    const COUNTRY_SELECTOR = 'select[data-testid="select-change-country"]';
    const LOCALE_SELECTOR = 'select[data-testid="select-change-locale"]';
    const CONFIRM_BUTTON_LABEL = /^(確定前往|Proceed)$/;

    try {
        // 等候 country select 出現，推測代表 locale 彈窗已顯示
        await page.waitForSelector(COUNTRY_SELECTOR, {
            timeout: 25000,
            state: 'visible',
        });

        console.log('🌍 Locale 彈窗出現，執行語系切換邏輯');

        await page.selectOption(COUNTRY_SELECTOR, 'TW');
        await page.selectOption(LOCALE_SELECTOR, 'zh_TW');

        const confirmButton = page.getByRole('button', { name: CONFIRM_BUTTON_LABEL });
        await expect(confirmButton).toBeVisible({ timeout: 10000 });
        await confirmButton.click();

        // 等待頁面完成跳轉或語系變更
        await page.waitForLoadState('networkidle');
    } catch (e) {
        console.log('⏱ Locale 彈窗沒有出現，略過語系切換');
    }
}