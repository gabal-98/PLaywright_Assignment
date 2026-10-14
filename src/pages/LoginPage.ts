import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { Credentials } from '../models';

export class LoginPage extends BasePage {
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly errorMessage: Locator;

    public constructor(page: Page) {
        super(page);
        this.usernameInput = page.getByPlaceholder('Username');
        this.passwordInput = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.errorMessage = page.locator('h3[data-test="error"]');
    }

    public async open(): Promise<void> {
        await this.navigate('/');
    }

    public async login(credentials: Credentials): Promise<void> {
        await this.usernameInput.fill(credentials.username);
        await this.passwordInput.fill(credentials.password);
        await this.loginButton.click();
    }

    public async getErrorMessage(): Promise<string> {
        return (await this.errorMessage.textContent()) ?? '';
    }

    public async isLoaded(): Promise<boolean> {
        return this.loginButton.isVisible();
    }
}
