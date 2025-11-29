import { Locator, Page } from "@playwright/test";

export class MyAccountPage {
    page: Page;
    pageHeading: Locator;
    errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageHeading = page.locator('h1').getByText("My Account");
        this.errorMessage = page.locator('[data-qa="error-message"]')
    }

    visit = async () => {
        await this.page.goto("/my-account");
    }

    waitForPageHeading = async () => {
        await this.pageHeading.waitFor();
    }

    waitForErrorMessage = async () => {
        await this.errorMessage.waitFor();
    }
}