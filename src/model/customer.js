const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let customer = new Schema({
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
        default: false
    },
});

module.exports = mongoose.model('Customer', customer);