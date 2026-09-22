const { test, expect } = require("@playwright/test");

test("Day 3- Inavalid Bank Login", async ({ page }) => {
  await page.goto("https://parabank.parasoft.com/parabank/index.htm");

  await page.locator('input[name="username"]').fill("Ar Razzaq"); //action

  await expect(page.locator('input[name="username"]')).toHaveValue("Ar Razzaq"); //verification

  await page.locator('input[name="password"]').fill("Jannat");

  await page.getByRole("button", { name: "Log In" }).click();

  //await expect(page.locator ('p.error')).toBeVisible();

  await expect(page.locator("p.error")).toHaveText(
    "The username and password could not be verified.",
  );

  await expect(page).toHaveURL(/login.htm/);
});
