const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('config');
const apiResponse = require("../src/util/api-response");


const app = express();
const apiRoute = require('../src/routes/api');

mongoose.connect(config.DBHost, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("*** CRM Unique ***");
        console.log("APP RUNNING");
    })
    .catch(err => {
        console.log("*** CRM Unique ***");
        console.log("ERROR - ERROR: Could not start app, because database connection could not be established!");
        console.log(err);
        process.exit(1);
    });

const dbConnection = mongoose.connection;
dbConnection.once("open", () => {
    console.log("OK -- Mongo DB coonection established - Connected to %s", config.DBHost);
});

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cors());

app.use("/data/", apiRoute);

app.all("*", (req, res) => {
    return res.status(404).json("API endpoint not found!");
});

module.exports = app;