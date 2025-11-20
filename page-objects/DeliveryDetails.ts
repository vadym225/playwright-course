import { expect, Locator, Page } from "@playwright/test";

type DeliveryInfoType = {
  firstName: string;
  lastName: string;
  street: string;
  postCode: string;
  city: string;
  country: string;
};

export class DeliveryDetails {
  page: Page;
  firstNameInput: Locator;
  lastNameInput: Locator;
  streetInput: Locator;
  postcodeInput: Locator;
  cityInput: Locator;
  countryDropdown: Locator;
  saveAdressButton: Locator;
  savedAdressContainer: Locator;
  savedAdressFirstName: Locator;
  savedAdressLastName: Locator;
  savedAdressStreet: Locator;
  savedAdressPostcode: Locator;
  savedAdressCity: Locator;
  savedAdressCountry: Locator;
  continueToPaymentButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator("input[placeholder='First name']");
    this.lastNameInput = page.locator("input[placeholder='Last name']");
    this.streetInput = page.locator("input[placeholder='Street']");
    this.postcodeInput = page.locator("input[placeholder='Post code']");
    this.cityInput = page.locator("input[placeholder='City']");
    this.countryDropdown = page.locator("select[data-qa='country-dropdown']");
    this.saveAdressButton = page.locator("button[data-qa='save-address-button']");
    this.savedAdressContainer = page.locator("[data-qa='saved-address-container']")
    this.savedAdressFirstName = page.locator("[data-qa='saved-address-firstName']");
    this.savedAdressLastName = page.locator("[data-qa='saved-address-lastName']");
    this.savedAdressStreet = page.locator("[data-qa='saved-address-street']");
    this.savedAdressPostcode = page.locator("[data-qa='saved-address-postcode']");
    this.savedAdressCity = page.locator("[data-qa='saved-address-city']");
    this.savedAdressCountry = page.locator("[data-qa='saved-address-country']");
    this.continueToPaymentButton = page.locator("button[data-qa='continue-to-payment-button']");
  }

  fillDetails = async (deliveryInfo: DeliveryInfoType) => {
    await this.firstNameInput.waitFor();
    await this.firstNameInput.fill(deliveryInfo.firstName);
    await this.lastNameInput.waitFor();
    await this.lastNameInput.fill(deliveryInfo.lastName);
    await this.streetInput.waitFor();
    await this.streetInput.fill(deliveryInfo.street);
    await this.postcodeInput.waitFor();
    await this.postcodeInput.fill(deliveryInfo.postCode);
    await this.cityInput.waitFor();
    await this.cityInput.fill(deliveryInfo.city);
    await this.countryDropdown.waitFor();
    await this.countryDropdown.selectOption(deliveryInfo.country);
  };

  saveDetails = async () => {
    const adressCountBeforeSaving = await this.savedAdressContainer.count();
    await this.saveAdressButton.waitFor();
    await this.saveAdressButton.click();
    await expect(this.savedAdressContainer).toHaveCount(adressCountBeforeSaving + 1);

    await this.savedAdressFirstName.first().waitFor();
    expect(await this.savedAdressFirstName.first().innerText()).toBe(await this.firstNameInput.inputValue());

    await this.savedAdressLastName.first().waitFor();
    expect(await this.savedAdressLastName.first().innerText()).toBe(await this.lastNameInput.inputValue());

    await this.savedAdressStreet.first().waitFor();
    expect(await this.savedAdressStreet.first().innerText()).toBe(await this.streetInput.inputValue());

    await this.savedAdressPostcode.first().waitFor();
    expect(await this.savedAdressPostcode.first().innerText()).toBe(await this.postcodeInput.inputValue());

    await this.savedAdressCity.first().waitFor();
    expect(await this.savedAdressCity.first().innerText()).toBe(await this.cityInput.inputValue());

    await this.savedAdressCountry.first().waitFor();
    expect(await this.savedAdressCountry.first().innerText()).toBe(await this.countryDropdown.inputValue());
  }

  continueToPayment = async () => {
    await this.continueToPaymentButton.waitFor();
    await this.continueToPaymentButton.click();
    await this.page.waitForURL(/\/payment/, { timeout: 3000 });
  }
}
