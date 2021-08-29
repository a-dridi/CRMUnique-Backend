"use strict";

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _cors = _interopRequireDefault(require("cors"));

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var apiRouter = require("./routes/api");

var apiResponse = require("./helpers/api-response");

var app = (0, _express["default"])();
var DATABASE_CONNECTION = process.env.MONGO_DB_URL;

_mongoose["default"].connect(DATABASE_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  console.log("*** CRM Unique ***");
  console.log("APP RUNNING");
})["catch"](function (err) {
  console.log("*** CRM Unique ***");
  console.log("ERROR - ERROR: Could not start app, because database connection could not be established!");
  console.log(err);
  process.exit(1);
});

var dbConnection = _mongoose["default"].connection;
dbConnection.once("open", function () {
  console.log("OK -- Mongo DB coonection established - Connected to %s", DATABASE_CONNECTION);
});
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use((0, _cors["default"])());
app.use("/data/", apiRouter);
app.all("*", function (req, res) {
  return apiResponse.notFoundResponse(res, "API endpoint not found!");
});
module.exports = app;