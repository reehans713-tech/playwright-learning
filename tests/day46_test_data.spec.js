const { expect } = require("@playwright/test");
const { test } = require("./fixtures/testFixtures");
const { bankData } = require("../test-data/bankData");
//const { BankApi } = require("../pages/BankApi");

test("Day46 - Reusable Test Data", async ({ bankApi }) => {
  const accountId = await bankApi.getFirstAccountId(bankData.customerId);
  const balance = await bankApi.getAccountBalance(accountId);

  expect(accountId).toBeTruthy();
  expect(balance).toBeDefined();
});
