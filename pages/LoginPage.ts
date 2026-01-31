import { Page, expect, Locator } from '@playwright/test';
import { TestConfig } from '../test.config';
export class LoginPage{
    //locators
    private readonly page: Page;
    private readonly inputUsername: Locator;
    private readonly inputPassword: Locator;
    private readonly btnLogin: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inputUsername = page.getByRole('textbox', { name: 'Username' });
        this.inputPassword = page.getByRole('textbox', { name: 'Password' });
        this.btnLogin = page.locator('[name="login-button"]');
        }


    //methods

    async enterUsername(username: string) {
        await this.inputUsername.fill(username);
    }
    async enterPassword(password: string) {
        await this.inputPassword.fill(password);
    }
    async clickLoginButton() {
        await this.btnLogin.click();
    }
    
    async verifyLoginSuccess() {
        // Example assertion: Check if the URL contains 'inventory' after login
        await expect(this.page).toHaveURL(/.*inventory.*/);
    }

    async verifyLoginFailure() {
        const errorMessage = this.page.locator(':text-is("Epic sadface: Username and password do not match any user in this service")');
        await expect(errorMessage).toBeVisible();
    }
    async loginValid(config: TestConfig){
    await this.enterUsername(config.email);
    await this.enterPassword(config.password);
    await this.clickLoginButton();
    await this.verifyLoginSuccess();
    }
}