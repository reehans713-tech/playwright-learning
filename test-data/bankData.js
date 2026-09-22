const bankData = { // Creates an object to store reusable banking test data.
  customerId: 12212, // Stores the ParaBank demo customer ID used by our API tests.
  depositAmount: 10, // Stores the default deposit amount used by our deposit tests.
}; // Ends the bankData object.

module.exports = { bankData }; // Exports the test data so our test files can use it.