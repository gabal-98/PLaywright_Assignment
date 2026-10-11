import { Locator, Page } from '@playwright/test';
import { AuthenticatedPage } from './AuthenticatedPage';
import { parsePrice } from '../utils/priceUtils';

export class CartPage extends AuthenticatedPage {
    private readonly checkoutButton: Locator;
    private readonly continueShoppingButton: Locator;
    private readonly cartItems: Locator;
    private readonly cartItemsNames: Locator;
    private readonly cartItemsPrices: Locator;

    public constructor(page: Page) {
        super(page);
        this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
        this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
        this.cartItems = page.locator('.cart_item');
        this.cartItemsNames = page.locator('.cart_item .inventory_item_name');
        this.cartItemsPrices = page.locator('.cart_item .inventory_item_price');
    }

    private getProductCard(productName: string): Locator {
        return this.cartItems.filter({
            has: this.page.getByText(productName, { exact: true }),
        });
    }

    public async open(): Promise<void> {
        await this.navigate('/cart.html');
    }

    public async continueShopping(): Promise<void> {
        await this.continueShoppingButton.click();
    }

    public async goToCheckout(): Promise<void> {
        await this.checkoutButton.click();
    }

    public async removeProduct(productName: string): Promise<void> {
        await this.getProductCard(productName).getByRole('button', { name: 'Remove' }).click();
    }

    /** Does not wait, so it also works for an empty cart. Use expect.poll in tests. */
    public async getItemsNames(): Promise<string[]> {
        return this.cartItemsNames.allTextContents();
    }

    public async getItemsPrices(): Promise<number[]> {
        const prices = await this.cartItemsPrices.allTextContents();
        return prices.map(parsePrice);
    }

    public async getItemsCount(): Promise<number> {
        return this.cartItems.count();
    }
}
