const { test, expect } = require("@playwright/test");
const { snapshot } = require("node:test");

test("Day22 - Debbuging with trace", async ({ page }) => {
  await page.context().tracing.start({ screenshots: true, snapshot: true });

  await page.goto("https://parabank.parasoft.com/parabank/index.htm");
  await page.locator('input[name= "username"]').fill("john");
  await page.locator('input[name="password"]').fill("demo");
  await page.locator('input[value="Log In"]').click();

  await expect(page).toHaveURL(/overview\.htm/);
  await page.screenshot({ path: "day22-login.png" });

  await page.context().tracing.stop({ path: "day22-trace.zip" });
});
