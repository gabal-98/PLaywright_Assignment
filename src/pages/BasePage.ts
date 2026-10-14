import { Page } from '@playwright/test';

export abstract class BasePage {
    public constructor(protected readonly page: Page) {}

    public async navigate(path: string): Promise<void> {
        await this.page.goto(path);
    }

    public async getTitle(): Promise<string> {
        return this.page.title();
    }

    public async waitForUrl(url: string | RegExp): Promise<void> {
        await this.page.waitForURL(url);
    }
}
