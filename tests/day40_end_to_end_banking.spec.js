// const { expect } = require("@playwright/test");
// const { test } = require("./fixtures/testFixtures");
// const { LoginPage } = require("../pages/LoginPage");
// const { BankApi } = require("../pages/BankApi");
// const { bankData } = require("../test-data/bankData");
// const { createDepositData } = require("../test-data/testDataFactory");
// //const { request } = require("node:http");

// test("Day40 - End-to-End Banking Flow", async ({ loginPage, request }) => {
//   const bankApi = new BankApi(request);
//   const accountId = await bankApi.getFirstAccountId(bankData.customerId);
//   const beforeBalance = await bankApi.getAccountBalance(accountId);
//   const { amount } = createDepositData(beforeBalance);

//   const depositResponse = await bankApi.deposit(accountId, amount);
//   expect(depositResponse.status()).toBe(200);

//   const afterBalance = await bankApi.getAccountBalance(accountId);
//   expect(afterBalance).toBe(beforeBalance + amount);

//   await loginPage.openLoginPage();
//   await loginPage.login("john", "demo");
//   await expect(loginPage.page).toHaveURL(/overview\.htm/, {
//     timeout: 15000,
//   });

//   const accountsLink = loginPage.page.getByRole("link", {
//     name: "Accounts Overview",
//   });

//   await expect(accountsLink).toBeVisible({ timeout: 15000 });
//   await expect(accountsLink).toBeEnabled({ timeout: 15000 });
//   await accountsLink.click({ timeout: 15000 });

//   const accountRow = loginPage.page.locator("table tbody tr").filter({
//     hasText: String(accountId),
//   });

//   await expect(accountRow).toBeVisible();

//   const uiBalance = Number(
//     (await accountRow.locator("td").nth(1).innerText()).replace(/[$,]/g, ""),
//   );

//   expect(uiBalance).toBe(afterBalance);
// });


const { expect } = require("@playwright/test");
const { test } = require("./fixtures/testFixtures");
const { BankApi } = require("../pages/BankApi");
const { bankData } = require("../test-data/bankData");
const { createDepositData } = require("../test-data/testDataFactory");

test("Day40 - End-to-End Banking Flow", async ({ loginPage }) => {
  // --------------------------------------------------
  // 1. Perform UI Login FIRST to establish the session
  // --------------------------------------------------
  await loginPage.openLoginPage();
  await loginPage.login("john", "demo");
  await expect(loginPage.page).toHaveURL(/overview\.htm/, { timeout: 15000 });

  // --------------------------------------------------
  // 2. Instantiate BankApi with page.request (inherits session cookies)
  // --------------------------------------------------
  const bankApi = new BankApi(loginPage.page.request);

  // Reset database state to ensure clean baseline balances
  await bankApi.cleanDatabase();

  // --------------------------------------------------
  // 3. Perform API Operations (Get account & deposit)
  // --------------------------------------------------
  const accountId = await bankApi.getFirstAccountId(bankData.customerId);
  const beforeBalance = await bankApi.getAccountBalance(accountId);
  const { amount } = createDepositData(beforeBalance);

  // Deposit funds via API
  const depositResponse = await bankApi.deposit(accountId, amount);
  expect(depositResponse.status()).toBe(200);

  // Verify updated balance via API
  const afterBalance = await bankApi.getAccountBalance(accountId);
  expect(afterBalance).toBeCloseTo(beforeBalance + amount, 2);

  // --------------------------------------------------
  // 4. Validate UI reflects the new balance
  // --------------------------------------------------
  const accountsLink = loginPage.page.getByRole("link", {
    name: "Accounts Overview",
  });

  await expect(accountsLink).toBeVisible({ timeout: 15000 });
  await accountsLink.click({ timeout: 15000 });

  const accountRow = loginPage.page.locator("table tbody tr").filter({
    hasText: String(accountId),
  });

  await expect(accountRow).toBeVisible();

  // Extract and normalize UI balance
  const uiBalanceText = await accountRow.locator("td").nth(1).innerText();
  const uiBalance = Number(
    uiBalanceText.replace(/[$,\s]/g, "").replace(/\((.*)\)/, "-$1")
  );

  // Final assertion comparing UI with expected API balance
  expect(uiBalance).toBeCloseTo(afterBalance, 2);
  console.log("✅ Day 40 E2E Banking Flow Passed Successfully!");
});
