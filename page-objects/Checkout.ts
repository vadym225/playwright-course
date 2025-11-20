import { Locator, Page, expect } from "@playwright/test";

export class Checkout {
  page: Page;
  basketCards: Locator;
  basketItemPrice: Locator;
  BasketItemRemoveButton: Locator;
  continueToCheckoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.basketCards = page.locator('[data-qa="basket-card"]');
    this.basketItemPrice = page.locator('[data-qa="basket-item-price"]');
    this.BasketItemRemoveButton = page.locator(
      '[data-qa="basket-card-remove-item"]'
    );
    this.continueToCheckoutButton = page.locator("[data-qa='continue-to-checkout']");
  }

  removeCheapestProduct = async () => {
    await this.basketCards.first().waitFor();
    const itemsBeforeRemoval = await this.basketCards.count();
    await this.basketItemPrice.first().waitFor();
    const allPriceTexts = await this.basketItemPrice.allInnerTexts();
    const justNumbers = allPriceTexts.map((element) => {
      const withoutDollarSign = element.replace("$", "");
      return parseInt(withoutDollarSign, 10);
    });
    const smallestPrice = Math.min(...justNumbers);
    const smallestPriceIdx = justNumbers.indexOf(smallestPrice);
    const specificRemoveButton = this.BasketItemRemoveButton.nth(smallestPriceIdx);
    await specificRemoveButton.waitFor();
    await specificRemoveButton.click();
    await expect(this.basketCards).toHaveCount(itemsBeforeRemoval - 1);
  };

  continueToCheckout = async () => {
    await this.continueToCheckoutButton.waitFor();
    await this.continueToCheckoutButton.click();
    await this.page.waitForURL(/\/login/, {timeout: 3000});
  }
}
