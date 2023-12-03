const axios = require('axios');

const taxData = {
  "2023": {
    "name": "Individual Income Tax 2023",
    "brackets": [
      { "range": [0, 18200], "rate": 0.00, "baseAmount": 0 },
      { "range": [18201, 45000], "rate": 0.19, "baseAmount": 0 },
      { "range": [45001, 120000], "rate": 0.325, "baseAmount": 5092 },
      { "range": [120001, 180000], "rate": 0.37, "baseAmount": 29467 },
      { "range": [180001, 10000000000], "rate": 0.45, "baseAmount": 51667 }
    ]
  },
  "2024": {
    "name": "Individual Income Tax 2024",
    "brackets": [
      { "range": [0, 18200], "rate": 0.00, "baseAmount": 0 },
      { "range": [18201, 45000], "rate": 0.19, "baseAmount": 0 },
      { "range": [45001, 120000], "rate": 0.325, "baseAmount": 5092 },
      { "range": [120001, 180000], "rate": 0.37, "baseAmount": 29467 },
      { "range": [180001, 10000000000], "rate": 0.45, "baseAmount": 51667 }
    ]
  }
};

const income = 70000;
const year = "2023";

const { brackets } = taxData[year];

let taxPayable = 0;
let remainingIncome = income;

for (const { range, rate, baseAmount } of brackets) {
  const [lower, upper] = range;
  const taxableAmount = Math.min(remainingIncome, upper - lower);
  
  taxPayable += taxableAmount * rate + baseAmount;
  remainingIncome -= taxableAmount;

  if (remainingIncome <= 0) {
    break;
  }
}

console.log(`Your tax payable for the year ${year} with an income of ${income} is: ${taxPayable}`);
