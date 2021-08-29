const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let customField = new Schema({
    fieldName: {
        type: String,
        required: true
    },
    fieldType: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('CustomField', customField)