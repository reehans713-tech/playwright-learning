const { test, expect } = require("@playwright/test");

test("Day10 - API GET request", async ({ request }) => {
  const response = await request.get(
    "https://jsonplaceholder.typicode.com/users/1",
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  console.log(body);

  expect(body.id).toBe(1);
  expect(body.name).toBeTruthy();
});
