const express = require("express");
const router = express.Router();

const Kategoria = require("../../models").kategoria;

router.get("/", async (req, res) => {
    let response = {};
    response.success = false;

    Kategoria.find({}).then((kategorie) => {
        response.success = true;
        response.kategorie = kategorie;

        res.send(response);
    });
});

module.exports = router;
