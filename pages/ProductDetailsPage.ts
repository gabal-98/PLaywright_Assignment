import { Locator, Page } from "@playwright/test";
import { AuthenticatedPage } from "./AuthenticatedPage";
import { parsePrice } from "../utils/Priceutils";

export class ProductDetailsPage extends AuthenticatedPage {

    private readonly productTitleLocator: Locator;
    private readonly productDescriptionLocator: Locator;
    private readonly productPriceLocator: Locator;
    private readonly removeButton: Locator;
    private readonly addToCartButton: Locator;
    private readonly backToProductsButton: Locator;

    public constructor(page: Page){
        super(page);
        this.productTitleLocator = page.locator('.inventory_details_name');
        this.productDescriptionLocator = page.locator('.inventory_details_desc');
        this.productPriceLocator = page.locator('.inventory_details_price');
        this.removeButton = page.getByRole('button' , {name: "remove"});
        this.addToCartButton = page.getByRole('button' , {name: 'Add to Cart'});
        this.backToProductsButton = page.getByRole('button' , {name: 'Back to products'});
    }

    public async getProductTitle(): Promise<string> {
        return await this.productTitleLocator.textContent() ?? '';
    }

    public async getProductDescription(): Promise<string> {
        return await this.productDescriptionLocator.textContent() ?? '';
    }

    public async getProductPrice(): Promise<number> {
        return parsePrice(await this.productPriceLocator.innerText());
    }

    public async addProductToCart(): Promise<void> {
        await this.addToCartButton.click();
    }

    public async removeProduct(): Promise<void> {
        await this.removeButton.click();
    }

    public async backToProduct(): Promise<void> {
        await this.backToProductsButton.click();
    }
}