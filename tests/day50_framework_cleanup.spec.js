const { expect } = require("@playwright/test");
const { test } = require("./fixtures/testFixtures");
const { bankData } = require("../test-data/bankData");
const { formatBalance } = require("../utils/testHelpers");


test("Day50 - Framework Cleanup", async ({ bankApi }) => {
  const accountId = await bankApi.getFirstAccountId(bankData.customerId);
  const balance = await bankApi.getAccountBalance(accountId);

  expect(accountId).toBeTruthy();
  expect(formatBalance(balance)).toBeDefined();
});
