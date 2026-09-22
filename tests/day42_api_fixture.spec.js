const { expect } = require("@playwright/test");
const { test } = require("./fixtures/testFixtures");
const { bankData } = require("../test-data/bankData");


test("Day42 - Reusable API Fixture", async ({ bankApi }) => {
  const accountId = await bankApi.getFirstAccountId(bankData.customerId);
  const balance = await bankApi.getAccountBalance(accountId);

  expect(accountId).toBeTruthy();
  expect(balance).toBeDefined();

  console.log(`Account: ${accountId}, Balance: {balance}`);
});
