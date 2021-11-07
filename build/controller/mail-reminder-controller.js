"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var config = require('config');

var Agenda = require('agenda');

var nodemailer = require("nodemailer");

var MailReminder = require("../model/mail-reminder");

var ApiResponse = require("../util/api-response"); //Set up DB connection to save scheduled jobs


var agendaService = new Agenda({
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
    var newReminder = new MailReminder({
      customerId: req.body.customerId,
      customerName: req.body.customerName,
      customerEmail: req.body.customerEmail,
      reminderTitle: req.body.reminderTitle,
      reminderText: req.body.reminderText,
      reminderDate: req.body.reminderDate == undefined || req.body.reminderDate === null ? new Date() : req.body.reminderDate
    });
    newReminder.save().then(function (savedReminder) {
      ApiResponse.successResponse(res, savedReminder);
    })["catch"](function (err) {
      console.log("ERROR");
      console.log(err);
      ApiResponse.errorResponse(res, err);
    });
    var mailTransporter = nodemailer.createTransport({
      host: config.MailHostserver,
      port: config.MailPort,
      secure: config.MailPort === 465 ? true : false,
      auth: {
        user: config.MailUsername,
        pass: config.MailPassword
      }
    });
    agendaService.define("sendOneTimeMailReminder", /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(job) {
        var sentMail;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                sentMail = transporter.sendMail({
                  from: '"' + config.MailFullName + '" <' + config.MailMailAddress + '>',
                  to: req.body.customerEmail,
                  subject: req.body.reminderTitle,
                  html: req.body.reminderText
                });
                MailReminder.findByIdAndRemove({
                  _id: req.body.customerId
                }, function (err, deletedMailReminder) {
                  if (err) {
                    console.log(err);
                  }
                });
                return _context.abrupt("return", "Email Sent with the id: " + sentMail.messageId);

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
    var dateOfReminder;

    if (req.body.reminderDate === undefined || req.body.reminderDate == null) {
      dateOfReminder = new Date();
    } else {
      dateOfReminder = req.body.reminderDate;
    }

    var scheduledJob = Agenda.schedule(dateOfReminder, "sendOneTimeMailReminder");
  } catch (err) {
    console.log(err);
    ApiResponse.errorResponse(res, err);
  }
};
/**
 * Get a list of MailReminders.
 * @returns MailReminders. Array object
 */


exports.getAllReminderList = function (req, res, next) {
  try {
    MailReminder.find({
      customerId: req.params.customerId
    }, "_id customerId customerName customerEmail reminderTitle reminderText reminderDate").then(function (customers) {
      ApiResponse.successResponse(res, customers);
    });
  } catch (err) {
    ApiResponse.errorResponse(res, err);
  }
};
/**
 * Get a mail reminder by the id in the uri.
 * @returns MailReminder. Object
 */


exports.getReminderById = function (req, res, next) {
  try {
    MailReminder.findById({
      _id: req.params.id
    }, function (err, mailReminder) {
      if (err) {
        ApiResponse.errorResponse(res, err);
      } else {
        ApiResponse.successResponse(res, mailReminder);
      }
    });
  } catch (err) {
    ApiResponse.errorResponse(res, err);
  }
};