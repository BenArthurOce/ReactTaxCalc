
const income = 95000;
const year = 2023;
const isfamily = false;
const isSAPTO = false;
const url = "https://benarthuroce.github.io/TaxRatesJSON/atoJSON.json";

fetch(url)
.then((response) => {
    if (!response.ok) {
        throw new Error(`Fetch Request failed | Status: ${response.status}`);
    }
        return response.json();
    })
    .then((jsonData) => {
        try {
            const APIHeaders = [            // List of tax categories (Main "branches" for the JSON file)
                  "Individual Income Tax"
                , "HECS Repayment Rates"
                , "Low Income Tax Offset"
                , "Low Middle Income Tax Offset"
                , "Medicare Levy Reduction"
                , "Medicare Levy Surchage"
            ];
            return Promise.all(APIHeaders.map((header) => jsonData[header]));   // Store each Promise / Header in an array
        }
        catch (error) {
            throw new Error(`Something went wrong when mapping the Promises | Error: ${error}`);
        };
    })
    .then(([incomeTaxData, hecsData, litoData, lmitoData, medicareReductionData, medicareSurchargeData]) => {
        try {
            //Arrow function expressions:  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
            const calculations = [  // 
                () => calculateIncomeTax(incomeTaxData, income, year)
                ,  () => calculateHECS(hecsData, income, year)
                ,  () => calculateLITO(litoData, income, year)
                ,  () => calculateLMITO(lmitoData, income, year)
                ,  () => calculateMedicareReduction(medicareReductionData, income, year)
                ,  () => calculateMedicareSurcharge(medicareSurchargeData, income, year)
            ];
            // Call all the functions at the same time
            calculations.forEach((calculation) => logResult(calculation()));
        }
        catch (error) {
            throw new Error(`Something went wrong when running the calculations | Error: ${error}`);
        };
    })
    .catch((error) => {
        console.error("Error caught:", error);
    });

// Function that runs called from line 37
function logResult(result) {
    console.log(result);
}


function calculateIncomeTax(data, income, year) {
    console.log("Function: calculateIncomeTax")
    // console.log(`  income = ${income}    year = ${year} `)

    try {
        const { brackets } = data[year]; 
        if (!brackets) {
            throw new Error(`calculateIncomeTax: The API has no data for the year: ${year}`);
        }

        for (const { range, rate, base } of brackets) {
            if (income >= range[0] && income <= range[1]) {
                const result = ((income - range[0]) * rate) + base;
                return result.toFixed(2);
            }
        }
    }
    catch(error) {
        console.log(error)
        return 0.00
    };
};


function calculateHECS(data, income, year) {
    const hasHECS = true;
    const hecsBalance = 60000;
    console.log("Function: calculateHECS");

    try {
        if (hasHECS) {
            const { brackets } = data[year]; 
            if (!brackets) {
                throw new Error(`calculateHECS: The API has no data for the year: ${year}`);
            }
            for (const {range, rate} of brackets) {
                if (income >= range[0] && income <= range[1]) {
                    const result = income * rate;
                    return Math.min(result, hecsBalance).toFixed(2);    // If hecs debt is lower than the repayment, return the hecs debt amount
                };
            };
        };
        return 0.00;
    }
    catch(error) {
        console.log(error)
        return 0.00
    };
};


function calculateLITO(data, income, year) {
    console.log("Function: calculateLITO");
    try {
        const { brackets } = data[year]; 
        if (!brackets) {
            throw new Error(`calculateLITO: The API has no data for the year: ${year}`);
        }
        for (const {range, base, pctAdj} of brackets) {
            if (income >= range[0] && income <= range[1]) {
                // console.log(`LITO MATH:   income=${income}  |  range=${range}  |  base=${base}  |  pctAdj=${pctAdj}`)
                const result = base - ((income - range[0]) * pctAdj);
                return result.toFixed(2);  
            };
        };
    }
    catch(error) {
        console.log(error)
        return 0.00
    };
};


function calculateLMITO(data, income, year) {
    console.log("Function: calculateLMITO");
    try {
        const { brackets } = data[year]; 
        if (!brackets) {
            throw new Error(`calculateLMITO: The API has no data for the year: ${year}`);
        }
        if (!brackets[0]) {return 0.00} // there were no LMITO brackets for this particular year
        for (const {range, base, pctAdj} of brackets) {
            if (income >= range[0] && income <= range[1]) {
                // console.log(`LMITO MATH:   income=${income}  |  range=${range}  |  base=${base}  |  pctAdj=${pctAdj}`);
                const result = base - ((income - range[0]) * pctAdj);
                return result.toFixed(2);  
            };
        };
    }
    catch(error) {
        console.log(error)
        return 0.00
    };
};


function calculateMedicareReduction(data, income, year) {
    console.log("Function: calculateMedicareReduction")
    // console.log(`  income = ${income}    year = ${year}    data = ${JSON.stringify(data)}`);
    try {
        const saptoString = isSAPTO? "pensioners":"non-pensioners";
        const familyString = isfamily? "families":"single";

        const { brackets } = data[year][saptoString][familyString]; 
        if (!brackets) {
            throw new Error(`calculateMedicareReduction: The API has no data for the year: ${year}`);
        }
        for (const {range, rate, special} of brackets) {
            if (income >= range[0] && income <= range[1]) {
                // console.log(`MEDICARE RED MATH:   income=${income}  |  range=${range}  |  rate=${rate}  |  tier=${tier}  |  saptoString=${saptoString}  |  familyString=${familyString}`);
                let result = null;
                if (special) {
                    result = ((income - range[0]) * 0.10)   //if middle bracket, we take the difference and then 10% for medicare
                } else {
                    result = income * rate
                }
                return result.toFixed(2);  
            };
        };

    }
    catch(error) {
        console.log(error)
        return 0.00
    };
};


function calculateMedicareSurcharge(data, income, year) {
    console.log("Function: calculateMedicareSurcharge")
    // console.log(`  income = ${income}    year = ${year}    data = ${JSON.stringify(data)}`);
    try {
        const familyString = isfamily? "families":"single";

        const { brackets } = data[year][familyString]; 
        if (!brackets) {
            throw new Error(`calculateMedicareSurcharge: The API has no data for the year: ${year}`);
        }
        for (const {range, rate, tier} of brackets) {
            if (income >= range[0] && income <= range[1]) {
                // console.log(`MEDICARE SUR MATH:   income=${income}  |  range=${range}  |  rate=${rate}  |  tier=${tier}  |  familyString=${familyString}`);
                const result = income * rate
                return result.toFixed(2);  
            };
        };
    }
    catch(error) {
        console.log(error)
        return 0.00
    };
};