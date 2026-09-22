// const { test, expect } = require("@playwright/test");
// //const { type } = require("node:os");
// //const { stringify } = require("node:querystring");

// test("Day 21- Mock Accounts Api", async ({ page }) => {
//   await page.route("**/services_proxy/bank/customers/12212/accounts", (route) =>
//     route.fulfill({
//       status: 200,
//       contentType: "application/json",
//       body: JSON.stringify([
//         { id: 9999, customerId: 12212, type: "Savings", balance: 5000 },
//       ]),
//     }),
//   );

//   await page.goto("https://parabank.parasoft.com/parabank/index.htm");
//   await page.locator('input[name="username"]').fill("john");
//   await page.locator('input[name="password"]').fill("demo");
//   await page.locator('input[value="Log in"]').click();

//   await expect(page.getByText("99999")).toBeVisible();
// });

const { test, expect } = require("@playwright/test");

test("Day21 - Mock Accounts API", async ({ page }) => {
  await page.route("**/services_proxy/bank/customers/12212/accounts", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify([
        { id: 99999, customerId: 12212, type: "SAVINGS", balance: 5000 },
      ]),
    }),
  );

  await page.goto("https://parabank.parasoft.com/parabank/index.htm");
  await page.locator('input[name="username"]').fill("john");
  await page.locator('input[name="password"]').fill("demo");
  await page.locator('input[value="Log In"]').click();

  await expect(page.getByText("99999")).toBeVisible();
});
