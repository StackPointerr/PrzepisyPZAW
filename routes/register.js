const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("register", { title: "Rejestracja" });
});

module.exports = router;
