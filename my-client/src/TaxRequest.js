import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaxCalculate from './TaxCalculate';

function TaxRequest(props) {

  const [apiData, setApiData] = useState(null);
  const [loadingFlag, setLoadingFlag] = useState(false);
  const [errorFlag, setErrorFlag] = useState(false);


  const [requestIncomeTax, setRequestIncomeTax] = useState('');
  const [requestHecsRepayment, setRequestHecsRepayment] = useState('');
  const [requestLowIncomeOffset, setRequestLowIncomeOffset] = useState('');
  const [requestLowMiddleIncomeOffset, setRequestLowMiddleIncomeOffset] = useState('');
  const [requestMedicareLevy, setRequestMedicareLevy] = useState('');
  const [requestMedicareLevySurcharge, setRequestMedicareLevySurcharge] = useState('');






    const arrayOfEndpoints = [
        '/IncomeTax'
        ,"/HECS"
        ,'/LowIncomeTaxOffset'
        ,'/LowMiddleIncomeTaxOffset'
    ]

    


//     props.onFormSubmit({
//         year: taxationYear
//        ,income: taxableIncome
//        ,spouse: spousesIncome
//        ,children: numberOfChildren
//        ,isHECS: hasHECSDebt
//        ,amtHECS: hecsDebtAmount
//    });
  

    console.log("TaxRequest props")
    console.log(props)

    const handleUpdateRequests = () => {
        props.onUpdateRequests({
            requestIncomeTax: requestIncomeTax
            ,requestHecsRepayment: requestHecsRepayment
            ,requestLowIncomeOffset: requestLowIncomeOffset
            ,requestLowMiddleIncomeOffset: requestLowMiddleIncomeOffset
        })
    }

  useEffect(() => {
    Promise.all([
        axios.get(arrayOfEndpoints[0], { params: { formData: props.formData } }),       //Income Tax
        axios.get(arrayOfEndpoints[1], { params: { formData: props.formData } }),       //HECS Repayment
        axios.get(arrayOfEndpoints[2], { params: { formData: props.formData } }),       //Low Income Tax Offset
        axios.get(arrayOfEndpoints[3], { params: { formData: props.formData } }),       //Low Middle Income Tax Offset
    ])
    .then(function([response1, response2, response3, response4]) {
        // Process the three responses
        setRequestIncomeTax(response1.data);
        setRequestHecsRepayment(response2.data);
        setRequestLowIncomeOffset(response3.data);
        setRequestLowMiddleIncomeOffset(response4.data);

        setApiData({
            response1: response1.data,
            response2: response2.data,
            response3: response3.data,
            response4: response4.data
          });

        setLoadingFlag(false);
    })
    .catch(error => {
        setLoadingFlag(false);
        setErrorFlag(error);
    });


  }, []);

  return (
    
    
    <div>
      <h1>COMPONENT: TaxCalculation</h1>
      <h2>Calculation Results</h2>

      {/* conditional rendering */}
      {loadingFlag && <p>Loading Results</p>}
      {errorFlag && <p>Error loading results: {errorFlag.message}</p>}
      {apiData && (
        <TaxCalculate
            apiData={apiData}
            onTaxCalculation={handleUpdateRequests}
            formData={props.formData}
            onUpdateRequests={props.onUpdateRequests} 
        />
      )}
    </div>
  );
}

export default TaxRequest;


