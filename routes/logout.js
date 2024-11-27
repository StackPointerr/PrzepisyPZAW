const express = require("express");
const router = express.Router();

const Token = require("../models").token;

router.post("/", async (req, res) => {
    let token = req.body.token;

    let response = {};
    response.success = true;

    await Token.findOneAndDelete({ token: token });

    res.send(response);
});

module.exports = router;
