"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var mailReminder = new Schema({
  customerId: {
    type: String,
    required: true
  },
  customerName: {
    type: String,
    required: true
  },
  customerEmail: {
    type: String,
    required: true
  },
  reminderTitle: {
    type: String,
    required: true
  },
  reminderText: {
    type: String,
    required: true
  },
  reminderDate: {
    type: Date,
    "default": Date.now
  }
});
module.exports = mongoose.model('MailReminder', mailReminder);