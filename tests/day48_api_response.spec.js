const { expect } = require("@playwright/test");
const { test } = require("./fixtures/testFixtures");
const { bankData } = require("../test-data/bankData");

test("Day48 - API Response Validation  @api @smoke", async ({ bankApi }) => {
  const accountId = await bankApi.getFirstAccountId(bankData.customerId);
  const response = await bankApi.getAccount(accountId);

  expect(response.status()).toBe(200);

  const { account: details } = await bankApi.parseXmlResponse(response);

  expect(details).toMatchObject({
    id: accountId,
    customerId: bankData.customerId,
  });

  expect(details.type).toBeTruthy();
  expect(details.balance).toBeDefined();
});
