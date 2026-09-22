const { test, expect } = require("@playwright/test");

test("Day29 - File Upload", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/upload");
  await page
    .locator("#file-upload")
    .setInputFiles("test-data/sample.txt");
  await page.getByRole("button", { name: "Upload" }).click();
  await expect(page.getByText("sample.txt")).toBeVisible();
});
