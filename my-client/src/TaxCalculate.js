import React, {useState, useEffect} from 'react';

function TaxCalculate(props) {
    const [incomeTax, setIncomeTax] = useState('');
    const [medicareLevy, setMedicareLevy] = useState('');
    const [medicareLevySurcharge, setMedicareLevySurcharge] = useState('');
    const [lowIncomeOffset, setLowIncomeOffset] = useState('');
    const [lowMiddleIncomeOffset, setLowMiddleIncomeOffset] = useState('');
    const [hecsRepayment, setHecsRepayment] = useState('');

    console.log(props)
    const income = 70000
    const year = 2023


    useEffect(() => {
    if (props.apiData) {
        const brackets = props.apiData[year]?.brackets || [];
        const result = getTaxPayable(income, year, props.apiData);
        setIncomeTax(result);
        }
    }, [income, year, props.apiData]);


    props.onTaxCalculation({
        incomeTax: incomeTax
       ,medicare: medicareLevy
       ,mls: medicareLevySurcharge
       ,lito: lowIncomeOffset
       ,lmito: lowMiddleIncomeOffset
       ,hecs: hecsRepayment
   });


    let taxPayable = 0

    const getTaxPayable = (income, year, apiData) => {

        console.log(income)
        console.log(year)
        console.log(apiData)
        const { brackets } = apiData[year];

        for (const { range, rate, baseAmount } of brackets) {
          if (income >= range[0] && income <= range[1]) {
            const result = ((income - range[0]) * rate) + baseAmount;
            return result;
          }
        }
    }


    return (
        <div>
            <p>{incomeTax}</p>
        </div>
    )
};

export default TaxCalculate;



// const TaxCalculate = ({ income, year, apiData }) => {
//     const [taxPayable, setTaxPayable] = useState(0);

//     useEffect(() => {
//         if (apiData) {
//             const brackets = apiData[year]?.brackets || [];
//             const result = getTaxPayable(income, brackets);
//             setTaxPayable(result);
//         }
//     }, [income, year, apiData]);

//     const getTaxPayable = (income, brackets) => {
//         // ... existing getTaxPayable logic ...
//     };

//     return (
//         <div>
//             {/* Display or use taxPayable as needed */}
//         </div>
//     );
// };
