import { test, expect } from '@playwright/test';
import { TestConfig } from '../test.config';
import { LoginPage } from '../pages/LoginPage';
import { DataProvider } from '../utils/dataProvider';

let loginPage: LoginPage;
let config: TestConfig;


// data driven
const jsonPath="testdata/logindata.json";
const jsonTestData=DataProvider.getTestDataFromJson(jsonPath);

for (const data of jsonTestData){
    test(`Login Test with JSON Data: ${data.testName} @datadriven`, async({page})=>{

        config = new TestConfig();
        await page.goto(config.appUrl);

        loginPage = new LoginPage(page);
        await loginPage.enterUsername(data.email);
        await loginPage.enterPassword(data.password);
        await loginPage.clickLoginButton();
        
        if(data.expected.toLowerCase()==='success')
        {
            await loginPage.verifyLoginSuccess();
        }
        else{
            await loginPage.verifyLoginFailure();
        }

})
}


// test.beforeEach(async ({ page }) => {
//     config = new TestConfig();
//     await page.goto(config.appUrl);
//     loginPage = new LoginPage(page);

// })

// test.afterEach(async ({ page }) => {

//     await page.waitForTimeout(5000);
//     await page.close();

// })

// test('Login test with valid credentials', async () => {

//     await loginPage.enterUsername(config.email);
//     await loginPage.enterPassword(config.password);
//     await loginPage.clickLoginButton();
//     await loginPage.verifyLoginSuccess();
// });