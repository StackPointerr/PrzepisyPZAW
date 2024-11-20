const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.redirect("/");
});

router.get("/:id", (req, res) => {
    res.render("recipe", { title: "Przeglądaj przepis" });
});

module.exports = router;
