import { test, expect } from '@playwright/test';
import { TestConfig } from '../test.config';
import { LoginPage } from '../pages/LoginPage';
import { CartPage } from '../pages/CartPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CheckOutPage } from '../pages/CheckOutPage';

let loginPage: LoginPage;
let productsPage: ProductsPage;
let config: TestConfig;
let checkoutPage: CheckOutPage;
let cartPage: CartPage;


test.beforeEach(async ({ page }) => {
    config = new TestConfig();
    await page.goto(config.appUrl);
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckOutPage(page);

})

test.afterEach(async ({ page }) => {

    await page.waitForTimeout(3000);
    await page.close();

})

test('Checkout 6 product', async () => {
    await loginPage.loginValid(config);
    await productsPage.addBackpackToCart();
    await productsPage.addBikelightToCart();
    await cartPage.cartButtonClick();
    await cartPage.verifyElementBackpack();
    await cartPage.verifyElementBikelight();
    await cartPage.checkoutButtonClick();
    await checkoutPage.enterFirstName("John");
    await checkoutPage.enterLastName("Doe");
    await checkoutPage.enterPostalCode("12345");
    await checkoutPage.clickContinue();
    await checkoutPage.verifyTotalPrice();
    await checkoutPage.verifyGrandTotal();
    await checkoutPage.clickFinish();
    await checkoutPage.verifyThankYouMessage();
});