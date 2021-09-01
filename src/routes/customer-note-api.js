const express = require('express');
const CustomerNoteController = require("../controller/customer-note-controller");

var router = express.Router();

router.get("/all/:customerId", CustomerNoteController.customerNoteList);
router.get("/get/byId/:id", CustomerNoteController.customerNoteById);
router.post("/add", CustomerNoteController.customerNoteSave);
router.post("/update", CustomerNoteController.customerNoteUpdate);
router.get("/delete/byId/:id", CustomerNoteController.customerNoteDeleteById);

module.exports = router;