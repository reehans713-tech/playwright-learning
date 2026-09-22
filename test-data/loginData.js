const loginData = [
  {
    username: "john",
    password: "demo",
    expected: "success",
    testCase: "Valid Login",
  },

  {
    username: "wrongusername",
    password: "wrongpassword",
    expected: "failure",
    expectedMessage: "The username and password could not be verified.",
    testCase: "Invalid Login",
  },
];

module.exports = { loginData };
