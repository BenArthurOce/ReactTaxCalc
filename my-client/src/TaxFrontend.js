import React, { useState } from 'react';
import TaxForm from "./TaxForm";
import TaxCalculation from "./TaxCalculation";

function TaxFrontend() {

    const [formData, setformData] = useState('');
    const [result, setResult] = useState('');

    const NEWperformsetFormState = (newFormData) => {
        setformData(newFormData);
    };

    const performResultState = (resultData) => {
        setResult(resultData);
    };

    return (
        <div>
            <h1>COMPONENT: TaxFrontEnd</h1>
            <TaxForm onFormSubmit={NEWperformsetFormState} />
            <TaxCalculation formData={formData} onTaxCalculation={performResultState} />


            {result ? (
                <div>
                    <h2>Calculation Results:</h2>
                    <p>{result}</p>
                </div>
            ) : (
                <p>Please submit a tax form to see results.</p>
            )}
        </div>
    );
};

export default TaxFrontend;
