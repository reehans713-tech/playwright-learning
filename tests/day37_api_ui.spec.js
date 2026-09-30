// const { test, expect } = require("@playwright/test");
// const { BankApi } = require("../pages/BankApi");
// const { bankData } = require("../test-data/bankData");

// test("Day37 - API and UI Validation", async ({ page, request }) => {
//   const bankApi = new BankApi(request);
//   const accountId = await bankApi.getFirstAccountId(bankData.customerId);

//   const response = await bankApi.getAccount(accountId);
//   const data = await bankApi.parseXmlResponse(response);
//   const expectedBalance = data.account.balance;

//   await page.goto("/parabank/index.htm");
//   await page.fill('input[name="username"]', "john");
//   await page.fill('input[name="password"]', "demo");
//   await page.click('input[value="Log In"]');

//   await page.getByRole("link", { name: "Accounts Overview" }).click();

//   const accountRow = page.locator("table tbody tr").filter({
//     hasText: String(accountId),
//   });

//   await expect(accountRow).toBeVisible();
//   const uiBalance = await accountRow.locator("td").nth(1).innerText();

//   const normalizedUiBalance = Number(
//     uiBalance.replace(/[$,]/g, "").replace(/^-/, "-"),
//   );

//   expect(normalizedUiBalance).toBe(Number(expectedBalance));
// });

// const { test, expect } = require("@playwright/test");
// const { BankApi } = require("../pages/BankApi");
// const { bankData } = require("../test-data/bankData");

// test("Day37 - API and UI Validation", async ({ page, request }) => {
//   const bankApi = new BankApi(request);

//   // 1. Fetch live data via Backend API
//   const accountId = await bankApi.getFirstAccountId(bankData.customerId);
//   const response = await bankApi.getAccount(accountId);
//   const data = await bankApi.parseXmlResponse(response);
//   const expectedBalance = data.account.balance; // Backend source of truth

//   // 2. Perform UI Authentication
//   await page.goto("/parabank/index.htm");
//   await page.fill('input[name="username"]', "john");
//   await page.fill('input[name="password"]', "demo");
//   await page.click('input[value="Log In"]');

//   // 3. Navigate to Accounts Overview page
//   await page.getByRole("link", { name: "Accounts Overview" }).click();

//   // 4. Dynamically isolate the specific account row using the account ID
//   const accountRow = page.locator("table tbody tr").filter({
//     hasText: String(accountId),
//   });

//   // 5. Ensure the row is fully rendered in the UI
//   await expect(accountRow).toBeVisible();

//   // 6. Extract the balance text from the second cell (index 1)
//   const uiBalance = await accountRow.locator("td").nth(1).innerText();

//   // 7. Clean currency symbols ($ and commas) and whitespace safely
//   const cleanBalanceString = uiBalance.replace(/[$,\s]/g, "");
//   const normalizedUiBalance = Number(cleanBalanceString);

//   // 8. Assert with safe decimal matching (2 decimal places for cents)
//   expect(normalizedUiBalance).toBeCloseTo(Number(expectedBalance), 2);
// });

// const { test, expect } = require("@playwright/test");
// const { BankApi } = require("../pages/BankApi");
// const { LoginPage } = require("../pages/LoginPage"); // Your existing class
// const { bankData } = require("../test-data/bankData");
// const testResponse = await bankApi.getCustomerAccounts(bankData.customerId);

// console.log("CUSTOMER ID:", bankData.customerId);
// console.log("CUSTOMER ACCOUNTS STATUS:", testResponse.status());
// console.log("CUSTOMER ACCOUNTS BODY:", await testResponse.text());

// test("Day37 - API and UI Validation (POM)", async ({ page, request }) => {
//   const bankApi = new BankApi(request);
//   const loginPage = new LoginPage(page); // Instantiating your LoginPage

//   // 1. Fetch live backend data (Source of Truth)
//   const accountId = await bankApi.getFirstAccountId(bankData.customerId);
//   const response = await bankApi.getAccount(accountId);
//   const data = await bankApi.parseXmlResponse(response);
//   const expectedBalance = data.account.balance;

//   // 2. Execute UI steps using your existing Page Object methods
//   await loginPage.openLoginPage();
//   await loginPage.login("john", "demo");

//   // 3. Navigate to Accounts Overview page
//   await page.getByRole("link", { name: "Accounts Overview" }).click();

//   // 4. Locate and isolate the correct account row
//   const accountRow = page.locator("table tbody tr").filter({
//     hasText: String(accountId),
//   });

//   await expect(accountRow).toBeVisible();

//   // 5. Extract text from the second cell (index 1)
//   const uiBalance = await accountRow.locator("td").nth(1).innerText();

//   // 6. Clean text safely and convert to a number
//   const cleanBalanceString = uiBalance.replace(/[$,\s]/g, "");
//   const normalizedUiBalance = Number(cleanBalanceString);

//   // 7. Validate frontend balance matches backend data (to 2 decimal places)
//   expect(normalizedUiBalance).toBeCloseTo(Number(expectedBalance), 2);
// });

// const { test, expect } = require("@playwright/test");
// const { BankApi } = require("../pages/BankApi");
// const { LoginPage } = require("../pages/LoginPage");
// const { bankData } = require("../test-data/bankData");

// test("Day37 - API and UI Validation (POM)", async ({ page, request }) => {
//   const bankApi = new BankApi(request);
//   const loginPage = new LoginPage(page);

//   // 1. Fetch live backend data
//   const accountId = await bankApi.getFirstAccountId(bankData.customerId);

//   const response = await bankApi.getAccount(accountId);

//   const data = await bankApi.parseXmlResponse(response);

//   const expectedBalance = data.account.balance;

//   console.log("Account ID:", accountId);
//   console.log("Expected API Balance:", expectedBalance);

//   // 2. Login through UI
//   await loginPage.openLoginPage();

//   await loginPage.login("john", "demo");

//   // 3. Open Accounts Overview
//   await page.getByRole("link", { name: "Accounts Overview" }).click();

//   console.log("CURRENT URL:", page.url());
//   console.log("PAGE TITLE:", await page.title());

//   const tables = await page.locator("table").count();
//   console.log("TABLE COUNT:", tables);

//   console.log("PAGE TEXT:");
//   console.log(await page.locator("body").innerText());

//   // 4. Find the correct account row
//   const accountRow = page.locator("table tbody tr").filter({
//     hasText: String(accountId),
//   });

//   await expect(accountRow).toBeVisible();

//   // 5. Get balance from UI
//   const uiBalance = await accountRow.locator("td").nth(1).innerText();

//   console.log("UI Balance:", uiBalance);

//   // 6. Clean UI balance
//   const cleanBalanceString = uiBalance.replace(/[$,\s]/g, "");

//   const normalizedUiBalance = Number(cleanBalanceString);

//   // 7. Compare API vs UI
//   expect(normalizedUiBalance).toBeCloseTo(Number(expectedBalance), 2);

//   console.log("✅ API balance and UI balance match");
// });

// const { test, expect } = require("@playwright/test");
// const { BankApi } = require("../pages/BankApi");
// const { LoginPage } = require("../pages/LoginPage");
// const { bankData } = require("../test-data/bankData");

// test("Day37 - API and UI Validation (POM)", async ({ page, request }) => {
//   const bankApi = new BankApi(request);
//   const loginPage = new LoginPage(page);

//   // --------------------------------------------------
//   // 1. Get account ID from API dynamically
//   // --------------------------------------------------

//   const accountId = await bankApi.getFirstAccountId(bankData.customerId);

//   const response = await bankApi.getAccount(accountId);

//   const data = await bankApi.parseXmlResponse(response);

//   const expectedBalance = Number(data.account.balance);

//   console.log("Account ID:", accountId);
//   console.log("Expected API Balance:", expectedBalance);

//   // --------------------------------------------------
//   // 2. Login through UI
//   // --------------------------------------------------

//   await loginPage.openLoginPage();

//   await loginPage.login("john", "demo");

//   // --------------------------------------------------
//   // 3. Open Accounts Overview
//   // --------------------------------------------------

//   await page.getByRole("link", { name: "Accounts Overview" }).click();

//   await expect(page).toHaveURL(/overview\.htm/);

//   console.log("CURRENT URL:", page.url());
//   console.log("PAGE TITLE:", await page.title());

//   console.log("CURRENT URL:", page.url());
//   console.log("PAGE TITLE:", await page.title());

//   console.log("========== PAGE TEXT ==========");
//   console.log(await page.locator("body").innerText());

//   console.log("========== TABLE HTML ==========");
//   console.log(await page.locator("table").first().innerHTML());

//   // --------------------------------------------------
//   // 4. Find account using dynamic account ID
//   // --------------------------------------------------

//   const accountLink = page.getByRole("link", {
//     name: String(accountId),
//   });

//   await expect(accountLink).toBeVisible();

//   console.log("Account link found:", accountId);

//   // Move from account link to its table row
//   const accountRow = accountLink.locator("xpath=ancestor::tr");

//   await expect(accountRow).toBeVisible();

//   // --------------------------------------------------
//   // 5. Get balance from the same account row
//   // --------------------------------------------------

//   const rowText = await accountRow.innerText();

//   console.log("ACCOUNT ROW:");
//   console.log(rowText);

//   const cells = accountRow.locator("td");

//   const cellCount = await cells.count();

//   console.log("Number of cells:", cellCount);

//   // ParaBank Accounts Overview:
//   // td[0] = Account Number
//   // td[1] = Account Type
//   // td[2] = Balance
//   // td[3] = Available Amount

//   const uiBalance = await cells.nth(1).innerText();

//   console.log("UI Balance:", uiBalance);

//   // --------------------------------------------------
//   // 6. Convert UI balance to number
//   // --------------------------------------------------

//   const cleanBalanceString = uiBalance.replace(/[$,\s]/g, "");

//   const normalizedUiBalance = Number(cleanBalanceString);

//   console.log("Normalized UI Balance:", normalizedUiBalance);

//   // --------------------------------------------------
//   // 7. Compare API balance with UI balance
//   // --------------------------------------------------

//   expect(normalizedUiBalance).toBeCloseTo(expectedBalance, 2);

//   console.log("✅ API balance and UI balance match");
// });
const { test, expect } = require("@playwright/test");
const { BankApi } = require("../pages/BankApi");
const { LoginPage } = require("../pages/LoginPage");

test("Day37 - API and UI Validation (POM)", async ({ page }) => {
  const loginPage = new LoginPage(page);

  // 1. Reset ParaBank database state
  const initApi = new BankApi(page.request);
  await initApi.cleanDatabase();

  // 2. Perform Login via UI
  await loginPage.openLoginPage();
  await loginPage.login("john", "demo");

  // 3. Open Accounts Overview in UI
  await page.getByRole("link", { name: "Accounts Overview" }).click();
  await expect(page).toHaveURL(/overview\.htm/);

  // 4. Instantiate API class with page.request (inherits logged-in JSESSIONID cookie)
  const bankApi = new BankApi(page.request);

  // 5. Select target Account ID dynamically from UI table
  const accountLinks = page.locator("#accountTable tbody tr td a");
  await accountLinks.first().waitFor();
  const targetAccountId = (await accountLinks.first().innerText()).trim();

  // 6. Fetch API balance via JSON response
  const response = await bankApi.getAccount(targetAccountId);
  const data = await response.json(); // Native JSON parse

  console.log("API JSON Response:", JSON.stringify(data));

  if (data.balance === undefined) {
    throw new Error(`Balance property missing in API response for account ${targetAccountId}`);
  }

  const expectedApiBalance = Number(data.balance);
  console.log(`Target Account ID: ${targetAccountId}`);
  console.log(`Expected API Balance: ${expectedApiBalance}`);

  // 7. Get balance from UI table row
  const targetRow = page.locator(`tr:has(a:has-text("${targetAccountId}"))`);
  const uiBalanceText = await targetRow.locator("td").nth(1).innerText();

  const cleanBalanceString = uiBalanceText
    .replace(/[$,\s]/g, "")
    .replace(/\((.*)\)/, "-$1");

  const normalizedUiBalance = Number(cleanBalanceString);
  console.log(`Normalized UI Balance: ${normalizedUiBalance}`);

  // 8. Assert API & UI match
  expect(normalizedUiBalance).toBeCloseTo(expectedApiBalance, 2);
  console.log("✅ API balance and UI balance match successfully!");
});