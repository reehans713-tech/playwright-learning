const { test: base, expect } = require("@playwright/test");
const { LoginPage } = require("../pages/LoginPage");
const test = base.extend({
  loginPage: async ({ page }, use) => {
    await page.goto("https://parabank.parasoft.com/parabank/index.htm");
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
});
test("Day13- Verify Login Page Using Fixture", async ({ loginPage }) => {
  await expect(loginPage.usernameInput).toBeVisible();
  await expect(loginPage.passwordInput).toBeVisible();
  await expect(loginPage.loginButton).toBeVisible();
});

test("Day13- Valid Login using Fixture", async ({ loginPage }) => {
  await loginPage.login("john", "demo");
  await expect(loginPage.page).toHaveURL(/overview\.htm/);
});

test("Day13- Invalid Login using Fixture", async ({ loginPage }) => {
  await loginPage.login("wronguser123", "wrongpassword");
  await expect(loginPage.page).toHaveURL(/overview\.htm/);
});

test("Day13- Fixture Reuse Test", async ({ loginPage }) => {
  await expect(loginPage.usernameInput).toBeVisible();
  await expect(loginPage.passwordInput).toBeVisible();
  await expect(loginPage.loginButton).toBeVisible();

  console.log("LoginPage fixture is ready for this test");
});

//await expect (loginPage.loginError).toBeVisible();

//console.log(await loginPage.page.locator("body").innerText());
//});
