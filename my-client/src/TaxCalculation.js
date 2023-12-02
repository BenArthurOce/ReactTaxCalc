import React, {useState, useEffect} from 'react';
import axios from 'axios';

function TaxCalculation({formData}) {
    //formdata being the state of the TaxForm Object


/////////////////////////////////// Testing for multiple API at same time

    let endpointsArray = [
        "/IncomeTax",
        '/LowIncomeTaxOffset',
        "/MedicareLevySurcharge",
        "/HECS",
        "/LowMiddleIncomeTaxOffset",
        "/SeniorsPensionersTaxOffset"
      ];

    let apiObjects = {
         IncomeTax: null
        ,LowIncomeTaxOffset: null
        ,MedicareLevySurcharge: null
        ,HECS: null
        ,LowMiddleIncomeTaxOffset: null
        ,SeniorsPensionersTaxOffset: null
    }


      Promise.all([
        axios.get(endpointsArray[0])
       ,axios.get(endpointsArray[1])
       ,axios.get(endpointsArray[2])
       ,axios.get(endpointsArray[3])
     ])
     .then(function([response1, response2, response3, response4]) {
        apiObjects.IncomeTax = response1.data[formData.year]['brackets']
        apiObjects.LowIncomeTaxOffset = response2.data[formData.year]['brackets']
        apiObjects.MedicareLevySurcharge = response3.data[formData.year]['brackets']
        apiObjects.HECS = response4.data[formData.year]['brackets']

        console.log(apiObjects)

     })
     .catch(error => {
       // Error occurred in any of the requests
     });

///////////////////////////////////

    
    
    const API_URL = "/IncomeTax";   // Express server backend url

    const [data, setData] = useState(null);
    const [loadingFlag, setLoadingFlag] = useState(true);
    const [errorFlag, setErrorFlag] = useState(null);

    useEffect(() => {
        loadTaxData();  // Load tax data when formData changes
    }, [formData]); // data transfered in from TaxForm component

    const loadTaxData = () => {
        setErrorFlag(null);
        setLoadingFlag(true);

    // Call the API
    axios.get(API_URL, {
            params: {
                formData    // year, income, spouse, children, isHECS, amtHECS
            }
        })
        .then(res => {
            setData(res.data[formData.year]["brackets"][2]["range"][0]);    // Put the API results in the state data
        })
        .catch(err => {
            setErrorFlag(true);  // If something bad, set error flag to yes
        })
    };

    return (
        <div>
            <h1>COMPONENT: TaxCalculation</h1>
            <h2>Calculation Results</h2>

            {/* conditional rendering */}
            {loadingFlag && <p>Loading Results</p>} 
            {errorFlag && <p>Error loading results: {errorFlag.message}</p>}
            {data && <p>{data}</p>}
        </div>
    );
};

export default TaxCalculation;
