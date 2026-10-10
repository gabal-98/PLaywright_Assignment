import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { HeaderComponent } from "../components/HeaderComponent";
import { SideMenuComponent } from "../components/SideMenuComponent";
 
/**
 * Base class for every page that is only reachable after login.
 * Owns the shared header and side menu, and exposes them through
 * public methods so tests never touch the components directly.
 *
 * IMPORTANT: never import a concrete page (LoginPage, InventoryPage...) here.
 */
export abstract class AuthenticatedPage extends BasePage {
 
    protected readonly header: HeaderComponent;
    protected readonly sideMenu: SideMenuComponent;
 
    public constructor(page: Page) {
        super(page);
        this.header = new HeaderComponent(page);
        this.sideMenu = new SideMenuComponent(page);
    }
 
    public async goToCartPage(): Promise<void> {
        await this.header.goToCartPage();
    }
 
    public async getCartCount(): Promise<string> {
        return await this.header.getProductsCount();
    }
 
    /** Exposed so tests can use retrying assertions: expect(page.cartBadge).toHaveText('3') */
    public get cartBadge(): Locator {
        return this.header.getCartBadge();
    }
 
    public async logout(): Promise<void> {
        await this.header.openSideMenu();
        await this.sideMenu.logout();
    }
 
    public async resetAppState(): Promise<void> {
        await this.header.openSideMenu();
        await this.sideMenu.resetAppState();
        await this.header.closeSideMenu();
    }
}