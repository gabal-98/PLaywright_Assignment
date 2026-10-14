import { test, expect } from '@fixtures/test';
import { UserType } from '@models';
import { INVALID_LOGIN_CASES } from '@data/loginCases';

test.describe('Login', () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.open();
    });

    test(
        'valid user lands on the inventory page with 6 products',
        { tag: '@smoke' },
        async ({ page, loginPage, inventoryPage, user }) => {
            await loginPage.login(user);
            await expect(page).toHaveURL(/inventory\.html/);
            expect(await inventoryPage.getProductsCount()).toBe(6);
        },
    );

    test.describe('locked out user', () => {
        test.use({ userType: UserType.Locked });

        test(
            'sees the locked out error message',
            { tag: '@regression' },
            async ({ loginPage, user }) => {
                await loginPage.login(user);
                expect(await loginPage.getErrorMessage()).toContain('locked out');
            },
        );
    });

    for (const testCase of INVALID_LOGIN_CASES) {
        test(
            `shows an error for ${testCase.title}`,
            { tag: '@regression' },
            async ({ loginPage }) => {
                await loginPage.login({ username: testCase.username, password: testCase.password });
                expect(await loginPage.getErrorMessage()).toBe(testCase.expectedError);
            },
        );
    }
});
