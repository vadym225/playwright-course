import { Locator, Page } from "@playwright/test";

export class LoginPage {
  page: Page;
  moveToSignUpButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.moveToSignUpButton = page.locator("[data-qa='go-to-signup-button']");
  }

  moveToSignUp = async () => {
    await this.moveToSignUpButton.waitFor();
    await this.moveToSignUpButton.click();
    await this.page.waitForURL(/\/signup/, { timeout: 3000 });
  };
}
