// const BASE_URL = "https://parabank.parasoft.com/parabank/services/bank"; // Stores the common API base URL so we don't repeat it in every method.

// class BankApi {
//   // Creates a class that will contain reusable ParaBank API methods.

//   constructor(request) {
//     // Constructor receives Playwright's API request object when we create BankApi.
//     this.request = request; // Stores the request object so all methods can use it.
//   }

//   async getCustomerAccounts(customerId) {
//     // Creates a reusable method to get accounts for any customer ID.
//     return await this.request.get(
//       // Sends a GET request and returns the API response.
//       `${BASE_URL}/customers/${customerId}/accounts`, // Builds the customer accounts endpoint dynamically using customerId.
//     ); // Ends the GET request.
//   }

//   async getAccount(accountId) {
//     // Creates a reusable method to get details of any account.
//     return await this.request.get(
//       // Sends a GET request and returns the account response.
//       `${BASE_URL}/accounts/${accountId}`, // Builds the account endpoint dynamically using accountId.
//     ); // Ends the GET request.
//   }

//   async deposit(accountId, amount) {
//     // Creates a reusable method to deposit any amount into any account.
//     return await this.request.post(
//       // Sends a POST request because deposit changes account data.
//       `${BASE_URL}/deposit?accountId=${accountId}&amount=${amount}`, // Adds account ID and deposit amount as query parameters.
//     ); // Ends the POST request.
//   }
// }

// module.exports = { BankApi }; // Exports BankApi so our test files can import and use this class.

const { XMLParser } = require("fast-xml-parser"); // Imports XMLParser to convert XML API responses into JavaScript objects.

const BASE_URL = "https://parabank.parasoft.com/parabankv2/services/bank"; // Stores the common API base URL so we don't repeat it in every method.

class BankApi {
  // Creates a class that contains reusable ParaBank API methods.

  constructor(request) {
    // Receives Playwright's API request object when BankApi is created.
    this.request = request; // Stores the request object so all API methods can use it.
  }

  async getCustomerAccounts(customerId) {
    // Creates a reusable method to get accounts for a specific customer.
    return await this.request.get(
      // Sends a GET request and returns the API response.
      `${BASE_URL}/customers/${customerId}/accounts`, // Builds the customer accounts URL dynamically using customerId.
    ); // Ends the GET request.
  }

  async getAccount(accountId) {
    // Creates a reusable method to get details of a specific account.
    return await this.request.get(
      // Sends a GET request and returns the account response.
      `${BASE_URL}/accounts/${accountId}`, // Builds the account URL dynamically using accountId.
    ); // Ends the GET request.
  }

  async getAccountDetails(accountId) {
  const response = await this.getAccount(accountId);
  return this.parseXmlResponse(response);
}

  async deposit(accountId, amount) {
    // Creates a reusable method to deposit a specified amount into an account.
    return await this.request.post(
      // Sends a POST request because a deposit changes account data.
      `${BASE_URL}/deposit?accountId=${accountId}&amount=${amount}`, // Adds the account ID and deposit amount as query parameters.
    ); // Ends the POST request.
  }

  // async getFirstAccountId(customerId) {
  //   // Creates a reusable method to retrieve the first account ID for a customer.
  //   const response = await this.getCustomerAccounts(customerId); // Reuses getCustomerAccounts() instead of writing the API request again.
  //   const body = await response.text(); // Reads the XML response body as text.
  //   const parser = new XMLParser(); // Creates an XML parser to convert the XML into a JavaScript object.
  //   const data = parser.parse(body); // Converts the XML response into a JavaScript object.
  //   const accounts = data.accounts.account; // Gets the account data from the parsed response.
  //   return Array.isArray(accounts) ? accounts[0].id : accounts.id; // Returns the first account ID whether one or multiple accounts were returned.
  // }

  async getFirstAccountId(customerId) {
  const response = await this.getCustomerAccounts(customerId);

  const status = response.status();
  const body = await response.text();

  console.log("Customer ID:", customerId);
  console.log("API Status:", status);
  console.log("API Response:", body);

  if (!response.ok()) {
    throw new Error(
      `getCustomerAccounts API failed. Status: ${status}. Customer ID: ${customerId}`,
    );
  }

  const parser = new XMLParser();
  const data = parser.parse(body);

  console.log("Parsed API Response:", data);

  const accounts = data?.accounts?.account;

  if (!accounts) {
    throw new Error(
      `Account data not found for customer ${customerId}. API response structure is different.`,
    );
  }

  return Array.isArray(accounts) ? accounts[0].id : accounts.id;
}
  async getAccountBalance(accountId) {
  const response = await this.getAccount(accountId);
  const data = await this.parseXmlResponse(response);
  return Number(data.account.balance);
}

  async parseXmlResponse(response) {
    // Creates a reusable method that converts an API XML response into a JavaScript object.

    const body = await response.text(); // Reads the API response body as text.

    const parser = new XMLParser(); // Creates an XML parser for the response.

    return parser.parse(body); // Parses the XML and returns the resulting JavaScript object.
  }
}

module.exports = { BankApi }; // Exports BankApi so test files can import and use the class.
