const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
// app.use(express.json());
const fs = require("fs");
const path = require('path');



function errorHandler(err, req, res, next) {
    console.error("Error:", err);
    res.status(500).send("Internal Server Error");
}

app.use(errorHandler);



// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});


const axios = require("axios");


app.use(express.json());


  app.get("/IncomeTax", (req, res) => {
    try {
        const filePath = path.join(__dirname, "tax_standard.json");
        const data = fs.readFileSync(filePath, "utf8");
        const jsonData = JSON.parse(data);

        res.status(200).json(jsonData); // Send the JSON data in the response
    } catch (error) {
        console.error("Error reading or parsing JSON file:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/MedicareLevySurcharge", (req, res) => {
    try {
        // const filePath = __dirname + "/tax_mls.js";
        const filePath = path.join(__dirname, "tax_mls.json");
        const data = fs.readFileSync(filePath, "utf8");
        const jsonData = JSON.parse(data);

        res.status(200).json(jsonData); // Send the JSON data in the response
    } catch (error) {
        console.error("Error reading or parsing JSON file:", error);
        res.status(500).send("Internal Server Error");
    }
});


app.get("/HECS", (req, res) => {
    try {
        const filePath = path.join(__dirname, "tax_hecs.json");
        const data = fs.readFileSync(filePath, "utf8");
        const jsonData = JSON.parse(data);

        res.status(200).json(jsonData); // Send the JSON data in the response
    } catch (error) {
        console.error("Error reading or parsing JSON file:", error);
        res.status(500).send("Internal Server Error");
    }
});


  app.get('/LowIncomeTaxOffset', (req, res) => {
    try {
        const filePath = path.join(__dirname, "tax_lito.json");
        const data = fs.readFileSync(filePath, "utf8");
        const jsonData = JSON.parse(data);

        res.status(200).json(jsonData); // Send the JSON data in the response
    } catch (error) {
        console.error("Error reading or parsing JSON file:", error);
        res.status(500).send("Internal Server Error");
    }
});


app.get('/LowMiddleIncomeTaxOffset', (req, res) => {
    try {
        const filePath = path.join(__dirname, "tax_lmito.json");
        const data = fs.readFileSync(filePath, "utf8");
        const jsonData = JSON.parse(data);

        res.status(200).json(jsonData); // Send the JSON data in the response
    } catch (error) {
        console.error("Error reading or parsing JSON file:", error);
        res.status(500).send("Internal Server Error");
    }
});




app.get('/SeniorsPensionersTaxOffset', (req, res) => {
    try {
        const filePath = path.join(__dirname, "tax_sapto.json");
        const data = fs.readFileSync(filePath, "utf8");
        const jsonData = JSON.parse(data);

        res.status(200).json(jsonData); // Send the JSON data in the response
    } catch (error) {
        console.error("Error reading or parsing JSON file:", error);
        res.status(500).send("Internal Server Error");
    }
});