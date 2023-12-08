import React, { useState, useEffect } from 'react';
import TaxCalculate from './TaxCalculate';


function TaxRequest(props) {

    const [apiData, setApiData] = useState(null);
    const [loadingFlag, setLoadingFlag] = useState(false);
    const [errorFlag, setErrorFlag] = useState(false);


    const [errorFlags, setErrorFlags] = useState({
        incomeTax: false,
        hecsRepayment: false,
        lowIncomeOffset: false,
        lowMiddleIncomeOffset: false,
        medicareLevyReduction: false,
        medicareLevySurcharge: false,
    });

    const loadingFlagtoTrue = () => {
        setLoadingFlag(true);
    };

    const loadingFlagtoFalse = () => {
        setLoadingFlag(false);
    };

    const performAPIdataState = (newData) => {
        setApiData(newData);
    };


    useEffect(() => {

        console.log("======== TaxRequest, useEffect has been triggered ========")

        const url = "https://benarthuroce.github.io/TaxRatesJSON/atoJSON.json";


        fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Fetch Request failed | Status: ${response.status}`);
            }
                return response.json();
            })
        //Obtain the tax data for each type of tax
        .then((jsonData) => {
            try {
                const APIHeaders = [            // List of tax categories (Main "branches" for the JSON file)
                      "Individual Income Tax"
                    , "HECS Repayment Rates"
                    , "Low Income Tax Offset"
                    , "Low Middle Income Tax Offset"
                    , "Medicare Levy Reduction"
                    , "Medicare Levy Surchage"
                ];
                return Promise.all(APIHeaders.map((header) => jsonData[header]));   // Store each Promise / Header in an array
            }
            catch (error) {
                throw new Error(`Something went wrong when mapping the Promises | Error: ${error}`);
            };
        })
        // Put all the bracket data into the component state
        .then(([incomeTaxData, hecsData, litoData, lmitoData, medicareReductionData, medicareSurchargeData]) => {
            performAPIdataState([incomeTaxData, hecsData, litoData, lmitoData, medicareReductionData, medicareSurchargeData])
        })
        .catch((error) => {
            console.error("Error caught:", error);
        });
        
    }, []);

    return (

        <div>
            <h1>COMPONENT: TaxCalculation</h1>
            <h2>Calculation Results</h2>

            {/* conditional rendering */}
            {loadingFlag && <p>Loading Results</p>}
            {errorFlags.incomeTax && <p>Error loading Income Tax results</p>}
            {errorFlags.hecsRepayment && <p>Error loading HECS Repayment results</p>}
            {errorFlags.lowIncomeOffset && <p>Error loading Low Income Tax Offset results</p>}
            {errorFlags.lowMiddleIncomeOffset && <p>Error loading Low Middle Income Tax Offset results</p>}
            {errorFlags.medicareLevyReduction && <p>Error loading Medicare Levy Reduction results</p>}
            {errorFlags.medicareLevySurcharge && <p>Error loading Medicare Levy Surcharge results</p>}
            {errorFlags.seniorsPensionersTaxOffset && <p>Error loading Seniors and Pensioners Tax Offset results</p>}
            {apiData && (
                <TaxCalculate
                apiData={apiData}
                formData={props.formData}
                onUpdateRequests={props.onUpdateRequests} 
                />
            )}
        </div>
    );

};

 export default TaxRequest;


