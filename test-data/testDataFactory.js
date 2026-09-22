// function createDepositData(amount) {
//   return {
//     amount,
//     description: `Deposit of ${amount}`,
//   };
// }

// module.exports = { createDepositData };


function createDepositData(balance) {
  const amount = Math.max(1, Math.round(Math.abs(balance) * 0.1));

  return { amount };
}

module.exports = { createDepositData };