import { test as base, expect as baseExpect } from '@playwright/test';

export const test = base.extend({
    context: async ({ browser }, use) => {
        const context = await browser.newContext({
            geolocation: { latitude: 25.0330, longitude: 121.5654 }, // 台北
            permissions: ['geolocation'],
            locale: 'zh-TW',
            timezoneId: 'Asia/Taipei',
        });
        await use(context);
        await context.close();
    },
});

export const expect = baseExpect;