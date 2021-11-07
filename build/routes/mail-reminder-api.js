"use strict";

var express = require('express');

var MailReminderController = require("../controller/mail-reminder-controller");

var router = express.Router();
router.get("/all/:customerId", MailReminderController.getAllReminderList);
router.get("/get/byId/:id", MailReminderController.getReminderById);
router.post("/create", MailReminderController.createOneTimeReminder);
module.exports = router;