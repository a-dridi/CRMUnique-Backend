const express = require('express');
const CustomFieldController = require("../controller/custom-field-controller");

var router = express.Router();

router.get("/all", CustomFieldController.customFieldList);
router.get("/get/byId/:id", CustomFieldController.customFieldById);
router.post("/add", CustomFieldController.customFieldSave);
router.post("/update", CustomFieldController.customFieldUpdate);
router.delete("/delete/byId/:id", CustomFieldController.customFieldDeleteById);

module.exports = router;