import { Locator, Page } from "@playwright/test";
import { AuthenticatedPage } from "./AuthenticatedPage";

export class CartPage extends AuthenticatedPage {

    private readonly checkoutButton: Locator;
    private readonly continueButton: Locator;
    private readonly cartItems: Locator;
    private readonly cartItemsNames: Locator;

    public constructor(page: Page){
        super(page);
        this.checkoutButton = page.getByRole('button' , {name: 'Checkout'});
        this.continueButton = page.getByRole('button' , {name: 'Continue Shopping'});
        this.cartItems = page.locator('.cart_item');
        this.cartItemsNames = page.locator('.inventory_item_name');

    }

    public async continueShopping(): Promise<void> {
        await this.continueButton.click();
    }

    public async goToCheckout(): Promise<void> {
        await this.checkoutButton.click();
    }

    private getProductCard(productName: string): Locator {
        return this.cartItems.filter({
            has: this.page.getByText(productName, { exact: true }),
        });
    }

    public async removeProduct(productName: string): Promise<void> {
        await this.getProductCard(productName)
            .getByRole('button', { name: 'Remove' })
            .click();
    }

    public async getItemsNames(): Promise<string[]>{
        return await this.cartItemsNames.allTextContents();
    }

    public async getItemsCount():Promise<string> {
        return await this.getCartCount();
    }
}