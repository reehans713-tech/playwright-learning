const { expect } = require("@playwright/test");
const { test } = require("./fixtures/testFixtures");
const { bankData } = require("../test-data/bankData");

test("Day43 - API and UI Fixtures", async ({ loggedInPage, bankApi }) => {
  const accountId = await bankApi.getFirstAccountId(bankData.customerId);
  const expectedBalance = await bankApi.getAccountBalance(accountId);

  await loggedInPage
    .getByRole("link", {
      name: "Accounts Overview",
    })
    .click();

  const accountRow = loggedInPage.locator("table tbody tr").filter({
    hasText: String(accountId),
  });

  await expect(accountRow).toBeVisible();

  const uiBalance = Number(
    (await accountRow.locator("td").nth(1).innerText()).replace(/[$,]/g, ""),
  );

  expect(uiBalance).toBe(expectedBalance);
});
