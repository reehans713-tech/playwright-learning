const{test,expect} = require('@playwright/test');

//const { getBuiltinModule } = require('process');

//test('Day2 - Username and Password',async ({page}) =>{

test('Day2 - Registration Form',async ({ page }) => {

await page.goto('https://parabank.parasoft.com/parabank/index.htm');

await page.getByText('Register').click();

await page.locator('input[name="customer.firstName"]').fill('Ar');
await page.locator('input[name="customer.lastName"]').fill('Razzaq');

await page.pause();

});

// await page.locator('input[name="username"]').fill('Ar Razzaq');

// await page.locator('input[name="password"]').fill('Jannnat');

// await page.getByLabel('Username').fill('Ar Razzaq');

// await page.getByLabel('Password').fill('Jannat');

//await page.getByRole('button', {name: 'Log In'}).click();


