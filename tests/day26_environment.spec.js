require("dotenv").config();   //({ path: require("path").resolve(__dirname, "../.env") });
const { test, expect } = require("@playwright/test");

test("Day26 - Environment Variables", async ({ page }) => {
  await page.goto(process.env.BASE_URL);
  await page.locator('input[name="username"]').fill(process.env.TEST_USERNAME);
  await page.locator('input[name="password"]').fill(process.env.TEST_PASSWORD);
  await page.locator('input[value="Log In"]').click();
  await expect(page).toHaveURL(/overview\.htm/);
});
