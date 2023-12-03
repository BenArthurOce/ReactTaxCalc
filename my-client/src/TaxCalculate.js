import React, { useState, useEffect } from 'react';

function TaxCalculate(props) {
    const [incomeTax, setIncomeTax] = useState('');
    const [medicareLevy, setMedicareLevy] = useState('');
    const [medicareLevySurcharge, setMedicareLevySurcharge] = useState('');
    const [lowIncomeOffset, setLowIncomeOffset] = useState('');
    const [lowMiddleIncomeOffset, setLowMiddleIncomeOffset] = useState('');
    const [hecsRepayment, setHecsRepayment] = useState('');


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
        // const { income, year, apiData } = props;
        const Zincome = props.formData.income
        const Zyear =  props.formData.year
        const Zdata = props.apiData


        if (props.apiData) {
            // const brackets = props.apiData[Zyear]?.brackets || [];
            const brackets = Zdata[Zyear]['brackets']
            const result = getTaxPayable(Zincome, Zyear, brackets);
            console.log(result)
            setIncomeTax(result);

            props.onTaxCalculation({
                incomeTax: result,
                // ... other values you want to pass
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

    return (
        <div>
            <p>{incomeTax}</p>
        </div>
    );
}

export default TaxCalculate;
