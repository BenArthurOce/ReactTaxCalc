import React, { useState } from 'react';
import TaxForm from "./Components/TaxForm.js"
import TaxRequest from "./Components/TaxRequest.js"

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
        <div id="wrapper">
            <section id="form">
                <TaxForm onFormSubmit={performFormState} />
            </section>

                {/* {loadingFlag && <p>Loading...</p>}

                {!loadingFlag && result ? (
                <div>
                <h2>Calculation Results:</h2>
                <p>{result}</p>
                </div>
                ) : (
                !loadingFlag && <p>Please submit a tax form to see results.</p>
                )} */}

            <section id="results">
                {formData && (      
                    <TaxRequest
                    formData={formData}
                    onAPIRequest={performResultState}
                    onError={performErrorState}
                    onUpdateRequests={(newResult) => setResult(newResult)}    //get the calculated tax from TaxRequest, store as a state
                    />     
                )}
            </section>
        </div>
    );
};

export default TaxFrontend;
