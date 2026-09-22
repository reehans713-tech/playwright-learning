const { test, expect } = require("@playwright/test");

test("Day8-Login flow", async ({ page }) => {
  await page.goto("https://parabank.parasoft.com/parabank/index.htm");

  await page.locator('input[name="username"]').fill("john");
  await page.locator('input[name="password"]').fill("demo");
  await page.locator('input[value="Log In"]').click();

  await expect(page).toHaveURL(/overview\.htm/);

  await expect(
    page.getByRole("heading", { name: "Accounts overview" }),
  ).toBeVisible();
});

test("Day8 -Invalid Login", async ({ page }) => {
  await page.goto("https://parabank.parasoft.com/parabank/index.htm");

  await page.locator('input[name="username"]').fill("john");
  await page.locator('input[name="password"]').fill("Ya latifu");
  await page.locator('input[value="Log In"]').click();

  await expect(
    page.getByText("The username and password could not be verified."),
  ).toBeVisible();
});

test("Day8 - Blank username", async ({ page }) => {
  await page.goto("https://parabank.parasoft.com/parabank/index.htm");

  await page.locator('input[name="password"]').fill("demo");
  await page.locator('input[value="Log In"]').click();
  await expect(
    page.getByText("Please enter a username and password."),
  ).toBeVisible();
});

// console.log(await page.locator("body").innerText());
