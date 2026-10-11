import { Locator, Page } from '@playwright/test';
import { AuthenticatedPage } from './AuthenticatedPage';

export class CheckoutCompletePage extends AuthenticatedPage {
    private readonly orderStatus: Locator;
    private readonly successMessage: Locator;
    private readonly backHomeButton: Locator;

    public constructor(page: Page) {
        super(page);
        this.orderStatus = page.locator('[data-test="title"]');
        this.successMessage = page.locator('[data-test="complete-header"]');
        this.backHomeButton = page.getByRole('button', { name: 'Back Home' });
    }

    public async getOrderStatus(): Promise<string> {
        return (await this.orderStatus.textContent()) ?? '';
    }

    public async getSuccessMessage(): Promise<string> {
        return (await this.successMessage.textContent()) ?? '';
    }

    public async backToHome(): Promise<void> {
        await this.backHomeButton.click();
    }
}
