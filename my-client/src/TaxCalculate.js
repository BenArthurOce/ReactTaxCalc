import React, { useState, useEffect } from 'react';

function TaxCalculate(props) {
    const [incomeTax, setIncomeTax] = useState('');
    const [hecsRepayment, setHecsRepayment] = useState('');
    const [lowIncomeOffset, setLowIncomeOffset] = useState('');
    const [lowMiddleIncomeOffset, setLowMiddleIncomeOffset] = useState('');
    const [medicareLevy, setMedicareLevy] = useState('');
    const [medicareLevySurcharge, setMedicareLevySurcharge] = useState('');




//     props.onTaxCalculation({
//         incomeTax: incomeTax
//        ,medicare: medicareLevy
//        ,mls: medicareLevySurcharge
//        ,lito: lowIncomeOffset
//        ,lmito: lowMiddleIncomeOffset
//        ,hecs: hecsRepayment
//    });



    console.log("TaxCalculate props")
    console.log(props)


    const calculateTax = () => {



        // if the data exists
        if (props.apiData) {

            const Zincome = props.formData.income   // temp variables because I'm looking for errors and debugging
            const Zyear =  props.formData.year
            console.log(`Zincome=${Zincome}   Zyear=${Zyear}`)

            const Zdata1 = props.apiData.response1  // Income Tax
            const Zdata2 = props.apiData.response2  // HECS Repayment
            const Zdata3 = props.apiData.response3  // Low income tax offset
            const Zdata4 = props.apiData.response4  // Low medium income tax offset


            // I havent gotten the medicare API data because they are not year -> bracket structure. But these four are.
            const brackets1 = Zdata1[Zyear]['brackets']  // Income Tax
            const brackets2 = Zdata2[Zyear]['brackets']  // HECS Repayment
            const brackets3 = Zdata3[Zyear]['brackets']  // Low income tax offset
            const brackets4 = Zdata4[Zyear]['brackets']  // Low medium income tax offset

            // search through the tax brackets, get the applicable bracket and calculate the tax
            const result1 = getTaxPayable(Zincome, Zyear, brackets1);   // Income Tax
            const result2 = getHECSPayable(Zincome, Zyear, brackets2);   // HECS Repayment
            const result3 = getLITOOffset(Zincome, Zyear, brackets3);   // Low income tax offset
            const result4 = getLMITOOffset(Zincome, Zyear, brackets4);   // Low medium income tax offset

            setIncomeTax(result1);
            setHecsRepayment(result2);
            setLowIncomeOffset(result3);
            setLowMiddleIncomeOffset(result4);

            props.onTaxCalculation({
                incomeTax: incomeTax
                ,hecsRepayment: hecsRepayment
                ,lowIncomeOffset: lowIncomeOffset
                ,lowMiddleIncomeOffset: lowMiddleIncomeOffset
            });
        }
    };


    // useEffect(() => {
    //     calculateTax();
    // }, [props.formData]);

    useEffect(() => {
        calculateTax();
    }, []);

    const getTaxPayable = (income, year, brackets) => {
        console.log(`  income = ${income}    year = ${year}    brackets = ${brackets}`)
        for (const { range, rate, baseAmount } of brackets) {
            if (income >= range[0] && income <= range[1]) {
                const result = ((income - range[0]) * rate) + baseAmount;
                return result;
            }
        }
        return 0;
    };

    const getHECSPayable = (income, year, brackets) => {
        return 1000
    }

    const getLITOOffset = (income, year, brackets) => {
        return 2000
    }

    const getLMITOOffset = (income, year, brackets) => {
        return 3000
    }

    return (
        <div>
            <p>Income Tax: {incomeTax}</p>
            <p>HECS Repayment: {hecsRepayment} CURRENTLY WIP</p>
            <p>Low Income Tax Offset: {lowIncomeOffset} CURRENTLY WIP</p>
            <p>Low Middle Income Tax Offset: {lowMiddleIncomeOffset} CURRENTLY WIP</p>
        </div>
    );
}

export default TaxCalculate;

