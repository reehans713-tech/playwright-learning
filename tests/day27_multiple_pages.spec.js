const { test, expect } = require("@playwright/test");

test("Day27 - Handle New Tab", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/windows");
  const [newPage] = await Promise.all([
    page.waitForEvent("popup"),
    page.getByText("Click Here").click(),
  ]);

  await expect(newPage).toHaveTitle( "New Window");
});
