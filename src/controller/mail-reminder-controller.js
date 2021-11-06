const config = require('config');
const Agenda = require('agenda');
const nodemailer = require("nodemailer");
const MailReminder = require("../model/mail-reminder");
const ApiResponse = require("../util/api-response");

//Set up DB connection to save scheduled jobs
const agendaService = new Agenda({
    db: {
        address: config.DBReminder
    }
});

/**
 * Create reminder that is scheduled as a job. This reminder job will be executed on the date defined in the variable "reminderDate".
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.createOneTimeReminder = function (req, res, next) {
    try {

        let newReminder = new MailReminder({
            customerId: req.body.customerId,
            customerName: req.body.customerName,
            customerEmail: req.body.customerEmail,
            reminderTitle: req.body.reminderTitle,
            reminderText: req.body.reminderText,
            reminderDate: (req.body.reminderDate == undefined || req.body.reminderDate === null) ? new Date() : req.body.reminderDate
        });

        newReminder.save().then(savedReminder => {
            ApiResponse.successResponse(res, savedReminder);
        }).catch(err => {
            console.log("ERROR");
            console.log(err);
            ApiResponse.errorResponse(res, err);
        });

        let mailTransporter = nodemailer.createTransport({
            host: config.MailHostserver,
            port: config.MailPort,
            secure: config.MailPort === 465 ? true : false,
            auth: {
                user: config.MailUsername,
                pass: config.MailPassword
            }
        });

        agendaService.define("sendOneTimeMailReminder", async function (job) {
            let sentMail = transporter.sendMail({
                from: '"' + config.MailFullName + '" <' + config.MailMailAddress + '>',
                to: req.body.customerEmail,
                subject: req.body.reminderTitle,
                html: req.body.reminderText
            });

            MailReminder.findByIdAndRemove({
                _id: req.body.customerId
            }, (err, deletedMailReminder) => {
                if (err) {
                    console.log(err);
                }
            });
            
            return "Email Sent with the id: " + sentMail.messageId;
        });
        let dateOfReminder;
        if (req.body.reminderDate === undefined || req.body.reminderDate == null) {
            dateOfReminder = new Date();
        } else {
            dateOfReminder = req.body.reminderDate;
        }

        let scheduledJob = agenda.schedule(dateOfReminder, "sendOneTimeMailReminder");

    } catch (err) {

        console.log(err);
        ApiResponse.errorResponse(res, err);

    }
}

/**
 * Get a list of MailReminders.
 * @returns MailReminders. Array object
 */
exports.getAllReminderList = function (req, res, next) {
    try {
        MailReminder.find({
            customerId: req.params.customerId
        }, "_id customerId customerName customerEmail reminderTitle reminderText reminderDate").then((customers) => {
            ApiResponse.successResponse(res, customers);
        });
    } catch (err) {
        ApiResponse.errorResponse(res, err);
    }
}

/**
 * Get a mail reminder by the id in the uri.
 * @returns MailReminder. Object
 */
exports.getReminderById = function (req, res, next) {
    try {
        MailReminder.findById({
            _id: req.params.id
        }, (err, mailReminder) => {
            if (err) {
                ApiResponse.errorResponse(res, err);
            } else {
                ApiResponse.successResponse(res, mailReminder);
            }
        });
    } catch (err) {
        ApiResponse.errorResponse(res, err);
    }
}