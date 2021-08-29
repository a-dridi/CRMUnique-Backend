"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var customerNote = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  attachmentLink: {
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

var _default = _mongoose["default"].model('CustomerNote', customerNote);

exports["default"] = _default;