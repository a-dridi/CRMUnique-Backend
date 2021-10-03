"use strict";

var CommunicationMessage = require("../model/communication-message");

var ApiResponse = require("../util/api-response");
/**
 * Get a list of communication messages.
 * @returns Communication Messages. Array object
 */


exports.communicationMessageList = function (req, res, next) {
  try {
    CommunicationMessage.find({
      deleted: false,
      customerId: req.params.customerId
    }, "_id communicationType message tag1 tag2 tag3 tag4 tag5 createdDate").then(function (communicationMessages) {
      ApiResponse.successResponse(res, communicationMessages);
    });
  } catch (err) {
    ApiResponse.errorResponse(res, err);
  }
};
/**
 * Get a communication message by the id in the uri.
 * @returns Communication Message. Object
 */


exports.communicationMessageById = function (req, res, next) {
  try {
    CommunicationMessage.findById({
      _id: req.params.id
    }, function (err, communicationMessage) {
      if (err) {
        ApiResponse.errorResponse(res, err);
      } else {
        ApiResponse.successResponse(res, communicationMessage);
      }
    });
  } catch (err) {
    ApiResponse.errorResponse(res, err);
  }
};
/**
 * Save communication message with the data passed in the POST request.
 */


exports.communicationMessageSave = function (req, res, next) {
  try {
    var newCommunicationMessage = new CommunicationMessage({
      customerId: req.body.customerId,
      communicationType: req.body.communicationType,
      message: req.body.message,
      tag1: req.body.tag1,
      tag2: req.body.tag2,
      tag3: req.body.tag3,
      tag4: req.body.tag4,
      tag5: req.body.tag5,
      createdDate: req.body.createdDate,
      deleted: false
    });
    newCommunicationMessage.save().then(function (savedCommunicationMessage) {
      ApiResponse.successResponse(res, savedCommunicationMessage);
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
 * pdate message with the data passed in the POST request.
 */


exports.communicationMessageUpdate = function (req, res, next) {
  var updateCommunicationMessage = new CommunicationMessage({
    _id: req.body._id,
    customerId: req.body.customerId,
    communicationType: req.body.communicationType,
    message: req.body.message,
    tag1: req.body.tag1,
    tag2: req.body.tag2,
    tag3: req.body.tag3,
    tag4: req.body.tag4,
    tag5: req.body.tag5,
    createdDate: req.body.createdDate,
    deleted: false
  });
  updateCommunicationMessage.save().then(function (updatedCommunicationMessage) {
    ApiResponse.successResponse(res, updatedCommunicationMessage);
  })["catch"](function (err) {
    ApiResponse.errorResponse(res, err);
  });
};
/**
 * Delete communication message by the ID in the uri.
 */


exports.communicationMessageDeleteById = function (req, res, next) {
  CommunicationMessage.findByIdAndRemove({
    _id: req.params.id
  }, function (err, deletedCommunicationMessage) {
    if (err) {
      ApiResponse.errorResponse(res, err);
    } else {
      ApiResponse.successResponse(res, deletedCommunicationMessage);
    }
  });
};