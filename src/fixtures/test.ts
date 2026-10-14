import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutInformationPage } from '../pages/CheckoutInformationPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';
import { User, UserType } from '../models';
import { getUser } from '../data/users';

type PageFixtures = {
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
    productDetailsPage: ProductDetailsPage;
    cartPage: CartPage;
    checkoutInformationPage: CheckoutInformationPage;
    checkoutOverviewPage: CheckoutOverviewPage;
    checkoutCompletePage: CheckoutCompletePage;
};

/** Option fixture: override per file/describe with test.use({ userType: UserType.Locked }) */
type OptionFixtures = { userType: UserType };

type DataFixtures = { user: User };

/** Auto fixture: runs for every test without being requested. */
type AutoFixtures = { attachFailureContext: void };

export const test = base.extend<PageFixtures & OptionFixtures & DataFixtures & AutoFixtures>({
    userType: [UserType.Standard, { option: true }],

    user: async ({ userType }, use) => {
        await use(getUser(userType));
    },

    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    inventoryPage: async ({ page }, use) => {
        await use(new InventoryPage(page));
    },
    productDetailsPage: async ({ page }, use) => {
        await use(new ProductDetailsPage(page));
    },
    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },
    checkoutInformationPage: async ({ page }, use) => {
        await use(new CheckoutInformationPage(page));
    },
    checkoutOverviewPage: async ({ page }, use) => {
        await use(new CheckoutOverviewPage(page));
    },
    checkoutCompletePage: async ({ page }, use) => {
        await use(new CheckoutCompletePage(page));
    },

    attachFailureContext: [
        async ({ page }, use, testInfo) => {
            await use();
            if (testInfo.status !== testInfo.expectedStatus) {
                await testInfo.attach('url-at-failure', {
                    body: page.url(),
                    contentType: 'text/plain',
                });
            }
        },
        { auto: true },
    ],
});

export { expect } from '@playwright/test';
