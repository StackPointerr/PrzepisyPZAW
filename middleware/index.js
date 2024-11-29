const middlewares = {};

middlewares.auth = require("./auth.middleware").auth;
middlewares.idLogged = require("./auth.middleware").isLogged;
middlewares.loggedJson = require("./auth.middleware").loggedJson;

module.exports = middlewares;
