const { test } = require("./fixtures/testFixtures");
const { expect } = require("@playwright/test");
const { bankData } = require("../test-data/bankData");
const { expectValidAccount } = require("../utils/testHelpers");

test("Day51 - Reusable Account Validation", async ({ bankApi }) => {
  const accountId = await bankApi.getFirstAccountId(bankData.customerId);
  const { account } = await bankApi.getAccountDetails(accountId);

  expect(account).toMatchObject({
    id: accountId,
    customerId: bankData.customerId,
  });

  expect(account.type).toBeTruthy();
  expect(account.balance).toBeDefined();
});

//   const response = await bankApi.getAccount(accountId);

// //   expect(response.status()).toBe(200);

// //   const { account } = await bankApi.parseXmlResponse(response);

// //   expectValidAccount(account);
// //   expect(account.id).toBe(accountId)
