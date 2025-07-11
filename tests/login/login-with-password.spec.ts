import { test, expect } from '@playwright/test';
import { setLocaleToTaiwan } from '../helpers/setLocaleToTaiwan';
import { openLoginModal, loginWithPassword } from '../helpers/loginFlow';

test.describe.serial('OAuth Flow Tests', () => {
    test('TC04 - 切換至密碼登入成功', async ({ page }) => {
        await page.goto('/visitor-my-account/');
        await setLocaleToTaiwan(page);

        await openLoginModal(page);
        await loginWithPassword(page, process.env.TEST_PHONE!, process.env.TEST_PASSWORD!);

        await expect(page).toHaveTitle(/會員專區/, { timeout: 10000 });
    });
});