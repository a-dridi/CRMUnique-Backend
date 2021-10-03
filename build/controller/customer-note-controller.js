"use strict";

var CustomerNote = require("../model/customer-note");

var ApiResponse = require("../util/api-response");
/**
 * Get a list of Customer notes.
 * @returns Customer notes. Array object
 */


exports.customerNoteList = function (req, res, next) {
  try {
    CustomerNote.find({
      deleted: false,
      customerId: req.params.customerId
    }, "_id title description attachmentLink createdDate").then(function (customerNotes) {
      ApiResponse.successResponse(res, customerNotes);
    });
  } catch (err) {
    ApiResponse.errorResponse(res, err);
  }
};
/**
 * Get a customer note by the id in the uri.
 * @returns Customer note. Object
 */


exports.customerNoteById = function (req, res, next) {
  try {
    CustomerNote.findById({
      _id: req.params.id
    }, function (err, customerNote) {
      if (err) {
        ApiResponse.errorResponse(res, err);
      } else {
        ApiResponse.successResponse(res, customerNote);
      }
    });
  } catch (err) {
    ApiResponse.errorResponse(res, err);
  }
};
/**
 * Save customer note with the data passed in the POST request.
 */


exports.customerNoteSave = function (req, res, next) {
  try {
    var newCustomerNote = new CustomerNote({
      customerId: req.body.customerId,
      title: req.body.title,
      description: req.body.description,
      attachmentLink: req.body.attachmentLink,
      createdDate: req.body.createdDate,
      deleted: false
    });
    newCustomerNote.save().then(function (savedCustomerNote) {
      ApiResponse.successResponse(res, savedCustomerNote);
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
 * Update customer note with the data passed in the POST request.
 */


exports.customerNoteUpdate = function (req, res, next) {
  var updateCustomerNote = new CustomerNote({
    _id: req.body._id,
    customerId: req.body.customerId,
    title: req.body.title,
    description: req.body.description,
    attachmentLink: req.body.attachmentLink,
    createdDate: req.body.createdDate,
    deleted: false
  });
  updateCustomerNote.save().then(function (updatedCustomerNote) {
    ApiResponse.successResponse(res, updatedCustomerNote);
  })["catch"](function (err) {
    ApiResponse.errorResponse(res, err);
  });
};
/**
 * Delete customer note by the ID in the uri.
 */


exports.customerNoteDeleteById = function (req, res, next) {
  CustomerNote.findByIdAndRemove({
    _id: req.params.id
  }, function (err, deletedCustomerNote) {
    if (err) {
      ApiResponse.errorResponse(res, err);
    } else {
      ApiResponse.successResponse(res, deletedCustomerNote);
    }
  });
};