const { expect } = require("@playwright/test");
const { test } = require("./fixtures/testFixtures");

test("Day41 - Authenticated Page Fixture", async ({ loggedInPage }) => {
  await expect(loggedInPage).toHaveURL(/overview\.htm/);

  await loggedInPage.getByRole("link", { name: "Accounts Overview" }).click();

  await expect(loggedInPage).toHaveURL(/overview\.htm/);
});
