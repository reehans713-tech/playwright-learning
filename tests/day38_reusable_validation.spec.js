const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pages/LoginPage");
const { BankApi } = require("../pages/BankApi");
const { bankData } = require("../test-data/bankData");
const { log } = require("node:console");

test("Day38 - Reusable Balance Validation", async ({ page, request }) => {
  const loginPage = new LoginPage(page);
  const bankApi = new BankApi(request);

  const accountId = await bankApi.getFirstAccountId(bankData.customerId);
  const expectedBalance = await bankApi.getAccountBalance(accountId);

  await loginPage.openLoginPage(page);
  await loginPage.login("john", "demo");

  await page.getByRole("link", { name: "Accounts Overview" }).click();

  const accountRow = page.locator("table tbody tr").filter({
    hasText: String(accountId),
  });

  await expect(accountRow).toBeVisible();

  const uiBalance = await accountRow.locator("td").nth(1).innerText();
  const actualBalance = Number(uiBalance.replace(/[$,]/g, ""));

  expect(actualBalance).toBe(expectedBalance);
});
