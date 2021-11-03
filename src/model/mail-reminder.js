const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let mailReminder = new Schema({
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
        default: Date.now
    }

});

module.exports = mongoose.model('MailReminder', mailReminder);