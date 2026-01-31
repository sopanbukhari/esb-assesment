import { Page, expect, Locator } from '@playwright/test';

export class CartPage{
    //locators
    private readonly page: Page;
    private readonly btnCart: Locator;
    private readonly txtSauceLabsBackpack: Locator;
    private readonly txtSauceLabsBikelight: Locator;
    private readonly txtSauceLabsBoltTShirt: Locator;
    private readonly txtSauceLabsFleeceJacket: Locator;
    private readonly txtSauceLabsOnesie: Locator;
    private readonly txtSauceLabsRedTShirt: Locator;
    private readonly btnCheckout: Locator;


    constructor(page: Page) {
    this.page = page;
    this.btnCart = page.locator('a.shopping_cart_link');
    this.txtSauceLabsBackpack = page.getByText('Sauce Labs Backpack');
    this.txtSauceLabsBikelight = page.getByText('Sauce Labs Bike Light');
    this.txtSauceLabsBoltTShirt = page.locator("//div[normalize-space()='Sauce Labs Bolt T-Shirt']");
    this.txtSauceLabsFleeceJacket = page.getByText('Sauce Labs Fleece Jacket');
    this.txtSauceLabsOnesie = page.getByText('Sauce Labs Onesie');
    this.txtSauceLabsRedTShirt = page.getByText('Test.allTheThings() T-Shirt (Red)');
    this.btnCheckout = page.getByRole('button', { name: 'Checkout' });
    }

    async cartButtonClick() {
        await this.btnCart.click();
    }
    async checkoutButtonClick() {
        await this.btnCheckout.click();
    }

    async verifyElement(){
        await this.txtSauceLabsBackpack.isVisible();
        await this.txtSauceLabsBikelight.isVisible();
        await this.txtSauceLabsBoltTShirt.isVisible();
        await this.txtSauceLabsFleeceJacket.isVisible();
        await this.txtSauceLabsOnesie.isVisible();
        await this.txtSauceLabsRedTShirt.isVisible();
    }
    async verifyElementBackpack(){
        await this.txtSauceLabsBackpack.isVisible();
    }
    async verifyElementBikelight(){
        await this.txtSauceLabsBikelight.isVisible();
    }
}