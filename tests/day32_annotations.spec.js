const { test, expect } = require("@playwright/test");
test.describe("Day32 - Annotations", () => {
  test.beforeEach(({ page }) =>
    page.goto("https://parabank.parasoft.com/parabank/index.htm"),
  );

  test("Valid Login", async ({ page }) => {
    await page.fill('input[name="username"]', "john");
    await page.fill('input[name="password"]', "demo");
    await page.click('input[value="Log In"]');

    await expect(page).toHaveURL(/overview\.htm/);
  });

  test.skip("Future Feature", async () => {});

  test.fixme("Known Issue", async () => {});

  test("Slow Test", async ({ page }) => {
    test.slow();
    await expect(page).toHaveTitle("ParaBank | Welcome | Online Banking");
  });
});
