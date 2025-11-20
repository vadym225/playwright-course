import { Locator, Page } from "@playwright/test";
import { isDesktopViewport } from "../utils/isDesktopViewport";

export class Navigation {
  page: Page;
  basketCounter: Locator;
  checkoutLink: Locator;
  mobileBurgerButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.basketCounter = page.locator('[data-qa="header-basket-count"]');
    this.checkoutLink = page.getByRole("link", { name: "Checkout" });
    this.mobileBurgerButton = page.locator('[data-qa="burger-button"]')
  }

  getBasketCount = async (): Promise<number> => {
    await this.basketCounter.waitFor();
    const text = await this.basketCounter.innerText();
    return parseInt(text, 10);
  };

  goToCheckout = async () => {
    if (!isDesktopViewport(this.page)) {
      await this.mobileBurgerButton.waitFor();
      await this.mobileBurgerButton.click();
    }
    await this.checkoutLink.waitFor();
    await this.checkoutLink.click();
    await this.page.waitForURL("/basket");
  };
}
