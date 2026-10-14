import { test, expect } from '@fixtures/test';
import { AUTH_FILE } from '@config/paths';
import { PRODUCTS } from '@data/products';
import { CheckoutInfoFactory } from '@factories/CheckoutInfoFactory';
import { Product } from '@models';
import { roundToTwoDecimals } from '@utils/priceUtils';

// Reuse the session saved by the setup project: no UI login needed.
test.use({ storageState: AUTH_FILE });

test.describe('Checkout', () => {
    test(
        'user completes checkout with two products',
        { tag: ['@smoke', '@e2e'] },
        async ({
            page,
            inventoryPage,
            cartPage,
            checkoutInformationPage,
            checkoutOverviewPage,
            checkoutCompletePage,
        }) => {
            const products: Product[] = [PRODUCTS.backpack, PRODUCTS.bikeLight];
            const expectedItemsTotal = roundToTwoDecimals(
                products.reduce((sum, product) => sum + product.price, 0),
            );
            const checkoutInfo = CheckoutInfoFactory.create();

            await test.step('add products to the cart', async () => {
                await inventoryPage.open();
                for (const product of products) {
                    await inventoryPage.addProduct(product.name);
                }
                await expect(inventoryPage.cartBadge).toHaveText(String(products.length));
            });

            await test.step('verify the cart content', async () => {
                await inventoryPage.goToCartPage();
                await expect(page).toHaveURL(/cart\.html/);
                await expect
                    .poll(() => cartPage.getItemsNames())
                    .toEqual(products.map((product) => product.name));
            });

            await test.step('fill the checkout information', async () => {
                await cartPage.goToCheckout();
                await expect(page).toHaveURL(/checkout-step-one\.html/);
                await checkoutInformationPage.fillCheckoutForm(checkoutInfo);
                await checkoutInformationPage.continueCheckout();
            });

            await test.step('verify the overview totals', async () => {
                await expect(page).toHaveURL(/checkout-step-two\.html/);
                const itemsTotal = await checkoutOverviewPage.getItemsTotalPrice();
                const tax = await checkoutOverviewPage.getTax();
                const total = await checkoutOverviewPage.getTotalPrice();

                expect(itemsTotal).toBe(expectedItemsTotal);
                expect(roundToTwoDecimals(itemsTotal + tax)).toBe(total);
            });

            await test.step('finish the order', async () => {
                await checkoutOverviewPage.finishCheckout();
                await expect(page).toHaveURL(/checkout-complete\.html/);
                expect(await checkoutCompletePage.getSuccessMessage()).toBe(
                    'Thank you for your order!',
                );
            });
        },
    );
});
