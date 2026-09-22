const { test, expect } = require("@playwright/test");

test("Day6 - Login Actions", async ({ page }) => {
  await page.goto("https://parabank.parasoft.com/parabank/register.htm");

  await expect(page.getByText("Signing up is easy!")).toBeVisible();
  await page.locator('input[name="customer.firstName"]').fill("Reehan");
  await expect(page.locator('input[name="customer.firstName"]')).toHaveValue(
    "Reehan",
  );
  await page.locator('input[name="customer.lastName"]').fill("Syed");
  await expect(page.locator('input[name="customer.lastName"]')).toHaveValue(
    "Syed",
  );
  await page
    .locator('input[name="customer.address.street"]')
    .fill("123 Test Street");
  await expect(
    page.locator('input[name="customer.address.street"]'),
  ).toHaveValue("123 Test Street");
  await page.locator('input[name="customer.address.city"]').fill("Nellore");
  await expect(page.locator('input[name="customer.address.city"]')).toHaveValue(
    "Nellore",
  );

  await page
    .locator('input[name="customer.address.state"]')
    .fill("Andhra Pradesh");
  await expect(
    page.locator('input[name="customer.address.state"]'),
  ).toHaveValue("Andhra Pradesh");

  await page.locator('input[name="customer.address.zipCode"]').fill("524001");
  await expect(
    page.locator('input[name="customer.address.zipCode"]'),
  ).toHaveValue("524001");

  await page.locator('input[name="customer.phoneNumber"]').fill("9998887777");
  await expect(page.locator('input[name="customer.phoneNumber"]')).toHaveValue(
    "9998887777",
  );

  await page.locator('input[name="customer.ssn"]').fill("123456789");
  await expect(page.locator('input[name="customer.ssn"]')).toHaveValue(
    "123456789",
  );

  await page.locator('input[name="customer.password"]').fill("Jannat@123");
  await expect(page.locator('input[name="customer.password"]')).toHaveValue(
    "Jannat@123",
  );

  // await page.locator('input[name="repeatedPassword"]').fill('Jannat@123');
  // await expect(page.locator('input[name="repeatedPassword"]')).toHaveValue('Jannat@123');

  await page.locator('input[name="repeatedPassword"]').fill("Wrong@123");
  await expect(page.locator('input[name="repeatedPassword"]')).toHaveValue(
    "Wrong@123",
  );

  await page.getByRole("button", { name: "Register" }).click();
  await expect(page.getByText("Passwords did not match.")).toBeVisible();

  // console.log('Current URL:', await page.url());
  // console.log('Page Text:', await page.locator('body').innerText());

  // console.log(
  //   await page.locator('input').evaluateAll(inputs =>
  //     inputs.map(input => ({
  //       name: input.getAttribute('name'),
  //       id: input.getAttribute('id'),
  //       type: input.getAttribute('type')
  //     }))
  //   )
  // );
});

// console.log('Page Title:', await page.title());
// console.log('Page Text:', await page.locator('body').innerText());

//console.log('Current URL:',await page.url())
//console.log('Current URL:',await page.url());
//console.log('Current URL:',await page.url());
