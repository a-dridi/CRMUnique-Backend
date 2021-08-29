const express = require('express');
const CustomerController = require("../controller/customer-controller");

var router = express.Router();

router.get("/all", CustomerController.customerList);
router.get("/get/byId/:id", CustomerController.customerById);
router.post("/add", CustomerController.customerSave);
router.post("/update", CustomerController.customerUpdate);
router.get("/delete/byId/:id", CustomerController.customerDeleteById);

module.exports = router;