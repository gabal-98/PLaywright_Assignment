import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {

    private readonly usernameField: Locator;
    private readonly passwordField: Locator;
    private readonly loginButton:   Locator;
    private readonly errorMessageLabel: Locator;

    public constructor(page: Page){
        super(page);
        this.usernameField = page.getByPlaceholder("Username");
        this.passwordField = page.getByPlaceholder("Password");
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.errorMessageLabel = page.locator('h3[data-test="error"]');
    }


    public async login(username: string , password: string): Promise<void> {
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.loginButton.click();
    }

    public async getErrorMessage(): Promise<string> {
        const errorMessage = await this.errorMessageLabel.textContent();
        return errorMessage ?? "";
    }

    public async isLoaded(): Promise<boolean> {
        return await this.loginButton.isVisible();
    }
}