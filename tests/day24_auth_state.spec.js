const { test, expect } = require("@playwright/test");

test("Day 24 - Save Login Session", async ({ page }) => {
  await page.goto("https://parabank.parasoft.com/parabank/index.htm");
  await page.locator('input[name="username"]').fill("john");
  await page.locator('input[name="password"]').fill("demo");
  await page.locator('input[value="Log In"]').click();
  await expect(page).toHaveURL(/overview\.htm/);
  await page.context().storageState({ path: "auth.json" });
});

test("Day24 - Reuse Login Session", async ({ browser }) => {
  const context = await browser.newContext({ storageState: "auth.json" });
  const page = await context.newPage();
  await page.goto("https://parabank.parasoft.com/parabank/index.htm");
  await expect(page).toHaveURL(
    "https://parabank.parasoft.com/parabank/index.htm",
  );
  await context.close();
});
