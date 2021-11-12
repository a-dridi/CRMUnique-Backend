const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('config');

const APP_PORT = 3000;

const app = express();
const apiRoute = require('./routes/api');
console.log("*** CRM Unique ***");

app.listen(APP_PORT, () => {
    console.log("> This server app isrunning on port: " + APP_PORT);
});

mongoose.connect(config.DBHost, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("APP RUNNING" );
    })
    .catch(err => {
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