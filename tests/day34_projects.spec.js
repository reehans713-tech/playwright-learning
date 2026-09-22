const { test, expect } = require("@playwright/test");

test("Day34 - Cross Browser Test", async ({ page }) => {
  await page.goto("https://parabank.parasoft.com/parabank/index.htm");
  await expect(page).toHaveTitle("ParaBank | Welcome | Online Banking");
});
