const income = 50000
const year = 2022


// Assuming you have seven functions for calculations
const calculateFunctions = [
    calculateIncomeTax,
    calculateHECS,
    calculateLITO,
    calculateLMITO,
    calculateMedicareReduction,
    calculateMedicareSurcharge,
  ];
  
  
  
  // Use the previously fetched data
  const fetchData = async () => {
    const endpointUrls = [
      "Individual Income Tax",
      "HECS Repayment Rates",
      "Low Income Tax Offset",
      "Low Middle Income Tax Offset",
      "Medicare Levy Reduction",
      "Medicare Levy Surchage",
    ];
  
    const baseURL = `https://benarthuroce.github.io/TaxRatesJSON/atoJSON.json`;
  
    try {
        const response = await fetch(baseURL);
        const data1 = await response.json();

        //functions in the calculateFunctions array are invoked using Promise.all()
        //Promise.all() function takes an array of promises (or values) and returns a new promise that is fulfilled with an array of the fulfilled values
        const dataList = await Promise.all([
             data1[endpointUrls[0]]
            ,data1[endpointUrls[1]]
            ,data1[endpointUrls[2]]
            ,data1[endpointUrls[3]]
            ,data1[endpointUrls[4]]
            ,data1[endpointUrls[5]]
        ])
        
        .then(function([response1, response2, response3, response4, response5, response6]) {
            // console.log(response1, response2, response3, response4, response5, response6)
            calculateIncomeTax(response1, income, year)
            calculateHECS(response2, income, year)
            calculateLITO(response3, income, year)
            calculateLMITO(response4, income, year)
            calculateMedicareReduction(response5, income, year)
            calculateMedicareSurcharge(response6, income, year)
        })
        .then(function(response1, response2, response3, response4, response5, response6) {
            console.log(response1)
            console.log(response2)
            console.log(response3)
            console.log(response4)
            console.log(response5)
            console.log(response6)
        })

        // const calculationResults = await Promise.all(
        //     dataList.map((data, index) => calculateFunctions[index](data, income, year))
        // )
        .catch((error) => {
            console.log("error came up when running the functions")
        })

        // Now, calculationResults contains the results of all calculations
        // console.log(calculationResults);
    } catch (error) {
        console.error("try/catch on fetch failed:", error);
    }
    };

    function calculateIncomeTax(data, income, year) {
        try {
            throw new Error ("yes")
        }
        catch {
            return 0
        }
        // console.log(`  income = ${income}    year = ${year}    data = ${JSON.stringify(data)}`);
        // const { brackets } = data; // Assuming 'brackets' is the property containing the tax brackets

        // for (const { range, rate, baseAmount } of brackets) {
        //     if (income >= range[0] && income <= range[1]) {
        //         const result = ((income - range[0]) * rate) + baseAmount;
        //         return result.toFixed(2);
        //     }
        // }
    }

    function calculateHECS(data, income, year) {
        // console.log(`  income = ${income}    year = ${year}    data = ${JSON.stringify(data)}`);
        // const { brackets } = data; // Assuming 'brackets' is the property containing the tax brackets

        // for (const { range, rate, baseAmount } of brackets) {
        //     if (income >= range[0] && income <= range[1]) {
        //         const result = ((income - range[0]) * rate) + baseAmount;
        //         return result.toFixed(2);
        //     }
        // }

        try {
            return 5
        }
        catch {
            return 0
        }
    }


    function calculateLITO(data, income, year) {
        // console.log(`  income = ${income}    year = ${year}    data = ${JSON.stringify(data)}`);
        try {

        }
        catch {
            return 0
        }
    }

    function calculateLMITO(data, income, year) {
        // console.log(`  income = ${income}    year = ${year}    data = ${JSON.stringify(data)}`);
        try {

        }
        catch {
            return 0
        }
    }

    function calculateMedicareReduction(data, income, year) {
        // console.log(`  income = ${income}    year = ${year}    data = ${JSON.stringify(data)}`);
        try {

        }
        catch {
            return 0
        }
    }

    function calculateMedicareSurcharge(data, income, year) {
        // console.log(`  income = ${income}    year = ${year}    data = ${JSON.stringify(data)}`);
        try {

        }
        catch {
            return 0
        }
    }
  
  // Call the fetchData function
  fetchData();
  