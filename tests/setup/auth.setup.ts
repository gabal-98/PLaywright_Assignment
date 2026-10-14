import { test as setup, expect } from '@fixtures/test';
import { AUTH_FILE } from '@config/paths';

// The tags make sure this runs even when you filter with --grep @smoke / @regression / @e2e.
setup(
    'authenticate standard user',
    { tag: ['@smoke', '@regression', '@e2e'] },
    async ({ page, loginPage, user }) => {
        await loginPage.open();
        await loginPage.login(user);
        await expect(page).toHaveURL(/inventory\.html/);
        await page.context().storageState({ path: AUTH_FILE });
    },
);
