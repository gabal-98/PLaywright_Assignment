import { Locator, Page } from '@playwright/test';
import { AuthenticatedPage } from './AuthenticatedPage';
import { parsePrice } from '../utils/priceUtils';

export class CheckoutOverviewPage extends AuthenticatedPage {
    private readonly itemNames: Locator;
    private readonly paymentInformation: Locator;
    private readonly shippingInformation: Locator;
    private readonly itemsTotal: Locator;
    private readonly tax: Locator;
    private readonly totalPrice: Locator;
    private readonly cancelButton: Locator;
    private readonly finishButton: Locator;

    public constructor(page: Page) {
        super(page);
        this.itemNames = page.locator('.cart_item .inventory_item_name');
        this.paymentInformation = page.locator('[data-test="payment-info-value"]');
        this.shippingInformation = page.locator('[data-test="shipping-info-value"]');
        this.itemsTotal = page.locator('.summary_subtotal_label');
        this.tax = page.locator('.summary_tax_label');
        this.totalPrice = page.locator('.summary_total_label');
        this.cancelButton = page.getByRole('button', { name: 'Cancel' });
        this.finishButton = page.getByRole('button', { name: 'Finish' });
    }

    public async cancelCheckout(): Promise<void> {
        await this.cancelButton.click();
    }

    public async finishCheckout(): Promise<void> {
        await this.finishButton.click();
    }

    public async getItemNames(): Promise<string[]> {
        return this.itemNames.allTextContents();
    }

    public async getPaymentInformation(): Promise<string> {
        return (await this.paymentInformation.textContent()) ?? '';
    }

    public async getShippingInformation(): Promise<string> {
        return (await this.shippingInformation.textContent()) ?? '';
    }

    public async getItemsTotalPrice(): Promise<number> {
        return parsePrice(await this.itemsTotal.innerText());
    }

    public async getTax(): Promise<number> {
        return parsePrice(await this.tax.innerText());
    }

    public async getTotalPrice(): Promise<number> {
        return parsePrice(await this.totalPrice.innerText());
    }
}
