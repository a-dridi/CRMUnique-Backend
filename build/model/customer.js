"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var customer = new Schema({
  companyName: {
    type: String
  },
  forename: {
    type: String
  },
  surname: {
    type: String
  },
  email: {
    type: String
  },
  telephone: {
    type: String
  },
  street: {
    type: String
  },
  city: {
    type: String
  },
  postCode: {
    type: Number
  },
  country: {
    type: String
  },
  IBAN: {
    type: String
  },
  BIC: {
    type: String
  },
  bankInformation: {
    type: String
  },
  website: {
    type: String
  },
  facebookUrl: {
    type: String
  },
  twitterUrl: {
    type: String
  },
  linkedinUrl: {
    type: String
  },
  xingUrl: {
    type: String
  },
  socialmediaUrl: {
    type: String
  },
  language: {
    type: String
  },
  timezone: {
    type: String
  },
  note: {
    type: String
  },
  deleted: {
    type: Boolean,
    "default": false
  }
});

var _default = _mongoose["default"].model('Customer', customer);

exports["default"] = _default;