const { test, expect } = require("@playwright/test");
//const { request } = require("node:http");
test("Day19.4 - DELETE API Request", async ({ request }) => {
  const response = await request.delete(
    "https://jsonplaceholder.typicode.com/users/1",
  );
  expect(response.status()).toBe(200);
});

test("Day19.4 - Validate DELETE Response", async ({ request }) => {
  const response = await request.delete(
    "https://jsonplaceholder.typicode.com/users/1",
  );
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);
});
test("Day19.4 - Validate DELETE Response Body", async ({ request }) => {
  const response = await request.delete(
    "https://jsonplaceholder.typicode.com/users/1",
  );
  const data = await response.json();
  expect(response.status()).toBe(200);
  expect(data).toEqual({});
});
