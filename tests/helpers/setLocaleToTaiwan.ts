import { expect, Page } from '@playwright/test';

/**
 * 檢查是否需要切換語言與幣別，如果有就執行切換為：台灣 / 繁中（台灣）
 */
export async function setLocaleToTaiwan(page: Page) {
    // 選擇「台灣 (NT$)」
    const countrySelect = page.locator('select[data-testid="select-change-country"]');
    await countrySelect.waitFor({ timeout: 5000 });
    await countrySelect.selectOption('TW');

    // 選擇「繁中（台灣）」
    const localeSelect = page.locator('select[data-testid="select-change-locale"]');
    await localeSelect.waitFor({ timeout: 5000 });
    await localeSelect.selectOption('zh_TW');

    // 點擊「確定前往」按鈕
    const confirmButton = page.locator('button', { hasText: '確定前往' });
    await confirmButton.waitFor({ timeout: 5000 });
    await confirmButton.click();

    // 等待頁面穩定
    await page.waitForLoadState('networkidle');
}