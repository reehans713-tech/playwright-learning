const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pages/LoginPage");
const { loginData } = require("../test-data/loginData");

loginData.forEach((data) => {
  test(`${data.testCase} - ${data.username}`, async ({ page }) => {
    await page.goto("https://parabank.parasoft.com/parabank/index.htm");
    const loginPage = new LoginPage(page);
    await loginPage.login(data.username, data.password);

    if (data.expected === "success") {
      await expect(page).toHaveURL(/overview\.htm/);
    } else {
      await expect(loginPage.loginError).toBeVisible();
      await expect(loginPage.loginError).toHaveText(data.expectedMessage);
    }
  });
});

//console.log("Expected result:", data.expected);
