const loginTestData = {
  validUser: {
    username: process.env.TEST_USERNAME,
    password: process.env.TEST_PASSWORD,
  },

  invalidUser: {
    username: "invalid_user",
    password: "wrong_password",
  },
};

module.exports = { loginTestData };