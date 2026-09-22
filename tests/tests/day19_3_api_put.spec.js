const { test, expect } = require("@playwright/test");
const { request } = require("http");
// const { request } = require("http");
// const { userInfo } = require("node:os");

test("Day19.3 - PUT API Request", async ({ request }) => {
  const response = await request.put(
    "https://jsonplaceholder.typicode.com/users/1",
    {
      data: {
        id: 1,
        name: "Syed Updated",
        username: "syedupdated",
        email: "updatedexample.com",
      },
    },
  );
  expect(response.status()).toBe(200);
});

test("Day19.3 - Validate PUT Response", async ({ request }) => {
  const response = await request.put(
    "https://jsonplaceholder.typicode.com/users/1",
    {
      data: {
        name: "Syed Updated",
        username: "syedupdated",
        email: "updated@example.com",
      },
    },
  );
  const data = await response.json();
  expect(data.id).toBe(1);
  expect(data.name).toBe("Syed Updated");
  expect(data.username).toBe("syedupdated");
  expect(data.email).toBe("updated@example.com");
});

test("Day19.3 - PATCH API Request", async ({ request }) => {
  const response = await request.patch(
    "https://jsonplaceholder.typicode.com/users/1",
    {
      data: {
        email: "newmail@example.com",
      },
    },
  );
  expect(response.status()).toBe(200);
});

test("Day19.3 - Validate PATCH Response", async ({ request }) => {
  const response = await request.patch(
    "https://jsonplaceholder.typicode.com/users/1",
    {
      data: {
        email: "newemail@example.com",
      },
    },
  );
  const data = await response.json();
  expect(data.email).toBe("newemail@example.com");
  expect(data.id).toBe(1);
});
