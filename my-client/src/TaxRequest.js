import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaxCalculate from './TaxCalculate';

function TaxRequest(props) {
  const API_URL = '/IncomeTax'; // Express server backend url

  const [apiData, setData] = useState(null);
  const [loadingFlag, setLoadingFlag] = useState(false);
  const [errorFlag, setErrorFlag] = useState(false);

  const [apiData2, setData2] = useState(null);

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
  }, [props.formData]);

  return (
    
    <div>
      <h1>COMPONENT: TaxCalculation</h1>
      <h2>Calculation Results</h2>

      {/* conditional rendering */}
      {loadingFlag && <p>Loading Results</p>}
      {errorFlag && <p>Error loading results: {errorFlag.message}</p>}
      {apiData && (
        <TaxCalculate apiData={apiData} onTaxCalculation={setData2}/>
      )}
    </div>
  );
}

export default TaxRequest;

{/* <TaxRequest formData={formData} onAPIRequest={performResultState} /> */}