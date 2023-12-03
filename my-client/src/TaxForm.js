import React, { useState } from 'react';

function TaxForm(props) {
    const [taxationYear, setTaxationYear] = useState('');
    const [taxableIncome, setTaxableIncome] = useState('');
    const [spousesIncome, setSpousesIncome] = useState('');
    const [numberOfChildren, setNumberOfChildren] = useState(1);
    const [hasHECSDebt, setHasHECSDebt] = useState(false);
    const [hecsDebtAmount, setHECSDebtAmount] = useState('');

    const handleSubmit = (ev) => {
        ev.preventDefault();
        // console.log('Form submitted!');
        // console.log('Taxation Year:', taxationYear);
        // console.log('Taxable Income:', taxableIncome);
        // console.log('Spouse\'s Income:', spousesIncome);
        // console.log('Number of Children:', numberOfChildren);
        // console.log('Has HECS Debt:', hasHECSDebt);
        // console.log('HECS Debt Amount:', hecsDebtAmount);

        // Pass form data to parent component
        props.onFormSubmit({
             year: taxationYear
            ,income: taxableIncome
            ,spouse: spousesIncome
            ,children: numberOfChildren
            ,isHECS: hasHECSDebt
            ,amtHECS: hecsDebtAmount
        });
    }

    return (
    <form onSubmit={handleSubmit}>
        <h1>COMPONENT: TaxForm</h1>

        {/* Year Selection Dropdown */}
        <label>
            Select Year:
            <select value={taxationYear} onChange={(e) => setTaxationYear(e.target.value)}>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
                <option value="2017">2017</option>
                <option value="2016">2016</option>
                <option value="2015">2015</option>
                <option value="2014">2014</option>
                <option value="2013">2013</option>
                <option value="2012">2012</option>
                <option value="2011">2011</option>
                <option value="2010">2010</option>
            </select>
        </label>
        <br></br>

        {/* Input Taxable Income */}
        <label>
            Taxable Income:
            <input 
                type="text" 
                value={taxableIncome} 
                onChange={(e) => setTaxableIncome(e.target.value)} 
            />
        </label>
        <br></br>

        {/* Input Spouse Income */}
        <label>
            Spouse's Income:
            <input 
                type="text" 
                value={spousesIncome} 
                onChange={(e) => setSpousesIncome(e.target.value)} 
            />
        </label>
        <br></br>

        {/* Input Number of Children */}
        <label>
            Number of Children:
            <input 
                type="number" 
                value={numberOfChildren} 
                min={1} 
                max={8} 
                onChange={(e) => setNumberOfChildren(parseInt(e.target.value, 10))} 
            />
        </label>
        <br></br>

        {/* Boolean for HECS debt */}
        <label>
            Do you have a HECS debt?
            <input 
                type="checkbox" 
                checked={hasHECSDebt} 
                onChange={() => setHasHECSDebt(!hasHECSDebt)} 
            />
        </label>

        {/* Amount for HECS debt */}
        {hasHECSDebt && (
            <label>
                HECS Debt Amount:
                    <input 
                    type="text" 
                    value={hecsDebtAmount} 
                    onChange={(e) => setHECSDebtAmount(e.target.value)} 
                />
            </label>
        )}
        <br></br>

        {/* Form submit button */}
        <button>Submit</button>
    </form>
  );
};

export default TaxForm;
