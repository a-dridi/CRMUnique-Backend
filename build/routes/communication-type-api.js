"use strict";

var express = require('express');

var CommunicationTypeController = require("../controller/communication-type-controller");

var router = express.Router();
router.get("/all", CommunicationTypeController.communicationTypeList);
router.get("/get/byId/:id", CommunicationTypeController.communicationTypeById);
router.post("/add", CommunicationTypeController.communicationTypeSave);
router.post("/update", CommunicationTypeController.communicationTypeUpdate);
router["delete"]("/delete/byId/:id", CommunicationTypeController.communicationTypeDeleteById);
module.exports = router;