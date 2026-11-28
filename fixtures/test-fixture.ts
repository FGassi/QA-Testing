//bloquear todas as propagandas do ads que surgirem
import { test as base, expect } from '@playwright/test';

export const test = base.extend({
    page: async ({ page }, use) => {
        await page.route(
            /(googlesyndication\.com|doubleclick\.net|googleadservices\.com)/i,
            route => route.abort()
        );

        await use(page);
    },
});

export { expect };