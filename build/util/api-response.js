"use strict";

exports.successResponse = function (res, data) {
  return res.status(200).json(data);
};

exports.errorResponse = function (res, data) {
  return res.status(400).json(data);
};

exports.notFoundResponse = function (res, data) {
  return res.status(404).json(data);
};