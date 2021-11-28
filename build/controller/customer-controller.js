"use strict";

var Customer = require("../model/customer");

var ApiResponse = require("../util/api-response");
/**
 * Get a list of customers.
 * @returns Customer. Array object
 */


exports.customerList = function (req, res, next) {
  try {
    Customer.find({
      deleted: false
    }, "_id companyName forename surname email telephone street city postCode country IBAN BIC bankInformation website facebookUrl twitterUrl linkedinUrl xingUrl socialmediaUrl language timezone note").then(function (customers) {
      ApiResponse.successResponse(res, customers);
    });
  } catch (err) {
    ApiResponse.errorResponse(res, err);
  }
};
/**
 * Get a customer by the id in the uri.
 * @returns Customer. Object
 */


exports.customerById = function (req, res, next) {
  try {
    Customer.findById({
      _id: req.params.id
    }, function (err, customer) {
      if (err) {
        ApiResponse.errorResponse(res, err);
      } else {
        ApiResponse.successResponse(res, customer);
      }
    });
  } catch (err) {
    ApiResponse.errorResponse(res, err);
  }
};
/**
 * Save customer with the data passed in the POST request.
 */


exports.customerSave = function (req, res, next) {
  try {
    var newCustomer = new Customer({
      companyName: req.body.companyName,
      forename: req.body.forename,
      surname: req.body.surname,
      email: req.body.email,
      telephone: req.body.telephone,
      street: req.body.street,
      city: req.body.city,
      postCode: req.body.postCode,
      country: req.body.country,
      IBAN: req.body.IBAN,
      BIC: req.body.BIC,
      bankInformation: req.body.bankInformation,
      website: req.body.website,
      facebookUrl: req.body.facebookUrl,
      twitterUrl: req.body.twitterUrl,
      linkedinUrl: req.body.linkedinUrl,
      xingUrl: req.body.xingUrl,
      socialmediaUrl: req.body.socialmediaUrl,
      language: req.body.language,
      timezone: req.body.timezone,
      note: req.body.note,
      deleted: false
    });
    newCustomer.save().then(function (savedCustomer) {
      ApiResponse.successResponse(res, savedCustomer);
    })["catch"](function (err) {
      console.log("ERROR");
      console.log(err);
      ApiResponse.errorResponse(res, err);
    });
  } catch (err) {
    ApiResponse.errorResponse(res, err);
  }
};
/**
 * Update customer with the data passed in the POST request.
 */


exports.customerUpdate = function (req, res, next) {
  console.log("customerUpdate!!!!!!!!");
  console.log(req.body._id);
  Customer.findById(req.body._id, function (err, customer) {
    if (!customer) {
      console.log("error1");
      console.log("error111");
      ApiResponse.errorResponse(res, "Could not load customer from database to perform update!");
    } else {
      console.log("error2");
      console.log(customer);
      console.log("error22");
      customer.companyName = req.body.companyName;
      customer.forename = req.body.forename;
      customer.surname = req.body.surname;
      customer.email = req.body.email;
      customer.telephone = req.body.telephone;
      customer.street = req.body.street;
      customer.city = req.body.city;
      customer.postCode = req.body.postCode;
      customer.country = req.body.country;
      customer.IBAN = req.body.IBAN;
      customer.BIC = req.body.BIC;
      customer.bankInformation = req.body.bankInformation;
      customer.website = req.body.website;
      customer.facebookUrl = req.body.facebookUrl;
      customer.twitterUrl = req.body.twitterUrl;
      customer.xingUrl = req.body.xingUrl;
      customer.socialmediaUrl = req.body.socialmediaUrl;
      customer.language = req.body.language;
      customer.timezone = req.body.timezone;
      customer.note = req.body.note;
      console.log("error2222");
    }

    customer.save().then(function (updatedCustomer) {
      ApiResponse.successResponse(res, updatedCustomer);
    })["catch"](function (err) {
      ApiResponse.errorResponse(res, err);
    });
  });
};
/**
 * Delete customer by the ID in the uri.
 */


exports.customerDeleteById = function (req, res, next) {
  Customer.findByIdAndRemove({
    _id: req.params.id
  }, function (err, deletedCustomer) {
    if (err) {
      ApiResponse.errorResponse(res, err);
    } else {
      ApiResponse.successResponse(res, deletedCustomer);
    }
  });
};