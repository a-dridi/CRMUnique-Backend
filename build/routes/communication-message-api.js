"use strict";

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var CommunicationMessageController = require("../controller/communication-message-controller");

var router = _express["default"].Router();

router.get("/all", CommunicationMessageController.communicationMessageList);
router.post("/add", CommunicationMessageController.communicationMessageSave);
router.post("/update", CommunicationMessageController.communicationMessageUpdate);
router.get("/delete/byId/:id", CommunicationMessageController.communicationMessageDeleteById);
module.exports = router;