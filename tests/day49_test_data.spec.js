require("dotenv").config();

const { expect } = require("@playwright/test");
const { test } = require("./fixtures/testFixtures");
const { loginTestData } = require("../test-data/loginTestData");

//const {LoginPage} = require("../pages/LoginPage");
//const {bankData} = require("../test-data/loginTestData");

test("Day49 - Valid Login Using Test Data @data", async ({
  loginPage,
  page,
}) => {
  const { username, password } = loginTestData.validUser;

  await loginPage.openLoginPage();
  await loginPage.login(username, password);

  await expect(
    page.getByRole("link", { name: "Accounts Overview" }),
  ).toBeVisible();
});

test("Day49 - Invalid Login Using Test Data @data", async ({
  loginPage,
  page,
}) => {
  const { username, password } = loginTestData.invalidUser;

  await loginPage.openLoginPage();
  await loginPage.login(username, password);

  await expect(
    page.getByText("The username and password could not be verified."),
  ).toBeVisible();
});
