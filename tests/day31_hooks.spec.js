const { test, expect } = require("@playwright/test");

test.describe("Day31 - Test Hooks", () => {
  test.beforeEach(async ({ page }) =>
    page.goto("https://parabank.parasoft.com/parabank/index.htm"),
  );
  test.afterEach(() => console.log("Test completed"));

  test("Valid Login", async ({ page }) => {
    await page.fill('input[name="username"]', "john");
    await page.fill('input[name="password"]', "demo");
    await page.click('input[value="Log In"]');

    await expect(page).toHaveURL(/overview\.htm/);
  });

  test("Login Page Title", async ({ page }) => {
    await expect(page).toHaveTitle("ParaBank | Welcome | Online Banking");
  });
});
