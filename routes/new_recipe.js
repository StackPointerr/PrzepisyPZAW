const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("new_recipe", { title: "Stwórz nowy przepis" });
});

module.exports = router;
