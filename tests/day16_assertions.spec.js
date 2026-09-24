const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pages/LoginPage");
const { log } = require("node:console");

let loginPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.openLoginPage();
});

test("Day16 - Verify Login Button", async () => {
  await expect(loginPage.loginButton).toBeVisible();
  await expect(loginPage.loginButton).toBeEnabled();
});

test("Day16 - Verify Username Field", async () => {
  loginPage.username.fill("john");

  await expect(loginPage.username).toHaveValue("john");
  await expect(loginPage.username).toHaveAttribute("name", "username");
});

test("Day16 - Verify Login Button Text", async () => {
  await expect(loginPage.loginButton).toHaveText("Log In");
  await expect(loginPage.loginButton).toContainText("Log In");
});

test("Day16 - Verify Password Field", async () => {
  await expect(loginPage.password).toHaveAttribute("name", "password");
  await expect(loginPage.password).toHaveAttribute("type", "password");
});

test("Day16 - Verify Non Existing Element", async () => {
  const missingElement = loginPage.page.locator("#element-that-does-not-exist");
  await expect(missingElement).toBeHidden();
});
