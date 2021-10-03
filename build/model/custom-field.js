"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var customField = new Schema({
  fieldName: {
    type: String,
    required: true
  },
  fieldType: {
    type: String,
    required: true
  }
});
module.exports = mongoose.model('CustomField', customField);