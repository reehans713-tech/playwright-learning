const { expect } = require("@playwright/test");
const { test } = require("./fixtures/testFixtures");
const { LoginPage } = require("../pages/LoginPage");
const { BankApi } = require("../pages/BankApi");
const { bankData } = require("../test-data/bankData");
const { createDepositData } = require("../test-data/testDataFactory");
//const { request } = require("node:http");

test("Day40 - End-to-End Banking Flow", async ({ loginPage, request }) => {
  const bankApi = new BankApi(request);
  const accountId = await bankApi.getFirstAccountId(bankData.customerId);
  const beforeBalance = await bankApi.getAccountBalance(accountId);
  const { amount } = createDepositData(beforeBalance);

  const depositResponse = await bankApi.deposit(accountId, amount);
  expect(depositResponse.status()).toBe(200);

  const afterBalance = await bankApi.getAccountBalance(accountId);
  expect(afterBalance).toBe(beforeBalance + amount);

  await loginPage.openLoginPage();
  await loginPage.login("john", "demo");
  await expect(loginPage.page).toHaveURL(/overview\.htm/, {
    timeout: 15000,
  });

  const accountsLink = loginPage.page.getByRole("link", {
    name: "Accounts Overview",
  });

  await expect(accountsLink).toBeVisible({ timeout: 15000 });
  await expect(accountsLink).toBeEnabled({ timeout: 15000 });
  await accountsLink.click({ timeout: 15000 });

  const accountRow = loginPage.page.locator("table tbody tr").filter({
    hasText: String(accountId),
  });

  await expect(accountRow).toBeVisible();

  const uiBalance = Number(
    (await accountRow.locator("td").nth(1).innerText()).replace(/[$,]/g, ""),
  );

  expect(uiBalance).toBe(afterBalance);
});
