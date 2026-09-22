const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pages/LoginPage");
const { beforeEach } = require("node:test");
let loginPage;

test.describe("Login Test", () => {
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    loginPage.openLoginPage();
  });

  test("Check Login Fields", async () => {
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
  });
  test("Valid Login", async ({ page }) => {
    await loginPage.login("john", "demo");
    await expect(loginPage.page).toHaveURL(/overview\.htm/);
  });
  test("Invalid Login", async ({ page }) => {
    await loginPage.login("wronguser123", "wrongpassword");
    await expect(loginPage.loginError).toBeVisible();
  });
});
