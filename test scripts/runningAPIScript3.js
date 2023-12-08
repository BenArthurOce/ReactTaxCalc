const income = 50000
const year = 2022

const calculateFunctions = [
    calculateIncomeTax,
    calculateHECS,
    calculateLITO,
    calculateLMITO,
    calculateMedicareReduction,
    calculateMedicareSurcharge,
  ];


  const myBaseURL = `https://benarthuroce.github.io/TaxRatesJSON/atoJSON.json`;


  const fetchPromise1 = fetch(`https://benarthuroce.github.io/TaxRatesJSON/atoJSON.json`)





  
  const fetchData = async () => {
    const APIHeaders = [
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
        const jsonResponse = await response.json();

        //Invoked using Promise.all()
        const dataList = await Promise.all([
             jsonResponse[APIHeaders[0]]
            ,jsonResponse[APIHeaders[1]]
            ,jsonResponse[APIHeaders[2]]
            ,jsonResponse[APIHeaders[3]]
            ,jsonResponse[APIHeaders[4]]
            ,jsonResponse[APIHeaders[5]]
        ])
        
        .then(function([response1, response2, response3, response4, response5, response6]) {
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

        .catch((error) => {
            console.log("error came up when running the functions")
        })


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
        // const { brackets } = data; 

        // for (const { range, rate, baseAmount } of brackets) {
        //     if (income >= range[0] && income <= range[1]) {
        //         const result = ((income - range[0]) * rate) + baseAmount;
        //         return result.toFixed(2);
        //     }
        // }
    }

    function calculateHECS(data, income, year) {
        // console.log(`  income = ${income}    year = ${year}    data = ${JSON.stringify(data)}`);
        // const { brackets } = data; 
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
            return 5
        }
        catch {
            return 0
        }
    }

    function calculateLMITO(data, income, year) {
        // console.log(`  income = ${income}    year = ${year}    data = ${JSON.stringify(data)}`);
        try {
            return 5
        }
        catch {
            return 0
        }
    }

    function calculateMedicareReduction(data, income, year) {
        // console.log(`  income = ${income}    year = ${year}    data = ${JSON.stringify(data)}`);
        try {
            return 5
        }
        catch {
            return 0
        }
    }

    function calculateMedicareSurcharge(data, income, year) {
        // console.log(`  income = ${income}    year = ${year}    data = ${JSON.stringify(data)}`);
        try {
            return 5
        }
        catch {
            return 0
        }
    }
  

  fetchData();
  