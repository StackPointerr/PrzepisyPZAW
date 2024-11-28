const Token = require("../models").token;

const auth = async (req, res, next) => {
    let token = await Token.findOne({ token: req.cookies.token }).populate(
        "user",
    );

    if (!token) {
        res.redirect("/login");
    } else {
        req.user = token.user;
    }

    next();
};

const isLogged = async (req, res, next) => {
    let token = await Token.countDocuments({ token: req.cookies.token });
    if (token) {
        res.redirect("/");
    }

    next();
};

module.exports = {
    auth,
    isLogged,
};
