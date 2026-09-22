const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pages/LoginPage");
const { log } = require("node:console");

let loginPage;
test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.openLoginPage();
});

test("Day17.1 - Playwright Auto Wait", async () => {
  await expect(loginPage.usernameInput).toBeVisible();
  await loginPage.usernameInput.fill("john");
  await expect(loginPage.usernameInput).toHaveValue("john");
});

test("Day17.1 - Explict Wait Example", async ({ page }) => {
  await page.waitForSelector('input[name="username"]');
  const username = page.locator('input[name="username"]');
  await username.fill("john");
  await expect(username).toHaveValue("john");
});

test("Day17.1 - Auto Wait Preffered", async () => {
  await loginPage.usernameInput.fill("john");
  await expect(loginPage.usernameInput).toHaveValue("john");
  await expect(loginPage.loginButton).toBeVisible();
});

test("Day17.1- Load State", async ({ page }) => {
  await page.waitForLoadState("domcontentloaded");
  const username = page.locator('input[name="username"]');
  await expect(username).toBeVisible();
});

test("Day17.2 - Wait for Element State", async () => {
  const username = loginPage.usernameInput;
  await expect(username).toBeVisible();
  await expect(username).toBeEnabled();
  await username.fill("john");
  await expect(username).toHaveValue("john");
});

test("Day17.3 - Wait for URL Change", async () => {
  await loginPage.login("john", "demo");
  await expect(loginPage.page).toHaveURL(/overview\.htm/);
});

test("Day17.3 - Wait for Login Button", async () => {
  await expect(loginPage.loginButton).toBeVisible();
  await expect(loginPage.loginButton).toBeEnabled();
  await loginPage.usernameInput.fill("john");
  await loginPage.passwordInput.fill("demo");
  await expect(loginPage.loginButton).toBeEnabled();
});

test("Day17.3 - Wait for page Response", async ({ page }) => {
  const currentUrl = page.url();

  const responsePromise = page.waitForResponse(
    (response) => response.url() === currentUrl,
  );
  await page.reload();
  const response = await responsePromise;
  expect(response.status()).toBe(200);
});
