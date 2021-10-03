"use strict";

var express = require('express');

var path = require('path');

var cors = require('cors');

var mongoose = require('mongoose');

var config = require('config');

var app = express();

var apiRoute = require('./routes/api');

mongoose.connect(config.DBHost, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  console.log("*** CRM Unique ***");
  console.log("APP RUNNING");
})["catch"](function (err) {
  console.log("*** CRM Unique ***");
  console.log("ERROR - ERROR: Could not start app, because database connection could not be established!");
  console.log(err);
  process.exit(1);
});
var dbConnection = mongoose.connection;
dbConnection.once("open", function () {
  console.log("OK -- Mongo DB coonection established - Connected to %s", config.DBHost);
});
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cors());
app.use("/data/", apiRoute);
app.all("*", function (req, res) {
  return res.status(404).json("API endpoint not found!");
});
module.exports = app;