const { test, expect } = require("@playwright/test");

test("Day 1 - Open Banking Website", async ({ page }) => {
  const username = "Ar Razzaq";
  const password = "Jannat";

  // console.log(username);
  // console.log(password);

  await page.goto("https://parabank.parasoft.com/parabank/index.htm");

  await page.locator('input[name ="username"]').fill(username);

  await page.locator('input[name = "password"]').fill(password);

  await page.locator('input[value="Log In"]').click();

  await expect(page.locator("p.error")).toBeVisible();

  await page.pause();
});
