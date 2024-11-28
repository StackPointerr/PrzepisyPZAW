const middlewares = {};

middlewares.auth = require("./auth.middleware").auth;
middlewares.idLogged = require("./auth.middleware").isLogged;

module.exports = middlewares;
