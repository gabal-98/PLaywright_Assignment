import { Locator, Page } from '@playwright/test';
import { AuthenticatedPage } from './AuthenticatedPage';
import { CheckoutInfo } from '../models';

export class CheckoutInformationPage extends AuthenticatedPage {
    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly postalCodeInput: Locator;
    private readonly continueButton: Locator;
    private readonly cancelButton: Locator;
    private readonly errorMessage: Locator;

    public constructor(page: Page) {
        super(page);
        this.firstNameInput = page.getByPlaceholder('First Name');
        this.lastNameInput = page.getByPlaceholder('Last Name');
        this.postalCodeInput = page.getByPlaceholder('Zip/Postal Code');
        this.continueButton = page.getByRole('button', { name: 'Continue' });
        this.cancelButton = page.getByRole('button', { name: 'Cancel' });
        this.errorMessage = page.locator('h3[data-test="error"]');
    }

    public async fillCheckoutForm(info: CheckoutInfo): Promise<void> {
        await this.firstNameInput.fill(info.firstName);
        await this.lastNameInput.fill(info.lastName);
        await this.postalCodeInput.fill(info.postalCode);
    }

    public async continueCheckout(): Promise<void> {
        await this.continueButton.click();
    }

    public async cancelCheckout(): Promise<void> {
        await this.cancelButton.click();
    }

    public async getErrorMessage(): Promise<string> {
        return (await this.errorMessage.textContent()) ?? '';
    }
}
