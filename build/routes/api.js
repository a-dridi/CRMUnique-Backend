"use strict";

/**
 * All API end points for this application
 */
var express = require("express");

var communicationMessageRouter = require("./communication-message-api");

var app = express();
app.use("/communicationMessage/", communicationMessageRouter);
module.exports = app;