import { Page, expect, Locator } from '@playwright/test';
import { TestConfig } from '../test.config';
export class ProductsPage{
    //locators
    private readonly page: Page;
    private readonly btnCartBackpack: Locator;
    private readonly btnCartBikelight   : Locator;
    private readonly btnCartBoltTShirt: Locator;
    private readonly btnCartFleeceJacket: Locator;
    private readonly btnCartOnesie: Locator;
    private readonly btnCartRedTShirt: Locator;
    private readonly selectFilter: Locator;
    private readonly txtItemPrices: Locator;


    constructor(page: Page) {
    this.page = page;
    this.btnCartBackpack = page.locator('[name="add-to-cart-sauce-labs-backpack"]');
    this.btnCartBikelight = page.locator('[name="add-to-cart-sauce-labs-bike-light"]');
    this.btnCartBoltTShirt = page.locator('[name="add-to-cart-sauce-labs-bolt-t-shirt"]');
    this.btnCartFleeceJacket = page.locator('[name="add-to-cart-sauce-labs-fleece-jacket"]');
    this.btnCartOnesie = page.locator('[name="add-to-cart-sauce-labs-onesie"]');
    this.btnCartRedTShirt = page.locator('[name="add-to-cart-test.allthethings()-t-shirt-(red)"]');
    this.selectFilter = page.locator("//select[@class='product_sort_container']");
    this.txtItemPrices = page.locator('[data-test="inventory-item-price"]');
    }
    //methods

    async addBackpackToCart() {
        await this.btnCartBackpack.click();
    }
    async addBikelightToCart() {
        await this.btnCartBikelight.click();
    }
    async addBoltTShirtToCart() {
        await this.btnCartBoltTShirt.click();
    }
    async addFleeceJacketToCart() {
        await this.btnCartFleeceJacket.click();
    }
    async addOnesieToCart() {
        await this.btnCartOnesie.click();
    }
    async addRedTShirtToCart() {
        await this.btnCartRedTShirt.click();
    }
    async selectFilterOption(optionValue: string) {
        await this.selectFilter.selectOption(optionValue);
    }

    async getAllPrices(): Promise<number[]> {
        const pricesText = await this.txtItemPrices.allTextContents();
        return pricesText.map(price => parseFloat(price.replace('$', '')));
    }

    async verifySortingLowToHigh() {
        const prices = await this.getAllPrices();
        const firstPrice = prices[0];
        const maxPrice = Math.max(...prices);
        expect(firstPrice, `FirstPrice: ${firstPrice}, MaxPrice: ${maxPrice}`).toBe(maxPrice);
    }

}