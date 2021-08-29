"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var communicationMessage = new Schema({
  communicationType: {
    type: Schema.ObjectId,
    ref: "CommunicationType"
  },
  message: {
    type: String,
    required: true
  },
  tag1: {
    type: String
  },
  tag2: {
    type: String
  },
  tag3: {
    type: String
  },
  tag4: {
    type: String
  },
  tag5: {
    type: String
  },
  createdDate: {
    type: Date,
    "default": Date.now
  },
  deleted: {
    type: Boolean,
    "default": false
  }
});

var _default = _mongoose["default"].model('CommunicationMessage', communicationMessage);

exports["default"] = _default;