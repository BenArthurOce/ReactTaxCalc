import React, { useState, useEffect } from 'react';

// Props are sourced from "TaxFrontEnd" where the drop down boxes are selected
const DropDownResults = ({ selectedHeader, selectedYear }) => {
    const [resultData, setResultData] = useState(null);
    const url = `https://benarthuroce.github.io/TaxRatesJSON/atoJSON.json`;


    // When "DropDownOpts" is triggered, run API to get the bracket data
    // selectedHeader = Dropdown box for tax rate
    // selectedYear = Dropdown box for year
    useEffect(() => {

        // We're not going to use medicare. Return nothing if either are selected
        if (selectedHeader === "Low Middle Income Tax Offset" || selectedHeader === "Medicare Levy Reduction" || selectedHeader === "Medicare Levy Surcharge") {
            setResultData({brackets:[]});
            return;
        };

        // IF THE DROP DOWN BOXES HAVE INFORMATION IN THEM
        if (selectedHeader && selectedYear) {
            fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Fetch Request failed | Status: ${response.status}`);
                };
                return response.json();
            })
            .then((jsonData) => {
                setResultData(jsonData[selectedHeader][selectedYear]);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
        // IF THE DROP DOWN BOXES DO NOT HAVE INFORMATION IN THEM
        } else {
                setResultData(null);
        };
    }, [selectedHeader, selectedYear]); // Props from "TaxFrontEnd"

    return (
        <div>
            <h2>Results</h2>
            {resultData ? (
                <table>
                    <thead>
                        <tr>
                            <th>Range</th>
                            <th>Rate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {resultData.brackets.map((bracket, index) => (
                        <tr key={index}>
                            <td>{`$${bracket.range[0]} - $${bracket.range[1]}`}</td>    {/* Define the upper and lower range */}
                            <td>{`${(bracket.rate * 100).toFixed(2)}%`}</td>            {/* Get the bracket and convert it to percentage */}
                        </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
            <p>Select a header and a year to see results.</p>
            )}
        </div>
    );
};

export default DropDownResults;
