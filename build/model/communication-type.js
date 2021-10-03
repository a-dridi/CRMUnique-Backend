"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
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
module.exports = mongoose.model('CommunicationType', communicationType);