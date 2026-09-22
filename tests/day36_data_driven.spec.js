const { test, expect } = require("@playwright/test");
const { loginData } = require("../test-data/loginData");

loginData.forEach(
  ({ username, password, expected, expectedMessage, testCase }) => {
    test(testCase, async ({ page }) => {
      await page.goto("/parabank/index.htm");
      await page.fill('input[name="username"]', username);
      await page.fill('input[name="password"]', password);
      await page.click('input[value="Log In"]');

      if (expected === "success") {
        await expect(page).toHaveURL(/overview\.htm/);
      } else {
        await expect(page.getByText(expectedMessage)).toBeVisible();
      }
    });
  },
);
