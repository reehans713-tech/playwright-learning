const { test, expect } = require("@playwright/test");
const { request } = require("node:http");
//const { AsyncResource } = require("async_hooks");

test("Day19.1 - GET API REQUEST", async ({ request }) => {
  const response = await request.get(
    "https://jsonplaceholder.typicode.com/users/1",
  );
  expect(response.status()).toBe(200);
});

test("Day19.1 - Validate Get Response", async ({ request }) => {
  const response = await request.get(
    "https://jsonplaceholder.typicode.com/users/1",
  );
  const data = await response.json();

  expect(data.id).toBe(1);
  expect(data.name).toBe("Leanne Graham");
  expect(data.username).toBe("Bret");
});

test("Day19.1- Validate Response Status and Headers", async ({ request }) => {
  const response = await request.get(
    "https://jsonplaceholder.typicode.com/users/1",
  );

  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  const contentType = response.headers()["content-type"];
  expect(contentType).toContain("application/json");
});

test("Day19.1 - Negative GET API Test", async ({ request }) => {
  const response = await request.get(
    "https://jsonplaceholder.typicode.com/users/9999",
  );
  expect(response.status()).toBe(404);
  expect(response.ok()).toBeFalsy();
});

test("Day 19.1- Validate Negative Response Body", async ({ request }) => {
  const response = await request.get(
    "https://jsonplaceholder.typicode.com/users/9999",
  );
  const data = await response.json();
  expect(response.status()).toBe(404);
  expect(data).toEqual({});
});
