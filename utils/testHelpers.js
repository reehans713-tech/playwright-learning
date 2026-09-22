function formatBalance(balance) {
  return Number(balance).toFixed(2);
}

function expectValidAccount(account) {
  if (!account.id || !account.customerId || !account.type) {
    throw new Error("Invalid data recieved");
  }
}

module.exports = { formatBalance, expectValidAccount };
