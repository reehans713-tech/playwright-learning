const { test, expect } = require("@playwright/test");
const { BankApi} = require("../pages/BankApi");
const { bankData } = require("../test-data/bankData");
const { createDepositData } = require("../test-data/testDataFactory");
const { request } = require("node:http");

test("Day39 - Dynamic Deposit Data", async ({ request }) => {
  const bankApi = new BankApi(request);
  const accountId = await bankApi.getFirstAccountId(bankData.customerId);
  const balance = await bankApi.getAccountBalance(accountId);
  const { amount } = createDepositData(balance);

  const response = await bankApi.deposit(accountId, amount);

  expect(response.status()).toBe(200);
  console.log(`Account: ${accountId}, Deposit: ${amount}`);
});
