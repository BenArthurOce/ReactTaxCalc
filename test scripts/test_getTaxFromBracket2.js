
const getTaxPayable = (income, year) => {
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

  const { brackets } = taxData[year];

  for (const { range, rate, baseAmount } of brackets) {
    if (income >= range[0] && income <= range[1]) {
      const result = ((income - range[0]) * rate) + baseAmount;
      return result;
    }
  }
};

const income = 70000;
const year = "2024";
const taxPayable = getTaxPayable(income, year);

console.log(`Your tax payable for the year ${year} with an income of ${income} is: ${taxPayable}`);


