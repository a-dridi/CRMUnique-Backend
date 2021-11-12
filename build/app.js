"use strict";

var express = require('express');

var path = require('path');

var cors = require('cors');

var mongoose = require('mongoose');

var config = require('config');

var APP_PORT = 3000;
var app = express();

var apiRoute = require('./routes/api');

console.log("*** CRM Unique ***");
app.listen(APP_PORT, function () {
  console.log("> This server app isrunning on port: " + APP_PORT);
});
mongoose.connect(config.DBHost, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  console.log("APP RUNNING");
})["catch"](function (err) {
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