const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("my_book", { title: "Przeglądaj swoją książke kucharską" });
});

module.exports = router;
