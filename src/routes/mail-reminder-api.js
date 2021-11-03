const express = require('express');
const MailReminderController = require("../controller/mail-reminder-controller");

var router = express.Router();

router.get("/all", MailReminderController.getAllReminderList);
router.get("/get/byId/:id", MailReminderController.getReminderById);
router.post("/create", MailReminderController.createOneTimeReminder);

module.exports = router;