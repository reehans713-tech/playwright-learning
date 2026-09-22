const { test, expect } = require("@playwright/test");
test("Day5- Login Actions", async ({ page }) => {
  await page.goto("https://parabank.parasoft.com/parabank/index.htm");

  await page.locator('input[name="username"]').fill("reehan_nlr");
  await page.locator('input[name="password"]').fill("Nellore@2026");

  await expect(page.locator('input[name="username"]')).toHaveValue(
    "reehan_nlr",
  );
  await expect(page.locator('input[name="password"]')).toHaveValue(
    "Nellore@2026",
  );

  await page.getByRole("button", { name: "Log In" }).click();

  await expect(
    page.getByRole("heading", { name: "Accounts Overview" }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Log Out" })).toBeVisible();

  console.log("Current URL:", await page.url());
  console.log("page text:", await page.locator("body").innerText());
});

// await expect(page).toHaveURL(/overview/);
//await expect(page.getByText('Accounts Overview')).toBeVisible();
