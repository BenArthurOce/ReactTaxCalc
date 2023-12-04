import React, { useState, useEffect } from 'react';

function TaxCalculate(props) {
    const [incomeTax, setIncomeTax] = useState('');
    const [hecsRepayment, setHecsRepayment] = useState('');
    const [lowIncomeOffset, setLowIncomeOffset] = useState('');
    const [lowMiddleIncomeOffset, setLowMiddleIncomeOffset] = useState('');
    const [medicareLevy, setMedicareLevy] = useState('');
    const [medicareLevySurcharge, setMedicareLevySurcharge] = useState('');
    const [seniorsPensionersTaxOffset, setSeniorsPensionersTaxOffset] = useState('');


    const updateincomeTax = (value) => {setIncomeTax(value)}
    const updatehecsRepayment = (value) => {setHecsRepayment(value)}
    const updatelowIncomeOffset = (value) => {setLowIncomeOffset(value)}
    const updatelowMiddleIncomeOffset = (value) => {setLowMiddleIncomeOffset(value)}
    const updatemedicareLevy = (value) => {setMedicareLevy(value)}
    const updatemedicareLevySurcharge = (value) => {setMedicareLevySurcharge(value)}
    const updateseniorsPensionersTaxOffset = (value) => {setSeniorsPensionersTaxOffset(value)}


    console.log(`\n%%%%%%%%%%\nTaxCalculate, props:\n%%%%%%%%%%`)
    console.log(props)

 
    const calculateTax = () => {

        // if the data exists
        if (props.apiData) {

            let isFamily = false // Checks if taxpayer has a spouse or children
            isFamily = (props.formData.hasSpouse === true || props.formData.children >= 1)
            const familyAttrib = isFamily ? "families" : "single"

            console.log(isFamily)


            const Zincome = props.formData.income   // temp variables because I'm looking for errors and debugging
            const Zyear =  props.formData.year
            console.log(`Zincome=${Zincome}   Zyear=${Zyear}`)

            const Zdata1 = props.apiData.response1  // Income Tax
            const Zdata2 = props.apiData.response2  // HECS Repayment
            const Zdata3 = props.apiData.response3  // Low income tax offset
            const Zdata4 = props.apiData.response4  // Low medium income tax offset
            const Zdata5 = props.apiData.response5  // Medicare Levy Reduction
            const Zdata6 = props.apiData.response6  // Medicare Levy Surcharge
            const Zdata7 = props.apiData.response7  // Seniors Pensioners Tax Offset


            // I havent gotten the medicare API data because they are not year -> bracket structure. But these four are.
            const brackets1 = Zdata1[Zyear]['brackets']  // Income Tax
            const brackets2 = Zdata2[Zyear]['brackets']  // HECS Repayment
            const brackets3 = Zdata3[Zyear]['brackets']  // Low income tax offset
            const brackets4 = Zdata4[Zyear]['brackets']  // Low medium income tax offset
            const brackets5 = Zdata5[Zyear][familyAttrib]['brackets']  // Medicare Levy Reduction
            const brackets6 = Zdata6[Zyear][familyAttrib]['brackets']  // Medicare Levy Surcharge
            const brackets7 = Zdata7[Zyear]['single']['brackets']  // Sapto
        

            // search through the tax brackets, get the applicable bracket and calculate the tax
            const result1 = getTaxPayable(Zincome, Zyear, brackets1);   // Income Tax
            const result2 = getHECSPayable(Zincome, Zyear, brackets2);   // HECS Repayment
            const result3 = getLITOOffset(Zincome, Zyear, brackets3, result1);   // Low income tax offset
            const result4 = getLMITOOffset(Zincome, Zyear, brackets4);   // Low medium income tax offset
            const result5 = getMedicareReduction(Zincome, Zyear, brackets5);  // Medicare Levy Reduction
            const result6 = getMedicareSurcharge(Zincome, Zyear, brackets6);  // Medicare Levy Surcharge
            const result7 = getSeniorsPensionersTaxOffset(Zincome, Zyear, brackets7);  // Seniors Pensioners Tax Offset

           
            updateincomeTax(result1);
            updatehecsRepayment(result2);
            updatelowIncomeOffset(result3);
            updatelowMiddleIncomeOffset(result4);
            updatemedicareLevy(result5);
            updatemedicareLevySurcharge(result6);
            updateseniorsPensionersTaxOffset(result7);

        };
    };


    useEffect(() => {
        calculateTax();
    }, ['']);



    const getTaxPayable = (income, year, brackets) => {
        console.log(`  income = ${income}    year = ${year}    brackets = ${brackets}`);
        for (const {range, rate, baseAmount } of brackets) {
            if (income >= range[0] && income <= range[1]) {
                const result = ((income - range[0]) * rate) + baseAmount;
                return result.toFixed(2)
            };
        };
        return 0.00;
    };

    const getHECSPayable = (income, year, brackets) => {

        if (props.formData.isHECS) {
            console.log(`  income = ${income}    year = ${year}    brackets = ${brackets}`);
            for (const {range, rate} of brackets) {
                if (income >= range[0] && income <= range[1]) {
                    const result = income * rate;
                    return Math.min(result, props.formData.amtHECS).toFixed(2);    // If hecs debt is lower than the repayment, return the hecs debt amount
                };
            };
        };
        return 0.00;
    };

    const getLITOOffset = (income, year, brackets, taxableInc) => {
        // Caculate Income Tax and Medicare.
        // Calculate the two offsets
        // Compare the tax payable against the offsets. Made adjustments if tax goes down to zero
        console.log(`  income = ${income}    year = ${year}    brackets = ${brackets}`);
        for (const {range, base, pctAdj} of brackets) {
            if (income >= range[0] && income <= range[1]) {
                const result = base + ((income - range[0]) * pctAdj);
                console.log("LITO Result: ", result,"  Income Tax: ", taxableInc );
                return Math.min(result, taxableInc ).toFixed(2) ; // If offset is less than tax payable, return offset amount
            };
        };
        return 0.00;
    };

    const getLMITOOffset = (income, year, brackets) => {
        // Caculate Income Tax and Medicare.
        // Calculate the two offsets
        // Compare the tax payable against the offsets. Made adjustments if tax goes down to zero
        console.log(`  income = ${income}    year = ${year}    brackets = ${brackets}`);
        for (const {range, base, pctAdj} of brackets) {
            if (income >= range[0] && income <= range[1]) {
                const result = base + ((income - range[0]) * pctAdj);
                return result.toFixed(2);
            };
        };
        return 0.00;
    };

    const getMedicareReduction = (income, year, brackets) => {
        return 3000;
    }
    const getMedicareSurcharge = (income, year, brackets) => {
        // Detect upper limits
        // Check for family flag

        const isFamily = false


        return 4000;
    }
    const getSeniorsPensionersTaxOffset = (income, year, brackets) => {
        return 5000;
    }

    return (
        <div>
            <p>Income Tax: {incomeTax}</p>
            <p>HECS Repayment: {hecsRepayment}</p>
            <p>Low Income Tax Offset: {lowIncomeOffset}</p>
            <p>Low Middle Income Tax Offset: {lowMiddleIncomeOffset} CURRENTLY WIP</p>
            <p>getMedicareReduction: {medicareLevy} CURRENTLY WIP</p>
            <p>getMedicareSurcharge: {medicareLevySurcharge} CURRENTLY WIP</p>
            <p>getSeniorsPensionersTaxOffset: {seniorsPensionersTaxOffset} CURRENTLY WIP</p>
        </div>
    );
}

export default TaxCalculate;
