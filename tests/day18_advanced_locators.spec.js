const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pages/LoginPage");
//const { use } = require("react");
//const { use } = require("react");

let loginPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.openLoginPage();
});

test("Day18.1 -  CSS Attribute Locator", async () => {
  const username = loginPage.page.locator('input[name="username"]');
  await expect(username).toBeVisible();
  await expect(username).toBeEnabled();
});

test("Day18.1 - Role Locator", async () => {
  const registerLink = loginPage.page.getByRole("link", { name: "Register" });
  await expect(registerLink).toBeVisible();
});

test("Day18.1 - nth Locator", async () => {
  const inputs = loginPage.page.locator("input");
  const firstInput = inputs.nth(0);
  await expect(firstInput).toBeVisible();
});

test("Day18.1 - Reusable Locator", async () => {
  const username = loginPage.page.locator('input[name="username"]');
  await username.fill("john");
  await expect(username).toHaveValue("john");
  await expect(username).toBeVisible();
});

test("Day18.1 - Filter Link By Text", async () => {
  const registerLink = loginPage.page
    .getByRole("link")
    .filter({ hasText: "Register" });
  await expect(registerLink).toBeVisible();
});

test("Day18.1 - Filter By Specific Text", async () => {
  const links = loginPage.page.getByRole("link");
  const registerLink = links.filter({ hasText: "Register" });
  await expect(registerLink).toHaveText("Register");
});

test("Day18.2 - Parent Child Locator", async () => {
  const loginForm = loginPage.page.locator("form").filter({
    has: loginPage.usernameInput,
  });
  await expect(loginForm).toBeVisible();
});

test("Day18.2 - Filter and Click", async () => {
  const registerLink = loginPage.page
    .getByRole("link")
    .filter({ hasText: "Register" });
  await registerLink.click();
  await expect(loginPage.page).toHaveURL(/register\.htm/);
});

test("Day18.3 - Stable Locator", async () => {
  const registerLink = loginPage.page.getByRole("link", { name: "Register" });
  await expect(registerLink).toBeVisible();
  await expect(registerLink).toBeEnabled();
});

test("Day18.3 - Locator Strategy", async () => {
  const roleLocator = loginPage.page.getByRole("link", { name: "Register" });
  const cssLocator = loginPage.page.locator('a[href*="register.htm"]');
  const nthLocator = loginPage.page
    .getByRole("link")
    .filter({ hasText: "Register" });
  await expect(roleLocator).toBeVisible();
  await expect(cssLocator).toBeVisible();
  await expect(nthLocator).toBeVisible();
});

test("Day18.3 - Best Locator in Real Scenario", async () => {
  const registerLink = loginPage.page.getByRole("link", { name: "Register" });
  await registerLink.click();
  await expect(loginPage.page).toHaveURL(/register\.htm/);
});
