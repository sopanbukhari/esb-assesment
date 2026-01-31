import { Page, expect, Locator } from '@playwright/test';

export class CheckOutPage{
    //locators
    private readonly page: Page;
    private readonly inputFirstName: Locator;
    private readonly inputLastName: Locator;
    private readonly inputPostalCode: Locator;
    private readonly btnContinue: Locator;
    private readonly btnCancel: Locator;
    private readonly txtPriceProduct: Locator;
    private readonly txtTotalPriceProduct: Locator;
    private readonly txtTax: Locator;
    private readonly txtGrandTotal: Locator;
    private readonly btnFinish: Locator;
    private readonly txtThankYou: Locator;
    

    constructor(page: Page) {
    this.page = page;
    this.inputFirstName = page.getByRole('textbox', { name: 'First Name' });
    this.inputLastName = page.getByRole('textbox', { name: 'Last Name' });
    this.inputPostalCode = page.getByRole('textbox', { name: 'Postal Code' });
    this.btnContinue = page.locator('[name="continue"]');
    this.btnCancel = page.getByRole('button', { name: 'Cancel' });
    this.txtPriceProduct = page.locator('[data-test="inventory-item-price"]');
    this.txtTotalPriceProduct = page.locator("//div[@class='summary_subtotal_label']");
    this.txtTax = page.locator("//div[@class='summary_tax_label']");
    this.txtGrandTotal = page.locator("//div[@class='summary_total_label']");
    this.btnFinish = page.getByRole('button', { name: 'Finish' });
    this.txtThankYou = page.getByRole('heading', { name: 'Thank you for your order!' });
    }

    //methods
    async enterFirstName(firstName: string) {
        await this.inputFirstName.fill(firstName);
    }
    async enterLastName(lastName: string) {
        await this.inputLastName.fill(lastName);
    }
    async enterPostalCode(postalCode: string) {
        await this.inputPostalCode.fill(postalCode);
    }
    async clickContinue() {
        await this.btnContinue.click();
    }
    async clickCancel() {
        await this.btnCancel.click();
    }
    
    async clickFinish() {
        await this.btnFinish.click();
    }

    async verifyThankYouMessage() {
        await expect(this.txtThankYou).toBeVisible();
    }

    async getTxtTotalPriceProduct(): Promise<number> {
        const totalText = await this.txtTotalPriceProduct.textContent();
        const totalPrice = totalText?.replace('Item total: $', '').trim() || '0';
        return parseFloat(totalPrice);
    }
    async getTxtTax(): Promise<number> {
        const tax = await this.txtTax.textContent();
        const totalTax = tax?.replace('Tax: $', '').trim() || '0';
        return parseFloat(totalTax);
    }

    async getTxtGrandTotal(): Promise<number> {
        const grandTotal = await this.txtGrandTotal.textContent();
        const finalGrandTotal = grandTotal?.replace('Total: $', '').trim() || '0';
        return parseFloat(finalGrandTotal);
    }

    async calculateTotalItemPrice(): Promise<number> {
        const pricesText = await this.txtPriceProduct.allTextContents();
        return pricesText.map(price => parseFloat(price.replace('$', ''))).reduce((acc, price) => acc + price, 0);
    }
    
    async getCalculatedGrandTotal(): Promise<number> {
        const totalPrice = await this.getTxtTotalPriceProduct();
        const tax = await this.getTxtTax();
        return totalPrice + tax;
    }

    async verifyTotalPrice() {
        const totalItemPrice = await this.calculateTotalItemPrice();
        const totalPriceProduct = await this.getTxtTotalPriceProduct();
        expect(totalPriceProduct, `Calculated: ${totalItemPrice}, Displayed: ${totalPriceProduct}`).toBeCloseTo(totalItemPrice, 2);
    }

    async verifyGrandTotal() {
        const calculatedGrandTotal = await this.getCalculatedGrandTotal();
        const displayedGrandTotal = await this.getTxtGrandTotal();
        expect(displayedGrandTotal, `Calculated: ${calculatedGrandTotal}, Displayed: ${displayedGrandTotal}`).toBeCloseTo(calculatedGrandTotal, 2);
    }
}