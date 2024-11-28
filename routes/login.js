const express = require("express");
const crypto = require("crypto");
const router = express.Router();

const User = require("../models").user;
const Token = require("../models").token;

const isLogged = require("../middleware").idLogged;

router.get("/", isLogged, (req, res) => {
    res.render("login", { title: "Logowanie" });
});

router.post("/", async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    const response = {};
    response.success = true;

    let user = await User.findOne({ username: username, password: password });
    if (user) {
        let randomBytes = crypto.randomBytes(20).toString("hex");
        let token = new Token({ token: randomBytes, user: user });
        token.save();

        response.token = randomBytes;
    } else {
        response.error = "Login lub hasło jest niepoprawne!";
        response.success = false;
    }

    res.send(response);
});

module.exports = router;
