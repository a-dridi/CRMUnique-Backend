const Customer = require("../model/customer");
const ApiResponse = require("../util/api-response");

/**
 * Get a list of customers.
 * @returns Customer. Array object
 */
exports.customerList = function (req, res, next) {
    try {
        Customer.find({
            deleted: false
        }, "_id companyName forename surname email telephone street city postCode country IBAN BIC bankInformation website facebookUrl twitterUrl linkedinUrl xingUrl socialmediaUrl language timezone note").then((customers) => {
            ApiResponse.successResponse(res, customers);
        })
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
        }, (err, customer) => {
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
        let newCustomer = new Customer({
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
            xingUrl: req.body.xingUrl,
            socialmediaUrl: req.body.socialmediaUrl,
            language: req.body.language,
            timezone: req.body.timezone,
            note: req.body.note,
            deleted: false
        });
        newCustomer.save()
            .then(savedCustomer => {
                ApiResponse.successResponse(res, savedCustomer);
            })
            .catch(err => {
                console.log("ERROR")
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
    let updateCustomer = new Customer({
        _id: req.body._id,
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
        xingUrl: req.body.xingUrl,
        socialmediaUrl: req.body.socialmediaUrl,
        language: req.body.language,
        timezone: req.body.timezone,
        note: req.body.note,
        deleted: false
    });

    updateCustomer.save()
        .then(updatedCustomer => {
            ApiResponse.successResponse(res, updatedCustomer);
        })
        .catch(err => {
            ApiResponse.errorResponse(res, err);
        });
};

/**
 * Delete customer by the ID in the uri.
 */
exports.customerDeleteById = function (req, res, next) {
    Customer.findByIdAndRemove({
        _id: req.params.id
    }, (err, deletedCustomer) => {
        if (err) {
            ApiResponse.errorResponse(res, err);
        } else {
            ApiResponse.successResponse(res, deletedCustomer);
        }
    });
};