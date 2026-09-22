const { test, expect } = require("@playwright/test");
test.beforeEach(async ({ page }) => {
  await page.goto("https://parabank.parasoft.com/parabank/index.htm");
});

test("Day9- Login page should be visible", async ({ page }) => {
  await expect(page.getByText("Customer Login")).toBeVisible();
}); //part 1

test("Day9- Username field should be visible", async ({ page }) => {
  await expect(page.locator('input[name="username"]')).toBeVisible();
}); //part2

test("Day9-Password field should be verified", async ({ page }) => {
  await expect(page.locator('input[name="password"]')).toBeVisible();
}); //part3

//Login with credentials

test("Day9-Valid Login", async ({ page }) => {
  await page.locator('input[name="username"]').fill("john");
  await page.locator('input[name="password"]').fill("demo");
  await page.locator('input[value="Log In"]').click();
  await expect(page).toHaveURL(/overview\.htm/);
  await expect(
    page.getByRole("heading", { name: "Accounts Overview" }),
  ).toBeVisible();
});

// Negative Testing

test("Day9- Invalid Login", async ({ page }) => {
  await page.locator('input[name="username"]').fill("wronguser");
  await page.locator('input[name="password"]').fill("wrongpassword");
  await page.locator('input[value="Log In"]').click();
  await expect(
    page.getByText("The username and password could not be verified."),
  ).toBeVisible();
});

//Logout scenario

// Login
test("Day9- Logout", async ({ page }) => {
  await page.locator('input[name="username"]').fill("john");
  await page.locator('input[name="password"]').fill("demo");
  await page.locator('input[value="Log In"]').click();

  //Verify successful log
  await expect(page).toHaveURL(/overview\.htm/);
  await expect(
    page.getByRole("heading", { name: "Accounts Overview" }),
  ).toBeVisible();

  //Logout
  await page.getByRole("link", { name: "Log Out" }).click();

  //Verify returned to login page
  await expect(page).toHaveURL(/index\.htm/);
});

//Blank Username

test("Day9- Blank Username", async ({ page }) => {
  await page.locator('input[name="password"]').fill("demo");
  await page.locator('input[value="Log In"]').click();
  await expect(
    page.getByText("Please enter a username and password."),
  ).toBeVisible();
});

//Blank Password

test("Day9- Blank Password", async ({ page }) => {
  await page.locator('input[name="username"]').fill("john");
  await page.locator('input[value="Log In"]').click();
  await expect(
    page.getByText("Please enter a username and password."),
  ).toBeVisible();
});

test("Day9 - Re-login after Logout", async ({ page }) => {
  await page.locator('input[name="username"]').fill("john");
  await page.locator('input[name="password"]').fill("demo");
  await page.locator('input[value="Log In"]').click();

  await expect(page).toHaveURL(/overview\.htm/);

  await page.getByRole("link", { name: "Log Out" }).click();

  await expect(page).toHaveURL(/index\.htm/);

  await page.locator('input[name="username"]').fill("john");
  await page.locator('input[name="password"]').fill("demo");
  await page.locator('input[value="Log In"]').click();

  await expect(page).toHaveURL(/overview\.htm/);
});
