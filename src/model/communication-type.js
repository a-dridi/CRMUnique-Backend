const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let communicationType = new Schema({
    title: {
        type: String,
        required: true
    },
    colorHex: {
        type: String,
        default: "#cccccc"
    },
    deleted: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('CommunicationType', communicationType);