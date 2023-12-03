import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaxCalculate from './TaxCalculate';

function TaxRequest(props) {
  const API_URL = '/IncomeTax'; 

  const [apiData, setData] = useState(null);
  const [loadingFlag, setLoadingFlag] = useState(false);
  const [errorFlag, setErrorFlag] = useState(false);




    const arrayOfEndpoints = [
        '/IncomeTax'
        ,"/HECS"
        ,'/LowIncomeTaxOffset'
        ,'/LowMiddleIncomeTaxOffset'
    ]

    

    // Promise.all([
    //     axios.get(arrayOfEndpoints[0], { params: { formData: props.formData } }),
    //     axios.get(arrayOfEndpoints[1], { params: { formData: props.formData } }),
    //     axios.get(arrayOfEndpoints[2], { params: { formData: props.formData } }),
    //     axios.get(arrayOfEndpoints[3], { params: { formData: props.formData } }),
    // ])
    // .then(function([response1, response2, response3, response4]) {
    //     // Process the three responses
    //     setData(response1);
    //     setData(response2);
    //     setData(response3);
    //     setData(response4);
    // })
    // .catch(error => {
    //     // Error occurred in any of the requests
    //     // res.send(error)
    // });
  
  

  console.log("TaxRequest props")
  console.log(props)

  useEffect(() => {
    const loadTaxData = async () => {
      setErrorFlag(null);
      setLoadingFlag(true);

      try {
        const res = await axios.get(API_URL, { params: { formData: props.formData } });
        setData(res.data);
        setErrorFlag(false);
      } catch (err) {
        setErrorFlag(true);
      } finally {
        setLoadingFlag(false);
      }
    };

    loadTaxData();
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
            onTaxCalculation={setData}
            formData={props.formData}
        />
      )}
    </div>
  );
}

export default TaxRequest;


