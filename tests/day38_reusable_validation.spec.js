// const { test, expect } = require("@playwright/test");
// const { LoginPage } = require("../pages/LoginPage");
// const { BankApi } = require("../pages/BankApi");
// const { bankData } = require("../test-data/bankData");
// const { log } = require("node:console");

// test("Day38 - Reusable Balance Validation", async ({ page, request }) => {
//   const loginPage = new LoginPage(page);
//   const bankApi = new BankApi(request);

//   const accountId = await bankApi.getFirstAccountId(bankData.customerId);
//   const expectedBalance = await bankApi.getAccountBalance(accountId);

//   await loginPage.openLoginPage(page);
//   await loginPage.login("john", "demo");

//   await page.getByRole("link", { name: "Accounts Overview" }).click();

//   const accountRow = page.locator("table tbody tr").filter({
//     hasText: String(accountId),
//   });

//   await expect(accountRow).toBeVisible();

//   const uiBalance = await accountRow.locator("td").nth(1).innerText();
//   const actualBalance = Number(uiBalance.replace(/[$,]/g, ""));

//   expect(actualBalance).toBe(expectedBalance);
// });

const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pages/LoginPage");
const { BankApi } = require("../pages/BankApi");
const { bankData } = require("../test-data/bankData");

test("Day38 - Reusable Balance Validation", async ({ page }) => {
  const loginPage = new LoginPage(page);

  // 1. Perform UI Login FIRST to establish the session cookies
  await loginPage.openLoginPage(page);
  await loginPage.login("john", "demo");

  // 2. Instantiate BankApi with page.request (inherits logged-in JSESSIONID)
  const bankApi = new BankApi(page.request);

  // 3. Optional: Reset DB to ensure synchronized baseline state
  await bankApi.cleanDatabase();

  // 4. Get Account ID and API Balance using the authenticated session
  const accountId = await bankApi.getFirstAccountId(bankData.customerId);
  const expectedBalance = await bankApi.getAccountBalance(accountId);

  // 5. Navigate to Accounts Overview
  await page.getByRole("link", { name: "Accounts Overview" }).click();
  await expect(page).toHaveURL(/overview\.htm/);

  // 6. Locate account row in UI
  const accountRow = page.locator("table tbody tr").filter({
    hasText: String(accountId),
  });

  await expect(accountRow).toBeVisible();

  // 7. Parse UI Balance & normalize negative formats like -$100.00 or ($100.00)
  const uiBalanceText = await accountRow.locator("td").nth(1).innerText();
  const actualBalance = Number(
    uiBalanceText.replace(/[$,\s]/g, "").replace(/\((.*)\)/, "-$1")
  );

  // 8. Compare balances
  expect(actualBalance).toBeCloseTo(expectedBalance, 2);
  console.log("✅ Reusable balance validation passed!");
});
