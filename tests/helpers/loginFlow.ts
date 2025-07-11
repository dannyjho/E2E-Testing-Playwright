import { Page, expect } from '@playwright/test';

export async function openLoginModal(page: Page) {
  const loginBtn = page.getByRole('button', {
    name: /(?:Sign\s*in\s*\/\s*Sign\s*up|登入\s*\/\s*註冊)/i,
  });
  await expect(loginBtn).toBeVisible({ timeout: 15000 });
  await expect(loginBtn).toBeEnabled();
  await loginBtn.click();
}

export async function switchToPasswordLogin(page: Page) {
  const switchBtn = page.getByRole('button', {
    name: /^(Password Sign in|密碼登入)$/i,
  });
  await expect(switchBtn).toBeVisible({ timeout: 15000 });
  await switchBtn.click();
}

export async function loginWithPassword(page: Page, phone: string, password: string) {
  const combobox = page.locator('div[role="combobox"]');
  await expect(combobox).toContainText('+886', { timeout: 15000 });

  await page.locator('input[name="username"]').fill(phone);

  const loginBtn = page.getByRole('button', {
    name: /(?:Sign\s*in\s*\/\s*Sign\s*up|登入\s*\/\s*註冊)/i,
  });
  await expect(loginBtn).toBeVisible();
  await expect(loginBtn).toBeEnabled();
  await loginBtn.click();

  await switchToPasswordLogin(page);

  const passwordInput = page.locator('input[type="password"]');
  await expect(passwordInput).toBeVisible();
  await passwordInput.fill(password);

  const confirmBtn = page.getByRole('button', {
    name: /^(Confirm|確認)$/i,
  });
  await expect(confirmBtn).toBeVisible();
  await expect(confirmBtn).toBeEnabled();

  await Promise.all([
    page.waitForURL(/\/my-account/, { timeout: 30000 }),
    confirmBtn.click(),
  ]);
}