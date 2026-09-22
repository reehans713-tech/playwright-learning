const { test, expect } = require("@playwright/test");
const { request } = require("node:http");
//const { request } = require("node:http");
test("Day19.2- POST API REQUEST", async ({ request }) => {
  const response = await request.post(
    "https://jsonplaceholder.typicode.com/users",
    {
      data: { name: "Syed", username: "syed123", email: "syedexample.com" },
    },
  );
  expect(response.status()).toBe(201);
});

test("day19.2- VALIDATE POST RESPONSE", async ({ request }) => {
  const response = await request.post(
    "https://jsonplaceholder.typicode.com/users",
    {
      data: {
        name: "Syed",
        username: "syed123",
        email: "syedexample.com",
      },
    },
  );

  const data = await response.json();
  expect(data.name).toBe("Syed");
  expect(data.username).toBe("syed123");
});

test("Day19.2 - Reusable POST Payload", async ({ request }) => {
  const userData = {
    name: "syed",
    username: "syed123",
    email: "syedexample.com",
  };

  const response = await request.post(
    "https://jsonplaceholder.typicode.com/users",
    {
      data: userData,
    },
  );

  expect(response.status()).toBe(201);
});

test("Day19.2 - Validate Created User ID", async ({ request }) => {
  const response = await request.post(
    "https://jsonplaceholder.typicode.com/users",
    {
      data: {
        name: "Syed",
        username: "syed123",
        email: "syedexample.com",
      },
    },
  );
  const data = await response.json();
  expect(data.id).toBeTruthy();
  expect(typeof data.id).toBe("number");
});

test("Day19.2 - POST Request Headers", async ({ request }) => {
  const response = await request.post(
    "https://jsonplaceholder.typicode.com/users",
    {
      headers: {
        "Content-Type": "application/json",
      },
      data: { name: "Syed", username: "syed123", email: "syedexample.com" },
    },
  );

  expect(response.status()).toBe(201);
});

test("Day19.2 - Complete POST Validation", async ({ request }) => {
  const userData = {
    name: "Syed",
    username: "syed123",
    email: "syedexample",
  };
  const response = await request.post(
    "https://jsonplaceholder.typicode.com/users",
    {
      data: userData,
    },
  );

  const data = await response.json();
  expect(response.status()).toBe(201);
  expect(data.name).toBe(userData.name);
  expect(data.username).toBe(userData.username);
});
