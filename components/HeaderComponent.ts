import { expect, Locator, Page } from "@playwright/test";

export class HeaderComponent{

    private readonly cartIcon: Locator;
    public readonly cartBadge: Locator;
    private readonly sideMenuIcon: Locator;
    private readonly closeButton: Locator;

    public constructor(page: Page){
        this.cartIcon = page.locator('.shopping_cart_link');
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.sideMenuIcon = page.locator('#react-burger-menu-btn');
        this.closeButton = page.locator('#react-burger-cross-btn');
    }

    public async openSideMenu(): Promise<void>{
        await this.sideMenuIcon.click();
    }

    public async closeSideMenu(): Promise<void>{
        await this.closeButton.click();
    }

    public async goToCartPage(): Promise<void>{
        await this.cartIcon.click();
    }

    public async getProductsCount(): Promise<number> {
        if (await this.cartBadge.isVisible()) {
            const count = await this.cartBadge.innerText();
            return Number(count);
        } else {
            return 0;
        }
    }

    public getCartBadge(): Locator {
        return this.cartBadge;
    }
}