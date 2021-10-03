"use strict";

var express = require('express');

var CommunicationMessageController = require("../controller/communication-message-controller");

var router = express.Router();
router.get("/all/:customerId", CommunicationMessageController.communicationMessageList);
router.get("/get/byId/:id", CommunicationMessageController.communicationMessageById);
router.post("/add", CommunicationMessageController.communicationMessageSave);
router.post("/update", CommunicationMessageController.communicationMessageUpdate);
router.get("/delete/byId/:id", CommunicationMessageController.communicationMessageDeleteById);
module.exports = router;