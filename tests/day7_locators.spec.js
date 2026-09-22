const { test, expect } = require("@playwright/test");
test("Day7 - Locators Practice", async ({ page }) => {
  await page.goto("https://parabank.parasoft.com/parabank/index.htm");

  // await page.locator('input[name="username"]').fill('Reehan');
  // await expect(page.locator('input[name="username"]')).toHaveValue('Reehan');

  await page.locator('input[type="text"]').fill("Reehan");
  await expect(page.locator('input[type="text"]')).toHaveValue("Reehan");

  await page.locator('input[name="password"]').fill("Nellore@2026");
  await expect(page.locator('input[name="password"]')).toHaveValue(
    "Nellore@2026",
  );

  await page.locator('input[value="Log In"]').click();
  await expect(page).toHaveURL(/overview\.htm/);
  await expect(
    page.getByRole("heading", { name: "Accounts overview" }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Accounts overview" }),
  ).toBeVisible();

  // await expect(page.getByRole('button',{name:'Log In'})).toBeVisible();
  // await page.locator('input[value="Log In"]').click();
  // //await page.getByRole('button',{name:'Log In'}).click();
  // await page.goBack();
  // await expect(page.getByRole('button',{name:'Log In'})).toBeVisible();
});
