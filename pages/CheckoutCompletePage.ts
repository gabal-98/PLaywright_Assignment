import { Download, Locator, Page } from "@playwright/test";

import { AuthenticatedPage } from "./AuthenticatedPage";

export class CheckoutCompletePage extends AuthenticatedPage {

    private readonly orderStatusLabel: Locator;
    private readonly successMessageLabel: Locator;
    private readonly backHomeButton: Locator;
    private readonly generatePdfButton: Locator;

    public constructor(page: Page){
        super(page);
        this.orderStatusLabel = page.getByText('Checkout: Complete!');
        this.successMessageLabel = page.getByText('Thank you for your order!');
        this.backHomeButton = page.getByRole('button' , {name: 'Back Home'});
        this.generatePdfButton = page.getByRole('button' , {name: 'Generate PDF order'});
    }

    public async getOrderStatus(): Promise<string> {
        return await this.orderStatusLabel.textContent() ?? '';
    }

    public async getSuccessMessage(): Promise<string> {
        return await this.successMessageLabel.textContent() ?? '';
    }

    public async backToHome(): Promise<void> {
        await this.backHomeButton.click();
    }

    public async generatePdfFile(): Promise<Download>{
        const [download] = await Promise.all([
        this.page.waitForEvent('download'),
        this.generatePdfButton.click(),
       ]);
        return download;
    }
}