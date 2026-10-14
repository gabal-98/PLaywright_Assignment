import { Locator, Page } from '@playwright/test';
import { AuthenticatedPage } from './AuthenticatedPage';
import { parsePrice } from '../utils/priceUtils';

export class ProductDetailsPage extends AuthenticatedPage {
    private readonly productTitle: Locator;
    private readonly productDescription: Locator;
    private readonly productPrice: Locator;
    private readonly addToCartButton: Locator;
    private readonly removeButton: Locator;
    private readonly backToProductsButton: Locator;

    public constructor(page: Page) {
        super(page);
        this.productTitle = page.locator('.inventory_details_name');
        this.productDescription = page.locator('.inventory_details_desc');
        this.productPrice = page.locator('.inventory_details_price');
        this.addToCartButton = page.getByRole('button', { name: 'Add to cart' });
        this.removeButton = page.getByRole('button', { name: 'Remove' });
        this.backToProductsButton = page.getByRole('button', { name: 'Back to products' });
    }

    public async getProductTitle(): Promise<string> {
        return (await this.productTitle.textContent()) ?? '';
    }

    public async getProductDescription(): Promise<string> {
        return (await this.productDescription.textContent()) ?? '';
    }

    public async getProductPrice(): Promise<number> {
        return parsePrice(await this.productPrice.innerText());
    }

    public async addProductToCart(): Promise<void> {
        await this.addToCartButton.click();
    }

    public async removeProduct(): Promise<void> {
        await this.removeButton.click();
    }

    public async backToProducts(): Promise<void> {
        await this.backToProductsButton.click();
    }
}
