"use strict";

/**
 * All API end points for this application
 */
var express = require("express");

var communicationMessageRouter = require("../routes/communication-message-api");

var communicationTypeRouter = require("../routes/communication-type-api");

var customFieldRouter = require("../routes/custom-field-api");

var customerNoteRouter = require("../routes/customer-note-api");

var customerRouter = require("../routes/customer-api");

var mailReminderRouter = require("../routes/mail-reminder-api");

var app = express();
app.use("/communicationMessage", communicationMessageRouter);
app.use("/communicationType", communicationTypeRouter);
app.use("/customField", customFieldRouter);
app.use("/customerNote", customerNoteRouter);
app.use("/customer", customerRouter);
app.use("/mailReminder", mailReminderRouter);
module.exports = app;