const express = require("express");
const router = express.Router();

const Przepisy = require("../models").przepis;

router.get("/", (req, res) => {
    res.redirect("/");
});

router.get("/:id", async (req, res) => {
    let przepis = await Przepisy.findOne({ _id: req.params.id }).populate([
        "autor",
        "kategoria",
    ]);
    if (!przepis) res.redirect("/");

    przepis.data = przepis.data_utworzenia.toLocaleString();

    res.render("recipe", { title: "Przeglądaj przepis", przepis: przepis });
});

module.exports = router;
