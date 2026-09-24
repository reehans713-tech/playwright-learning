const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pages/LoginPage");

let loginPage;
test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.openLoginPage();
});

test("day14 -  Valid Login", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login("john", "demo");
  await expect(loginPage.page).toHaveURL(/overview\.htm/);
});

test("Day14- Check Login Fields", async ({ page }) => {
  await expect(loginPage.username).toBeVisible();
  await expect(loginPage.password).toBeVisible();
  await expect(loginPage.loginButton).toBeVisible();
});

test("Day14 - Invalid Login", async ({ page }) => {
  await loginPage.login("wronguser123", "wrongpassword");
  await expect(loginPage.loginError).toBeVisible();
});

test("Day14- Another Valid Login", async ({ page }) => {
  await loginPage.login("john", "demo");
  await expect(page).toHaveURL(/overview\.htm/);
});
