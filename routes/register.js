const crypto = require("crypto");
const express = require("express");
const router = express.Router();

const User = require("../models").user;
const Token = require("../models").token;

const isLogged = require("../middleware").idLogged;

router.get("/", isLogged, (req, res) => {
    res.render("register", { title: "Rejestracja" });
});

router.post("/", async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    const response = {};
    response.success = true;

    if (!username || username.length < 4) {
        response.error_login = "Wpisz poprawny login o conajmniej 4 znakach!";
        response.success = false;
    }

    if (!password || password.length < 4) {
        response.error_password =
            "Wpisz poprawne hasło o conajmniej 4 znakach!";
        response.success = false;
    }

    if (await User.countDocuments({ username: username })) {
        response.error_login = "Ta nazwa użytkownika jest już zajęta!";
        response.success = false;
    }

    if (response.success) {
        let user = new User({ username: username, password: password });
        user.save();

        let randomBytes = crypto.randomBytes(20).toString("hex");
        let token = new Token({ token: randomBytes, user: user });
        token.save();

        response.token = randomBytes;
    }

    res.send(response);
});

module.exports = router;
