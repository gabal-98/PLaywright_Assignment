import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { AuthenticatedPage } from "./AuthenticatedPage";
import { parsePrice } from "../utils/Priceutils";

export class CheckoutOverviewPage extends AuthenticatedPage {

    private readonly paymentInformationLabel: Locator;
    private readonly shippingInformationLabel: Locator;
    private readonly itemsTotalLabel: Locator;
    private readonly taxLabel: Locator;
    private readonly totalPriceLabel: Locator;
    private readonly cancelButton: Locator;
    private readonly finishButton: Locator;


    public constructor(page: Page){
        super(page);
        this.paymentInformationLabel = page.locator('[data-test="payment-info-value"]');
        this.shippingInformationLabel = page.locator('[data-test="shipping-info-value"]');
        this.itemsTotalLabel = page.locator('.summary_subtotal_label');
        this.taxLabel = page.locator('.summary_tax_label');
        this.totalPriceLabel = page.locator('.summary_total_label');
        this.cancelButton = page.getByRole('button' , {name: 'Cancel'});
        this.finishButton = page.getByRole('button' , {name: 'Finish'});
    }

    public async cancelCheckout(): Promise<void>{
        await this.cancelButton.click();
    }

    public async finishCheckout(): Promise<void>{
        await this.finishButton.click();
    }

    public async getPaymentInformation(): Promise<string>{
        return await this.paymentInformationLabel.textContent() ?? '';
    }

    public async getShippingInformation(): Promise<string>{
        return await this.shippingInformationLabel.textContent() ?? '';
    }

    public async getItemsTotalPrice(): Promise<number>{
        return await parsePrice(await this.itemsTotalLabel.innerText());
    }

    public async getTax(): Promise<number>{
        return parsePrice(await this.taxLabel.innerText());
    }

    public async getTotalPrice(): Promise<number>{
        return parsePrice(await this.totalPriceLabel.innerText());
    }
}