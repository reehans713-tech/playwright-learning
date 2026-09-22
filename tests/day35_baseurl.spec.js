const { test, expect } = require("@playwright/test");

test("Day35 - Base URL", async ({ page }) => {
  await page.goto("/parabank/index.htm");

  await expect(page).toHaveTitle("ParaBank | Welcome | Online Banking");
  await expect(page.locator('input[name="username"]')).toBeVisible();
  await expect(page.locator('input[name="password"]')).toBeVisible();
});
