import { Locator, Page } from "@playwright/test";
import { SortOption } from "../models/enums/SortOption";
import { AuthenticatedPage } from "./AuthenticatedPage";
import { parsePrice } from "../utils/Priceutils";

 
export class InventoryPage extends AuthenticatedPage {
 
    private readonly inventoryItems: Locator;
    private readonly productNames: Locator;
    private readonly productPrices: Locator;
    private readonly sortDropdown: Locator;
 
    public constructor(page: Page) {
        super(page);
        this.inventoryItems = page.locator('.inventory_item');
        this.productNames = page.locator('.inventory_item_name');
        this.productPrices = page.locator('.inventory_item_price');
        this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    }
 
    /**
     * Returns the card (container) of one product, found by its exact name.
     * All per-product actions start from this card, so a button is always
     * clicked inside the right product.
     */
    private getProductCard(productName: string): Locator {
        return this.inventoryItems.filter({
            has: this.page.getByText(productName, { exact: true }),
        });
    }
 
    /** Waits until the product list is rendered before reading from it. */
    private async waitForProducts(): Promise<void> {
        await this.inventoryItems.first().waitFor({ state: 'visible' });
    }
 
    public async isLoaded(): Promise<boolean> {
        return await this.sortDropdown.isVisible();
    }
 
    public async addProduct(productName: string): Promise<void> {
        await this.getProductCard(productName)
            .getByRole('button', { name: 'Add to cart' })
            .click();
    }
 
    public async removeProduct(productName: string): Promise<void> {
        await this.getProductCard(productName)
            .getByRole('button', { name: 'Remove' })
            .click();
    }
 
    public async sortProducts(option: SortOption): Promise<void> {
        await this.sortDropdown.selectOption(option);
    }
 
    public async getAllProductsNames(): Promise<string[]> {
        await this.waitForProducts();
        return await this.productNames.allTextContents();
    }
 
    public async getAllProductsPrices(): Promise<number[]> {
        await this.waitForProducts();
        const prices = await this.productPrices.allInnerTexts();
        return prices.map(price => parsePrice(price));
    }
 
    public async getProductsCount(): Promise<number> {
        await this.waitForProducts();
        return await this.inventoryItems.count();
    }
 
    public async openProductDetails(productName: string): Promise<void> {
        await this.productNames.getByText(productName, { exact: true }).click();
    }
}