import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { AuthenticatedPage } from "./AuthenticatedPage";


export class CheckoutInformationPage extends AuthenticatedPage {

    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly postalCodeInput: Locator;
    private readonly continueButton: Locator;
    private readonly cancelButton: Locator;
    private readonly errorMessageLabel: Locator;

    public constructor(page: Page){
        super(page);
        this.firstNameInput = page.getByPlaceholder('First Name');
        this.lastNameInput = page.getByPlaceholder('Last Name');
        this.postalCodeInput = page.getByPlaceholder('Zip/Postal Code');
        this.cancelButton = page.getByRole('button' , {name: 'Cancel'});
        this.continueButton = page.locator('#continue');
        this.errorMessageLabel = page.locator('h3[data-test="error"]');
    }

    public async fillCheckoutForm(firstname: string , lastname: string , postalCode: string): Promise<void>{
        await this.firstNameInput.fill(firstname);
        await this.lastNameInput.fill(lastname);
        await this.postalCodeInput.fill(postalCode);
    }

    public async continueCheckout(): Promise<void>{
       await this.continueButton.click();
    }

    public async cancelCheckout(): Promise<void>{
        await this.cancelButton.click();
    }

    public async getErrorMessage(): Promise<string> {
        return (await this.errorMessageLabel.textContent()) ?? '';
    }
}