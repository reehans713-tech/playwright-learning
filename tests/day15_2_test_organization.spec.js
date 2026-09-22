const { test, expect } = require("@playwright/test");

const { LoginPage } = require("../pages/LoginPage");

let loginPage;

test.describe("ParaBank Login Module", () => {

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.openLoginPage();
  });

  test.describe("Login UI Tests", () => {

    test("Check Login Fields", async () => {
      await expect(loginPage.usernameInput).toBeVisible();
      await expect(loginPage.passwordInput).toBeVisible();
      await expect(loginPage.loginButton).toBeVisible();
    });

  });

  test.describe("Login Functional Tests", () => {

    // Known website issue - currently login is not reaching overview.htm
    test.fixme("Valid Login", async () => {
      await loginPage.login("john", "demo");
      await expect(loginPage.page).toHaveURL(/overview\.htm/);
    });

    // Known website issue - invalid login message is not appearing
    test.fixme("Invalid Login", async () => {
      await loginPage.login("wronguser123", "wrongpassword");
      await expect(loginPage.loginError).toBeVisible();
    });

    // Demonstrating test.skip()
    test.skip("Temporarily Skip Test", async () => {
      await loginPage.login("john", "demo");
      await expect(loginPage.page).toHaveURL(/overview\.htm/);
    });

  });

});



// const { test, expect } = require("@playwright/test");
// const { LoginPage } = require("../pages/LoginPage");

// let loginPage;
// test.describe("Parabank Login Module", () => {
//   test.beforeEach(async ({ page }) => {
//     loginPage = new LoginPage(page);
//     await loginPage.openLoginPage();
//   });

// test.describe("Login UI Tests", () => {
//   test("Check login Fields", async () => {
//     await expect(loginPage.usernameInput).toBeVisible();
//     await expect(loginPage.passwordInput).toBeVisible();
//     await expect(loginPage.loginButton).toBeVisible();
//   });
// });
//   test.describe("Login Functional Tests", () =>{
//     test("Valid Login", async () => {
//         await loginPage.login("john","demo");
//         await expect(loginPage.page).toHaveURL(/overview\.htm/);
//});

//         test("Invalid Login", async () => {
//             await loginPage.login("wronguser123","wrongpassword");
//             await expect(loginPage.loginError).toBeVisible();
//         });
//     });

//   });

// const { test, expect } = require("@playwright/test");
// const { LoginPage } = require("../pages/LoginPage");

// let loginPage;

// test.describe("ParaBank Login Module", () => {
//   test.beforeEach(async ({ page }) => {
//     loginPage = new LoginPage(page);
//     await loginPage.openLoginPage();
//   });

//   test.describe("Login UI Tests", () => {
//     test("Check Login Fields", async () => {
//       await expect(loginPage.usernameInput).toBeVisible();
//       await expect(loginPage.passwordInput).toBeVisible();
//       await expect(loginPage.loginButton).toBeVisible();
//     });
//   });

//   test.describe("Login Functional Tests", () => {
//     test("Valid Login", async () => {
//       await loginPage.login("john", "demo");
//       await expect(loginPage.page).toHaveURL(/overview\.htm/);
//     });

//     test.fixme("Valid Login", async () => {
//       await loginPage.login("john", "demo");
//       console.log(await loginPage.page.locator("body").innerText());
//       await expect(loginPage.page).toHaveURL(/overview\.htm/);
//     });
//     test.fixme("Day15.4 - Known Issue Test", async () => {
//       await loginPage.login("wrongusername123", "wrongpasssword");
//       await expect(loginPage.loginError).toBeVisible();
//     });

//     test.fixme("Invalid Login", async () => {
//       await loginPage.login("wronguser123", "wrongpassword");
//       await expect(loginPage.loginError).toBeVisible();
//     });

//     test.skip("Temporarily Skip Test", async () => {
//       await loginPage.login("john", "demo");
//       await expect(loginPage.page).toHaveURL(/overview\.htm/);
//     });
//   });
// });