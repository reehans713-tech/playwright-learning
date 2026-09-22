const { test, expect } = require("@playwright/test");
const { XMLParser } = require("fast-xml-parser");
const { BankApi } = require("../../pages/BankApi"); // Goes two folders up to reach pages/BankApi.js.
const { bankData } = require("../../test-data/bankData"); // Imports the reusable banking test data from the test-data folder.
const { request } = require("node:http");
//const { request } = require("node:http");

test("Day19.5 - Real ParaBank Login API", async ({ request }) => {
  const response = await request.get(
    "https://parabank.parasoft.com/parabankv2/services/bank/login/john/demo",
  );

  const body = await response.text();
  expect(body).toContain("<customer>");
  expect(body).toContain("<firstName>John</firstName>");
  expect(body).toContain("<lastName>Smith</lastName>");
});

test("Day19.5 - Extract Customer ID from XML", async ({ request }) => {
  const response = await request.get(
    "https://parabank.parasoft.com/parabankv2/services/bank/login/john/demo",
  );
  const body = await response.text();
  const customerId = body.match(/<id>(.*)<\/id/)[1];
  console.log("Customer ID:", customerId);
  expect(customerId).toBe("12212");
});

// test("Day19.5 - Get Customer Accounts", async ({ request }) => {
//   const customerId = "12212";
//   const response = await request.get(
//     `https://parabank.parasoft.com/parbankv2/services/bank/customers/${customerId}/accounts`,
//   );
//   const body = await response.text();

//   console.log("Status:", response.status());
//   console.log("Accounts Response:", body);
//   expect(response.status()).toBe(200);
// });

test("Day19.5 - Investigate Customer Accounts API", async ({ request }) => {
  const response = await request.get(
    "https://parabank.parasoft.com/parabank/services/bank/customers/12212/accounts",
  );

  console.log("Status:", response.status());
  console.log("Body:", await response.text());
});

test("Day19.5 - Validate Customer Accounts", async ({ request }) => {
  const response = await request.get(
    "https://parabank.parasoft.com/parabank/services/bank/customers/12212/accounts",
  );
  const body = await response.text();
  expect(response.status()).toBe(200);
  expect(body).toContain("<accounts>");
  expect(body).toContain("<customerId>12212</customerId>");
  expect(body).toContain("<type>CHECKING</type>");
  expect(body).toContain("<type>SAVINGS</type>");
});

test("Day19.5 - Extract Account ID Dynamically", async ({ request }) => {
  const response = await request.get(
    "https://parabank.parasoft.com/parabank/services/bank/customers/12212/accounts",
  );

  expect(response.status()).toBe(200);
  const body = await response.text();

  const parser = new XMLParser();
  const data = parser.parse(body);

  const accounts = data.accounts.account;
  const firstAccountId = accounts[0].id;

  console.log("First Account Id", firstAccountId);

  expect(firstAccountId).toBeTruthy();
  expect(typeof firstAccountId).toBe("number");
});

test("Day19.6 - API Chaining: Get Account Details", async ({ request }) => {
  // Step 1: Get customer accounts
  const accountsResponse = await request.get(
    "https://parabank.parasoft.com/parabank/services/bank/customers/12212/accounts",
  );
  expect(accountsResponse.status()).toBe(200);

  // Step 2: Read XML response
  const accountsBody = await accountsResponse.text();

  // Step 3: Parse XML into JavaScript object
  const parser = new XMLParser();
  const accountsData = parser.parse(accountsBody);

  // Step 4: Extract first account ID dynamically
  const accounts = accountsData.accounts.account;
  const accountId = accounts[0].id;

  console.log("Dyanamic Account Id", accountId);

  // Step 5: Use that ID in the next API
  const accountResponse = await request.get(
    `https://parabank.parasoft.com/parabank/services/bank/accounts/${accountId}`,
  );

  console.log("Account API STATUS", accountResponse.status());

  // Step 6: Read account details
  const accountBody = await accountResponse.text();

  console.log("ACCOUNTS DETAILS", accountBody);
  expect(accountResponse.status()).toBe(200);
});

test("Day19.7 - Validate Account Details", async ({ request }) => {
  const accountsResponse = await request.get(
    "https://parabank.parasoft.com/parabank/services/bank/customers/12212/accounts",
  );
  expect(accountsResponse.status()).toBe(200);
  const accountsBody = await accountsResponse.text();

  const parser = new XMLParser();
  const accountsData = parser.parse(accountsBody);

  const accountId = accountsData.accounts.account[0].id;

  const accountResponse = await request.get(
    `https://parabank.parasoft.com/parabank/services/bank/accounts/${accountId}`,
  );

  expect(accountResponse.status()).toBe(200);

  const accountBody = await accountResponse.text();
  const accountData = parser.parse(accountBody);

  console.log("ACCOUNTS DATA", accountData);

  expect(accountData.account.id).toBe(accountId);
  expect(accountData.account.customerId).toBe(12212);
  expect(accountData.account.type).toBeTruthy();
  expect(accountData.account.balance).toBeDefined();
});

test("Day19.8 - Real ParaBank Deposit API", async ({ request }) => {
  const accountId = 12345;
  const amount = 10;
  const response = await request.post(
    `https://parabank.parasoft.com/parabank/services/bank/deposit?accountId=${accountId}&amount=${amount}`,
  );

  const body = await response.text();

  console.log("DEPOSIT API STATUS", response.status());
  console.log("DEPOSIT API RESPONSE", body);

  expect(response.status()).toBe(200);
  expect(body).toContain("Successfully deposited");
  expect(body).toContain("$10");
  expect(body).toContain("#12345");
});

// test("Day19.9 - Dynamic Account ID Deposit", async ({ request }) => {
//   const accountsResponse = await request.get(
//     "https://parabank.parasoft.com/parabank/services/bank/customers/12212/accounts",
//   );
//   expect(accountsResponse.status()).toBe(200);

//   const accountsBody = await accountsResponse.text();

//   const parser = new XMLParser();
//   const accountsData = parser.parse(accountsBody);

//   const accountId = accountsData.accounts.account[0].id;

//   console.log("DYNAMIC ACCOUNT ID", accountId);

//   const amount = 10;

//   const depositResponse = await request.get(
//     `https://parabank.parasoft.com/parabank/services/bank/deposit?accountId=${accountId}&{amount})`,
//   );

//   const depositBody = await depositResponse.text();

//   console.log("DEPOSIT STATUS", depositResponse.status());
//   console.log("DEPOSIT RESPONSE", depositBody);

//   expect(depositResponse.status()).toBe(200);
//   expect(depositBody).toContain("Successfully deposited");
//   expect(depositBody).toContain($10);
//   expect(depositBody).toContain(`#${accountId}`);
// });

test("Day19.9 - Dynamic Account ID Deposit", async ({ request }) => {
  // Step 1: Get customer accounts
  const accountsResponse = await request.get(
    "https://parabank.parasoft.com/parabank/services/bank/customers/12212/accounts",
  );

  expect(accountsResponse.status()).toBe(200);

  // Step 2: Read XML response
  const accountsBody = await accountsResponse.text();

  // Step 3: Convert XML into JavaScript object
  const parser = new XMLParser();
  const accountsData = parser.parse(accountsBody);

  // Step 4: Extract account ID dynamically
  const accountId = accountsData.accounts.account[0].id;

  console.log("Dynamic Account ID:", accountId);

  // Step 5: Deposit $10 into that account
  const amount = 10;

  const depositResponse = await request.post(
    `https://parabank.parasoft.com/parabank/services/bank/deposit?accountId=${accountId}&amount=${amount}`,
  );

  const depositBody = await depositResponse.text();

  console.log("Deposit Status:", depositResponse.status());
  console.log("Deposit Response:", depositBody);

  // Step 6: Validate deposit
  expect(depositResponse.status()).toBe(200);
  expect(depositBody).toContain("Successfully deposited");
  expect(depositBody).toContain("$10");
  expect(depositBody).toContain(`#${accountId}`);
});

test("Day19.10 - Validate Balance After Deposit", async ({ request }) => {
  const accountId = 12345;
  const amount = 10;

  // Step 1: Get account details BEFORE deposit
  const beforeResponse = await request.get(
    `https://parabank.parasoft.com/parabank/services/bank/accounts/${accountId}`,
  );

  expect(beforeResponse.status()).toBe(200);

  const beforeBody = await beforeResponse.text();

  const parser = new XMLParser();
  const beforeData = parser.parse(beforeBody);

  const beforeBalance = beforeData.account.balance;

  console.log("Balance BEFORE:", beforeBalance);

  // Step 2: Deposit $10
  const depositResponse = await request.post(
    `https://parabank.parasoft.com/parabank/services/bank/deposit?accountId=${accountId}&amount=${amount}`,
  );

  expect(depositResponse.status()).toBe(200);

  // Step 3: Get account details AFTER deposit
  const afterResponse = await request.get(
    `https://parabank.parasoft.com/parabank/services/bank/accounts/${accountId}`,
  );

  expect(afterResponse.status()).toBe(200);

  const afterBody = await afterResponse.text();

  const afterData = parser.parse(afterBody);

  const afterBalance = afterData.account.balance;

  console.log("Balance AFTER:", afterBalance);

  // Step 4: Validate balance increased by $10
  expect(afterBalance).toBe(beforeBalance + amount);
});

test("Day19.11 - End-to-End Dynamic Deposit Validation", async ({
  request,
}) => {
  const amount = 10; // const amount = 10; , const parser = new XMLParser();
  const parser = new XMLParser();

  // Step 1: Get customer accounts
  const accountsResponse = await request.get(
    "https://parabank.parasoft.com/parabank/services/bank/customers/12212/accounts",
  );

  expect(accountsResponse.status()).toBe(200);

  const accountsBody = await accountsResponse.text();
  const accountsData = parser.parse(accountsBody);

  // Step 2: Extract account ID dynamically
  const accountId = accountsData.accounts.account[0].id; // const accountId =accountsData.accounts.account[0].id;

  console.log("Dynamic Account ID:", accountId);

  // Step 3: Get account BEFORE deposit
  const beforeResponse = await request.get(
    `https://parabank.parasoft.com/parabank/services/bank/accounts/${accountId}`,
  );

  expect(beforeResponse.status()).toBe(200); // expect(beforeResponse.status()).toBe(200);

  const beforeBody = await beforeResponse.text(); // const beforeBody = await beforeResponse.text();
  const beforeData = parser.parse(beforeBody); // const beforeData = parser.parse(beforeBody);

  const beforeBalance = beforeData.account.balance; // const beforeBalance = beforeData.account.balance;

  console.log("Balance BEFORE:", beforeBalance); // console.log("Balance Before:", beforeBalance);

  // Step 4: Deposit $10
  const depositResponse = await request.post(
    `https://parabank.parasoft.com/parabank/services/bank/deposit?accountId=${accountId}&amount=${amount}`,
  );

  expect(depositResponse.status()).toBe(200); //expect(depositResponse.status()).toBe(200);

  const depositBody = await depositResponse.text(); //const depositBody = await depositResponse.text();

  console.log("Deposit Response:", depositBody);

  expect(depositBody).toContain("Successfully deposited");
  expect(depositBody).toContain(`#${accountId}`);

  // Step 5: Get account AFTER deposit
  const afterResponse = await request.get(
    `https://parabank.parasoft.com/parabank/services/bank/accounts/${accountId}`,
  );

  expect(afterResponse.status()).toBe(200);

  const afterBody = await afterResponse.text();
  const afterData = parser.parse(afterBody);

  const afterBalance = afterData.account.balance;

  console.log("Balance AFTER:", afterBalance);

  // Step 6: Validate business logic
  expect(afterBalance).toBe(beforeBalance + amount);
});

test("Day20.1 - Use Reusable Bank API", async ({ request }) => {
  // Creates a test and receives Playwright's API request fixture.

  const bankApi = new BankApi(request); // Creates a BankApi object and gives it Playwright's request object.

  const response = await bankApi.getCustomerAccounts(12212); // Calls our reusable method to get customer 12212's accounts.

  expect(response.status()).toBe(200); // Verifies that the API request was successful with HTTP status 200.

  const body = await response.text(); // Reads the XML response body as text.

  console.log("Customer Accounts:", body); // Prints the actual API response so we can inspect it.

  expect(body).toContain("<accounts>"); // Verifies that the response contains the expected accounts XML element.
});

test("Day20.2 - Use Multiple Reusable API Methods", async ({ request }) => {
  // Creates a test and receives Playwright's API request fixture.

  const bankApi = new BankApi(request); // Creates our reusable BankApi object using Playwright's request fixture.

  const accountsResponse = await bankApi.getCustomerAccounts(12212); // Calls the reusable method to retrieve customer 12212's accounts.

  expect(accountsResponse.status()).toBe(200); // Verifies that the customer accounts API returned HTTP 200.

  const accountsBody = await accountsResponse.text(); // Reads the XML response as text.

  const parser = new XMLParser(); // Creates an XML parser so we can convert the XML response into a JavaScript object.

  const accountsData = parser.parse(accountsBody); // Converts the XML response into a JavaScript object.

  const accounts = accountsData.accounts.account; // Gets the account data returned by the API; it can be an object or an array.

  const accountId = Array.isArray(accounts) ? accounts[0].id : accounts.id; // If multiple accounts exist, take the first ID; if only one exists, take its ID directly.

  console.log("Dynamic Account ID:", accountId); // Prints the dynamically extracted account ID.

  const accountResponse = await bankApi.getAccount(accountId); // Uses our reusable getAccount() method with the dynamic account ID.

  expect(accountResponse.status()).toBe(200); // Verifies that the account details API returned HTTP 200.

  const accountBody = await accountResponse.text(); // Reads the account details response as text.

  console.log("Account Details:", accountBody); // Prints the actual account details returned by the API.

  const depositResponse = await bankApi.deposit(accountId, 10); // Uses the reusable deposit() method to deposit $10 into the dynamic account.

  expect(depositResponse.status()).toBe(200); // Verifies that the deposit API returned HTTP 200.

  const depositBody = await depositResponse.text(); // Reads the deposit API response as text.

  console.log("Deposit Response:", depositBody); // Prints the deposit result returned by the API.

  expect(depositBody).toContain("Successfully deposited"); // Verifies that the API confirms the deposit was successful.

  expect(depositBody).toContain(`#${accountId}`); // Verifies that the deposit response contains the same dynamically selected account ID.
});

test("Day20.3 - Get First Account ID Using API Helper", async ({ request }) => {
  // Creates a Playwright API test and provides the request fixture.

  const bankApi = new BankApi(request); // Creates the BankApi object so we can use its reusable methods.

  const accountId = await bankApi.getFirstAccountId(12212); // Calls our new helper method and gets the first account ID for customer 12212.

  console.log("Account ID from Helper:", accountId); // Prints the dynamically returned account ID so we can verify it.

  expect(accountId).toBeTruthy(); // Verifies that an account ID was actually returned.

  expect(typeof accountId).toBe("number"); // Verifies that the returned account ID is a JavaScript number.
});

test("Day20.4 - Complete Deposit Using API Helper", async ({ request }) => {
  // Creates a test for a complete deposit flow using reusable API methods.

  const bankApi = new BankApi(request); // Creates the reusable BankApi object using Playwright's API request fixture.

  const accountId = await bankApi.getFirstAccountId(12212); // Dynamically gets the first account ID belonging to customer 12212.

  console.log("Account ID:", accountId); // Prints the dynamically selected account ID.

  const beforeResponse = await bankApi.getAccount(accountId); // Gets the account details before making the deposit.

  expect(beforeResponse.status()).toBe(200); // Verifies that the account details API returned HTTP 200.

  const beforeBody = await beforeResponse.text(); // Reads the account details XML response as text.

  const parser = new XMLParser(); // Creates an XML parser to convert the XML response into a JavaScript object.

  const beforeData = parser.parse(beforeBody); // Converts the XML response into a JavaScript object.

  const beforeBalance = beforeData.account.balance; // Extracts the current account balance before the deposit.

  console.log("Balance BEFORE:", beforeBalance); // Prints the balance before the deposit.

  const amount = 10; // Defines the amount we want to deposit.

  const depositResponse = await bankApi.deposit(accountId, amount); // Uses the reusable deposit method to deposit $10 into the dynamic account.

  expect(depositResponse.status()).toBe(200); // Verifies that the deposit API returned HTTP 200.

  const depositBody = await depositResponse.text(); // Reads the deposit API response as text.

  console.log("Deposit Response:", depositBody); // Prints the deposit confirmation returned by the API.

  expect(depositBody).toContain("Successfully deposited"); // Verifies that the API confirms the deposit was successful.

  expect(depositBody).toContain(`#${accountId}`); // Verifies that the response contains the same dynamically selected account ID.

  const afterResponse = await bankApi.getAccount(accountId); // Gets the account details again after the deposit.

  expect(afterResponse.status()).toBe(200); // Verifies that the second account details request returned HTTP 200.

  const afterBody = await afterResponse.text(); // Reads the updated account details XML response.

  const afterData = parser.parse(afterBody); // Converts the updated XML response into a JavaScript object.

  const afterBalance = afterData.account.balance; // Extracts the account balance after the deposit.

  console.log("Balance AFTER:", afterBalance); // Prints the balance after the deposit.

  expect(afterBalance).toBe(beforeBalance + amount); // Verifies the business rule that the balance increased exactly by the deposited amount.
});

test("Day20.5 - Understand Return Value", async ({ request }) => {
  // Creates a test to verify the value returned by our API helper.

  const bankApi = new BankApi(request); // Creates the reusable BankApi object.

  const accountId = await bankApi.getFirstAccountId(12212); // Calls the helper and receives the account ID returned by the method.

  console.log("Returned Account ID:", accountId); // Prints the value received from the helper.

  expect(accountId).toBeDefined(); // Verifies that the helper returned a value instead of undefined.

  expect(typeof accountId).toBe("number"); // Verifies that the returned account ID is a JavaScript number.
});

test("Day20.6 - Use External Test Data", async ({ request }) => {
  // Creates a test that uses customer data stored outside the test file.

  const bankApi = new BankApi(request); // Creates the reusable BankApi object using Playwright's request fixture.

  const accountId = await bankApi.getFirstAccountId(bankData.customerId); // Gets the first account ID using the customer ID from bankData.js.

  console.log("Customer ID:", bankData.customerId); // Prints the customer ID loaded from the external test-data file.

  console.log("Account ID:", accountId); // Prints the dynamically retrieved account ID.

  expect(accountId).toBeDefined(); // Verifies that the API helper returned an account ID.

  expect(typeof accountId).toBe("number"); // Verifies that the returned account ID is a JavaScript number.
});

test("Day20.7 - External Data With API Helper", async ({ request }) => {
  // Creates a test that combines external test data with our reusable API helper.

  const bankApi = new BankApi(request); // Creates the reusable BankApi object using Playwright's request fixture.

  const accountId = await bankApi.getFirstAccountId(bankData.customerId); // Gets an account ID dynamically using the customer ID from bankData.js.

  console.log("Customer ID:", bankData.customerId); // Prints the customer ID loaded from the external data file.

  console.log("Account ID:", accountId); // Prints the dynamically extracted account ID.

  const response = await bankApi.getAccount(accountId); // Uses the reusable API method to retrieve details for the dynamic account.

  expect(response.status()).toBe(200); // Verifies that the account details API returned HTTP 200.

  const body = await response.text(); // Reads the XML account response as text.

  console.log("Account Response:", body); // Prints the actual account response for debugging and observation.

  expect(body).toContain(`<id>${accountId}</id>`); // Verifies that the API response contains the same dynamic account ID.

  expect(body).toContain(`<customerId>${bankData.customerId}</customerId>`); // Verifies that the account belongs to the expected customer.
});

test("Day20.8 - Use XML Parser Helper", async ({ request }) => {
  // Creates a test to verify our reusable XML parsing helper.

  const bankApi = new BankApi(request); // Creates the reusable BankApi object using Playwright's request fixture.

  const accountId = await bankApi.getFirstAccountId(bankData.customerId); // Gets an account ID dynamically using the customer ID from our test data.

  const response = await bankApi.getAccount(accountId); // Gets account details using the dynamically extracted account ID.

  expect(response.status()).toBe(200); // Verifies that the account API returned HTTP 200.

  const data = await bankApi.parseXmlResponse(response); // Uses our new helper to read and parse the XML response.

  console.log("Parsed Account Data:", data); // Prints the parsed JavaScript object for inspection.

  expect(data.account).toBeDefined(); // Verifies that the parsed response contains an account object.

  expect(data.account.id).toBe(accountId); // Verifies that the returned account ID matches the dynamically requested account.
});

// test("Day20.9 - Clean API Test Using Helpers", async ({ request }) => {
//   // Creates a test that uses all the reusable API helpers.

//   const bankApi = new BankApi(request); // Creates the reusable BankApi object.

//   const accountId = await bankApi.getFirstAccountId(bankData.customerId); // Gets the first account ID dynamically for the customer from our test data.

//   const response = await bankApi.getAccount(accountId); // Gets the details of that dynamically selected account.

//   expect(response.status()).toBe(200); // Verifies that the account API returned HTTP 200.

//   const data = await bankApi.parseXmlResponse(response); // Uses the reusable XML parser helper instead of parsing XML inside the test.

//   expect(data.account.id).toBe(accountId); // Verifies that the returned account ID matches the requested account.

//   expect(data.account.customerId).toBe(bankData.customerId); // Verifies that the account belongs to the expected customer.

//   expect(data.account.type).toBeTruthy(); // Verifies that the account type contains a meaningful value.

//   expect(data.account.balance).toBeDefined(); // Verifies that the balance field exists in the response.
// });

// test("Day20.9 - Clean API Test Using Helpers", async ({ request }) => {
//   const bankApi = new BankApi(request);
//   const accountId = await bankApi.getFirstAccountId(bankData.customerId);
//   const response = await bankApi.getAccount(accountId);

//   expect(response.status()).toBe(200);

//   const data = await bankApi.parseXmlResponse(response);
//   console.log("Parsed Account Data:", data); // <--- This prints the data in your console

//   const { account } = data;

//   expect(account.id).toBe(accountId);
//   expect(account.customerId).toBe(bankData.customerId);
//   expect(account.type).toBeTruthy();
//   expect(account.balance).toBeDefined();
// });

test("Day20.9 - Clean API Test Using Helpers", async ({ request }) => {
  const bankApi = new BankApi(request);
  const accountId = await bankApi.getFirstAccountId(bankData.customerId);
  const response = await bankApi.getAccount(accountId);

  expect(response.status()).toBe(200);

  const data = await bankApi.parseXmlResponse(response);
  console.log("Parsed Account Data:", data);

  const { id, customerId, type, balance } = data.account;

  expect(id).toBe(accountId);
  expect(customerId).toBe(bankData.customerId);
  expect(type).toBeTruthy();
  expect(balance).toBeDefined();
});

// test("Day20.10 - Reusable Deposit Flow", async ({ request }) => {
//   const bankApi = new BankApi(request);
//   const accountId = await bankApi.getFirstAccountId(bankData.customerId);

//   const before = await bankApi.getAccount(accountId);
//   const beforeData = await bankApi.parseXmlResponse(before);
//   const beforeBalance = beforeData.account.balance;

//   const deposit = await bankApi.deposit(accountId, bankData.depositAmount);
//   expect(deposit.status()).toBe(200);

//   const after = await bankApi.getAccount(accountId);
//   const afterData = await bankApi.parseXmlResponse(after);
//   const afterBalance = afterData.account.balance;

//   expect(afterBalance).toBe(beforeBalance + bankData.depositAmount);
// });


test("Day20.10 - Reusable Deposit Flow", async ({ request }) => {
  const bankApi = new BankApi(request);
  const accountId = await bankApi.getFirstAccountId(bankData.customerId);

  const { account: { balance: before } } = await bankApi.parseXmlResponse(await bankApi.getAccount(accountId));
  
  const deposit = await bankApi.deposit(accountId, bankData.depositAmount);
  expect(deposit.status()).toBe(200);

  const { account: { balance: after } } = await bankApi.parseXmlResponse(await bankApi.getAccount(accountId));

  expect(after).toBe(before + bankData.depositAmount);
});