const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

let communicationMessage = new Schema({
    customerId: {
        type: String,
        required: true
    },
    communicationType: {
        type: String
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
        default: Date.now
    },
    deleted: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('CommunicationMessage', communicationMessage);