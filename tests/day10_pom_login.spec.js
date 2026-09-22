const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pages/LoginPage");
test.beforeEach(async ({ page }) => {
  await page.goto("https://parabank.parasoft.com/parabank/index.htm");
});
test("Day10- Login using page object", async ({ page }) => {
  const loginpage = new LoginPage(page);
  await loginpage.login("john", "demo");
  await expect(page).toHaveURL(
    "https://parabank.parasoft.com/parabank/overview.htm",
  );
  await expect(
    page.getByRole("heading", { name: "Accounts Overview" }),
  ).toBeVisible();
});

test("Day10- Inavalid Login using page object", async ({ page }) => {
  //await page.goto("https://parabank.parasoft.com/parabank/index.htm");
  const loginpage = new LoginPage(page);
  await loginpage.login("john", "wrongpassword");
  await expect(loginpage.loginError).toBeVisible();
});

test("Day10 - Blank Login using page object", async ({ page }) => {
  const loginpage = new LoginPage(page);
  await loginpage.login();
  await expect(loginpage.blankLoginError).toBeVisible();
});
