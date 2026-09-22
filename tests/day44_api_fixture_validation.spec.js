const { expect } = require("@playwright/test");
const { test } = require("./fixtures/testFixtures");
const { bankData } = require("../test-data/bankData");

test("Day44 - API Fixture Validation", async ({ bankApi }) => {
  const accountId = await bankApi.getFirstAccountId(bankData.customerId);
  const account = await bankApi.getAccount(accountId);

  expect(account.status()).toBe(200);

  // Shortened: Destructured 'account' directly out of the parsed XML result
  const { account: details } = await bankApi.parseXmlResponse(account);

  // Shortened: You can verify the object's properties in a single line or cleaner blocks
  expect(details).toMatchObject({
    id: accountId,
    customerId: bankData.customerId,
  });
  expect(details.type).toBeTruthy();
  expect(details.balance).toBeDefined();
});
