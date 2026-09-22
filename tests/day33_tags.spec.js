const { test, expect } = require("@playwright/test");

test.describe("Day33 - Test Tags", () => {
  test("Valid Login, @smoke @login", async ({ page }) => {
    await page.goto("https://parabank.parasoft.com/parabank/index.htm");
    await page.fill('input[name="username"]', "john");
    await page.fill('input[name="password"]', "demo");
    await page.click('input[value="Log In"]');

    await expect(page).toHaveURL(/overview\.htm/);
  });

  test("Login Page Tittle @regression", async ({ page }) => {
    await page.goto("https://parabank.parasoft.com/parabank/index.htm");
    await expect(page).toHaveTitle("ParaBank | Welcome | Online Banking");
  });
});
