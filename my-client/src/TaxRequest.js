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
    const [requestMedicareLevyReduction, setRequestMedicareLevyReduction] = useState('');
    const [requestMedicareLevySurcharge, setRequestMedicareLevySurcharge] = useState('');
    const [requestSeniorsPensionersTaxOffset, setRequestSeniorsPensionersTaxOffset] = useState('');


    const [errorFlags, setErrorFlags] = useState({
        incomeTax: false,
        hecsRepayment: false,
        lowIncomeOffset: false,
        lowMiddleIncomeOffset: false,
        medicareLevyReduction: false,
        medicareLevySurcharge: false,
        seniorsPensionersTaxOffset: false,
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


    const performDataState = (data) => {
        setRequestIncomeTax(data.response1);
        setRequestHecsRepayment(data.response2);
        setRequestLowIncomeOffset(data.response3);
        setRequestLowMiddleIncomeOffset(data.response4);
        setRequestMedicareLevyReduction(data.response5);
        setRequestMedicareLevySurcharge(data.response6);
        setRequestSeniorsPensionersTaxOffset(data.response7);
    };



    console.log(`\n========\nTaxRequest, props:\n========`)
    console.log(props)


    useEffect(() => {

        console.log("======== TaxRequest, useEffect has been triggered ========")

        const arrayOfEndpoints = [
            '/IncomeTax'
            ,"/HECS"
            ,'/LowIncomeTaxOffset'
            ,'/LowMiddleIncomeTaxOffset'
            ,"/MedicareLevyReduction"
            ,"/MedicareLevySurcharge"
            ,'/SeniorsPensionersTaxOffset'
        ];

        Promise.all([
            axios.get(arrayOfEndpoints[0], { params: { formData: props.formData } }),       //Income Tax
            axios.get(arrayOfEndpoints[1], { params: { formData: props.formData } }),       //HECS Repayment
            axios.get(arrayOfEndpoints[2], { params: { formData: props.formData } }),       //Low Income Tax Offset
            axios.get(arrayOfEndpoints[3], { params: { formData: props.formData } }),       //Low Middle Income Tax Offset
            axios.get(arrayOfEndpoints[4], { params: { formData: props.formData } }),       //Medicare Levy Reduction
            axios.get(arrayOfEndpoints[5], { params: { formData: props.formData } }),       //Medicare Levy Surcharge
            axios.get(arrayOfEndpoints[6], { params: { formData: props.formData } }),       //Seniors and Pensiors Tax Offset
        ])
        .then(function([response1, response2, response3, response4, response5, response6, response7]) {

            // Process the responses

            performDataState({
                response1: response1.data,
                response2: response2.data,
                response3: response3.data,
                response4: response4.data,
                response5: response5.data,
                response6: response6.data,
                response7: response7.data
            });

            performAPIdataState({
                response1: response1.data,
                response2: response2.data,
                response3: response3.data,
                response4: response4.data,
                response5: response5.data,
                response6: response6.data,
                response7: response7.data
            });
        })
        .catch((error) => {
            console.error("Error in requests", error);

            loadingFlagtoFalse(false);
            performDataState(null);
            performAPIdataState(null);
        });

        return () => {}

    }, [props.formData]);



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


