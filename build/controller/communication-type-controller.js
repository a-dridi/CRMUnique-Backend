"use strict";

var CommunicationType = require("../model/communication-type");

var ApiResponse = require("../util/api-response");
/**
 * Get a list of communication types.
 * @returns Communication Types. Array object
 */


exports.communicationTypeList = function (req, res, next) {
  try {
    CommunicationType.find({
      deleted: false
    }, "_id title colorHex").then(function (communicationTypes) {
      ApiResponse.successResponse(res, communicationTypes);
    });
  } catch (err) {
    ApiResponse.errorResponse(res, err);
  }
};
/**
 * Get a communication type by the id in the uri.
 * @returns Communication Type. Object
 */


exports.communicationTypeById = function (req, res, next) {
  try {
    CommunicationType.findById({
      _id: req.params.id
    }, function (err, communicationType) {
      if (err) {
        ApiResponse.errorResponse(res, err);
      } else {
        ApiResponse.successResponse(res, communicationType);
      }
    });
  } catch (err) {
    ApiResponse.errorResponse(res, err);
  }
};
/**
 * Save communication type with the data passed in the POST request.
 */


exports.communicationTypeSave = function (req, res, next) {
  try {
    var newcommunicationType = new CommunicationType({
      title: req.body.title,
      colorHex: req.body.colorHex,
      deleted: false
    });
    newcommunicationType.save().then(function (savedcommunicationType) {
      ApiResponse.successResponse(res, savedcommunicationType);
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
 * Update communication type with the data passed in the POST request.
 */


exports.communicationTypeUpdate = function (req, res, next) {
  var updatecommunicationType = new CommunicationType({
    _id: req.body._id,
    title: req.body.title,
    colorHex: req.body.colorHex,
    deleted: false
  });
  updatecommunicationType.save().then(function (updatedCommunicationType) {
    ApiResponse.successResponse(res, updatedCommunicationType);
  })["catch"](function (err) {
    ApiResponse.errorResponse(res, err);
  });
};
/**
 * Delete communication type by the ID in the uri.
 */


exports.communicationTypeDeleteById = function (req, res, next) {
  CommunicationType.findByIdAndRemove({
    _id: req.params.id
  }, function (err, deletedCommunicationType) {
    if (err) {
      ApiResponse.errorResponse(res, err);
    } else {
      ApiResponse.successResponse(res, deletedCommunicationType);
    }
  });
};