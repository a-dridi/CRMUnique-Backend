"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"];
var communicationType = new Schema({
  title: {
    type: String,
    required: true
  },
  colorHex: {
    type: String,
    "default": "#cccccc"
  },
  deleted: {
    type: Boolean,
    "default": false
  }
});

var _default = _mongoose["default"].model('CommunicationType', communicationType);

exports["default"] = _default;