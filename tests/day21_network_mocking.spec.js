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

// const { test, expect } = require("@playwright/test");

// test("Day21 - Mock Accounts API", async ({ page }) => {
//   await page.route(
//     "**/services_proxy/bank/customers/12212/accounts",
//     (route) => {
//       console.log(" MOCK HIT:", route.request().url());

//       await route.fulfill({
//         status: 200,
//         contentType: "application/json",
//         body: JSON.stringify([
//           { id: 99999, customerId: 12212, type: "SAVINGS", balance: 5000 },
//         ]),
//       });
//     },
//   );

//   await page.goto("https://parabank.parasoft.com/parabank/index.htm");
//   await page.locator('input[name="username"]').fill("john");
//   await page.locator('input[name="password"]').fill("demo");
//   await page.locator('input[value="Log In"]').click();

//   await expect(page.getByText("99999")).toBeVisible();
// });

// const { test, expect } = require("@playwright/test");

// test("Day21 - Mock Accounts API", async ({ page }) => {

//   await page.route(
//     "**/services_proxy/bank/customers/12212/accounts",
//     async (route) => {
//       console.log("🔥 MOCK HIT:", route.request().url());

//       await route.fulfill({
//         status: 200,
//         contentType: "application/json",
//         body: JSON.stringify([
//           {
//             id: 99999,
//             customerId: 12212,
//             type: "SAVINGS",
//             balance: 5000,
//           },
//         ]),
//       });
//     },
//   );

//   await page.goto(
//     "https://parabank.parasoft.com/parabank/index.htm"
//   );

//   await page.locator('input[name="username"]').fill("john");
//   await page.locator('input[name="password"]').fill("demo");
//   await page.locator('input[value="Log In"]').click();

//   await expect(page.getByText("99999")).toBeVisible();
// });


// const { test, expect } = require("@playwright/test");

// test("Day21 - Mock Accounts API", async ({ page }) => {

//   // Log every request containing "accounts"
//   page.on("request", (request) => {
//     if (request.url().includes("accounts")) {
//       console.log("🔎 ACCOUNTS REQUEST:", request.method(), request.url());
//     }
//   });

//   // Log every response containing "accounts"
//   page.on("response", async (response) => {
//     if (response.url().includes("accounts")) {
//       console.log(
//         "🔎 ACCOUNTS RESPONSE:",
//         response.status(),
//         response.url()
//       );
//     }
//   });

//   // Keep the mock for now
//   await page.route("**/services_proxy/bank/customers/**/accounts", async (route) => {
//     console.log("🔥 MOCK HIT:", route.request().url());

//     await route.fulfill({
//       status: 200,
//       contentType: "application/json",
//       body: JSON.stringify([
//         {
//           id: 99999,
//           customerId: 12212,
//           type: "SAVINGS",
//           balance: 5000,
//         },
//       ]),
//     });
//   });

//   await page.goto(
//     "https://parabank.parasoft.com/parabank/index.htm"
//   );

//   await page.locator('input[name="username"]').fill("john");
//   await page.locator('input[name="password"]').fill("demo");
//   await page.locator('input[value="Log In"]').click();

//   // Give the application a moment to finish its API calls
//   await page.waitForTimeout(2000);

//   console.log("🌐 CURRENT URL:", page.url());

//   // Temporary debugging only
//   expect(page.url()).toContain("overview.htm");
// });

const { test, expect } = require("@playwright/test");

test("Day21 - Mock Accounts API", async ({ page }) => {

  await page.goto("https://parabank.parasoft.com/parabank/index.htm");

  await page.route("**/api/accounts", async (route) => {
    console.log("🔥 MOCK HIT:", route.request().url());

    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify([
        {
          id: 99999,
          customerId: 12212,
          type: "SAVINGS",
          balance: 5000,
        },
      ]),
    });
  });

  const response = await page.evaluate(async () => {
    const response = await fetch(
      "https://parabank.parasoft.com/api/accounts"
    );

    return response.json();
  });

  expect(response[0].id).toBe(99999);
  expect(response[0].customerId).toBe(12212);
  expect(response[0].type).toBe("SAVINGS");
  expect(response[0].balance).toBe(5000);

  console.log("✅ Mocked account response validated");
});