const{test,expect} = require ('@playwright/test');

test('Verify Login Page Elements',async ({ page}) =>{

await page.goto('https://parabank.parasoft.com/parabank/index.htm');

await expect(page).toHaveTitle('ParaBank | Welcome | Online Banking');
await expect(page).toHaveURL(/parabank\/index\.htm/);

await expect(page.locator('h2')).toHaveText('Customer Login');
await expect(page.locator('input[name="username"]')).toHaveAttribute('type','text');

await expect(page.locator('input[name="username"]')).toBeVisible();
await expect(page.locator('input[name="password"]')).toBeVisible();
await expect(page.getByRole('button',{name: 'Log In'})).toBeVisible();
await expect(page.getByText('Forgot Login Info')).toBeVisible();
await page.locator('input[name="username"]').fill('Ar Razzaq');
await expect(page.locator('input[name="username"]')).toHaveValue('Ar Razzaq');
await page.locator('input[name="password"]').fill('Jannat');
await expect(page.locator('input[name="password"]')).toHaveValue('Jannat');
await expect(page.getByRole('button',{name : 'Log In'})).toBeEnabled();
await expect(page.locator('p.error')).toBeHidden();
await page.getByRole('button', {name: 'Log In'}).click();
await expect(page.locator('p.error')).toBeVisible();
await expect(page.locator('p.error')).toHaveText('The username and password could not be verified.');
});

test('Day4- Registration Form',async({page}) =>{

await page.goto('https://parabank.parasoft.com/parabank/register.htm');

await expect(page.getByText('Signing up is easy!')).toBeVisible();
await expect(page.locator('input[name="customer.firstName"]')).toBeEmpty();
await page.locator('input[name="customer.firstName"]').fill('Ar');
await expect(page.locator('input[name="customer.firstName"]')).not.toBeEmpty();
});






