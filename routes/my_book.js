const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("my_book", { title: "Moja książka kucharska" });
});

module.exports = router;
