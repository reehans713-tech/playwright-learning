const { test, expect } = require("@playwright/test");
//const { request } = require("node:http");
test("Day19.5 - Invalid API Endpoint", async ({ request }) => {
  const response = await request.get(
    "https://jsonplaceholder.typicode.com/invalid-endpoint",
  );

  expect(response.status()).toBe(404);
  expect(response.ok()).toBeFalsy();
});

test("Day19.5 - POST with Empty Payload", async ({ request }) => {
  const response = await request.post(
    "https://jsonplaceholder.typicode.com/users",
    { data: {} },
  );
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(201);
});
