import { expect, Locator, Page } from "@playwright/test";

export class PaymentPage {
    page: Page;
    discountCode: Locator;
    discountInput: Locator;
    activateDiscountButton: Locator;
    discountActiveMessage: Locator;
    totalValueBeforeDiscount: Locator;
    totalValueAfterDiscount: Locator;
    creditCardOwnerInput: Locator;
    creditCardNumberInput: Locator;
    validUntilInput: Locator;
    creditCardCvcInput: Locator;
    payButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.discountCode = page.frameLocator("[data-qa='active-discount-container']").locator("[data-qa='discount-code']")
        this.discountInput = page.locator("[data-qa='discount-code-input']")
        this.activateDiscountButton = page.locator('[data-qa="submit-discount-button"]')
        this.discountActiveMessage = page.locator('[data-qa="discount-active-message"]')
        this.totalValueBeforeDiscount = page.locator('[data-qa="total-value"]')
        this.totalValueAfterDiscount = page.locator('[data-qa="total-with-discount-value"]')
        this.creditCardOwnerInput = page.locator('[data-qa="credit-card-owner"]')
        this.creditCardNumberInput = page.locator('[data-qa="credit-card-number"]')
        this.validUntilInput = page.locator('[data-qa="valid-until"]')
        this.creditCardCvcInput = page.locator('[data-qa="credit-card-cvc"]')
        this.payButton = page.locator('[data-qa="pay-button"]')
    }

    activateDiscount = async () => {
        await this.discountCode.waitFor();
        const code = await this.discountCode.innerText();
        await this.discountInput.waitFor();
        await this.discountInput.fill(code);
        await expect(this.discountInput).toHaveValue(code);

        // Option 2 for laggy inputs: slow typing
        // await this.discountInput.focus();
        // await this.page.keyboard.type(code, {delay: 1000});
        // expect(await this.discountInput.inputValue()).toBe(code);

        // const discountBefore = await this.discountActivatedMessage.isVisible();
        // expect(discountBefore).toBeFalsy();
        await expect(this.discountActiveMessage).toBeHidden();
        await this.activateDiscountButton.waitFor();
        await this.activateDiscountButton.click();
        await this.discountActiveMessage.waitFor();
        // const discountAfter = await this.discountActivatedMessage.isVisible();
        // expect(discountAfter).toBeTruthy();
        await expect(this.discountActiveMessage).toBeVisible();
        const totalBefore = await this.totalValueBeforeDiscount.innerText();
        const totalAfter = await this.totalValueAfterDiscount.innerText();
        expect(+totalAfter.replace("$", "")).toBeLessThan(+totalBefore.replace("$", ""));
    }

    fillPaymentDetails = async (
        paymentDetails: {
            owner: string,
            number: number,
            validUntil: string,
            cvc: number
        }) => {
        await this.creditCardOwnerInput.waitFor();
        await this.creditCardOwnerInput.fill(paymentDetails.owner);
        await this.creditCardNumberInput.waitFor();
        await this.creditCardNumberInput.fill(paymentDetails.number.toString());
        await this.validUntilInput.waitFor();
        await this.validUntilInput.fill(paymentDetails.validUntil);
        await this.creditCardCvcInput.waitFor();
        await this.creditCardCvcInput.fill(paymentDetails.cvc.toString());
    }

    completePayment = async () => {
        await this.payButton.waitFor();
        await this.payButton.click();
    }
}