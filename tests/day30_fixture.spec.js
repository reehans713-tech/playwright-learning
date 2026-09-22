const { expect } = require("@playwright/test");
const { test } = require("./fixtures/testFixtures");

test("Day30 - Custom Fixture", async ({ loginPage }) => {
  await loginPage.openLoginPage();
  await loginPage.login("john", "demo");
  await expect(loginPage.page).toHaveURL(/overview\.htm/);
});
