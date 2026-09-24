const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pages/LoginPage");
let loginPage;
test.describe("Day11- Login Test Suite", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://parabank.parasoft.com/parabank/index.htm");
    loginPage = new LoginPage(page);
  });

  test("Day11 - Verify Login Page", async ({ page }) => {
    await expect(loginPage.username).toBeVisible();
    await expect(loginPage.password).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
  });

  test("Day11- Valid Login using POM", async ({ page }) => {
    await loginPage.login("john", "demo");
    await expect(page).toHaveURL(/overview\.htm/);
    await expect(
      page.getByRole("heading", { name: "Accounts Overview" }),
    ).toBeVisible();
  });

  test("Day11- Inavalid Login using POM", async ({ page }) => {
    await loginPage.login("john", "wrongpassword");
    await expect(loginPage.loginError).toBeVisible();
  });
  test("Day11- Blank Login using POM", async ({ page }) => {
    await loginPage.login();
    await expect(loginPage.loginError).toBeVisible();
  });
});
