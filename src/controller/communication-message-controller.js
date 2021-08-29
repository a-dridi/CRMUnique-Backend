const CommunicationMessage = require("../model/communication-message");
const ApiResponse = require("../util/api-response");

/**
 * Get a list of communication messages.
 * @returns Communication Messages. Array object
 */
exports.communicationMessageList = function (req, res, next) {
    try {
        CommunicationMessage.find({
            deleted: false
        }, "_id communicationType message tag1 tag2 tag3 tag4 tag5 createdDate").then((communicationMessages) => {
            ApiResponse.successResponse(res, communicationMessages);
        })
    } catch (err) {
        ApiResponse.errorResponse(res, err);
    }
};

/**
 * Get a communication message by the id in the uri.
 * @returns Communication Message. Object
 */
exports.communicationMessageById = function (req, res, next) {
    try {
        CommunicationMessage.findById({
            _id: req.params.id
        }, (err, communicationMessage) => {
            if (err) {
                ApiResponse.errorResponse(res, err);
            } else {
                ApiResponse.successResponse(res, communicationMessage);
            }
        });
    } catch (err) {
        ApiResponse.errorResponse(res, err);
    }
};

/**
 * Save communication message with the data passed in the POST request.
 */
exports.communicationMessageSave = function (req, res, next) {
    try {
        let newCommunicationMessage = new CommunicationMessage({
            communicationType: req.body.communicationType,
            message: req.body.message,
            tag1: req.body.tag1,
            tag2: req.body.tag2,
            tag3: req.body.tag3,
            tag4: req.body.tag4,
            tag5: req.body.tag5,
            createdDate: req.body.createdDate,
            deleted: false
        });
        newCommunicationMessage.save()
            .then(savedCommunicationMessage => {
                ApiResponse.successResponse(res, savedCommunicationMessage);
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
 * pdate message with the data passed in the POST request.
 */
exports.communicationMessageUpdate = function (req, res, next) {
    let updateCommunicationMessage = new CommunicationMessage({
        _id: req.body._id,
        communicationType: req.body.communicationType,
        message: req.body.message,
        tag1: req.body.tag1,
        tag2: req.body.tag2,
        tag3: req.body.tag3,
        tag4: req.body.tag4,
        tag5: req.body.tag5,
        createdDate: req.body.createdDate,
        deleted: false
    });
    updateCommunicationMessage.save()
        .then(updatedCommunicationMessage => {
            ApiResponse.successResponse(res, updatedCommunicationMessage);
        })
        .catch(err => {
            ApiResponse.errorResponse(res, err);
        });
};

/**
 * Delete communication message by the ID in the uri.
 */
exports.communicationMessageDeleteById = function (req, res, next) {
    CommunicationMessage.findByIdAndRemove({
        _id: req.params.id
    }, (err, deletedCommunicationMessage) => {
        if (err) {
            ApiResponse.errorResponse(res, err);
        } else {
            ApiResponse.successResponse(res, deletedCommunicationMessage);
        }
    });
};