import { test, expect } from '@playwright/test';
import { TestConfig } from '../test.config';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';


let loginPage: LoginPage;
let productsPage: ProductsPage;
let config: TestConfig;

test.beforeEach(async ({ page }) => {
    config = new TestConfig();
    await page.goto(config.appUrl);
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);

})

test.afterEach(async ({ page }) => {
    await page.waitForTimeout(3000);
    await page.close();
})

test('Sorting products by Price: Low to High', async () => {
    await loginPage.loginValid(config);
    await productsPage.selectFilterOption('hilo');
    await productsPage.verifySortingLowToHigh();
})
