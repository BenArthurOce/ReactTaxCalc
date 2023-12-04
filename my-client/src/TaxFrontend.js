import React, { useState } from 'react';
import TaxForm from "./TaxForm";
import TaxRequest from "./TaxRequest";

function TaxFrontend() {

    const [formData, setFormData] = useState(null);
    const [result, setResult] = useState(null);
    const [loadingFlag, setLoadingFlag] = useState(false);
    const [errorFlag, setErrorFlag] = useState(null);


    const performUpdateResult = (newResult) => {
        setResult(newResult);
    }


    const performFormState = (newFormData) => {
        console.log("TaxForm - Form data updated:", newFormData);
        setFormData(newFormData);
        setResult(null);
        setLoadingFlag(true);
        setErrorFlag(null);
    };


    const performResultState = (resultData) => {
        console.log("TaxFrontend - Result data received:", resultData);
        setResult(resultData);
        setLoadingFlag(false);
    };
    
    const performErrorState = (error) => {
        console.log("TaxFrontend - Error occurred:", error);
        setErrorFlag(error);
        setLoadingFlag(false);
    };
    



    

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
                onUpdateRequests={(newResult) => setResult(newResult)}    //get the calculated tax from TaxRequest, store as a state
                />
            )}
        </div>
    );
};

export default TaxFrontend;
