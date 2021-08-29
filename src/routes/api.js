/**
 * All API end points for this application
 */

const express=require("express");
const communicationMessageRouter = require("../routes/communication-message-api");
const communicationTypeRouter = require("../routes/communication-type-api");
const customFieldRouter = require("../routes/custom-field-api");
const customerNoteRouter = require("../routes/customer-note-api");
const customerRouter = require("../routes/customer-api");

const app = express();

app.use("/communicationMessage/", communicationMessageRouter);
app.use("/communicationType/", communicationTypeRouter);
app.use("/customField/", customFieldRouter);
app.use("/customerNote/", customerNoteRouter);
app.use("/customer/", customerRouter);

module.exports = app;