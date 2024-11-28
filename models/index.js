const mongoose = require("mongoose");

const db = {};

db.mongoose = mongoose;
db.user = require("./user.model");
db.token = require("./token.model");

module.exports = db;
