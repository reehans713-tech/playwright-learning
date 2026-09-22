const { test, expect } = require("@playwright/test");

test("Day28 - Handle iFrame", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/iframe");

  const frame = page.frameLocator("#mce_0_ifr");
  await expect(frame.locator("body")).toBeVisible();
  await expect(frame.locator("body")).toContainText("Your content goes here.");
});
