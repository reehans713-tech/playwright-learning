// const { expect } = require("@playwright/test");
// const { test } = require("./fixtures/testFixtures");
// const { bankData } = require("../test-data/bankData");

// test("Day43 - API and UI Fixtures", async ({ loggedInPage, bankApi }) => {
//   const accountId = await bankApi.getFirstAccountId(bankData.customerId);
//   const expectedBalance = await bankApi.getAccountBalance(accountId);

//   await loggedInPage
//     .getByRole("link", {
//       name: "Accounts Overview",
//     })
//     .click();

//   const accountRow = loggedInPage.locator("table tbody tr").filter({
//     hasText: String(accountId),
//   });

//   await expect(accountRow).toBeVisible();

//   const uiBalance = Number(
//     (await accountRow.locator("td").nth(1).innerText()).replace(/[$,]/g, ""),
//   );

//   expect(uiBalance).toBe(expectedBalance);
// });

const { expect } = require("@playwright/test");
const { test } = require("./fixtures/testFixtures");
const { bankData } = require("../test-data/bankData");

test("Day43 - API and UI Fixtures", async ({ loggedInPage, bankApi }) => {
  // 1. Reset ParaBank database state to fix 500 error on customer 12212
  await bankApi.cleanDatabase();
  
  // Wait 1 second for ParaBank in-memory database re-initialization
  await loggedInPage.waitForTimeout(1000);

  // 2. Fetch Account ID & expected balance for customer 12212
  const accountId = await bankApi.getFirstAccountId(bankData.customerId);
  const expectedBalance = await bankApi.getAccountBalance(accountId);

  // 3. Navigate to Accounts Overview in UI
  const accountsOverviewLink = loggedInPage.getByRole("link", {
    name: "Accounts Overview",
  });
  await expect(accountsOverviewLink).toBeVisible();
  await accountsOverviewLink.click();

  // 4. Find matching account row in UI
  const accountRow = loggedInPage.locator("table tbody tr").filter({
    hasText: String(accountId),
  });
  await expect(accountRow).toBeVisible();

  // 5. Extract & parse UI balance
  const uiBalanceText = await accountRow.locator("td").nth(1).innerText();
  const uiBalance = Number(
    uiBalanceText.replace(/[$,\s]/g, "").replace(/\((.*)\)/, "-$1")
  );

  // 6. Verify balances match
  expect(uiBalance).toBeCloseTo(expectedBalance, 2);
  console.log("✅ Day 43 Fixture Test Passed!");
});