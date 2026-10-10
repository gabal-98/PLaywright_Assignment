import { Locator, Page } from "@playwright/test";

export class SideMenuComponent {

    private readonly logoutButton: Locator;
    private readonly resetAppStateButton: Locator;

    public constructor(page: Page){
        this.logoutButton = page.locator('#logout_sidebar_link');
        this.resetAppStateButton = page.locator('#reset_sidebar_link');
    }

    public async logout(): Promise<void>{
        await this.logoutButton.click();
    }

    public async resetAppState(): Promise<void>{
        await this.resetAppStateButton.click();
    }
}