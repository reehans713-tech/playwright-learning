const { test, expect } = require("@playwright/test");

test("Day25 - Browser Context Isolation", async ({ browser }) => {
  const [page1, page2] = await Promise.all([
    browser.newContext().then((c) => c.newPage()),
    browser.newContext().then((c) => c.newPage()),
  ]);

  await Promise.all([
    page1.goto("https:parabank.parasoft.com/parabank/index.htm"),
    page2.goto("https:parabank.parasoft.com/parabank/index.htm"),
  ]);

  expect(await page1.title()).toBe(await page2.title());

  await Promise.all([page1.context().close(), page2.context().close()]);
});
