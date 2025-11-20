import { test } from "@playwright/test";
import { v4 as uuidv4 } from "uuid";
import { ProductsPage } from "../page-objects/ProductsPage.ts";
import { Navigation } from "../page-objects/navigation.ts";
import { Checkout } from "../page-objects/Checkout.ts";
import { LoginPage } from "../page-objects/LoginPage.ts";
import { RegisterPage } from "../page-objects/RegisterPage.ts";
import { DeliveryDetails } from "../page-objects/DeliveryDetails.ts";
import { deliveryInfo } from "../data/DeliveryInfo.ts";
import { PaymentPage } from "../page-objects/PaymentPage.ts";
import { paymentDetails } from "../data/paymentDetails.ts";

test("New user full e2e test journey", async ({ page }) => {
  const productsPage = new ProductsPage(page);
  await productsPage.visit();
  await productsPage.addProductToBasket(0);
  await productsPage.addProductToBasket(1);
  await productsPage.addProductToBasket(2);
  const navigation = new Navigation(page);
  await navigation.goToCheckout();

  const checkout = new Checkout(page);
  await checkout.removeCheapestProduct();
  await checkout.continueToCheckout();

  const login = new LoginPage(page);
  await login.moveToSignUp();

  const registerPage = new RegisterPage(page);
  const email = `${uuidv4()}@gmail.com`;
  const password = uuidv4();
  await registerPage.signUpAsNewUser(email, password);

  const deliveryDetails = new DeliveryDetails(page);
  await deliveryDetails.fillDetails(deliveryInfo);
  await deliveryDetails.saveDetails();
  await deliveryDetails.continueToPayment();

  const paymentPage = new PaymentPage(page);
  await paymentPage.activateDiscount();
  await paymentPage.fillPaymentDetails(paymentDetails)
  await paymentPage.completePayment();
  await page.waitForURL(/\/thank-you/, { timeout: 3000 });
});
