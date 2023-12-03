import React, { useState } from 'react';
import TaxForm from "./TaxForm";
import TaxRequest from "./TaxRequest";

function TaxFrontend() {

    const [formData, setFormData] = useState(null);
    const [result, setResult] = useState(null);
    const [loadingFlag, setLoadingFlag] = useState(false);
    const [errorFlag, setErrorFlag] = useState(null);



    const performFormState = (newFormData) => {
        setFormData(newFormData);
        setResult(null); // Reset result when new form data is submitted
        setLoadingFlag(true); // Set loading flag when form is submitted
        setErrorFlag(null); // Reset error flag
    };


    const performResultState = (resultData) => {
        setResult(resultData);
        setLoadingFlag(false); // Set loading flag to false when result is received
    };

    const performErrorState = (error) => {
        setErrorFlag(error); // Set the error message
        setLoadingFlag(false); // Set loading flag to false when an error occurs
    };
    



    

//     <div>
//     <h1>COMPONENT: TaxCalculation</h1>
//     <h2>Calculation Results</h2>

//     {/* conditional rendering */}
//     {loadingFlag && <p>Loading Results</p>}
//     {errorFlag && <p>Error loading results: {errorFlag.message}</p>}
//     {apiData && (
//       <TaxCalculate apiData={apiData} onTaxCalculation={setData2}/>
//     )}
//   </div>

    // if (loadingFlag) {
    //     return <strong>LOADING...</strong>
    // };

    return (
        <div>
            <h1>COMPONENT: TaxFrontEnd</h1>
            <TaxForm onFormSubmit={performFormState} />
            
            {loadingFlag && <p>Loading...</p>}

            {!loadingFlag && result ? (
                <div>
                    <h2>Calculation Results:</h2>
                    <p>{result}</p>
                </div>
            ) : (
                !loadingFlag && <p>Please submit a tax form to see results.</p>
            )}

            {formData && (
                <TaxRequest
                formData={formData}
                onAPIRequest={performResultState}
                onError={performErrorState}
                />
            )}
        </div>
    );
};

export default TaxFrontend;