const mongoose = require("mongoose");

const db = {};

db.mongoose = mongoose;
db.user = require("./user.model");
db.token = require("./token.model");
db.kategoria = require("./kategoria.model");
db.przepis = require("./przepis.model");

module.exports = db;
