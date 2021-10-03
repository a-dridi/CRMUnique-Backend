"use strict";

exports.successResponse = function (res, data) {
  res.send(200, data);
};

exports.errorResponse = function (res, data) {
  res.send(400, data);
};

exports.notFoundResponse = function (res, data) {
  res.send(404, data);
};