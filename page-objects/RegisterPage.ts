import { Locator, Page } from "@playwright/test";

export class RegisterPage {
    page: Page;
    emailInput: Locator;
    passwordInput: Locator;
    registerButton: Locator;

    constructor(page:Page) {
        this.page = page;
        this.emailInput = page.locator("input[placeholder='E-Mail']");
        this.passwordInput = page.locator("input[placeholder='Password']");
        this.registerButton = page.getByRole("button", {name: "Register"});
    }

    signUpAsNewUser = async (email: string, password: string) => {
        await this.emailInput.waitFor();
        await this.emailInput.fill(email)
        await this.passwordInput.waitFor();
        await this.passwordInput.fill(password);
        await this.registerButton.waitFor();
        await this.registerButton.click();
    }
}