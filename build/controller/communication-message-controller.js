"use strict";

var CommunicationMessage = require("../model/communication-message");

var ApiResponse = require("../util/api-response");
/**
 * Create schema that will be return through the api. 
 * @param {*} data 
 */


function CommunicationMessageData(data) {
  this.id = data._id;
  this.communicationType = data.communicationType;
  this.message = data.message;
  this.tag1 = data.tag1;
  this.tag2 = data.tag2;
  this.tag3 = data.tag3;
  this.tag4 = data.tag4;
  this.tag5 = data.tag5;
  this.createdDate = data.createdDate;
}
/**
 * Get a list of communication messages.
 * @returns Communication Messages. Array object
 */


exports.communicationMessageList = function (req, res) {
  try {
    CommunicationMessage.find({
      deleted: false
    }, "_id communicationType message tag1 tag2 tag3 tag4 tag5 createdDate").then(function (communicationMessages) {
      return ApiResponse.successResponse(communicationMessages);
    });
  } catch (err) {
    return ApiResponse.errorResponse(err);
  }
};

exports.communicationMessageSave = function (req, res) {
  try {
    var newCommunicationMessage = new CommunicationMessage({
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
      return ApiResponse.successResponse(savedCommunicationMessage);
    })["catch"](function (err) {
      return ApiResponse.errorResponse(err);
    });
  } catch (err) {
    return ApiResponse.errorResponse(err);
  }
};

exports.communicationMessageUpdate = function (req, res) {
  var updateCommunicationMessage = new CommunicationMessage({
    _id: req.body.id,
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
    return ApiResponse.successResponse(updatedCommunicationMessage);
  })["catch"](function (err) {
    return ApiResponse.errorResponse(err);
  });
};

exports.communicationMessageDeleteById = function (req, res) {
  CommunicationMessage.findByAndRemove({
    _id: req.params.id
  }, function (err, deletedCommunicationMessage) {
    if (err) {
      ApiResponse.errorResponse(err);
    } else {
      ApiResponse.successResponse(deletedCommunicationMessage);
    }
  });
};