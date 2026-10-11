import { Locator, Page } from '@playwright/test';

export class HeaderComponent {
    public readonly cartBadge: Locator;
    private readonly cartIcon: Locator;
    private readonly sideMenuIcon: Locator;
    private readonly closeButton: Locator;

    public constructor(page: Page) {
        this.cartIcon = page.locator('.shopping_cart_link');
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.sideMenuIcon = page.locator('#react-burger-menu-btn');
        this.closeButton = page.locator('#react-burger-cross-btn');
    }

    public async openSideMenu(): Promise<void> {
        await this.sideMenuIcon.click();
    }

    public async closeSideMenu(): Promise<void> {
        await this.closeButton.click();
    }

    public async goToCartPage(): Promise<void> {
        await this.cartIcon.click();
    }

    /** Number shown on the cart badge, or 0 when the badge is not displayed. */
    public async getProductsCount(): Promise<number> {
        if (await this.cartBadge.isVisible()) {
            return Number(await this.cartBadge.innerText());
        }
        return 0;
    }
}
