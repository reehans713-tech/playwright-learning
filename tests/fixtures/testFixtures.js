// const { test: base, expect} = require("@playwright/test");
// const { LoginPage } = require("../../pages/LoginPage");

// const test = base.extend({
//   loginPage: async ({ page }, use) => {
//     const loginPage = new LoginPage(page);
//     await use(loginPage);
//   },
// });

// module.exports = { test };

// require("dotenv").config();

// const { test: base,expect } = require("@playwright/test");
// const { LoginPage } = require("../../pages/LoginPage");

// const test = base.extend({
//   loggedInPage: async ({ page }, use) => {
//     const loginPage = new LoginPage(page);

//     await loginPage.openLoginPage();
//     await loginPage.login(
//       process.env.TEST_USERNAME,
//       process.env.TEST_PASSWORD
//     );

//     await use(page);
//   },
// });

// module.exports = { test };

require("dotenv").config();

const { test: base } = require("@playwright/test");
const { LoginPage } = require("../../pages/LoginPage");
const { BankApi } = require("../../pages/BankApi");

const { TEST_USERNAME, TEST_PASSWORD } = process.env;

if (!TEST_USERNAME || !TEST_PASSWORD) {
  throw new Error("TEST_USERNAME or TEST_PASSWORD is missing in .env");
}

const test = base.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  loggedInPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);

    await loginPage.openLoginPage();
    await loginPage.login(TEST_USERNAME, TEST_PASSWORD);

    await use(page);
  },

  bankApi: async ({ request }, use) => {
    await use(new BankApi(request));
  },
});

module.exports = { test };