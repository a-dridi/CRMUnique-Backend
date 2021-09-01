const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let customerNote = new Schema({
    customerId: {
        type: String,
        required: true
    },
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
        default: Date.now
    },
    deleted: {
        type: Boolean,
        default: false
    },
});

module.exports = mongoose.model('CustomerNote', customerNote);