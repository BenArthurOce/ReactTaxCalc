const fetchPromise1 = fetch('https://benarthuroce.github.io/TaxRatesJSON/atoJSON.json');
console.log(fetchPromise1);

fetchPromise1
    .then((response) => {
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status} - ${response.statusText}`);
        }
        return response.json();
    })
    .then((data1) => {
        try {
            const incomeTaxValue = data1['Individual Income Tax'][3000];
            if (incomeTaxValue === undefined) {
                console.error('Income Tax value is undefined.');
            } else {
                console.log(incomeTaxValue);
            }
        } catch (error) {
            console.error('Error accessing data:', error);
        }
    })
    .catch((error) => {
        console.error('Error during fetch:', error);
    });




    const endpointUrls = [
        // 'https://benarthuroce.github.io/TaxRatesJSON/atoJSON.json',
        "Individual Income Tax"
        ,"HECS Repayment Rates"
        ,"Low Income Tax Offset"
        ,"Low Middle Income Tax Offset"
        ,"Medicare Levy Reduction"
        ,"Medicare Levy Surchage"
    ];

    const baseURL = `https://benarthuroce.github.io/TaxRatesJSON/atoJSON.json`


    Promise.all([
        axios.get(baseURL),       //Income Tax
    ])
    .then((response) => response.json(
        console.log(response[endpointUrls])
    ))

    
    .then(function([response1, response2, response3, response4, response5, response6, response7]) {
        console.log(response1)
        console.log(response2)
        console.log(response3)
        console.log(response4)
        console.log(response5)
        console.log(response6)
        console.log(response7)
    })
    .catch((error) => {
        console.error("Error in requests", error);

        loadingFlagtoFalse(false);
        performDataState(null);
        performAPIdataState(null);
    });


    //https://benarthuroce.github.io/TaxRatesJSON/atoJSON.json/Individual Income Tax"
    
    // Create an array of fetch promises for each endpoint
    const fetchPromises = endpointUrls.map((url) => fetch(url));
    
    Promise.all(fetchPromises)
        .then((responses) => {
            // Check if all responses are OK
            const allResponsesOk = responses.every((response) => response.ok);
    
            if (!allResponsesOk) {
                throw new Error('One or more requests failed.');
            }
    
            // Extract JSON data from each response
            const jsonPromises = responses.map((response) => response.json());
    
            return Promise.all(jsonPromises);
        })
        .then((dataArray) => {
            // dataArray contains the JSON data from each endpoint in the same order
    
            // Extract and log data for each section
            try {
                const individualIncomeTaxData = dataArray[0]['Individual Income Tax'];
                const medicareReductionData = dataArray[1]['Medicare Reduction'];
                const medicareLevySurchargeData = dataArray[2]['Medicare Levy Surcharge'];
    
                console.log('Individual Income Tax Data:', individualIncomeTaxData);
                console.log('Medicare Reduction Data:', medicareReductionData);
                console.log('Medicare Levy Surcharge Data:', medicareLevySurchargeData);
    
                // Add similar lines for other sections as needed
            } catch (error) {
                console.error('Error accessing data:', error);
            }
        })
        .catch((error) => {
            console.error('Error during fetch:', error);
        });
    




// fetchPromise1
//   .then((response) => response.json())
//   .then((data1) => {
//     const fetchPromise2 = fetch(apiInfo.getMatchesByIdURL(data1.puuid))
//     fetchPromise2.then((response2) => response2.json())
//     .then((data2)=> {
//         for (const gameId of data2) {
//             const fetchPromise3 = fetch(apiInfo.getSingleMatchDataURL(gameId)) 
//             fetchPromise3.then((response3) => response3.json())
//             .then((data3)=> {
//                 console.log(data3['info']['gameDuration']);
//             })
//             .catch((error3) => {
//                 console.error(`Could not get match Id': ${error3}`);
//             });
            
//         };
//     });
// });