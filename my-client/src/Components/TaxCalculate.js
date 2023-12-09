import React, { useState, useEffect } from 'react';

function TaxCalculate(props) {
    const [incomeTax, setIncomeTax] = useState('');
    const [hecsRepayment, setHecsRepayment] = useState('');
    const [lowIncomeOffset, setLowIncomeOffset] = useState('');
    const [lowMiddleIncomeOffset, setLowMiddleIncomeOffset] = useState('');
    const [medicareLevy, setMedicareLevy] = useState('');
    const [medicareLevySurcharge, setMedicareLevySurcharge] = useState('');
    const [finalTaxPayable, setFinalTaxPayable] = useState('');
    // const [seniorsPensionersTaxOffset, setSeniorsPensionersTaxOffset] = useState('');


    const updateincomeTax = (value) => {setIncomeTax(value)}
    const updatehecsRepayment = (value) => {setHecsRepayment(value)}
    const updatelowIncomeOffset = (value) => {setLowIncomeOffset(value)}
    const updatelowMiddleIncomeOffset = (value) => {setLowMiddleIncomeOffset(value)}
    const updatemedicareLevy = (value) => {setMedicareLevy(value)}
    const updatemedicareLevySurcharge = (value) => {setMedicareLevySurcharge(value)}
    // const updateseniorsPensionersTaxOffset = (value) => {setSeniorsPensionersTaxOffset(value)}


    console.log(`\n%%%%%%%%%%\nTaxCalculate, props:\n%%%%%%%%%%`)
    console.log(props)

 
    const calculateTax = () => {

        // if the data exists
        if (props.apiData) {


            //Prepare Brackets
            // const p = Promise.all(props.apiData.map((taxTypeInx) => props.apiData[taxTypeInx][props.formData.year]));   // Store each Promise / Header in an array
            const p = Promise.all(props.apiData.map((taxTypeInx) => taxTypeInx[props.formData.year]))
            .then(([incomeTaxData, hecsData, litoData, lmitoData, medicareLevyData, medicareSurchargeData]) => {
                try {
                    //Arrow function expressions:  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
                    const calculations = [  // 
                           () => calculateIncomeTax(incomeTaxData, props.formData)
                        ,  () => calculateHECS(hecsData, props.formData)
                        ,  () => calculateLITO(litoData, props.formData)
                        ,  () => calculateLMITO(lmitoData, props.formData)
                        ,  () => calculateMedicareLevy(medicareLevyData, props.formData)
                        ,  () => calculateMedicareSurcharge(medicareSurchargeData, props.formData)
                    ];
                    // Call all the functions at the same time
                    // calculations.forEach((calculation) => logResult(calculation()));
                    updateincomeTax(calculations[0]);
                    updatehecsRepayment(calculations[1]);
                    updatelowIncomeOffset(calculations[2]);
                    updatelowMiddleIncomeOffset(calculations[3]);
                    updatemedicareLevy(calculations[4]);
                    updatemedicareLevySurcharge(calculations[5]);

                }
                catch (error) {
                    throw new Error(`Something went wrong when running the calculations | Error: ${error}`);
                };
            })
        };
    };


    useEffect(() => {
        calculateTax();
    }, []);


    function calculateIncomeTax(taxdata, formdata) {
        console.log("Function: calculateIncomeTax")
        // console.log(`  income = ${income}    year = ${year} `)
    
        try {
            const { brackets } = taxdata
            if (!brackets) {
                throw new Error(`calculateIncomeTax: The API has no data for the year: ${formdata.year}`);
            }
    
            for (const { range, rate, base } of brackets) {
                if (formdata.income >= range[0] && formdata.income <= range[1]) {
                    const result = ((formdata.income - range[0]) * rate) + base;
                    return result.toFixed(2);
                }
            }
        }
        catch(error) {
            console.log(error)
            return 0.00
        };
    };
    
    
    function calculateHECS(taxdata, formdata) {
        const hasHECS = true;
        const hecsBalance = 60000;
        console.log("Function: calculateHECS");
    
        try {
            if (hasHECS) {
                const { brackets } = taxdata
                if (!brackets) {
                    throw new Error(`calculateHECS: The API has no data for the year: ${formdata.year}`);
                }
                for (const {range, rate} of brackets) {
                    if (formdata.income >= range[0] && formdata.income <= range[1]) {
                        const result = formdata.income * rate;
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
    
    
    function calculateLITO(taxdata, formdata) {
        console.log("Function: calculateLITO");
        try {
            const { brackets } = taxdata
            if (!brackets) {
                throw new Error(`calculateLITO: The API has no data for the year: ${formdata.year}`);
            }
            for (const {range, base, pctAdj} of brackets) {
                if (formdata.income >= range[0] && formdata.income <= range[1]) {
                    // console.log(`LITO MATH:   income=${income}  |  range=${range}  |  base=${base}  |  pctAdj=${pctAdj}`)
                    const result = base - ((formdata.income - range[0]) * pctAdj);
                    return result.toFixed(2);  
                };
            };
        }
        catch(error) {
            console.log(error)
            return 0.00
        };
    };
    
    
    function calculateLMITO(taxdata, formdata) {
        console.log("Function: calculateLMITO");
        try {
            const { brackets } = taxdata 
            if (!brackets) {
                throw new Error(`calculateLMITO: The API has no data for the year: ${formdata.year}`);
            }
            if (!brackets[0]) {return 0.00} // there were no LMITO brackets for this particular year
            for (const {range, base, pctAdj} of brackets) {
                if (formdata.income >= range[0] && formdata.income <= range[1]) {
                    // console.log(`LMITO MATH:   income=${income}  |  range=${range}  |  base=${base}  |  pctAdj=${pctAdj}`);
                    const result = base - ((formdata.income - range[0]) * pctAdj);
                    return result.toFixed(2);  
                };
            };
        }
        catch(error) {
            console.log(error)
            return 0.00
        };
    };
    
    
    function calculateMedicareLevy(taxdata, formdata) {
        console.log("Function: calculateMedicareReduction")
        // console.log(`  income = ${income}    year = ${year}    data = ${JSON.stringify(data)}`);
        try {
            const saptoString = formdata.pensionerAttrib? "pensioners":"non-pensioners";
            const familyString = formdata.familyAttrib? "families":"single";
    
            const { brackets } = taxdata[saptoString][familyString]; 
            if (!brackets) {
                throw new Error(`calculateMedicareReduction: The API has no data for the year: ${formdata.year}`);
            }
            for (const {range, rate, special} of brackets) {
                if (formdata.income >= range[0] && formdata.income <= range[1]) {
                    // console.log(`MEDICARE RED MATH:   income=${income}  |  range=${range}  |  rate=${rate}  |  tier=${tier}  |  saptoString=${saptoString}  |  familyString=${familyString}`);
                    let result = null;
                    if (special) {
                        result = ((formdata.income - range[0]) * 0.10)   //if middle bracket, we take the difference and then 10% for medicare
                    } else {
                        result = formdata.income * rate
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
    

    function calculateMedicareSurcharge(taxdata, formdata) {
        console.log("Function: calculateMedicareSurcharge")
        // console.log(`  income = ${income}    year = ${year}    data = ${JSON.stringify(data)}`);
        try {
            const familyString = formdata.familyAttrib? "families":"single";
    
            const { brackets } = taxdata[familyString]; 
            if (!brackets) {
                throw new Error(`calculateMedicareSurcharge: The API has no data for the year: ${formdata.year}`);
            }
            for (const {range, rate, tier} of brackets) {
                if (formdata.income >= range[0] && formdata.income <= range[1]) {
                    // console.log(`MEDICARE SUR MATH:   income=${income}  |  range=${range}  |  rate=${rate}  |  tier=${tier}  |  familyString=${familyString}`);
                    const result = formdata.income * rate
                    return result.toFixed(2);  
                };
            };
        }
        catch(error) {
            console.log(error)
            return 0.00
        };
    };

    function calculateTotalTax(arg) {

    }

    return (
        <div className="results-container">
            <strong>Your Income:</strong> {props.formData.income}
            <br></br>
            <ul>
                <li><strong>Income Tax:</strong> {incomeTax}</li>
                <li><strong>HECS Repayment:</strong> {hecsRepayment}</li>
                <li><strong>Low Income Tax Offset:</strong> {lowIncomeOffset}</li>
                <li><strong>Low Middle Income Tax Offset:</strong> {lowMiddleIncomeOffset}</li>
                <li><strong>getMedicareReduction:</strong> {medicareLevy}</li>
                <li><strong>getMedicareSurcharge:</strong> {medicareLevySurcharge}</li>
            </ul>
            <br></br>
            <strong>Tax Payable: </strong>
        </div>
    );
}

export default TaxCalculate;
