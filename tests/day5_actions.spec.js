// const { test, expect } = require("@playwright/test");
// test("Day5- Login Actions", async ({ page }) => {
//   await page.goto("https://parabank.parasoft.com/parabank/index.htm");

//   await page.locator('input[name="username"]').fill("john");
//   await page.locator('input[name="password"]').fill("demo");

//   await expect(page.locator('input[name="username"]')).toHaveValue(
//     "john",
//   );
//   await expect(page.locator('input[name="password"]')).toHaveValue(
//     "demo",
//   );

//   await page.getByRole("button", { name: "Log In" }).click();

//   await expect(
//     page.getByRole("heading", { name: "Accounts Overview" }),
//   ).toBeVisible();
//   await expect(page.getByRole("link", { name: "Log Out" })).toBeVisible();

//   console.log("Current URL:", await page.url());
//   console.log("page text:", await page.locator("body").innerText());
// });

// // await expect(page).toHaveURL(/overview/);
// //await expect(page.getByText('Accounts Overview')).toBeVisible();

const { test, expect } = require("@playwright/test");

test("Day5- Login Actions", async ({ page }) => {
  await page.goto("https://parabank.parasoft.com/parabank/index.htm");

  await page.locator('input[name="username"]').fill("john");
  await page.locator('input[name="password"]').fill("demo");

  await expect(page.locator('input[name="username"]')).toHaveValue(
    "john"
  );
  await expect(page.locator('input[name="password"]')).toHaveValue(
    "demo"
  );

  await page.getByRole("button", { name: "Log In" }).click();

  // 1. Wait for navigation/URL change first
  await expect(page).toHaveURL(/overview\.htm/, { timeout: 10000 });

  // 2. Locate "Accounts Overview" heading (h2 element)
  await expect(
    page.getByRole("heading", { name: "Accounts Overview", level: 2 })
  ).toBeVisible({ timeout: 10000 });

  // 3. Verify Log Out link is visible
  await expect(page.getByRole("link", { name: "Log Out" })).toBeVisible();

  console.log("Current URL:", await page.url());
  console.log("page text:", await page.locator("body").innerText());
});
