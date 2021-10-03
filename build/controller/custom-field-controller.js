"use strict";

var CustomField = require("../model/custom-field");

var ApiResponse = require("../util/api-response");
/**
 * Get a list of custom fields.
 * @returns Custom fields. Array object
 */


exports.customFieldList = function (req, res, next) {
  try {
    CustomField.find({}, "_id fieldName fieldType").then(function (customFields) {
      ApiResponse.successResponse(res, customFields);
    });
  } catch (err) {
    ApiResponse.errorResponse(res, err);
  }
};
/**
 * Get a custom field by the id in the uri.
 * @returns Custom field. Object
 */


exports.customFieldById = function (req, res, next) {
  try {
    CustomField.findById({
      _id: req.params.id
    }, function (err, customField) {
      if (err) {
        ApiResponse.errorResponse(res, err);
      } else {
        ApiResponse.successResponse(res, customField);
      }
    });
  } catch (err) {
    ApiResponse.errorResponse(res, err);
  }
};
/**
 * Save custom field with the data passed in the POST request.
 */


exports.customFieldSave = function (req, res, next) {
  try {
    var newCustomField = new CustomField({
      fieldName: req.body.fieldName,
      fieldType: req.body.fieldType
    });
    newCustomField.save().then(function (savedcustomField) {
      ApiResponse.successResponse(res, savedcustomField);
    })["catch"](function (err) {
      console.log("ERROR");
      console.log(err);
      ApiResponse.errorResponse(res, err);
    });
  } catch (err) {
    ApiResponse.errorResponse(res, err);
  }
};
/**
 * Update custom field with the data passed in the POST request.
 */


exports.customFieldUpdate = function (req, res, next) {
  var updateCustomField = new CustomField({
    _id: req.body._id,
    fieldName: req.body.fieldName,
    fieldType: req.body.fieldType
  });
  updateCustomField.save().then(function (updatedCustomField) {
    ApiResponse.successResponse(res, updatedCustomField);
  })["catch"](function (err) {
    ApiResponse.errorResponse(res, err);
  });
};
/**
 * Delete custom field by the ID in the uri.
 */


exports.customFieldDeleteById = function (req, res, next) {
  CustomField.findByIdAndRemove({
    _id: req.params.id
  }, function (err, deletedCustomField) {
    if (err) {
      ApiResponse.errorResponse(res, err);
    } else {
      ApiResponse.successResponse(res, deletedCustomField);
    }
  });
};